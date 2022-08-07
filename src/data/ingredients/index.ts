import ham from './ham.json';
import cheese from './cheese.json';
import chorizo from './chorizo.json';
import mushrooms from './mushrooms.json';
import olive from './olive.json';
import onions from './onions.json';
import chicken from './chicken.json';
import lardoons from './lardoons.json';
import merguez from './merguez.json';
import egg from './egg.json';
import salmon from './salmon.json';
import queenconch from './queen-conch.json';

const rawIngredients = [
  ham,
  cheese,
  chorizo,
  mushrooms,
  olive,
  onions,
  chicken,
  lardoons,
  merguez,
  egg,
  salmon,
  queenconch,
];

export const PIZZA_INGREDIENTS = Object.freeze(rawIngredients.map((item) => Object.freeze(item)));
