import {Router} from "express";

import {allTags, getPostByTags} from "../Controllers/tags.js";
const router = Router()


//allTags
//http://localhost:8001/api/tags/allTags
router.get('/allTags', allTags)

//getPostByTags
//http://localhost:8001/api/tags/getPostByTags
router.get('/getPostByTags/:id', getPostByTags)


export default router