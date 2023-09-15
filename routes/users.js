import express from "express"
import { genPassword } from "../helpers.js"

const router = express.Router()

router.post('/signup', async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    const hashedPassword = await genPassword(password)
    res.send(hashedPassword)
})

export const usersRouter = router


//Task
// Validate if username already present
// Validate if password matches