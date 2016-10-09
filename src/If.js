'use strict';
import utils from './utils'

const findElseNode = (path)=> {
    const node = path.node
    const start = node.start
    let elseNode = undefined
    let index = null
    path.parentPath.node.children.forEach((n, i)=> {
        if (index) {
            if (!elseNode && n.openingElement && n.openingElement.name && n.openingElement.name.name == 'Else') {
                elseNode = n
            }
        } else if (n.start === start) {
            index = i
        }
    })

    return elseNode
}

const If = (path, t)=> {
    const node = path.node
    const elseNode = findElseNode(path)
    var expression = utils.findNodeAttribute(node, 'expression')
    if (expression.expression) {
        expression = expression.expression
    } else {
        throw new Error('Attribute expression must be type of expression in tag If')
    }
    const trueChildren = t.ArrayExpression(utils.filterChildren(t, node.children))
    const falseChildren = t.ArrayExpression(utils.filterChildren(t, elseNode.children))
    return t.ConditionalExpression(expression, trueChildren, falseChildren)
}

export default If
