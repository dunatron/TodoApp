import {v4} from 'node-uuid'


export const receiveTodos = (filter, response) => ({
  type: 'RECIEVE_TODOS',
  filter,
  response,
});

export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: v4(),
    text,
  };
};

// No longer used as FilterLink now uses react routers Link
// export const setVisibilityFilter = (filter) => {
//   return {
//     type: 'SET_VISIBILITY_FILTER',
//     filter,
//   };
// };

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id,
  };
};