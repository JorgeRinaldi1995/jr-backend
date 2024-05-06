const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// routes
app.use("/api/products", productRoute);


app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

mongoose.connect("mongodb+srv://admin:admin@jrdb.nd4hurj.mongodb.net/?retryWrites=true&w=majority&appName=JRDB")
    .then(() => {
        console.log('conectado')
        app.listen(3000, () => {
            console.log('Server is gay')
        })

    })
    .catch(() => {
        console.log('deu pau')
    })