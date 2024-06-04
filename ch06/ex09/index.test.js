import { jest } from "@jest/globals";
const mock = jest.fn();

const obj = {
  x: 0,
  y: 0,
  sum() {
    mock();
    return this.x + this.y;
  },
};

obj.toJSON = () => ({ ...obj, sum: obj.sum() });

obj.x = 1;
obj.y = 2;
test("Your test suite must contain at least one test.対策", () => {
  expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2,"sum":3}`);
  expect(mock).toHaveBeenCalled();
});
