const {buildSchema, graphql} = require('graphql')
var schema = buildSchema(`
    type User {
        _id: ID!
        name: String!
        user_type: String!
        is_active: Boolean!
        created_at: String
        password: String!
        email: String!
        phone: String!
        address: String!
        state: String!
        city: String!
        country: String!
    }
    input UserInput {
        name: String!
        user_type: String!
        created_at: String
        password: String!
        email: String!
        phone: String!
        address: String!
        state: String!
        city: String!
        country: String!
    }
    input UpdateUserInput {
        _id: ID!
        name: String!
        user_type: String!
        password: String!
        email: String!
        phone: String!
        address: String!
        state: String!
        city: String!
        country: String!
    }
    type Service {
        _id: ID!
        service_name: String!
        service_type: String!
        service_description: String!
        service_charge: Int
        created_at: String
        created_by: User!
        is_chargeable: Boolean!
        is_active: Boolean!
        is_enabled: Boolean!
        website: String
        phone: String!
        email: String!
        address: String!
        state: String!
        city: String!
        country: String!
    }
    type UpdateService {
        _id: ID!
        service_name: String!
        service_type: String!
        service_description: String!
        service_charge: Int!
        is_chargeable: Boolean!
        is_enabled: Boolean!
        website: String
        phone: String!
        email: String!
        address: String!
        state: String!
        city: String!
        country: String!
    }
    input ServiceInput {
        service_name: String!
        service_type: String!
        service_description: String!
        service_charge: Int
        is_chargeable: Boolean!
        website: String
        phone: String!
        email: String!
        address: String!
        state: String!
        city: String!
        country: String!
    }
    input UpdateServiceInput {
        _id: ID!
        service_name: String
        service_type: String
        service_description: String
        service_charge: Int
        is_enabled: Boolean
        is_chargeable: Boolean
        website: String
        phone: String
        email: String
        address: String
        state: String
        city: String
        country: String
    }
    type AuthData {
        userId: String!
        token: String!
        tokenExpiration: Int!
        userType: String!
    }
    type RootQuery {
        users: [User!]!
        login(email: String!, password: String!): AuthData!
        services: [Service!]!
    }
    type RootMutation {
        createUser(userInput: UserInput): User
        updateUser(userUpdateInput: UpdateUserInput): User
        createService(serviceInput: ServiceInput): Service
        updateService(updateServiceInput: UpdateServiceInput): UpdateService
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)

module.exports = schema;