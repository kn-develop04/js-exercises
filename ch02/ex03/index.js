"\u30d1\u30f3" //NFC
"\u30cf\u309a\u30f3" //NFD

// ---回答はここまで、↓は確認用---
const nfcPan = "\u30d1\u30f3";
const nfdPan = "\u30cf\u309a\u30f3"; 

//NFCとNFDの比較をする
console.log(`nfc:${nfcPan},nfd:${nfdPan}`);
console.log(nfcPan === nfdPan);
console.log(nfcPan.length === nfdPan.length);

//両方NFCにする
const name1NFC = nfcPan.normalize("NFC");
const name2NFC = nfdPan.normalize("NFC");
console.log(`nfc1:${name1NFC},nfc2:${name2NFC}`);
console.log(name1NFC === name2NFC);
console.log(name1NFC.length === name2NFC.length);

//両方NFDにする
const name1NFD = nfcPan.normalize("NFD");
const name2NFD = nfdPan.normalize("NFD");
console.log(`nfd1:${name1NFD},nfd2:${name2NFD}`);
console.log(name1NFD === name2NFD);
console.log(name1NFD.length === name2NFD.length);
