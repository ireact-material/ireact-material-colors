
// type
export type PalettesProps = Record<string, string[] & { primary?: string }>;

// 预设原色
const presetPrimaryColors: Record<string, string> = {
  red: '#F44336',
  pink: '#e91e63',
  purple: '#9c27b0',
  deeppurple: '#673ab7',
  indigo: '#3f51b5',
  blue: '#2196F3',
  lightblue: '#03a9f4',
  cyan: '#00bcd4',
  teal: '#009688',
  green: '#4CAF50',
  lightgreen: '#8bc34a',
  lime: '#cddc39',
  yellow: '#ffeb3b',
  amber: '#ffc107',
  orange: '#ff9800',
  deeporange: '#ff5722',
  brown: '#795548',
  bluegrey: '#607d8b',
  grey: '#9e9e9e',
};

// 预设调色板
const presetPalettes: PalettesProps = {};
// 预设深色调色板
const presetDarkPalettes: PalettesProps = {};

export {
  presetPalettes,
  presetDarkPalettes,
  presetPrimaryColors,
}
