const data = [
  { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
  { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
  { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
  { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
  { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
  { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
  { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
  { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
  { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

//mathの全員の合計点
let sumMath = 0;
data.map((data) => {
  sumMath += data.math;
});
console.log(sumMath); //530

//クラスAのchemistryの平均点
let sumChemistry = 0;
let count = 0;
data.map((data) => {
  if (data.class === "A") {
    sumChemistry += data.chemistry;
    count++;
  }
});
const aveChemistry = sumChemistry / count;
console.log(aveChemistry); //45

//3科目合計点のクラスC内での平均点
let sumGeo = 0;
sumMath = 0;
sumChemistry = 0;
count = 0;
data.map((data) => {
  if (data.class === "C") {
    sumMath += data.math;
    sumChemistry += data.chemistry;
    sumGeo += data.geography;
    count++;
  }
});
const aveClassC = (sumMath + sumChemistry + sumGeo) / count;
console.log(aveClassC); //176.6666・・・

//3科目合計点が最も高い人のname
let max = 0;
let maxName = "";

count = 0;
data.map((data) => {
  sumGeo = 0;
  sumMath = 0;
  sumChemistry = 0;
  sumMath += data.math;
  sumChemistry += data.chemistry;
  sumGeo += data.geography;
  let sum = sumMath + sumChemistry + sumGeo;
  count++;
  if (max < sum) {
    max = sum;
    maxName = data.name;
  }
  sum = 0;
});
console.log(maxName); //Frank

// 全体のgeographyの標準偏差
const values = data.map((item) => item.geography);
// 平均値を計算
const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
// 各値から平均値を引いた差の二乗の合計を計算
const squaredDifferencesSum = values.reduce(
  (acc, val) => acc + Math.pow(val - mean, 2),
  0,
);
// 平均値の差の二乗の平均を計算
const variance = squaredDifferencesSum / values.length;
// 標準偏差を計算して返す
const standardDeviation = Math.sqrt(variance);
console.log(standardDeviation); //22.3330569358242
