export function isEmailAddress(str) {
  if (
    typeof str !== "string" ||
    str.length > 254 ||
    str.split("@")[0].length > 64
  ) {
    return false;
  }

  // 正規表現でメールの形式をチェック
  const pattern = "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+";
  const emailRegex = new RegExp(
    `^${pattern}(\\.${pattern})*@${pattern}(\\.${pattern})*$`,
  );

  return emailRegex.test(str);
}
