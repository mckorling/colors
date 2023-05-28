import { useReducer, useState } from 'react'; //useContext,
import SavedColors from './saved-colors';
import RelatedColors from './related-colors';
import AdjustColors from './adjust-colors';
import ColorPicker from './color-picker';
import { colorReducer, initialState } from '../color-reducer';
import { useContext } from '../context'; //ColorContext,

const Application = () => {
  // Refactored from useState to useReducer to useContext
  // const [hexColor, setHexColor] = useState('#e56e24');
  // const [{ hexColor }, dispatch] = useReducer(colorReducer, initialState);
  const { hexColor, dispatch } = useContext(); // destructred from value attribute in ColorContext.Provider

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 p-8 pb-40 dark:bg-slate-900 dark:text-white sm:grid-cols-2">
      <ColorPicker
        hexColor={hexColor}
        onChange={(e) =>
          dispatch({
            type: 'update-hex-color',
            payload: { hexColor: e.target.value },
          })
        }
      />
      <AdjustColors dispatch={dispatch} hexColor={hexColor} />
      <RelatedColors hexColor={hexColor} />
      <SavedColors hexColor={hexColor} dispatch={dispatch} />
    </div>
  );
};

export default Application;
