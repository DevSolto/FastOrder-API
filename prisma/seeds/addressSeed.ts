import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/pt_BR';  // Usar localização brasileira para dados relevantes

const prisma = new PrismaClient();

export async function seedAddress() {
  const addressesData = [];
  for (let i = 0; i < 15; i++) {
    addressesData.push({
      cep: faker.location.zipCode('#####-###'),  
      pais: faker.location.country(),
      uf: faker.location.state({abbreviated:true}),
      cidade: faker.location.city(),
      logradouro: faker.location.street(),
      numero: ""+faker.number.int(100)  
    });
  }

  // Insere os dados no banco de dados
  for (const addressData of addressesData) {
    const address = await prisma.endereco.create({
      data: addressData
    });
    console.log(`Endereço criado: ${address.logradouro}, ${address.numero}`);
  }
}