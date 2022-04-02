const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/corntube", {
    useNewUrlParser: true
}, () => {
    console.log("connected")
});
