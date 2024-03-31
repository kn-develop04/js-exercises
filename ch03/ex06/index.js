export function substring(str, indexStart, indexEnd) {
  let newStr = "";

  if (indexEnd === undefined || indexEnd > str.length) indexEnd = str.length;
  if (indexStart === indexEnd) return newStr;
  if (isNaN(indexStart)) indexStart = 0;
  if (isNaN(indexEnd)) indexEnd = 0;

  indexStart = Math.floor(indexStart);
  indexEnd = Math.floor(indexEnd);

  if (indexStart > indexEnd) [indexStart, indexEnd] = [indexEnd, indexStart];
  if (indexStart > str.length) return newStr;
  if (indexStart < 0) indexStart = 0;
  if (indexEnd < 0) indexEnd = 0;
  if (indexStart < 0) indexStart = 0;

  for (let i = indexStart; i < indexEnd; i++) {
    newStr += str.charAt(i);
  }
  return newStr;
}

export function slice(str, indexStart, indexEnd) {
  let newStr = "";

  if (indexEnd === undefined || indexEnd > str.length) indexEnd = str.length;
  if (indexStart === undefined) indexStart = 0;
  if (indexStart === indexEnd) return newStr;
  if (isNaN(indexStart)) indexStart = 0;
  if (isNaN(indexEnd)) indexEnd = 0;

  indexStart = Math.floor(indexStart);
  indexEnd = Math.floor(indexEnd);

  if (indexStart < 0) indexStart = Math.max(indexStart + str.length, 0);
  if (indexEnd < 0) indexEnd = Math.max(indexEnd + str.length, 0);
  if (indexEnd <= indexStart) return newStr;
  if (indexStart >= str.length) return newStr;
  if (indexStart < 0) indexStart = 0;

  for (let i = indexStart; i < indexEnd; i++) {
    newStr += str.charAt(i);
  }

  return newStr;
}

export function padStart(str, targetLength, padString) {
  if (str.length > targetLength) return str;

  if (padString === undefined) {
    for (let i = str.length; i < targetLength; i++) {
      str = "\u{0020}" + str;
    }
    return str;
  }

  let lackLength = targetLength - str.length;
  let addStr = "";

  while (lackLength !== 0) {
    for (let i = 0; i < padString.length; i++) {
      addStr += padString[i];
      lackLength--;
      if (lackLength === 0) break;
    }
  }
  str = addStr + str;
  return str;
}

export function trim(str) {
  let newStr = str.replace(/^\s+|\s+$/g, "");
  return newStr;
}
