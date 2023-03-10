import { inputToRGB, rgbToHex, rgbToHsv } from "@ctrl/tinycolor";

// type

interface Opts {
  theme?: "dark" | "default";
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

// 浅色数量插入到主色上
const lightColorCount = 5;
// 深色数量插入到主色上
const darkColorCount = 4;

// 饱和度阶梯，浅色部分
const saturationStep = 0.16;
// 饱和度阶梯，深色部分
const saturationStep2 = 0.05;
// 亮度阶梯，浅色部分
const brightnessStep1 = 0.05;
// 亮度阶梯，深色部分
const brightnessStep2 = 0.15;
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

// 色相
function getHue(hsv: HsvObject, i: number, light?: boolean): number {
  // 计算后的色调
  let hue: number;

  // 1.根据色相不同，色相转向不同计算 hue 值

  // 2.设置冷色调颜色
  // 减淡变亮 色相顺时针旋转 更暖
  // 加深变暗 色相逆时针旋转 更冷
  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    hue = light
      ? Math.round(hsv.h) - hueStep * i
      : Math.round(hsv.h) + hueStep * i;
  }
  // 3.设置暖色调颜色
  // 减淡变亮 色相逆时针旋转 更暖
  // 加深变暗 色相顺时针旋转 更冷
  else {
    hue = light
      ? Math.round(hsv.h) + hueStep * i
      : Math.round(hsv.h) - hueStep * i;
  }

  // 4.将hue规范化到位于0到360°之间
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }

  return hue;
}

// 饱和度
function getSaturation(hsv: HsvObject, i: number, light?: boolean): number {
  // 1.判断是否是灰色 不改变饱和度
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }

  // 2.设置饱和度变量
  let saturation: number;

  // 3.减淡变亮 饱和度迅速降低
  if (light) {
    // s - 0.16 * i
    saturation = hsv.s - saturationStep * i;
  }
  // 4.加深变暗-最暗 饱和度提高
  else if (i === darkColorCount) {
    // s - 0.16 * i
    saturation = hsv.s + saturationStep;
  }
  // 5.加深变暗 饱和度缓慢提高
  else {
    // s - 0.05 * i
    saturation = hsv.s + saturationStep2 * i;
  }

  // 6.边界值修正避免超过 1
  if (saturation > 1) {
    saturation = 1;
  }

  // 7.判断 如果是减淡变亮 && 到达浅色上限 && 有饱和度 将饱和度重置为0
  if (light && i === lightColorCount && saturation > 0.1) {
    saturation = 0.1;
  }

  // 8.最小为 0.06 避免饱和度太小
  if (saturation < 0.06) {
    saturation = 0.06;
  }

  // 返回设置饱和度变量
  return Number(saturation.toFixed(2));
}

// 亮度
function getValue(hsv: HsvObject, i: number, light?: boolean): number {
  // 亮度值
  let value: number;

  // 1.判断减淡变亮
  if (light) {
    // v + 0.05 * i
    value = hsv.v + brightnessStep1 * i;
  }
  // 2.判断加深变暗幅度更大
  else {
    // v + 0.15 * i
    value = hsv.v - brightnessStep2 * i;
  }

  // 3.设置最大值为1
  if (value > 1) {
    value = 1;
  }

  // 返回亮度值
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
  // 生成的衍生颜色数组
  const patterns: string[] = [];

  // 将传入的颜色 color 先转换为 RGB
  const rgbColor = inputToRGB(color);

  for (let i = lightColorCount; i > 0; i -= 1) {
    // 把传入的颜色转换为HSV
    const hsv = toHsv(rgbColor);

    // 将 RGB 转为 十六进制
    const colorString: string = toHex(
      // HSV 转换为 RGB
      inputToRGB({
        // 色相
        h: getHue(hsv, i, true),
        // 饱和度
        s: getSaturation(hsv, i, true),
        // 亮度
        v: getValue(hsv, i, true),
      })
    );

    // 插入数组
    patterns.push(colorString);
  }

  // 插入传入的颜色为数组第5个
  patterns.push(toHex(rgbColor));

  // 深色
  for (let i = 1; i <= darkColorCount; i += 1) {
    // 把传入的颜色转换为HSV
    const hsv = toHsv(rgbColor);

    // 将 RGB 转为 十六进制
    const colorString: string = toHex(
      // HSV 转换为 RGB
      inputToRGB({
        // 色相
        h: getHue(hsv, i),
        // 饱和度
        s: getSaturation(hsv, i),
        // 亮度
        v: getValue(hsv, i),
      })
    );

    patterns.push(colorString);
  }

  // 深色主题模式
  if (opts.theme === "dark") {
    return darkColorMap.map(({ index, opacity }) => {
      // 将 RGB 颜色转换为十六进制
      const darkColorString: string = toHex(
        mix(
          // 转换为 RGB
          inputToRGB(opts.backgroundColor || "#141414"),
          // 转换为 RGB
          inputToRGB(patterns[index]),
          // 设置透明度
          opacity * 100
        )
      );

      return darkColorString;
    });
  }

  // 返回生成的衍生颜色数组
  return patterns;
}
