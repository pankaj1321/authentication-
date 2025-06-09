// authenticated api for products
const IsUserAuthentcated = require('../Middlewares/Auth');

const router = require('express').Router();
// creating a route for products

router.get('/', IsUserAuthentcated,(req,res)=>{          // checking IsUser middleware for authentication jwt
    res.status(200).json([
        {
            name: "mobile",
            price: 20000,
        },
        {
            name:"tv",
            price: 50000,
        },
        {
            name: "laptop",
            price: 80000,
        }
    ])
})


module.exports = router;
