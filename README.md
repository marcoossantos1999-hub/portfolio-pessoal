# Portfólio pessoal

Portfólio profissional desenvolvido com Next.js, React, TypeScript, Tailwind CSS, Framer Motion e Lucide React.

## Pré-requisitos

- Node.js 20 ou superior
- npm

## Instalação

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Personalização

Atualize os dados demonstrativos nos arquivos:

- `src/data/profile.ts`: nome, profissão, apresentação e redes
- `src/data/portfolio.ts`: projetos, skills, formação, certificados e hobbies
- `src/types/portfolio.ts`: formatos dos dados

Substitua a imagem ou avatar demonstrativo em `src/components/portfolio-page.tsx`. Para publicar um currículo real, adicione o PDF em `public/resume.pdf`.

O formulário valida os campos e prepara uma mensagem no aplicativo de e-mail do visitante. Para enviar mensagens diretamente por API, configure uma integração server-side em `src/app/api/contact/route.ts` e mantenha todas as credenciais fora do frontend.

## Comandos

```bash
npm run dev
npm run lint
npm run build
npm start
```

## Publicação

O projeto pode ser publicado diretamente na Vercel importando o repositório GitHub e mantendo o comando de build padrão do Next.js.
