# Proposta de arquitetura do backend

## Visão

```text
Site ─────┐
          ├── API NestJS ── PostgreSQL
Mobile ───┘       │
                  ├── provedor de notificações
Sistema interno ──┘
```

Uma API única evita regras duplicadas no site e no aplicativo. O frontend Next.js não deve atuar como banco de dados nem ser consumido diretamente pelo mobile.

## Módulos sugeridos

- `quotes`: criação, protocolo, distribuição e acompanhamento de cotações;
- `shipments`: consulta autorizada e eventos de rastreamento;
- `customers` e `auth`: área do cliente, perfis e sessões;
- `notifications`: preferências, tokens e entrega de eventos;
- `documents`: metadados e acesso autorizado a comprovantes;
- `audit`: registro de alterações sensíveis e consultas administrativas.

## Primeira integração

1. Definir contratos OpenAPI para `POST /v1/quotes` e `GET /v1/shipments/:code`.
2. Implementar rate limiting, logs sem dados pessoais e correlação de requests.
3. Definir autenticação da consulta de rastreamento para não expor cargas por códigos previsíveis.
4. Validar payloads no servidor; a validação do app melhora UX, mas não substitui a validação da API.
5. Configurar TLS, gestão de segredos e ambientes separados.

## LGPD e retenção

Mapear finalidade e base legal de cada dado, prazos de retenção, operadores, trilha de consentimento, direitos do titular e descarte. O aplicativo não deve registrar payloads pessoais em analytics ou logs de erro.

## Notificações

O backend deve emitir notificações somente após eventos confirmados do domínio. Tokens precisam ser associados a dispositivo/usuário, renovados, desativados em logout e removidos quando o provedor os considerar inválidos. O payload visível deve evitar dados sensíveis na tela bloqueada.
