const { string } = require("joi");
const mongoose = require("mongoose")

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/order');
  }
  
  main().then(() => {
    console.log("connected to database.......");
  }).catch((err) => {
    console.log(err);
  });
  
  const orderSchema = new mongoose.Schema({
    items : String,
    price: Number,
})

const customerSchema = new mongoose.Schema({
    name : String,
    order : [{
        type : mongoose.Types.ObjectId,
        ref: "Order"
    }]
})



const Order = mongoose.model("Order", orderSchema)
const customer = mongoose.model("Customer", customerSchema)
