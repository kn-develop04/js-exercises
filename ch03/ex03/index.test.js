import { isSameValue } from ".";
describe("同値であること", () => {
  describe("小数計算", () => {
    it("ともに0.1で同値であること", () => {
      expect(isSameValue(0.3 - 0.2, 0.1)).toBe(true);
    });
    it("ともに0.1で同値であること(第1引数変更)", () => {
      expect(isSameValue(0.2 - 0.1, 0.1)).toBe(true);
    });
  });
  describe("整数計算", () => {
    it("(ともに2で同値であること(足し算))", () => {
      expect(isSameValue(1 + 1, 2)).toBe(true);
    });
  });
});

describe("同値でないこと", () => {
  describe("小数計算", () => {
    it("同値でないこと（引き算）", () => {
      expect(isSameValue(0.3 - 0.2, 0.2)).toBe(false);
    });
  });
  describe("整数計算", () => {
    it("(同値でないこと(足し算))", () => {
      expect(isSameValue(1 + 1, 3)).toBe(false);
    });
  });
});
