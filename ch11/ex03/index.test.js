import { littleEndianToBigEndian, bigEndianToLittleEndian } from ".";
describe("11-3のテスト", () => {
  test("リトルエンディアンからビッグエンディアン", () => {
    const input = new Uint32Array([0x12345678, 0xaabbccdd, 0x000000ff]);
    const expectedOutput = new Uint32Array([
      0x78563412, 0xddccbbaa, 0xff000000,
    ]);
    const output = littleEndianToBigEndian(input);
    expect(output).toEqual(expectedOutput);
  });
  test("ビッグエンディアンからリトルエンディアン", () => {
    const input = new Uint32Array([0x78563412, 0xddccbbaa, 0xff000000]);
    const expectedOutput = new Uint32Array([
      0x12345678, 0xaabbccdd, 0x000000ff,
    ]);
    const output = bigEndianToLittleEndian(input);
    expect(output).toEqual(expectedOutput);
  });
});
