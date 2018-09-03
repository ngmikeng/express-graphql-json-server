# Express GraphQL JSON Server
- A simple Node/Express GraphQL JSON Server.
- For purpose practice & learn GraphQL.

## Quick start
- Run JSON Server (Default port 4000)
```
$ npm run json:server
```

- Run Dev Server (Default port 3000)
```
$ npm run dev:server
```

- GraphiQL tool for testing queries: http://localhost:3000/graphql 

## Sample Queries
- Get a customer by id

```
{
  customer(id: 6) {
    name,
    email
  }
}
```

- Get list customers

```
{
  customers {
    name,
    email
  }
}
```

- Add a customer

```
mutation {
  addCustomer(name: "Pete", email: "petele@gmail.com", birthYear: 1993) {
    id,
    name,
    email,
    birthYear
  }
}
```

- Update a customer

```
mutation {
  updateCustomer(id: 6, birthYear: 1991, email: "petelee@gmail.com") {
    id,
    name,
    email,
    birthYear
  }
}
```

- Delete a customer

```
mutation {
  deleteCustomer(id: 6) {
    id,
    name,
    email,
    birthYear
  }
}
```
