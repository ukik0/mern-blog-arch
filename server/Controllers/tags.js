import PostsModel from "../Models/Posts.js";

export const allTags = async (req, res) => {
    try {
        const posts = await PostsModel.find().limit(5)

        const tags = posts.map((item) => item.tags).flat().slice(0,5)

        res.status(202).json({tags})
    } catch (e) {
        console.log(e)
        res.status(404).json({message: 'Ошибка получния тегов'})
    }
}

export const getPostByTags = async (req, res) => {
    try {
        const {id} = req.params
        const posts = await  PostsModel.find({tags: id.split(', ')}).populate('user')
        res.status(200).json({posts})
    } catch (e) {
        console.log(e)
        res.status(404).json({message: 'Ошибка получния статей по тегам'})
    }
}