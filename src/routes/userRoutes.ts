import { Router } from 'express'; // Importa o Router do Express
import { UserController } from '../controllers/userController'; // Importa o controlador de usuários

const router = Router(); // Cria uma instância do Router
const userController = new UserController(); // Cria uma instância do UserController

// Define a rota GET para buscar um usuário por ID
// A rota espera um parâmetro de caminho ':id' que representa o ID do usuário
router.get('/:id', async (req, res) => {
  return await userController.getById(req, res); // Chama o método getById do UserController
});

// Define a rota POST para criar um novo usuário
// A rota espera o corpo da requisição com os dados do novo usuário
router.post('/', async (req, res) => {
  return await userController.create(req, res); // Chama o método create do UserController
});

export default router; // Exporta o roteador configurado
