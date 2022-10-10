import jwt from 'jsonwebtoken'

export const checkAuth = async (req, res, next) => {
    try {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.userId = decoded._id

            next()
        }
    } catch (e) {
        console.log(e)
        res.status(404).json({message: 'Ошибка получния пользователя'})
    }
}