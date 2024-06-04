export function MatrixCalc(matrix1, matrix2, what) {
  let result = [];
  switch (what) {
    case "加算":
      for (let i = 0; i < matrix1.length; i++) {
        let row = [];
        for (let j = 0; j < matrix1[0].length; j++) {
          row.push(matrix1[i][j] + matrix2[i][j]);
        }
        result.push(row);
      }
      break;

    case "乗算":
      for (let i = 0; i < matrix1.length; i++) {
        let row = [];
        for (let j = 0; j < matrix2[0].length; j++) {
          let sum = 0;
          for (let k = 0; k < matrix2.length; k++) {
            sum += matrix1[i][k] * matrix2[k][j];
          }
          row.push(sum);
        }
        result.push(row);
      }
      break;

    default:
      return "計算できません";
  }
  return result;
}
