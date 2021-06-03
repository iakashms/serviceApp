const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
    users: async (args,req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const users = await User.find();
            return users.map(user => {
                return { ...user._doc, _id: user.id };
            });
        } catch (err) {
            throw err;
        }
    },
    createUser: async (args,req) => {
        console.log('Req',req)
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const existingUser = await User.findOne({ email: args.userInput.email , is_active : true});
        if(existingUser){
            throw new Error(`User already exists with Email : ${args.userInput.email}`);
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(args.userInput.password, salt);

        const user = new User({
            name: args.userInput.name,
            user_type: args.userInput.user_type,
            is_active: true,
            created_at: `${new Date().toISOString()}`,
            password: passwordHash,
            email: args.userInput.email,
            phone: args.userInput.phone,
            address: args.userInput.address,
            state: args.userInput.state,
            city: args.userInput.city,
            country: args.userInput.country
        });
        try {
            const userDetails = await user.save();
            console.log(userDetails);
            return { ...userDetails._doc, _id: userDetails._doc._id.toString() };
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    login: async ({ email, password }) => {
        const user = await User.findOne({ email: email, is_active: true });
        if (!user) {
            throw new Error('User does not exist!');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Password is incorrect!');
        }
        const token = jwt.sign(
            { userId: user.id, email: user.email, userType: user.user_type },
                'serviceAppBackend',
            {
                expiresIn: '1h'
            }
        );
        return { userId: user.id, token: token, tokenExpiration: 1, userType: user.user_type };
    },
    updateUser: async(args,req) => {
        try{
            if (!req.isAuth) {
                throw new Error('Unauthenticated');
            }
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(args.userUpdateInput.password, salt);
            args.userUpdateInput.password = passwordHash
            let createdEvent = args.userUpdateInput;
            let id = args.userUpdateInput._id || null;
            await User.findOneAndUpdate(
                { _id: id },
                { $set: args.userUpdateInput }
            )
            return { ...createdEvent, _id: createdEvent._id.toString() };
        }catch(err){
            // console.log(err)
            throw err
        }
    }
}