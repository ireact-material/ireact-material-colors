import generate from "./generate";

// type
export type PalettesProps = Record<string, string[] & { primary?: string }>;

// 预设颜色
const presetPrimaryColors: Record<string, string> = {
  red: "#F44336",
  pink: "#e91e63",
  purple: "#9c27b0",
  deeppurple: "#673ab7",
  indigo: "#3f51b5",
  blue: "#2196F3",
  lightblue: "#03a9f4",
  cyan: "#00bcd4",
  teal: "#009688",
  green: "#4CAF50",
  lightgreen: "#8bc34a",
  lime: "#cddc39",
  yellow: "#ffeb3b",
  amber: "#ffc107",
  orange: "#ff9800",
  deeporange: "#ff5722",
  brown: "#795548",
  bluegrey: "#607d8b",
  grey: "#9e9e9e",
};

// 预设调色板
const presetPalettes: PalettesProps = {};
// 预设深色调色板
const presetDarkPalettes: PalettesProps = {};

// 循环预设颜色
Object.keys(presetPrimaryColors).forEach((key): void => {
  // 预设调色板从原色衍生出来的颜色
  presetPalettes[key] = generate(presetPrimaryColors[key]);
  // 设置基础颜色
  presetPalettes[key].primary = presetPalettes[key][5];

  // 深色预设调色板
  presetDarkPalettes[key] = generate(presetPrimaryColors[key], {
    theme: "dark",
    backgroundColor: "#141414",
  });

  // 设置基础颜色
  presetDarkPalettes[key].primary = presetDarkPalettes[key][5];
});

const red = presetPalettes.red;
const pink = presetPalettes.pink;
const purple = presetPalettes.purple;
const deeppurple = presetPalettes.deeppurple;
const indigo = presetPalettes.indigo;
const blue = presetPalettes.blue;
const lightblue = presetPalettes.lightblue;
const cyan = presetPalettes.cyan;
const teal = presetPalettes.teal;
const green = presetPalettes.green;
const lightgreen = presetPalettes.lightgreen;
const lime = presetPalettes.lime;
const yellow = presetPalettes.yellow;
const amber = presetPalettes.amber;
const orange = presetPalettes.orange;
const deeporange = presetPalettes.deeporange;
const brown = presetPalettes.brown;
const bluegrey = presetPalettes.bluegrey;
const grey = presetPalettes.grey;

export {
  generate,
  presetPalettes,
  presetDarkPalettes,
  presetPrimaryColors,
  red,
  pink,
  purple,
  deeppurple,
  indigo,
  blue,
  lightblue,
  cyan,
  teal,
  green,
  lightgreen,
  lime,
  yellow,
  amber,
  orange,
  deeporange,
  brown,
  bluegrey,
  grey,
};
