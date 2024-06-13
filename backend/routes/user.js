const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db");
const JWT_SECRET = require("../config");

const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});
router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(body);
  if (!success) {
    res.status(400).json({ error: "Email already taken / Incorrect inputs" });
    return;
  }

  const user = User.findOne({ username: body.username });
  if (user._id) {
    res.status(400).json({ error: "Email already taken / Incorrect inputs" });
    return;
  }

  const dbuser = await User.create(body);

  await Account.create({ userId, balance: 1 + Math.random() * 10000 });

  const token = jwt.sign(
    {
      userId: dbuser._id,
    },
    JWT_SECRET
  );
  res.json({
    message: "User Created Successfully",
    token: token,
  });
});

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});
router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinSchema.safeParse(body);
  if (!success) {
    res.status(400).json({ error: "Incorrect inputs" });
    return;
  }
  const user = await User.findOne({ username: req.body.username });
  if (!user._id) {
    res.status(400).json({ error: "User Not Found" });
    res.redirect("/signup");
    return;
  }
  if (user.password !== body.password) {
    res.status(400).json({ error: "Incorrect Password, Please try again" });

    return;
  }
  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET
  );
  res.json({
    message: "User Logged In Successfully",
    token: token,
  });
});

const authMiddleware = require("../middleware");

const updateSchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/update", authMiddleware, async (req, res) => {
  const body = req.body;
  const { sucess } = updateSchema.safeParse(body);
  if (!success) {
    res.status(400).json({ error: "Error while updating information" });
    return;
  }
  await User.updateOne(req.body, { _id: req.userId });
  res.json({ message: "User Updated Successfully" });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [{ firstName: { $regex: filter } }, { lastName: { $regex: filter } }],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});
module.exports = router;
