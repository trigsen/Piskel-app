import { hexToRgb } from '../color-converter';

test('Color converter should return object with correct colors', () => {
  const result = hexToRgb('#FFFFFF');
  expect(result).toEqual({
    r: 255, g: 255, b: 255, a: 255,
  });
});

test('Color converter should return object with correct colors', () => {
  const result = hexToRgb('#7986B4');
  expect(result).toEqual({
    r: 121, g: 134, b: 180, a: 255,
  });
});

test('Color converter should return object with correct colors', () => {
  const result = hexToRgb('#DC2E78');
  expect(result).toEqual({
    r: 220, g: 46, b: 120, a: 255,
  });
});

test('Color converter should return object with correct colors', () => {
  const result = hexToRgb('#8BB41C');
  expect(result).toEqual({
    r: 139, g: 180, b: 28, a: 255,
  });
});

test('Color converter should return object with correct colors', () => {
  const result = hexToRgb('#4BF4B0');
  expect(result).toEqual({
    r: 75, g: 244, b: 176, a: 255,
  });
});

test('Color converter should return null with incorrect result', () => {
  const result = hexToRgb('#4BF');
  expect(result).toEqual(null);
});

test('Color converter should return null with incorrect result', () => {
  const result = hexToRgb('#');
  expect(result).toEqual(null);
});

test('Color converter should return null with incorrect result', () => {
  const result = hexToRgb('#4');
  expect(result).toEqual(null);
});

test('Color converter should return null with incorrect result', () => {
  const result = hexToRgb('4BF');
  expect(result).toEqual(null);
});

test('Color converter should return null with incorrect result', () => {
  const result = hexToRgb('#4BFasdfGGGG');
  expect(result).toEqual(null);
});
