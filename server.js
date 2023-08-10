import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { registerValidation } from './validations/auth.js'
//подключение базы данных mongodb
mongoose.connect(
    'mongodb+srv://admin:Qwer_1234@cluster0.wy8ihwv.mongodb.net/?retryWrites=true&w=majority'
).then(() => console.log('db ok'))
    .catch((err) => console.log('db err', err))


//передача логики в app
const app = express();

//разрешаем приложению читать json
app.use(express.json())

//путь запроса
//post запрос
app.post('/register', (req, res) => {

});

//запуск сервера
app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(' Server ok')
})