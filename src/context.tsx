import { Dispatch, PropsWithChildren, createContext, useReducer } from 'react';
import {
  AdjustColorActions,
  colorReducer,
  initialState,
} from './color-reducer';

// The idea is to combine Context API with useReducer.
// But useReducer can only be used in a react component
// And Context API can only be used outside a react component
// There is a work around

type ColorContextState = {
  hexColor: string;
  dispatch: Dispatch<AdjustColorActions>; // don't want to make this an optional '?'
};

export const ColorContext = createContext<ColorContextState>({
  hexColor: '#FFADEF',
} as ColorContextState); // need to add this 'as ColorContextState' to get rid of error

export const ColorProvider = ({ children }: PropsWithChildren) => {
  const [{ hexColor }, dispatch] = useReducer(colorReducer, initialState); // pulled this in from application to access dispatch

  return (
    <ColorContext.Provider value={{ hexColor, dispatch }}>
      {children}
    </ColorContext.Provider>
  );
};
