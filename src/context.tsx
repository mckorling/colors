import { Dispatch, PropsWithChildren, useReducer } from 'react'; //createContext,
import {
  AdjustColorActions,
  colorReducer,
  initialState,
} from './color-reducer';
import { createContext } from './create-context';
import { hex } from 'color-convert';

// The idea is to combine Context API with useReducer.
// But useReducer can only be used in a react component
// And Context API can only be used outside a react component
// There is a work around

type ColorContextState = {
  hexColor: string;
  dispatch: Dispatch<AdjustColorActions>; // don't want to make this an optional '?'
};

export const [useColorContext, ContextProvider] =
  createContext<ColorContextState>();
export const useContext = useColorContext;

// Best practice is to abstract what is need and encapsulate them
const useHexColor = () => {
  const { hexColor } = useColorContext();
  return hexColor;
};
const useDispatch = () => {
  const { dispatch } = useColorContext();
  return dispatch;
};
////////

// export const ColorContext = createContext<ColorContextState>({
//   hexColor: '#FFADEF',
// } as ColorContextState); // need to add this 'as ColorContextState' to get rid of error

export const ColorProvider = ({ children }: PropsWithChildren) => {
  const [{ hexColor }, dispatch] = useReducer(colorReducer, initialState); // pulled this in from application to access dispatch

  return (
    <ContextProvider value={{ hexColor, dispatch }}>{children}</ContextProvider>
  );
};
