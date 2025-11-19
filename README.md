a inteligente de Upskilling e Reskilling desenvolvida para a Global Solution FIAP 2025, permitindo que colaboradores acompanhem trilhas de aprendizado, progresso e cursos recomendados.

📱 Sobre o Projeto

O SkillBoost AI Mobile é um aplicativo desenvolvido em React Native + Expo, integrado ao Firebase Authentication e Firestore, permitindo:

Autenticação segura de usuários

Acesso à trilhas recomendadas

Visualização de detalhes das trilhas

Progresso do colaborador

Perfil do usuário

Design moderno, responsivo e otimizado para mobile

👨‍💻 Integrantes do Grupo
Nome	RM	Função
Guilherme Rezende Bezerra	98508	Dev Mobile / Integrações Firebase
Gustavo Brisqui	97969	Designer / Suporte Funcional
Matheus Brisqui	97892	Arquitetura UI/UX / Documentação
🚀 Tecnologias Utilizadas
Frontend

React Native

Expo

TypeScript

React Navigation

Context API

Axios

AsyncStorage

Hooks personalizados

Backend / Serviços

Firebase Authentication

Firebase Firestore

MockAPI para trilhas e cursos

🔐 Autenticação

O app utiliza Firebase Auth com Email/Senha.
Recursos suportados:

Registro de novos usuários

Login

Logout

Persistência de sessão com AsyncStorage

Exemplo:

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

🗂 Estrutura de Pastas
src/
 ├── components/
 ├── context/
 ├── navigation/
 ├── screens/
 ├── services/
 ├── theme/
 └── utils/

🧭 Fluxo de Navegação
🔻 Visitante (não autenticado)

Login

Criar Conta

🔺 Usuário autenticado

Home

Trilhas recomendadas

Detalhe da trilha

Perfil

🧬 Principais Funcionalidades

✔ Criar conta (Firebase Auth)
✔ Login com validação
✔ Logout
✔ Listagem de trilhas do MockAPI
✔ Detalhes da trilha com nível, skills e carga horária
✔ Inscrição em trilhas
✔ Perfil do colaborador
✔ Loading global e tratamento de erros

🔧 Instalação e Execução
1. Clonar o repositório
git clone https://github.com/guibezerra24/SkillBoostAI.Mobile.git
cd SkillBoostAI.Mobile

2. Instalar dependências
npm install

3. Instalar AsyncStorage (persistência)
npm install @react-native-async-storage/async-storage

4. Iniciar o app
npx expo start -c


Abra o app usando Expo Go no iOS ou Android.

🔥 Configuração Firebase

Crie:

src/services/firebaseConfig.ts


Cole:

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
  messagingSenderId: "SEU_SENDER",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

🌐 API de Trilhas (MockAPI)

Endpoint:

https://SEU_PROJETO.mockapi.io/tracks


Exemplo de trilha:

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

👨‍🏫 Professores e Avaliação

Projeto desenvolvido para entrega da Global Solution 2025 – FIAP, integrando práticas modernas de desenvolvimento mobile com Inteligência Artificial aplicada ao futuro do trabalho.

⭐ Contribuições

Pull Requests são bem-vindos!

📄 Licença

Projeto acadêmico — uso livre apenas para fins educacionais.
