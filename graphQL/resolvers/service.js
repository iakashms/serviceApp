const Service = require('../../models/service');
const User = require('../../models/user');

module.exports = {
    services: async (args,req) => {
        try {
            const services = await Service.find();
            return services.map(service => {
                return { ...service._doc, _id: service.id };
            });
        } catch (err) {
            throw err;
        }
    },
    createService: async (args,req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        console.log("UserType",req.userType)
        if(req.userType && req.userType != 'business'){
            throw new Error('UnAuthorized to Create a Service');
        }
        const service = new Service({
            service_name: args.serviceInput.service_name,
            service_type: args.serviceInput.service_type,
            service_description: args.serviceInput.service_description,
            service_charge: args.serviceInput.service_charge,
            created_at: `${new Date().toISOString()}`,
            created_by: req.userId,
            is_active: true,
            is_enabled: true,
            is_chargeable: args.serviceInput.is_chargeable,
            website: args.serviceInput.website,
            phone: args.serviceInput.phone,
            email: args.serviceInput.email,
            address: args.serviceInput.address,
            state: args.serviceInput.state,
            city: args.serviceInput.city,
            country: args.serviceInput.country
        });
        try {
            const serviceDetails = await service.save();
            console.log(serviceDetails._doc);
            const user = await User.findById(req.userId);
            if(!user){
                throw new Error('User Not Found')
            }
            return { ...serviceDetails._doc, _id: serviceDetails._doc._id.toString(), created_by: user._doc };
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    updateService: async(args,req) => {
        try{
            if (!req.isAuth) {
                throw new Error('Unauthenticated');
            }
            let updatedService = args.updateServiceInput;
            let id = args.updateServiceInput._id || null;
            await Service.findOneAndUpdate(
                { _id: id },
                { $set: args.updateServiceInput },
                {new: true}
            )
            return { ...updatedService, _id: updatedService._id.toString() };
        }catch(err){
            // console.log(err)
            throw err
        }
    }
}