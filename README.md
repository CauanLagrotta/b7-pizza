# B7 Pizza - Sistema de Pedidos de Pizzas

B7 Pizza é uma aplicação web moderna para gerenciamento de pedidos de pizza, construída com Next.js 15, React 19, Prisma e Stripe para processamento de pagamentos.

## 🚀 Tecnologias

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Autenticação**: Sistema personalizado com bcryptjs
- **Pagamentos**: Integração com Stripe
- **Gerenciamento de Estado**: Zustand
- **Validação de Dados**: Zod

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Docker
- Conta no Stripe (para processamento de pagamentos)

## 🛠️ Configuração do Ambiente

1. **Clone o repositório**
   ```bash
   git clone https://github.com/cauanlagrotta/b7-pizza.git
   cd b7-pizza
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn
   ```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   # Banco de Dados
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/b7pizza?schema=public"
   
   # Stripe
   STRIPE_SECRET_KEY=
   STRIPE_WEBHOOK_KEY=
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
   
   # Autenticação
   JWT_SECRET=
   
   # URL da Aplicação
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

   Em seguida execute o comando para rodar o docker-compose:
   ```bash
   docker-compose up -d
   ```

4. **Execute as migrações do Prisma**
   ```bash
   npx prisma migrate dev
   ```

5. **Popule o banco de dados (opcional)**
   ```bash
   npx prisma db seed
   ```

## 🚀 Executando a Aplicação

1. **Modo de Desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

   A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

2. **Build para Produção**
   ```bash
   npm run build
   npm start
   ```

## 🔧 Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `DATABASE_URL` | Sim | URL de conexão com o banco de dados PostgreSQL |
| `STRIPE_SECRET_KEY` | Sim | Chave secreta da API do Stripe |
| `STRIPE_WEBHOOK_KEY` | Sim | Chave de assinatura do webhook do Stripe |
| `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` | Sim | Chave pública do Stripe para o frontend |
| `JWT_SECRET` | Sim | Chave secreta para geração de tokens JWT |
| `NEXT_PUBLIC_APP_URL` | Sim | URL base da aplicação (ex: http://localhost:3000) |

## 📦 Estrutura do Projeto

```
b7-pizza/
├── prisma/               # Definições do esquema do banco de dados
├── public/               # Arquivos estáticos
└── src/
    ├── app/              # Rotas da aplicação (App Router)
    │   ├── api/          # Rotas da API
    │   └── ...           # Páginas da aplicação
    ├── components/        # Componentes React reutilizáveis
    ├── lib/               # Utilitários e configurações
    ├── services/          # Lógica de negócios e chamadas à API
    ├── store/             # Gerenciamento de estado (Zustand)
    └── types/             # Definições de tipos TypeScript
```

## 🔒 Autenticação

A aplicação utiliza um sistema de autenticação personalizado com JWT (JSON Web Tokens) para autenticar usuários. Os tokens são armazenados em cookies HTTP-only para maior segurança.

## 💳 Pagamentos

A integração com o Stripe permite processar pagamentos de forma segura. A aplicação suporta:
- Checkout transparente
- Webhooks para atualização de status de pedidos


## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.

## 📞 Suporte

Para suporte, entre em contato através do email: [cauanlagrotta.dev@gmail.com](mailto:cauanlagrotta.dev@gmail.com)
