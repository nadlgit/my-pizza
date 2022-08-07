import tomato from './tomato.json';
import cream from './cream.json';

const rawBases = [tomato, cream];

export const PIZZA_BASES = Object.freeze(rawBases.map((item) => Object.freeze(item)));
