<h1>Footer</h1>

<p align="justify">
  Exibição do rodapé da aplicação contendo o botão para enviar o e-mail dos itens selecionados e um botão para desmarcar todos os itens selecionados.
</p>

<h3>Interfaces</h3>
<p align="justify">
  <strong>IParamsModal:</strong>
</p>
| Nome        | Tipo       | Descrição                                                    |
| ----------- | ---------- | ------------------------------------------------------------ |
| multiple    | boolean    | True - envia todos os emails selecionados; False - envia individualmente o email|
| channel     | string     | Nome do canal (HQs, personagens e criadores)                 |
| id          | number     | Identificador do registro                                    |
| description | string     | Descrição do item                                            |
| modified    | Date, null | Data de modificação                                          |
| pageCount   | number     | Número de páginas                                            |
| thumbnail   | string     | Imagem                                                       |
| nameChannel | string     | Nome do canal relacionado                                    |
| name        | string[]   | Lista de nomes do canal relacionado                          |
| active      | boolean    | True - mostra o item selecionado; False - mostra o item não selecionado|

<p align="justify">
  <strong>IParamType:</strong>
    - channel
</p>
| Nome        | Tipo       | Descrição                                                    |
| ----------- | ---------- | ------------------------------------------------------------ |
| channel     | string     | Nome do canal buscado do parâmetro "channel" da rota         |

<h3>Variáveis de Estado</h3>
<p align="justify">
  <strong>[dataModalMail, setDataModalMail]: interface IParamsModal</strong>: utilizada para gravar os dados selecionados para envio de e-mail.
</p>

<h3>Funções</h3>
<p align="justify">
  <strong>handleOpenModalMail:</strong> abre o modal para envio de todos os e-mails selecionados gravados no localstorage. Este chama o componente SendMail passando os parametros na propriedade "data" setando somente a propriedade "multiple" como TRUE, deixando o restante vazio, pois será buscado no componente SendMail os itens selecionados no localstorage.
</p>

<h3>Hooks</h3>
<p align="justify">
  <strong>useSendMail:</strong> utilizado para abrir e fechar o modal de envio de e-email de vários locais da aplicação.
</p>
