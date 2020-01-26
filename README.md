# react-native-async-validator

## 说明

* 这是一个类似jQuery.validator的表单校验工具
* [点击查看demo](https://github.com/MTTTM/react-native-async-validator/tree/master/src,"demo")
* 提供两种常用的校验方式（1.点击校验所有表单元素通过就提交，2.在输入表单过程中自动验证，如果所有表单验证通过按钮高亮可点击提交）
* 未来支持(动态表单元素)
* 目前校验规则是写在elFormItem里面的，暂时不考虑在elForm上加

* [MP4演示需要科学上网，你也可以下载仓库里面的video.mp4](https://www.youtube.com/watch?v=smkNFiJhnF0&feature=youtu.be,"demo")




## 校验规则常考 [async-validator](https://www.npmjs.com/package/async-validator "async-validator")

## elForm Attributes

|  参数       | 说明                                   |  类型   |    可选值         |  默认值 | 是否必选|
| --------   | -----                                | -----  | -----          | -----  | -----  |
| model      | 表单数据对象                             |object  |   --             |   --   |是       |
| scope      | 表单所在作用域                           |object  |   this           |   --   | 是      |
| canPush      | state里面的key，用来判断表单是否可提交    |boolean  |   true或false   |   --   | 否      |
| labelWidth    | elFormItem标签label的宽度    |Number  |   ---   |   --   | 否      |

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
