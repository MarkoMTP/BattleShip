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
/* harmony export */   "default": () => (/* binding */ displayBoard)
/* harmony export */ });
/* harmony import */ var _interface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interface */ "./src/interface.js");
/* harmony import */ var _randomGame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./randomGame */ "./src/randomGame.js");
/* harmony import */ var _styles_interface_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/interface.css */ "./src/styles/interface.css");



function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var updateStatus = function updateStatus(playerGameBoard, status, computerGameBoard, isPlayerTurn) {
  if (playerGameBoard.isAllSunk()) {
    status.textContent = 'Computer Wins';
    setTimeout(function () {
      (0,_interface__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_randomGame__WEBPACK_IMPORTED_MODULE_1__["default"])());
    }, 2000);
  } else if (computerGameBoard.isAllSunk()) {
    status.textContent = 'Player Wins';
    setTimeout(function () {
      (0,_interface__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_randomGame__WEBPACK_IMPORTED_MODULE_1__["default"])());
    }, 2000);
  } else {
    status.textContent = isPlayerTurn ? 'Player\'s Turn' : 'Computer\'s Turn';
  }
};
var clearBoard = function clearBoard(div) {
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
};
var renderBoard = function renderBoard(gameBoard, container, isPlayer, handleCellClick, isPlayerTurn) {
  gameBoard.board.forEach(function (row, rowIndex) {
    var rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    row.forEach(function (col, colIndex) {
      var cell = document.createElement('div');
      cell.classList.add('cell');
      if (col.hasShipPart && col.wasHit) {
        cell.style.background = 'red';
      } else if (!col.hasShipPart && col.wasHit) {
        cell.textContent = 'X';
      } else if (col.hasShipPart && isPlayer) {
        cell.classList.add('cellHasShip');
      }
      cell.dataset.row = rowIndex;
      cell.dataset.col = colIndex;
      if (!isPlayer && isPlayerTurn) {
        cell.addEventListener('click', function () {
          return handleCellClick(rowIndex, colIndex);
        });
      }
      rowDiv.appendChild(cell);
    });
    container.appendChild(rowDiv);
  });
};
function displayBoard(game, divContP, divContC, status) {
  var playerGameBoard = game.player.gameboard;
  var computerGameBoard = game.computer.gameboard;
  var isPlayerTurn = true;
  var handleCellClick = function handleCellClick(row, col) {
    if (!isPlayerTurn) return;
    computerGameBoard.receiveAttack(row, col);
    displayBoard(game, divContP, divContC, status);
    isPlayerTurn = false;
    updateStatus(playerGameBoard, status, computerGameBoard, isPlayerTurn);
    setTimeout(function () {
      var a = getRandomInt(0, 9);
      var b = getRandomInt(0, 9);
      playerGameBoard.receiveAttack(a, b);
      isPlayerTurn = true;
      updateStatus(playerGameBoard, status, computerGameBoard, isPlayerTurn);
      displayBoard(game, divContP, divContC, status);
    }, 500);
  };
  clearBoard(divContP);
  clearBoard(divContC);
  renderBoard(playerGameBoard, divContP, true, handleCellClick, isPlayerTurn);
  renderBoard(computerGameBoard, divContC, false, handleCellClick, isPlayerTurn);
  updateStatus(playerGameBoard, status, computerGameBoard, isPlayerTurn);
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
  if (board.length === 0) {
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
/* harmony import */ var _randomGame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./randomGame */ "./src/randomGame.js");
/* harmony import */ var _styles_interface_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/interface.css */ "./src/styles/interface.css");



function displayGame(game) {
  var container = document.getElementById('container');
  container.innerHTML = ''; // Clear the container at the start

  // Reset button
  var middleDiv = document.createElement('div');
  var randomBtn = document.createElement('button');
  randomBtn.classList.add('randomBtn');
  randomBtn.textContent = 'Reset';
  randomBtn.addEventListener('click', function () {
    container.innerHTML = '';
    displayGame((0,_randomGame__WEBPACK_IMPORTED_MODULE_1__["default"])());
  });

  // game state
  var status = document.createElement('h1');
  status.classList.add('status');
  status.textContent = 'Loading';

  // Titles
  var playerBoardTitle = document.createElement('h1');
  playerBoardTitle.textContent = "".concat(game.player.name, "'s Board");
  playerBoardTitle.classList.add('playerTitle');
  var compBoardTitle = document.createElement('h1');
  compBoardTitle.textContent = 'Computer Board';
  compBoardTitle.classList.add('playerTitle');

  // Boards
  var playerBoardDiv = document.createElement('div');
  playerBoardDiv.classList.add('boardPlayer');
  var computerBoardDiv = document.createElement('div');
  computerBoardDiv.classList.add('boardComputer');

  // Place boards inside div
  (0,_displayBoard__WEBPACK_IMPORTED_MODULE_0__["default"])(game, playerBoardDiv, computerBoardDiv, status);

  // Div to put them both in
  var divPlayer = document.createElement('div');
  divPlayer.appendChild(playerBoardTitle);
  divPlayer.appendChild(playerBoardDiv);

  // Comp
  var compDiv = document.createElement('div');
  compDiv.appendChild(compBoardTitle);
  compDiv.appendChild(computerBoardDiv);
  container.appendChild(divPlayer);
  middleDiv.appendChild(randomBtn);
  middleDiv.appendChild(status);
  container.appendChild(middleDiv);

  // container.appendChild(placeShip);

  container.appendChild(compDiv);
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
/* harmony export */   "default": () => (/* binding */ randomGame),
/* harmony export */   randomComputerOnly: () => (/* binding */ randomComputerOnly)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }


// Utility functions
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomizeFunc(func1, func2) {
  return Math.random() < 0.5 ? func1 : func2;
}

// Ship placement function with retry logic
function placeShips(createGameboard, shipSizes) {
  var maxOverallAttempts = 10; // Maximum overall attempts to place all ships
  var overallAttempts = 0;
  var _loop = function _loop() {
      var allShipsPlaced = true;
      var gameboard = createGameboard();
      var _iterator = _createForOfIteratorHelper(shipSizes),
        _step;
      try {
        var _loop2 = function _loop2() {
          var size = _step.value;
          var placed = false;
          var attempts = 0; // Add an attempt counter
          var maxAttempts = 100; // Set a maximum number of attempts
          var _loop3 = function _loop3() {
            attempts++;
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
          while (!placed && attempts < maxAttempts) {
            _loop3();
          }
          if (!placed) {
            console.error("Failed to place ship of size ".concat(size, " after ").concat(attempts, " attempts."));
            allShipsPlaced = false;
            return 1; // break
          }
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          if (_loop2()) break;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (allShipsPlaced) {
        return {
          v: gameboard
        };
      }
      overallAttempts++;
      console.warn("Retrying ship placement. Overall attempt ".concat(overallAttempts));
    },
    _ret;
  while (overallAttempts < maxOverallAttempts) {
    _ret = _loop();
    if (_ret) return _ret.v;
  }
  console.error("Failed to place all ships after ".concat(maxOverallAttempts, " overall attempts."));
  throw new Error('Unable to place all ships');
}

// Game initialization function
function randomGame() {
  var computer = new _player__WEBPACK_IMPORTED_MODULE_0__.Computer();
  var player = new _player__WEBPACK_IMPORTED_MODULE_0__["default"]('Marko');
  var shipSizes = [6, 5, 4, 3, 2, 1];
  computer.gameboard = placeShips(function () {
    return new _player__WEBPACK_IMPORTED_MODULE_0__.Computer().gameboard;
  }, shipSizes);
  player.gameboard = placeShips(function () {
    return new _player__WEBPACK_IMPORTED_MODULE_0__["default"]('Marko').gameboard;
  }, shipSizes); // Create a new gameboard instance

  return {
    computer: computer,
    player: player
  };
}
function randomComputerOnly() {
  var computer = new _player__WEBPACK_IMPORTED_MODULE_0__.Computer();
  var player = new _player__WEBPACK_IMPORTED_MODULE_0__["default"]('Marko');
  var shipSizes = [6, 5, 4, 3, 2, 1];
  computer.gameboard = placeShips(function () {
    return new _player__WEBPACK_IMPORTED_MODULE_0__.Computer().gameboard;
  }, shipSizes);
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
  background-color: rgb(82, 215, 255);
  text-align: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden; /* Prevent scrolling */
}

#title {
  color: rgb(0, 0, 0);
  font-size: 5rem;
}

.playerTitle {
  font-size: 3rem;
  font-style: italic;
  color: rgb(4, 5, 5);
}

.status {
  color: rgb(11, 8, 8);
  font-family: "Times New Roman", Times, serif;
  font-size: 3rem;
  padding: 10px;
}

#container {
  display: flex;
  justify-content: space-around;
  align-items: center;
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
  width: 3.5rem;
  height: 3.5rem;
  border: 1px solid #000;
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
  margin: 0; /* Ensure no default margin */
  padding: 0; /* Ensure no default padding */
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1.3.5rem;
  background-color: white;
}

.cellHasShip {
  background-color: rgb(4, 0, 255);
  width: 3.5rem;
  height: 3.5rem;
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
  font-size: 3.5rem;
  cursor: pointer;
}
.hasBlock {
  position: relative; /* Make the container position-relative */
}

.hasBlock::after {
  content: "X"; /* Add the X content */
  position: absolute; /* Position the X relative to the container */
  top: 50%; /* Align the X vertically in the middle */
  left: 50%; /* Align the X horizontally in the middle */
  transform: translate(-50%, -50%); /* Center the X */
  font-size: 12px; /* Adjust the font size of the X */
  color: rgb(0, 0, 0); /* Set the color of the X */
}

.randomBtn {
  width: 20rem;
  height: 3.5rem;
  font-size: 2.5rem;
  cursor: pointer;
}

.randomGBtn {
  width: 20rem;
  height: 5.5rem;
  font-size: 3.5rem;
  cursor: pointer;
}
`, "",{"version":3,"sources":["webpack://./src/styles/interface.css"],"names":[],"mappings":"AAAA;;GAEG;AACH;EACE,SAAS,EAAE,0BAA0B;EACrC,mCAAmC;EACnC,kBAAkB;EAClB,aAAa;EACb,YAAY;EACZ,gBAAgB,EAAE,sBAAsB;AAC1C;;AAEA;EACE,mBAAmB;EACnB,eAAe;AACjB;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,oBAAoB;EACpB,4CAA4C;EAC5C,eAAe;EACf,aAAa;AACf;;AAEA;EACE,aAAa;EACb,6BAA6B;EAC7B,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,sCAAsC;EACtC,mCAAmC;EACnC,QAAQ,EAAE,iCAAiC;EAC3C,SAAS,EAAE,6BAA6B;EACxC,UAAU,EAAE,8BAA8B;EAC1C,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,cAAc;EACd,sBAAsB;EACtB,sBAAsB,EAAE,uEAAuE;EAC/F,SAAS,EAAE,6BAA6B;EACxC,UAAU,EAAE,8BAA8B;EAC1C,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,gBAAgB;EAChB,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,gCAAgC;EAChC,aAAa;EACb,cAAc;EACd,sBAAsB;EACtB,sBAAsB,EAAE,uEAAuE;EAC/F,SAAS,EAAE,6BAA6B;EACxC,UAAU;AACZ;AACA;EACE,qBAAqB;EACrB,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,sCAAsC;EACtC,mCAAmC;EACnC,QAAQ,EAAE,iCAAiC;EAC3C,SAAS,EAAE,6BAA6B;EACxC,UAAU,EAAE,8BAA8B;EAC1C,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,YAAY;EACZ,aAAa;EACb,iBAAiB;EACjB,eAAe;AACjB;AACA;EACE,kBAAkB,EAAE,yCAAyC;AAC/D;;AAEA;EACE,YAAY,EAAE,sBAAsB;EACpC,kBAAkB,EAAE,6CAA6C;EACjE,QAAQ,EAAE,yCAAyC;EACnD,SAAS,EAAE,2CAA2C;EACtD,gCAAgC,EAAE,iBAAiB;EACnD,eAAe,EAAE,kCAAkC;EACnD,mBAAmB,EAAE,2BAA2B;AAClD;;AAEA;EACE,YAAY;EACZ,cAAc;EACd,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,cAAc;EACd,iBAAiB;EACjB,eAAe;AACjB","sourcesContent":["/* div {\n  border: 1px black solid;\n} */\nbody {\n  margin: 0; /* Remove default margin */\n  background-color: rgb(82, 215, 255);\n  text-align: center;\n  height: 100vh;\n  width: 100vw;\n  overflow: hidden; /* Prevent scrolling */\n}\n\n#title {\n  color: rgb(0, 0, 0);\n  font-size: 5rem;\n}\n\n.playerTitle {\n  font-size: 3rem;\n  font-style: italic;\n  color: rgb(4, 5, 5);\n}\n\n.status {\n  color: rgb(11, 8, 8);\n  font-family: \"Times New Roman\", Times, serif;\n  font-size: 3rem;\n  padding: 10px;\n}\n\n#container {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n}\n\n.boardPlayer {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n  gap: 2px; /* Adjust the gap between cells */\n  margin: 0; /* Ensure no default margin */\n  padding: 0; /* Ensure no default padding */\n  width: fit-content;\n}\n\n.cell {\n  width: 3.5rem;\n  height: 3.5rem;\n  border: 1px solid #000;\n  box-sizing: border-box; /* Include padding and border in the element's total width and height */\n  margin: 0; /* Ensure no default margin */\n  padding: 0; /* Ensure no default padding */\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-weight: 700;\n  font-size: 1.3.5rem;\n  background-color: white;\n}\n\n.cellHasShip {\n  background-color: rgb(4, 0, 255);\n  width: 3.5rem;\n  height: 3.5rem;\n  border: 1px solid #000;\n  box-sizing: border-box; /* Include padding and border in the element's total width and height */\n  margin: 0; /* Ensure no default margin */\n  padding: 0;\n}\n.cell:hover {\n  background-color: red;\n  cursor: pointer;\n}\n\n.boardComputer {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n  gap: 2px; /* Adjust the gap between cells */\n  margin: 0; /* Ensure no default margin */\n  padding: 0; /* Ensure no default padding */\n  width: fit-content;\n}\n\n.playGameBtn {\n  margin-top: 5rem;\n  width: 20rem;\n  height: 10rem;\n  font-size: 3.5rem;\n  cursor: pointer;\n}\n.hasBlock {\n  position: relative; /* Make the container position-relative */\n}\n\n.hasBlock::after {\n  content: \"X\"; /* Add the X content */\n  position: absolute; /* Position the X relative to the container */\n  top: 50%; /* Align the X vertically in the middle */\n  left: 50%; /* Align the X horizontally in the middle */\n  transform: translate(-50%, -50%); /* Center the X */\n  font-size: 12px; /* Adjust the font size of the X */\n  color: rgb(0, 0, 0); /* Set the color of the X */\n}\n\n.randomBtn {\n  width: 20rem;\n  height: 3.5rem;\n  font-size: 2.5rem;\n  cursor: pointer;\n}\n\n.randomGBtn {\n  width: 20rem;\n  height: 5.5rem;\n  font-size: 3.5rem;\n  cursor: pointer;\n}\n"],"sourceRoot":""}]);
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
var playRandomGameBtn = document.createElement('button');
playRandomGameBtn.classList.add('randomGBtn');
playRandomGameBtn.textContent = 'Play Game';
playRandomGameBtn.addEventListener('click', function () {
  container.innerHTML = ''; // Clear the container
  (0,_interface__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_randomGame__WEBPACK_IMPORTED_MODULE_2__["default"])());
});
container.appendChild(playRandomGameBtn);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7O0FDQXNDO0FBQ047QUFDOEI7QUFFOUQsSUFBTXZHLFNBQVMsR0FBR1EsUUFBUSxDQUFDMEMsY0FBYyxDQUFDLFdBQVcsQ0FBQztBQUV0RCxJQUFNdUQsaUJBQWlCLEdBQUdqRyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxRQUFRLENBQUM7QUFDMURnRyxpQkFBaUIsQ0FBQy9GLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFlBQVksQ0FBQztBQUM3QzhGLGlCQUFpQixDQUFDakgsV0FBVyxHQUFHLFdBQVc7QUFDM0NpSCxpQkFBaUIsQ0FBQ3JGLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0VBQ2hEcEIsU0FBUyxDQUFDbUQsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0VBQzFCMUUsc0RBQVcsQ0FBQ0MsdURBQVUsQ0FBQyxDQUFDLENBQUM7QUFDM0IsQ0FBQyxDQUFDO0FBRUZzQixTQUFTLENBQUNxQixXQUFXLENBQUNvRixpQkFBaUIsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kaXNwbGF5Qm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9yYW5kb21HYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9pbnRlcmZhY2UuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9pbnRlcmZhY2UuY3NzPzZmYWMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkaXNwbGF5R2FtZSBmcm9tICcuL2ludGVyZmFjZSc7XG5pbXBvcnQgcmFuZG9tR2FtZSBmcm9tICcuL3JhbmRvbUdhbWUnO1xuaW1wb3J0ICcuL3N0eWxlcy9pbnRlcmZhY2UuY3NzJztcblxuZnVuY3Rpb24gZ2V0UmFuZG9tSW50KG1pbiwgbWF4KSB7XG4gIG1pbiA9IE1hdGguY2VpbChtaW4pO1xuICBtYXggPSBNYXRoLmZsb29yKG1heCk7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xufVxuXG5jb25zdCB1cGRhdGVTdGF0dXMgPSAocGxheWVyR2FtZUJvYXJkLCBzdGF0dXMsIGNvbXB1dGVyR2FtZUJvYXJkLCBpc1BsYXllclR1cm4pID0+IHtcbiAgaWYgKHBsYXllckdhbWVCb2FyZC5pc0FsbFN1bmsoKSkge1xuICAgIHN0YXR1cy50ZXh0Q29udGVudCA9ICdDb21wdXRlciBXaW5zJztcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRpc3BsYXlHYW1lKHJhbmRvbUdhbWUoKSk7XG4gICAgfSwgMjAwMCk7XG4gIH0gZWxzZSBpZiAoY29tcHV0ZXJHYW1lQm9hcmQuaXNBbGxTdW5rKCkpIHtcbiAgICBzdGF0dXMudGV4dENvbnRlbnQgPSAnUGxheWVyIFdpbnMnO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZGlzcGxheUdhbWUocmFuZG9tR2FtZSgpKTtcbiAgICB9LCAyMDAwKTtcbiAgfSBlbHNlIHtcbiAgICBzdGF0dXMudGV4dENvbnRlbnQgPSBpc1BsYXllclR1cm4gPyAnUGxheWVyXFwncyBUdXJuJyA6ICdDb21wdXRlclxcJ3MgVHVybic7XG4gIH1cbn07XG5cbmNvbnN0IGNsZWFyQm9hcmQgPSAoZGl2KSA9PiB7XG4gIHdoaWxlIChkaXYuZmlyc3RDaGlsZCkge1xuICAgIGRpdi5yZW1vdmVDaGlsZChkaXYuZmlyc3RDaGlsZCk7XG4gIH1cbn07XG5cbmNvbnN0IHJlbmRlckJvYXJkID0gKGdhbWVCb2FyZCwgY29udGFpbmVyLCBpc1BsYXllciwgaGFuZGxlQ2VsbENsaWNrLCBpc1BsYXllclR1cm4pID0+IHtcbiAgZ2FtZUJvYXJkLmJvYXJkLmZvckVhY2goKHJvdywgcm93SW5kZXgpID0+IHtcbiAgICBjb25zdCByb3dEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICByb3dEaXYuY2xhc3NMaXN0LmFkZCgncm93Jyk7XG5cbiAgICByb3cuZm9yRWFjaCgoY29sLCBjb2xJbmRleCkgPT4ge1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XG5cbiAgICAgIGlmIChjb2wuaGFzU2hpcFBhcnQgJiYgY29sLndhc0hpdCkge1xuICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmQgPSAncmVkJztcbiAgICAgIH0gZWxzZSBpZiAoIWNvbC5oYXNTaGlwUGFydCAmJiBjb2wud2FzSGl0KSB7XG4gICAgICAgIGNlbGwudGV4dENvbnRlbnQgPSAnWCc7XG4gICAgICB9IGVsc2UgaWYgKGNvbC5oYXNTaGlwUGFydCAmJiBpc1BsYXllcikge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGxIYXNTaGlwJyk7XG4gICAgICB9XG5cbiAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSByb3dJbmRleDtcbiAgICAgIGNlbGwuZGF0YXNldC5jb2wgPSBjb2xJbmRleDtcblxuICAgICAgaWYgKCFpc1BsYXllciAmJiBpc1BsYXllclR1cm4pIHtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGhhbmRsZUNlbGxDbGljayhyb3dJbmRleCwgY29sSW5kZXgpKTtcbiAgICAgIH1cblxuICAgICAgcm93RGl2LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJvd0Rpdik7XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlzcGxheUJvYXJkKGdhbWUsIGRpdkNvbnRQLCBkaXZDb250Qywgc3RhdHVzKSB7XG4gIGNvbnN0IHBsYXllckdhbWVCb2FyZCA9IGdhbWUucGxheWVyLmdhbWVib2FyZDtcbiAgY29uc3QgY29tcHV0ZXJHYW1lQm9hcmQgPSBnYW1lLmNvbXB1dGVyLmdhbWVib2FyZDtcbiAgbGV0IGlzUGxheWVyVHVybiA9IHRydWU7XG5cbiAgY29uc3QgaGFuZGxlQ2VsbENsaWNrID0gKHJvdywgY29sKSA9PiB7XG4gICAgaWYgKCFpc1BsYXllclR1cm4pIHJldHVybjtcblxuICAgIGNvbXB1dGVyR2FtZUJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2wpO1xuICAgIGRpc3BsYXlCb2FyZChnYW1lLCBkaXZDb250UCwgZGl2Q29udEMsIHN0YXR1cyk7XG5cbiAgICBpc1BsYXllclR1cm4gPSBmYWxzZTtcbiAgICB1cGRhdGVTdGF0dXMocGxheWVyR2FtZUJvYXJkLCBzdGF0dXMsIGNvbXB1dGVyR2FtZUJvYXJkLCBpc1BsYXllclR1cm4pO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCBhID0gZ2V0UmFuZG9tSW50KDAsIDkpO1xuICAgICAgY29uc3QgYiA9IGdldFJhbmRvbUludCgwLCA5KTtcbiAgICAgIHBsYXllckdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKGEsIGIpO1xuICAgICAgaXNQbGF5ZXJUdXJuID0gdHJ1ZTtcbiAgICAgIHVwZGF0ZVN0YXR1cyhwbGF5ZXJHYW1lQm9hcmQsIHN0YXR1cywgY29tcHV0ZXJHYW1lQm9hcmQsIGlzUGxheWVyVHVybik7XG4gICAgICBkaXNwbGF5Qm9hcmQoZ2FtZSwgZGl2Q29udFAsIGRpdkNvbnRDLCBzdGF0dXMpO1xuICAgIH0sIDUwMCk7XG4gIH07XG5cbiAgY2xlYXJCb2FyZChkaXZDb250UCk7XG4gIGNsZWFyQm9hcmQoZGl2Q29udEMpO1xuXG4gIHJlbmRlckJvYXJkKHBsYXllckdhbWVCb2FyZCwgZGl2Q29udFAsIHRydWUsIGhhbmRsZUNlbGxDbGljaywgaXNQbGF5ZXJUdXJuKTtcbiAgcmVuZGVyQm9hcmQoY29tcHV0ZXJHYW1lQm9hcmQsIGRpdkNvbnRDLCBmYWxzZSwgaGFuZGxlQ2VsbENsaWNrLCBpc1BsYXllclR1cm4pO1xuXG4gIHVwZGF0ZVN0YXR1cyhwbGF5ZXJHYW1lQm9hcmQsIHN0YXR1cywgY29tcHV0ZXJHYW1lQm9hcmQsIGlzUGxheWVyVHVybik7XG59XG4iLCJpbXBvcnQgU2hpcCBmcm9tICcuL3NoaXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBHYW1lYm9hcmQoYm9hcmQgPSBbXSkge1xuICBjb25zdCBzaGlwcyA9IFtdO1xuICAvLyBTdGVwIDE6IENyZWF0ZSB0aGUgQm9hcmRcbiAgaWYgKGJvYXJkLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3crKykge1xuICAgICAgY29uc3Qgcm93QXJyYXkgPSBbXTtcbiAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IDEwOyBjb2wrKykge1xuICAgICAgICBjb25zdCBjZWxsID0ge1xuICAgICAgICAgIHJvdywgY29sLCBvYmplY3Q6IG51bGwsIGhhc1NoaXBQYXJ0OiBmYWxzZSwgd2FzSGl0OiBmYWxzZSwgaGFzQmxvY2s6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgICByb3dBcnJheS5wdXNoKGNlbGwpO1xuICAgICAgfVxuICAgICAgYm9hcmQucHVzaChyb3dBcnJheSk7XG4gICAgfVxuICB9XG4gIC8vIFN0ZXAgMjogUmV0dXJuIHRoZSBCb2FyZFxuICByZXR1cm4ge1xuICAgIGJvYXJkLFxuICAgIHNoaXBzLFxuXG4gICAgcGxhY2VTaGlwVmVydGljYWxseShhLCBiLCBsZW5ndGgpIHtcbiAgICAgIGNvbnN0IHsgYm9hcmQgfSA9IHRoaXM7XG5cbiAgICAgIC8vIENoZWNrIGlmIHBsYWNlbWVudCBpcyB3aXRoaW4gYm91bmRzXG4gICAgICBpZiAoYiArIGxlbmd0aCA+IDEwKSByZXR1cm4gJ091dCBPZiBCb3VuZHMnO1xuXG4gICAgICAvLyBDaGVjayBpZiB0aGUgYXJlYSBpcyBmcmVlIGZyb20gb3RoZXIgc2hpcHMgYW5kIGJsb2Nrc1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgYm9hcmRbYV1bYiArIGldLmhhc1NoaXBQYXJ0XG4gICAgICAgICAgfHwgKGEgPiAwICYmIGJvYXJkW2EgLSAxXVtiICsgaV0uaGFzU2hpcFBhcnQpXG4gICAgICAgICAgfHwgKGEgPCA5ICYmIGJvYXJkW2EgKyAxXVtiICsgaV0uaGFzU2hpcFBhcnQpXG4gICAgICAgICAgfHwgYm9hcmRbYV1bYiArIGldLmhhc0Jsb2NrXG4gICAgICAgICAgfHwgKGEgPiAwICYmIGJvYXJkW2EgLSAxXVtiICsgaV0uaGFzQmxvY2spXG4gICAgICAgICAgfHwgKGEgPCA5ICYmIGJvYXJkW2EgKyAxXVtiICsgaV0uaGFzQmxvY2spXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiAnVG9vIENsb3NlJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBDaGVjayB0aGUgY2VsbHMgYmVmb3JlIHRoZSBzdGFydCBhbmQgYWZ0ZXIgdGhlIGVuZCBvZiB0aGUgc2hpcFxuICAgICAgaWYgKFxuICAgICAgICAoYiA+IDAgJiYgKGJvYXJkW2FdW2IgLSAxXS5oYXNTaGlwUGFydCB8fCBib2FyZFthXVtiIC0gMV0uaGFzQmxvY2spKVxuICAgICAgICB8fCAoYiArIGxlbmd0aCA8IDEwICYmIChib2FyZFthXVtiICsgbGVuZ3RoXS5oYXNTaGlwUGFydCB8fCBib2FyZFthXVtiICsgbGVuZ3RoXS5oYXNCbG9jaykpXG4gICAgICAgIHx8IChiID4gMCAmJiBhID4gMCAmJiAoYm9hcmRbYSAtIDFdW2IgLSAxXS5oYXNTaGlwUGFydCB8fCBib2FyZFthIC0gMV1bYiAtIDFdLmhhc0Jsb2NrKSlcbiAgICAgICAgfHwgKGEgPiAwICYmIGIgKyBsZW5ndGggPCAxMCAmJiAoYm9hcmRbYSAtIDFdW2IgKyBsZW5ndGhdLmhhc1NoaXBQYXJ0IHx8IGJvYXJkW2EgLSAxXVtiICsgbGVuZ3RoXS5oYXNCbG9jaykpXG4gICAgICAgIHx8IChiID4gMCAmJiBhIDwgOSAmJiAoYm9hcmRbYSArIDFdW2IgLSAxXS5oYXNTaGlwUGFydCB8fCBib2FyZFthICsgMV1bYiAtIDFdLmhhc0Jsb2NrKSlcbiAgICAgICAgfHwgKGEgPCA5ICYmIGIgKyBsZW5ndGggPCAxMCAmJiAoYm9hcmRbYSArIDFdW2IgKyBsZW5ndGhdLmhhc1NoaXBQYXJ0IHx8IGJvYXJkW2EgKyAxXVtiICsgbGVuZ3RoXS5oYXNCbG9jaykpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuICdUb28gQ2xvc2UnO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAobGVuZ3RoKTtcbiAgICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcblxuICAgICAgLy8gUGxhY2UgdGhlIHNoaXAgcGFydHNcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYm9hcmRbYV1bYiArIGldLmhhc1NoaXBQYXJ0ID0gdHJ1ZTtcbiAgICAgICAgYm9hcmRbYV1bYiArIGldLm9iamVjdCA9IHNoaXAuc2hpcFBhcnRzW2ldO1xuXG4gICAgICAgIGlmIChhID4gMCkge1xuICAgICAgICAgIGJvYXJkW2EgLSAxXVtiICsgaV0uaGFzQmxvY2sgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGEgPCA5KSB7XG4gICAgICAgICAgYm9hcmRbYSArIDFdW2IgKyBpXS5oYXNCbG9jayA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQmxvY2sgdGhlIGNlbGxzIGJlZm9yZSBhbmQgYWZ0ZXIgdGhlIHNoaXBcbiAgICAgIGlmIChiID4gMCkge1xuICAgICAgICBib2FyZFthXVtiIC0gMV0uaGFzQmxvY2sgPSB0cnVlO1xuICAgICAgICBpZiAoYSA+IDApIGJvYXJkW2EgLSAxXVtiIC0gMV0uaGFzQmxvY2sgPSB0cnVlO1xuICAgICAgICBpZiAoYSA8IDkpIGJvYXJkW2EgKyAxXVtiIC0gMV0uaGFzQmxvY2sgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKGIgKyBsZW5ndGggPCAxMCkge1xuICAgICAgICBib2FyZFthXVtiICsgbGVuZ3RoXS5oYXNCbG9jayA9IHRydWU7XG4gICAgICAgIGlmIChhID4gMCkgYm9hcmRbYSAtIDFdW2IgKyBsZW5ndGhdLmhhc0Jsb2NrID0gdHJ1ZTtcbiAgICAgICAgaWYgKGEgPCA5KSBib2FyZFthICsgMV1bYiArIGxlbmd0aF0uaGFzQmxvY2sgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYm9hcmQ7XG4gICAgfSxcblxuICAgIHBsYWNlU2hpcEhvcml6b250YWxseShhLCBiLCBsZW5ndGgpIHtcbiAgICAgIGNvbnN0IHsgYm9hcmQgfSA9IHRoaXM7XG5cbiAgICAgIC8vIENoZWNrIGlmIHBsYWNlbWVudCBpcyB3aXRoaW4gYm91bmRzIGFuZCBjZWxscyBhcmUgYXZhaWxhYmxlXG4gICAgICBpZiAoYSArIGxlbmd0aCA+IDEwKSByZXR1cm4gJ091dCBPZiBCb3VuZHMnO1xuXG4gICAgICAvLyBDaGVjayBpZiB0aGUgYXJlYSBpcyBmcmVlIGZyb20gb3RoZXIgc2hpcHMgYW5kIGJsb2Nrc1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgYm9hcmRbYSArIGldW2JdLmhhc1NoaXBQYXJ0XG4gICAgICAgICAgfHwgKGIgPiAwICYmIGJvYXJkW2EgKyBpXVtiIC0gMV0uaGFzU2hpcFBhcnQpXG4gICAgICAgICAgfHwgKGIgPCA5ICYmIGJvYXJkW2EgKyBpXVtiICsgMV0uaGFzU2hpcFBhcnQpXG4gICAgICAgICAgfHwgYm9hcmRbYSArIGldW2JdLmhhc0Jsb2NrXG4gICAgICAgICAgfHwgKGIgPiAwICYmIGJvYXJkW2EgKyBpXVtiIC0gMV0uaGFzQmxvY2spXG4gICAgICAgICAgfHwgKGIgPCA5ICYmIGJvYXJkW2EgKyBpXVtiICsgMV0uaGFzQmxvY2spXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiAnVG9vIENsb3NlJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBDaGVjayB0aGUgY2VsbHMgYmVmb3JlIHRoZSBzdGFydCBhbmQgYWZ0ZXIgdGhlIGVuZCBvZiB0aGUgc2hpcFxuICAgICAgaWYgKFxuICAgICAgICAoYSA+IDAgJiYgKGJvYXJkW2EgLSAxXVtiXS5oYXNTaGlwUGFydCB8fCBib2FyZFthIC0gMV1bYl0uaGFzQmxvY2spKVxuICAgICAgICB8fCAoYSArIGxlbmd0aCA8IDEwICYmIChib2FyZFthICsgbGVuZ3RoXVtiXS5oYXNTaGlwUGFydCB8fCBib2FyZFthICsgbGVuZ3RoXVtiXS5oYXNCbG9jaykpXG4gICAgICAgIHx8IChhID4gMCAmJiBiID4gMCAmJiAoYm9hcmRbYSAtIDFdW2IgLSAxXS5oYXNTaGlwUGFydCB8fCBib2FyZFthIC0gMV1bYiAtIDFdLmhhc0Jsb2NrKSlcbiAgICAgICAgfHwgKGEgPiAwICYmIGIgPCA5ICYmIChib2FyZFthIC0gMV1bYiArIDFdLmhhc1NoaXBQYXJ0IHx8IGJvYXJkW2EgLSAxXVtiICsgMV0uaGFzQmxvY2spKVxuICAgICAgICB8fCAoYSArIGxlbmd0aCA8IDEwICYmIGIgPiAwICYmIChib2FyZFthICsgbGVuZ3RoXVtiIC0gMV0uaGFzU2hpcFBhcnQgfHwgYm9hcmRbYSArIGxlbmd0aF1bYiAtIDFdLmhhc0Jsb2NrKSlcbiAgICAgICAgfHwgKGEgKyBsZW5ndGggPCAxMCAmJiBiIDwgOSAmJiAoYm9hcmRbYSArIGxlbmd0aF1bYiArIDFdLmhhc1NoaXBQYXJ0IHx8IGJvYXJkW2EgKyBsZW5ndGhdW2IgKyAxXS5oYXNCbG9jaykpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuICdUb28gQ2xvc2UnO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAobGVuZ3RoKTtcbiAgICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcblxuICAgICAgLy8gUGxhY2UgdGhlIHNoaXAgcGFydHNcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYm9hcmRbYSArIGldW2JdLmhhc1NoaXBQYXJ0ID0gdHJ1ZTtcbiAgICAgICAgYm9hcmRbYSArIGldW2JdLm9iamVjdCA9IHNoaXAuc2hpcFBhcnRzW2ldO1xuXG4gICAgICAgIGlmIChiID4gMCkge1xuICAgICAgICAgIGJvYXJkW2EgKyBpXVtiIC0gMV0uaGFzQmxvY2sgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChiIDwgOSkge1xuICAgICAgICAgIGJvYXJkW2EgKyBpXVtiICsgMV0uaGFzQmxvY2sgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEJsb2NrIHRoZSBjZWxscyBiZWZvcmUgYW5kIGFmdGVyIHRoZSBzaGlwXG4gICAgICBpZiAoYSA+IDApIHtcbiAgICAgICAgYm9hcmRbYSAtIDFdW2JdLmhhc0Jsb2NrID0gdHJ1ZTtcbiAgICAgICAgaWYgKGIgPiAwKSBib2FyZFthIC0gMV1bYiAtIDFdLmhhc0Jsb2NrID0gdHJ1ZTtcbiAgICAgICAgaWYgKGIgPCA5KSBib2FyZFthIC0gMV1bYiArIDFdLmhhc0Jsb2NrID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChhICsgbGVuZ3RoIDwgMTApIHtcbiAgICAgICAgYm9hcmRbYSArIGxlbmd0aF1bYl0uaGFzQmxvY2sgPSB0cnVlO1xuICAgICAgICBpZiAoYiA+IDApIGJvYXJkW2EgKyBsZW5ndGhdW2IgLSAxXS5oYXNCbG9jayA9IHRydWU7XG4gICAgICAgIGlmIChiIDwgOSkgYm9hcmRbYSArIGxlbmd0aF1bYiArIDFdLmhhc0Jsb2NrID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJvYXJkO1xuICAgIH0sXG5cbiAgICByZWNlaXZlQXR0YWNrKGEsIGIpIHtcbiAgICAgIGNvbnN0IHsgYm9hcmQgfSA9IHRoaXM7XG4gICAgICBjb25zdCBjZWxsID0gYm9hcmRbYV1bYl07XG4gICAgICBpZiAoY2VsbC53YXNIaXQpIHJldHVybiAnYWxyZWFkeSBoaXQnO1xuXG4gICAgICBjZWxsLndhc0hpdCA9IHRydWU7XG4gICAgICBpZiAoY2VsbC5oYXNTaGlwUGFydCkge1xuICAgICAgICBjZWxsLm9iamVjdC5pc0hpdCgpO1xuICAgICAgICByZXR1cm4gY2VsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjZWxsO1xuICAgIH0sXG5cbiAgICBpc0FsbFN1bmsoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc0l0U3VuaygpKTtcbiAgICB9LFxuXG4gIH07XG59XG4iLCJpbXBvcnQgZGlzcGxheUJvYXJkIGZyb20gJy4vZGlzcGxheUJvYXJkJztcbmltcG9ydCByYW5kb21HYW1lIGZyb20gJy4vcmFuZG9tR2FtZSc7XG5pbXBvcnQgJy4vc3R5bGVzL2ludGVyZmFjZS5jc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaXNwbGF5R2FtZShnYW1lKSB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcbiAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnOyAvLyBDbGVhciB0aGUgY29udGFpbmVyIGF0IHRoZSBzdGFydFxuXG4gIC8vIFJlc2V0IGJ1dHRvblxuICBjb25zdCBtaWRkbGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgcmFuZG9tQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIHJhbmRvbUJ0bi5jbGFzc0xpc3QuYWRkKCdyYW5kb21CdG4nKTtcbiAgcmFuZG9tQnRuLnRleHRDb250ZW50ID0gJ1Jlc2V0JztcbiAgcmFuZG9tQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICBkaXNwbGF5R2FtZShyYW5kb21HYW1lKCkpO1xuICB9KTtcblxuICAvLyBnYW1lIHN0YXRlXG4gIGNvbnN0IHN0YXR1cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gIHN0YXR1cy5jbGFzc0xpc3QuYWRkKCdzdGF0dXMnKTtcbiAgc3RhdHVzLnRleHRDb250ZW50ID0gJ0xvYWRpbmcnO1xuXG4gIC8vIFRpdGxlc1xuICBjb25zdCBwbGF5ZXJCb2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgcGxheWVyQm9hcmRUaXRsZS50ZXh0Q29udGVudCA9IGAke2dhbWUucGxheWVyLm5hbWV9J3MgQm9hcmRgO1xuICBwbGF5ZXJCb2FyZFRpdGxlLmNsYXNzTGlzdC5hZGQoJ3BsYXllclRpdGxlJyk7XG4gIGNvbnN0IGNvbXBCb2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgY29tcEJvYXJkVGl0bGUudGV4dENvbnRlbnQgPSAnQ29tcHV0ZXIgQm9hcmQnO1xuICBjb21wQm9hcmRUaXRsZS5jbGFzc0xpc3QuYWRkKCdwbGF5ZXJUaXRsZScpO1xuXG4gIC8vIEJvYXJkc1xuICBjb25zdCBwbGF5ZXJCb2FyZERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwbGF5ZXJCb2FyZERpdi5jbGFzc0xpc3QuYWRkKCdib2FyZFBsYXllcicpO1xuICBjb25zdCBjb21wdXRlckJvYXJkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbXB1dGVyQm9hcmREaXYuY2xhc3NMaXN0LmFkZCgnYm9hcmRDb21wdXRlcicpO1xuXG4gIC8vIFBsYWNlIGJvYXJkcyBpbnNpZGUgZGl2XG4gIGRpc3BsYXlCb2FyZChnYW1lLCBwbGF5ZXJCb2FyZERpdiwgY29tcHV0ZXJCb2FyZERpdiwgc3RhdHVzKTtcblxuICAvLyBEaXYgdG8gcHV0IHRoZW0gYm90aCBpblxuICBjb25zdCBkaXZQbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGl2UGxheWVyLmFwcGVuZENoaWxkKHBsYXllckJvYXJkVGl0bGUpO1xuICBkaXZQbGF5ZXIuYXBwZW5kQ2hpbGQocGxheWVyQm9hcmREaXYpO1xuXG4gIC8vIENvbXBcbiAgY29uc3QgY29tcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb21wRGl2LmFwcGVuZENoaWxkKGNvbXBCb2FyZFRpdGxlKTtcbiAgY29tcERpdi5hcHBlbmRDaGlsZChjb21wdXRlckJvYXJkRGl2KTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2UGxheWVyKTtcbiAgbWlkZGxlRGl2LmFwcGVuZENoaWxkKHJhbmRvbUJ0bik7XG5cbiAgbWlkZGxlRGl2LmFwcGVuZENoaWxkKHN0YXR1cyk7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1pZGRsZURpdik7XG5cbiAgLy8gY29udGFpbmVyLmFwcGVuZENoaWxkKHBsYWNlU2hpcCk7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbXBEaXYpO1xufVxuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlYWxQbGF5ZXIobmFtZSkge1xuICBjb25zdCBnYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gIHJldHVybiB7XG4gICAgZ2FtZWJvYXJkLFxuICAgIG5hbWUsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb21wdXRlcigpIHtcbiAgY29uc3QgZ2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICByZXR1cm4ge1xuICAgIGdhbWVib2FyZCxcbiAgICBuYW1lOiAnQ29tcHV0ZXInLFxuICB9O1xufVxuIiwiaW1wb3J0IHJlYWxQbGF5ZXIsIHsgQ29tcHV0ZXIgfSBmcm9tICcuL3BsYXllcic7XG5cbi8vIFV0aWxpdHkgZnVuY3Rpb25zXG5mdW5jdGlvbiBnZXRSYW5kb21JbnQobWluLCBtYXgpIHtcbiAgbWluID0gTWF0aC5jZWlsKG1pbik7XG4gIG1heCA9IE1hdGguZmxvb3IobWF4KTtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG59XG5cbmZ1bmN0aW9uIHJhbmRvbWl6ZUZ1bmMoZnVuYzEsIGZ1bmMyKSB7XG4gIHJldHVybiBNYXRoLnJhbmRvbSgpIDwgMC41ID8gZnVuYzEgOiBmdW5jMjtcbn1cblxuLy8gU2hpcCBwbGFjZW1lbnQgZnVuY3Rpb24gd2l0aCByZXRyeSBsb2dpY1xuZnVuY3Rpb24gcGxhY2VTaGlwcyhjcmVhdGVHYW1lYm9hcmQsIHNoaXBTaXplcykge1xuICBjb25zdCBtYXhPdmVyYWxsQXR0ZW1wdHMgPSAxMDsgLy8gTWF4aW11bSBvdmVyYWxsIGF0dGVtcHRzIHRvIHBsYWNlIGFsbCBzaGlwc1xuICBsZXQgb3ZlcmFsbEF0dGVtcHRzID0gMDtcblxuICB3aGlsZSAob3ZlcmFsbEF0dGVtcHRzIDwgbWF4T3ZlcmFsbEF0dGVtcHRzKSB7XG4gICAgbGV0IGFsbFNoaXBzUGxhY2VkID0gdHJ1ZTtcbiAgICBjb25zdCBnYW1lYm9hcmQgPSBjcmVhdGVHYW1lYm9hcmQoKTtcbiAgICBmb3IgKGNvbnN0IHNpemUgb2Ygc2hpcFNpemVzKSB7XG4gICAgICBsZXQgcGxhY2VkID0gZmFsc2U7XG4gICAgICBsZXQgYXR0ZW1wdHMgPSAwOyAvLyBBZGQgYW4gYXR0ZW1wdCBjb3VudGVyXG4gICAgICBjb25zdCBtYXhBdHRlbXB0cyA9IDEwMDsgLy8gU2V0IGEgbWF4aW11bSBudW1iZXIgb2YgYXR0ZW1wdHNcblxuICAgICAgd2hpbGUgKCFwbGFjZWQgJiYgYXR0ZW1wdHMgPCBtYXhBdHRlbXB0cykge1xuICAgICAgICBhdHRlbXB0cysrO1xuICAgICAgICBjb25zdCBhID0gZ2V0UmFuZG9tSW50KDAsIDkpO1xuICAgICAgICBjb25zdCBiID0gZ2V0UmFuZG9tSW50KDAsIDkpO1xuICAgICAgICBjb25zdCBwbGFjZW1lbnRGdW5jdGlvbiA9IHJhbmRvbWl6ZUZ1bmMoXG4gICAgICAgICAgKCkgPT4gZ2FtZWJvYXJkLnBsYWNlU2hpcFZlcnRpY2FsbHkoYSwgYiwgc2l6ZSksXG4gICAgICAgICAgKCkgPT4gZ2FtZWJvYXJkLnBsYWNlU2hpcEhvcml6b250YWxseShhLCBiLCBzaXplKSxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcGxhY2VtZW50RnVuY3Rpb24oKTtcbiAgICAgICAgaWYgKHJlc3VsdCAhPT0gJ091dCBPZiBCb3VuZHMnICYmIHJlc3VsdCAhPT0gJ1RvbyBDbG9zZScpIHtcbiAgICAgICAgICBwbGFjZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghcGxhY2VkKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byBwbGFjZSBzaGlwIG9mIHNpemUgJHtzaXplfSBhZnRlciAke2F0dGVtcHRzfSBhdHRlbXB0cy5gKTtcbiAgICAgICAgYWxsU2hpcHNQbGFjZWQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGFsbFNoaXBzUGxhY2VkKSB7XG4gICAgICByZXR1cm4gZ2FtZWJvYXJkO1xuICAgIH1cblxuICAgIG92ZXJhbGxBdHRlbXB0cysrO1xuICAgIGNvbnNvbGUud2FybihgUmV0cnlpbmcgc2hpcCBwbGFjZW1lbnQuIE92ZXJhbGwgYXR0ZW1wdCAke292ZXJhbGxBdHRlbXB0c31gKTtcbiAgfVxuXG4gIGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byBwbGFjZSBhbGwgc2hpcHMgYWZ0ZXIgJHttYXhPdmVyYWxsQXR0ZW1wdHN9IG92ZXJhbGwgYXR0ZW1wdHMuYCk7XG4gIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHBsYWNlIGFsbCBzaGlwcycpO1xufVxuXG4vLyBHYW1lIGluaXRpYWxpemF0aW9uIGZ1bmN0aW9uXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5kb21HYW1lKCkge1xuICBjb25zdCBjb21wdXRlciA9IG5ldyBDb21wdXRlcigpO1xuICBjb25zdCBwbGF5ZXIgPSBuZXcgcmVhbFBsYXllcignTWFya28nKTtcblxuICBjb25zdCBzaGlwU2l6ZXMgPSBbNiwgNSwgNCwgMywgMiwgMV07XG5cbiAgY29tcHV0ZXIuZ2FtZWJvYXJkID0gcGxhY2VTaGlwcygoKSA9PiBuZXcgQ29tcHV0ZXIoKS5nYW1lYm9hcmQsIHNoaXBTaXplcyk7XG5cbiAgcGxheWVyLmdhbWVib2FyZCA9IHBsYWNlU2hpcHMoKCkgPT4gbmV3IHJlYWxQbGF5ZXIoJ01hcmtvJykuZ2FtZWJvYXJkLCBzaGlwU2l6ZXMpOyAvLyBDcmVhdGUgYSBuZXcgZ2FtZWJvYXJkIGluc3RhbmNlXG5cbiAgcmV0dXJuIHtcbiAgICBjb21wdXRlcixcbiAgICBwbGF5ZXIsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21Db21wdXRlck9ubHkoKSB7XG4gIGNvbnN0IGNvbXB1dGVyID0gbmV3IENvbXB1dGVyKCk7XG4gIGNvbnN0IHBsYXllciA9IG5ldyByZWFsUGxheWVyKCdNYXJrbycpO1xuXG4gIGNvbnN0IHNoaXBTaXplcyA9IFs2LCA1LCA0LCAzLCAyLCAxXTtcblxuICBjb21wdXRlci5nYW1lYm9hcmQgPSBwbGFjZVNoaXBzKCgpID0+IG5ldyBDb21wdXRlcigpLmdhbWVib2FyZCwgc2hpcFNpemVzKTtcblxuICByZXR1cm4ge1xuICAgIGNvbXB1dGVyLFxuICAgIHBsYXllcixcbiAgfTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNoaXAobGVuZ3RoKSB7XG4gIGNvbnN0IHNoaXBQYXJ0cyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgbmV3UGFydCA9IFNoaXBQYXJ0KCk7XG4gICAgc2hpcFBhcnRzLnB1c2gobmV3UGFydCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGxlbmd0aCxcbiAgICBzaGlwUGFydHMsXG5cbiAgICBpc0l0U3VuaygpIHtcbiAgICAgIC8vIENoZWNrIGlmIGFsbCBwYXJ0cyBhcmUgc3Vua1xuICAgICAgY29uc3QgYWxsUGFydHNTdW5rID0gdGhpcy5zaGlwUGFydHMuZXZlcnkoKHBhcnQpID0+IHBhcnQuaXNTdW5rKTtcbiAgICAgIGlmIChhbGxQYXJ0c1N1bmspIHtcbiAgICAgICAgdGhpcy5pc1N1bmsgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gU2hpcFBhcnQoKSB7XG4gIHJldHVybiB7XG4gICAgaGl0VGltZXM6IDAsXG4gICAgaXNTdW5rOiBmYWxzZSxcblxuICAgIGlzSGl0KCkge1xuICAgICAgaWYgKCF0aGlzLmlzU3Vuaykge1xuICAgICAgICB0aGlzLmhpdFRpbWVzKys7XG4gICAgICAgIHRoaXMuaXNTdW5rID0gdHJ1ZTsgLy8gQXNzdW1lIHRoZSBwYXJ0IGlzIGNvbnNpZGVyZWQgc3VuayBhZnRlciBvbmUgaGl0XG4gICAgICAgIHJldHVybiAnaGl0JztcbiAgICAgIH1cbiAgICAgIHJldHVybiAnYWxyZWFkeSBzdW5rJztcbiAgICB9LFxuICB9O1xufVxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qIGRpdiB7XG4gIGJvcmRlcjogMXB4IGJsYWNrIHNvbGlkO1xufSAqL1xuYm9keSB7XG4gIG1hcmdpbjogMDsgLyogUmVtb3ZlIGRlZmF1bHQgbWFyZ2luICovXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig4MiwgMjE1LCAyNTUpO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGhlaWdodDogMTAwdmg7XG4gIHdpZHRoOiAxMDB2dztcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgLyogUHJldmVudCBzY3JvbGxpbmcgKi9cbn1cblxuI3RpdGxlIHtcbiAgY29sb3I6IHJnYigwLCAwLCAwKTtcbiAgZm9udC1zaXplOiA1cmVtO1xufVxuXG4ucGxheWVyVGl0bGUge1xuICBmb250LXNpemU6IDNyZW07XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgY29sb3I6IHJnYig0LCA1LCA1KTtcbn1cblxuLnN0YXR1cyB7XG4gIGNvbG9yOiByZ2IoMTEsIDgsIDgpO1xuICBmb250LWZhbWlseTogXCJUaW1lcyBOZXcgUm9tYW5cIiwgVGltZXMsIHNlcmlmO1xuICBmb250LXNpemU6IDNyZW07XG4gIHBhZGRpbmc6IDEwcHg7XG59XG5cbiNjb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmJvYXJkUGxheWVyIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xuICBnYXA6IDJweDsgLyogQWRqdXN0IHRoZSBnYXAgYmV0d2VlbiBjZWxscyAqL1xuICBtYXJnaW46IDA7IC8qIEVuc3VyZSBubyBkZWZhdWx0IG1hcmdpbiAqL1xuICBwYWRkaW5nOiAwOyAvKiBFbnN1cmUgbm8gZGVmYXVsdCBwYWRkaW5nICovXG4gIHdpZHRoOiBmaXQtY29udGVudDtcbn1cblxuLmNlbGwge1xuICB3aWR0aDogMy41cmVtO1xuICBoZWlnaHQ6IDMuNXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgIzAwMDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogSW5jbHVkZSBwYWRkaW5nIGFuZCBib3JkZXIgaW4gdGhlIGVsZW1lbnQncyB0b3RhbCB3aWR0aCBhbmQgaGVpZ2h0ICovXG4gIG1hcmdpbjogMDsgLyogRW5zdXJlIG5vIGRlZmF1bHQgbWFyZ2luICovXG4gIHBhZGRpbmc6IDA7IC8qIEVuc3VyZSBubyBkZWZhdWx0IHBhZGRpbmcgKi9cbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGZvbnQtc2l6ZTogMS4zLjVyZW07XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuXG4uY2VsbEhhc1NoaXAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNCwgMCwgMjU1KTtcbiAgd2lkdGg6IDMuNXJlbTtcbiAgaGVpZ2h0OiAzLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIEluY2x1ZGUgcGFkZGluZyBhbmQgYm9yZGVyIGluIHRoZSBlbGVtZW50J3MgdG90YWwgd2lkdGggYW5kIGhlaWdodCAqL1xuICBtYXJnaW46IDA7IC8qIEVuc3VyZSBubyBkZWZhdWx0IG1hcmdpbiAqL1xuICBwYWRkaW5nOiAwO1xufVxuLmNlbGw6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmJvYXJkQ29tcHV0ZXIge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XG4gIGdhcDogMnB4OyAvKiBBZGp1c3QgdGhlIGdhcCBiZXR3ZWVuIGNlbGxzICovXG4gIG1hcmdpbjogMDsgLyogRW5zdXJlIG5vIGRlZmF1bHQgbWFyZ2luICovXG4gIHBhZGRpbmc6IDA7IC8qIEVuc3VyZSBubyBkZWZhdWx0IHBhZGRpbmcgKi9cbiAgd2lkdGg6IGZpdC1jb250ZW50O1xufVxuXG4ucGxheUdhbWVCdG4ge1xuICBtYXJnaW4tdG9wOiA1cmVtO1xuICB3aWR0aDogMjByZW07XG4gIGhlaWdodDogMTByZW07XG4gIGZvbnQtc2l6ZTogMy41cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uaGFzQmxvY2sge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7IC8qIE1ha2UgdGhlIGNvbnRhaW5lciBwb3NpdGlvbi1yZWxhdGl2ZSAqL1xufVxuXG4uaGFzQmxvY2s6OmFmdGVyIHtcbiAgY29udGVudDogXCJYXCI7IC8qIEFkZCB0aGUgWCBjb250ZW50ICovXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTsgLyogUG9zaXRpb24gdGhlIFggcmVsYXRpdmUgdG8gdGhlIGNvbnRhaW5lciAqL1xuICB0b3A6IDUwJTsgLyogQWxpZ24gdGhlIFggdmVydGljYWxseSBpbiB0aGUgbWlkZGxlICovXG4gIGxlZnQ6IDUwJTsgLyogQWxpZ24gdGhlIFggaG9yaXpvbnRhbGx5IGluIHRoZSBtaWRkbGUgKi9cbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7IC8qIENlbnRlciB0aGUgWCAqL1xuICBmb250LXNpemU6IDEycHg7IC8qIEFkanVzdCB0aGUgZm9udCBzaXplIG9mIHRoZSBYICovXG4gIGNvbG9yOiByZ2IoMCwgMCwgMCk7IC8qIFNldCB0aGUgY29sb3Igb2YgdGhlIFggKi9cbn1cblxuLnJhbmRvbUJ0biB7XG4gIHdpZHRoOiAyMHJlbTtcbiAgaGVpZ2h0OiAzLjVyZW07XG4gIGZvbnQtc2l6ZTogMi41cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5yYW5kb21HQnRuIHtcbiAgd2lkdGg6IDIwcmVtO1xuICBoZWlnaHQ6IDUuNXJlbTtcbiAgZm9udC1zaXplOiAzLjVyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9pbnRlcmZhY2UuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOztHQUVHO0FBQ0g7RUFDRSxTQUFTLEVBQUUsMEJBQTBCO0VBQ3JDLG1DQUFtQztFQUNuQyxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLFlBQVk7RUFDWixnQkFBZ0IsRUFBRSxzQkFBc0I7QUFDMUM7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLDRDQUE0QztFQUM1QyxlQUFlO0VBQ2YsYUFBYTtBQUNmOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDZCQUE2QjtFQUM3QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0NBQXNDO0VBQ3RDLG1DQUFtQztFQUNuQyxRQUFRLEVBQUUsaUNBQWlDO0VBQzNDLFNBQVMsRUFBRSw2QkFBNkI7RUFDeEMsVUFBVSxFQUFFLDhCQUE4QjtFQUMxQyxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsY0FBYztFQUNkLHNCQUFzQjtFQUN0QixzQkFBc0IsRUFBRSx1RUFBdUU7RUFDL0YsU0FBUyxFQUFFLDZCQUE2QjtFQUN4QyxVQUFVLEVBQUUsOEJBQThCO0VBQzFDLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsZ0NBQWdDO0VBQ2hDLGFBQWE7RUFDYixjQUFjO0VBQ2Qsc0JBQXNCO0VBQ3RCLHNCQUFzQixFQUFFLHVFQUF1RTtFQUMvRixTQUFTLEVBQUUsNkJBQTZCO0VBQ3hDLFVBQVU7QUFDWjtBQUNBO0VBQ0UscUJBQXFCO0VBQ3JCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0NBQXNDO0VBQ3RDLG1DQUFtQztFQUNuQyxRQUFRLEVBQUUsaUNBQWlDO0VBQzNDLFNBQVMsRUFBRSw2QkFBNkI7RUFDeEMsVUFBVSxFQUFFLDhCQUE4QjtFQUMxQyxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsWUFBWTtFQUNaLGFBQWE7RUFDYixpQkFBaUI7RUFDakIsZUFBZTtBQUNqQjtBQUNBO0VBQ0Usa0JBQWtCLEVBQUUseUNBQXlDO0FBQy9EOztBQUVBO0VBQ0UsWUFBWSxFQUFFLHNCQUFzQjtFQUNwQyxrQkFBa0IsRUFBRSw2Q0FBNkM7RUFDakUsUUFBUSxFQUFFLHlDQUF5QztFQUNuRCxTQUFTLEVBQUUsMkNBQTJDO0VBQ3RELGdDQUFnQyxFQUFFLGlCQUFpQjtFQUNuRCxlQUFlLEVBQUUsa0NBQWtDO0VBQ25ELG1CQUFtQixFQUFFLDJCQUEyQjtBQUNsRDs7QUFFQTtFQUNFLFlBQVk7RUFDWixjQUFjO0VBQ2QsaUJBQWlCO0VBQ2pCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osY0FBYztFQUNkLGlCQUFpQjtFQUNqQixlQUFlO0FBQ2pCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIGRpdiB7XFxuICBib3JkZXI6IDFweCBibGFjayBzb2xpZDtcXG59ICovXFxuYm9keSB7XFxuICBtYXJnaW46IDA7IC8qIFJlbW92ZSBkZWZhdWx0IG1hcmdpbiAqL1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDgyLCAyMTUsIDI1NSk7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgLyogUHJldmVudCBzY3JvbGxpbmcgKi9cXG59XFxuXFxuI3RpdGxlIHtcXG4gIGNvbG9yOiByZ2IoMCwgMCwgMCk7XFxuICBmb250LXNpemU6IDVyZW07XFxufVxcblxcbi5wbGF5ZXJUaXRsZSB7XFxuICBmb250LXNpemU6IDNyZW07XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBjb2xvcjogcmdiKDQsIDUsIDUpO1xcbn1cXG5cXG4uc3RhdHVzIHtcXG4gIGNvbG9yOiByZ2IoMTEsIDgsIDgpO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJUaW1lcyBOZXcgUm9tYW5cXFwiLCBUaW1lcywgc2VyaWY7XFxuICBmb250LXNpemU6IDNyZW07XFxuICBwYWRkaW5nOiAxMHB4O1xcbn1cXG5cXG4jY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5ib2FyZFBsYXllciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIGdhcDogMnB4OyAvKiBBZGp1c3QgdGhlIGdhcCBiZXR3ZWVuIGNlbGxzICovXFxuICBtYXJnaW46IDA7IC8qIEVuc3VyZSBubyBkZWZhdWx0IG1hcmdpbiAqL1xcbiAgcGFkZGluZzogMDsgLyogRW5zdXJlIG5vIGRlZmF1bHQgcGFkZGluZyAqL1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbn1cXG5cXG4uY2VsbCB7XFxuICB3aWR0aDogMy41cmVtO1xcbiAgaGVpZ2h0OiAzLjVyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogSW5jbHVkZSBwYWRkaW5nIGFuZCBib3JkZXIgaW4gdGhlIGVsZW1lbnQncyB0b3RhbCB3aWR0aCBhbmQgaGVpZ2h0ICovXFxuICBtYXJnaW46IDA7IC8qIEVuc3VyZSBubyBkZWZhdWx0IG1hcmdpbiAqL1xcbiAgcGFkZGluZzogMDsgLyogRW5zdXJlIG5vIGRlZmF1bHQgcGFkZGluZyAqL1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IDEuMy41cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxufVxcblxcbi5jZWxsSGFzU2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNCwgMCwgMjU1KTtcXG4gIHdpZHRoOiAzLjVyZW07XFxuICBoZWlnaHQ6IDMuNXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiBJbmNsdWRlIHBhZGRpbmcgYW5kIGJvcmRlciBpbiB0aGUgZWxlbWVudCdzIHRvdGFsIHdpZHRoIGFuZCBoZWlnaHQgKi9cXG4gIG1hcmdpbjogMDsgLyogRW5zdXJlIG5vIGRlZmF1bHQgbWFyZ2luICovXFxuICBwYWRkaW5nOiAwO1xcbn1cXG4uY2VsbDpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5ib2FyZENvbXB1dGVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ2FwOiAycHg7IC8qIEFkanVzdCB0aGUgZ2FwIGJldHdlZW4gY2VsbHMgKi9cXG4gIG1hcmdpbjogMDsgLyogRW5zdXJlIG5vIGRlZmF1bHQgbWFyZ2luICovXFxuICBwYWRkaW5nOiAwOyAvKiBFbnN1cmUgbm8gZGVmYXVsdCBwYWRkaW5nICovXFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxufVxcblxcbi5wbGF5R2FtZUJ0biB7XFxuICBtYXJnaW4tdG9wOiA1cmVtO1xcbiAgd2lkdGg6IDIwcmVtO1xcbiAgaGVpZ2h0OiAxMHJlbTtcXG4gIGZvbnQtc2l6ZTogMy41cmVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4uaGFzQmxvY2sge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyAvKiBNYWtlIHRoZSBjb250YWluZXIgcG9zaXRpb24tcmVsYXRpdmUgKi9cXG59XFxuXFxuLmhhc0Jsb2NrOjphZnRlciB7XFxuICBjb250ZW50OiBcXFwiWFxcXCI7IC8qIEFkZCB0aGUgWCBjb250ZW50ICovXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7IC8qIFBvc2l0aW9uIHRoZSBYIHJlbGF0aXZlIHRvIHRoZSBjb250YWluZXIgKi9cXG4gIHRvcDogNTAlOyAvKiBBbGlnbiB0aGUgWCB2ZXJ0aWNhbGx5IGluIHRoZSBtaWRkbGUgKi9cXG4gIGxlZnQ6IDUwJTsgLyogQWxpZ24gdGhlIFggaG9yaXpvbnRhbGx5IGluIHRoZSBtaWRkbGUgKi9cXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpOyAvKiBDZW50ZXIgdGhlIFggKi9cXG4gIGZvbnQtc2l6ZTogMTJweDsgLyogQWRqdXN0IHRoZSBmb250IHNpemUgb2YgdGhlIFggKi9cXG4gIGNvbG9yOiByZ2IoMCwgMCwgMCk7IC8qIFNldCB0aGUgY29sb3Igb2YgdGhlIFggKi9cXG59XFxuXFxuLnJhbmRvbUJ0biB7XFxuICB3aWR0aDogMjByZW07XFxuICBoZWlnaHQ6IDMuNXJlbTtcXG4gIGZvbnQtc2l6ZTogMi41cmVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4ucmFuZG9tR0J0biB7XFxuICB3aWR0aDogMjByZW07XFxuICBoZWlnaHQ6IDUuNXJlbTtcXG4gIGZvbnQtc2l6ZTogMy41cmVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbnRlcmZhY2UuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5vcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW50ZXJmYWNlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IGRpc3BsYXlHYW1lIGZyb20gJy4vaW50ZXJmYWNlJztcbmltcG9ydCAnLi9zdHlsZXMvaW50ZXJmYWNlLmNzcyc7XG5pbXBvcnQgcmFuZG9tR2FtZSwgeyByYW5kb21Db21wdXRlck9ubHkgfSBmcm9tICcuL3JhbmRvbUdhbWUnO1xuXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XG5cbmNvbnN0IHBsYXlSYW5kb21HYW1lQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5wbGF5UmFuZG9tR2FtZUJ0bi5jbGFzc0xpc3QuYWRkKCdyYW5kb21HQnRuJyk7XG5wbGF5UmFuZG9tR2FtZUJ0bi50ZXh0Q29udGVudCA9ICdQbGF5IEdhbWUnO1xucGxheVJhbmRvbUdhbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJzsgLy8gQ2xlYXIgdGhlIGNvbnRhaW5lclxuICBkaXNwbGF5R2FtZShyYW5kb21HYW1lKCkpO1xufSk7XG5cbmNvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5UmFuZG9tR2FtZUJ0bik7XG4iXSwibmFtZXMiOlsiZGlzcGxheUdhbWUiLCJyYW5kb21HYW1lIiwiZ2V0UmFuZG9tSW50IiwibWluIiwibWF4IiwiTWF0aCIsImNlaWwiLCJmbG9vciIsInJhbmRvbSIsInVwZGF0ZVN0YXR1cyIsInBsYXllckdhbWVCb2FyZCIsInN0YXR1cyIsImNvbXB1dGVyR2FtZUJvYXJkIiwiaXNQbGF5ZXJUdXJuIiwiaXNBbGxTdW5rIiwidGV4dENvbnRlbnQiLCJzZXRUaW1lb3V0IiwiY2xlYXJCb2FyZCIsImRpdiIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsInJlbmRlckJvYXJkIiwiZ2FtZUJvYXJkIiwiY29udGFpbmVyIiwiaXNQbGF5ZXIiLCJoYW5kbGVDZWxsQ2xpY2siLCJib2FyZCIsImZvckVhY2giLCJyb3ciLCJyb3dJbmRleCIsInJvd0RpdiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImNvbCIsImNvbEluZGV4IiwiY2VsbCIsImhhc1NoaXBQYXJ0Iiwid2FzSGl0Iiwic3R5bGUiLCJiYWNrZ3JvdW5kIiwiZGF0YXNldCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhcHBlbmRDaGlsZCIsImRpc3BsYXlCb2FyZCIsImdhbWUiLCJkaXZDb250UCIsImRpdkNvbnRDIiwicGxheWVyIiwiZ2FtZWJvYXJkIiwiY29tcHV0ZXIiLCJyZWNlaXZlQXR0YWNrIiwiYSIsImIiLCJTaGlwIiwiR2FtZWJvYXJkIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwic2hpcHMiLCJyb3dBcnJheSIsIm9iamVjdCIsImhhc0Jsb2NrIiwicHVzaCIsInBsYWNlU2hpcFZlcnRpY2FsbHkiLCJpIiwic2hpcCIsInNoaXBQYXJ0cyIsInBsYWNlU2hpcEhvcml6b250YWxseSIsImlzSGl0IiwiZXZlcnkiLCJpc0l0U3VuayIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwibWlkZGxlRGl2IiwicmFuZG9tQnRuIiwicGxheWVyQm9hcmRUaXRsZSIsImNvbmNhdCIsIm5hbWUiLCJjb21wQm9hcmRUaXRsZSIsInBsYXllckJvYXJkRGl2IiwiY29tcHV0ZXJCb2FyZERpdiIsImRpdlBsYXllciIsImNvbXBEaXYiLCJyZWFsUGxheWVyIiwiQ29tcHV0ZXIiLCJyYW5kb21pemVGdW5jIiwiZnVuYzEiLCJmdW5jMiIsInBsYWNlU2hpcHMiLCJjcmVhdGVHYW1lYm9hcmQiLCJzaGlwU2l6ZXMiLCJtYXhPdmVyYWxsQXR0ZW1wdHMiLCJvdmVyYWxsQXR0ZW1wdHMiLCJfbG9vcCIsImFsbFNoaXBzUGxhY2VkIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsIl9sb29wMiIsInNpemUiLCJ2YWx1ZSIsInBsYWNlZCIsImF0dGVtcHRzIiwibWF4QXR0ZW1wdHMiLCJfbG9vcDMiLCJwbGFjZW1lbnRGdW5jdGlvbiIsInJlc3VsdCIsImNvbnNvbGUiLCJlcnJvciIsInMiLCJuIiwiZG9uZSIsImVyciIsImUiLCJmIiwidiIsIndhcm4iLCJfcmV0IiwiRXJyb3IiLCJyYW5kb21Db21wdXRlck9ubHkiLCJuZXdQYXJ0IiwiU2hpcFBhcnQiLCJhbGxQYXJ0c1N1bmsiLCJwYXJ0IiwiaXNTdW5rIiwiaGl0VGltZXMiLCJwbGF5UmFuZG9tR2FtZUJ0biJdLCJzb3VyY2VSb290IjoiIn0=