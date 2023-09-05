import express from 'express';
const app = express()
import userRoutes from './modules/Users/user.routes.js';
import { user } from './modules/db/UsersAndPosts.js';
const port = 5500
app.use(user);
app.use(userRoutes)
app.get("/", (req, res) => res.send("Hello Mousa"))
app.listen(port, () => console.log(`Example app listen on port ${port}`))