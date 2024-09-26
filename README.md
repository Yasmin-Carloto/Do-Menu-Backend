# Do Menu - Backend
O Do Menu - Backend é uma aplicação desenvolvida para restaurantes, voltada para o cadastros dos itens que o menu desses restaurantes possui.
Além disso, este é o Projeto de Conclusão da matéria de Programação Web I, do curso de Informática do Instituto Federal do Ceará campus Fortaleza.

## Objetivo do desenvolvimento desta aplicação 🎯
Permitir o cadastro de um restaurante e, que esse, possa organizar os itens em seu menu de maneira online. Além disso, serve para concluir a matéria de Programação Web I, do curso de Informática do Instituto Federal do Ceará campus Fortaleza.

## Estruturação de pastas 🏗️
```
src -> diretório com a estrutura do projeto
    databases -> responsável pela conexão com o banco de dados
        models -> contém os modelos utilizados no projeto
            services -> contém as validações dos dados recebidos
                controllers -> lida com as requisições recebidas pela API
                    routes -> insistui a criação de rotas
                        app -> configurações principais da API
```

## Tecnologias utilizadas ⚙️
- Dependências:
    - **MongoDB:** banco de dados não relacional, utilizado para o armazenamento das informações de cada restaurante.
    - **Mongoose:** uma biblioteca para a implementação e uso da programação orientada a objetos. Além de ser o responsável por fazer a conexão com o banco de dados.
    - **bcrypt**: para a encriptação de senhas.
    - **cors:** para permitir o uso de CORS com várias opções.
    - **dotenv:** para o uso de variáveis de ambiente.
    - **Express:** um framework voltado para a criação de rotas e APIs.
    - **jsonwebtoken:** usado para a criação de tokens de autenticação.

- Dependências de Desenvolvimento
    - **nodemon:** usado para recarregar a API a cada nova alteração.

## Funções da aplicação 🛠️
- Cadastrar restaurante
- Logar restaurante
- Atualizar informações do restaurante
- Excluir conta do restaurante
- Recuperar informações do restaurante por ID
- Cadastrar novo item no menu do restaurante
- Ver todos os itens do menu do restaurante
- Atualizar itens do menu do restaurante
- Excluir itens do menu do restaurante 

## Use o projeto localmente 🏃‍♀️
1. Clone o repositório do projeto:
```
git clone https://github.com/Yasmin-Carloto/Do-Menu-Backend.git
```
2. Entre no repositório do projeto:
```
cd ./local/do/projeto
```
3. Abra com o VS Code ou com sua IDE de preferência.

4. Instale as dependências:
```
npm install
```
5. Configure o arquivo .env com:
```
CONNECTION_STRING_MONGODB = 
PASSWORD_DATABASE_MONGODB = 
USER_DATABASE_MONGODB = 
SECRET_KEY = 
```
6. Finalmente, digite no terminal: 
```
npm start
```
7. Pode utilizar a aplicação como bem desejar!