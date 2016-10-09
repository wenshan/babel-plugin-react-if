'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (_ref) {
    var t = _ref.types;

    return {
        visitor: {
            JSXElement: function JSXElement(path) {
                var name = path.node.openingElement.name.name;
                var replace = null;
                switch (name) {
                    case 'If':
                        replace = (0, _If2.default)(path, t);
                        break;
                    case 'Else':
                        path.remove();
                        break;
                    case 'Switch':
                        replace = (0, _Switch2.default)(path, t);
                        break;
                    case 'ForEach':
                        replace = (0, _ForEach2.default)(path, t);
                        break;
                }

                if (replace) {
                    if (_utils2.default.isTypeOf('string', replace)) {
                        path.replaceWithSourceString(replace);
                    } else {
                        path.replaceWith(replace);
                    }
                }
            }
        }
    };
};

var _If = require('./If');

var _If2 = _interopRequireDefault(_If);

var _Switch = require('./Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _ForEach = require('./ForEach');

var _ForEach2 = _interopRequireDefault(_ForEach);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }