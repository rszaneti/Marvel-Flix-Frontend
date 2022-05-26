interface Array {
  id: string;
  name: string;
  to: string;
  active: boolean;
}

const menuItens: Array[] = [
  {
    id: '1',
    name: 'Histórias em Quadrinhos',
    to: '/marvel-flix-frontend/',
    active: true,
  },
  {
    id: '2',
    name: 'Personagens',
    to: '/marvel-flix-frontend/characters',
    active: true,
  },
  {
    id: '3',
    name: 'Criadores',
    to: '/marvel-flix-frontend/creators',
    active: true,
  },
];

export default menuItens;
