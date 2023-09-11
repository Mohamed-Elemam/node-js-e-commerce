import express from 'express'
import { config } from "dotenv";
config();
import { dbConnection } from './database/dbConnection.js'
import { allRouters } from './src/modules/index.routers.js';

const app = express()
const port = process.env.PORT 
app.use(express.json()) 

dbConnection()
allRouters(app)



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))