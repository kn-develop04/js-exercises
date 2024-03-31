import { equalArrays } from ".";

describe("値が明らかに違うのにtrueになること", () => {
  it("nullとundifinedのオブジェクト", () => {
    expect(equalArrays({ a: undefined }, { b: null })).toBe(true);
  });
});
