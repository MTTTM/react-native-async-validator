import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Picker
} from 'react-native';
import Form from "./index"
import STYLES from "./overWriteStyle"
export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dynamicValidateForm:{
            name:'',
            phone:"",
            nickname:""
        }
    };
  }
  componentDidMount() {}
  render() {
        let {dynamicValidateForm} =this.state;
        return (
            <View style={{marginHorizontal:10}}>
               <View style={{paddingVertical:10,marginBottom:10,borderBottomColor:"#ccc",borderBottomWidth:1}}>
                  <Text>
Override the style of all fields in the From tag through the styles attribute</Text>
               </View>
                <Form.elForm 
                   model={dynamicValidateForm}
                   styles={STYLES}
                   labelWidth={60}
                   ref="dynamicValidateForm">
                    <Form.elFormItem 
                    label="name:"
                     prop="name"
                     rules={[
                        { required: true, message: 'input name', trigger: 'change' }
                      ]}
                    >
                         <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            value={dynamicValidateForm.name}
                            placeholder="I don't obey Form.elForm'styles"
                            onChangeText={text => this.changeText('name',text)}
                          />
                    </Form.elFormItem>
                    <Form.elFormItem 
                    label="phone:"
                     prop="phone"
                     rules={[
                        { required: true, message: 'input your phone' },
                        { pattern: /^\d{6}$/, message: 'Please enter 6 Arabic numerals' }
                      ]}
                     >
                           <Form.elInput
                            value={dynamicValidateForm.phone}
                            placeholder="input your phone"
                            onChangeText={text => this.changeText('phone',text)}
                          />
                    </Form.elFormItem>

                    <Form.elFormItem 
                    label="nickname:"
                     prop="nickname"
                     checkOnBlur={true}
                     rules={[
                        { required: true, message: 'input nickname' },
                      ]}
                     >
                          <Form.elInput
                            value={dynamicValidateForm.nickname}
                            placeholder="check after blur"
                            onChangeText={text => this.changeText('nickname',text)}
                          />
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
        console.log("校验",res)
        if(!res){
          alert("提交成功")
        }
    })
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  normalBtn:{
      backgroundColor:"#409eff",
      justifyContent:"center",
      alignItems:"center",
      height:35,
      borderRadius:5
  },
  normalBtnTxt:{
      color:'#fff'
  },
  disabledBtn:{
    backgroundColor:"#dcdfe6"
  },
  disabledBtnTxt:{
    color:"#ccc"
  }
});
