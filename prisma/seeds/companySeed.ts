import { PrismaClient } from '@prisma/client';
import { cnpj as cnpjValidator } from 'cpf-cnpj-validator';
import { fakerPT_BR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedCompany() {
  const companiesData = [];

  for (let i = 0; i < 4; i++) {
    companiesData.push({
      nome: faker.company.name(),
      cnpj: cnpjValidator.generate(),
      descricao: faker.lorem.paragraph(),
      email: faker.internet.email()
    });
  }   

  for (const companyData of companiesData) {
    const company = await prisma.empresa.create({
      data: companyData
    });
    console.log(`Usuário criado: ${company.nome}`);
  }
}