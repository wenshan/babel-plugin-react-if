'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findElseNode = function findElseNode(path) {
    var node = path.node;
    var start = node.start;
    var elseNode = undefined;
    var index = null;
    path.parentPath.node.children.forEach(function (n, i) {
        if (index) {
            if (!elseNode && n.openingElement && n.openingElement.name && n.openingElement.name.name == 'Else') {
                elseNode = n;
            }
        } else if (n.start === start) {
            index = i;
        }
    });

    return elseNode;
};

var If = function If(path, t) {
    var node = path.node;
    var elseNode = findElseNode(path);
    var expression = _utils2.default.findNodeAttribute(node, 'expression');
    if (expression.expression) {
        expression = expression.expression;
    } else {
        throw new Error('Attribute expression must be type of expression in tag If');
    }
    var trueChildren = t.ArrayExpression(_utils2.default.filterChildren(t, node.children));
    var falseChildren = t.ArrayExpression(_utils2.default.filterChildren(t, elseNode.children));
    return t.ConditionalExpression(expression, trueChildren, falseChildren);
};

exports.default = If;