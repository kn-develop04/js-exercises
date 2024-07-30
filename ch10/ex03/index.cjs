function greet1(name) {
  console.log("Hello,function");
}

class Person2 {
  greet() {
    console.log("Hello,person");
  }
}

module.exports = {
  greet: greet1,
  Person: Person2,
};
