export function detectFileType(buffer) {
  const bytes = new Uint8Array(buffer);

  const fileTypes = [
    { pattern: [0x25, 0x50, 0x44, 0x46], type: "PDF" },
    { pattern: [0x50, 0x4b], type: "ZIP" },
    { pattern: [0x47, 0x49, 0x46, 0x38], type: "GIF" },
    { pattern: [0x89, 0x50, 0x4e, 0x47], type: "PNG" },
  ];

  // 先頭の4バイトを取得
  const header = bytes.slice(0, 4);

  // マジックバイトのパターンと比較
  for (const { pattern, type } of fileTypes) {
    let match = true;
    for (let i = 0; i < pattern.length; i++) {
      if (header[i] !== pattern[i]) {
        match = false;
        break;
      }
    }
    if (match) {
      return type;
    }
  }

  return "UNKNOWN";
}
