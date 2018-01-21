import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import { toggleTodo } from '../actions';
import { getVisibleTodos } from '../reducers';
import TodoList from './TodoList';



const mapStateToProps = (state, {match}) => ({
  todos: getVisibleTodos(state, match.params.filter || 'all'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    },
  };
};

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList));

export default VisibleTodoList;