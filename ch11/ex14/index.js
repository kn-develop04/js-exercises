export function sortJapanese(jpArr) {
  return jpArr.sort(Intl.Collator("ja-JP", { sensitivity: "base" }).compare);
}

export function toJapaneseDateString(date) {
  return new Intl.DateTimeFormat("ja-JP-u-ca-japanese", {
    dateStyle: "long",
  }).format(date);
}
