import PostsModel from "../Models/Posts.js";

export const getAll = async (req, res) => {
    try {
        const posts = await PostsModel.find().sort({createdAt: -1}).populate('user')
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
            tags: tags.split(', '),
            imageUrl
        })

        await post.save()

        res.status(200).json({...post._doc, message: 'Пост успешно создан'})

    } catch (e) {
        console.log(e)
        res.status(404).json({message: 'Не удалось создать пост'})
    }
}

export const getOne = async (req, res) => {
    try {
        const {id} = req.params

        const post = await PostsModel.findByIdAndUpdate(id, {
            $inc: {viewsCount: 1}
        }).populate('user')

        if (!post) {
            return res.status(404).json({message: 'Пост не найден'})
        }

        res.status(200).json({...post._doc, message: 'Пост найден'})
    } catch (e) {
        console.log(e)
        res.status(404).json({message: 'Не удалось получить пост'})
    }
}

export const remove = async (req, res) => {
    try {
        const {id} = req.params

        const post = await PostsModel.findByIdAndDelete({_id: id})

        if (!post) {
            return res.status(404).json({message: 'Пост не найден'})
        }

        res.status(200).json({...post._doc, message: 'Пост успешно удален'})
    } catch (e) {
        console.log(e)
        res.status(404).json({message: 'Не удалось удалить пост'})
    }
}

export const update = async (req, res) => {
    try {
        const {id} = req.params
        const {title, text, imageUrl, tags} = req.body

        const post = await PostsModel.findByIdAndUpdate(
            {_id: id},
            {
                title,
                text,
                imageUrl,
                tags
            }
        )

        if (!post) {
            return res.status(404).json({message: 'Пост не найден'})
        }

        res.status(200).json({...post._doc, message: 'Пост обновлен'})
    } catch (e) {
        console.log(e)
        res.status(404).json({message: 'Не удалось обновить статью'})
    }
}