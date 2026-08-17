# Decisões técnicas

## 1. Decisões técnicas principais

A implementação foi conduzida com foco em funcionalidade real, clareza de execução local e baixa complexidade de manutenção. Foram priorizadas decisões que permitissem entregar um projeto operacionalmente útil, sem criar uma arquitetura de teste ou infrastructure heavy demais para o escopo.

## 2. Por que SQLite local foi usado em desenvolvimento

O SQLite foi escolhido para ambiente local porque simplifica a execução do backend sem exigir um SQL Server instalado ou configurado no ambiente de desenvolvimento. Isso reduz atrito para rodar o projeto em qualquer máquina de desenvolvimento, mantendo uma solução funcional para CRUD e seed de dados. O projeto preserva a possibilidade de adaptação para SQL Server em outros ambientes, mas o ponto de partida foi SQLite local.

## 3. Por que JWT simples sem entidade Usuario

A autenticação foi implementada de forma simples, direta e compatível com o escopo do desafio. O projeto não precisa de uma entidade de usuário persistente para atender ao requisito de login básico. O foco foi validar a existência de credenciais de desenvolvimento e emitir um token JWT funcional para acesso aos endpoints protegidos, sem criar um sistema de usuários completo ou gestão de perfis.

## 4. Por que frontend tem modo mock e modo API

A separação entre mock e API real atende a dois objetivos importantes:

- permitir desenvolvimento e validação sem depender do backend em todos os momentos
- permitir validar o comportamento real da aplicação com autenticação, JWT, acesso protegido e integração com endpoints reais

Isso também reduz risco durante a implementação, porque a UI pode ser validada independentemente da API e, em seguida, conectada ao backend de forma limpa.

## 5. Por que não foi criado CRUD visual no frontend

O escopo do projeto não exigia que o frontend fosse uma ferramenta administrativa completa de criação, edição e exclusão de registros. O foco era entregar uma experiência útil para dashboard, consulta e rastreio de participação em workshops, com autenticação e visualização de dados relevantes. Essa escolha evita overengineering e mantém a implementação dentro do objetivo do desafio.

## 6. Por que os testes são mínimos

Os testes foram mantidos enxutos por duas razões principais:

- validar os comportamentos críticos e mais sensíveis do sistema
- não introduzir complexidade de infraestrutura ou ferramentas extras para cenários que não precisam de arquitetura elaborada

A intenção foi demonstrar qualidade e confiabilidade sem transformar a suíte em um sistema de testes muito pesado para o escopo.

## 7. Decisões de design do frontend

O frontend foi desenhado para ser simples e previsível:

- manter a lógica de negócio separada em serviços e utilitários
- usar rotas protegidas em modo API
- tratar login e logout de forma clara
- manter o token em localStorage apenas para a sessão do cliente
- preservar uma UI funcional em modo mock e modo real sem duplicar regras de negócio

A estrutura foi pensada para facilitar entendimento e manutenção sem extrapolar a proposta do projeto.

## 8. Decisões contra overengineering

Ficou claro desde o início que o projeto não deveria evoluir para uma arquitetura de múltiplas camadas, repositórios complexos, testes de container, autenticação sofisticada, ou centenas de abstrações. A entrega priorizou:

- simplicidade estrutural
- execução local fácil
- validação concreta
- manutenção razoável
- foco no que foi pedido

Esse equilíbrio foi uma escolha proativa para preservar qualidade e evitar complexidade desnecessária.

