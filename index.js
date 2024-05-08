const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const UsersRoute = require("./routes/users.route.js");
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

app.set('views', './views');

app.set('view engine', 'ejs');

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// routes
app.use("/api/products", productRoute);
app.use("/login", UsersRoute);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true
}))

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

