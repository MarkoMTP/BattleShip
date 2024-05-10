export default function Ship(length, hitTimes = 0, isSunk = false) {
  return {
    length,
    hitTimes,
    isSunk,

    isHit() {
      this.hitTimes++;
      return this.hitTimes;
    },

    isItSunk() {
      if (this.hitTimes >= length) {
        this.isSunk = true;
        return this.isSunk;
      } return false;
    },

  };
}

const mojBrod = new Ship(3);

mojBrod.isHit();
mojBrod.isHit();
mojBrod.isHit();

console.log(mojBrod.hitTimes);
console.log(mojBrod.isItSunk());
