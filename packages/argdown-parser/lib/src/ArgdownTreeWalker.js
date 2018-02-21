"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventemitter = require("eventemitter3");

var _chevrotain = require("chevrotain");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArgdownTreeWalker = function (_EventEmitter) {
  _inherits(ArgdownTreeWalker, _EventEmitter);

  function ArgdownTreeWalker() {
    _classCallCheck(this, ArgdownTreeWalker);

    return _possibleConstructorReturn(this, (ArgdownTreeWalker.__proto__ || Object.getPrototypeOf(ArgdownTreeWalker)).apply(this, arguments));
  }

  _createClass(ArgdownTreeWalker, [{
    key: "walk",
    value: function walk(tree, data, logger) {
      this.visitNode(tree, null, null, data);
    }
  }, {
    key: "getTokenName",
    value: function getTokenName(tokenInstance) {
      return tokenInstance.tokenType.tokenName;
    }
  }, {
    key: "visitNode",
    value: function visitNode(node, parentNode, childIndex, data, logger) {
      if (node) {
        if (node.name) {
          this.emit(node.name + 'Entry', node, parentNode, childIndex, data, logger);
        } else {
          this.emit(node.tokenType.tokenName + 'Entry', node, parentNode, childIndex, data, logger);
        }

        if (node.children && node.children.length > 0) {
          for (var i = 0; i < node.children.length; i++) {
            var child = node.children[i];
            this.visitNode(child, node, i, data, logger);
          }
        }

        if (node.name) {
          this.emit(node.name + 'Exit', node, parentNode, childIndex, data, logger);
        } else {
          this.emit(node.tokenType.tokenName + 'Exit', node, parentNode, childIndex, data, logger);
        }
      }
    }
  }, {
    key: "capitalizeFirstLetter",
    value: function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }]);

  return ArgdownTreeWalker;
}(_eventemitter.EventEmitter);

module.exports = {
  ArgdownTreeWalker: ArgdownTreeWalker
};
//# sourceMappingURL=ArgdownTreeWalker.js.map