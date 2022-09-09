const {
  verifyToken,
  checkAuthorization,
  checkAdmin,
} = require("../helpers/verifyToken");
const Order = require("../models/Order");

const router = require("express").Router();

//Create
router.post("/", verifyToken, async (req, res) => {
  let items = [];
  req.body.products.map((product) =>
    items.push({ _id: product.productId, quantity: product.quantity })
  );

  const newOrder = new Order({
    userId: req.body.userId,
    products: items,
    amount: req.body.amount,
    address: req.body.address,
    status: "Processing",
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update
router.put("/:id", checkAuthorization, async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { userId: req.params.id },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json("Order has been updated...");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Delete
router.delete("/:id", checkAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get User Orders
router.get("/find/:id", checkAuthorization, async (req, res) => {
  try {
    Order.find({ userId: req.params.id })
      .populate({
        path: "products",
        populate: { path: "_id" },
      })
      .exec(function (err, order) {
        if (err) return res.status(500).json(err);
        res.status(200).json(order);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get All
router.get("/", checkAdmin, async (req, res) => {
  try {
    await Order.find()
      .populate("userId")
      .then((orders) => {
        res.status(200).json(orders);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get Monthly Stats
router.get("/income", checkAdmin, async (req, res) => {
  const pId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(
    new Date(date.setMonth(lastMonth.getMonth() - 1))
  );

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(pId && {
            products: {
              $elemMatch: { productId: pId },
            },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
