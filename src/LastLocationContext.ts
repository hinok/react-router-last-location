import { createContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export type LastLocationType = null | RouteComponentProps['location'];

const LastLocationContext = createContext<LastLocationType>(null);

export default LastLocationContext;
