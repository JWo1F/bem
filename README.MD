## What is it?
`bem-immutable` is a library for web interface development. It provides the minimal stack for coding client-side JavaScript and templating.

## Installation
Yarn: `yarn add bem-immutable`

Or npm: `npm i --save bem-immutable`

## Use
```javascript
import { BemRoot } from 'bem-immutable';
// or import Bem from 'bem-immutable';

const box = new BemRoot('block');
const elem = box.element('element');

const nextElem = elem.mod('active');

console.log(nextElem == elem); // false
console.log(elem.toString()); // 'block__element'
console.log(nextElem.toString()); // 'block__element block__element_active'

console.log(elem.mod('mod1 mod2')); // block__element block__element_mod1 block__element_mod2
console.log(elem.mix('mix1 mix2')); // block__element mix1 mix2

console.log(elem.mod(['mod1', 'mod2'])); // block__element block__element_mod1 block__element_mod2
console.log(elem.mix(['mix1', 'mix2'])); // block__element mix1 mix2

console.log(elem.mod({ mod1: 1, mod2: true, mod3: 0, mod4: false })); // block__element block__element_mod1 block__element_mod2
console.log(elem.mix({ mix1: 1, mix2: true, mix3: 0, mix4: false })); // block__element mix1 mix2

console.log(elem.mod('a').mod('b').mix('c')); // block__element block__element_a block__element_b c
```