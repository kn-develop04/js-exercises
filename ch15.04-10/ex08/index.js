(function updateClock() {
  let now = new Date();
  let sec = now.getSeconds();
  let min = now.getMinutes();
  let hour = (now.getHours() % 12) + min / 60;
  let minangle = min * 6;
  let hourangle = hour * 30;

  let secangle = sec * 6;
  let minhand = document.querySelector("#clock .minutehand");
  let hourhand = document.querySelector("#clock .hourhand");

  // 秒針、分針、時針のSVG要素を取得
  let clock = document.querySelector("#clock");
  // 秒針が存在しない場合、動的に作成して追加
  let sechand = document.querySelector("#clock .secondhand");
  if (!sechand) {
    sechand = document.createElementNS("http://www.w3.org/2000/svg", "line"); // SVGのline要素を作成
    sechand.setAttribute("class", "secondhand"); // クラスを設定
    sechand.setAttribute("x1", "50");
    sechand.setAttribute("y1", "50");
    sechand.setAttribute("x2", "50");
    sechand.setAttribute("y2", "10");
    clock.appendChild(sechand); // #clockに追加
  }

  sechand.setAttribute("transform", `rotate(${secangle}, 50, 50)`);
  minhand.setAttribute("transform", `rotate(${minangle},50,50)`);
  hourhand.setAttribute("transform", `rotate(${hourangle},50,50)`);

  setTimeout(updateClock, 1000);
})();
