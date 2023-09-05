import express from 'express';
const userRoutes = express.Router();
import { addUser, addAllUser, updatedUser, deletedUser } from './user.control.js';
userRoutes.get("/user", addUser)
userRoutes.get("/allUsers", addAllUser)
userRoutes.patch("/:id", updatedUser )
userRoutes.delete("/:id", deletedUser)





export default userRoutes