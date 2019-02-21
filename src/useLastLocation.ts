import { useContext } from 'react';
import LastLocationContext from './LastLocationContext';

export default function useLastLocation() {
  return useContext(LastLocationContext);
}
