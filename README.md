# Clínica Integral

Projeto desenvolvido utilizando o framework [Hilla](https://hilla.dev/). Se trata de um sistema
de gerenciamento de clínicas médicas.

## Dependências necessárias
* Java 17
* Nodejs 18
* Maven
* Docker (para o banco de dados)

## Iniciando em modo desenvolvimento
Vá para a pasta principal do projeto e execute o comando:
```shell
docker-compose up -d
```
Isso irá iniciar o banco de dados em um container docker.
Para iniciar o projeto, execute o comando:
```shell
mvnw (Windows) ou ./mvnw (Mac & Linux
```
Isso irá iniciar o projeto em modo desenvolvimento, com hot reload. Acesse o projeto em http://localhost:8080

## Iniciando em modo produção
Um arquivo .jar está disponível na pasta producao. Para iniciar o projeto em modo produção, execute o comando:
```shell
java -jar producao/engsoftware-1.0-SNAPSHOT.jar
```

## Funcionalidades

Possui as seguintes telas:
* Pagina inicial
* Galeria
* Cadastro de Endereços
* Agendamento de consultas

E uma área restrita com as seguintes funcionalidades:
* Cadastro de funcionários, prontuários médicos, pacientes, endereços e agendamentos
* Listagem de pacientes, funcionários, endereços e agendamentos

Um usuário padrão é criado ao iniciar o projeto, com as seguintes credenciais:
email: admin@integral.com
senha: admin