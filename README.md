

<h1 align="center">Smart Requests </h1>
<h4 align="center"> 
	🚧  🚀 Em construção...  🚧
</h4>
<p align="center">Este projeto é um sistema de gerenciamento de pedidos projetado para facilitar as transações entre unidades de fornecimento e unidades de venda em uma empresa. Utilizando tecnologias modernas como Node.js, TypeScript, e Prisma, este sistema permite operações eficientes e seguras de pedidos, melhorando a logística interna e a gestão de estoque.</p>


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
    -   Deleção de pedidos: Remover pedidos que não são mais necessários ou que foram criados por engano.
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

## Instalação

Para instalar e configurar o sistema localmente, siga estes passos:

```bash
git clone https://seu-repositorio-aqui.git
cd nome-do-projeto
npm install
```
Configure o ambiente local criando um arquivo `.env` na raiz do projeto com as seguintes variáveis:

makefile

`DATABASE_URL="sua_url_de_conexao_com_o_banco_de_dados"`

Gere e aplique as migrações do Prisma:

```bash
npx prisma migrate dev
```
Popule o banco de dados:

```bash
npm run seed
```
Inicie o servidor:

```bash
npm start
```
## Uso

Após iniciar o servidor, você pode acessar os endpoints da API, como `/pedidos` para criar e gerenciar pedidos, `/unidades` para gerenciar informações das unidades de fornecimento e venda.
