const express = require("express");
const router = new express.Router();
const Product = require('../models/productSchema')
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');


// get product data API
router.get('/getproducts', async (req, res) => {
    try {
        const productsdata = await Product.find();
        // console.log(productsdata);
        res.status(201).json(productsdata);

    } catch (error) {
        console.log(error.message);

    }
})

// get individual data
router.get('/getproductsone/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const individualdata = await Product.findOne({ id: id });
        res.status(201).json(individualdata);

    } catch (error) {
        res.status(400).json(individualdata);
        console.log('error:' + error.message);
    }
})


// register user
router.post('/register', async (req, res) => {
    const { fname, email, mobile, password, cpassword } = req.body;

    if (!fname || !email || !mobile || !password || !cpassword)
        res.status(422).json({ error: 'fill all the data' });

    try {
        const preuser = await User.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: 'this user already exist' });
        }
        else if (password !== cpassword) {
            res.status(422).json({ error: 'password and cpassword do not match' });
        }
        else {
            const finalUser = new User({
                fname, email, mobile, password, cpassword
            });

            // password hashing

            const storedata = await finalUser.save();
            console.log(storedata);

            res.status(200).json(storedata);
        }

    } catch (error) {
        res.status(400).json({ error: 'invalid details' });
        console.log('error:' + error.message);
    }
});

// login user API

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: 'fill all data' });
    };

    try {
        const userlogin = await User.findOne({ email: email });
        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);

            // token generate
            const token = await userlogin.generateAuthToken();
            // console.log(token);

            // generate cookie
            res.cookie('Amazonweb', token, {
                expires: new Date(Date.now() + 9000000),
                httpOnly: true
            })


            if (!isMatch) {
                res.status(400).json({ error: 'password not matched' });
            } else {
                res.status(201).json(userlogin);
            }
        } else {
            res.status(400).json({ error: 'invalid details' })
        }

    } catch (error) {
        res.status(400).json({ error: 'invalid details' })
    }
})


// adding data in the cart

router.post('/addcart/:id', authenticate,async(req, res)=>{
    try {
        const {id} = req.params;
        const cart = await Product.findOne({id:id});
        // console.log(cart);

        const userContact = await User.findOne({_id: req.userID});
        console.log(userContact);

        if(userContact){
            const cartData = await userContact.addcartdata(cart)
            await userContact.save();
            console.log(cartData);
            res.status(201).json(userContact)
        }else{
            res.status(401).json({error: 'invalid'})
        }

    } catch (error) {
        res.status(401).json(error.message);
    }
});

//get cart details

router.get('/cartdetails', authenticate, async(req, res)=>{
    try {
        const buyuser = await User.findOne({_id: req.userID});
        res.status(201).json(buyuser);
    } catch (error) {
        console.log('error'+error);
    }
})


// get valid user
router.get('/validuser', authenticate, async(req, res)=>{
    try {
        const validuserone = await User.findOne({_id: req.userID});
        res.status(201).json(validuserone);
    } catch (error) {
        console.log('error'+error);
    }
})


// for user logout
router.get('/logout', authenticate, async(req, res)=>{
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter(currEle => {
            return currEle.token !== req.token
        })

        res.clearCookie('Amazonweb', {path: '/'});
        req.rootUser.save();

        res.status(201).json(req.rootUser.tokens);

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
