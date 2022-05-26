<h1>Marvel Flix</h1>


##Objetivo
<p align="justify">
  Desenvolver um protótipo com a API do portal de desenvolvedor da Marvel.
</p>


##Visão Geral
<p align="justify">
  Marvel Flix, é um site desenvolvido para consultar as histórias em quadrinhos, personagens e seus criadores. Ao selecionar suas histórias favoritas, você pode envia-las por e-mail para ter a experiência de leitura futuramente.
</p>


##Funcionalidades
  :heavy_check_mark: Listagem das histórias em quadrinhos, personagens e criadores

  :heavy_check_mark: Pesquisa individual das histórias, personagens e criadores

  :heavy_check_mark: Opção de ordenação crescente ou decrescente

  :heavy_check_mark: Exibição de detalhes de cada item acima

  :heavy_check_mark: Selecionar as suas preferências

  :heavy_check_mark: Enviar por e-mail individualmente ou os selecionados


##Ferramentas Utilizadas
<p align="justify">
  Para o desenvolvimento desta aplicação utilizamos:
</p>
  :heavy_check_mark:React Js (front-end): para construção da estrutura da página e suas funcionalidades;

  :heavy_check_mark:SCSS: para formatação do conteúdo da página;

  :heavy_check_mark:Node Js (back-end): para o serviço de envio de e-mail;

  :heavy_check_mark:Typescript;

  :heavy_check_mark:Jest: para testes automatizados.

##Principais Bibliotecas do Projeto
<p align="justify">
  As libs (bibliotecas) são conjuntos de funcionalidades que são instaladas no projeto da aplicação para resolver problemas específicos, são elas:
</p>
<p align="justify">
  <strong>React Js:</strong>
</p>
  :heavy_check_mark:Material UI: componetes para criação de interface com o usuário;
  :heavy_check_mark:Testing Library: utilizado para testes automatizados;
  :heavy_check_mark:Axios: serviços de API;
  :heavy_check_mark:Date fns: formatação de data/hora;
  :heavy_check_mark:Formik: componente de criação de formulário;
  :heavy_check_mark:MD5: utilizado para criptografia;
  :heavy_check_mark:React Icons: uma infinidade de icones a disposição para ser compartilhada no projeto;
  :heavy_check_mark:React Router Dom: utilizado para fazer o roteamento das páginas da aplicação de forma dinâmica;
  :heavy_check_mark:React Toastify: componente para mostrar na tela as mensagens da aplicação;
  :heavy_check_mark:Yup: para validação do formulário.

<p align="justify">
  <strong>Node Js:</strong>
</p>
  :heavy_check_mark:Celebrate: para fazer validação dos campos;
  :heavy_check_mark:Handlebars: para criação do layout do e-mail com base em html;
  :heavy_check_mark:Nodemailer: possibilita o envio de e-mail para um usuário.

## Como rodar a aplicação :arrow_forward:
<p align="justify">
  <strong>Passo 1:</strong> Em seu terminal, clone o projeto:.
</p>
```
git clone https://github.com/React-Bootcamp-WoMarkersCode/certificate-generator
```
```
git clone https://github.com/React-Bootcamp-WoMarkersCode/certificate-generator
```
<p align="justify">
  *Caso deseje mudar o servidor do serviço de e-mail, em back-end, siga os próximos passos, senão vá para o passo 4.
</p>

<p align="justify">
  <strong>Passo 2:</strong> Acessando Marvel-Flix-Backend, se for em uma máquina virtual linux, confira se está devidamente configurada o dns para consumo da API, execute o comando docker-compose up -d para fazer a instalação do container e duas dependencias.
</p>

<p align="justify">
  <strong>Passo 3:</strong> Acessando Marvel-Flix-Frontend, altere o endereço no novo servidor no arquivo .env do front-end na variável de ambiente REACT_APP_SERVICE_MAIL.
</p>

<p align="justify">
  <strong>Passo 4:</strong> Acessando Marvel-Flix-Frontend, execute o comando "yarn" em seu terminal para instalar as bibliotecas.
</p>
<p align="justify">
  <strong>Passo 5:</strong> Acessando Marvel-Flix-Frontend, execute o comando "yarn test" caso deseje verificar os testes automatizados.
</p>
<p align="justify">
  <strong>Passo 5:</strong> Acessando Marvel-Flix-Frontend, execute o comando "yarn start" para rodas a aplicação.
</p>


## Como rodar os testes
<p align="justify">
  <strong>Passo 1:</strong> Em seu terminal, clone o projeto:.
</p>
```
git clone https://github.com/React-Bootcamp-WoMarkersCode/certificate-generator
```
```
git clone https://github.com/React-Bootcamp-WoMarkersCode/certificate-generator
```
<p align="justify">
  <strong>Passo 2:</strong> Acessando Marvel-Flix-Backend ou Marvel-Flix-Frontend, execute o comando npm/yarn test em seu terminal.
</p>

##Deploy da Aplicação
<p align="justify">
  Front-end:
</p>
  > Gitpages

<p align="justify">
  Back-end:
</p>
  > Heroku

:warning: Caso venha mudar o servidor para o serviço de e-mail no back-end, altere a variável de ambiente no arquivo .env REACT_APP_SERVICE_MAIL para novo endereço do servidor.

##Melhorias
<p align="justify">
  Abaixo uma descrição das melhorias que pode ser implementadas na aplicação:
</p>
:memo: Cadastro de perfil em base de dados;

:memo: Seleção do perfil ao entrar nas páginas;

:memo: Gravar as preferências em banco de dados;

| Nome        | Tipo       | Descrição                                                    |
| ----------- | ---------- | ------------------------------------------------------------ |
| channel     | string     | Nome do canal buscado do parâmetro "channel" da rota         |

