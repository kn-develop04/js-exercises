//テキストの結果は実現できるようにする
class Convert {
    constructor(value){
        this.value = value
    };

    valueOf() {
        if (this.value instanceof Date) {
            return this.value.getTime();
        } else {
            return this.value;
        }
    }

    toString() {
        return String(this.value);
    }
}

const obj = new Convert({ x: 1, y: 2 });
console.log(obj.toString())

const obj1 = new Convert((function (x) { false(x); }));
console.log(obj1.toString(), typeof obj1.toString());

const obj2 = new Convert(/\d+/g);
console.log(obj2.toString(), typeof obj2.toString());

const obj3 = new Convert([1,2,3]);
console.log(obj3.toString())

let d = new Date(2010, 0, 1);
const obj4 = new Convert(d);
console.log(obj4.toString(), typeof obj4.toString());
console.log(obj4.valueOf());