# FTOTEM (🚫descontinuado)

![version](https://img.shields.io/badge/Version-v1.7.0-white)
![License](https://img.shields.io/badge/License-MIT-ff4)
![Docker](https://img.shields.io/badge/Codeigniter-orange)
![vue](https://img.shields.io/badge/Vue.js-55ff55)

**O repositório foi descontinuado, veja o** [novo repositório](https://github.com/josafaverissimo/hi-party)

Este repositório é uma nova perspectiva do respotório: https://github.com/josafaverissimo/totem-project

Sistema web para eventos, onde o objeto é manter uma base de dados dos usuários, clientes e eventos.

Há duas aplicações, uma para administrar a base de dados e outra que rodará no totem, onde o cliente (visitante)
poderá gravar um vídeo que será exibido posteriormente.

Na aplicação onde se administra os dados, é possível ver e baixar os vídeos gravados pelos clientes.

**Clique na imagem abaixo** para ver o vídeo de apresentação do sistema

[![Video](https://i.imgur.com/yJz7Biz.png)](https://youtu.be/jNXnE-PY-Qs)

## Configurando o projeto

O sistema foi desenvolvido com PHP 8.3, Vue.js 3, MariaDB e Codeigniter 4.5.0. 

### Docker

*Em breve*

### Manualmente

Siga as instruções abaixo na raiz do projeto

#### Configurando a aplicação de administração

* Configure a conexão do banco de dados através das variáveis de ambiente no arquivo .env
    ```shell
    cp env .env
    ```
    * Agora basta definir os valores às respectivas variáveis:
      * database.default.hostname = *hostname*
      * database.default.database = *database*
      * database.default.username = *username*
      * database.default.password = *password*
      * database.default.DBDriver = **MySQLi** *#Deve ser **exatamente** MySQLi*
      * database.default.port = *database*
* Execute as migrations: `php spark migrate`
* Popule o banco de dados: `php spark db:seed Populate`
  * **A tabelas tabelas referentes aos eventos não serão populadas**
* Define um valor à variável de ambiente encryption.key
  * O comando `php spark key:generate` já define automaticamente um valor à variável
* Instale as dependências do projeto
    ```shell
    composer install
    ```
* Suba o servidor: `php spark serve --host 0.0.0.0`

#### Configurando a aplicação que rodará no totem

Siga o script abaixo
```shell
cd modules/Totem/totem-app
npm install
npm run dev -- --port 9090 --host
```

## Acessando o sistema

Faça login com o usuário e senha padrão: josafa.verissimo e josafa123. As credenciais são válidos tanto para
a aplicação do totem quanto para a aplicação de administração.
