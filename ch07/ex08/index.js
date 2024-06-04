export function reverse(str) {
  const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
  const segments = segmenter.segment(str);
  let reverseStr = "";

  for (let i = [...segments].length - 1; i >= 0; i--) {
    reverseStr += [...segments][i].segment;
  }
  return reverseStr;
}
