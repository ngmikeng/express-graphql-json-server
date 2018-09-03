const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/index');

const app = express();
const port = 3000;

app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // eslint-disable-line no-console
});
