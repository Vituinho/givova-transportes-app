# Givova Transportes — aplicativo mobile

Primeira versão funcional do aplicativo oficial da Givova Transportes. O produto foi desenhado para celular e não usa WebView. Rastreamento, cotação e notificações estão separados da interface e prontos para consumir uma API real, sem respostas simuladas.

> Atenção: logo, ícone, contatos, textos jurídicos e conteúdo institucional definitivo ainda precisam ser aprovados pela Givova antes de qualquer publicação.

## Tecnologias

- React Native 0.86, React 19 e Expo SDK 57
- TypeScript e Expo Router
- NativeWind, com tokens visuais compartilhados
- React Hook Form e Zod
- TanStack Query
- Expo SecureStore e Expo Notifications
- Lucide React Native
- Jest com `jest-expo`

## Primeiros passos

Requisitos: Node.js 22.13 ou superior, npm e Android Studio para emulador/local build.

```bash
npm install
cp .env.example .env
npm start
```

Com um dispositivo Android conectado ou emulador em execução:

```bash
npm run android
```

No macOS, com Xcode instalado:

```bash
npm run ios
```

O Expo Go pode servir para verificações rápidas, mas development builds são recomendadas para validar recursos nativos e notificações.

## Variáveis de ambiente

Copie `.env.example` para `.env`. Nunca inclua segredos em variáveis `EXPO_PUBLIC_*`, pois elas ficam visíveis no bundle.

| Variável | Uso |
| --- | --- |
| `EXPO_PUBLIC_API_URL` | URL única da API, sem barra final |
| `EXPO_PUBLIC_SITE_URL` | site oficial |
| `EXPO_PUBLIC_WHATSAPP_NUMBER` | número com DDI/DDD, apenas dígitos |
| `EXPO_PUBLIC_PHONE` | telefone usado pelo deep link `tel:` |
| `EXPO_PUBLIC_EMAIL` | e-mail de atendimento |

Sem API, o rastreamento informa “Rastreamento online em integração” e a cotação não afirma que enviou dados. Sem contato configurado, o respectivo botão fica desativado.

## Estrutura

```text
src/
  app/          rotas e layouts do Expo Router
  components/   design system reutilizável
  config/       ambiente e dados da empresa
  constants/    tokens e catálogo de serviços
  features/     experiências de Home, cotação, rastreamento e mais
  hooks/        integração da UI com TanStack Query
  lib/          links e utilitários
  schemas/      contratos Zod e testes
  services/     API, cotação, rastreamento, sessão e notificações
  types/        tipos globais
```

UI, validação, regras de negócio e acesso à API não ficam acoplados. Uma área autenticada futura pode usar `secureSession` sem armazenar credenciais em AsyncStorage.

## Telas

- Splash provisória e navegação inferior
- Início com hero, atalhos, rastreamento rápido, soluções e relações institucionais
- Cotação em cinco etapas: rota, carga, cliente, observações e confirmação
- Rastreamento preparado para status, rota, datas e timeline reais
- Serviços e detalhe de cada solução
- Mais, Sobre, Clientes e parceiros, Contato, Configurações e Sobre o aplicativo
- Política de Privacidade e Termos com aviso de documento oficial pendente

## Contrato esperado da API

Base configurada por `EXPO_PUBLIC_API_URL`:

- `POST /v1/quotes`: recebe o objeto validado por `quoteSchema` e retorna `{ "protocol"?: string, "receivedAt": string }`.
- `GET /v1/shipments/:code`: retorna código, status, origem/destino opcionais, última atualização, previsão opcional e eventos. A resposta é validada por `trackingResultSchema`.

Erros de rede, timeout e HTTP são convertidos em mensagens amigáveis. Recomenda-se uma API compartilhada por web, mobile e sistema interno, construída em NestJS/TypeScript com PostgreSQL. Consulte [a proposta de backend](docs/backend-architecture.md).

## Notificações e segurança

O app registra o canal Android `shipment-updates`, solicita permissão somente após ação do usuário e guarda o Expo push token no SecureStore. Ainda não agenda notificações locais e não produz eventos simulados. O backend futuro deve associar tokens autenticados aos clientes e emitir mensagens apenas a partir de mudanças reais de carga.

Tokens de autenticação futuros também devem usar SecureStore. Segredos privados, senha e credenciais de servidor não pertencem ao aplicativo.

## Qualidade

```bash
npm run lint
npm run typecheck
npm test
npx expo-doctor
```

Os testes priorizam schemas de cotação e o contrato/normalização do rastreamento.

O `npm audit` atual reporta 14 avisos moderados, todos transitivos da toolchain Expo/Router, sem ocorrências altas ou críticas. As correções automáticas sugeridas fariam downgrade incompatível do SDK; por isso não foi aplicado `audit fix --force`. Reavaliar quando o Expo publicar versões compatíveis corrigidas.

## EAS Build

1. Instale e autentique a CLI: `npm install --global eas-cli` e `eas login`.
2. Vincule o projeto: `eas init`. Isso adicionará o `projectId` necessário ao push token.
3. Confirme que `br.com.givovatransportes.app` está disponível e é o identificador definitivo. Alterá-lo depois da publicação cria outro aplicativo.
4. Gere um APK interno: `eas build --platform android --profile preview`.
5. Gere o AAB de produção: `eas build --platform android --profile production`.

O perfil `preview` produz APK instalável; `production` produz AAB para a Play Store e incrementa a versão remotamente. O EAS pode administrar a chave de assinatura Android. Faça backup e controle de acesso da credencial pela conta da organização.

Para iOS, após configurar a conta Apple e revisar o bundle identifier: `eas build --platform ios --profile production`.

## Checklist para a Play Store

- substituir todos os arquivos `*-placeholder.png` pelos assets oficiais nos tamanhos exigidos;
- confirmar package name, titular da conta e assinatura;
- preencher contatos e URLs de produção;
- publicar API HTTPS e testar timeout, erros e contratos;
- obter revisão jurídica da política e dos termos;
- validar textos institucionais e licenças dos logos de cliente/parceiros;
- executar testes em celulares Android pequenos, médios e grandes;
- preparar screenshots, feature graphic, descrição, classificação etária e formulário de segurança de dados;
- revisar permissão de notificações e fluxo LGPD;
- configurar monitoramento, observabilidade e processo de atendimento.

## Identidade provisória

Não foi fornecido um arquivo oficial da marca. O repositório contém ícones tipográficos laranja identificados como placeholders, gerados por `scripts/generate-placeholder-assets.ps1`. Eles não representam uma recriação da marca e devem ser substituídos antes da distribuição.
