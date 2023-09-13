// const express = require('express') //3rd party package
// const { MongoClient } = require("mongodb")
import express from "express"
import { MongoClient } from "mongodb"
import 'dotenv/config'

const app = express()
const PORT = 9000

//Interceptor => converting body to json
app.use(express.json()) //Inbuilt middleware => to say data is in JSON
// const products = [
//     {
//         id: 1,
//         name: "Iphone 14",
//         price: "1,27,999",
//         poster: "https://m.media-amazon.com/images/I/71T5NVOgbpL._SX679_.jpg",
//         category: "Electronics",
//         rating: 8,
//         description:
//             "17.00 cm (6.7-inch) Super Retina XDR display featuring Always-On and ProMotion,48MP Main camera for up to 4x greater resolution",
//     },
//     {
//         id: 2,
//         name: "Lenovo Tab M10 HD 2nd Gen",
//         price: "9,199",
//         poster: "https://m.media-amazon.com/images/I/71UXXKK2gSL._SX679_.jpg",
//         category: "Electronics",
//         rating: 8.7,
//         description:
//             "10.1 HD (1280x800) display with TDDI technology and 400 nits brightness and TUV Rhienland certified eye protection",
//         trailer: "https://www.youtube.com/embed/bbcpBC9Mbuk",
//     },
//     {
//         id: 3,
//         name: "U.S. POLO ASSN. Men T-Shirt",
//         price: "803",
//         poster: "https://m.media-amazon.com/images/I/819biZOXNrL._UX569_.jpg",
//         category: "Clothing",
//         rating: 7,
//         description: "Fit Type: Regular Fit, HALF SLEEVE POLO",
//     },
// ];

//Mongodb connection

const MONGO_URL = process.env.MONGO_URL
// "mongodb://127.0.0.1:27017"
//"mongodb://localhost:27017"

async function createConnection() {
    const client = new MongoClient(MONGO_URL)
    await client.connect()
    console.log("Mongodb is connected")
    return client;
}

const client = await createConnection()

//REST API endpoints
//req => what we send to server
//res => what we receive from server
app.get('/', (req, res) => {
    res.send('Hello Everyone🥳🥳🥳')
})

//get all products
//Task
// /products => get products ✅
// products?category=Electronics => only Electronics products ✅
// products?category=Electronics&rating=8 => filter by category & rating  ✅
// products?rating=8 => get products by rating  ✅

app.get('/products', async (req, res) => {
    const { category, rating } = req.query
    console.log(req.query, category)

    // let filteredProducts = products//copy by reference
    // if (category) {
    //     filteredProducts = filteredProducts.filter((pd) => pd.category == category)
    // }
    // if (rating) {
    //     filteredProducts = filteredProducts.filter((pd) => pd.rating == rating)
    // }
    // const product = products.filter((pd) => pd.category == category)
    if (req.query.rating) {
        req.query.rating = +req.query.rating
    }
    const product = await client.db("b49-wd").collection("products").find(req.query).toArray()

    res.send(product)
})

//products by id
app.get('/products/:id', async (req, res) => {
    const { id } = req.params
    console.log(req.params, id)
    //db.products.findOne({id:"1"})
    const product = await client.db("b49-wd").collection("products").findOne({ id: id })
    console.log(product)
    // const product = products.find((pd) => pd.id == id)
    res.send(product)
})

//delete product by id
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params
    console.log(req.params, id)
    //db.products.deleteOne({id:"1"})
    const product = await client.db("b49-wd").collection("products").deleteOne({ id: id })
    console.log(product)
    // const product = products.find((pd) => pd.id == id)
    res.send(product)
})

//add products
app.post('/products', async (req, res) => {
    const newProduct = req.body
    console.log(newProduct)
    const result = await client.db("b49-wd").collection("products").insertMany(newProduct)
    res.send(result)
})



app.listen(PORT, () => console.log("The server started on the port", PORT))

