# npm i react-native-validator

## 说明
* 这是一个类似jQuery.validator的表单校验工具
* [点击查看demo](https://github.com/MTTTM/react-native-async-validator/tree/master/src)
* 提供两种常用的校验方式（1.点击校验所有表单元素通过就提交，2.在输入表单过程中自动验证，如果所有表单验证通过按钮高亮可点击提交）
* 你可以覆盖所有样式
* 支持动态表单校验(包括数组和对象)
* 目前校验规则是写在elFormItem里面的，暂时不考虑在elForm上加
* [MP4演示需要科学上网，你也可以下载仓库里面的video.mp4](https://www.youtube.com/watch?v=smkNFiJhnF0&feature=youtu.be)
* 如果你npm下载后使用报错，建议拷贝包下面的src文件到你本地和你本地文件一样使用(目前我暂时无法解释为什么会如此)

## doc
* [中文](./README_CN.md)
* [EN](./README.md)

## 安装

```javascript
    npm i react-native-validator
```

## 基本使用

```javascript
      import Form from "react-native-validator"
      class App extends Component {
        constructor(props) {
            super(props);
            this.state = {
                dynamicValidateForm:{
                    name:'dfdfff',
                    phone:"",
                    picker:"",
                    nickname:""
                }
            };
        }
        changeText(type,text){
            let obj=this.state.dynamicValidateForm;
            obj[type]=text;
            this.setState({dynamicValidateForm:obj})
        }
        submit(){
            this.refs['dynamicValidateForm'].validate(res=>{
                if(!res){
                alert("succs")
                }
            })
        }
        render(){
            let {dynamicValidateForm} =this.state;
            return (
                    <Form.elForm 
                        model={dynamicValidateForm}
                        scope={this}
                        ref="dynamicValidateForm">
                            <Form.elFormItem 
                            label="Phone:"
                            prop="phone"
                            value={dynamicValidateForm.phone}
                            rules={[
                                { required: true, message: 'Please enter phone number' },
                                { pattern: /^\d{6}$/, message: 'Please enter 6 digits' }
                            ]}
                            >
                                <TextInput
                                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                    value={dynamicValidateForm.phone}
                                    placeholder="Please enter phone number"
                                    onChangeText={text => this.changeText('phone',text)}
                                />
                                <Text>{this.state.dynamicValidateForm.phone}</Text>
                            </Form.elFormItem>

                            <Form.elFormItem 
                            label="nickname:"
                            prop="nickname"
                            value={dynamicValidateForm.nickname}
                            checkOnBlur={true}
                            customInput={true}
                            rules={[
                                { required: true, message: 'Please enter nickname' },
                            ]}
                            >
                                <Form.elInput
                                    value={dynamicValidateForm.nickname}
                                    placeholder="Verify when losing focus, custom input box is only valid"
                                    onChangeText={text => this.changeText('nickname',text)}
                                />
                            </Form.elFormItem>

                            <Form.elFormItem 
                                label="picker:"
                                prop="picker"
                                value={dynamicValidateForm.picker}
                                rules={[
                                    { required: true, message: 'Please picker' }
                                ]}
                            >
                                <Picker
                                selectedValue={this.state.dynamicValidateForm.picker}
                                style={{height: 200, width: 100,borderColor: 'gray', borderWidth: 1 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.changeText('picker',itemValue)
                                }>
                                    <Picker.Item label="please picker" value="" />
                                    <Picker.Item label="Java" value="java" />
                                    <Picker.Item label="JavaScript" value="js" />
                                    <Picker.Item label="css" value="css" />
                                </Picker>
                            </Form.elFormItem> 
                            <View>
                                <TouchableOpacity onPress={((()=>this.submit()))}>
                                    <View style={styles.normalBtn}>
                                            <Text style={styles.normalBtnTxt}>Submit</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Form.elForm> )
        }
};  

```








## 校验规则常考 [CheckRules](https://www.npmjs.com/package/async-validator "async-validator")

## elForm Attributes

|  参数       | 说明                                   |  类型   |    可选值         |  默认值 | 是否必选|
| --------   | -----                                | -----  | -----          | -----  | -----  |
| model      | 表单数据对象                             |object  |   --             |   --   |是       |
| scope      | 表单所在作用域                           |object  |   this           |   --   | 是      |
| canPush      | state里面的key，用来判断表单是否可提交    |boolean  |   true或false   |   --   | 否      |
| labelWidth    | elFormItem标签label的宽度    |Number  |   ---   |   --   | 否      |
|styles        | 样式，覆盖所有样式 [内容参考](https://github.com/MTTTM/react-native-async-validator/blob/master/src/overWriteStyle.js)  |Object   |   ---   |   --   | 否      |

## elFormItem  Attributes

|  参数       | 说明                                   |  类型   |    可选值         |  默认值 | 是否必选|
| --------   | -----                                | -----  | -----          | -----  | -----  |
| prop      | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 |传入 Form 组件的 model 中的字段  |--|   --   |是|
| label      | 标签文本                                |string  |   --             |   --   | 否      |
| labelWidth    | elFormItem标签label的宽度    |Number  |   ---   |   --   | 否      |
| value      | model字段   |var(model里面的变量)  |   --   |   --   | (输入框是原生时候)，否(自定义输入框)      |
| customInput      | 是否使用自定义Input表单   |Boolean  |   --   |   --   | 否     |
| checkOnBlur      | 是否在失去焦点时候才校验(customInput为true&&输入表单为自定义input”本组件提供的elFormItem“)   |Boolean  |   --   |   --   | 否     |
| rules      | 表单验证规则   | Array  |   --   |   --   | 是      |

## elInput

|  参数       | 说明                                   |  类型   |    可选值         |  默认值 | 是否必选|
| --------   | -----                                | -----  | -----          | -----  | -----  |
| errStyle      | 成功的textInput样式  |Object|   TextInput的样式   |否|
| succStyle      | 错误的textInput样式 |Object  |  TextInput的样式        |   --   | 否      |
| 其他      | 和TextInput一样的属性   |--  |   --   |   --   | --      |

##  elForm  Methods

|  方法名       | 说明                                   |  参数   | 
| --------   | -----                                | -----  |
| validate      | 校验所有表单 | Function(Array或null)  |
| validateField  | 校验指定表单 | Function(Array或null)  |  
| resetField    | 对该表单项进行重置，将其值重置为初始值并移除校验结果 （因为react单向数据流的设计导致不容易实现，不提供,可以参考demo8实现，并不难） |--|
| clearValidate | 移除该表单项的校验结果 |  |  --        |


## 常见问题

* 警告(warn) `model不存在key:${xxx}`

```javaScript
 //一般发生在如下场景
 constructor(props) {
    super(props);
    this.state={
        name:"",//必填项
        phone:""//必填项
    }
 }
 //...
 setName(){
     //因为把必填项phone从state里面移除了，但是没有移除phone对应的Form.formItem导致Form的校验规则集合里面没有移除phone
     //如果需要移除某个校验字段，必须把相应的FormItem移除！！
     //(Don't forget to remove Form.formItem element when you remove a field which is need check)
     this.setState({name:"name"})
 }  


```

