import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { validationResult } from "express-validator";
import { registerValidation } from './validations/auth.js'
import UserModel from './models/user.js'



//подключение базы данных mongodb
mongoose.connect(
    'mongodb+srv://admin:Qwer_1234@cluster0.wy8ihwv.mongodb.net/blog?retryWrites=true&w=majority'
).then(() => console.log('db ok'))
    .catch((err) => console.log('db err', err))


//передача логики в app
const app = express();

//разрешаем приложению читать json
app.use(express.json())

//путь запроса
//post запрос
app.post('/register', registerValidation, async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json(error.array())
        }
        //шифрование пароля
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        //создание пользователя
        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passworHash:hash,
        })

        const user = await doc.save()

        const token = jwt.sign({
            _id: user._id
        }
            , 'secret123',
            {
                expiresIn: '30d'
            }
        )

        const {passworHash, ...userData } = user._doc

            res.json({
                ...userData,
                token,
            })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не далось зарегистрироваться'
        })
    }
});

//запуск сервера
app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(' Server ok')
})