import { inputToRGB, rgbToHex, rgbToHsv } from '@ctrl/tinycolor';

// 浅色数量，主色上
const lightColorCount = 5;

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

}

export default function generate(color: string, opts: Opts = {}): string[] {
  // 颜色
  const patterns: string[] = [];

  // 给定一个字符串或对象，将该输入转换为 RGB
  const rgbColor = inputToRGB(color);

  for (let i = lightColorCount; i > 0; i -= 1) {
    // 转换为hsv
    const hsv = toHsv(rgbColor);

    // 颜色字符串
    const colorString: string = toHex(
      inputToRGB({
        h: getHue(hsv, i, true),
        // s: getSaturation(hsv, i, true),
        // v: getValue(hsv, i, true),
      }),
    );
  }
}
