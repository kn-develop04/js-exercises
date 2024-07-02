export class C {
  // 静的メソッド
  static method() {
    return 1;
  }

  // インスタンスメソッド
  method() {
    return 2;
  }

  // 静的なクラス
  static get C() {
    class CInner {
      // 静的メソッド
      static method() {
        return 3;
      }
      // インスタンスメソッド
      method() {
        return 4;
      }
    }
    return CInner;
  }

  get C() {
    class CInner {
      // 静的メソッド
      static method() {
        return 5;
      }
      // インスタンスメソッド
      method() {
        return 6;
      }
    }
    return CInner;
  }
}
