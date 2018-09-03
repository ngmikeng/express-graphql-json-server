const axios = require('axios');
const config = require('../config');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    birthYear: {
      type: GraphQLInt
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve(parentValue, args) { // eslint-disable-line no-unused-vars
        return axios
          .get(`${config.jsonServerBaseUrl}/customers/${args.id}`)
          .then(res => res.data);
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) { // eslint-disable-line no-unused-vars
        return axios
          .get(`${config.jsonServerBaseUrl}/customers`)
          .then(res => res.data);
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        email: {
          type: new GraphQLNonNull(GraphQLString)
        },
        birthYear: {
          type: new GraphQLNonNull(GraphQLInt)
        },
      },
      resolve(parentValue, args) { // eslint-disable-line no-unused-vars
        return axios
          .post(`${config.jsonServerBaseUrl}/customers`, {
            name: args.name,
            email: args.email,
            birthYear: args.birthYear
          })
          .then(res => res.data);
      }
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve(parentValue, args) { // eslint-disable-line no-unused-vars
        return axios
          .delete(`${config.jsonServerBaseUrl}/customers/${args.id}`)
          .then(res => res.data);
      }
    },
    updateCustomer: {
      type: CustomerType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        name: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
        birthYear: {
          type: GraphQLInt
        },
      },
      resolve(parentValue, args) { // eslint-disable-line no-unused-vars
        return axios
          .patch(`${config.jsonServerBaseUrl}/customers/${args.id}`, args)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation
});
