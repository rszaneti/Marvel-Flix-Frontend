<h1>Página dos Canais Comics, Characters e Creators</h1>

<p align="justify">
  Página de seleção das histórias em quadrinhos, personagens e criadores. Permite fazer pesquisas, ordenar por campos como título, selecionar item e enviar por e-mail.
</p>
<p align="justify">
  Os itens são carregados através da API da marvel, utilizando a biblioteca axios e os dados são paginados.
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
| thumbnail   | string     | Imagem grande                                                |
| image       | string     | Imagem extra grande                                          |
| nameChannel | string     | Nome do canal relacionado                                    |
| name        | string[]   | Lista de nomes do canal relacionado                          |
| active      | boolean    | True - mostra o item selecionado; False - mostra o item não selecionado|

<br />
<p align="justify">
  <strong>IParamType:</strong>
</p>

| Nome        | Tipo       | Descrição                                                    |
| ----------- | ---------- | ------------------------------------------------------------ |
| channel     | string     | Nome do canal buscado do parâmetro "channel" da rota         |

<h2>Variáveis de Estado</h2>
<p align="justify">
  <strong>[loading, setLoading]: Boolena</strong>: utilizada para acionar o componente Loading quando estiver carregando a página.
</p>
<p align="justify">
  <strong>[dataModalMail, setDataModalMail]: interface IParamsModal</strong>: utilizada para gravar os dados selecionados para envio de e-mail.
</p>
<p align="justify">
  <strong>[openModal, setOpenModal]: Boolena</strong>: utilizada para abrir e fechar o modal de detalhes do item selecionado.
</p>
<p align="justify">
  <strong>[dataModal, setDataModal]: {} IParamsModal</strong>: utiliada para gravar a informação do item selecionado e apresentar no modal de detalhes do item.
</p>
<p align="justify">
  <strong>[list, setList]: {} IComicDataWrapper</strong>: utilizada para gravar os dados da listagem buscada na API da marvel e apresentar em tela paginada.
</p>
<p align="justify">
  <strong>[text, setText]: String</strong>: grava o texto digitado no campo da pesquisa. Enquanto estiver digitando não aciona a busca.
</p>
<p align="justify">
  <strong>[searchText, setSearchText]: String</strong>: após digitado, grava-se o texto da digitado e aciona a busca na API da marvel.
</p>
<p align="justify">
  <strong>[page, setPage]: Number</strong>: grava o número da página selecionado.
</p>
<p align="justify">
  <strong>[orderBy, setOrderBy]: String</strong>: seleciona qual o campo desejado para ordenação e aciona o filtro na API da marvel.
</p>
<p align="justify">
  <strong>[order, setOrder]: String</strong>: seleciona qual o tipo de ordem, ascendente ou descendete, e aciona o filtro na API da marvel.
</p>

<h2>Funções</h2>
<p align="justify">
  <strong>handleChangePage:</strong> utilizada alterar a página gravando o valor na variável "page".
</p>

<p align="justify">
  <strong>handleSetLocalStorage:</strong> utilizada para gravar os itens marcados pelo usuário para o envio de e-mail posterior.
</p>

<p align="justify">
  <strong>handleChangeOrder:</strong> utilizada para selecionar a ordem na variável "order".
</p>

<p align="justify">
  <strong>handleChangeOrderBy:</strong> utilizada para selecionar o campo para ordenação na variável "orderBy".
</p>

<p align="justify">
  <strong>handleChangeSearch:</strong> utilizada para selecionar o texto digitado no campo de pesquisar na variável "text".
</p>

<p align="justify">
  <strong>handleSearch:</strong> utilizada para gravar o texto digitado na variável "searchText" e acionar a pesquisa na API.
</p>

<p align="justify">
  <strong>handleOpenModal:</strong> utilizada para abrir o modal dos detalhes do item selecionado passando as propriedades da variável "dataModal" para o componente "ModalChannel".
</p>

<p align="justify">
  <strong>handleCloseModal:</strong> utilizada para fechar o modal dos detalhes do item selecionado.
</p>

<p align="justify">
  <strong>handleOpenModalMail:</strong> utilizada para abrir o modal de envio de e-mail do item selecionado passando as propriedades da variável "dataModalMail" para o componente "SendMail".
</p>

<h2>Hooks</h2>
<p align="justify">
  <strong>useSendMail:</strong> utilizado para abrir e fechar o modal de envio de e-email de vários locais da aplicação.
</p>
