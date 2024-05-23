import express from 'express'; // Importa o framework Express
import userRoutes from './routes/userRoutes'; // Importa as rotas de usuário definidas em outro arquivo
import productRoutes from './routes/productRoutes';

const app = express(); // Cria uma instância da aplicação Express
const port = process.env.PORT || 3000; // Define a porta do servidor, utilizando a variável de ambiente PORT ou 3000 como padrão

app.use(express.json()); // Middleware que permite o Express interpretar JSON no corpo das requisições

app.use('/api/users', userRoutes); // Define o prefixo '/api/users' para todas as rotas de usuário
app.use('/api/products', productRoutes); // Define o prefixo '/api/users' para todas as rotas de usuário

// Inicia o servidor na porta definida
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Loga no console a mensagem de que o servidor está rodando e a porta utilizada
});
