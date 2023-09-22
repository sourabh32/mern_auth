import express, { urlencoded } from "express"
import path from "path"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser"
import { errorhandler,notFound } from "./middleware/errorMiddleware.js"
import connectDb from "./config/dbConfig.js"
dotenv.config()
const port = process.env.PORT || 5000
connectDb()
const app = express()

app.use(cookieParser())
// this middleware will automatically parse the JSON data and make it available in the req.body property of the request object
// application/json
app.use(express.json())

// is used for parsing URL-encoded data
// application/x-www-form-urlencoded
// make it available in the req.body property
app.use(express.urlencoded({extended:true}))




app.use("/api/users",userRoutes)

if(process.env.NODE_ENV == "production"){
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
}else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }

app.get("/",(req,res)=> res.send('server is working'))

app.use(notFound)
app.use(errorhandler)



app.listen(port,() => console.log(`server is listening at ${port}`) )