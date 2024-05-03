import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/pt_BR';  // Usar localização brasileira para dados relevantes

const prisma = new PrismaClient();

export async function seedCategory() {
  // Lista de categorias de produtos
const categorias: string[] = [
  "Eletrônicos",
  "Vestuário",
  "Alimentos",
  "Livros",
  "Jogos",
  "Esportes",
  "Casa e Jardim",
  "Beleza e Saúde",
  "Automotivo",
  "Brinquedos"
];

// Lista de descrições para as categorias
const descricoes: string[] = [
  "Produtos relacionados a tecnologia, como smartphones e computadores.",
  "Roupas masculinas, femininas e infantis para todas as estações.",
  "Itens essenciais de alimentação, incluindo snacks, refeições e bebidas.",
  "Uma vasta seleção de livros, incluindo ficção, não-ficção e acadêmicos.",
  "Jogos de vídeo game, tabuleiro e cartas para todas as idades.",
  "Equipamentos e roupas esportivas para diversas modalidades.",
  "Itens para decoração, renovação e manutenção de casa e jardim.",
  "Produtos de cuidado pessoal, maquiagem e saúde.",
  "Acessórios e peças para carros, motocicletas e bicicletas.",
  "Brinquedos educativos, divertidos e seguros para crianças."
];
  const categorysData = [];
  for (let i = 0; i < categorias.length; i++) {
    categorysData.push({
      nome: categorias[i],
      descricao: descricoes[i]
    });
  }

  // Insere os dados no banco de dados
  for (const CategoryData of categorysData) {
    await prisma.categoria.create({
      data: CategoryData
    });
  }
}