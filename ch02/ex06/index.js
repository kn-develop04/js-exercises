export const fizzbuzz = () => {
  let data = [];
  for (let i = 1; i <= 100; i++) {
    data[i - 1] =
      i % 15 === 0
        ? "FizzBuzz"
        : i % 3 === 0
        ? "Fizz"
        : i % 5 === 0
        ? "Buzz"
        : i;
  }
  return `${data.join("\n") + "\n"}`;
};

// m2つめのほうでもテストが通る。最初の比較時にvalueを増やしておかないと0÷△のあまりは0なので、1つめはおかしくなる
// export const fizzbuzz = () => [...Array(100).keys()].map(value => (value % 3 === 0 ? "Fizz" : "") + (value % 5 === 0 ? "Buzz" : "") || value.toString()).join('\n')+'\n';
// export const fizzbuzz = () =>  [...Array(100).keys()].map(value => (++value % 3 === 0 ? "Fizz" : "") + (value % 5 === 0 ? "Buzz" : "") || value).join('\n') + '\n';
