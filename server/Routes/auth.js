import {Router} from "express";

import {getMe, login, register} from "../Controllers/auth.js";

const router = Router()

//Register
//http://localhost:8001/api/auth/register
router.post('/register', register)

//Login
//http://localhost:8001/api/auth/login
router.post('/login', login)

//Me
//http://localhost:8001/api/auth/me
router.post('/me', getMe)

export default router