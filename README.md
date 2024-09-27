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
- Atualizar itenm do menu do restaurante
- Excluir item do menu do restaurante 

## Rotas 🛣️
- Cadastrar restaurante
    ```
    http://localhost:3000/restaurant/register
    ```
    * Colocar no body da requisição as seguintes informações para criar um novo restaurante:
    ```
    {
        "name": "",
        "password": "",
        "passwordConfirmation": "",
        "phoneNumber": 00000000000 (um número deve ser passado aqui),
        "email": ""
    }
    ``` 
- Logar restaurante
    ```
    http://localhost:3000/restaurant/login
    ```
    * Colocar no body da requisição as seguintes informações para fazer login com um restaurante:
    ```
    {
        "email": "",
        "password": "",
    }
    ``` 
- Atualizar informações do restaurante
    ```
    http://localhost:3000/restaurant
    ```
    * Colocar no body da requisição os campos do restaurante que devem ser alterados (a senha não pode ser passada). Ex:
    ```
    {
        "email": "",
    }
    ```
    * Colocar no header da requisição o token de autorização:
    ```
    "Authorization": "seu-token-de-acesso"
    ```
- Excluir conta do restaurante
    ```
    http://localhost:3000/restaurant/
    ```
   * Colocar no header da requisição o token de autorização:
    ```
    "Authorization": "seu-token-de-acesso"
    ```
- Recuperar informações do restaurante por ID
    ```
    http://localhost:3000/restaurant
    ```
    * Colocar no header da requisição o token de autorização:
    ```
    "Authorization": "seu-token-de-acesso"
    ```
- Cadastrar novo item no menu do restaurante
    ```
    http://localhost:3000/restaurant/create-new-menu-item
    ```
    * Colocar no body da requisição as seguintes informações para a criação de um novo item no menu do restaurante:
    ```
    {
        "name": "",
        "image": "",
        "description": "",
        "price": (um número deve ser passado aqui)
    }
    ```
    * Colocar no header da requisição o token de autorização:
    ```
    "Authorization": "seu-token-de-acesso"
    ```
- Ver todos os itens do menu do restaurante
    ```
    http://localhost:3000/restaurant/menu
    ```
    * Colocar no header da requisição o token de autorização:
    ```
    "Authorization": "seu-token-de-acesso"
    ```
- Atualizar item do menu do restaurante
    ```
    http://localhost:3000/restaurant/update/:id
    ```
    * Colocar ID do item do menu a ser alterado como parâmetro na URL da requisição
    * Colocar no body as informações sobre o item do menu que foram alteradas e, as que não foram, devem ser colocadas as informações concedidas.
    ```
    {
        "name": "",
        "image": "",
        "description": "",
        "price": (um número deve ser passado aqui)
    }
    ```
    * Colocar no header da requisição o token de autorização:
    ```
    "Authorization": "seu-token-de-acesso"
    ```
- Excluir itenm do menu do restaurante 
    ```
    http://localhost:3000/restaurant/delete/:id
    ```
    * Colocar ID do item do menu a ser excluido como parâmetro na URL da requisição
    * Colocar no header da requisição o token de autorização:
    ```
    "Authorization": "seu-token-de-acesso"
    ```

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