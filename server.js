import express from 'express'
import mongoose from 'mongoose'
import { registerValidation, loginValidation, postCreateValidation } from './validationd.js'
import checkAuth from './Utils/checkAuth.js';
import { register, login, getMe } from "./controllers/UserController.js";
import { create, getAll, getOnePost, removePost, update ,getLastTags} from "./controllers/PostController.js";
import multer from 'multer'
import handleValidationErrors from './Utils/handleValidationErrors.js';
import cors from 'cors'


//подключение базы данных mongodb
mongoose.connect(
    'mongodb+srv://admin:Qwer_1234@cluster0.wy8ihwv.mongodb.net/blog?retryWrites=true&w=majority'
).then(() => console.log('db ok'))
    .catch((err) => console.log('db err', err))


//передача логики в app
const app = express();

//создание хранилища
const storage = multer.diskStorage({
    //путь сохранения картинок
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    //имя файля
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }


})

//передаем хранилище мультеру
const upload = multer({ storage })

//разрешение позволяющее делать кросдоменные запросы
app.use(cors())

//разрешаем приложению читать json
app.use(express.json())

//после этого express начнет отображать картинки при запросе
app.use('/uploads', express.static('uploads'))

//путь запроса

//авторизация
app.post('/login', loginValidation, handleValidationErrors, login)

//post запрос регистрация
app.post('/register', registerValidation, handleValidationErrors, register);

//инфо обо мне
app.get('/auth/me', checkAuth, getMe)

//создание поста
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, create)

//поиск всех постов
app.get('/posts', getAll)

//получение определенной статьи
app.get('/posts/:id', getOnePost)

//удаление поста
app.delete('/post/:id', checkAuth, removePost)

// обновление статьи
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, update)
//получение тегов
app.get('/tags',getLastTags)

//загрузка картинки 
app.post('/uploads', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

//запуск сервера
app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(' Server ok')
})