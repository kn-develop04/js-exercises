// 戦士クラス
export class Warrior {
  constructor(atk) {
    this.atk = atk;
  }

  attack() {
    return this.atk * 2;
  }
}

// 魔法戦士クラス
export class MagicWarrior extends Warrior {
  constructor(atk, mgc) {
    super(atk);
    this.mgc = mgc;
  }

  attack() {
    return super.attack() + this.mgc;
  }
}

// 戦士（prototye）
export function Warrior2(atk) {
  this.atk = atk;
}

Warrior2.prototype.attack = function () {
  return this.atk * 2;
};

// 魔法戦士（prototye）
export function MagicWarrior2(atk, mgc) {
  this.atk = atk;
  this.mgc = mgc;
}

MagicWarrior2.prototype = Object.create(Warrior2.prototype);
MagicWarrior2.prototype.constructor = MagicWarrior2;

MagicWarrior2.prototype.attack = function () {
  return this.atk * 2 + this.mgc;
};
