import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/pt_BR';  // Usar localização brasileira para dados relevantes

const prisma = new PrismaClient();

export async function seedUserUnity() {
  const users = await prisma.usuario.findMany()
  const unities = await prisma.unidade.findMany()
  let iUnities = 0
  let iUser = 0
  while (iUser < users.length) {
    if (iUnities < unities.length) {
      await prisma.usuario.update({
        where: {
          id: users[iUser].id
        },
        data: {
          unidadeId: unities[iUnities].id
        }
      })
      iUnities++
      iUser++
    } else {
      iUnities = 0
    }
  }
}