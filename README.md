
# Smart Requests 

Este projeto é um sistema de gerenciamento de pedidos projetado para facilitar as transações entre unidades de fornecimento e unidades de venda em uma empresa. Utilizando tecnologias modernas como Node.js, TypeScript, e Prisma, este sistema permite operações eficientes e seguras de pedidos, melhorando a logística interna e a gestão de estoque.

## Descrição

O sistema foi desenvolvido para automatizar e otimizar o fluxo de pedidos em uma organização. Ele permite que unidades de venda solicitem produtos de unidades de fornecimento de forma eficiente, com um sistema robusto de acompanhamento de pedidos, previsão de entrega e gerenciamento de status de pedidos. Este sistema é essencial para empresas que buscam melhorar sua eficiência operacional e precisão no gerenciamento de inventário.

## Tecnologias Utilizadas

-   **Node.js**: Plataforma de execução JavaScript no lado do servidor.
-   **TypeScript**: Superset de JavaScript com tipagem estática para um desenvolvimento mais seguro e escalável.
-   **Express**: Framework de aplicativos web para construção de APIs.
-   **Prisma**: ORM utilizado para facilitar operações de banco de dados com segurança e eficiência.

## Instalação

Para instalar e configurar o sistema localmente, siga estes passos:

bash

Copy code

`git clone https://seu-repositorio-aqui.git
cd nome-do-projeto
npm install` 

Configure o ambiente local criando um arquivo `.env` na raiz do projeto com as seguintes variáveis:

makefile

Copy code

`DATABASE_URL="sua_url_de_conexao_com_o_banco_de_dados"`

Gere e aplique as migrações do Prisma:

bash

Copy code

`npx prisma migrate dev` 

Popule o banco de dados:

bash

Copy code

`npm run seed` 

Inicie o servidor:

bash

Copy code

`npm start` 

## Uso

Após iniciar o servidor, você pode acessar os endpoints da API, como `/pedidos` para criar e gerenciar pedidos, `/unidades` para gerenciar informações das unidades de fornecimento e venda.