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

## 4. Avaliação rápida

### Backend local

```bash
dotnet run --project backend/src/FlowUp.Workshops.Api --urls "http://localhost:5000"
```

### Frontend em modo mock

```bash
cd frontend
npm install
VITE_USE_MOCKS=true npm run dev -- --host 0.0.0.0
```

### Frontend em modo API real

```bash
cd frontend
VITE_USE_MOCKS=false npm run dev -- --host 0.0.0.0 --port 4173
```

### Login padrão

```text
admin / admin123
```

### Swagger

```text
http://localhost:5000/swagger
```

### Validação rápida

```bash
dotnet test backend/FlowUp.Workshops.sln --nologo
cd frontend
npm test -- --run
npm run build
```

### Script local de validação

```powershell
powershell -ExecutionPolicy Bypass -File ./scripts/validate.ps1
```

## 5. Stack utilizada

- Backend: ASP.NET Core Web API, .NET 8, EF Core, SQLite, SQL Server opcional, JWT, Swagger
- Frontend: React + Vite + JavaScript
- Visualização: Recharts
- Testes: xUnit + ASP.NET Core Testing + Vitest + Testing Library
- CI: GitHub Actions

## 6. Estrutura de pastas

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

## 7. Como rodar o backend

A partir da raiz do projeto:

```bash
dotnet run --project backend/src/FlowUp.Workshops.Api --urls "http://localhost:5000"
```

Em desenvolvimento, a API usa SQLite local em arquivo como padrão. O banco é criado automaticamente pela aplicação, e o seed inicial é executado ao iniciar a aplicação no ambiente de desenvolvimento.

## 8. Como rodar o frontend em cada modo

### Modo mock (sem backend / sem login)

```bash
cd frontend
npm run dev:mock
```

Esse modo usa `VITE_USE_MOCKS=true` e não exige login. O acesso a `/login` mostra uma mensagem avisando que o login foi desativado para esse ambiente de avaliação leve.

### Modo API real (com backend e login)

```bash
cd frontend
npm run dev:api
```

Esse modo usa `VITE_USE_MOCKS=false` e exige que o backend esteja em execução em:

```text
http://localhost:5000
```

No modo API real, a autenticação é feita com credenciais de desenvolvimento:

```text
admin / admin123
```

A autenticação é administrativa e de desenvolvimento, sem criação de conta ou entidade `Usuario`.

## 9. Banco de dados

### SQLite local (padrão)

O SQLite continua sendo a opção recomendada para execução local leve e rápida. O projeto já usa a configuração padrão em `appsettings.Development.json`:

```json
{
  "DatabaseProvider": "Sqlite",
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=D:\\desafio\\flowup-workshops-dev.db"
  }
}
```

Essa opção exige apenas o runtime da aplicação e funciona sem dependência extra de banco relacional.

### SQL Server opcional

O SQL Server foi preparado como opção complementar, alinhada ao bônus do desafio, sem tornar esse banco obrigatório no desenvolvimento local. O suporte já existe no `Program.cs` via `DatabaseProvider = "SqlServer"` e o exemplo de configuração está em:

- `backend/src/FlowUp.Workshops.Api/appsettings.SqlServer.example.json`
- `docker-compose.sqlserver.yml`

Para usar SQL Server localmente:

1. subir o contêiner:

```bash
docker compose -f docker-compose.sqlserver.yml up -d
```

2. configurar a aplicação para SQL Server:

```json
{
  "DatabaseProvider": "SqlServer",
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost,1433;Database=FlowUpWorkshopsDb;User Id=sa;Password=Your_strong_password123;TrustServerCertificate=True"
  }
}
```

3. rodar a API:

```bash
dotnet run --project backend/src/FlowUp.Workshops.Api --urls "http://localhost:5000"
```

> Observação importante: as migrations iniciais do projeto foram criadas com foco em SQLite. Para evitar uma refatoração invasiva de provider, a rota segura e transparente mantida foi continuar com SQLite como padrão e documentar o SQL Server como opção operacional preparada para o desafio; a criação do schema em runtime continua sendo o caminho seguro para essa configuração local.

### Comando de validação local

```powershell
powershell -ExecutionPolicy Bypass -File ./scripts/validate.ps1
```

## 10. Credenciais de desenvolvimento

Usuário e senha padrão para login da API local:

```text
admin / admin123
```

## 11. Como acessar Swagger

Com o backend rodando, abra:

```text
http://localhost:5000/swagger
```

No Swagger, use a autorização Bearer para testar endpoints protegidos.

## 12. Como rodar testes backend

Na raiz do projeto:

```bash
dotnet test backend/FlowUp.Workshops.sln --nologo
```

Os testes backend cobrem autenticação, autorização, colaboradores, workshops e duplicidade de participação.

## 13. Como rodar testes frontend

Na pasta frontend:

```bash
cd frontend
npm test -- --run
```

Também é possível rodar:

```bash
npm run test:run
```

## 14. Observações sobre SQLite local, .env e VITE_USE_MOCKS

- O backend utiliza SQLite local em desenvolvimento para facilitar execução sem dependência de SQL Server.
- O arquivo de dados do SQLite fica no ambiente local do projeto e é gerenciado automaticamente pelo EF Core.
- O frontend usa a variável `VITE_USE_MOCKS` para decidir entre dados locais e integração com a API.
- Quando `VITE_USE_MOCKS=true`, o app funciona em modo mock e não exige login.
- Quando `VITE_USE_MOCKS=false`, o app exige autenticação e chama a API real.
- O ambiente local do frontend pode ser configurado em `.env` ou via variável de ambiente no shell.

## 15. Limitações conscientes

- Não há deploy configurado neste repositório.
- O frontend não foi implementado com CRUD visual completo; o objetivo foi entregar uma experiência funcional com dashboard e dados de negócio relevantes.
- A implementação prioriza qualidade e clareza sobre overengineering.
- O projeto foi construído para execução local e validação técnica em ambiente de desenvolvimento.

## 16. Resumo

Este projeto entrega uma solução coerente para rastrear participação em workshops, com backend autenticado, dados estruturados, UI reativa e suporte a execução em modo mock ou real. A proposta foi equilibrar funcionalidade, simplicidade e facilidade de execução local, sem introduzir camadas ou abstrações extras desnecessárias.
