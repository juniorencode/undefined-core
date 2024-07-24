import { popperGenerator } from './createPopper.js';
import eventListeners from './modifiers/eventListeners.js';
import popperOffsets from './modifiers/popperOffsets.js';
import computeStyles from './modifiers/computeStyles.js';
// import applyStyles from './modifiers/applyStyles.js';
// import offset from './modifiers/offset.js';
import flip from './modifiers/flip.js';
// import preventOverflow from './modifiers/preventOverflow.js';
// import arrow from './modifiers/arrow.js';
// import hide from './modifiers/hide.js';

var defaultModifiers = [eventListeners, popperOffsets, computeStyles, flip];
var createPopper = popperGenerator({
  defaultModifiers: defaultModifiers
});
// var createPopper = popperGenerator();

export { createPopper };
