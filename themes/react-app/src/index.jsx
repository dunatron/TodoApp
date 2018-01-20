import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Provider, connect} from 'react-redux';
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


const Link = ({active, children, onClick}) => {

  if (active) {
    return <span>{children}</span>;
  }

  return (
    <a href='#'
       onClick={e => {
         e.preventDefault();
         onClick()
       }}>
      {children}
    </a>
  )
};

const mapStateToLinkProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
};
const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
};
const mapDispacthToLinkProps = (dispatch, ownProps) => {
  return {
    onClick: () =>
      dispatch(
        setVisibilityFilter(ownProps.filter)
      )
  }
};
const FilterLink = connect (
  mapStateToLinkProps,
  mapDispacthToLinkProps
)(Link);


/**
 * Presentational component, doesn't specify behaviour
 */
const Todo = ({onClick, completed, text}) => (
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

const TodoList = ({todos, onTodoClick}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />)}
  </ul>
);

let nextTodoId = 0;
const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
};
let AddTodo = ({dispatch}) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }}/>
      <button
        onClick={() => {
          dispatch(addTodo(input.value))
          input.value = ''
        }}>Add ToDo
      </button>
    </div>
  )
};
// AddTodo = connect(
//   state => {
//     return {};
//   },
//   dispatch => {
//     return { dispatch };
//   }
// )(AddTodo);
// null means we don't subscribe to the store, as we do not need to use it
AddTodo = connect(
  null,
  dispatch => {
    return {dispatch};
  }
)(AddTodo);

const getVisibleTodos = (todos, filter) => {
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

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink filter='SHOW_ALL'>ALL</FilterLink>
    {' '}
    <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>
    {' '}
    <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
  </p>
);


const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  }
};
const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
};
const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  };
};
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);

const TodoApp = () => (
  <div>
    <AddTodo/>
    <VisibleTodoList/>
    <Footer/>
  </div>
);


ReactDOM.render(
  <div className="App">
    <header className="App-header">
      <img src={SSLogo} className="ss-logo" alt="logo"/>
      <img src={logo} className="App-logo" alt="logo"/>
      <img src={WebpackLogo} className="App-logo" alt="logo"/>
      <img src={reduxLogo} className="App-logo" alt="logo"/>
    </header>
    <h1>To Do App & Redux</h1>

    <Provider store={createStore(todoApp)}>
      <TodoApp/>
    </Provider>

  </div>,

  document.getElementById('react-root')
);
