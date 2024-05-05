import { convertAtIfPattern, convertAtSwitchPattern } from ".";
describe("エスケープシーケンスを変換", () => {
  test("\0(Null文字)を表示する", () => {
    expect(convertAtIfPattern("abcd\0fg")).toBe("abcd\\0fg");
    expect(convertAtSwitchPattern("abcd\0fg")).toBe("abcd\\0fg");
  });
  test("\b(バックスペース)を表示する", () => {
    expect(convertAtIfPattern("abcd\bfg")).toBe("abcd\\bfg");
    expect(convertAtSwitchPattern("abcd\bfg")).toBe("abcd\\bfg");
  });
  test("\t(水平タブ)を表示する", () => {
    expect(convertAtIfPattern("abcd\tfg")).toBe("abcd\\tfg");
    expect(convertAtSwitchPattern("abcd\tfg")).toBe("abcd\\tfg");
  });
  test("\n(改行)を表示する", () => {
    expect(convertAtIfPattern("abcd\nfg")).toBe("abcd\\nfg");
    expect(convertAtSwitchPattern("abcd\nfg")).toBe("abcd\\nfg");
  });
  test("\v(垂直タブ)を表示する", () => {
    expect(convertAtIfPattern("abcd\vfg")).toBe("abcd\\vfg");
    expect(convertAtSwitchPattern("abcd\vfg")).toBe("abcd\\vfg");
  });
  test("\f(改頁)を表示する", () => {
    expect(convertAtIfPattern("abcd\ffg")).toBe("abcd\\ffg");
    expect(convertAtSwitchPattern("abcd\ffg")).toBe("abcd\\ffg");
  });
  test("\r(復帰)を表示する", () => {
    expect(convertAtIfPattern("abcd\rfg")).toBe("abcd\\rfg");
    expect(convertAtSwitchPattern("abcd\rfg")).toBe("abcd\\rfg");
  });
  test('"(二重引用符)を表示する', () => {
    expect(convertAtIfPattern('abcd"fg')).toBe('abcd\\"fg');
    expect(convertAtSwitchPattern('abcd"fg')).toBe('abcd\\"fg');
  });
  test("'(アポストロフィ)を表示する", () => {
    expect(convertAtIfPattern("abcd'fg")).toBe("abcd\\'fg");
    expect(convertAtSwitchPattern("abcd'fg")).toBe("abcd\\'fg");
  });
  test("\\(バックスラッシュ)を表示する", () => {
    expect(convertAtIfPattern("abcd\\fg")).toBe("abcd\\\\fg");
    expect(convertAtSwitchPattern("abcd\\fg")).toBe("abcd\\\\fg");
  });
  test("複数のエスケープシーケンス文字が複合された文字列を表示する", () => {
    expect(convertAtIfPattern("\0\b\t\n\v\f\r\"'\\")).toBe(
      `\\0\\b\\t\\n\\v\\f\\r\\"\\'\\\\`,
    );
    expect(convertAtSwitchPattern("\0\b\t\n\v\f\r\"'\\")).toBe(
      `\\0\\b\\t\\n\\v\\f\\r\\"\\'\\\\`,
    );
  });
});
