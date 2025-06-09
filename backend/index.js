const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const authroute = require('./Routes/authroute')
const Products = require('./Routes/ProductRouter')


require('dotenv').config()
require('./Models/db');

const PORT = process.env.PORT || 8080

app.get('/ping', (req, res) => {
    res.send('PONG')
});
app.use(bodyParser.json())
app.use(cors());

// creating a route for user
app.use('/auth', authroute)

// creating a route for products
app.use('/products', Products)
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);

})