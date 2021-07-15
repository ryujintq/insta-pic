import express from 'express'
import connectDB from './utils/connectDB.js'
import { Server as socketIOServer } from 'socket.io'
import ioListeners from '../ioListeners.js'

//middleware
import cors from 'cors'
import errorMiddleware from './middleware/errorMiddleware.js'

//routes
import authRoute from './routes/authRoute.js'
import postRoute from './routes/postRoute.js'
import userRoute from './routes/userRoute.js'
import authMiddleware from './middleware/authMiddleware.js'

//initialize app and middleware
const app = express()
app.use(express.json())
app.use(cors())

//start server
const port = process.env.PORT || 4000
const server = app.listen(port, console.log(`server is listenting on port ${port}`))

//databse connection
connectDB()

//socket.io listeners
const io = new socketIOServer(server, { cors: { origin: '*' } })
ioListeners(io)

//routes
app.use('/api/v1/auth', authRoute)
app.use(authMiddleware)
app.use('/api/v1/posts', postRoute)
app.use('/api/v1/users', userRoute)

//error middleware must come after routes
app.use(errorMiddleware)
