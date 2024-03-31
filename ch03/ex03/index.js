export function isSameValue(num1, num2) {
  const epsilon = 10e-10;
  if (Math.abs(num1 - num2) < epsilon) {
    return true;
  } else {
    return false;
  }
}
