# babel react 逻辑组件插件

## usage
1. `npm install babel-plugin-react-logic-component --dev`
2. 在你的.babelrc文件(或者webpack babel插件配置)中加入: `plugins: ["babel-plugin-react-logic-component"]`
3. 注意: 此插件须放在`"syntax-jsx", "transform-react-jsx"`插件之前使用

## 支持标签
1. If(Else)
2. Switch
3. ForEach

## API
### If
1. expression: 表达式, 如:x===1

### Else
只能在If之后出现,不然其中内容会被忽略

### Switch
1. var: 表达式,如: x或者this.test()等

### Switch > Case
只能在Switch节点中出现,不然会按照jsx默认处理按照react 类处理
1. value: 表达式, 如: 1或者"1"等

### Switch > Default
默认会匹配的分支, 只能在Switch节点中出现,不然会按照jsx默认处理按照react 类处理

### ForEach
ForEach会给内部节点自动注入两个变量,item:当前遍历到的数据节点, index: 当前的index

1. items: 表达式, 如: arr或者this.getList()等

## 示例

``` javascript
render() {
        var arr = [1, 2, 3, 4, 5, 6]
        return <div>
            content1
            <If expression={"1"=="123"}>
                content2
                <h1>content3</h1>
                <h2>content4</h2>
            </If>
            <Else>
                abc
                <div>content5</div>
                <div>content6</div>
            </Else>
            <Switch var={this.test()}>
                <Case value={1}>
                    <div>1111</div>
                    <h1>123</h1>
                </Case>
                <Case value={2}>
                    2222
                </Case>
                <Case value={3}>
                    2222
                </Case>
                <Default>
                    3333
                </Default>
            </Switch>
            <ForEach items={arr}>
                <p1>{item}</p1>
                <p2>{index}</p2>
            </ForEach>
        </div>
    }
```
