import { client } from "./index.js";

async function getAllProducts(req) {
    return await client.db("b49-wd").collection("products").find(req.query).toArray();
}
async function getProductById(id) {
    return await client.db("b49-wd").collection("products").findOne({ id: id });
}
async function deleteProductById(id) {
    return await client.db("b49-wd").collection("products").deleteOne({ id: id });
}
async function addProducts(newProduct) {
    return await client.db("b49-wd").collection("products").insertMany(newProduct);
}

async function updateProducts(id, updateProduct) {
    return await client.db("b49-wd").collection("products").updateOne({ id: id }, { $set: updateProduct });
}

export { getAllProducts, getProductById, deleteProductById, addProducts, updateProducts }