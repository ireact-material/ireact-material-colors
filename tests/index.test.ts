import { generate, presetPalettes } from "../src";

// 预设蓝色颜色
const presetBlueColors = [
  "#f0fbff",
  "#c7edff",
  "#9eddff",
  "#75caff",
  "#4db5ff",
  "#2196f3",
  "#1272cc",
  "#0754a6",
  "#003980",
  "#002559",
].map((color) => color.toLowerCase());

// 从给定颜色生成调色板
test("Generate palettes from a given color", () => {
  expect(generate("#1890ff")).toEqual([
    "#e6f7ff",
    "#bae7ff",
    "#91d5ff",
    "#69c0ff",
    "#40a9ff",
    "#1890ff",
    "#096dd9",
    "#0050b3",
    "#003a8c",
    "#002766",
  ]);
});

// 从给定颜色生成深色调色板
test("Generate dark palettes from a given color", () => {
  expect(
    generate("#F44336", {
      theme: "dark",
      backgroundColor: "#141414",
    })
  ).toEqual([
    "#2a1414",
    "#431918",
    "#57221e",
    "#792923",
    "#a6332a",
    "#d23c31",
    "#e86859",
    "#f39284",
    "#f8baae",
    "#faded7",
  ]);
});

// 生成原色
test("Generate primary color", () => {
  expect(presetPalettes.blue.primary).toEqual("#2196f3");
});

// 应包含预设调色板
test("should contain preseted palettes", () => {
  expect(Object.keys(presetPalettes)).toEqual([
    "red",
    "pink",
    "purple",
    "deeppurple",
    "indigo",
    "blue",
    "lightblue",
    "cyan",
    "teal",
    "green",
    "lightgreen",
    "lime",
    "yellow",
    "amber",
    "orange",
    "deeporange",
    "brown",
    "bluegrey",
    "grey",
  ]);
  expect([...presetPalettes.blue]).toEqual(presetBlueColors);
});
