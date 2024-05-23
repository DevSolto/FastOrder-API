import express from 'express'
import userRoutes from './routes/userRoutes'
import unitRoutes from './routes/unitRoutes'

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/unities', unitRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
