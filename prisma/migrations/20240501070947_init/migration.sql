/*
  Warnings:

  - You are about to drop the column `dataCriacao` on the `categoria` table. All the data in the column will be lost.
  - You are about to drop the column `dataModificacao` on the `categoria` table. All the data in the column will be lost.
  - You are about to drop the column `dataCriacao` on the `empresa` table. All the data in the column will be lost.
  - You are about to drop the column `dataModificacao` on the `empresa` table. All the data in the column will be lost.
  - The primary key for the `itens_pedido` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dataCriacao` on the `itens_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `dataModificacao` on the `itens_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `pedidoId` on the `itens_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `produtoId` on the `itens_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `dataCriacao` on the `pedido` table. All the data in the column will be lost.
  - You are about to drop the column `dataEntrega` on the `pedido` table. All the data in the column will be lost.
  - You are about to drop the column `dataModificacao` on the `pedido` table. All the data in the column will be lost.
  - You are about to drop the column `precisaoEntrega` on the `pedido` table. All the data in the column will be lost.
  - The primary key for the `producao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dataCriacao` on the `producao` table. All the data in the column will be lost.
  - You are about to drop the column `produtoId` on the `producao` table. All the data in the column will be lost.
  - You are about to drop the column `unidadeId` on the `producao` table. All the data in the column will be lost.
  - You are about to drop the column `categoriaCategoriaId` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `dataCriacao` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `dataModificacao` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `dataCriacao` on the `unidade` table. All the data in the column will be lost.
  - You are about to drop the column `dataModificacao` on the `unidade` table. All the data in the column will be lost.
  - You are about to drop the column `empresaId` on the `unidade` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoId` on the `unidade` table. All the data in the column will be lost.
  - You are about to drop the column `dataCriacao` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `dataModificacao` on the `usuario` table. All the data in the column will be lost.
  - The primary key for the `venda` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dataCriacao` on the `venda` table. All the data in the column will be lost.
  - You are about to drop the column `produtoId` on the `venda` table. All the data in the column will be lost.
  - You are about to drop the column `unidadeId` on the `venda` table. All the data in the column will be lost.
  - You are about to drop the `telefoneempresas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `telefoneusuarios` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `data_Modificacao` to the `Categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_Modificacao` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_Modificacao` to the `Itens_Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pedido_Id` to the `Itens_Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `produto_Id` to the `Itens_Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_Modificacao` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `produto_Id` to the `Producao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidade_Id` to the `Producao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_Modificacao` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_Modificacao` to the `Unidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_Modificacao` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `produto_Id` to the `Venda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidade_Id` to the `Venda` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `itens_pedido` DROP FOREIGN KEY `Itens_Pedido_pedidoId_fkey`;

-- DropForeignKey
ALTER TABLE `itens_pedido` DROP FOREIGN KEY `Itens_Pedido_produtoId_fkey`;

-- DropForeignKey
ALTER TABLE `producao` DROP FOREIGN KEY `Producao_produtoId_fkey`;

-- DropForeignKey
ALTER TABLE `producao` DROP FOREIGN KEY `Producao_unidadeId_fkey`;

-- DropForeignKey
ALTER TABLE `produto` DROP FOREIGN KEY `Produto_categoriaCategoriaId_fkey`;

-- DropForeignKey
ALTER TABLE `telefoneempresas` DROP FOREIGN KEY `TelefoneEmpresas_empresaId_fkey`;

-- DropForeignKey
ALTER TABLE `telefoneusuarios` DROP FOREIGN KEY `TelefoneUsuarios_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `unidade` DROP FOREIGN KEY `Unidade_empresaId_fkey`;

-- DropForeignKey
ALTER TABLE `unidade` DROP FOREIGN KEY `Unidade_enderecoId_fkey`;

-- DropForeignKey
ALTER TABLE `venda` DROP FOREIGN KEY `Venda_produtoId_fkey`;

-- DropForeignKey
ALTER TABLE `venda` DROP FOREIGN KEY `Venda_unidadeId_fkey`;

-- AlterTable
ALTER TABLE `categoria` DROP COLUMN `dataCriacao`,
    DROP COLUMN `dataModificacao`,
    ADD COLUMN `data_Criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `data_Modificacao` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `empresa` DROP COLUMN `dataCriacao`,
    DROP COLUMN `dataModificacao`,
    ADD COLUMN `data_Criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `data_Modificacao` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `itens_pedido` DROP PRIMARY KEY,
    DROP COLUMN `dataCriacao`,
    DROP COLUMN `dataModificacao`,
    DROP COLUMN `pedidoId`,
    DROP COLUMN `produtoId`,
    ADD COLUMN `data_Criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `data_Modificacao` DATETIME(3) NOT NULL,
    ADD COLUMN `pedido_Id` VARCHAR(191) NOT NULL,
    ADD COLUMN `produto_Id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`pedido_Id`, `produto_Id`);

-- AlterTable
ALTER TABLE `pedido` DROP COLUMN `dataCriacao`,
    DROP COLUMN `dataEntrega`,
    DROP COLUMN `dataModificacao`,
    DROP COLUMN `precisaoEntrega`,
    ADD COLUMN `data_Criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `data_Entrega` DATETIME(3) NULL,
    ADD COLUMN `data_Modificacao` DATETIME(3) NOT NULL,
    ADD COLUMN `previsao_Entrega` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `producao` DROP PRIMARY KEY,
    DROP COLUMN `dataCriacao`,
    DROP COLUMN `produtoId`,
    DROP COLUMN `unidadeId`,
    ADD COLUMN `data_Criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `produto_Id` VARCHAR(191) NOT NULL,
    ADD COLUMN `unidade_Id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`unidade_Id`, `produto_Id`);

-- AlterTable
ALTER TABLE `produto` DROP COLUMN `categoriaCategoriaId`,
    DROP COLUMN `dataCriacao`,
    DROP COLUMN `dataModificacao`,
    ADD COLUMN `categoria_Id` VARCHAR(191) NULL,
    ADD COLUMN `data_Criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `data_Modificacao` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `unidade` DROP COLUMN `dataCriacao`,
    DROP COLUMN `dataModificacao`,
    DROP COLUMN `empresaId`,
    DROP COLUMN `enderecoId`,
    ADD COLUMN `data_Criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `data_Modificacao` DATETIME(3) NOT NULL,
    ADD COLUMN `empresa_Id` VARCHAR(191) NULL,
    ADD COLUMN `endereco_Id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `dataCriacao`,
    DROP COLUMN `dataModificacao`,
    ADD COLUMN `data_Criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `data_Modificacao` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `venda` DROP PRIMARY KEY,
    DROP COLUMN `dataCriacao`,
    DROP COLUMN `produtoId`,
    DROP COLUMN `unidadeId`,
    ADD COLUMN `data_Criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `produto_Id` VARCHAR(191) NOT NULL,
    ADD COLUMN `unidade_Id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`unidade_Id`, `produto_Id`);

-- DropTable
DROP TABLE `telefoneempresas`;

-- DropTable
DROP TABLE `telefoneusuarios`;

-- CreateTable
CREATE TABLE `Telefone_Usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(20) NOT NULL,
    `usuarioId` VARCHAR(191) NULL,

    UNIQUE INDEX `Telefone_Usuarios_numero_key`(`numero`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Telefone_Empresas` (
    `id` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(20) NOT NULL,
    `empresa_Id` VARCHAR(191) NULL,

    UNIQUE INDEX `Telefone_Empresas_numero_key`(`numero`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Telefone_Usuarios` ADD CONSTRAINT `Telefone_Usuarios_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Telefone_Empresas` ADD CONSTRAINT `Telefone_Empresas_empresa_Id_fkey` FOREIGN KEY (`empresa_Id`) REFERENCES `Empresa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Unidade` ADD CONSTRAINT `Unidade_endereco_Id_fkey` FOREIGN KEY (`endereco_Id`) REFERENCES `Endereco`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Unidade` ADD CONSTRAINT `Unidade_empresa_Id_fkey` FOREIGN KEY (`empresa_Id`) REFERENCES `Empresa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_categoria_Id_fkey` FOREIGN KEY (`categoria_Id`) REFERENCES `Categoria`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Itens_Pedido` ADD CONSTRAINT `Itens_Pedido_pedido_Id_fkey` FOREIGN KEY (`pedido_Id`) REFERENCES `Pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Itens_Pedido` ADD CONSTRAINT `Itens_Pedido_produto_Id_fkey` FOREIGN KEY (`produto_Id`) REFERENCES `Produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producao` ADD CONSTRAINT `Producao_unidade_Id_fkey` FOREIGN KEY (`unidade_Id`) REFERENCES `Unidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producao` ADD CONSTRAINT `Producao_produto_Id_fkey` FOREIGN KEY (`produto_Id`) REFERENCES `Produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venda` ADD CONSTRAINT `Venda_unidade_Id_fkey` FOREIGN KEY (`unidade_Id`) REFERENCES `Unidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venda` ADD CONSTRAINT `Venda_produto_Id_fkey` FOREIGN KEY (`produto_Id`) REFERENCES `Produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
