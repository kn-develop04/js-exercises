// 加算
export function add(complex1, complex2) {
  const realPart = complex1.real + complex2.real;
  const imaginaryPart = complex1.imaginary + complex2.imaginary;
  return { real: realPart, imaginary: imaginaryPart };
}

// 減算
export function sub(complex1, complex2) {
  const realPart = complex1.real - complex2.real;
  const imaginaryPart = complex1.imaginary - complex2.imaginary;
  return { real: realPart, imaginary: imaginaryPart };
}

// 乗算
export function mul(complex1, complex2) {
  const realPart =
    complex1.real * complex2.real - complex1.imaginary * complex2.imaginary;
  const imaginaryPart =
    complex1.real * complex2.imaginary + complex1.imaginary * complex2.real;
  return { real: realPart, imaginary: imaginaryPart };
}

// 除算
export function div(complex1, complex2) {
  const denominator =
    complex2.real * complex2.real + complex2.imaginary * complex2.imaginary;
  const realPart =
    (complex1.real * complex2.real + complex1.imaginary * complex2.imaginary) /
    denominator;
  const imaginaryPart =
    (complex1.imaginary * complex2.real - complex1.real * complex2.imaginary) /
    denominator;
  return { real: realPart, imaginary: imaginaryPart };
}
