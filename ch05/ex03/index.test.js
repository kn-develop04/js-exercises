import { holidayDecisionAtIf, holidayDecisionAtSwitch } from ".";

describe("完全週休2日制での休日判定", () => {
  test("「土」を受け取ったときはtrueが返る", () => {
    expect(holidayDecisionAtIf("土")).toBe(true);
    expect(holidayDecisionAtSwitch("土")).toBe(true);
  });
  test("「日」を受け取ったときはtrueが返る", () => {
    expect(holidayDecisionAtIf("日")).toBe(true);
    expect(holidayDecisionAtSwitch("日")).toBe(true);
  });
  test("「土」「日」以外を受け取ったときはfalseが返る", () => {
    expect(holidayDecisionAtIf("月")).toBe(false);
    expect(holidayDecisionAtIf("火")).toBe(false);
    expect(holidayDecisionAtIf("水")).toBe(false);
    expect(holidayDecisionAtIf("木")).toBe(false);
    expect(holidayDecisionAtIf("金")).toBe(false);
    expect(holidayDecisionAtSwitch("月")).toBe(false);
    expect(holidayDecisionAtSwitch("火")).toBe(false);
    expect(holidayDecisionAtSwitch("水")).toBe(false);
    expect(holidayDecisionAtSwitch("木")).toBe(false);
    expect(holidayDecisionAtSwitch("金")).toBe(false);
  });
});
