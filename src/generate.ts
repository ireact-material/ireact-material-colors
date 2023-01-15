import { inputToRGB, rgbToHex, rgbToHsv } from '@ctrl/tinycolor';

// type

interface Opts {
  theme?: 'dark' | 'default';
  backgroundColor?: string;
}

interface HsvObject {
  h: number;
  s: number;
  v: number;
}

interface RgbObject {
  r: number;
  g: number;
  b: number;
}

// 浅色数量，主色上
const lightColorCount = 5;

// 饱和度阶梯，浅色部分
const saturationStep = 0.16;
// 饱和度阶梯，深色部分
const saturationStep2 = 0.05;
// 亮度阶梯，浅色部分
const brightnessStep1 = 0.05;
// 亮度阶梯，深色部分
const brightnessStep2 = 0.15;
// 深色数量，主色下
const darkColorCount = 4;
// 色相阶梯
const hueStep = 2;

// 暗色主题颜色映射关系表
const darkColorMap = [
  { index: 7, opacity: 0.15 },
  { index: 6, opacity: 0.25 },
  { index: 5, opacity: 0.3 },
  { index: 5, opacity: 0.45 },
  { index: 5, opacity: 0.65 },
  { index: 5, opacity: 0.85 },
  { index: 4, opacity: 0.9 },
  { index: 3, opacity: 0.95 },
  { index: 2, opacity: 0.97 },
  { index: 1, opacity: 0.98 },
];

// 从 TinyColor.prototype.toHsv 移植的函数
// Keep it here because of `hsv.h * 360`
function toHsv({ r, g, b }: RgbObject): HsvObject {
  const hsv = rgbToHsv(r, g, b);
  return { h: hsv.h * 360, s: hsv.s, v: hsv.v };
}

// 从 TinyColor.prototype.toHexString 移植的函数
// Keep it here because of the prefix `#`
function toHex({ r, g, b }: RgbObject): string {
  // 将 RGB 颜色转换为十六进制
  return `#${rgbToHex(r, g, b, false)}`;
}

// 色调
function getHue(hsv: HsvObject, i: number, light?: boolean): number {
  let hue: number;

  // 根据色相不同，色相转向不同
  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i;
  } else {
    hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i;
  }

  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }

  return hue;
}

// 获取饱和度
function getSaturation(hsv: HsvObject, i: number, light?: boolean): number {
  // 灰色不改变饱和度
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }

  // 饱和度
  let saturation: number;

  // 浅色
  if (light) {
    saturation = hsv.s - saturationStep * i;
  }
  // 深色
  else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep;
  }
  // 其他
  else {
    saturation = hsv.s + saturationStep2 * i;
  }

  // 边界值修正
  if (saturation > 1) {
    saturation = 1;
  }

  // 第一格的 s 限制在 0.06-0.1 之间
  if (light && i === lightColorCount && saturation > 0.1) {
    saturation = 0.1;
  }

  // 第一格的 s 限制在 0.06-0.1 之间
  if (saturation < 0.06) {
    saturation = 0.06;
  }

  return Number(saturation.toFixed(2));
}

// 亮度阶梯
function getValue(hsv: HsvObject, i: number, light?: boolean): number {
  let value: number;

  // 亮度阶梯，浅色部分
  if (light) {
    value = hsv.v + brightnessStep1 * i;
  }
  // 亮度阶梯，深色部分
  else {
    value = hsv.v - brightnessStep2 * i;
  }

  // 最大为1
  if (value > 1) {
    value = 1;
  }

  return Number(value.toFixed(2));
}

// 从 TinyColor.prototype.mix 移植的包装函数, not treeshakable.
// 将当前颜色与另一种颜色混合给定数量，从 0 到 100。0 表示不混合（返回当前颜色）
// 数量在 [0, 1] 范围内
// 假设 color1 和 color2 没有 alpha，因为下面的 src 代码这样做了
function mix(rgb1: RgbObject, rgb2: RgbObject, amount: number): RgbObject {
  const p = amount / 100;

  const rgb = {
    r: (rgb2.r - rgb1.r) * p + rgb1.r,
    g: (rgb2.g - rgb1.g) * p + rgb1.g,
    b: (rgb2.b - rgb1.b) * p + rgb1.b,
  };

  return rgb;
}

export default function generate(color: string, opts: Opts = {}): string[] {
  // 颜色
  const patterns: string[] = [];

  // 给定一个字符串或对象，将该输入转换为 RGB
  const rgbColor = inputToRGB(color);

  for (let i = lightColorCount; i > 0; i -= 1) {
    // 转换为hsv
    const hsv = toHsv(rgbColor);

    //  将 RGB 颜色转换为十六进制
    const colorString: string = toHex(
      // 转换为 RGB
      inputToRGB({
        h: getHue(hsv, i, true),
        s: getSaturation(hsv, i, true),
        v: getValue(hsv, i, true),
      }),
    );

    // 插入数组
    patterns.push(colorString);
  }

  // 将 RGB 颜色转换为十六进制
  patterns.push(toHex(rgbColor));

  // 深色
  for (let i = 1; i <= darkColorCount; i += 1) {
    // 转换为hsv
    const hsv = toHsv(rgbColor);

    //  将 RGB 颜色转换为十六进制
    const colorString: string = toHex(
      // 转换为 RGB
      inputToRGB({
        h: getHue(hsv, i),
        s: getSaturation(hsv, i),
        v: getValue(hsv, i),
      }),
    );

    patterns.push(colorString);
  }

  // 深色主题模式
  if (opts.theme === 'dark') {
    return darkColorMap.map(({ index, opacity }) => {
      //  将 RGB 颜色转换为十六进制
      const darkColorString: string = toHex(
        mix(
          // 转换为 RGB
          inputToRGB(opts.backgroundColor || '#141414'),
          // 转换为 RGB
          inputToRGB(patterns[index]),
          opacity * 100,
        ),
      );

      return darkColorString;
    });
  }

  // 颜色
  return patterns;
}
