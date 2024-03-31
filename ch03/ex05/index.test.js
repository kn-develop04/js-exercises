import { CrlfToLf, LfToCrlf } from ".";
describe("CRLFへの変換", () => {
  describe("LFをCRLFに変換できること", () => {
    it("1つのLFをCRLFに変換", () => {
      expect(LfToCrlf("abc\n")).toBe("abc\r\n");
    });
    it("2つのLFをCRLFに変換", () => {
      expect(LfToCrlf("abc\ndef\n")).toBe("abc\r\ndef\r\n");
    });
  });

  describe("LFへの変換", () => {
    describe("CRLFをLFに変換できること", () => {
      it("1つのCRLFをLFに変換", () => {
        expect(CrlfToLf("abc\r\n")).toBe("abc\n");
      });
      it("2つのCRLFをLFに変換", () => {
        expect(CrlfToLf("abc\r\ndef\r\n")).toBe("abc\ndef\n");
      });
    });
  });
});
