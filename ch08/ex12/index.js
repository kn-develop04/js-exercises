export function f(funcBody) {
  let args = [];
  for (let i = 1; i <= 10; i++) {
    args.push(`$${i}`);
  }

  const generatedFunction = new Function(...args, `return (${funcBody});`);
  return generatedFunction;
}
