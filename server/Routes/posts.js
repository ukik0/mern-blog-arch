import {Router} from "express";

import {create, getAll} from "../Controllers/posts.js";

import {checkAuth} from "../utils/checkAuth.js";

const router = Router()

//getAll
//http://localhost:8001/api/posts/getAll
router.get('/getAll', getAll)

//create
//http://localhost:8001/api/posts/create
router.post('/create', checkAuth, create)

export default router