-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDENTE', 'ACEITO', 'NEGADO', 'PRODUCAO', 'ENTREGA', 'RECEBIDO', 'FINALIZADO');

-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('FORNECEDORA', 'VENDEDORA');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "cpf" CHAR(11) NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(100) NOT NULL,
    "data_Criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_Modificacao" TIMESTAMP(3) NOT NULL,
    "unidadeId" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Telefone_Usuarios" (
    "id" TEXT NOT NULL,
    "numero" VARCHAR(20) NOT NULL,
    "usuarioId" TEXT,

    CONSTRAINT "Telefone_Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Telefone_Empresas" (
    "id" TEXT NOT NULL,
    "numero" VARCHAR(20) NOT NULL,
    "empresa_Id" TEXT,

    CONSTRAINT "Telefone_Empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "cnpj" CHAR(18) NOT NULL,
    "descricao" TEXT NOT NULL,
    "data_Criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_Modificacao" TIMESTAMP(3) NOT NULL,
    "email" VARCHAR(100) NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" TEXT NOT NULL,
    "data_Criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_Modificacao" TIMESTAMP(3) NOT NULL,
    "previsao_Entrega" TIMESTAMP(3),
    "data_Entrega" TIMESTAMP(3),
    "status" "Status" NOT NULL DEFAULT 'PENDENTE',
    "observacao" TEXT NOT NULL,
    "usuarioId" TEXT,
    "unidadeFornecedoraId" TEXT,
    "unidadeRecebedoraId" TEXT,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unidade" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "descricao" TEXT NOT NULL,
    "data_Criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_Modificacao" TIMESTAMP(3) NOT NULL,
    "tipo" "Tipo" NOT NULL,
    "enderecoId" TEXT,
    "empresaId" TEXT,

    CONSTRAINT "Unidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Endereco" (
    "id" TEXT NOT NULL,
    "cep" CHAR(9) NOT NULL,
    "pais" VARCHAR(50) NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "cidade" TEXT NOT NULL,
    "logradouro" VARCHAR(100) NOT NULL,
    "numero" VARCHAR(50) NOT NULL,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "descricao" TEXT NOT NULL,
    "data_Criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_Modificacao" TIMESTAMP(3) NOT NULL,
    "categoria_Id" TEXT,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "descricao" TEXT NOT NULL,
    "data_Criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_Modificacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Itens_Pedido" (
    "pedido_Id" TEXT NOT NULL,
    "produto_Id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "data_Criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_Modificacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Itens_Pedido_pkey" PRIMARY KEY ("pedido_Id","produto_Id")
);

-- CreateTable
CREATE TABLE "Producao" (
    "unidade_Id" TEXT NOT NULL,
    "produto_Id" TEXT NOT NULL,
    "data_Criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Producao_pkey" PRIMARY KEY ("unidade_Id","produto_Id")
);

-- CreateTable
CREATE TABLE "Venda" (
    "unidade_Id" TEXT NOT NULL,
    "produto_Id" TEXT NOT NULL,
    "data_Criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Venda_pkey" PRIMARY KEY ("unidade_Id","produto_Id")
);

-- CreateTable
CREATE TABLE "_EmpresaToUsuario" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cpf_key" ON "Usuario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Telefone_Usuarios_numero_key" ON "Telefone_Usuarios"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Telefone_Empresas_numero_key" ON "Telefone_Empresas"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_cnpj_key" ON "Empresa"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_email_key" ON "Empresa"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_EmpresaToUsuario_AB_unique" ON "_EmpresaToUsuario"("A", "B");

-- CreateIndex
CREATE INDEX "_EmpresaToUsuario_B_index" ON "_EmpresaToUsuario"("B");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Telefone_Usuarios" ADD CONSTRAINT "Telefone_Usuarios_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Telefone_Empresas" ADD CONSTRAINT "Telefone_Empresas_empresa_Id_fkey" FOREIGN KEY ("empresa_Id") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_unidadeFornecedoraId_fkey" FOREIGN KEY ("unidadeFornecedoraId") REFERENCES "Unidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_unidadeRecebedoraId_fkey" FOREIGN KEY ("unidadeRecebedoraId") REFERENCES "Unidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unidade" ADD CONSTRAINT "Unidade_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unidade" ADD CONSTRAINT "Unidade_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_categoria_Id_fkey" FOREIGN KEY ("categoria_Id") REFERENCES "Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itens_Pedido" ADD CONSTRAINT "Itens_Pedido_pedido_Id_fkey" FOREIGN KEY ("pedido_Id") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itens_Pedido" ADD CONSTRAINT "Itens_Pedido_produto_Id_fkey" FOREIGN KEY ("produto_Id") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producao" ADD CONSTRAINT "Producao_unidade_Id_fkey" FOREIGN KEY ("unidade_Id") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producao" ADD CONSTRAINT "Producao_produto_Id_fkey" FOREIGN KEY ("produto_Id") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_unidade_Id_fkey" FOREIGN KEY ("unidade_Id") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_produto_Id_fkey" FOREIGN KEY ("produto_Id") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmpresaToUsuario" ADD CONSTRAINT "_EmpresaToUsuario_A_fkey" FOREIGN KEY ("A") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmpresaToUsuario" ADD CONSTRAINT "_EmpresaToUsuario_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
