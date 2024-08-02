# Invest +

Projeto desenvolvido para demonstração de conhecimento FullStack.
O Invest+ é um gerenciador de carteiras de investimento. Suas funcionalidades são:
- Criação e autenticação de usuário.
- Criação, edição e exclusão de carteiras de investimento
- Criação, edição e exclusão de compras

  

Principais tecnologias: **TypeScript**, **NestJS**, **TypeORM**, **Jest**, **NextJS**, **TailwindCSS**

### UI 
![dashboard](https://github.com/user-attachments/assets/ab25c1ac-2377-4a52-a4fc-176c8efbb454)
![carteira](https://github.com/user-attachments/assets/df51e779-5874-4df1-8581-e23621fdd153)
![login](https://github.com/user-attachments/assets/84f494a0-0bf4-4d68-b38b-43c27005b258)

### Relacionamentos
![db-relations](https://github.com/user-attachments/assets/4a70eceb-dbb0-48eb-8d03-b8cbb239fa07)
  

### para rodar o banco de dados de testes e desenvolvimento

```

# dentro da pasta raiz

docker-compose up

```

  

### Variáveis de desenvolvimento

tanto no backend como frontend, basta criar um arquivo .env e colar o conteúdo do arquivo **.env-example**

  

### Backend

```

# para rodar o backend em ambiente de desenvolvimento

yarn start:dev

# para rodar os testes da aplicação

yarn test:int

```

  

### Frontend

```

# para rodar o frontend em ambiente de desenvolvimento

yarn dev

```
