export function returnProperties(obj) {
  let originalproperty = Object.getOwnPropertyNames(obj);
  let SymProperty = Object.getOwnPropertySymbols(obj);
  let inheritedProperty = [];
  while (obj) {
    let proto = Object.getPrototypeOf(obj);
    if (proto === null) break;
    inheritedProperty = inheritedProperty.concat(Object.keys(proto));
    obj = proto;
  }
  return [...originalproperty, ...SymProperty, ...inheritedProperty];
}
