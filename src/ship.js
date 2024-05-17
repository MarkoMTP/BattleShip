export default function Ship(length, hitTimes = 0, isSunk = false) {
  const shipParts = [];
  for (let i = 0; i < length; i++) {
    const newPart = new ShipPart();
    shipParts.push(newPart);
  }

  return {
    length,
    hitTimes,
    isSunk,
    shipParts,

    isItSunk() {
      this.shipParts.forEach((part) => {
        if (part.isSunk) {
          this.hitTimes++;
        }
      });
      if (this.hitTimes >= length) {
        return true;
      } return false;
    },
  };
}

export function ShipPart(hitTimes = 0, isSunk = false) {
  return {
    hitTimes,
    isSunk,

    isHit() {
      this.hitTimes++;
      this.isSunk = true;
      return isSunk;
    },

  };
}
