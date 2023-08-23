const userModel = require('../models/users.model')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { token } = require('morgan')
class UserController {
    async login(req, res) {
        const username = req.body.username
        const password = req.body.password
        if (!username) {
            return res.status(400).json({ message: "Ten dang nhap la bat buoc" })
        }
        if (!password) {
            return res.status(400).json({ message: "Mat Khau la bat buoc" })
        }
        const checkExist = await userModel.findOne({ username: username })

        if (!checkExist) {
            return res.status(400).json({ message: "Nguoi dung da ton tai" })
        }

        const checkpassword = bcrypt.compareSync(password, checkExist.password)
        if (!checkpassword) {
            return res.status(401).json({ message: "mat khau ko dung" })
        }
        checkExist.password = ""
        const accessToken = jwt.sign({
            userId: checkExist._id
        }, process.env.JWT_SCRETKEY)
        return res.status(200).json({
            user: checkExist,
            token : accessToken
        })
    }
    async signUp(req, res) {
        const username = req.body.username
        const password = req.body.password
        try {
            if (!username) {
                return res.status(401).json({ message: "ten dang nhap la bat buoc" })
            }
            if (!password) {
                return res.status(401).json({ message: " mat khau la bat buoc" })
            }
            const checkExist = await userModel.findOne({ username: username })
            if (checkExist) {
                return res.status(400).json({ message: "nguoi dung da ton tai" })
            }
            const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND))
            const hash = bcrypt.hashSync(password)
            const result = await userModel.create({
                username: username,
                password: hash
            })
            return res.status(200).json({ message: "dang ki thanh cong" })
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }

    }
    async getUser(req, res) {

    }
}
module.exports = new UserController();