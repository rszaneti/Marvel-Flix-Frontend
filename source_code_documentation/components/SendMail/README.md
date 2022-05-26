<h1>Send Mail</h1>

<p align="justify">
  Componente para enviar os dados selecionados para o servidor de serviço de e-mail em backend. Para o envio é necessario o preenchimento de nome e e-mail. Caso esse perfil esteja já gravado no localstorage então é buscado essas duas informações e apresentado nos campos do formulário.
</p>

<h2>Interfaces</h2>
<p align="justify">
  <strong>IValuesForm:</strong>
</p>

| Nome        | Tipo       | Descrição                                                    |
| ----------- | ---------- | ------------------------------------------------------------ |
| name        | string     | Nome para identificação no e-mail                            |
| email       | string     | E-mail de envio                                              |

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
  <strong>IParamTypes</strong> propriedades dentro do objeto data:{} :
</p>

| Nome        | Tipo       | Descrição                                                    |
| ----------- | ---------- | -----------------------------------------------------------  |
| multiple    | boolean    | True - envia todos os emails selecionados; False - envia individualmente o email|
| channel     | string     | Nome do canal (HQs, personagens e criadores)                 |
| id          | number     | Identificador do registro                                    |
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
  <strong>[profile, setProfile]: interface IValuesForm {}</strong>: utilizada para gravar as informações de nome e email.
</p>

<h2>Funções</h2>
<p align="justify">
  <strong>handleSetLocalStorageProfile:</strong> utilizada para atualizar ou gravar as informações de nome e email no local storage do browser.
</p>

<p align="justify">
  <strong>handleSendEmail:</strong> utilizada para o envio de e-mail. É recebido as informações para a propriedade da classe SendMail, "data", de Footer e das Páginas do Menu. Caso a propriedade "multiple" for true se envia todos os itens marcados da página por e-mail, caso false somente o item clicado no botão de enviar e-mail da página.
</p>

<h2>Hooks</h2>
<p align="justify">
  <strong>useSendMail:</strong> utilizado para abrir e fechar o modal de envio de e-email de vários locais da aplicação.
</p>
