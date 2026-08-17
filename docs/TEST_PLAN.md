# Plano de testes

## 1. Estratégia de testes

A suíte de testes do projeto foi desenhada para validar os pontos críticos da entrega, sem criar complexidade desnecessária. A ideia foi confirmar: autenticação real, autorização de endpoints protegidos, comportamento do frontend em modo mock e API, e a consistência das regras de negócio mais importantes.

A estratégia considera:

- testes de integração do backend com SQLite isolado em ambiente temporário
- autenticação real via login na API
- testes do frontend em ambiente jsdom para validar renderização e lógica de dados
- ampla cobertura dos fluxos mais sensíveis, sem overengineering

## 2. CI e validação local

Além da suíte local, o projeto inclui:

- workflow do GitHub Actions em `.github/workflows/ci.yml`
- script de validação local em `scripts/validate.ps1`

Esses mecanismos validam backend, frontend e build sem depender de SQL Server. O objetivo é manter a execução de desenvolvimento leve e reproduzível em qualquer ambiente que tenha .NET 8 e Node.js LTS.

## 3. Testes backend implementados

Os testes backend cobrem os cenários principais da API:

1. Login válido
   - POST /api/Auth/login com credenciais válidas retorna 200 e token preenchido.

2. Autorização
   - GET /api/Workshops sem token retorna 401.

3. Colaboradores autenticados
   - GET /api/Colaboradores com token retorna 200 e lista não vazia.

4. Workshop por ID
   - GET /api/Workshops/1 com token retorna 200 e inclui colaboradores presentes.

5. Participação duplicada
   - Tentar adicionar a mesma participação em workshop/colaborador do seed retorna 409.

Observações:

- O banco de teste é SQLite temporário e isolado.
- Os testes não dependem do banco de desenvolvimento.
- A configuração de JWT e autenticação é aplicada por configuração de teste.
- Os testes não dependem da ordem de execução.

## 4. Testes frontend implementados

Os testes frontend focam na lógica central do app sem testar CSS pixelado nem detalhes internos de SVG:

1. Utilitário de métricas de participação
   - Valida contagens esperadas por colaborador e por workshop.

2. Dashboard
   - Verifica renderização dos cartões de resumo em modo mock.

3. LoginPage
   - Valida que a página de login renderiza campos e botão em modo API.

4. authService
   - Verifica que o login válido salva o token no localStorage.

## 5. Testes manuais recomendados

Além da suíte automatizada, vale validar manualmente:

- fluxo de login no frontend em modo API real
- logout limpando token e bloqueando acesso às rotas protegidas
- navegação do dashboard para colaboradores e workshops
- acesso ao detalhe de um workshop
- fluxo mock sem API em execução
- Swagger com autenticação Bearer
- comportamento de sessão expirada e redirecionamento para login

## 6. Comandos de validação

Backend:

```bash
dotnet test backend/FlowUp.Workshops.sln --nologo
```

Frontend:

```bash
cd frontend
npm test -- --run
```

Build do frontend:

```bash
cd frontend
npm run build
```

Build do backend (opcional, quando necessário):

```bash
dotnet build backend/FlowUp.Workshops.sln --nologo
```

## 7. Limitações conscientes da suíte

- A suíte é mínima e focada em comportamento crítico, não em toda cobertura possível do produto.
- Não há testes de interface complexa de gráficos com Recharts, e isso é intencional.
- Não há testes de deploy nem de integração com infra externa.
- A suíte valida a plataforma local e a entrega funcional principal, sem overengineering de infra ou arquitetura de testes.

## 8. Estado atual

- Backend: 5 testes aprovados
- Frontend: 5 testes aprovados
- Builds backend e frontend: passando
- Projeto validado em execução local com Swagger, mock e API real

