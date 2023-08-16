import PostModel from "../models/post.js";


export const create = async(req,res)=>{
    try {
        const doc = new PostModel({
            title:req.body.title,
            text:req.body.text,
            tags:req.body.tags,
            imageUrl:req.body.imageUrl,
            user:req.userId
        })
        const post = await doc.save()

        res.json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Не удалось создать статью'
        })
    }
}