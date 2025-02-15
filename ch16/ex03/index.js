import crypto from "crypto";
import { Buffer } from "buffer";
import fs from "fs";

// 鍵を生成する
function generateKey() {
  // 32バイトの暗号論的疑似乱数を生成する
  return crypto.randomBytes(32); // AES-256用に32バイトのキーを生成
}

// 平文を鍵とAES-256-CBCで暗号化する。次に、暗号文と初期化ベクトル(IV)を、Base64エンコードして返す。
function encrypt64(text, key) {
  // 16バイトの暗号論的疑似乱数を初期化ベクトル (IV) とする
  const iv = crypto.randomBytes(16);

  // 暗号化
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");

  // 暗号文とIVをbase64で返す
  return {
    value: encrypted,
    iv: iv.toString("base64"),
  };
}

// generateKeyの返り値を、JSON形式でファイルに保存する(非同期)
async function writeKey(key) {
  // fs.promisesで鍵を保存
  await fs.promises.writeFile(
    "key.json",
    JSON.stringify({ key: key.toString("base64") }),
  );
}

// encrypt64の返り値を、JSON形式でファイルに保存する(非同期)
async function writeEncrypt64(data) {
  // fs.promisesで暗号データを保存
  await fs.promises.writeFile("encryptedData.json", JSON.stringify(data));
}

async function readKey() {
  // ファイルから鍵を読み込んで返す
  const keyData = await fs.promises.readFile("key.json", "utf8");
  const parsedKeyData = JSON.parse(keyData);
  return Buffer.from(parsedKeyData.key, "base64");
}

// ファイルから暗号データを読み込む (非同期)
async function readEncrypt64() {
  // ファイルから暗号データを読み込んで返す
  const encryptedData = await fs.promises.readFile(
    "encryptedData.json",
    "utf8",
  );
  return JSON.parse(encryptedData);
}

// 復号して平文を返す
function decrypt64(data, key) {
  const iv = Buffer.from(data.iv, "base64");
  const encryptedText = data.value;

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedText, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

// 指定の平文を暗号化とBase64エンコードし、後に復号する一連の処理
(async () => {
  // 平文
  const text = "Hello, World!";

  // 暗号化とBase64エンコード
  const key = generateKey();
  const encryptedData = encrypt64(text, key);

  // 鍵と暗号データをJSONで保存
  await writeKey(key);
  await writeEncrypt64(encryptedData);

  console.log("Encrypted Text (Base64):", encryptedData.value);

  // Base64デコードと復号
  const storedKey = await readKey();
  const storedEncryptedData = await readEncrypt64();
  const decryptedText = decrypt64(storedEncryptedData, storedKey);

  console.log("Decrypted Text:", decryptedText);
})();
