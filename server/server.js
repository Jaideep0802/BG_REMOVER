import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';

const PORT = process.env.PORT || 4000

const app = express()
await connectDB()

//initialize middleware

app.use(express.json())
app.use(cors())


//API Routes
app.get('/',(req,res)=>res.send("API Working"));
app.use('/api/user', userRouter)

app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))