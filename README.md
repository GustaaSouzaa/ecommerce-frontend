# 💻 E-commerce Frontend (React.js & Vite)

Este projeto representa o frontend interativo da aplicação de e-commerce, construído com React.js. Ele oferece uma experiência de usuário rica e fluida, permitindo aos usuários navegar por produtos, gerenciar um carrinho de compras, finalizar pedidos e acessar funcionalidades administrativas, tudo isso com um design moderno e responsivo.

## ✨ Funcionalidades Abrangentes

-   **Visualização e Interação com Produtos:**
    -   `Lista de Produtos`: Exibição de todos os produtos disponíveis, com informações essenciais.
    -   `Página de Detalhes do Produto`: Apresentação de informações completas sobre um produto específico, com a opção de adicionar ao carrinho.
-   **Sistema de Autenticação e Gestão de Usuários:**
    -   `Páginas Dedicadas`: Formulários intuitivos para `Login` e `Registro` de novos usuários.
    -   `Integração Segura`: Comunicação com o backend para autenticação (via `HTTP Basic Auth` para fins de demonstração) e criação de contas, incluindo perfis de `usuário comum` (`ROLE_USER`) e `administrador` (`ROLE_ADMIN`).
    -   `Gerenciamento de Estado de Autenticação`: Utiliza o `React Context API` para gerenciar e persistir o estado de login do usuário globalmente na aplicação.
    -   `Logout`: Funcionalidade clara para encerrar a sessão do usuário.
-   **Experiência de Compra com Carrinho de Compras:**
    -   `Adição Dinâmica`: Permite adicionar produtos à sacola de compras diretamente das listagens ou páginas de detalhes.
    -   `Gestão do Carrinho`: Visualização detalhada dos itens no carrinho, com opções para `remover produtos individuais` ou `esvaziar o carrinho` completamente.
-   **Histórico de Pedidos:**
    -   `Visualização Simples`: Página dedicada para exibir o histórico de pedidos de um usuário, incluindo detalhes como data, valor total e itens comprados.
-   **Interface de Administração de Produtos (ROLE_ADMIN Exclusivo):**
    -   `Acesso Restrito`: Página de administração acessível apenas por usuários com perfil de `administrador` (`ROLE_ADMIN`), garantindo o controle de acesso no frontend.
    -   `CRUD Completo`: Interface intuitiva para `Criar`, `Ler`, `Atualizar` e `Deletar` produtos, espelhando as funcionalidades do backend.
-   **Design e Usabilidade Aprimorados:**
    -   `Design Responsivo (Mobile-First)`: A interface se adapta perfeitamente a diferentes tamanhos de tela (desktops, tablets, smartphones) utilizando Flexbox, CSS Grid e `Media Queries`.
    -   `Modo Claro/Escuro (Dark/Light Mode)`: Alternância de tema automática baseada na preferência do sistema operacional do usuário, com uma opção manual para personalização.
    -   `Animações e Micro-Interações`: Transições suaves, efeitos de hover em botões e cards, e animações de entrada de página para uma interface mais dinâmica.
    -   `Notificações Toast`: Utiliza a biblioteca `React Toastify` para exibir mensagens de feedback (sucesso, erro, validação) de forma não intrusiva e visualmente agradável.
-   **Proteção de Rotas no Frontend:**
    -   `Rotas Protegidas`: Implementação de guardas de rota que redirecionam usuários não autenticados para a página de login ao tentar acessar áreas restritas da aplicação (ex: Carrinho, Histórico de Pedidos, Páginas de Detalhes de Produto).

## ⚙️ Tecnologias Detalhadas

-   **React.js:** Biblioteca JavaScript para construção de interfaces de usuário, utilizando componentes funcionais e Hooks (`useState`, `useEffect`, `useContext`, `useCallback`).
-   **Vite:** Ferramenta de build de frontend moderna e rápida, otimizando o desenvolvimento local e a compilação para produção.
-   **React Router DOM:** Biblioteca padrão para roteamento declarativo em aplicações React, permitindo navegação entre diferentes views sem recarregar a página.
-   **Axios:** Cliente HTTP baseado em Promises, utilizado para realizar requisições assíncronas para a API RESTful do backend.
-   **React Context API:** Mecanismo nativo do React para gerenciamento de estado global, utilizado para compartilhar o status de autenticação do usuário e as preferências de tema entre componentes.
-   **CSS3:** Utilizado para estilização de todos os componentes, com foco em:
    -   `Variáveis CSS`: Para gerenciamento de temas (claro/escuro) e cores.
    -   `Flexbox e CSS Grid`: Para layouts flexíveis e responsivos.
    -   `Media Queries`: Para adaptar o layout a diferentes tamanhos de tela.
    -   `Transições e Keyframes (@keyframes)`: Para adicionar animações suaves.
-   **React Toastify:** Biblioteca para exibir notificações de feedback ao usuário de forma elegante e personalizável.
-   **JavaScript (ES6+):** Linguagem principal do frontend, com uso de features modernas.

## 🚀 Como Rodar o Projeto Localmente

1.  **Pré-requisitos:**
    -   **Node.js (versão LTS recomendada)** e **npm** (Node Package Manager) instalados.
    -   **O Backend deve estar rodando localmente** na porta `8080`. Se ainda não o fez, siga as instruções no [README do Backend](https://github.com/GustaaSouzaa/ecommerce-backend) para iniciá-lo.

2.  **Configuração da API (Proxy para Desenvolvimento):**
    -   O projeto frontend utiliza um proxy de desenvolvimento do Vite que redireciona requisições que começam com `/api` para `http://localhost:8080`. Isso é configurado automaticamente via `vite.config.js`.
    -   Certifique-se de que, em seus arquivos de serviço (`src/services/*.js`), a URL base da API está configurada para usar a variável de ambiente `VITE_APP_API_BASE_URL` ou um fallback para `/api` (que o proxy do Vite interceptará em desenvolvimento):
        ```javascript
        // Exemplo em src/services/productService.js
        const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || '/api';
        // ...
        // axios.get(`${API_BASE_URL}/products`);
        ```

3.  **Clonar o Repositório:**
    ```bash
    git clone [https://github.com/GustaaSouzaa/ecommerce-frontend.git](https://github.com/GustaaSouzaa/ecommerce-frontend.git)
    cd ecommerce-frontend
    ```

4.  **Instalar Dependências:**
    -   No terminal na raiz do projeto (`ecommerce-frontend`), execute:
        ```bash
        npm install
        ```

5.  **Rodar a Aplicação:**
    -   Ainda no terminal, execute:
        ```bash
        npm run dev
        ```

6.  **Acessar a Aplicação:**
    -   Abra seu navegador e acesse a URL fornecida pelo Vite (geralmente `http://localhost:5173`).

## ☁️ Deploy (Opcional)

Este projeto foi projetado para ser facilmente implantado em plataformas de hospedagem gratuitas:

-   **Frontend:** Vercel
    -   Conecte o repositório `ecommerce-frontend` no Vercel.
    -   Defina a variável de ambiente `VITE_APP_API_BASE_URL` com a URL pública do seu backend (ex: `http://seu-backend-em-producao.elasticbeanstalk.com/api`).
-   **Backend:** AWS Elastic Beanstalk (com PostgreSQL no AWS RDS)
    -   Configure um ambiente Elastic Beanstalk para Java.
    -   Conecte-o à sua instância RDS PostgreSQL.
    -   Defina as variáveis de ambiente necessárias (credenciais do RDS, `SPRING_PROFILES_ACTIVE=prod`, e a URL do frontend Vercel em `MYAPP_FRONTEND_URL`).

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

Made with ❤️ by [Seu Nome Completo]