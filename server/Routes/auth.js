import {Router} from "express";

import {login, register} from "../Controllers/auth.js";

const router = Router()

//Register
//http://localhost:8001/api/auth/register
router.post('/register', register)

//Login
//http://localhost:8001/api/auth/login
router.post('/login', login)

export default router