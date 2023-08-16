import express from 'express'
import mongoose from 'mongoose'
import { registerValidation } from './validations/auth.js'
import checkAuth from './Utils/checkAuth.js';
import { register, login, getMe } from "./controllers/UserController.js";


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

//авторизация
app.post('/login',login, login)
//post запрос регистрация
app.post('/register', registerValidation, register);
//инфо обо мне
app.get('/auth/me', checkAuth, getMe)

//запуск сервера
app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(' Server ok')
})