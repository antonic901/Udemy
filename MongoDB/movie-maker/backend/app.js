const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql')
const movieSchema = require('./schema/schema')
const resolvers = require('./resolver/resolver')

/* Reads .env at startup */
require('dotenv').config()

mongoose.connect(process.env.CONNECT_URI, {
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected!'))
.catch((err) => console.error(err))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Settings GraphQL
app.use('/graphql', graphqlHTTP({
    schema: movieSchema,
    graphiql: true,
    rootValue: resolvers
}))

app.get('/', (req, res) => {
    res.send('Hello from backend!')
})

app.listen(4000, () => {
    console.log('Server on port 4000')
})