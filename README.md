> ⚠️ **Atenção:** Este projeto utiliza **Yarn** como gerenciador de pacotes.  
> **Não use `npm install`** para evitar conflitos de dependências.  
> Utilize sempre **`yarn`** para instalar e executar os comandos abaixo.

---

# 🚀 Projeto Next.js com Cypress e Tecnologias Modernas

Este projeto foi desenvolvido utilizando o **Next.js** com **TypeScript**, integrando um conjunto de bibliotecas modernas para produtividade, tipagem, validação, estilização e testes de componentes.

---

## 📦 Scripts disponíveis

| Comando | Descrição |
|----------|------------|
| **`yarn dev`** | Inicia o servidor de desenvolvimento do **Next.js** em modo hot-reload (geralmente em `http://localhost:3000`). Ideal para desenvolvimento local. |
| **`yarn start`** | Inicia a aplicação **em modo de produção**. Antes de usar este comando, é necessário gerar o build com `yarn build`. |
| **`yarn build`** | Compila o projeto para produção. Otimiza e empacota o código para melhor performance e deploy. |
| **`yarn docker:up`** | Sobe container **Docker** com o projeto rodando em modo de produção. |
| **`yarn docker:stop`** | Para serviço **Docker** com o projeto rodando em modo de produção. |
| **`yarn cy:open`** | Abre a interface interativa do **Cypress** para executar testes de **componentes** ou **E2E** manualmente. |
| **`yarn cy:run:component`** | Executa os testes de **componentes** do **Cypress** em modo **headless** (sem interface gráfica), ideal para CI/CD. |

---

## 🚀 Deploy na Vercel

O projeto está configurado para deploy na **Vercel**. Consulte a documentação em:

- **Guia de deploy:** [../docs/VERCEL-DEPLOY-CLIENT-SIDE.md](../docs/VERCEL-DEPLOY-CLIENT-SIDE.md)
- **Registro de alterações:** [../docs/CLIENT-SIDE-ALTERACOES-E-DEPLOY.md](../docs/CLIENT-SIDE-ALTERACOES-E-DEPLOY.md)

Pré-requisitos: conta Vercel, variáveis de ambiente configuradas no projeto Vercel e no GitLab (para CI).

---

## 🧠 Tecnologias Utilizadas

### **Next.js**
Framework React para aplicações web modernas com renderização híbrida (SSR, SSG) e otimização automática de performance.

### **TypeScript**
Superset do JavaScript que adiciona **tipagem estática**, melhorando a segurança e previsibilidade do código.

### **Axios**
Cliente HTTP baseado em Promises usado para realizar requisições a APIs de forma simples e tipada.

### **Tailwind CSS**
Framework utilitário de CSS que permite criar interfaces responsivas rapidamente com classes pré-definidas.

### **shadcn/ui**
Coleção de componentes React acessíveis e modernos baseados no **Tailwind**, prontos para uso e altamente customizáveis.

### **Zod**
Biblioteca de **validação e tipagem** de dados. Permite criar schemas para validar formulários, objetos e respostas de API.

### **Zustand**
Gerenciador de estado global leve e simples para React, ideal para substituir soluções mais complexas como Redux.

### **Socket.IO**
Biblioteca que permite **comunicação em tempo real** entre cliente e servidor (ex: chat, notificações, status em tempo real).

### **NextAuth.js**
Solução completa de **autenticação** para Next.js, com suporte a provedores OAuth, JWT e autenticação baseada em credenciais.

### **date-fns**
Biblioteca leve e modular para manipulação de **datas e horários** com suporte a internacionalização.

### **Biome**
Ferramenta moderna de **formatação e linting** de código que substitui o ESLint e Prettier, com performance otimizada em Rust.

### **Docker**
Plataforma de **contenção e empacotamento de ambiente**, garantindo consistência no desenvolvimento, build e deploy.

### **nuqs**
Biblioteca para **gerenciamento de estado via query strings** no Next.js, facilitando o compartilhamento e persistência de filtros, buscas e paginações diretamente na URL.

---

## 🧪 Testes com Cypress

O projeto utiliza o **Cypress Component Testing** para validar componentes de forma isolada e também para validar fluxos com testes **Cypress E2E**.

## 📁 Estrutura de pastas

src/
  ├── app/                      # Páginas e rotas Next.js (App Router)
      ├── (private)/            # Páginas privadas
      ├── (public)/             # Páginas publicas
      ├── api/                  # Next api endpoints
  ├── core/                     # Camada de domínio e lógica de negócio
      ├── application/          # Scripts que interferem em apenas comportamentos do sistema zod schemas, providers, use cases etc... apenas scripts sem graficos
          ├── adapters/         # Adaptadores de lógicas e serviços externos
          ├── facades/          # Lógicas destinada unicamente para organizar objetos e criar uma fachada de visualização de metodos
          ├── factories/        # Lógicas destinada unicamente para criar classes que possuem muitos parametros melhorando a leitura do código 
          ├── usecases/         # Lógicas destinada unicamente logicas aos casos de usos de cada endpoints e comportamentos reutilizaveis por todos os formulários páginas e listagens
          ├── hooks/            # Hook reutilizaveis 
          ├── validation/       # Validações zod 
          ├── providers/        # React providers 
      ├── domain/               # Tipagens e scripts helpers globais
          ├── authentication/   # Tipagem de autenticação
          ├── components/       # Tipagem de componentes que são compartilhadas
          ├── crypto/           # Lógica de criptográfia
          ├── data/             # Dados estaticos utilizados em paginas e formularios
          ├── entities/         # Tipagem de entidades
          ├── http/             # Tipagem de comunicação http
          ├── usecases/         # Pequenos scripts helpers de entidades e de alguns fluxos em ssr 
      ├── view/                 # Armazena todos os scripts que interagem com o cliente final
          ├── components/       # Componentes reutilizaveis 
              ├── formfields/   # Integrações de componentes inputs shadcn e react hook forms
              ├── form/         # Componentes de formulários, cada pasta dentro de form leva o nome da entidade que aquele formulário interage 
              ├── entities/     # Componentes que são utilizados apenas por uma entidade 
          ├── layouts/          # Next layouts 
          ├── pages/            # Páginas 
          ├── styles/           # Estilos globais 
      ├── infra/                # Armazena toda a infraestrutura de comunicação com serviços e apis 
          ├── adapters/         # Formatadores de objetos
          ├── apis/             # Comunicação com suas apis e seus endpoints
          ├── http/             # Classes adapters de clients de chamadas http(axios)
  ├── infra/                    # Armazena toda a infraestrutura de comunicação com serviços e apis 
      ├── adapters/             # Formatadores de objetos
      ├── apis/                 # Comunicação com suas apis e seus endpoints
      ├── http/                 # Classes adapters de clients de chamadas http(axios)
  ├── tests/                    # Armazena toda a infraestrutura de comunicação com serviços e apis 
      ├── unit-tests/       
          ├── core/             
              ├── view/             
              ├── application/             
              ├── domain/             

## 🌐 Estrutura de Comunicação com Endpoints

A comunicação com os endpoints segue uma estrutura organizada e padronizada para garantir **reutilização**, **clareza** e **baixo acoplamento** entre as camadas do projeto.

---

# Estrutura de Comunicação com Endpoints

Este documento descreve a arquitetura utilizada para organizar a comunicação com endpoints HTTP dentro do projeto.  
A estrutura foi criada para garantir **clareza**, **reutilização de código** e **facilidade de manutenção**.

---

## 🧩 1. Cliente HTTP

A comunicação começa com uma **classe responsável por definir qual cliente HTTP será utilizado**.  
Esse cliente é uma **abstração** de uma biblioteca de gerenciamento de requisições HTTP (por exemplo, `fetch`, `axios`, `dio`, etc.).

- Localização: `src/infra/http/<nome-do-client>/`
- Responsabilidade: criar e gerenciar instâncias de comunicação HTTP reutilizáveis.

---

## 🌐 2. Definição de Endpoints

Com o cliente definido, o próximo passo é criar uma **classe que gerencia os endpoints da API**.  
Essa classe especifica **quais endpoints existem**, seus **parâmetros** e **retornos esperados**.

- Localização: `src/infra/apis/<nome-da-api>/`
- Responsabilidade: definir métodos que representam os endpoints e suas regras de comunicação.

---

## ⚙️ 3. Casos de Uso (UseCases)

Para cada endpoint, é criada uma **classe de caso de uso (UseCase)**.  
Essas classes **recebem uma instância da classe de endpoint como parâmetro** e expõem um único método: `execute`.

- Responsabilidade: encapsular a chamada ao endpoint correspondente.
- Dentro do método `execute`, podem ser feitos tratamentos de dados para:
  - Evitar erros de API.
  - Corrigir ou validar dados antes de enviá-los.
  - Preparar as respostas para os formulários ou componentes do frontend.

---

## 🧱 4. Facade (Fachada)

Após a criação dos UseCases, é comum haver **diversos casos de uso relacionados à mesma entidade**.  
Para manter a organização, cria-se uma **classe Facade**, que agrupa todos os UseCases de uma mesma entidade.

- Responsabilidade: fornecer uma interface única e simplificada para manipular os diferentes casos de uso.
- Vantagem: facilita o uso dos métodos de uma entidade específica, sem precisar instanciar manualmente cada UseCase.

---

## 🏭 5. Factory (Fábrica)

Se sua Facade tiver **muitos endpoints**, recomenda-se criar uma **função Factory**.  
Essa função é responsável por **construir a instância completa da Facade**, instanciando todos os elementos necessários.

### Estrutura recomendada:
1. Instanciar o **cliente HTTP**.
2. Instanciar a **classe de endpoints** (que recebe o cliente HTTP como parâmetro).
3. Instanciar todos os **UseCases** (que recebem a classe de endpoints como parâmetro).
4. Retornar uma **instância da Facade**, que recebe todos os UseCases.

---

## ⚛️ 6. Uso em Componentes React

Ao utilizar a **Factory dentro de um componente React**, é importante **memorizar a instância** da Facade para evitar recriações desnecessárias.

- Utilize o hook `useMemo`:
  ```tsx
  const facade = useMemo(() => createMinhaFacade(), []);

