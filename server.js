import express from 'express'
// import { config } from "dotenv";
// config();
import { dbConnection } from './database/dbConnection.js'
// import * as routers from './src/modules/index.routers.js'
import categoyRouter from "./src/modules/categories/category.routes.js";
import SubCategoyRouter from "./src/modules/subCategory/subCategory.router.js";
import brandRouter from "./src/modules/brand/brand.router.js";
import productRouter from "./src/modules/product/product.router.js";

const app = express()
const port = 3000
// process.env.PORT 
app.use(express.json()) 

dbConnection()

app.use('/api/v1/category',categoyRouter)
app.use('/api/v1//subCategory',SubCategoyRouter)
app.use('/api/v1//brand',brandRouter)
app.use('/api/v1//product',productRouter)
// app.use('*', (req, res) => res.status(404).json({ message: '404 Not Found URL' }))
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))