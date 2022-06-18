const { verifyTokenAndAuthorize, verifyToken, verifyTokenAndAdmin } = require("./verifyToken")
const router = require("express").Router();
const OrderScheme = require("../models/Order");


//CREATE
router.post("/", verifyToken, async (req, res) => {
    try {
        const newOrder = await OrderScheme.create(req.body);
        res.status(200).json(newOrder);

    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }

})

//Updateing order
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const updateOrder = await OrderScheme.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updateOrder);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//Deleting Order

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await OrderScheme.findByIdAndDelete(req.params.id)
        res.status(200).json("The Order HAve been deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})

//get Orders
router.get("/find/:userId",verifyTokenAndAuthorize, async (req, res) => {
    try {
        const orders = await OrderScheme.find({userId : req.params.userId});
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
})

// get Alll Orders

router.get("/",verifyTokenAndAdmin,async (req,res)=>{
    try {
        const orders = await OrderScheme.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err)
    }
})

///GETTING STATS 


module.exports = router;
