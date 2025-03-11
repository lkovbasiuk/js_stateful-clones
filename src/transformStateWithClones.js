'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const RESULT = [];
  const STATE_HISTORY = {};

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      const { extraData } = actions[i];

      Object.assign(STATE_HISTORY, state, extraData);
      RESULT.push(STATE_HISTORY);
    }

    if (actions[i].type === 'removeProperties') {
      const REMOVE_HISTORY = { ...state };

      for (const key of actions[i].keysToRemove) {
        delete REMOVE_HISTORY[key];
      }
      RESULT.push(REMOVE_HISTORY);
    }

    if (actions[i].type === 'clear') {
      const CLEAR_HISTORY = {};

      RESULT.push(CLEAR_HISTORY);
    }
  }

  return RESULT;
}

module.exports = transformStateWithClones;
