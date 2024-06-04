export const PolarCoordinate = {
  r: 0,
  theta: 0,
  //x,yはゲッター、セッターメソッド名になるので、内部の変数x,yには_を付ける
  _x: 0,
  _y: 0,

  set x(value) {
    if (isNaN(value)) {
      throw new Error("xがNaN");
    }
    this._x = value;
    this.r = Math.sqrt(this._x * this._x + this._y * this._y);
    this.theta = Math.atan2(this._y, this._x);
  },

  get x() {
    return this._x;
  },

  set y(value) {
    if (isNaN(value)) {
      throw new Error("yがNaN");
    }
    this._y = value;
    this.r = Math.sqrt(this._x * this._x + this._y * this._y);
    this.theta = Math.atan2(this._y, this._x);
  },

  get y() {
    return this._y;
  },
};
