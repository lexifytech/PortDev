# PortDev - Portfolio Builder

Um construtor de portfólios moderno construído com Next.js, NextAuth e Redis.

## Pré-requisitos

- Node.js 18+ instalado
- npm, yarn ou pnpm
- Conta no Google Cloud Platform (para OAuth)
- Conta no Upstash (para Redis)

## Configuração Local

### 1. Clone e instale as dependências

```bash
# Se você já tem o projeto, apenas instale as dependências
npm install
# ou
yarn install
# ou
pnpm install
```

> **Nota**: Se encontrar conflitos de dependências relacionados ao React 19, as versões já foram ajustadas no package.json para compatibilidade. Caso ainda tenha problemas, use `npm install --legacy-peer-deps`.

### 2. Configure as variáveis de ambiente

1. Copie o arquivo `.env.example` para `.env.local`:
```bash
cp .env.example .env.local
```

2. Configure as seguintes variáveis no arquivo `.env.local`:

#### NextAuth
- `NEXTAUTH_SECRET`: Gere uma string aleatória segura
- `NEXTAUTH_URL`: `http://localhost:3000` (para desenvolvimento local)

#### Google OAuth
1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a API do Google+
4. Vá para "Credenciais" > "Criar credenciais" > "ID do cliente OAuth 2.0"
5. Configure:
   - Tipo de aplicação: Aplicação web
   - URIs de redirecionamento autorizados: `http://localhost:3000/api/auth/callback/google`
6. Copie o Client ID e Client Secret para:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`

#### Upstash Redis
1. Acesse [Upstash](https://upstash.com/)
2. Crie uma conta e um novo banco Redis
3. Copie a URL e Token REST para:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### 3. Execute o projeto

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

O projeto estará disponível em [http://localhost:3000](http://localhost:3000)

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## Estrutura do Projeto

- `/app` - Páginas e rotas da aplicação (App Router do Next.js)
- `/components` - Componentes React reutilizáveis
- `/lib` - Utilitários e configurações
- `/public` - Arquivos estáticos
- `/styles` - Estilos globais

## Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **NextAuth** - Autenticação
- **Upstash Redis** - Banco de dados
- **Tailwind CSS** - Estilização
- **Radix UI** - Componentes de interface
- **TypeScript** - Tipagem estática