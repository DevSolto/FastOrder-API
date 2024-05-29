
import express from 'express'; // Importa o framework Express
import userRoutes from './routes/userRoutes'; // Importa as rotas de usuário definidas em outro arquivo
import productRoutes from './routes/productRoutes';
import unitRoutes from './routes/unitRoutes';
import worksRoutes from './routes/workRoutes';
import orderRoutes from './routes/orderRoutes';
import orderItemsRoutes from './routes/orderItems'
import orderUnitiesRoutes from './routes/orderUnitiesRoutes'
import authRoutes from "./routes/authRoutes"
import cors from "cors"
import { isAuthenticated } from './middlewares/auth';

const app = express()

const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/users', [worksRoutes, userRoutes]); // Define o prefixo '/api/users' para todas as rotas de usuário
app.use('/api/products', productRoutes); // Define o prefixo '/api/users' para todas as rotas de usuário
app.use('/api/unities', unitRoutes); // Define o prefixo '/api/users' para todas as rotas de usuário
app.use('/api/orders', [orderUnitiesRoutes, orderItemsRoutes, orderRoutes])

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
