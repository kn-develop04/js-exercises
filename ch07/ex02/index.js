function fizzbuzz(n) {
  const array = Array.from({ length: n }, (element, i) => i + 1);
  array.map((element) => {
    element % 15 === 0
      ? console.log("FizzBuzz")
      : element % 3 === 0
      ? console.log("Fizz")
      : element % 5 === 0
      ? console.log("Buzz")
      : console.log(element);
  });
}

function sumOfSquaredDifference(f, g) {
  return f
    .map((val, i) => (val - g[i]) ** 2)
    .reduce((acc, curr) => acc + curr, 0);
}

console.log(sumOfSquaredDifference([3, 3, 3], [1, 2, 3])); //5
console.log(sumOfSquaredDifference([4, 3, 2], [1, 2, 3])); //11

function sumOfEvensIsLargerThan42(array) {
  const sum = array
    .filter((num) => num % 2 === 0)
    .reduce((acc, curr) => acc + curr, 0);
  return sum >= 42;
}
console.log(sumOfEvensIsLargerThan42([5, 20, 20, 22])); //true
console.log(sumOfEvensIsLargerThan42([5, 20, 20, 1])); //false

// function fizzbuzz(n) {
//   for (let i = 1; i <= n; i++) {
//     if (i % 15 === 0) {
//       console.log("FizzBuzz");
//     } else if (i % 3 === 0) {
//       console.log("Fizz");
//     } else if (i % 5 === 0) {
//       console.log("Buzz");
//     } else {
//       console.log(i);
//     }
//   }
// }

// function sumOfSquaredDifference(f, g) {
//   let result = 0;
//   for (let i = 0; i < f.length; i++) {
//     result += (f[i] - g[i]) ** 2;
//   }
//   return result;
// }

// function sumOfEvensIsLargerThan42(array) {
//   let sum = 0;
//   for (let i = 0; i < array.length; i++) {
//     if (array[i] % 2 !== 0) {
//       continue;
//     }
//     sum += array[i];
//     if (sum >= 42) {
//       return true;
//     }
//   }
//   return false;
// }
