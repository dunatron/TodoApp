import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import { toggleTodo, receiveTodos } from '../actions';
import { getVisibleTodos } from '../reducers';
import TodoList from './TodoList';

import {fetchTodos} from '../api';

fetchTodos('all').then(todos =>
  console.log(todos)
);

class VisibleTodoList extends Component {

  componentDidMount() {
    this.fetchData();
  }

  //compare the current and the previous values of the filter.
  // If the current filter is not the same as the previous filter,
  // it's time to fetch the todos for the current filter.
  componentDidUpdate(prevProps) {
    if(this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const {filter, receiveTodos} = this.props;
    fetchTodos(filter).then(todos =>
      receiveTodos(filter, todos)
    );
  }

  render() {
    return <TodoList {...this.props} />;
  }
}

const mapStateToProps = (state, {match}) => {
  const filter = match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    },
  };
};

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  {onTodoClick: toggleTodo, receiveTodos}
)(VisibleTodoList));

export default VisibleTodoList;