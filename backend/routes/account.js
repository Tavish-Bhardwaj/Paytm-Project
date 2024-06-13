const express = require("express");
const authMiddleware = require("../middleware");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,

  });
  res.json({
    balance: account.balance
  })
});


router.post("/transfer", authMiddleware, async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount, to}= req.body;

    //Fetch the accounts within the transaction
    const account = await  Account.findOne({userId: req.userId}).session(session);

    if(!account || account.balance< amount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({userId: to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Account"
        })
        
    }

    // Performing the Transfer
    await Account.updateOne({userId: req.userId}, {$inc:{balance: balance -amount}}).session(session);
    await Account.updateOne({userId: to}, {$inc:{balance: balance + amount}}).session(session);

    // commiting the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer Successful"
    });

});
module.exports = router;
