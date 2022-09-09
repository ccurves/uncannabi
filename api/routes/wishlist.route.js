const {
  verifyToken,
  checkAuthorization,
  checkAdmin,
} = require("../helpers/verifyToken");
const User = require("../models/User");

const router = require("express").Router();

//Create
router.post("/add", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });

    if (
      user.wishlist.some(
        (e) => JSON.stringify(e._id) === JSON.stringify(req.body.productId)
      )
    ) {
      user.wishlist.pull(req.body.productId);
    } else {
      user.wishlist.push(req.body.productId);
    }

    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Get Wishlist
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    }).populate({
      path: "wishlist",
      select: "title desc price img _id",
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
