const express = require('express') //3rd party package
const app = express()
const PORT = 9000

const products = [
    {
        id: 1,
        name: "Iphone 14",
        price: "1,27,999",
        poster: "https://m.media-amazon.com/images/I/71T5NVOgbpL._SX679_.jpg",
        category: "Electronics",
        rating: 8,
        description:
            "17.00 cm (6.7-inch) Super Retina XDR display featuring Always-On and ProMotion,48MP Main camera for up to 4x greater resolution",
    },
    {
        id: 2,
        name: "Lenovo Tab M10 HD 2nd Gen",
        price: "9,199",
        poster: "https://m.media-amazon.com/images/I/71UXXKK2gSL._SX679_.jpg",
        category: "Electronics",
        rating: 8.7,
        description:
            "10.1 HD (1280x800) display with TDDI technology and 400 nits brightness and TUV Rhienland certified eye protection",
        trailer: "https://www.youtube.com/embed/bbcpBC9Mbuk",
    },
    {
        id: 3,
        name: "U.S. POLO ASSN. Men T-Shirt",
        price: "803",
        poster: "https://m.media-amazon.com/images/I/819biZOXNrL._UX569_.jpg",
        category: "Clothing",
        rating: 7,
        description: "Fit Type: Regular Fit, HALF SLEEVE POLO",
    },
];
//req => what we send to server
//res => what we receive from server
app.get('/', (req, res) => {
    res.send('Hello Everyone🥳🥳🥳')
})

//get all products
//Task
// /products => get products
// products?category=Electronics => only Electronics products ✅
// products?category=Electronics&rating=8 => filter by category & rating
// products?rating=8 => get products by rating 

app.get('/products', (req, res) => {
    const { category } = req.query
    console.log(req.query, category)
    const product = products.filter((pd) => pd.category == category)
    res.send(product)
})

//products by id
app.get('/products/:id', (req, res) => {
    const { id } = req.params
    console.log(req.params, id)
    const product = products.find((pd) => pd.id == id)
    res.send(product)
})


app.listen(PORT, () => console.log("The server started on the port", PORT))