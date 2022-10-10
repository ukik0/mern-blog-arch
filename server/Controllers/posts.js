import PostsModel from "../Models/Posts.js";

export const getAll = async (req, res) => {
    try {
        const posts = await PostsModel.find().populate('user')
        const popularPosts = await PostsModel.find().sort({viewsCount: -1}).populate('user')

        res.status(200).json({posts, popularPosts})

    } catch (e) {
        console.log(e)
        res.status(404).json({message: 'Не удалось получить посты'})
    }
}

export const create = async (req, res) => {
    try {
        const {title, text, tags, imageUrl} = req.body

        const post = new PostsModel({
            title,
            text,
            user: req.userId,
            tags,
            imageUrl
        })

        await post.save()

        res.status(200).json({...post._doc, message: 'Пост успешно создан'})

    } catch (e) {
        console.log(e)
        res.status(404).json({message: 'Не удалось создать пост'})
    }
}