function Function() {
  {
    const a = 1;
    const b = "Z";
    const c = { obj: 1 };
    console.log(a, b, c); // 1 Z { obj: 1 }
  }
  {
    const a = 1;
    const b = "Z";
    const c = { obj: 1 };
    console.log(a, b, c); // 1 Z { obj: 1 }
  }
}

Function();
