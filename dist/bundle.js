/** *** */ (() => { // webpackBootstrap
  const __webpack_exports__ = {};
  /*! **********************!*\
  !*** ./src/index.js ***!
  \********************* */
  function _typeof(o) {
    '@babel/helpers - typeof';

    return _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (o) { return typeof o; } : function (o) { return o && typeof Symbol === 'function' && o.constructor === Symbol && o !== Symbol.prototype ? 'symbol' : typeof o; }, _typeof(o);
  }
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  function _defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, 'prototype', { writable: false }); return Constructor; }
  function _toPropertyKey(t) { const i = _toPrimitive(t, 'string'); return _typeof(i) == 'symbol' ? i : `${i}`; }
  function _toPrimitive(t, r) { if (_typeof(t) != 'object' || !t) return t; const e = t[Symbol.toPrimitive]; if (void 0 !== e) { const i = e.call(t, r || 'default'); if (_typeof(i) != 'object') return i; throw new TypeError('@@toPrimitive must return a primitive value.'); } return (r === 'string' ? String : Number)(t); }
  // ES6+ syntax
  const Person = /* #__PURE__ */(function () {
    function Person(name, age) {
      _classCallCheck(this, Person);
      this.name = name;
      this.age = age;
    }
    return _createClass(Person, [{
      key: 'greet',
      value: function greet() {
        return 'Hello, my name is '.concat(this.name, " and I'm ").concat(this.age, ' years old.');
      },
    }]);
  }());
  const alice = new Person('Alice', 30);
  console.log(alice.greet());
/** *** */ })();

// # sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFBQSxJQUNNQSxNQUFNO0VBQ1YsU0FBQUEsT0FBWUMsSUFBSSxFQUFFQyxHQUFHLEVBQUU7SUFBQUMsZUFBQSxPQUFBSCxNQUFBO0lBQ3JCLElBQUksQ0FBQ0MsSUFBSSxHQUFHQSxJQUFJO0lBQ2hCLElBQUksQ0FBQ0MsR0FBRyxHQUFHQSxHQUFHO0VBQ2hCO0VBQUMsT0FBQUUsWUFBQSxDQUFBSixNQUFBO0lBQUFLLEdBQUE7SUFBQUMsS0FBQSxFQUVELFNBQUFDLE1BQUEsRUFBUTtNQUNOLDRCQUFBQyxNQUFBLENBQTRCLElBQUksQ0FBQ1AsSUFBSSxlQUFBTyxNQUFBLENBQVksSUFBSSxDQUFDTixHQUFHO0lBQzNEO0VBQUM7QUFBQTtBQUdILElBQU1PLEtBQUssR0FBRyxJQUFJVCxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztBQUNyQ1UsT0FBTyxDQUFDQyxHQUFHLENBQUNGLEtBQUssQ0FBQ0YsS0FBSyxDQUFDLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBFUzYrIHN5bnRheFxuY2xhc3MgUGVyc29uIHtcbiAgY29uc3RydWN0b3IobmFtZSwgYWdlKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmFnZSA9IGFnZTtcbiAgfVxuXG4gIGdyZWV0KCkge1xuICAgIHJldHVybiBgSGVsbG8sIG15IG5hbWUgaXMgJHt0aGlzLm5hbWV9IGFuZCBJJ20gJHt0aGlzLmFnZX0geWVhcnMgb2xkLmA7XG4gIH1cbn1cblxuY29uc3QgYWxpY2UgPSBuZXcgUGVyc29uKCdBbGljZScsIDMwKTtcbmNvbnNvbGUubG9nKGFsaWNlLmdyZWV0KCkpO1xuIl0sIm5hbWVzIjpbIlBlcnNvbiIsIm5hbWUiLCJhZ2UiLCJfY2xhc3NDYWxsQ2hlY2siLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsImdyZWV0IiwiY29uY2F0IiwiYWxpY2UiLCJjb25zb2xlIiwibG9nIl0sInNvdXJjZVJvb3QiOiIifQ==
