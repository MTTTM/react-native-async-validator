# react-native-validator

## desc
* This is a form validation tool,like jQuery.validator.I mean that it is very easy to use.
* [demo](https://github.com/MTTTM/react-native-async-validator/tree/master/src)
* Provides two common verification methods (1. Click to verify all form elements and submit them; 2. Automatically verify during form input. If all form verification passes the button, you can click Submit)
* You can cover all styles
* It is support for dynamic forms including objects and arrays
* At present, the verification rules are written in elFormItem, and it is not considered to be added to elForm for the time being. Because it already meets the general requirements
* If you get an error after downloading npm, it is recommended to copy the src file under the package to your local and use it as your local file (I cannot explain why this is the case for now).
## doc
* [中文](./README_CN.md)
* [EN](./README.md)

## Installation

```javascript
    npm i react-native-validator
```
## Usage

```javascript
 export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dynamicValidateForm:{
            name:'',
            name2:"",
            phone:"",
            picker:"",
            nickname:""
        },
    };
  }
  render() {
        let {dynamicValidateForm} =this.state;
        return (
          <View style={{marginHorizontal:10}}>
                <Form.elForm 
                   model={dynamicValidateForm}
                   ref="dynamicValidateForm">
                    <Form.elFormItem 
                    label="name:"
                     prop="name"
                     rules={[
                        { required: true, message: 'name' }
                      ]}
                    >
                         <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            value={dynamicValidateForm.name}
                            placeholder="name"
                            onChangeText={text => this.changeText('name',text)}
                          />
                    </Form.elFormItem>

                    <Form.elFormItem 
                    label="phonne:"
                     prop="phone"
                     rules={[
                        { required: true, message: 'Please enter  numerals' },
                        { pattern: /^\d{6}$/, message: 'Please enter 6 Arabic numerals' }
                      ]}
                     >
                         <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            value={dynamicValidateForm.phone}
                            placeholder="phone"
                            onChangeText={text => this.changeText('phone',text)}
                          />
                    </Form.elFormItem>
                    <Form.elFormItem 
                     label="nickname:"
                     prop="nickname"
                     checkOnBlur={true}
                     rules={[
                        { required: true, message: 'nicknname' },
                      ]}
                     >
                          <Form.elInput
                            value={dynamicValidateForm.nickname}
                            placeholder="check after blur"
                            onChangeText={text => this.changeText('nickname',text)}
                          />
                    </Form.elFormItem>
                    <Form.elFormItem 
                    label="picker:"
                     prop="picker"
                     rules={[
                        { required: true, message: 'picker' }
                      ]}
                    >
                         <Picker
                          selectedValue={this.state.dynamicValidateForm.picker}
                          style={{height: 200, width: 100,borderColor: 'gray', borderWidth: 1 }}
                          onValueChange={(itemValue, itemIndex) =>
                            this.changeText('picker',itemValue)
                          }>
                          <Picker.Item label="picker" value="" />
                          <Picker.Item label="Java" value="java" />
                          <Picker.Item label="JavaScript" value="js" />
                          <Picker.Item label="css" value="css" />
                        </Picker>
                    </Form.elFormItem>
                    <View>
                        <TouchableOpacity onPress={((()=>this.submit()))}>
                            <View style={styles.normalBtn}>
                                    <Text style={styles.normalBtnTxt}>submit</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Form.elForm>
          </View>
        )
  }
  changeText(type,text){
    let obj={...this.state.dynamicValidateForm};
    obj[type]=text;
    this.setState({dynamicValidateForm:obj})
}
  submit(){
    this.refs['dynamicValidateForm'].validate(res=>{
        if(!res){
          alert("submit succs")
        }

    })
  }
}

```


## [CheckRules](https://www.npmjs.com/package/async-validator "async-validator")

## elForm Attributes

|  parameter   | Description                 |  Type   |    Optional         |  default | required|
| --------   | -----                                | -----  | -----          | -----  | -----  |
| model      | Form data object                            |object  |   --             |   --   |Y       |
| canPushChange      |      |Function  |   --   |   --   | N      |
| labelWidth    | elFormItem label width    |Number  |   ---   |   --   | N      |
|styles        | Style, covering all styles [content](https://github.com/MTTTM/react-native-async-validator/blob/master/src/overWriteStyle.js)  |Object   |   ---   |   --   | N      |


## elFormItem  Attributes

|  parameter   | Description                 |  Type   |    Optional         |  default | required|
| --------   | -----                         | -----  | -----                | -----  | -----  |
| prop  | Form field model field, this attribute is required when using validate, resetFields methods |Fields passed into the model of the Form component |Fields passed to the model of the Form component |--|   --   |Y|
| label      | Label text   |string  |   --             |   --   | N      |
| labelWidth    | elFormItem label width    |Number  |   ---   |   --   | N      |
| checkOnBlur      | Whether to check when losing focus (customInput is true && The input form is a custom input "elFormItem provided by this component")   |Boolean  |   --   |   --   | N     |
| rules      | Form validation rules   | Array  |   --   |   --   | Y      |

## elInput

|  parameter   | Description                 |  Type   |    Optional         |  default | required|
| --------   | -----                         | -----   | -----               | -----  | -----  |
| errStyle      | Successful textInput style  |Object|  style of successful TextInput |--  |N|
| succStyle      | failure textInput style |Object  |  style of failure TextInput   |   --   | N      |
| others      | Same properties as TextInput   |--  |   --   |   --   | --   |

##  elForm  Methods

|  Methods       | Description                 |  parameter  |
| --------   | -----                                | -----  |
| validate      | Validate all forms | Function(Array或null)  |
| validateField  | Validate the specified form | Function(Array或null)  |  
| resetField    | Reset the form item, reset its value to the initial value, and remove the verification result (because the design of react unidirectional data flow is not easy to implement, it is not provided, you can refer to demo8 to implement, it is not difficult) |--|
| clearValidate | Remove the verification result of this form item |  |  --        |


## Warning

* warn `model not contain key:${xxx}`

```javaScript
 constructor(props) {
    super(props);
    this.state={
        name:"",//required
        phone:""//required
    }
 }
 //...
 setName(){
     //Because the required item phone was removed from the state, but Y did not remove the Form.formItem corresponding to phone, which caused the phone to not be removed from the set of validation rules for Form.
     //If you need to remove a check field, you must remove the corresponding FormItem! !!
     this.setState({name:"name"})
 }  


```

##### Translated content from Google

