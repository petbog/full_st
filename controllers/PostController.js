import PostModel from "../models/post.js";

//получение всех статей
export const getAll = async (req, res) => {
    try {
        //подключение связи
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}
//получение всех тегов
export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts.map(obj => obj.tags).flat().slice(0, 5)

        res.json(tags)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}
//получение одной статьи
//старый вариант
// export const getOnePost = async (req, res) => {
//     try {
//         //узнаем динамический id
//         const postId = req.params.id

//         PostModel.findByIdAndUpdate(
//             {
//                 //находим статью с этим id 
//                 _id: postId,
//             }, {
//             //увеличиваем парамметры этой стать
//             $inc: { viewsCount: 1 }
//         }, {
//             //после обновление статьи возвращаем актуальные данные
//             returnDocument: 'after'
//         }, (err, doc) => {
//             if (err) {
//                 console.log(err)
//                 return res.status(500).json({
//                     message: "не удалось вернуть статью"
//                 })
//             }
//             if (!doc) {
//                 return res.status(404).json({
//                     message: "Статья не найдена "
//                 })
//             }

//             res.json(doc)
//         })

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             message: "Не удалось получить статью"
//         })
//     }
// }
//новый вариант
export const getOnePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const doc = await PostModel.findByIdAndUpdate(
            postId,
            { $inc: { viewsCount: 1 } },
            { new: true }
        ).exec();

        if (!doc) {
            return res.status(404).json({ message: "Статья не найдена" });
        }

        res.json(doc);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Не удалось получить статью" });
    }
};

//удаление статьи
//старый вариант
// export const removePost = async (req, res) => {
//     try {
//         const postId = req.params.id;

//          PostModel.findByIdAndDelete({
//             _id:postId,
//          },(err,doc)=>{
//             if(err){
//                 console.log(err)
//                 return res.status(500).json({
//                     message:"Не удалось удалить статью"
//                 })
//             }
//             if(!doc){
//                 return res.status(404).json({ message: "Статья не найдена" });
//             }

//             res.json({
//                 success:true
//             });
//          })


//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: "Не удалось удалить статью" });
//     }
// }
//новый вариант
export const removePost = async (req, res) => {
    const postId = req.params.id;

    try {
        const doc = await PostModel.findByIdAndDelete(postId);
        if (!doc) {
            return res.status(404).json({ message: "Статья не найдена" });
        }

        res.json({
            success: true
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Не удалось удалить статью"
        });
    }
};

//создание статьи
export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId
        })
        const post = await doc.save()

        res.json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось создать статью'
        })
    }
}

//обновление статей

export const update = async (req, res) => {
    try {
        const postId = req.params.id;
        await PostModel.updateOne(
            {
                _id: postId
            }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.body.user,
            tags: req.body.tags,
        }
        )
        res.json({
            success: true
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Не удалось обновить статьи"
        })

    }
}