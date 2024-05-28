/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/displayBoard.js":
/*!*****************************!*\
  !*** ./src/displayBoard.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ displayBoard),
/* harmony export */   displayBoardComp: () => (/* binding */ displayBoardComp)
/* harmony export */ });
/* harmony import */ var _styles_interface_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/interface.css */ "./src/styles/interface.css");

function displayBoard(board, divCont) {
  // Clear any previous board cells
  divCont.innerHTML = '';
  // Iterate through the board and create cell elements
  board.forEach(function (row, rowIndex) {
    var rowDiv = document.createElement('div');
    row.forEach(function (col, colIndex) {
      var cell = document.createElement('div');
      if (col.hasShipPart) {
        cell.classList.add('cellHasShip');
      }
      if (col.hasBlock) {
        cell.classList.add('hasBlock');
      }

      // cell.addEventListener('click', () => {
      //   handleCellClick(board, rowIndex, colIndex, cell);
      // });
      cell.classList.add('cell');
      cell.dataset.row = rowIndex;
      cell.dataset.col = colIndex;
      rowDiv.appendChild(cell);
      divCont.appendChild(rowDiv);
    });
  });
}
function displayBoardComp(board, divCont) {
  // Clear any previous board cells
  divCont.innerHTML = '';
  // Iterate through the board and create cell elements
  board.forEach(function (row, rowIndex) {
    var rowDiv = document.createElement('div');
    row.forEach(function (col, colIndex) {
      var cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = rowIndex;
      cell.dataset.col = colIndex;
      rowDiv.appendChild(cell);
      divCont.appendChild(rowDiv);
    });
  });
}

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");

function Gameboard() {
  var board = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var ships = [];
  // Step 1: Create the Board
  for (var row = 0; row < 10; row++) {
    var rowArray = [];
    for (var col = 0; col < 10; col++) {
      var cell = {
        row: row,
        col: col,
        object: null,
        hasShipPart: false,
        wasHit: false,
        hasBlock: false
      };
      rowArray.push(cell);
    }
    board.push(rowArray);
  }

  // Step 2: Return the Board
  return {
    board: board,
    ships: ships,
    placeShipVertically: function placeShipVertically(a, b, length) {
      var board = this.board;

      // Check if placement is within bounds
      if (b + length > 10) return 'Out Of Bounds';

      // Check if the area is free from other ships and blocks
      for (var i = 0; i < length; i++) {
        if (board[a][b + i].hasShipPart || a > 0 && board[a - 1][b + i].hasShipPart || a < 9 && board[a + 1][b + i].hasShipPart || board[a][b + i].hasBlock || a > 0 && board[a - 1][b + i].hasBlock || a < 9 && board[a + 1][b + i].hasBlock) {
          return 'Too Close';
        }
      }

      // Check the cells before the start and after the end of the ship
      if (b > 0 && (board[a][b - 1].hasShipPart || board[a][b - 1].hasBlock) || b + length < 10 && (board[a][b + length].hasShipPart || board[a][b + length].hasBlock) || b > 0 && a > 0 && (board[a - 1][b - 1].hasShipPart || board[a - 1][b - 1].hasBlock) || a > 0 && b + length < 10 && (board[a - 1][b + length].hasShipPart || board[a - 1][b + length].hasBlock) || b > 0 && a < 9 && (board[a + 1][b - 1].hasShipPart || board[a + 1][b - 1].hasBlock) || a < 9 && b + length < 10 && (board[a + 1][b + length].hasShipPart || board[a + 1][b + length].hasBlock)) {
        return 'Too Close';
      }
      var ship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](length);
      this.ships.push(ship);

      // Place the ship parts
      for (var _i = 0; _i < length; _i++) {
        board[a][b + _i].hasShipPart = true;
        board[a][b + _i].object = ship.shipParts[_i];
        if (a > 0) {
          board[a - 1][b + _i].hasBlock = true;
        }
        if (a < 9) {
          board[a + 1][b + _i].hasBlock = true;
        }
      }

      // Block the cells before and after the ship
      if (b > 0) {
        board[a][b - 1].hasBlock = true;
        if (a > 0) board[a - 1][b - 1].hasBlock = true;
        if (a < 9) board[a + 1][b - 1].hasBlock = true;
      }
      if (b + length < 10) {
        board[a][b + length].hasBlock = true;
        if (a > 0) board[a - 1][b + length].hasBlock = true;
        if (a < 9) board[a + 1][b + length].hasBlock = true;
      }
      return board;
    },
    placeShipHorizontally: function placeShipHorizontally(a, b, length) {
      var board = this.board;

      // Check if placement is within bounds and cells are available
      if (a + length > 10) return 'Out Of Bounds';

      // Check if the area is free from other ships and blocks
      for (var i = 0; i < length; i++) {
        if (board[a + i][b].hasShipPart || b > 0 && board[a + i][b - 1].hasShipPart || b < 9 && board[a + i][b + 1].hasShipPart || board[a + i][b].hasBlock || b > 0 && board[a + i][b - 1].hasBlock || b < 9 && board[a + i][b + 1].hasBlock) {
          return 'Too Close';
        }
      }

      // Check the cells before the start and after the end of the ship
      if (a > 0 && (board[a - 1][b].hasShipPart || board[a - 1][b].hasBlock) || a + length < 10 && (board[a + length][b].hasShipPart || board[a + length][b].hasBlock) || a > 0 && b > 0 && (board[a - 1][b - 1].hasShipPart || board[a - 1][b - 1].hasBlock) || a > 0 && b < 9 && (board[a - 1][b + 1].hasShipPart || board[a - 1][b + 1].hasBlock) || a + length < 10 && b > 0 && (board[a + length][b - 1].hasShipPart || board[a + length][b - 1].hasBlock) || a + length < 10 && b < 9 && (board[a + length][b + 1].hasShipPart || board[a + length][b + 1].hasBlock)) {
        return 'Too Close';
      }
      var ship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](length);
      this.ships.push(ship);

      // Place the ship parts
      for (var _i2 = 0; _i2 < length; _i2++) {
        board[a + _i2][b].hasShipPart = true;
        board[a + _i2][b].object = ship.shipParts[_i2];
        if (b > 0) {
          board[a + _i2][b - 1].hasBlock = true;
        }
        if (b < 9) {
          board[a + _i2][b + 1].hasBlock = true;
        }
      }

      // Block the cells before and after the ship
      if (a > 0) {
        board[a - 1][b].hasBlock = true;
        if (b > 0) board[a - 1][b - 1].hasBlock = true;
        if (b < 9) board[a - 1][b + 1].hasBlock = true;
      }
      if (a + length < 10) {
        board[a + length][b].hasBlock = true;
        if (b > 0) board[a + length][b - 1].hasBlock = true;
        if (b < 9) board[a + length][b + 1].hasBlock = true;
      }
      return board;
    },
    receiveAttack: function receiveAttack(a, b) {
      var board = this.board;
      var cell = board[a][b];
      if (cell.wasHit) return 'already hit';
      cell.wasHit = true;
      if (cell.hasShipPart) {
        cell.object.isHit();
        return cell;
      }
      return cell;
    },
    isAllSunk: function isAllSunk() {
      return this.ships.every(function (ship) {
        return ship.isItSunk();
      });
    }
  };
}

/***/ }),

/***/ "./src/interface.js":
/*!**************************!*\
  !*** ./src/interface.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ displayGame)
/* harmony export */ });
/* harmony import */ var _displayBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayBoard */ "./src/displayBoard.js");
/* harmony import */ var _styles_interface_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/interface.css */ "./src/styles/interface.css");
/* harmony import */ var _randomGame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./randomGame */ "./src/randomGame.js");



function displayGame() {
  var game = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var container = document.getElementById('container');

  // Clear previous content and remove event listeners to avoid memory leaks
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  var playerBoard = game.player.gameboard.board;
  var computerBoard = game.computer.gameboard.board;

  // Reset button
  var resetBtn = document.createElement('button');
  resetBtn.classList.add('resetBtn');
  resetBtn.textContent = 'Reset Game';
  resetBtn.addEventListener('click', function () {
    console.log('Resetting game');
    container.innerHTML = '';
    displayGame((0,_randomGame__WEBPACK_IMPORTED_MODULE_2__["default"])());
  });

  // Titles
  var playerBoardTitle = document.createElement('h1');
  playerBoardTitle.textContent = 'Player Board';
  playerBoardTitle.classList.add('playerTitle');
  var CompBoardTitle = document.createElement('h1');
  CompBoardTitle.textContent = 'Computer Board';
  CompBoardTitle.classList.add('computerTitle');

  // Boards
  var playerBoardDiv = document.createElement('div');
  playerBoardDiv.classList.add('boardPlayer');
  var computerBoardDiv = document.createElement('div');
  computerBoardDiv.classList.add('boardComputer');

  // Place boards inside div
  (0,_displayBoard__WEBPACK_IMPORTED_MODULE_0__["default"])(playerBoard, playerBoardDiv);
  (0,_displayBoard__WEBPACK_IMPORTED_MODULE_0__["default"])(computerBoard, computerBoardDiv);

  // Div to put them both in
  var divPlayer = document.createElement('div');
  divPlayer.appendChild(playerBoardTitle);
  divPlayer.appendChild(playerBoardDiv);
  var compDiv = document.createElement('div');
  compDiv.appendChild(CompBoardTitle);
  compDiv.appendChild(computerBoardDiv);
  container.appendChild(divPlayer);
  container.appendChild(resetBtn);
  container.appendChild(compDiv);
  console.log('Game displayed');
}

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Computer: () => (/* binding */ Computer),
/* harmony export */   "default": () => (/* binding */ realPlayer)
/* harmony export */ });
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");

function realPlayer(name) {
  var gameboard = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  return {
    gameboard: gameboard,
    name: name
  };
}
function Computer() {
  var gameboard = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  return {
    gameboard: gameboard,
    name: 'Computer'
  };
}

/***/ }),

/***/ "./src/randomGame.js":
/*!***************************!*\
  !*** ./src/randomGame.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ randomGame)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomizeFunc(func1, func2) {
  return Math.random() < 0.5 ? func1 : func2;
}
function placeShips(gameboard, shipSizes) {
  var _iterator = _createForOfIteratorHelper(shipSizes),
    _step;
  try {
    var _loop = function _loop() {
      var size = _step.value;
      var placed = false;
      var _loop2 = function _loop2() {
        var a = getRandomInt(0, 9);
        var b = getRandomInt(0, 9);
        var placementFunction = randomizeFunc(function () {
          return gameboard.placeShipVertically(a, b, size);
        }, function () {
          return gameboard.placeShipHorizontally(a, b, size);
        });
        var result = placementFunction();
        if (result !== 'Out Of Bounds' && result !== 'Too Close') {
          placed = true;
        }
      };
      while (!placed) {
        _loop2();
      }
    };
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
function randomGame() {
  var computer = new _player__WEBPACK_IMPORTED_MODULE_0__.Computer();
  var player = new _player__WEBPACK_IMPORTED_MODULE_0__["default"]('Marko');
  var shipSizes = [6, 5, 4, 3, 2, 1];
  placeShips(computer.gameboard, shipSizes);
  placeShips(player.gameboard, shipSizes);
  return {
    computer: computer,
    player: player
  };
}

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShipPart: () => (/* binding */ ShipPart),
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
function Ship(length) {
  var shipParts = [];
  for (var i = 0; i < length; i++) {
    var newPart = ShipPart();
    shipParts.push(newPart);
  }
  return {
    length: length,
    shipParts: shipParts,
    isItSunk: function isItSunk() {
      // Check if all parts are sunk
      var allPartsSunk = this.shipParts.every(function (part) {
        return part.isSunk;
      });
      if (allPartsSunk) {
        this.isSunk = true;
        return true;
      }
      return false;
    }
  };
}
function ShipPart() {
  return {
    hitTimes: 0,
    isSunk: false,
    isHit: function isHit() {
      if (!this.isSunk) {
        this.hitTimes++;
        this.isSunk = true; // Assume the part is considered sunk after one hit
        return 'hit';
      }
      return 'already sunk';
    }
  };
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/interface.css":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/interface.css ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* div {
  border: 1px black solid;
} */
body {
  margin: 0; /* Remove default margin */
  background-color: rgb(191, 239, 239);
  text-align: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden; /* Prevent scrolling */
}

#title {
  color: rgb(0, 0, 0);
}

#container {
  display: flex;
  justify-content: space-around;
}

.boardPlayer {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  gap: 2px; /* Adjust the gap between cells */
  margin: 0; /* Ensure no default margin */
  padding: 0; /* Ensure no default padding */
  width: fit-content;
}

.cell {
  width: 40px;
  height: 40px;
  border: 1px solid #000;
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
  margin: 0; /* Ensure no default margin */
  padding: 0; /* Ensure no default padding */
}

.cellHasShip {
  background-color: rgb(4, 0, 255);
  width: 40px;
  height: 40px;
  border: 1px solid #000;
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
  margin: 0; /* Ensure no default margin */
  padding: 0;
}
.cell:hover {
  background-color: red;
  cursor: pointer;
}

.boardComputer {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  gap: 2px; /* Adjust the gap between cells */
  margin: 0; /* Ensure no default margin */
  padding: 0; /* Ensure no default padding */
  width: fit-content;
}

.playGameBtn {
  margin-top: 5rem;
  width: 20rem;
  height: 10rem;
  font-size: 3rem;
  cursor: pointer;
}

.hasBlock {
  background-color: rgb(242, 214, 219);
}

.resetBtn {
  width: 10rem;
  height: 5rem;
  font-size: 1.8rem;
  cursor: pointer;
}
`, "",{"version":3,"sources":["webpack://./src/styles/interface.css"],"names":[],"mappings":"AAAA;;GAEG;AACH;EACE,SAAS,EAAE,0BAA0B;EACrC,oCAAoC;EACpC,kBAAkB;EAClB,aAAa;EACb,YAAY;EACZ,gBAAgB,EAAE,sBAAsB;AAC1C;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,6BAA6B;AAC/B;;AAEA;EACE,aAAa;EACb,sCAAsC;EACtC,mCAAmC;EACnC,QAAQ,EAAE,iCAAiC;EAC3C,SAAS,EAAE,6BAA6B;EACxC,UAAU,EAAE,8BAA8B;EAC1C,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,sBAAsB;EACtB,sBAAsB,EAAE,uEAAuE;EAC/F,SAAS,EAAE,6BAA6B;EACxC,UAAU,EAAE,8BAA8B;AAC5C;;AAEA;EACE,gCAAgC;EAChC,WAAW;EACX,YAAY;EACZ,sBAAsB;EACtB,sBAAsB,EAAE,uEAAuE;EAC/F,SAAS,EAAE,6BAA6B;EACxC,UAAU;AACZ;AACA;EACE,qBAAqB;EACrB,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,sCAAsC;EACtC,mCAAmC;EACnC,QAAQ,EAAE,iCAAiC;EAC3C,SAAS,EAAE,6BAA6B;EACxC,UAAU,EAAE,8BAA8B;EAC1C,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,YAAY;EACZ,aAAa;EACb,eAAe;EACf,eAAe;AACjB;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,iBAAiB;EACjB,eAAe;AACjB","sourcesContent":["/* div {\n  border: 1px black solid;\n} */\nbody {\n  margin: 0; /* Remove default margin */\n  background-color: rgb(191, 239, 239);\n  text-align: center;\n  height: 100vh;\n  width: 100vw;\n  overflow: hidden; /* Prevent scrolling */\n}\n\n#title {\n  color: rgb(0, 0, 0);\n}\n\n#container {\n  display: flex;\n  justify-content: space-around;\n}\n\n.boardPlayer {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n  gap: 2px; /* Adjust the gap between cells */\n  margin: 0; /* Ensure no default margin */\n  padding: 0; /* Ensure no default padding */\n  width: fit-content;\n}\n\n.cell {\n  width: 40px;\n  height: 40px;\n  border: 1px solid #000;\n  box-sizing: border-box; /* Include padding and border in the element's total width and height */\n  margin: 0; /* Ensure no default margin */\n  padding: 0; /* Ensure no default padding */\n}\n\n.cellHasShip {\n  background-color: rgb(4, 0, 255);\n  width: 40px;\n  height: 40px;\n  border: 1px solid #000;\n  box-sizing: border-box; /* Include padding and border in the element's total width and height */\n  margin: 0; /* Ensure no default margin */\n  padding: 0;\n}\n.cell:hover {\n  background-color: red;\n  cursor: pointer;\n}\n\n.boardComputer {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n  gap: 2px; /* Adjust the gap between cells */\n  margin: 0; /* Ensure no default margin */\n  padding: 0; /* Ensure no default padding */\n  width: fit-content;\n}\n\n.playGameBtn {\n  margin-top: 5rem;\n  width: 20rem;\n  height: 10rem;\n  font-size: 3rem;\n  cursor: pointer;\n}\n\n.hasBlock {\n  background-color: rgb(242, 214, 219);\n}\n\n.resetBtn {\n  width: 10rem;\n  height: 5rem;\n  font-size: 1.8rem;\n  cursor: pointer;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/interface.css":
/*!**********************************!*\
  !*** ./src/styles/interface.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_interface_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./interface.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/interface.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_interface_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_interface_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_interface_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_interface_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _interface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interface */ "./src/interface.js");
/* harmony import */ var _styles_interface_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/interface.css */ "./src/styles/interface.css");
/* harmony import */ var _randomGame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./randomGame */ "./src/randomGame.js");



var container = document.getElementById('container');
var playGameBtn = document.createElement('button');
playGameBtn.classList.add('playGameBtn');
playGameBtn.textContent = 'Play Game';
playGameBtn.addEventListener('click', function () {
  container.innerHTML = '';
  (0,_interface__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_randomGame__WEBPACK_IMPORTED_MODULE_2__["default"])());
});
container.appendChild(playGameBtn);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQ3hGLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGFBQWEsQ0FBQztBQUN4Q3VGLFdBQVcsQ0FBQy9DLFdBQVcsR0FBRyxXQUFXO0FBQ3JDK0MsV0FBVyxDQUFDOUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07RUFDMUNYLFNBQVMsQ0FBQzFDLFNBQVMsR0FBRyxFQUFFO0VBRXhCd0Msc0RBQVcsQ0FBQ0QsdURBQVUsQ0FBQyxDQUFDLENBQUM7QUFDM0IsQ0FBQyxDQUFDO0FBRUZHLFNBQVMsQ0FBQzNCLFdBQVcsQ0FBQ29GLFdBQVcsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kaXNwbGF5Qm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9yYW5kb21HYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9pbnRlcmZhY2UuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9pbnRlcmZhY2UuY3NzPzZmYWMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9zdHlsZXMvaW50ZXJmYWNlLmNzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpc3BsYXlCb2FyZChib2FyZCwgZGl2Q29udCkge1xuICAvLyBDbGVhciBhbnkgcHJldmlvdXMgYm9hcmQgY2VsbHNcbiAgZGl2Q29udC5pbm5lckhUTUwgPSAnJztcbiAgLy8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBib2FyZCBhbmQgY3JlYXRlIGNlbGwgZWxlbWVudHNcbiAgYm9hcmQuZm9yRWFjaCgocm93LCByb3dJbmRleCkgPT4ge1xuICAgIGNvbnN0IHJvd0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJvdy5mb3JFYWNoKChjb2wsIGNvbEluZGV4KSA9PiB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgIGlmIChjb2wuaGFzU2hpcFBhcnQpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsSGFzU2hpcCcpO1xuICAgICAgfVxuICAgICAgaWYgKGNvbC5oYXNCbG9jaykge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hhc0Jsb2NrJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAvLyAgIGhhbmRsZUNlbGxDbGljayhib2FyZCwgcm93SW5kZXgsIGNvbEluZGV4LCBjZWxsKTtcbiAgICAgIC8vIH0pO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XG4gICAgICBjZWxsLmRhdGFzZXQucm93ID0gcm93SW5kZXg7XG4gICAgICBjZWxsLmRhdGFzZXQuY29sID0gY29sSW5kZXg7XG5cbiAgICAgIHJvd0Rpdi5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgIGRpdkNvbnQuYXBwZW5kQ2hpbGQocm93RGl2KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5Qm9hcmRDb21wKGJvYXJkLCBkaXZDb250KSB7XG4gIC8vIENsZWFyIGFueSBwcmV2aW91cyBib2FyZCBjZWxsc1xuICBkaXZDb250LmlubmVySFRNTCA9ICcnO1xuICAvLyBJdGVyYXRlIHRocm91Z2ggdGhlIGJvYXJkIGFuZCBjcmVhdGUgY2VsbCBlbGVtZW50c1xuICBib2FyZC5mb3JFYWNoKChyb3csIHJvd0luZGV4KSA9PiB7XG4gICAgY29uc3Qgcm93RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcm93LmZvckVhY2goKGNvbCwgY29sSW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XG4gICAgICBjZWxsLmRhdGFzZXQucm93ID0gcm93SW5kZXg7XG4gICAgICBjZWxsLmRhdGFzZXQuY29sID0gY29sSW5kZXg7XG5cbiAgICAgIHJvd0Rpdi5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgIGRpdkNvbnQuYXBwZW5kQ2hpbGQocm93RGl2KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgU2hpcCBmcm9tICcuL3NoaXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBHYW1lYm9hcmQoYm9hcmQgPSBbXSkge1xuICBjb25zdCBzaGlwcyA9IFtdO1xuICAvLyBTdGVwIDE6IENyZWF0ZSB0aGUgQm9hcmRcbiAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdysrKSB7XG4gICAgY29uc3Qgcm93QXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCAxMDsgY29sKyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSB7XG4gICAgICAgIHJvdywgY29sLCBvYmplY3Q6IG51bGwsIGhhc1NoaXBQYXJ0OiBmYWxzZSwgd2FzSGl0OiBmYWxzZSwgaGFzQmxvY2s6IGZhbHNlLFxuICAgICAgfTtcbiAgICAgIHJvd0FycmF5LnB1c2goY2VsbCk7XG4gICAgfVxuICAgIGJvYXJkLnB1c2gocm93QXJyYXkpO1xuICB9XG5cbiAgLy8gU3RlcCAyOiBSZXR1cm4gdGhlIEJvYXJkXG4gIHJldHVybiB7XG4gICAgYm9hcmQsXG4gICAgc2hpcHMsXG5cbiAgICBwbGFjZVNoaXBWZXJ0aWNhbGx5KGEsIGIsIGxlbmd0aCkge1xuICAgICAgY29uc3QgeyBib2FyZCB9ID0gdGhpcztcblxuICAgICAgLy8gQ2hlY2sgaWYgcGxhY2VtZW50IGlzIHdpdGhpbiBib3VuZHNcbiAgICAgIGlmIChiICsgbGVuZ3RoID4gMTApIHJldHVybiAnT3V0IE9mIEJvdW5kcyc7XG5cbiAgICAgIC8vIENoZWNrIGlmIHRoZSBhcmVhIGlzIGZyZWUgZnJvbSBvdGhlciBzaGlwcyBhbmQgYmxvY2tzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBib2FyZFthXVtiICsgaV0uaGFzU2hpcFBhcnRcbiAgICAgICAgICB8fCAoYSA+IDAgJiYgYm9hcmRbYSAtIDFdW2IgKyBpXS5oYXNTaGlwUGFydClcbiAgICAgICAgICB8fCAoYSA8IDkgJiYgYm9hcmRbYSArIDFdW2IgKyBpXS5oYXNTaGlwUGFydClcbiAgICAgICAgICB8fCBib2FyZFthXVtiICsgaV0uaGFzQmxvY2tcbiAgICAgICAgICB8fCAoYSA+IDAgJiYgYm9hcmRbYSAtIDFdW2IgKyBpXS5oYXNCbG9jaylcbiAgICAgICAgICB8fCAoYSA8IDkgJiYgYm9hcmRbYSArIDFdW2IgKyBpXS5oYXNCbG9jaylcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuICdUb28gQ2xvc2UnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIENoZWNrIHRoZSBjZWxscyBiZWZvcmUgdGhlIHN0YXJ0IGFuZCBhZnRlciB0aGUgZW5kIG9mIHRoZSBzaGlwXG4gICAgICBpZiAoXG4gICAgICAgIChiID4gMCAmJiAoYm9hcmRbYV1bYiAtIDFdLmhhc1NoaXBQYXJ0IHx8IGJvYXJkW2FdW2IgLSAxXS5oYXNCbG9jaykpXG4gICAgICAgIHx8IChiICsgbGVuZ3RoIDwgMTAgJiYgKGJvYXJkW2FdW2IgKyBsZW5ndGhdLmhhc1NoaXBQYXJ0IHx8IGJvYXJkW2FdW2IgKyBsZW5ndGhdLmhhc0Jsb2NrKSlcbiAgICAgICAgfHwgKGIgPiAwICYmIGEgPiAwICYmIChib2FyZFthIC0gMV1bYiAtIDFdLmhhc1NoaXBQYXJ0IHx8IGJvYXJkW2EgLSAxXVtiIC0gMV0uaGFzQmxvY2spKVxuICAgICAgICB8fCAoYSA+IDAgJiYgYiArIGxlbmd0aCA8IDEwICYmIChib2FyZFthIC0gMV1bYiArIGxlbmd0aF0uaGFzU2hpcFBhcnQgfHwgYm9hcmRbYSAtIDFdW2IgKyBsZW5ndGhdLmhhc0Jsb2NrKSlcbiAgICAgICAgfHwgKGIgPiAwICYmIGEgPCA5ICYmIChib2FyZFthICsgMV1bYiAtIDFdLmhhc1NoaXBQYXJ0IHx8IGJvYXJkW2EgKyAxXVtiIC0gMV0uaGFzQmxvY2spKVxuICAgICAgICB8fCAoYSA8IDkgJiYgYiArIGxlbmd0aCA8IDEwICYmIChib2FyZFthICsgMV1bYiArIGxlbmd0aF0uaGFzU2hpcFBhcnQgfHwgYm9hcmRbYSArIDFdW2IgKyBsZW5ndGhdLmhhc0Jsb2NrKSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gJ1RvbyBDbG9zZSc7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChsZW5ndGgpO1xuICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuXG4gICAgICAvLyBQbGFjZSB0aGUgc2hpcCBwYXJ0c1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBib2FyZFthXVtiICsgaV0uaGFzU2hpcFBhcnQgPSB0cnVlO1xuICAgICAgICBib2FyZFthXVtiICsgaV0ub2JqZWN0ID0gc2hpcC5zaGlwUGFydHNbaV07XG5cbiAgICAgICAgaWYgKGEgPiAwKSB7XG4gICAgICAgICAgYm9hcmRbYSAtIDFdW2IgKyBpXS5oYXNCbG9jayA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYSA8IDkpIHtcbiAgICAgICAgICBib2FyZFthICsgMV1bYiArIGldLmhhc0Jsb2NrID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBCbG9jayB0aGUgY2VsbHMgYmVmb3JlIGFuZCBhZnRlciB0aGUgc2hpcFxuICAgICAgaWYgKGIgPiAwKSB7XG4gICAgICAgIGJvYXJkW2FdW2IgLSAxXS5oYXNCbG9jayA9IHRydWU7XG4gICAgICAgIGlmIChhID4gMCkgYm9hcmRbYSAtIDFdW2IgLSAxXS5oYXNCbG9jayA9IHRydWU7XG4gICAgICAgIGlmIChhIDwgOSkgYm9hcmRbYSArIDFdW2IgLSAxXS5oYXNCbG9jayA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoYiArIGxlbmd0aCA8IDEwKSB7XG4gICAgICAgIGJvYXJkW2FdW2IgKyBsZW5ndGhdLmhhc0Jsb2NrID0gdHJ1ZTtcbiAgICAgICAgaWYgKGEgPiAwKSBib2FyZFthIC0gMV1bYiArIGxlbmd0aF0uaGFzQmxvY2sgPSB0cnVlO1xuICAgICAgICBpZiAoYSA8IDkpIGJvYXJkW2EgKyAxXVtiICsgbGVuZ3RoXS5oYXNCbG9jayA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBib2FyZDtcbiAgICB9LFxuXG4gICAgcGxhY2VTaGlwSG9yaXpvbnRhbGx5KGEsIGIsIGxlbmd0aCkge1xuICAgICAgY29uc3QgeyBib2FyZCB9ID0gdGhpcztcblxuICAgICAgLy8gQ2hlY2sgaWYgcGxhY2VtZW50IGlzIHdpdGhpbiBib3VuZHMgYW5kIGNlbGxzIGFyZSBhdmFpbGFibGVcbiAgICAgIGlmIChhICsgbGVuZ3RoID4gMTApIHJldHVybiAnT3V0IE9mIEJvdW5kcyc7XG5cbiAgICAgIC8vIENoZWNrIGlmIHRoZSBhcmVhIGlzIGZyZWUgZnJvbSBvdGhlciBzaGlwcyBhbmQgYmxvY2tzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBib2FyZFthICsgaV1bYl0uaGFzU2hpcFBhcnRcbiAgICAgICAgICB8fCAoYiA+IDAgJiYgYm9hcmRbYSArIGldW2IgLSAxXS5oYXNTaGlwUGFydClcbiAgICAgICAgICB8fCAoYiA8IDkgJiYgYm9hcmRbYSArIGldW2IgKyAxXS5oYXNTaGlwUGFydClcbiAgICAgICAgICB8fCBib2FyZFthICsgaV1bYl0uaGFzQmxvY2tcbiAgICAgICAgICB8fCAoYiA+IDAgJiYgYm9hcmRbYSArIGldW2IgLSAxXS5oYXNCbG9jaylcbiAgICAgICAgICB8fCAoYiA8IDkgJiYgYm9hcmRbYSArIGldW2IgKyAxXS5oYXNCbG9jaylcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuICdUb28gQ2xvc2UnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIENoZWNrIHRoZSBjZWxscyBiZWZvcmUgdGhlIHN0YXJ0IGFuZCBhZnRlciB0aGUgZW5kIG9mIHRoZSBzaGlwXG4gICAgICBpZiAoXG4gICAgICAgIChhID4gMCAmJiAoYm9hcmRbYSAtIDFdW2JdLmhhc1NoaXBQYXJ0IHx8IGJvYXJkW2EgLSAxXVtiXS5oYXNCbG9jaykpXG4gICAgICAgIHx8IChhICsgbGVuZ3RoIDwgMTAgJiYgKGJvYXJkW2EgKyBsZW5ndGhdW2JdLmhhc1NoaXBQYXJ0IHx8IGJvYXJkW2EgKyBsZW5ndGhdW2JdLmhhc0Jsb2NrKSlcbiAgICAgICAgfHwgKGEgPiAwICYmIGIgPiAwICYmIChib2FyZFthIC0gMV1bYiAtIDFdLmhhc1NoaXBQYXJ0IHx8IGJvYXJkW2EgLSAxXVtiIC0gMV0uaGFzQmxvY2spKVxuICAgICAgICB8fCAoYSA+IDAgJiYgYiA8IDkgJiYgKGJvYXJkW2EgLSAxXVtiICsgMV0uaGFzU2hpcFBhcnQgfHwgYm9hcmRbYSAtIDFdW2IgKyAxXS5oYXNCbG9jaykpXG4gICAgICAgIHx8IChhICsgbGVuZ3RoIDwgMTAgJiYgYiA+IDAgJiYgKGJvYXJkW2EgKyBsZW5ndGhdW2IgLSAxXS5oYXNTaGlwUGFydCB8fCBib2FyZFthICsgbGVuZ3RoXVtiIC0gMV0uaGFzQmxvY2spKVxuICAgICAgICB8fCAoYSArIGxlbmd0aCA8IDEwICYmIGIgPCA5ICYmIChib2FyZFthICsgbGVuZ3RoXVtiICsgMV0uaGFzU2hpcFBhcnQgfHwgYm9hcmRbYSArIGxlbmd0aF1bYiArIDFdLmhhc0Jsb2NrKSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gJ1RvbyBDbG9zZSc7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChsZW5ndGgpO1xuICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuXG4gICAgICAvLyBQbGFjZSB0aGUgc2hpcCBwYXJ0c1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBib2FyZFthICsgaV1bYl0uaGFzU2hpcFBhcnQgPSB0cnVlO1xuICAgICAgICBib2FyZFthICsgaV1bYl0ub2JqZWN0ID0gc2hpcC5zaGlwUGFydHNbaV07XG5cbiAgICAgICAgaWYgKGIgPiAwKSB7XG4gICAgICAgICAgYm9hcmRbYSArIGldW2IgLSAxXS5oYXNCbG9jayA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGIgPCA5KSB7XG4gICAgICAgICAgYm9hcmRbYSArIGldW2IgKyAxXS5oYXNCbG9jayA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQmxvY2sgdGhlIGNlbGxzIGJlZm9yZSBhbmQgYWZ0ZXIgdGhlIHNoaXBcbiAgICAgIGlmIChhID4gMCkge1xuICAgICAgICBib2FyZFthIC0gMV1bYl0uaGFzQmxvY2sgPSB0cnVlO1xuICAgICAgICBpZiAoYiA+IDApIGJvYXJkW2EgLSAxXVtiIC0gMV0uaGFzQmxvY2sgPSB0cnVlO1xuICAgICAgICBpZiAoYiA8IDkpIGJvYXJkW2EgLSAxXVtiICsgMV0uaGFzQmxvY2sgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKGEgKyBsZW5ndGggPCAxMCkge1xuICAgICAgICBib2FyZFthICsgbGVuZ3RoXVtiXS5oYXNCbG9jayA9IHRydWU7XG4gICAgICAgIGlmIChiID4gMCkgYm9hcmRbYSArIGxlbmd0aF1bYiAtIDFdLmhhc0Jsb2NrID0gdHJ1ZTtcbiAgICAgICAgaWYgKGIgPCA5KSBib2FyZFthICsgbGVuZ3RoXVtiICsgMV0uaGFzQmxvY2sgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYm9hcmQ7XG4gICAgfSxcblxuICAgIHJlY2VpdmVBdHRhY2soYSwgYikge1xuICAgICAgY29uc3QgeyBib2FyZCB9ID0gdGhpcztcbiAgICAgIGNvbnN0IGNlbGwgPSBib2FyZFthXVtiXTtcbiAgICAgIGlmIChjZWxsLndhc0hpdCkgcmV0dXJuICdhbHJlYWR5IGhpdCc7XG5cbiAgICAgIGNlbGwud2FzSGl0ID0gdHJ1ZTtcbiAgICAgIGlmIChjZWxsLmhhc1NoaXBQYXJ0KSB7XG4gICAgICAgIGNlbGwub2JqZWN0LmlzSGl0KCk7XG4gICAgICAgIHJldHVybiBjZWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNlbGw7XG4gICAgfSxcblxuICAgIGlzQWxsU3VuaygpIHtcbiAgICAgIHJldHVybiB0aGlzLnNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzSXRTdW5rKCkpO1xuICAgIH0sXG5cbiAgfTtcbn1cbiIsImltcG9ydCBkaXNwbGF5Qm9hcmQgZnJvbSAnLi9kaXNwbGF5Qm9hcmQnO1xuaW1wb3J0ICcuL3N0eWxlcy9pbnRlcmZhY2UuY3NzJztcbmltcG9ydCByYW5kb21HYW1lIGZyb20gJy4vcmFuZG9tR2FtZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpc3BsYXlHYW1lKGdhbWUgPSAnJykge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XG5cbiAgLy8gQ2xlYXIgcHJldmlvdXMgY29udGVudCBhbmQgcmVtb3ZlIGV2ZW50IGxpc3RlbmVycyB0byBhdm9pZCBtZW1vcnkgbGVha3NcbiAgd2hpbGUgKGNvbnRhaW5lci5maXJzdENoaWxkKSB7XG4gICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKGNvbnRhaW5lci5maXJzdENoaWxkKTtcbiAgfVxuXG4gIGNvbnN0IHBsYXllckJvYXJkID0gZ2FtZS5wbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkO1xuICBjb25zdCBjb21wdXRlckJvYXJkID0gZ2FtZS5jb21wdXRlci5nYW1lYm9hcmQuYm9hcmQ7XG5cbiAgLy8gUmVzZXQgYnV0dG9uXG4gIGNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIHJlc2V0QnRuLmNsYXNzTGlzdC5hZGQoJ3Jlc2V0QnRuJyk7XG4gIHJlc2V0QnRuLnRleHRDb250ZW50ID0gJ1Jlc2V0IEdhbWUnO1xuICByZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnUmVzZXR0aW5nIGdhbWUnKTtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgZGlzcGxheUdhbWUocmFuZG9tR2FtZSgpKTtcbiAgfSk7XG5cbiAgLy8gVGl0bGVzXG4gIGNvbnN0IHBsYXllckJvYXJkVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICBwbGF5ZXJCb2FyZFRpdGxlLnRleHRDb250ZW50ID0gJ1BsYXllciBCb2FyZCc7XG4gIHBsYXllckJvYXJkVGl0bGUuY2xhc3NMaXN0LmFkZCgncGxheWVyVGl0bGUnKTtcblxuICBjb25zdCBDb21wQm9hcmRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gIENvbXBCb2FyZFRpdGxlLnRleHRDb250ZW50ID0gJ0NvbXB1dGVyIEJvYXJkJztcbiAgQ29tcEJvYXJkVGl0bGUuY2xhc3NMaXN0LmFkZCgnY29tcHV0ZXJUaXRsZScpO1xuXG4gIC8vIEJvYXJkc1xuICBjb25zdCBwbGF5ZXJCb2FyZERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwbGF5ZXJCb2FyZERpdi5jbGFzc0xpc3QuYWRkKCdib2FyZFBsYXllcicpO1xuICBjb25zdCBjb21wdXRlckJvYXJkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbXB1dGVyQm9hcmREaXYuY2xhc3NMaXN0LmFkZCgnYm9hcmRDb21wdXRlcicpO1xuXG4gIC8vIFBsYWNlIGJvYXJkcyBpbnNpZGUgZGl2XG4gIGRpc3BsYXlCb2FyZChwbGF5ZXJCb2FyZCwgcGxheWVyQm9hcmREaXYpO1xuICBkaXNwbGF5Qm9hcmQoY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJCb2FyZERpdik7XG5cbiAgLy8gRGl2IHRvIHB1dCB0aGVtIGJvdGggaW5cbiAgY29uc3QgZGl2UGxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpdlBsYXllci5hcHBlbmRDaGlsZChwbGF5ZXJCb2FyZFRpdGxlKTtcbiAgZGl2UGxheWVyLmFwcGVuZENoaWxkKHBsYXllckJvYXJkRGl2KTtcblxuICBjb25zdCBjb21wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbXBEaXYuYXBwZW5kQ2hpbGQoQ29tcEJvYXJkVGl0bGUpO1xuICBjb21wRGl2LmFwcGVuZENoaWxkKGNvbXB1dGVyQm9hcmREaXYpO1xuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXZQbGF5ZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmVzZXRCdG4pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29tcERpdik7XG5cbiAgY29uc29sZS5sb2coJ0dhbWUgZGlzcGxheWVkJyk7XG59XG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVhbFBsYXllcihuYW1lKSB7XG4gIGNvbnN0IGdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgcmV0dXJuIHtcbiAgICBnYW1lYm9hcmQsXG4gICAgbmFtZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENvbXB1dGVyKCkge1xuICBjb25zdCBnYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gIHJldHVybiB7XG4gICAgZ2FtZWJvYXJkLFxuICAgIG5hbWU6ICdDb21wdXRlcicsXG4gIH07XG59XG4iLCJpbXBvcnQgcmVhbFBsYXllciwgeyBDb21wdXRlciB9IGZyb20gJy4vcGxheWVyJztcblxuZnVuY3Rpb24gZ2V0UmFuZG9tSW50KG1pbiwgbWF4KSB7XG4gIG1pbiA9IE1hdGguY2VpbChtaW4pO1xuICBtYXggPSBNYXRoLmZsb29yKG1heCk7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xufVxuXG5mdW5jdGlvbiByYW5kb21pemVGdW5jKGZ1bmMxLCBmdW5jMikge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKSA8IDAuNSA/IGZ1bmMxIDogZnVuYzI7XG59XG5cbmZ1bmN0aW9uIHBsYWNlU2hpcHMoZ2FtZWJvYXJkLCBzaGlwU2l6ZXMpIHtcbiAgZm9yIChjb25zdCBzaXplIG9mIHNoaXBTaXplcykge1xuICAgIGxldCBwbGFjZWQgPSBmYWxzZTtcbiAgICB3aGlsZSAoIXBsYWNlZCkge1xuICAgICAgY29uc3QgYSA9IGdldFJhbmRvbUludCgwLCA5KTtcbiAgICAgIGNvbnN0IGIgPSBnZXRSYW5kb21JbnQoMCwgOSk7XG4gICAgICBjb25zdCBwbGFjZW1lbnRGdW5jdGlvbiA9IHJhbmRvbWl6ZUZ1bmMoXG4gICAgICAgICgpID0+IGdhbWVib2FyZC5wbGFjZVNoaXBWZXJ0aWNhbGx5KGEsIGIsIHNpemUpLFxuICAgICAgICAoKSA9PiBnYW1lYm9hcmQucGxhY2VTaGlwSG9yaXpvbnRhbGx5KGEsIGIsIHNpemUpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHBsYWNlbWVudEZ1bmN0aW9uKCk7XG4gICAgICBpZiAocmVzdWx0ICE9PSAnT3V0IE9mIEJvdW5kcycgJiYgcmVzdWx0ICE9PSAnVG9vIENsb3NlJykge1xuICAgICAgICBwbGFjZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5kb21HYW1lKCkge1xuICBjb25zdCBjb21wdXRlciA9IG5ldyBDb21wdXRlcigpO1xuICBjb25zdCBwbGF5ZXIgPSBuZXcgcmVhbFBsYXllcignTWFya28nKTtcblxuICBjb25zdCBzaGlwU2l6ZXMgPSBbNiwgNSwgNCwgMywgMiwgMV07XG5cbiAgcGxhY2VTaGlwcyhjb21wdXRlci5nYW1lYm9hcmQsIHNoaXBTaXplcyk7XG4gIHBsYWNlU2hpcHMocGxheWVyLmdhbWVib2FyZCwgc2hpcFNpemVzKTtcblxuICByZXR1cm4ge1xuICAgIGNvbXB1dGVyLFxuICAgIHBsYXllcixcbiAgfTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNoaXAobGVuZ3RoKSB7XG4gIGNvbnN0IHNoaXBQYXJ0cyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgbmV3UGFydCA9IFNoaXBQYXJ0KCk7XG4gICAgc2hpcFBhcnRzLnB1c2gobmV3UGFydCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGxlbmd0aCxcbiAgICBzaGlwUGFydHMsXG5cbiAgICBpc0l0U3VuaygpIHtcbiAgICAgIC8vIENoZWNrIGlmIGFsbCBwYXJ0cyBhcmUgc3Vua1xuICAgICAgY29uc3QgYWxsUGFydHNTdW5rID0gdGhpcy5zaGlwUGFydHMuZXZlcnkoKHBhcnQpID0+IHBhcnQuaXNTdW5rKTtcbiAgICAgIGlmIChhbGxQYXJ0c1N1bmspIHtcbiAgICAgICAgdGhpcy5pc1N1bmsgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gU2hpcFBhcnQoKSB7XG4gIHJldHVybiB7XG4gICAgaGl0VGltZXM6IDAsXG4gICAgaXNTdW5rOiBmYWxzZSxcblxuICAgIGlzSGl0KCkge1xuICAgICAgaWYgKCF0aGlzLmlzU3Vuaykge1xuICAgICAgICB0aGlzLmhpdFRpbWVzKys7XG4gICAgICAgIHRoaXMuaXNTdW5rID0gdHJ1ZTsgLy8gQXNzdW1lIHRoZSBwYXJ0IGlzIGNvbnNpZGVyZWQgc3VuayBhZnRlciBvbmUgaGl0XG4gICAgICAgIHJldHVybiAnaGl0JztcbiAgICAgIH1cbiAgICAgIHJldHVybiAnYWxyZWFkeSBzdW5rJztcbiAgICB9LFxuICB9O1xufVxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qIGRpdiB7XG4gIGJvcmRlcjogMXB4IGJsYWNrIHNvbGlkO1xufSAqL1xuYm9keSB7XG4gIG1hcmdpbjogMDsgLyogUmVtb3ZlIGRlZmF1bHQgbWFyZ2luICovXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxOTEsIDIzOSwgMjM5KTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBoZWlnaHQ6IDEwMHZoO1xuICB3aWR0aDogMTAwdnc7XG4gIG92ZXJmbG93OiBoaWRkZW47IC8qIFByZXZlbnQgc2Nyb2xsaW5nICovXG59XG5cbiN0aXRsZSB7XG4gIGNvbG9yOiByZ2IoMCwgMCwgMCk7XG59XG5cbiNjb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbn1cblxuLmJvYXJkUGxheWVyIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xuICBnYXA6IDJweDsgLyogQWRqdXN0IHRoZSBnYXAgYmV0d2VlbiBjZWxscyAqL1xuICBtYXJnaW46IDA7IC8qIEVuc3VyZSBubyBkZWZhdWx0IG1hcmdpbiAqL1xuICBwYWRkaW5nOiAwOyAvKiBFbnN1cmUgbm8gZGVmYXVsdCBwYWRkaW5nICovXG4gIHdpZHRoOiBmaXQtY29udGVudDtcbn1cblxuLmNlbGwge1xuICB3aWR0aDogNDBweDtcbiAgaGVpZ2h0OiA0MHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiBJbmNsdWRlIHBhZGRpbmcgYW5kIGJvcmRlciBpbiB0aGUgZWxlbWVudCdzIHRvdGFsIHdpZHRoIGFuZCBoZWlnaHQgKi9cbiAgbWFyZ2luOiAwOyAvKiBFbnN1cmUgbm8gZGVmYXVsdCBtYXJnaW4gKi9cbiAgcGFkZGluZzogMDsgLyogRW5zdXJlIG5vIGRlZmF1bHQgcGFkZGluZyAqL1xufVxuXG4uY2VsbEhhc1NoaXAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNCwgMCwgMjU1KTtcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogNDBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgIzAwMDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogSW5jbHVkZSBwYWRkaW5nIGFuZCBib3JkZXIgaW4gdGhlIGVsZW1lbnQncyB0b3RhbCB3aWR0aCBhbmQgaGVpZ2h0ICovXG4gIG1hcmdpbjogMDsgLyogRW5zdXJlIG5vIGRlZmF1bHQgbWFyZ2luICovXG4gIHBhZGRpbmc6IDA7XG59XG4uY2VsbDpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYm9hcmRDb21wdXRlciB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcbiAgZ2FwOiAycHg7IC8qIEFkanVzdCB0aGUgZ2FwIGJldHdlZW4gY2VsbHMgKi9cbiAgbWFyZ2luOiAwOyAvKiBFbnN1cmUgbm8gZGVmYXVsdCBtYXJnaW4gKi9cbiAgcGFkZGluZzogMDsgLyogRW5zdXJlIG5vIGRlZmF1bHQgcGFkZGluZyAqL1xuICB3aWR0aDogZml0LWNvbnRlbnQ7XG59XG5cbi5wbGF5R2FtZUJ0biB7XG4gIG1hcmdpbi10b3A6IDVyZW07XG4gIHdpZHRoOiAyMHJlbTtcbiAgaGVpZ2h0OiAxMHJlbTtcbiAgZm9udC1zaXplOiAzcmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5oYXNCbG9jayB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDIsIDIxNCwgMjE5KTtcbn1cblxuLnJlc2V0QnRuIHtcbiAgd2lkdGg6IDEwcmVtO1xuICBoZWlnaHQ6IDVyZW07XG4gIGZvbnQtc2l6ZTogMS44cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvaW50ZXJmYWNlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7R0FFRztBQUNIO0VBQ0UsU0FBUyxFQUFFLDBCQUEwQjtFQUNyQyxvQ0FBb0M7RUFDcEMsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixZQUFZO0VBQ1osZ0JBQWdCLEVBQUUsc0JBQXNCO0FBQzFDOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQ0FBc0M7RUFDdEMsbUNBQW1DO0VBQ25DLFFBQVEsRUFBRSxpQ0FBaUM7RUFDM0MsU0FBUyxFQUFFLDZCQUE2QjtFQUN4QyxVQUFVLEVBQUUsOEJBQThCO0VBQzFDLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osc0JBQXNCO0VBQ3RCLHNCQUFzQixFQUFFLHVFQUF1RTtFQUMvRixTQUFTLEVBQUUsNkJBQTZCO0VBQ3hDLFVBQVUsRUFBRSw4QkFBOEI7QUFDNUM7O0FBRUE7RUFDRSxnQ0FBZ0M7RUFDaEMsV0FBVztFQUNYLFlBQVk7RUFDWixzQkFBc0I7RUFDdEIsc0JBQXNCLEVBQUUsdUVBQXVFO0VBQy9GLFNBQVMsRUFBRSw2QkFBNkI7RUFDeEMsVUFBVTtBQUNaO0FBQ0E7RUFDRSxxQkFBcUI7RUFDckIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQ0FBc0M7RUFDdEMsbUNBQW1DO0VBQ25DLFFBQVEsRUFBRSxpQ0FBaUM7RUFDM0MsU0FBUyxFQUFFLDZCQUE2QjtFQUN4QyxVQUFVLEVBQUUsOEJBQThCO0VBQzFDLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osYUFBYTtFQUNiLGVBQWU7RUFDZixlQUFlO0FBQ2pCOztBQUVBO0VBQ0Usb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsZUFBZTtBQUNqQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBkaXYge1xcbiAgYm9yZGVyOiAxcHggYmxhY2sgc29saWQ7XFxufSAqL1xcbmJvZHkge1xcbiAgbWFyZ2luOiAwOyAvKiBSZW1vdmUgZGVmYXVsdCBtYXJnaW4gKi9cXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxOTEsIDIzOSwgMjM5KTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGhlaWdodDogMTAwdmg7XFxuICB3aWR0aDogMTAwdnc7XFxuICBvdmVyZmxvdzogaGlkZGVuOyAvKiBQcmV2ZW50IHNjcm9sbGluZyAqL1xcbn1cXG5cXG4jdGl0bGUge1xcbiAgY29sb3I6IHJnYigwLCAwLCAwKTtcXG59XFxuXFxuI2NvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxufVxcblxcbi5ib2FyZFBsYXllciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIGdhcDogMnB4OyAvKiBBZGp1c3QgdGhlIGdhcCBiZXR3ZWVuIGNlbGxzICovXFxuICBtYXJnaW46IDA7IC8qIEVuc3VyZSBubyBkZWZhdWx0IG1hcmdpbiAqL1xcbiAgcGFkZGluZzogMDsgLyogRW5zdXJlIG5vIGRlZmF1bHQgcGFkZGluZyAqL1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbn1cXG5cXG4uY2VsbCB7XFxuICB3aWR0aDogNDBweDtcXG4gIGhlaWdodDogNDBweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiBJbmNsdWRlIHBhZGRpbmcgYW5kIGJvcmRlciBpbiB0aGUgZWxlbWVudCdzIHRvdGFsIHdpZHRoIGFuZCBoZWlnaHQgKi9cXG4gIG1hcmdpbjogMDsgLyogRW5zdXJlIG5vIGRlZmF1bHQgbWFyZ2luICovXFxuICBwYWRkaW5nOiAwOyAvKiBFbnN1cmUgbm8gZGVmYXVsdCBwYWRkaW5nICovXFxufVxcblxcbi5jZWxsSGFzU2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNCwgMCwgMjU1KTtcXG4gIHdpZHRoOiA0MHB4O1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzAwMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIEluY2x1ZGUgcGFkZGluZyBhbmQgYm9yZGVyIGluIHRoZSBlbGVtZW50J3MgdG90YWwgd2lkdGggYW5kIGhlaWdodCAqL1xcbiAgbWFyZ2luOiAwOyAvKiBFbnN1cmUgbm8gZGVmYXVsdCBtYXJnaW4gKi9cXG4gIHBhZGRpbmc6IDA7XFxufVxcbi5jZWxsOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmJvYXJkQ29tcHV0ZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICBnYXA6IDJweDsgLyogQWRqdXN0IHRoZSBnYXAgYmV0d2VlbiBjZWxscyAqL1xcbiAgbWFyZ2luOiAwOyAvKiBFbnN1cmUgbm8gZGVmYXVsdCBtYXJnaW4gKi9cXG4gIHBhZGRpbmc6IDA7IC8qIEVuc3VyZSBubyBkZWZhdWx0IHBhZGRpbmcgKi9cXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG59XFxuXFxuLnBsYXlHYW1lQnRuIHtcXG4gIG1hcmdpbi10b3A6IDVyZW07XFxuICB3aWR0aDogMjByZW07XFxuICBoZWlnaHQ6IDEwcmVtO1xcbiAgZm9udC1zaXplOiAzcmVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uaGFzQmxvY2sge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MiwgMjE0LCAyMTkpO1xcbn1cXG5cXG4ucmVzZXRCdG4ge1xcbiAgd2lkdGg6IDEwcmVtO1xcbiAgaGVpZ2h0OiA1cmVtO1xcbiAgZm9udC1zaXplOiAxLjhyZW07XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2ludGVyZmFjZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcbm9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbnRlcmZhY2UuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgZGlzcGxheUdhbWUgZnJvbSAnLi9pbnRlcmZhY2UnO1xuaW1wb3J0ICcuL3N0eWxlcy9pbnRlcmZhY2UuY3NzJztcbmltcG9ydCByYW5kb21HYW1lIGZyb20gJy4vcmFuZG9tR2FtZSc7XG5cbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcblxuY29uc3QgcGxheUdhbWVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbnBsYXlHYW1lQnRuLmNsYXNzTGlzdC5hZGQoJ3BsYXlHYW1lQnRuJyk7XG5wbGF5R2FtZUJ0bi50ZXh0Q29udGVudCA9ICdQbGF5IEdhbWUnO1xucGxheUdhbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcblxuICBkaXNwbGF5R2FtZShyYW5kb21HYW1lKCkpO1xufSk7XG5cbmNvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5R2FtZUJ0bik7XG4iXSwibmFtZXMiOlsiZGlzcGxheUJvYXJkIiwiYm9hcmQiLCJkaXZDb250IiwiaW5uZXJIVE1MIiwiZm9yRWFjaCIsInJvdyIsInJvd0luZGV4Iiwicm93RGl2IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY29sIiwiY29sSW5kZXgiLCJjZWxsIiwiaGFzU2hpcFBhcnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJoYXNCbG9jayIsImRhdGFzZXQiLCJhcHBlbmRDaGlsZCIsImRpc3BsYXlCb2FyZENvbXAiLCJTaGlwIiwiR2FtZWJvYXJkIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwic2hpcHMiLCJyb3dBcnJheSIsIm9iamVjdCIsIndhc0hpdCIsInB1c2giLCJwbGFjZVNoaXBWZXJ0aWNhbGx5IiwiYSIsImIiLCJpIiwic2hpcCIsInNoaXBQYXJ0cyIsInBsYWNlU2hpcEhvcml6b250YWxseSIsInJlY2VpdmVBdHRhY2siLCJpc0hpdCIsImlzQWxsU3VuayIsImV2ZXJ5IiwiaXNJdFN1bmsiLCJyYW5kb21HYW1lIiwiZGlzcGxheUdhbWUiLCJnYW1lIiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJwbGF5ZXJCb2FyZCIsInBsYXllciIsImdhbWVib2FyZCIsImNvbXB1dGVyQm9hcmQiLCJjb21wdXRlciIsInJlc2V0QnRuIiwidGV4dENvbnRlbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiY29uc29sZSIsImxvZyIsInBsYXllckJvYXJkVGl0bGUiLCJDb21wQm9hcmRUaXRsZSIsInBsYXllckJvYXJkRGl2IiwiY29tcHV0ZXJCb2FyZERpdiIsImRpdlBsYXllciIsImNvbXBEaXYiLCJyZWFsUGxheWVyIiwibmFtZSIsIkNvbXB1dGVyIiwiZ2V0UmFuZG9tSW50IiwibWluIiwibWF4IiwiTWF0aCIsImNlaWwiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbWl6ZUZ1bmMiLCJmdW5jMSIsImZ1bmMyIiwicGxhY2VTaGlwcyIsInNoaXBTaXplcyIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX3N0ZXAiLCJfbG9vcCIsInNpemUiLCJ2YWx1ZSIsInBsYWNlZCIsIl9sb29wMiIsInBsYWNlbWVudEZ1bmN0aW9uIiwicmVzdWx0IiwicyIsIm4iLCJkb25lIiwiZXJyIiwiZSIsImYiLCJuZXdQYXJ0IiwiU2hpcFBhcnQiLCJhbGxQYXJ0c1N1bmsiLCJwYXJ0IiwiaXNTdW5rIiwiaGl0VGltZXMiLCJwbGF5R2FtZUJ0biJdLCJzb3VyY2VSb290IjoiIn0=