import { returnType } from ".";

describe("12-5のテスト", () => {
  test("テンプレートリテラルが文字列の時、型はstr", () => {
    const result = returnType`${"a"}`;
    expect(...result).toBe("string");
  });
  test("テンプレートリテラルがオブジェクトの時、型はobject", () => {
    const result = returnType`${{ x: 1 }}`;
    expect(...result).toBe("object");
  });
  test("テンプレートリテラルが関数の時、型はfunction", () => {
    const result = returnType`${() => {}}`;
    expect(...result).toBe("function");
  });
  test("テンプレートリテラルが数値の時、型はnumber", () => {
    const result = returnType`${1}`;
    expect(...result).toBe("number");
  });
  test("引数に文字列とオブジェクトが両方含まれるケース", () => {
    const result = returnType`${"a"} ${{ x: 1 }}`;
    expect(result[0]).toBe("string");
    expect(result[1]).toBe("object");
  });
});
