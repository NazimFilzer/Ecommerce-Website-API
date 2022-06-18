const { verifyTokenAndAuthorize, verifyToken, verifyTokenAndAdmin } = require("./verifyToken")
const router = require("express").Router();
const CartScheme = require("../models/Cart");
const { find } = require("../models/Cart");


//CREATE
router.post("/", verifyToken, async (req, res) => {
    try {
        const newCart = await CartScheme.create(req.body);
        res.status(200).json(newCart);

    } catch (err) {
        res.status(500).json(err);
    }

})

//Updateing CART
router.put("/:id", verifyTokenAndAuthorize, async (req, res) => {

    try {
        const updateCart = await CartScheme.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updateCart);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//Deleting CART

router.delete("/:id", verifyTokenAndAuthorize, async (req, res) => {
    try {
        await CartScheme.findByIdAndDelete(req.params.id)
        res.status(200).json("The Cart HAve been deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})

//get USER CART
router.get("/find/:userId", verifyTokenAndAuthorize, async (req, res) => {
    try {
        const cart = await CartScheme.findOne({userId : req.params.userId});
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err)
    }
})

// get Alll 

router.get("/",verifyTokenAndAdmin,async (req,res)=>{
    try {
        const carts = await CartScheme.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;
