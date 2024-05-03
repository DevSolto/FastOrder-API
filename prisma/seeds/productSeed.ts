import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/pt_BR';  // Usar localização brasileira para dados relevantes

const prisma = new PrismaClient();

export async function seedProduct() {
  const productsData = [];
  for (let i = 0; i < 40; i++) {
    productsData.push({
      nome:faker.commerce.product(),
      descricao: faker.commerce.productDescription()
    });
  }

  // Insere os dados no banco de dados
  for (const productData of productsData) {
    const product = await prisma.produto.create({
      data: productData
    });
  }
}