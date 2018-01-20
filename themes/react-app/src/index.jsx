import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import { Provider as Redux } from 'react-redux';
import {combineReducers, createStore} from 'redux';
import logo from './img/logo.svg';
import './App.css';
import WebpackLogo from './img/webpack.svg';
import reduxLogo from './img/reduxLogo.png';
import SSLogo from './img/silverstripe-logo.png';
import {withStyles} from 'material-ui/styles';

const styles = {
  cardHolder: {
    'display': 'flex',
    'align-items': 'center',
    'overflow': 'auto',
    'box-sizing': 'border-box',
    'width': '100%',
    'justify-content': 'center',
    'flex-direction': 'row',
    'flex-wrap': 'wrap',
    'flex-flow': 'row wrap',
    'align-content': 'flex-end'
  }
};

/**
 * REDUX
 * @param state
 * @param action
 * @returns {*}
 */
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      );
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL',
                          action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

// const { combineReducers } = Redux;
const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const store = createStore(todoApp);

console.log(store.getState());

const FilterLink = ({filter, currentFilter, children, onClick}) => {

  if (filter === currentFilter) {
    return <span>{children}</span>;
  }

  return (
    <a href='#'
       onClick={e => {
        e.preventDefault();
        onClick(filter)
    }}>
      {children}
    </a>
  )
};

/**
 * Presentational component, doesn't specify behaviour
 */
const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration:
        completed ?
          'line-through' :
          'none'
    }}>
    {text}
  </li>
);

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />)}
  </ul>
);

const AddTodo = ({onAddClick}) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }}/>
      <button
        onClick={() => {
          onAddClick(input.value);
          input.value = ''
        }}>Add ToDo
      </button>
    </div>
  )
}

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
  }
};

const Footer = ({
  visibilityFilter,
  onFilterClick
}) => (
  <p>
    Show:
    {' '}
    <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter} onClick={onFilterClick}>ALL</FilterLink>
    {' '}
    <FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter} onClick={onFilterClick}>Active</FilterLink>
    {' '}
    <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter} onClick={onFilterClick}>Completed</FilterLink>
  </p>
)

let nextTodoId = 0;

const TodoApp = ({todos, visibilityFilter}) => (
  <div>
    <AddTodo onAddClick={text => store.dispatch({
      type: 'ADD_TODO',
      id: nextTodoId++,
      text
    })}/>

    <TodoList
      todos={getVisibleTodos(
        todos,
        visibilityFilter
      )}
      onTodoClick={id =>
        store.dispatch({
          type: 'TOGGLE_TODO',
          id
        })
      }
    />

    <Footer
      visibilityFilter={visibilityFilter}
      onFilterClick={filter =>
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })
      }
    />
  </div>
);


const render = () => {

  ReactDOM.render(
    <div className="App">
      <header className="App-header">
        <img src={SSLogo} className="ss-logo" alt="logo"/>
        <img src={logo} className="App-logo" alt="logo"/>
        <img src={WebpackLogo} className="App-logo" alt="logo"/>
        <img src={reduxLogo} className="App-logo" alt="logo"/>
      </header>
      <h1>To Do App & Redux</h1>
      <TodoApp
        {...store.getState()}
      />
    </div>,

    document.getElementById('react-root')
  );

};

store.subscribe(render);
render();

