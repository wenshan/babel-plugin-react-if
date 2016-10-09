'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateCallFn = function generateCallFn(node, t) {
    var arg1 = t.Identifier('item');
    var arg2 = t.Identifier('index');

    var body = t.ExpressionStatement(t.AssignmentExpression('=', t.Identifier('a'), t.CallExpression(t.MemberExpression(t.Identifier('a'), t.Identifier('concat'), false), _utils2.default.filterChildren(t, node.children))));
    var eachFn = t.FunctionExpression(null, [arg1, arg2], t.BlockStatement([body]));

    return t.FunctionExpression(null, [t.Identifier('_ARR_')], t.BlockStatement([
    //source code
    //var a = []
    t.VariableDeclaration('var', [t.VariableDeclarator(t.Identifier('a'), t.ArrayExpression([]))]),
    //source code
    //_ARR_.forEach(function(item){
    //    a = a.concat(node.children)
    //})
    t.ExpressionStatement(t.CallExpression(t.MemberExpression(t.Identifier('_ARR_'), t.Identifier('forEach')), [eachFn])),
    //source code
    //return a
    t.ReturnStatement(t.Identifier('a'))]));
};

var ForEach = function ForEach(path, t) {
    var node = path.node;
    var items = _utils2.default.findNodeAttribute(node, 'items');
    if (items.expression) {
        items = items.expression;
    } else {
        throw new Error('Attribute items must be type of Array in tag ForEach');
    }
    return t.CallExpression(generateCallFn(node, t), [items]);
};

exports.default = ForEach;