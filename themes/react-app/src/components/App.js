import React from 'react';
import LogoHeader from './logoHeader'
import Footer from './Footer';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';

const App = ({match}) => (
  <div>
    <LogoHeader/>
    <AddTodo />
    <VisibleTodoList filter={match.params.filter || 'all'} />
    <Footer />
    <button onClick={() => {
      localStorage.removeItem('state')
    }}>Delete State</button>
  </div>
);

export default App;
