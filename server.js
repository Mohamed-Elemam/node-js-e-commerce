import express from 'express'
// import { config } from "dotenv";
// config();
import { dbConnection } from './database/dbConnection.js'
// import * as routers from './src/modules/index.routers.js'
// import categoyRouter from "./src/modules/categories/category.routes.js";
// import SubCategoyRouter from "./src/modules/subCategory/subCategory.routes.js";
// import brandRouter from "./src/modules/brand/brand.routes.js";
import { allRouters } from './src/modules/index.routers.js';

const app = express()
const port = 3000
// process.env.PORT 
app.use(express.json()) 

dbConnection()
allRouters(app)



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))