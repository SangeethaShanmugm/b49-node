import express from "express"
import { getAllProducts, getProductById, deleteProductById, addProducts, updateProducts } from "../helpers.js"
import { auth } from "../middleware/auth.js"

const router = express.Router()

//get all products
router.get('/', async (req, res) => {
    const { category, rating } = req.query
    console.log(req.query, category)
    if (req.query.rating) {
        req.query.rating = +req.query.rating
    }
    const product = await getAllProducts(req)

    res.send(product)
})

//products by id
router.get('/:id', async (req, res) => {
    const { id } = req.params
    console.log(req.params, id)
    const product = await getProductById(id)
    console.log(product)
    res.send(product)
})

//delete product by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    console.log(req.params, id)
    const product = await deleteProductById(id)
    console.log(product)
    res.send(product)
})

//add products
router.post('/', async (req, res) => {
    const newProduct = req.body
    console.log(newProduct)
    const result = await addProducts(newProduct)
    res.send(result)
})

//update products
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const updateProduct = req.body
    console.log(updateProduct)
    const result = await updateProducts(id, updateProduct)
    res.send(result)
})


export const productsRouter = router