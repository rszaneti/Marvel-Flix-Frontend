<h1>Menu</h1>

<p align="justify">
  Exibição da lista de opções da aplicaçao no tamanho de tela acima de 1024px.
</p>

<h2>Propriedades</h2>
<p align="justify">
  Recebe as propriedade do array de objetos do arquivo menuItens.tsx.
</p>

| Nome     | Tipo       | Descrição                                                    |
| -------- | ---------- | ------------------------------------------------------------ |
| id       | string     | Identificador do objeto                                      |
| name     | string     | Nome do menu                                                 |
| to       | string     | Link da página                                               |
| active   | boolean    | Ativa o menu                                                 |

<h2>Funções</h2>
<p align="justify">
  <strong>handleActiveId:</strong> quando clicado no nome do menu, esta função grava o 'id' em uma variável de estado "activeMenu" do contextApi localizado na pasta src/context/ActiveMenuContext.tsx.
</p>
