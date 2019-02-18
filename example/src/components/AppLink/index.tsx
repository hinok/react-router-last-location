import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

/**
 * @see https://github.com/ReactTraining/react-router/issues/6268
 */
const AppLink: React.FC<NavLinkProps> = (props) => {
  const isActive:NavLinkProps['isActive'] = (_, { pathname, search }) => `${pathname}${search}` === props.to;

  return (
    <NavLink isActive={isActive} {...props} />
  );
};

export default AppLink;
