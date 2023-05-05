import { useContext } from 'react';
import { FormsStateContext } from '../providers/forms-state-provider';

export const useFormsState = () => useContext(FormsStateContext);
