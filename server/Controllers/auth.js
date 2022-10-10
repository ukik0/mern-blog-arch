import UserModel from "../Models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const {email, password, fullName} = req.body

        const isUsedEmail = await UserModel.findOne({email})

        if (isUsedEmail) {
            return res.status(404).json({message: 'Пользователь уже существует'})
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = new UserModel({
            email,
            password: hashedPassword,
            fullName,
        })
        await user.save()

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'})

        res.status(200).json({...user._doc, token, message: 'Регистрация прошла успешно'})
    } catch (e) {
        console.log(e)
        res.status(404).json({message: 'Ошибка при регистрации'})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body
    } catch (e) {
        console.log(e)
        res.status(404).json({message: 'Ошибка при авторизации'})
    }
}