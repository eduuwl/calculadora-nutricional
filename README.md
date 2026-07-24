# Calculadora Nutricional

Landing page para consultório de nutrição com calculadora de indicadores nutricionais
embutida (TMB, IMC, gasto calórico total e macros) e captura/persistência de leads.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- Prisma 7 + PostgreSQL (via `@prisma/adapter-pg`)
- Recharts
- Zod (validação server-side)

## Pré-requisitos

- Node.js 20+
- Um banco PostgreSQL (local via Docker, ou gerenciado via [Neon](https://neon.tech) / [Supabase](https://supabase.com))

## Setup

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Configure a variável de ambiente do banco. Copie/edite o arquivo `.env` na raiz do
   projeto e defina `DATABASE_URL` com a connection string do seu Postgres:

   ```env
   DATABASE_URL="postgresql://usuario:senha@host:5432/banco?schema=public&sslmode=require"
   ```

   > Provedores como Neon/Supabase exigem `sslmode=require` na connection string.

3. Rode a migração para criar as tabelas (`Lead` e `Calculo`):

   ```bash
   npx prisma migrate dev --name init
   ```

4. Suba o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   Acesse [http://localhost:3000](http://localhost:3000).

## Estrutura relevante

```
src/
  app/
    page.tsx               # Landing page
    calculadora/
      page.tsx             # Página da calculadora
      actions.ts            # Server Action: valida, calcula e persiste
  components/
    calculadora/
      CalculadoraForm.tsx   # Formulário (dados + captura de lead)
      ResultadoCalculo.tsx  # Exibição do resultado
      MacroChart.tsx        # Gráfico de distribuição de macros (Recharts)
  lib/
    nutrition.ts            # Fórmulas de TMB, IMC, GCT e macros
    prisma.ts               # Client Prisma (singleton, com driver adapter)
prisma/
  schema.prisma             # Modelos Lead e Calculo
```

## Fluxo da calculadora

O formulário reúne, em uma única etapa, os dados nutricionais (peso, altura, idade,
sexo, nível de atividade, objetivo) e os dados de contato (nome, e-mail, WhatsApp).
Ao enviar, uma Server Action:

1. Valida os campos com Zod.
2. Calcula TMB (Mifflin-St Jeor), IMC, gasto calórico total e macros.
3. Cria (ou reaproveita, por e-mail) o `Lead` e grava um `Calculo` vinculado a ele —
   formando o histórico de evolução do lead ao longo do tempo.
4. Retorna o resultado, exibido na mesma página com o gráfico de macros.

## Comandos úteis

```bash
npm run dev       # ambiente de desenvolvimento
npm run build     # build de produção
npm run lint      # eslint
npx prisma studio # explorar o banco visualmente
```

## Deploy

- **App**: Vercel
- **Banco**: Neon ou Supabase (defina `DATABASE_URL` nas variáveis de ambiente do
  projeto na Vercel e rode `npx prisma migrate deploy` no pipeline de deploy)

## Fora de escopo (MVP atual)

- Autenticação de usuários/pacientes
- Geração automatizada de plano alimentar por IA
- Integração com WhatsApp/chatbot
- Pagamentos/assinaturas
- Painel de leads (schema já preparado para isso; tela ainda não implementada)
