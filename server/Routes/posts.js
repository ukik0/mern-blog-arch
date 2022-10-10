import {Router} from "express";

import {create, getAll, getOne} from "../Controllers/posts.js";

import {checkAuth} from "../utils/checkAuth.js";

const router = Router()

//getAll
//http://localhost:8001/api/posts/getAll
router.get('/getAll', getAll)

//create
//http://localhost:8001/api/posts/create
router.post('/create', checkAuth, create)

//getOne
//http://localhost:8001/api/posts/:id
router.get('/:id', getOne)

export default router