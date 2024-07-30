import test3 from "./index.js";
test3();

//名前変更を伴うインポート
import { test5 as test } from "./index.js";
test();

//再エクスポートをインポート
import { greet4 } from "./index.js";
greet4();
