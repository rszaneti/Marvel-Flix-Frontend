<h1>Side List</h1>

<p align="justify">
  Exibição de lista de opções na lateral direita da aplicação no tamanho de tela inferior a 1024px.
</p>

<h3>Variáveis de Estado</h3>
<p align="justify">
  <strong>[open, setOpen]: boolean</strong>: Permite exibir o menu quando for true e recolher quando false.
</p>


<h3>Propriedades</h3>
<p align="justify">
  Recebe as propriedade do array de objetos do arquivo src/components/menus/Menu/menuItens.tsx.
</p>

| Nome     | Tipo       | Descrição                                                    |
| -------- | ---------- | ------------------------------------------------------------ |
| id       | string     | Identificador do objeto                                      |
| name     | string     | Nome do menu                                                 |
| to       | string     | Link da página                                               |
| active   | boolean    | Ativa o menu                                                 |

<h3>Funções</h3>
<p align="justify">
  <strong>handleDrawerOpen:</strong> quando clicado no botão para abrir o menu setando a variável "open" como true.
</p>
<p align="justify">
  <strong>handleDrawerClose:</strong> quando clicado no botão para abrir o menu setando a variável "open" como false.
</p>
<p align="justify">
  <strong>handleListItemClick:</strong> quando clicado no nome do menu lateral, esta função grava o 'id' em uma variável de estado "activeMenu" do contextApi localizado na pasta src/context/ActiveMenuContext.tsx.
</p>
