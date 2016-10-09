'use strict';
import If from './If'
import Switch from './Switch'
import ForEach from './ForEach'

import utils from './utils'

export default function ({ types: t }) {
    return {
        visitor: {
            JSXElement: function (path) {
                var name = path.node.openingElement.name.name;
                let replace = null
                switch (name) {
                    case 'If':
                        replace = If(path, t)
                        break
                    case 'Else':
                        path.remove()
                        break
                    case 'Switch':
                        replace = Switch(path, t)
                        break
                    case 'ForEach':
                        replace = ForEach(path, t)
                        break
                }

                if (replace) {
                    if (utils.isTypeOf('string', replace)) {
                        path.replaceWithSourceString(replace)
                    } else {
                        path.replaceWith(replace)
                    }
                }
            }
        }
    }
}
