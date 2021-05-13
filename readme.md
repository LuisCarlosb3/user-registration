# User Register API 

Esta aplicação foi desenvolvida para a resolução de um desafio proposto em um processo de seleção

## Informações do projeto
Esta API foi desenvolvida em NodeJS, tendo sido aplicadas, as seguintes bibliotecas :

 - Express: mini framework para gerenciamento de rotas de acesso
 - Bcrypt: biblioteca utilizada para encryptar senhas
 - Knex: query-builder utilizado para facilitar operações com bancos de dados
 - Nodemailer: biblioteca utilizada para envio de e-mails
 - PG: cliente de conexão com o banco de dados PostgreSQL
 - Yup: biblioteca de validação de dados
 - Jest: utilizada para criação de testes, aplicada para garantir a confiabilidade da aplicação
 - Sucrase: utilizada para compilar os arquivos JS para sintaxes válidas com as versões LTS do NodeJS
 - Supertest: utilizada junto ao Jest, para permitir a realização de testes de integração

## Configuração e execução
Para executar a aplicação, devem ser definidas certas variáveis de ambiente para utilizar os recursos necessários, estas variáveis podem, tanto serem definidas pelo sistema, ou configuradas a partir do arquivo `index.js` presente na pasta `backend/src/main/config/index.js`. O arquivo contém:

 - env: especifica o ambiente onde está sendo executada a aplicação (development, production ou test)
 - port: especifica a porta a qual a aplicação irá responder as requisições HTTP
 - email_host:  endereço do servidor de email a ser utilizado,
 - email_port:  porta de conexão ao servidor de email 
 - email_user: usuário para autenticação ao servidor de email
 - email_password: senhapara autenticação ao servidor de email
 - db_name: nome do banco de dados a ser utilizado em ambiente de produção
 - db_user: usuário do banco de dados a ser utilizado em ambiente de produção
 - db_password: senha do banco de dados a ser utilizado em ambiente de produção

### Instalação de dependências e execução
Tratando-se de um ambiente NodeJS, na pasta backend é necessário executar o comando `npm install` para que as dependências sejam instaladas no servidor.
Após as instalações das bibliotecas e especificações das variáveis de ambiente, basta executar o comando `npm run build` que será gerada uma versão de produção do projeto.
Após a criação da versão de produção, é necessário executar o script `npm run knex:migrate:latest` para que as migrations possam ser configurar a base de dados correspondente ao ambiente definido na variável `env`. Tal comando precisa ser executado na versão de produção para garantir a compatibilidade entre a biblioteca knex e a sintaxe utilizada no projeto.
Para executá-lo, é necessário apenas executar o comando `npm start`ou utilizar alguma ferramenta, como o [pm2](https://pm2.keymetrics.io/) para manter a aplicação sempre em atividade.

### Rotas da aplicação
Por se tratar de apenas uma funcionalidade, a aplicação conta com apenas a seguinte rota que responde ao metodo `POST`:

    hostname:port/register
Os parametros necessários para o cadastro do usuário são:

- **name**: nome do usuário

- **email**: email único para acesso ao sistema
- **password**: senha para acesso ao sistema
- **confirm_password**: parametro para confirmação que deve ser igual ao password
- **cpf**: CPF do usuário
- **cep**: código postal do endereço do usuário
- **street**: nome da rua
- **complement**: complemento opcional para o endereço
- **district**: nome do bairro
- **city**: cidade
- **state**: estado
- **number**: numero opcional para residência 


Com base nas definições de códigos para operações HTTP, a rota pode retornar:

 **204**: código para operação bem sucedida é usuário criado
 
 **400**: registro de usuário não realizado, acompanha mensagem de erro

 **500**: operação não realizada devido a um erro no servidor da aplicação

