<h1>Componente Modal Channel</h1>

<p align="justify">
  Componente acionado para visualizar em modal os detalhes dos itens selecioandos das histórias em quadrinhos, personagens e criadores.
</p>

<h2>Interfaces</h2>
<p align="justify">
  <strong>IEmailSelect:</strong>
</p>

| Nome        | Tipo       | Descrição                                                    |
| ----------- | ---------- | -----------------------------------------------------------  |
| id          | number     | Identificador do registro                                    |
| title       | string     | Título das HQs ou nome de personagens e criadores            |
| description | string     | Descrição do item                                            |
| modified    | Date, null | Data de modificação                                          |
| pageCount   | number     | Número de páginas                                            |
| issueNumber | number     | Número da edição                                             |
| thumbnail   | string     | Imagem                                                       |

<p align="justify">
  <strong>IParamsModal:</strong>
</p>

| Nome        | Tipo       | Descrição                                                    |
| ----------- | ---------- | -----------------------------------------------------------  |
| multiple    | boolean    | True - envia todos os emails selecionados; False - envia individualmente o email|
| channel     | string     | Nome do canal (HQs, personagens e criadores)                 |
| id          | number     | Identificador do registro                                    |
| title       | string     | Título ou nome do item do canal                              |
| description | string     | Descrição do item                                            |
| modified    | Date, null | Data de modificação                                          |
| pageCount   | number     | Número de páginas                                            |
| issueNumber | number     | Número da edição                                             |
| thumbnail   | string     | Imagem                                                       |
| nameChannel | string     | Nome do canal relacionado                                    |
| name        | string[]   | Lista de nomes do canal relacionado                          |
| active      | boolean    | True - mostra o item selecionado; False - mostra o item não selecionado|

<p align="justify">
  <strong>IParamsTypes</strong> propriedades dentro do objeto data:{} :
</p>

| Nome        | Tipo       | Descrição                                                    |
| ----------- | ---------- | -----------------------------------------------------------  |
| channel     | string     | Nome do canal (HQs, personagens e criadores)                 |
| id          | number     | Identificador do registro                                    |
| title       | string     | Título ou nome do item do canal                              |
| description | string     | Descrição do item                                            |
| modified    | Date, null | Data de modificação                                          |
| pageCount   | number     | Número de páginas                                            |
| issueNumber | number     | Número da edição                                             |
| thumbnail   | string     | Imagem                                                       |
| nameChannel | string     | Nome do canal relacionado                                    |
| name        | string[]   | Lista de nomes do canal relacionado                          |
| active      | boolean    | True - mostra o item selecionado; False - mostra o item não selecionado|

<br />

<h2>Variáveis de Estado</h2>
<p align="justify">
  <strong>[active, setActive]: Boolean</strong>: recebe a informação vinda da página principal se o item está marcado pelo usuário.
</p>
<p align="justify">
  <strong>[dataModalMail, setDataModalMail]: interface IParamsModal</strong>: utilizada para gravar os dados selecionados para envio de e-mail.
</p>

<h2>Funções</h2>
<p align="justify">
  <strong>handleSetLocalStorage:</strong> utilizada para gravar os itens marcados pelo usuário para o envio de e-mail posterior.
</p>

<p align="justify">
  <strong>handleOpenModalMail:</strong> utilizada para abrir o modal de envio de email passando as propriedades da variável "dataModalMail" para o componente SendMail.
</p>

<h2>Hooks</h2>
<p align="justify">
  <strong>useSendMail:</strong> utilizado para abrir e fechar o modal de envio de e-email de vários locais da aplicação.
</p>
