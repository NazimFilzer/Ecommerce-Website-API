const { verifyTokenAndAuthorize, verifyToken, verifyTokenAndAdmin } = require("./verifyToken")
const router = require("express").Router();
const ProductScheme = require("../models/Product");
const { find } = require("../models/Product");



router.post("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const newProduct = await ProductScheme.create(req.body);
        res.status(200).json(newProduct);

    } catch (err) {
        res.status(500).json(err);
    }

})

//Updateing PRoduct
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const updateProduct = await ProductScheme.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updateProduct);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//Deleting Product

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await ProductScheme.findByIdAndDelete(req.params.id)
        res.status(200).json("The Product HAve been deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})

//get PRODUCTS
router.get("/find/:id", async (req, res) => {
    try {
        const products = await ProductScheme.findById(req.params.id);
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json(err)
    }
})

//get Alll Products and Showing new Products upto 5
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
        if (qNew) {
            products = await ProductScheme.find().sort({ createdAt: -1 }).limit(5);
        } else if (qCategory) {
            products = await ProductScheme.find({
                categories: {
                    $in: [qCategory]
                }
            });
        } else {
            products = await ProductScheme.find({});
        }
        res.status(200).json({ products })
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;
