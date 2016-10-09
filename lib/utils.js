'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var isBlankCode = function isBlankCode(str, index) {
    return str.charCodeAt(index) == 10 /*enter*/ || str.charCodeAt(index) == 8629 /*↵*/ || str.charCodeAt(index) == 32;
};

var stringOpt = function stringOpt(str) {
    var firstIndex = null,
        lastIndex = null;
    for (var i = 0; i < str.length; i++) {
        var isBlank = isBlankCode(str, i);
        if (firstIndex === null) {
            if (!isBlank) {
                firstIndex = i;
                lastIndex = i + 1;
            }
        } else {
            if (!isBlank) {
                lastIndex = i + 1;
            }
        }
    }
    return firstIndex === null ? '' : str.substring(firstIndex, lastIndex);
};

var filterChildren = function filterChildren(t, children) {
    var childs = [];
    children.forEach(function (child) {
        if (child.type === 'JSXText') {
            var str = stringOpt(child.value);
            str.length && childs.push(t.StringLiteral(str));
        } else {
            childs.push(child);
        }
    });
    return childs;
};

var findNodeAttribute = function findNodeAttribute(node, attributeName) {
    var attrs = node.openingElement.attributes;
    var attr = attrs.find(function (at) {
        return at.name.name === attributeName;
    });
    if (!attr) {
        var tagName = node.openingElement.name.name ? node.openingElement.name.name : node.openingElement.name;
        throw new Error('Tag ' + tagName + ' need attribute named ' + attributeName);
    }

    return attr.value;
};

exports.default = {
    filterChildren: filterChildren,
    findNodeAttribute: findNodeAttribute,
    getIsTypeOf: function getIsTypeOf(type) {
        return function (obj) {
            return ('[object ' + type + ']').toLowerCase() === Object.prototype.toString.call(obj).toLowerCase();
        };
    },
    isTypeOf: function isTypeOf(type, obj) {
        return this.getIsTypeOf(type)(obj);
    }
};