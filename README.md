# App

Site para avaliação e recomendação de filmes.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível avaliar um filme;
- [ ] Deve ser possível escrever uma crítica sobre um filme;
- [ ] Deve ser possível salvar um filme para assistir depois;
- [ ] O usuário deve receber recomendações de filmes com base em suas avaliações;

## Testes

- [x] Teste de cadastro;
- [x] Teste de autenticação;
- [ ] Teste de avaliação de filme;
- [ ] Teste de crítica de filme;
- [ ] Teste de salvar filme para assistir depois;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário deve poder avaliar um filme apenas uma vez;
- [ ] O usuário deve poder salvar um filme para assistir depois apenas uma vez;
- [ ] Os filmes salvos para assistir depois devem ser recomendados com prioridade;

## RNFs (Requisitos não funcionais)

- [x] A senha do usuário deve ser criptografada;
- [x] Os dados da aplicação precisam estar persistido em um banco PostgreSQL;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página;

## Setup
Para rodar o PostgreSQL no Docker

```
    sudo docker compose up -d
```

Para rodar a API

```
    npm run dev
```