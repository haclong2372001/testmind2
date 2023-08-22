const userModel = require('../models/users.model')
const bcrypt = require ("bcryptjs")
const jwt = require("jsonwebtoken")
class UserController {
    async login(req, res) {
        const username = req.body.username
        const password = req.body.password
        if(!username){
            return res.status(400).json({message: "Ten dang nhap la bat buoc"})
        }
        if(!password){
            return res.status(400).json({message: "Mat Khau la bat buoc"})
        }
        const checkExist = await userModel.findOne({username: username})

        if(checkExist){
            return res.status(400).json({message: "Nguoi dung da ton tai"})
        }

        const checkpassword = bcrypt.compareSync(password,checkExist.password)
        if(!checkpassword){
            return res.status(401).json({message :"mat khau ko dung"})
        }
        checkExist.password = ""
        const accessToken = jwt.sign({
            userId: checkExist._id
        },process.env.JWT_SCRETKEY )
        return res.status(200).json({
            user: checkExist
        })
    }
    async signUp(req,res){
        const username = req.body.username
        const userPassword = req.body.password
        try {
            const checkUser = await userModel.findOne({
                username: username
            })
    
            if (checkUser) {
                return res.status(400).json({ message: "User is exist" })
            }
    
            const salt = bcrypt.genSaltSync()
            const hash = bcrypt.hashSync(userPassword, salt)
    
            const user = await userModel.create({
                username: username,
                password: hash
            })
    
            return res.status(200).json({
                message: "Create user success",
                user
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "error" })
        }
        
    }
    async getUser(req,res){

    }
}
module.exports = new UserController();