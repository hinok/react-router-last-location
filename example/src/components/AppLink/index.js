import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * @see https://github.com/ReactTraining/react-router/issues/6268
 */
const AppLink = (props) => {
  // eslint-disable-next-line react/prop-types
  const isActive = (_, { pathname, search }) => `${pathname}${search}` === props.to;

  return (
    <NavLink isActive={isActive} {...props} />
  );
};

export default AppLink;
