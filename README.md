🧠 SkillBoost AI – Mobile App (React Native + Expo)

Plataforma inteligente de Upskilling e Reskilling desenvolvida para a Global Solution FIAP 2025, ajudando colaboradores a evoluírem suas habilidades, acompanharem trilhas de aprendizado e conquistarem novos conhecimentos com suporte de IA.

📱 Sobre o Projeto

O SkillBoost AI Mobile é um aplicativo desenvolvido em React Native + Expo, oferecendo uma experiência moderna, fluida e totalmente otimizada para dispositivos móveis.

Ele possibilita que colaboradores:

Criem conta

Façam login

Consultem trilhas recomendadas

Acessam detalhes de cada trilha

Acompanhem progresso

Atualizem seu perfil

Explore o futuro do trabalho com IA e automação

👥 Integrantes do Grupo
Nome	RM	Função
Guilherme Rezende Bezerra	98508	Dev Mobile / Firebase / Arquitetura
Gustavo Brisqui	97969	UI/UX / Suporte técnico / Testes
Matheus Brisqui	97892	Documentação / Layout / Conteúdo
🚀 Tecnologias Utilizadas
🧩 Frontend

React Native

Expo

TypeScript

Expo Router / React Navigation

Context API

Axios

AsyncStorage

Componentes reutilizáveis + Design System

☁️ Backend / Serviços

Firebase Authentication (Login + Registro)

Firebase Firestore (Dados persistentes do usuário)

MockAPI (Trilhas, cursos, conteúdo dinâmico)

🧭 Fluxos do Aplicativo
🔻 Visitante (sem login)

Tela de Login

Tela de Registro

🔺 Colaborador autenticado

Home: visão geral

Trilhas recomendadas: listagem completa

Detalhe da trilha: conteúdo, workload, nível, skills

Perfil: informações do usuário, logout

🧬 Principais Funcionalidades

✔ Criar conta com Firebase Auth
✔ Login validado
✔ Logout com Context API
✔ Listagem de trilhas via MockAPI
✔ Visualização detalhada de trilha
✔ Botão de inscrição/desinscrição
✔ Perfil do colaborador
✔ Persistência de sessão com AsyncStorage
✔ Navegação completa com StackNavigator
✔ Tratamento de erros e loads
✔ UI organizada com tema próprio

🗂 Estrutura de Pastas
src/
 ├── components/
 │    ├── Button/
 │    ├── Card/
 │    └── ...
 ├── context/
 │    └── AuthContext.tsx
 ├── navigation/
 │    ├── RootNavigator.tsx
 │    └── types.ts
 ├── screens/
 │    ├── home/
 │    ├── login/
 │    ├── Profile/
 │    ├── Tracks/
 │    └── trackdetail/
 ├── services/
 │    ├── api.ts
 │    ├── firebaseConfig.ts
 │    └── tracksService.ts
 ├── theme/
 │    ├── colors.ts
 │    ├── spacing.ts
 │    ├── typography.ts
 │    └── index.ts
 └── utils/

🔥 Configuração Firebase

Crie o arquivo:

src/services/firebaseConfig.ts


Cole o seguinte (com suas chaves):

import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

🌐 MockAPI – Trilhas e Cursos

Base URL:

https://mockapi.io/projects/691b88483aaeed735c8d7de9


Modelo:

{
  "id": "1",
  "title": "Fundamentos de IA",
  "description": "Aprenda IA, automação e ferramentas modernas",
  "level": "Intermediário",
  "workloadHours": 8,
  "skills": ["ChatGPT", "Python", "Automação"],
  "enrollmentStatus": "none",
  "progress": 0
}

🔧 Instalação e Execução
1️⃣ Clonar o repositório
git clone https://github.com/guibezerra24/SkillBoostAI.Mobile.git
cd SkillBoostAI.Mobile

2️⃣ Instalar dependências
npm install

3️⃣ Instalar AsyncStorage
npm install @react-native-async-storage/async-storage

4️⃣ Rodar o app
npx expo start -c


Use o Expo Go para abrir no celular.

🧪 Comandos Git Úteis
Ver estado
git status

Adicionar todas as mudanças
git add .

Criar commit
git commit -m "mensagem do commit"

Enviar para o GitHub
git push origin main

Baixar atualizações
git pull origin main

Criar nova branch
git checkout -b nome-da-branch

🏫 Sobre a entrega

Projeto desenvolvido para a disciplina Global Solution FIAP 2025, integrando:

Engenharia de Software

Inteligência Artificial

UX/UI

Mobile Development

Trabalho em equipe

⭐ Licença

Projeto acadêmico, livre para fins educacionais.
