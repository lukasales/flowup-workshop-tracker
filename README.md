# FlowUp Workshops Tracker

## 1. Objetivo do sistema

O FlowUp Workshops Tracker é uma solução full-stack para acompanhar a participação de colaboradores em workshops, com foco em gestão, visualização e autenticação. O sistema oferece um painel administrativo com dados consolidados, controle de participantes por workshop e suporte a dois modos de execução: mock local para desenvolvimento e integração real com API ASP.NET Core.

## 2. Funcionalidades implementadas

- API ASP.NET Core Web API em .NET 8
- Entity Framework Core com SQLite em desenvolvimento
- CRUD de colaboradores
- CRUD de workshops
- Registro e remoção de participações entre colaboradores e workshops
- Seed de dados inicial para cenário funcional
- Autenticação JWT com login simples
- Swagger com autenticação Bearer
- CORS configurado para frontend local
- Frontend React + Vite em JavaScript
- Modo mock local com VITE_USE_MOCKS=true
- Modo API real com VITE_USE_MOCKS=false
- Login e logout no frontend
- Dashboard com indicadores gerais
- Página de colaboradores
- Página de workshops
- Página de detalhe de workshop
- Gráficos de participação com Recharts
- Proteção de rotas em modo API

## 3. Bônus atendidos

- JWT com Bearer autenticado no Swagger
- CORS habilitado para frontend local
- Frontend com modo mock e modo API real em mesma base de código
- Proteção de rotas e persistência de token no localStorage
- Visualização de dados por colaborador e por workshop
- Estrutura pronta para validar manualmente fluxo real e fluxo mock

## 4. Stack utilizada

- Backend: ASP.NET Core Web API, .NET 8, EF Core, SQLite, JWT, Swagger
- Frontend: React + Vite + JavaScript
- Visualização: Recharts
- Testes: xUnit + ASP.NET Core Testing + Vitest + Testing Library

## 5. Estrutura de pastas

```text
backend/
  src/
    FlowUp.Workshops.Api/
      Controllers/
      Data/
      DTOs/
      Models/
      Services/
  tests/
    FlowUp.Workshops.Api.Tests/
frontend/
  src/
    charts/
    components/
    pages/
    routes/
    services/
    utils/
    test/
  vite.config.js
  package.json

docs/
  AI_USAGE.md
  DECISIONS.md
  TEST_PLAN.md
README.md
```

## 6. Como rodar o backend

A partir da raiz do projeto:

```bash
dotnet run --project backend/src/FlowUp.Workshops.Api --urls "http://localhost:5000"
```

Em desenvolvimento, a API usa SQLite local em arquivo. O banco é criado automaticamente pela aplicação, e o seed inicial é executado ao iniciar a aplicação no ambiente de desenvolvimento.

## 7. Como rodar o frontend em modo mock

A partir da pasta frontend:

```bash
cd frontend
npm install
VITE_USE_MOCKS=true npm run dev -- --host 0.0.0.0
```

No modo mock, o frontend não faz chamadas HTTP reais e pode ser usado sem a API em execução.

## 8. Como rodar o frontend em modo API real

A partir da pasta frontend:

```bash
cd frontend
VITE_USE_MOCKS=false npm run dev -- --host 0.0.0.0 --port 4173
```

O frontend real assume que a API está disponível em:

```text
http://localhost:5000/api
```

## 9. Credenciais de desenvolvimento

Usuário e senha padrão para login da API local:

```text
admin / admin123
```

## 10. Como acessar Swagger

Com o backend rodando, abra:

```text
http://localhost:5000/swagger
```

No Swagger, use a autorização Bearer para testar endpoints protegidos.

## 11. Como rodar testes backend

Na raiz do projeto:

```bash
dotnet test backend/FlowUp.Workshops.sln --nologo
```

Os testes backend cobrem autenticação, autorização, colaboradores, workshops e duplicidade de participação.

## 12. Como rodar testes frontend

Na pasta frontend:

```bash
cd frontend
npm test -- --run
```

Também é possível rodar:

```bash
npm run test:run
```

## 13. Observações sobre SQLite local, .env e VITE_USE_MOCKS

- O backend utiliza SQLite local em desenvolvimento para facilitar execução sem dependência de SQL Server.
- O arquivo de dados do SQLite fica no ambiente local do projeto e é gerenciado automaticamente pelo EF Core.
- O frontend usa a variável `VITE_USE_MOCKS` para decidir entre dados locais e integração com a API.
- Quando `VITE_USE_MOCKS=true`, o app funciona em modo mock e não exige login.
- Quando `VITE_USE_MOCKS=false`, o app exige autenticação e chama a API real.
- O ambiente local do frontend pode ser configurado em `.env` ou via variável de ambiente no shell.

## 14. Limitações conscientes

- Não há deploy configurado neste repositório.
- O frontend não foi implementado com CRUD visual completo; o objetivo foi entregar uma experiência funcional com dashboard e dados de negócio relevantes.
- A implementação prioriza qualidade e clareza sobre overengineering.
- O projeto foi construído para execução local e validação técnica em ambiente de desenvolvimento.

## 15. Resumo

Este projeto entrega uma solução coerente para rastrear participação em workshops, com backend autenticado, dados estruturados, UI reativa e suporte a execução em modo mock ou real. A proposta foi equilibrar funcionalidade, simplicidade e facilidade de execução local, sem introduzir camadas ou abstrações extras desnecessárias.
