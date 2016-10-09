'use strict';
import utils from './utils'

const findCases = (node)=> {
    let cases = []
    node.children.forEach((n)=> {
        const name = (n.openingElement && n.openingElement.name && n.openingElement.name.name) ? n.openingElement.name.name : ''
        if (name == 'Case') {
            cases.push(n)
        } else if (name == 'Default') {
            cases.default = n
        }
    })
    return cases
}

const generateConditions = (_var, cases, t, i = 0)=> {
    const caseNode = cases[i]
    const value = utils.findNodeAttribute(caseNode, 'value')
    const caseValue = value.expression || value.value
    const expression = t.BinaryExpression('===', _var, caseValue)
    const trueChildren = t.ArrayExpression(utils.filterChildren(t, caseNode.children))
    let falseChildren
    if (i >= cases.length - 1) {
        const _defaultChildren = cases.default ? utils.filterChildren(t, cases.default.children) : []
        falseChildren = t.ArrayExpression(_defaultChildren)
    } else {
        falseChildren = generateConditions(_var, cases, t, i + 1)
    }
    return t.ConditionalExpression(expression, trueChildren, falseChildren)
}

const Switch = (path, t)=> {
    const node = path.node
    var _var = utils.findNodeAttribute(node, 'var')
    const cases = findCases(node)
    if (!cases.length) {
        path.remove()
        return null
    }
    const value = _var.expression || _val.value//表达式和常量两种形式
    return generateConditions(value, cases, t)
}

export default Switch
