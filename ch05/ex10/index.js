function useWith() {
  console.time("with");
  const obj = { count: 1 };
  let i = 0;
  with (obj) {
    while (i < 10000) {
      console.log(count);
      i++;
    }
  }
  console.timeLog("with");
}

function notUseWith() {
  console.time("notWith");
  const obj = { count: 1 };
  let i = 0;
  while (i < 10000) {
    console.log(obj.count);
    i++;
  }
  console.timeLog("notWith");
}

useWith();
notUseWith();
