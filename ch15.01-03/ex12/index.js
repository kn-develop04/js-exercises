/**
 * ITMedia(https://www.itmedia.co.jp/)の記事を要約してconsoleに表示する
 * ねとらぼなどの記事は要約できない(ITMedia系統の記事のみ)
 * chrome v129.0.6668.71で動作確認済み
 */
javascript: (async () => {
  const session = await ai.assistant.create();
  const target = document.querySelectorAll(".inner p");
  const newsContents = Array.from(target)
    .map((value) => value.textContent)
    .join("");
  console.log(
    `-------------------要約対象----------------------\n${newsContents}`,
  );
  const result = await session.prompt(
    `以下を要約してください。${newsContents}`,
  );
  console.log(`-------------------結果----------------------\n${result}`);
})();
