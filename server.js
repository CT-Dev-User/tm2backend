
// app.use( frontPage);
import express from 'express';
import { conn } from './connection.js';
// import {frontPage} from './routes/navbar.js'
import cors from 'cors'
import router from './routes/dataRoute.js';
import homeRouter from './routes/homeRoutes.js';
import queryformrouter from './controllers/aboutUs/queryFormData.js';


// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// app.use(frontPage);
app.use(homeRouter)
app.use(queryformrouter)
app.use(router)

app.listen(8000,()=>{
  console.log(`server running @ http://localhost:8000`)
})