export default function Ship(length) {
  const shipParts = [];
  for (let i = 0; i < length; i++) {
    const newPart = ShipPart();
    shipParts.push(newPart);
  }

  return {
    length,
    shipParts,

    isItSunk() {
      // Check if all parts are sunk
      const allPartsSunk = this.shipParts.every((part) => part.isSunk);
      if (allPartsSunk) {
        this.isSunk = true;
        return true;
      }
      return false;
    },
  };
}

export function ShipPart() {
  return {
    hitTimes: 0,
    isSunk: false,

    isHit() {
      if (!this.isSunk) {
        this.hitTimes++;
        this.isSunk = true; // Assume the part is considered sunk after one hit
        return 'hit';
      }
      return 'already sunk';
    },
  };
}
