export function littleEndianToBigEndian(input) {
  const output = new Uint32Array(input.length);

  for (let i = 0; i < input.length; i++) {
    const littleEndianValue = input[i];
    const byte1 = (littleEndianValue & 0xff) << 24;
    const byte2 = (littleEndianValue & 0xff00) << 8;
    const byte3 = (littleEndianValue & 0xff0000) >> 8;
    const byte4 = (littleEndianValue & 0xff000000) >>> 24;
    const bigEndianValue = byte1 | byte2 | byte3 | byte4;
    output[i] = bigEndianValue;
  }

  return output;
}

export function bigEndianToLittleEndian(input) {
  const output = new Uint32Array(input.length);

  for (let i = 0; i < input.length; i++) {
    const bigEndianValue = input[i];
    const byte1 = (bigEndianValue & 0xff000000) >>> 24;
    const byte2 = (bigEndianValue & 0xff0000) >> 8;
    const byte3 = (bigEndianValue & 0xff00) << 8;
    const byte4 = (bigEndianValue & 0xff) << 24;
    const littleEndianValue = byte1 | byte2 | byte3 | byte4;
    output[i] = littleEndianValue;
  }

  return output;
}
