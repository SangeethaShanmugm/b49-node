import { client } from "./index.js";
import bcrypt from "bcrypt"
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



async function genPassword(password) {
    const salt = await bcrypt.genSalt(10)//bcrypt.genSalt(no. of rounds)
    // console.log(salt)
    const hashedPassword = await bcrypt.hash(password, salt)
    // console.log(hashedPassword)
    return hashedPassword
}
// console.log(genPassword("password@123"));

async function createUser(username, hashedPassword) {
    return await client.db("b49-wd").collection("users").insertOne({ username: username, password: hashedPassword })
}

async function getUserByName(username) {
    return await client.db("b49-wd").collection("users").findOne({ username: username })
}


async function getAllUser() {
    return await client.db("b49-wd").collection("users").find().toArray()
}


export { getAllProducts, getProductById, deleteProductById, addProducts, updateProducts, genPassword, createUser, getUserByName, getAllUser }