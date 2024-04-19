import { bitCount } from ".";
test("32ビット整数表現で1であるビットの数", () => {
  expect(bitCount(0b111)).toBe(3);
  expect(bitCount(0b1111111111111111111111111111111)).toBe(31);
});
