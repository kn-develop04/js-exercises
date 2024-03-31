describe("絵文字の確認", () => {
  describe("💯(Hundred Points Symbol)のlength", () => {
    it("長さが2であること(サロゲートペア)", () => {
      let hundred = "💯";
      expect(hundred.length).toBe(2);
    });
  });
  describe("コードポイント表現と絵文字が同値であること", () => {
    it("utf-16コードポイント表現 \uD83D\uDCAFが絵文字と同値であること", () => {
      let hundred = "💯";
      expect("\uD83D\uDCAF" === hundred).toBe(true);
    });
    it("utf-32コードポイント表現\u{0001F4AF}が絵文字と同値であること", () => {
      let hundred = "💯";
      expect("\u{0001F4AF}" === hundred).toBe(true);
    });
  });
});
