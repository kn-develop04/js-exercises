import { greet1 as greet, Person2 } from "./index.js";
export { Person4 } from "./index.js";
import Person3 from "./index.js";

greet();
let alice = new Person2();
let bob = new Person3();
alice.greet();
bob.greet();
