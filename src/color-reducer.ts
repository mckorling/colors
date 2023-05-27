import { rgb } from 'color-convert';

export type UpdateHexColorAction = {
  type: 'update-hex-color';
  payload: {
    hexColor: string;
  };
};

export type UpdateRGBColorAction = {
  type: 'update-rgb-color';
  payload: {
    rgb: [number, number, number]; // ts knows that this is an array of three numbers (aka, tuple)
  };
};

// Template Literal Types: (Other possibilities) //////////////////////////
type HexColor = `#${string}`;
type RGBString = `rgb(${number}), ${number}, ${number}`;
type ColorFormats = 'rgb' | 'hex' | 'hsl' | 'hsv';
type ActionTypes = `update-${ColorFormats}-color`;
const isHexColor = (s: string): s is HexColor => {
  return s.startsWith('#');
}; // hover over method definition to see return type is checking for #${string}
/////////////////////////////////////////////////

type ColorState = {
  hexColor: string;
};

export const initialState: ColorState = {
  hexColor: '#BADA55',
};

// could also just move this into the global.d.ts file, and it's just available, no need to import it
export type AdjustColorActions = UpdateHexColorAction | UpdateRGBColorAction;

export const colorReducer = (
  state: ColorState = initialState,
  action: AdjustColorActions,
) => {
  if (action.type === 'update-hex-color') {
    const { hexColor } = action.payload;
    return { ...state, hexColor };
  }
  if (action.type === 'update-rgb-color') {
    const hexColor = '#' + rgb.hex(action.payload.rgb); // use library to convert rgb into hex value, library expects hexcodes to have #
    return { ...state, hexColor };
  }
  return state;
};
