export class C {
  #x = 42;

  getX() {
    return this.#x;
  }
}
const c = new C();
console.log(c.x); // undefined

export function C2() {
  let x = 42;

  return {
    getX() {
      return x;
    },
  };
}
const c2 = new C2();
console.log(c2.x); //undefined
