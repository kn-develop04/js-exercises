import {
  getDaysInMonth,
  getLastMonthStart,
  getWeekdayCount,
  getLocalizedDayOfWeek,
} from ".";

describe("getDaysInMonth", () => {
  it("指定された月と年の日数を返す", () => {
    expect(getDaysInMonth(2023, 2)).toBe(28);
    expect(getDaysInMonth(2024, 1)).toBe(31);
    expect(getDaysInMonth(2023, 12)).toBe(31);
    expect(getDaysInMonth(2023, 4)).toBe(30);
  });
});

describe("getWeekdayCount", () => {
  it("週末を除く、2 つの日付の間の平日の数を返す", () => {
    expect(getWeekdayCount("2024-07-01", "2024-07-15")).toBe(11);
    expect(getWeekdayCount("2024-06-01", "2024-06-30")).toBe(20);
    expect(getWeekdayCount("2024-12-01", "2024-12-31")).toBe(22);
  });
});

describe("getLocalizedDayOfWeek", () => {
  it("指定された日付とロケールのローカライズされた曜日を返す", () => {
    expect(getLocalizedDayOfWeek("2024-07-22", "en-US")).toBe("Monday");
    expect(getLocalizedDayOfWeek("2024-07-22", "ja-JP")).toBe("月曜日");
    expect(getLocalizedDayOfWeek("2024-12-25", "en-US")).toBe("Wednesday");
    expect(getLocalizedDayOfWeek("2024-12-25", "ja-JP")).toBe("水曜日");
  });
});

describe("getLastMonthStart", () => {
  it("JSTで先月の始まりを表すDateオブジェクトを返す", () => {
    const lastMonthStart = getLastMonthStart();
    expect(lastMonthStart.getFullYear()).toBe(new Date().getFullYear());
    expect(lastMonthStart.getMonth()).toBe(new Date().getMonth() - 1);
    expect(lastMonthStart.getDate()).toBe(1);
    expect(lastMonthStart.getMinutes()).toBe(0);
    expect(lastMonthStart.getSeconds()).toBe(0);
  });
});
