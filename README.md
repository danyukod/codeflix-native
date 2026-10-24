# Codeflix

Aplicação de catálogo de filmes e séries construída com React Native, TypeScript e React Native Web. O projeto pode ser executado no Android, iOS ou navegador.

## Funcionalidades

- Destaque do conteúdo selecionado;
- Busca por título no catálogo;
- Filtro visual por categorias;
- Layout responsivo para dispositivos móveis e web;
- Integração preparada para uma API de catálogo.

## Requisitos

- Node.js `22.11.0` ou superior;
- npm;
- Para Android: Android Studio, SDK e emulador ou dispositivo conectado;
- Para iOS: macOS, Xcode e CocoaPods.

## Instalação

```bash
git clone https://github.com/danyukod/codeflix-native.git
cd codeflix-native
npm install
```

## Executando o projeto

### Web

```bash
npm run web
npm run build:web
```

### Android

```bash
npm start
npm run android
```

### iOS

```bash
bundle install
bundle exec pod install
npm run ios
```

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm start` | Inicia o servidor Metro |
| `npm run web` | Inicia o desenvolvimento web |
| `npm run build:web` | Gera o build web de produção |
| `npm run android` | Executa no Android |
| `npm run ios` | Executa no iOS |
| `npm test` | Executa os testes com Jest |
| `npm run lint` | Verifica o código com ESLint |

## Estrutura principal

```text
App.tsx                 # Tela principal do catálogo
src/services/           # Serviços de comunicação com a API
src/types/              # Tipos compartilhados
android/                # Projeto nativo Android
ios/                    # Projeto nativo iOS
web/                    # Entrada específica da web
__tests__/              # Testes automatizados
```

## API

O serviço em `src/services/catalogApi.ts` está preparado para consumir `http://localhost:8080/videos`. Em um dispositivo físico, substitua `localhost` pelo IP da máquina que hospeda a API. A interface atual utiliza dados locais para facilitar o desenvolvimento inicial.

## Desenvolvimento

O projeto usa Fast Refresh. Depois de editar `App.tsx` ou os arquivos em `src/`, salve o arquivo e a tela será atualizada automaticamente.

## Licença

Este projeto é privado e destinado a fins de desenvolvimento.
