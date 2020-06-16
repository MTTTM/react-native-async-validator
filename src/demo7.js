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
                  <Text>在标签里面配置样式</Text>
               </View>
                <Form.elForm 
                   {...dynamicValidateForm}
                   styles={STYLES}
                   labelWidth={60}
                   ref="dynamicValidateForm">
                    <Form.elFormItem 
                    label="姓名:"
                     prop="name"
                     rules={[
                        { required: true, message: '请输入姓名', trigger: 'change' }
                      ]}
                    >
                         <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            value={dynamicValidateForm.name}
                            placeholder="默认的labelWidth"
                            onChangeText={text => this.changeText('name',text)}
                          />
                    </Form.elFormItem>
                    <Form.elFormItem 
                    label="手机号:"
                     prop="phone"
                     value={dynamicValidateForm.phone}
                     labelWidth={80}
                     rules={[
                        { required: true, message: '请输入手机号' },
                        { pattern: /^\d{6}$/, message: '请输入6位阿拉伯数字' }
                      ]}
                     >
                           <Form.elInput
                            value={dynamicValidateForm.phone}
                            placeholder="标签自定义labelWidth"
                            onChangeText={text => this.changeText('phone',text)}
                          />
                    </Form.elFormItem>

                    <Form.elFormItem 
                    label="昵称:"
                     prop="nickname"
                     checkOnBlur={true}
                     rules={[
                        { required: true, message: '请输入昵称' },
                      ]}
                     >
                          <Form.elInput
                           errStyle={{borderColor:"yellow",color:"yellow"}}
                           succStyle={{borderColor:"#d603d6",color:"#d603d6"}}
                            value={dynamicValidateForm.nickname}
                            placeholder="失去焦点时候校验，自定义输入框才有效"
                            onChangeText={text => this.changeText('nickname',text)}
                          />
                    </Form.elFormItem>
                    <View>
                        <Text style={{fontWeight:"bold"}}>左侧label样式无法标签覆盖</Text>
                    </View>
                    <View>
                        <Text style={{fontWeight:"bold"}}>错误提示文字无法标签样式覆盖</Text>
                    </View>
                    <View>
                        <Text style={{fontWeight:"bold"}}>因为他们封装在组件内容了，不对外提供接口</Text>
                    </View>
                    <View>
                        <Text style={{fontWeight:"bold"}} >请在Form的Styles里面对他们做针对该Form的样式覆盖</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={((()=>this.submit()))}>
                            <View style={styles.normalBtn}>
                                    <Text style={styles.normalBtnTxt}>点击提交</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Form.elForm>
          </View>
        )
  }
  changeText(type,text){
    let obj=this.state.dynamicValidateForm;
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
