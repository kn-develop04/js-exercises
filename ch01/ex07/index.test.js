import { Point } from ".";

describe("Pointクラス", () => {
  describe("座標加算を行えること", () => {
    it("x座標12を自分(12)に加算すると24", () => {
      const p = new Point(12, 24);
      expect(p.add(p)[0]).toBe(24);
    });
    it("y座標24を自分(24)に加算すると48", () => {
      const p = new Point(12, 24);
      expect(p.add(p)[1]).toBe(48);
    });
  });
});
