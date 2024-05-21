

<h1 align="center">Fast Order </h1>
<h4 align="center"> 
	🚧  🚀 Em construção...  🚧
</h4>
<p align="center">Este projeto é um sistema de gerenciamento de pedidos projetado para facilitar as transações entre unidades de fornecimento e unidades de venda em uma empresa. Utilizando tecnologias modernas como Node.js, TypeScript, e Prisma, este sistema permite operações eficientes e seguras de pedidos, melhorando a logística interna.</p>


## Descrição

O sistema foi desenvolvido para automatizar e otimizar o fluxo de pedidos em uma organização. Ele permite que unidades de venda solicitem produtos de unidades de fornecimento de forma eficiente, com um sistema robusto de acompanhamento de pedidos, previsão de entrega e gerenciamento de status de pedidos. Este sistema é essencial para empresas que buscam melhorar sua eficiência operacional e precisão no gerenciamento de inventário.

## Tecnologias Utilizadas

-   **Node.js**: Plataforma de execução JavaScript no lado do servidor.
-   **TypeScript**: Superset de JavaScript com tipagem estática para um desenvolvimento mais seguro e escalável.
-   **Express**: Framework de aplicativos web para construção de APIs.
-   **Prisma**: ORM utilizado para facilitar operações de banco de dados com segurança e eficiência.

### Funcionalidades


1.  [ ] **Gerenciamento de Pedidos**
    
    -   Criação de pedidos: Permitir que unidades de venda criem pedidos para unidades de fornecimento.
    -   Atualização de pedidos: Modificar detalhes de pedidos existentes.
    -   Visualização de pedidos: Ver todos os pedidos ativos, concluídos ou em diferentes estados de processamento.
      
3.  [ ]  **Rastreamento e Status de Pedidos**
    
    -   Acompanhamento do status de cada pedido (por exemplo, Pendente, Aceito, Em Produção, Enviado, Recebido).
    -   Atualização do status de pedidos conforme avançam nos estágios de processamento e entrega.
      
4.  [ ]  **Gerenciamento de Unidades**
    
    -   Cadastro de novas unidades de fornecimento e venda.
    -   Atualização dos dados das unidades (nome, endereço, contato, etc.).
    -   Remoção de unidades que não estão mais em operação.
      
5. [ ] **Gerenciamento de Usuários**
    
    -   Criação de contas de usuários que podem fazer pedidos ou gerenciar pedidos e unidades.
    -   Atualização de perfis de usuários, incluindo alteração de senhas e informações de contato.
    -   Deleção de usuários inativos ou que deixaram a empresa.
      
6. [ ] **Autenticação e Autorização**
    
    -   Controle de acesso para garantir que apenas usuários autorizados possam criar, visualizar, ou modificar pedidos e informações de unidade.
    -   Implementação de sessões seguras para usuários logados.
      
7. [ ] **Relatórios e Análises**
    
    -   Geração de relatórios sobre a atividade de pedidos, incluindo volumes de pedidos, frequência, e desempenho de entrega.
    -   Análises de eficiência das unidades de fornecimento e demanda das unidades de venda.
      
8. [ ] **Notificações e Alertas**
    
    -   Envio de notificações para usuários sobre atualizações importantes em seus pedidos ou mudanças no status.
    -   Alertas para os gerentes sobre problemas potenciais, como atrasos na entrega ou baixos níveis de estoque.

## Bibliotecas Utilizadas

### `express`
- **Descrição**: Express é um framework web minimalista para Node.js, que fornece um conjunto robusto de recursos para criar aplicações web e APIs.
- **Uso no Projeto**: Utilizado para configurar o servidor web, definir rotas e middleware.
- **Documentação**: [Express.js](https://expressjs.com/)

### `@prisma/client`
- **Descrição**: Prisma Client é um ORM (Object-Relational Mapping) que facilita a interação com o banco de dados. Ele é gerado automaticamente com base no schema definido no Prisma.
- **Uso no Projeto**: Utilizado para realizar operações de banco de dados, como criação, leitura, atualização e exclusão de registros.
- **Documentação**: [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client)

### `prisma`
- **Descrição**: Prisma é um ORM moderno que ajuda na modelagem de dados, migração e consultas em bancos de dados.
- **Uso no Projeto**: Utilizado para gerenciar o schema do banco de dados e gerar o cliente Prisma.
- **Documentação**: [Prisma](https://www.prisma.io/)

### `bcrypt`
- **Descrição**: Bcrypt é uma biblioteca para hashing de senhas, oferecendo uma forma segura de armazenar senhas.
- **Uso no Projeto**: Utilizado para hashear senhas antes de armazená-las no banco de dados.
- **Documentação**: [bcrypt](https://github.com/kelektiv/node.bcrypt.js)

### `class-validator`
- **Descrição**: Class-validator é uma biblioteca para validação de classes em TypeScript e JavaScript.
- **Uso no Projeto**: Utilizado para validar os dados das requisições antes de processá-los.
- **Documentação**: [class-validator](https://github.com/typestack/class-validator)

### `class-transformer`
- **Descrição**: Class-transformer é uma biblioteca que transforma objetos em instâncias de classes e vice-versa, facilitando a manipulação de dados.
- **Uso no Projeto**: Utilizado para transformar objetos JSON em instâncias de DTOs (Data Transfer Objects).
- **Documentação**: [class-transformer](https://github.com/typestack/class-transformer)

### `dotenv`
- **Descrição**: Dotenv é uma biblioteca que carrega variáveis de ambiente a partir de um arquivo `.env` para `process.env`.
- **Uso no Projeto**: Utilizado para gerenciar configurações e variáveis de ambiente de forma segura.
- **Documentação**: [dotenv](https://github.com/motdotla/dotenv)
