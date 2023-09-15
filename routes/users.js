import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { genPassword, createUser, getUserByName, getAllUser } from "../helpers.js"

const router = express.Router()

router.post('/signup', async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)

    const isUserExist = await getUserByName(username)
    //validate username
    if (isUserExist) {
        res.status(400).send({ message: "Username already exists" })
        return
    }
    //validate password
    if (!/^(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[#!@%$_]).{8,}$/g.test(password)) {
        res.status(400).send({ message: "Password pattern does not match" })
        return
    }
    const hashedPassword = await genPassword(password)
    const result = await createUser(username, hashedPassword)
    res.send(result)
})


router.post('/login', async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)

    const userFromDB = await getUserByName(username)
    console.log(userFromDB)
    //validate username
    if (!userFromDB) {
        res.status(400).send({ message: "Invalid Credentials" })
        return
    }
    const storedDbPassword = userFromDB.password
    const isPasswordMatch = await bcrypt.compare(password, storedDbPassword)
    if (!isPasswordMatch) {
        res.status(400).send({ message: "Invalid Credentials" })
        return
    }
    const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY)
    res.send({ message: "Login successful", token: token })
})

router.get("/get-users", async (req, res) => {
    const result = await getAllUser()
    res.send(result)
})

export const usersRouter = router


//Task
// Validate if username already present ✅
// Validate if password matches✅