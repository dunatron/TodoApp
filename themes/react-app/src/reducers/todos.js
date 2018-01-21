import {combineReducers} from 'redux';
import todo from './todo';

// const todos = (state = [], action) => {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return [
//         ...state,
//         todo(undefined, action),
//       ];
//     case 'TOGGLE_TODO':
//       return state.map(t =>
//         todo(t, action)
//       );
//     default:
//       return state;
//   }
// };
const byId = (state = {},  action) => {
  switch (action.type) {
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
      return {
        ...state,
        [action.id]: todo(state[action.id], action),
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.id];
    default:
      return state;
  }
};


const todos = combineReducers({
  byId,
  allIds
});
// The default export is always the reducer function
export default todos;

const getAllTodos = (state) =>
  state.allIds.map(id => state.byId[id]);

/*
 * Any named export starting with get is a function that prepares
 * the data to be displayed byu th UI.
 * We usually call these functions selectors because they select
 * something from the current state
 */
export const getVisibleTodos = (state, filter) => {
  const allTodos = getAllTodos(state);
  switch (filter) {
    case 'all':
      return allTodos;
    case 'completed':
      return allTodos.filter(t => t.completed);
    case 'active':
      return allTodos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};