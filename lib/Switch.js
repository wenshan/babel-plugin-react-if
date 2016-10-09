'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findCases = function findCases(node) {
    var cases = [];
    node.children.forEach(function (n) {
        var name = n.openingElement && n.openingElement.name && n.openingElement.name.name ? n.openingElement.name.name : '';
        if (name == 'Case') {
            cases.push(n);
        } else if (name == 'Default') {
            cases.default = n;
        }
    });
    return cases;
};

var generateConditions = function generateConditions(_var, cases, t) {
    var i = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

    var caseNode = cases[i];
    var value = _utils2.default.findNodeAttribute(caseNode, 'value');
    var caseValue = value.expression || value.value;
    var expression = t.BinaryExpression('===', _var, caseValue);
    var trueChildren = t.ArrayExpression(_utils2.default.filterChildren(t, caseNode.children));
    var falseChildren = void 0;
    if (i >= cases.length - 1) {
        var _defaultChildren = cases.default ? _utils2.default.filterChildren(t, cases.default.children) : [];
        falseChildren = t.ArrayExpression(_defaultChildren);
    } else {
        falseChildren = generateConditions(_var, cases, t, i + 1);
    }
    return t.ConditionalExpression(expression, trueChildren, falseChildren);
};

var Switch = function Switch(path, t) {
    var node = path.node;
    var _var = _utils2.default.findNodeAttribute(node, 'var');
    var cases = findCases(node);
    if (!cases.length) {
        path.remove();
        return null;
    }
    var value = _var.expression || _val.value; //表达式和常量两种形式
    return generateConditions(value, cases, t);
};

exports.default = Switch;