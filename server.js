const express = require('express')
const express_graphql = require('express-graphql').graphqlHTTP
const app = express()
const port = 4000;
const mongoose = require('mongoose');
const User = require('./models/user');
const graphQlSchema = require('./graphQL/schema/index');
const graphQlresolvers = require('./graphQL/resolvers/index');
const config = require('./config');
const auth = require('./middleware/auth');

const connection_url = "mongodb://localhost:27017/serviceApp"

// const connection_url = `mongodb+srv://${config.env.MONGO_USER}:${config.env.MONGO_PASSWORD}@cluster0.b1yrq.mongodb.net/${config.env.MONGO_DB_NAME}?retryWrites=true&w=majority`

app.use(auth)

app.use('/graphql', express_graphql({
    schema: graphQlSchema,
    rootValue: graphQlresolvers,
    graphiql: true
}))

mongoose.set('useFindAndModify', false);

mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res)=>{
    app.listen(port,() => console.log(`Express GraphQL Servers in now running on localhost:${port}/graphql`))
}).catch((err)=>{
    console.log(`Mongoose default connection has occured ${err} error`);
})

mongoose.connection.on('connected', function(){  
    console.log("Mongoose default connection is open to ", connection_url);
});

mongoose.connection.on('disconnected', function(){
    console.log("Mongoose default connection is disconnected");
});
