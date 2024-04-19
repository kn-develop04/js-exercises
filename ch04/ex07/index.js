function set42(key) {
  eval(`${key} = 42;`);
}
set42("while(true) {};let i");
