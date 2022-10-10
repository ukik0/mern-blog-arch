import {Router} from "express";

import {create, getAll, getOne, remove, update} from "../Controllers/posts.js";

import {checkAuth} from "../utils/checkAuth.js";

const router = Router()

//getAll
//http://localhost:8001/api/posts/getAll
router.get('/getAll', getAll)

//getOne
//http://localhost:8001/api/posts/:id
router.get('/:id', getOne)

//create
//http://localhost:8001/api/posts/create
router.post('/create', checkAuth, create)

//delete
//http://localhost:8001/api/posts/:id
router.delete('/:id', checkAuth, remove)

//update
//http://localhost:8001/api/posts/:id
router.patch('/:id', checkAuth, update)

export default router