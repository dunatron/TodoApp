// import { connect } from 'react-redux';
// import { setVisibilityFilter } from '../actions';
// import Link from './Link';
//
// const mapStateToProps = (state, ownProps) => {
//   return {
//     active: ownProps.filter === state.visibilityFilter,
//   };
// };
//
// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     onClick: () => {
//       dispatch(setVisibilityFilter(ownProps.filter));
//     },
//   };
// };
//
// const FilterLink = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Link);
//
// export default FilterLink;

import React from 'react'
import {BrowserRouter, Link, Route } from 'react-router-dom'

const FilterLink = ({filter, children}) => (
  <Link
    to={filter === 'all' ? '' : filter}
  >
    {children}
  </Link>
);

export default FilterLink;