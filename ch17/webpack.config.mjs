import path from "path";

export default {
  entry: "./ex05/index.js", // エントリーポイント
  output: {
    filename: "bundle.js",
    path: path.resolve("ex05"), // 出力先
  },
  devServer: {
    static: path.join("ex05"), // 静的ファイルを提供
    compress: true,
    port: 9000, // サーバが起動するポート
    open: true,
  },
  mode: "development", // 開発モード
  devtool: "source-map", // ソースマップを生成
};
