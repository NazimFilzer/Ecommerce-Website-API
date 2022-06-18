const router = require("express").Router();
const UserScheme = require("../models/User");
const jwt = require("jsonwebtoken")

//Register // No Hashing is Don e
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = await UserScheme.create({ username, email, password });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json(err)
    }
});

//Login

router.post("/login", async (req, res) => {
    try {
        const user = await UserScheme.findOne({ username: req.body.username });
        if (user) {
            if (user.password == req.body.password) {
                const accessToken = jwt.sign({
                    id: user._id,
                    isAdmin: user.isAdmin
                }, process.env.JWT_SEC,
                    { expiresIn: "3d" }
                );
                res.status(200).json({...user._doc,accessToken})

            } else {
                res.send("passoword is in correct")
            }
        } else {
            res.send("User not found")
        }
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;
