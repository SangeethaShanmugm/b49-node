
import express from "express"
import { MongoClient } from "mongodb"
import cors from "cors"
import 'dotenv/config'
import { productsRouter } from "./routes/products.js"
import { usersRouter } from "./routes/users.js"
const app = express()
const PORT = 9000

//Interceptor => converting body to json
app.use(express.json()) //Inbuilt middleware => to say data is in JSON
app.use(cors())

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

export const client = await createConnection()

//REST API endpoints
//req => what we send to server
//res => what we receive from server
app.get('/', (req, res) => {
    res.send('Hello Everyone🥳🥳🥳')
})

app.use("/products", productsRouter)

app.use("/users", usersRouter)

app.listen(PORT, () => console.log("The server started on the port", PORT))



