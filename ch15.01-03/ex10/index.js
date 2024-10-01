const input = document.getElementById("editor-back");
const divBox = document.getElementById("editor-front");
document.getElementById("editor-front").style.backgroundColor =
  "rgb(255, 255, 255)";
input.addEventListener("focus", (e) => {
  document.getElementById("editor-front").style.backgroundColor =
    "rgb(192, 192, 192)";
});
input.addEventListener("blur", (e) => {
  document.getElementById("editor-front").style.backgroundColor =
    "rgb(255, 255, 255)";
});
input.addEventListener("input", (e) => {
  divBox.textContent = input.value;
});
