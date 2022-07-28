import tomato from './tomato.json';
import cream from './cream.json';

const rawBases = [tomato, cream];

export const bases = Object.freeze(rawBases.map((item) => Object.freeze(item)));
