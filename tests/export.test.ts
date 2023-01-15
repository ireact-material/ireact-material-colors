import {
  amber,
  blue,
  bluegrey,
  brown,
  cyan,
  deeporange,
  deeppurple,
  green,
  grey,
  indigo,
  lightblue,
  lightgreen,
  lime,
  orange,
  pink,
  presetDarkPalettes,
  purple,
  red,
  teal,
  yellow,
} from '../src';
import { presetBlueColors, presetBlueDarkColors } from './index.test';

// 导入颜色
test(`import { blue } from '@ireact-material/colors'`, () => {
  console.log('presetBlueColors', blue.primary);
  expect(blue.primary).toEqual(presetBlueColors[5]);
  expect([...blue]).toEqual(presetBlueColors);
});

// 深色
test(`import { presetDarkPalettes } from '@ireact-material/colors'`, () => {
  const darkBlue = presetDarkPalettes.blue;

  console.log('presetBlueDarkColors', presetBlueDarkColors);
  expect([...darkBlue]).toEqual(presetBlueDarkColors);
});

// 其他颜色
test(`other colors'`, () => {
  expect(red.length).toEqual(10);
  expect(pink.length).toEqual(10);
  expect(purple.length).toEqual(10);
  expect(deeppurple.length).toEqual(10);
  expect(indigo.length).toEqual(10);
  expect(blue.length).toEqual(10);
  expect(lightblue.length).toEqual(10);
  expect(cyan.length).toEqual(10);
  expect(teal.length).toEqual(10);
  expect(green.length).toEqual(10);
  expect(lightgreen.length).toEqual(10);
  expect(lime.length).toEqual(10);
  expect(yellow.length).toEqual(10);
  expect(amber.length).toEqual(10);
  expect(orange.length).toEqual(10);
  expect(deeporange.length).toEqual(10);
  expect(brown.length).toEqual(10);
  expect(bluegrey.length).toEqual(10);
  expect(grey.length).toEqual(10);

  expect(presetDarkPalettes.red.length).toEqual(10);
  expect(presetDarkPalettes.pink.length).toEqual(10);
  expect(presetDarkPalettes.purple.length).toEqual(10);
  expect(presetDarkPalettes.deeppurple.length).toEqual(10);
  expect(presetDarkPalettes.indigo.length).toEqual(10);
  expect(presetDarkPalettes.blue.length).toEqual(10);
  expect(presetDarkPalettes.lightblue.length).toEqual(10);
  expect(presetDarkPalettes.cyan.length).toEqual(10);
  expect(presetDarkPalettes.teal.length).toEqual(10);
  expect(presetDarkPalettes.green.length).toEqual(10);
  expect(presetDarkPalettes.lightgreen.length).toEqual(10);
  expect(presetDarkPalettes.lime.length).toEqual(10);
  expect(presetDarkPalettes.yellow.length).toEqual(10);
  expect(presetDarkPalettes.amber.length).toEqual(10);
  expect(presetDarkPalettes.orange.length).toEqual(10);
  expect(presetDarkPalettes.deeporange.length).toEqual(10);
  expect(presetDarkPalettes.brown.length).toEqual(10);
  expect(presetDarkPalettes.bluegrey.length).toEqual(10);
  expect(presetDarkPalettes.grey.length).toEqual(10);
});
