const isBlankCode = (str, index)=> {
    return str.charCodeAt(index) == 10/*enter*/ || str.charCodeAt(index) == 8629/*↵*/ || str.charCodeAt(index) == 32
}

const stringOpt = (str)=> {
    let firstIndex = null, lastIndex = null
    for (let i = 0; i < str.length; i++) {
        const isBlank = isBlankCode(str, i)
        if (firstIndex === null) {
            if (!isBlank) {
                firstIndex = i
                lastIndex = i + 1
            }
        } else {
            if (!isBlank) {
                lastIndex = i + 1
            }
        }
    }
    return firstIndex === null ? '' : str.substring(firstIndex, lastIndex)
}

const filterChildren = (t, children) => {
    let childs = []
    children.forEach((child)=> {
        if (child.type === 'JSXText') {
            const str = stringOpt(child.value)
            str.length && childs.push(t.StringLiteral(str))
        } else {
            childs.push(child)
        }
    })
    return childs
}

const findNodeAttribute = (node, attributeName)=> {
    const attrs = node.openingElement.attributes
    let attr = attrs.find((at)=> {
        return at.name.name === attributeName
    })
    if (!attr) {
        let tagName = node.openingElement.name.name ? node.openingElement.name.name : node.openingElement.name
        throw new Error(`Tag ${tagName} need attribute named ${attributeName}`)
    }

    return attr.value
}

export default {
    filterChildren,
    findNodeAttribute,
    getIsTypeOf(type) {
        return (obj)=> {
            return `[object ${type}]`.toLowerCase() === Object.prototype.toString.call(obj).toLowerCase()
        }
    },
    isTypeOf(type, obj){
        return this.getIsTypeOf(type)(obj)
    }
}
