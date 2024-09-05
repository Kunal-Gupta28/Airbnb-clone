const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js")





main()
.then(()=>{
    console.log("connected to database.......")
})
.catch(
    (err) => {
        console.log(err)
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>(
        {...obj , owner:"66a4d8b1079fd9c2d9ef0e7f"}
    ));
    await Listing.insertMany(initData.data);
    console.log("data was initilized");
};

initDB();