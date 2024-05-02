export function parse(str) {
  try {
    const json = JSON.parse(str);
    return { success: true, data: json };
  } catch (e) {
    return { success: false, error: e.message };
  }
}
console.log(parse('{"count":1,"fruit":undefined}'));
