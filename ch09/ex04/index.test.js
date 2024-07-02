import { Warrior, Warrior2, MagicWarrior, MagicWarrior2 } from ".";

describe("練習問題9-4のテスト", () => {
  test("戦士はatkの2倍を返す", () => {
    //クラスで作った戦士
    //atkは3
    let warrior = new Warrior(3);
    expect(warrior.attack()).toBe(6);
    //atkは6
    warrior = new Warrior(6);
    expect(warrior.attack()).toBe(12);

    //prototypeで作った戦士
    let warrior2 = new Warrior2(3);
    expect(warrior2.attack()).toBe(6);
    warrior2 = new Warrior2(6);
    expect(warrior2.attack()).toBe(12);
  });

  test("魔法戦士は戦士としてのattackの値にmgcを加算した値を返す", () => {
    //クラスで作った魔法戦士
    //戦士のatkは3(=attackは倍の6)でmgcの3を加算
    let magicWarrior = new MagicWarrior(3, 3);
    expect(magicWarrior.attack()).toBe(9);
    //戦士のatkは5(=attackは倍の10)でmgcの4を加算
    magicWarrior = new MagicWarrior(5, 4);
    expect(magicWarrior.attack()).toBe(14);

    //prototypeで作った魔法戦士
    //戦士のatkは3(=attackは倍の6)でmgcの3を加算
    let magicWarrior2 = new MagicWarrior2(3, 3);
    expect(magicWarrior2.attack()).toBe(9);
    //戦士のatkは5(=attackは倍の10)でmgcの4を加算
    magicWarrior2 = new MagicWarrior2(5, 4);
    expect(magicWarrior2.attack()).toBe(14);
  });
});
