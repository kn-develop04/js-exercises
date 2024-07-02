class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() {
    console.log(`${this.name} eat`);
  }

  makeSound() {
    console.log(`${this.name} makeSound`);
  }
}

class Dog {
  animal = new Animal("dog");
  bite() {}

  eat() {
    return this.animal.eat();
  }

  makeSound() {
    return this.animal.makeSound();
  }
}

class Husky {
  animal = new Animal("husky");
  eat() {
    return this.animal.eat();
  }

  makeSound() {
    return this.animal.makeSound();
  }
}

class Cat {
  animal = new Animal("cat");
  scratch() {}
  eat() {
    return this.animal.eat();
  }

  makeSound() {
    return this.animal.makeSound();
  }
}

class Bird {
  animal = new Animal("bird");
  fly() {}
  eat() {
    return this.animal.eat();
  }
  makeSound() {
    return this.animal.makeSound();
  }
}

class Fish {
  animal = new Animal("fish");
  swim() {}
  eat() {
    return this.animal.eat();
  }
}

const dog = new Dog();
dog.eat();
dog.makeSound();

const husky = new Husky();
husky.eat();
husky.makeSound();

const cat = new Cat();
cat.eat();
cat.makeSound();

const bird = new Bird();
bird.eat();
bird.makeSound();

const fish = new Fish();
fish.eat();
// fish.makeSound() //委譲していないのでエラー
