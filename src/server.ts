
import express from 'express'; // Importa o framework Express
import userRoutes from './routes/userRoutes'; // Importa as rotas de usuário definidas em outro arquivo
import productRoutes from './routes/productRoutes';
import unitRoutes from './routes/unitRoutes';
import worksRoutes from './routes/workRoutes';


const app = express()

const port = process.env.PORT || 3000
app.use(express.json())

app.use('/api/users', userRoutes); // Define o prefixo '/api/users' para todas as rotas de usuário
app.use('/api/products', productRoutes); // Define o prefixo '/api/users' para todas as rotas de usuário
app.use('/api/units', unitRoutes); // Define o prefixo '/api/users' para todas as rotas de usuário

app.use('/api/works', worksRoutes)




app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
