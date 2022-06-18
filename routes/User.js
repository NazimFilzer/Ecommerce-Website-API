const { verifyTokenAndAuthorize, verifyToken, verifyTokenAndAdmin } = require("./verifyToken")
const router = require("express").Router();
const UserScheme = require("../models/User")

//Updateing User
router.put("/:id", verifyTokenAndAuthorize, async (req, res) => {

    try {
        const updateUser = await UserScheme.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updateUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//Deleting USer

router.delete(":id", verifyTokenAndAuthorize, async (req, res) => {
    try {
        await UserScheme.findByIdAndDelete(req.params.id)
        res.status(200).json("The user HAve been deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})

//get user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await UserScheme.findById(req.params.id);
        const {password,...others }= user._doc
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})

//get Alll user and Showing new User upto 5
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query =req.query.new;
    try {
        const users = query
        ? await UserScheme.find().sort({_id:-1}).limit(5)
        : await UserScheme.find();
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get USer STats , Do it after sometime

module.exports = router;
