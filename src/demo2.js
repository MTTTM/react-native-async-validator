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
export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        canpush:false,
        dynamicValidateForm:{
            name:'',
            phone:"",
            picker:"",
            nickname:""
        }
    };
   
  }
  componentDidMount() {
    // setInterval(()=>{
    //   this.setState({canpush:!this.state.canpush})
    // },500)
  }
  render() {
        let {dynamicValidateForm,canpush} =this.state;
        let _this=this;
        return (
          <View style={{marginHorizontal:10}}>
               <View style={{paddingVertical:10,marginBottom:10,borderBottomColor:"#ccc",borderBottomWidth:1}}>
                  <Text>提交按钮自动响应</Text>
               </View>
               {/* <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            value={dynamicValidateForm.name}
                            placeholder="请输入姓名"
                            onChangeText={text => this.changeText('name',text)}
                          />
                          <Form.elForm 
                          {...this.state.dynamicValidateForm}
                          canpush={this.state.canpush}
                          canPushChange={pass=>this.setState({canpush:pass})}
                        ref="dynamicValidateForm"></Form.elForm> */}
                          
                <Form.elForm 
                    {...this.state.dynamicValidateForm}
                    // canpush={this.state.canpush}
                    canPushChange={pass=>this.setState({canpush:pass})}
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
                            placeholder="请输入姓名"
                            onChangeText={text => this.changeText('name',text)}
                          />
                    </Form.elFormItem>
                    {/* <Form.elFormItem 
                    label="手机号:"
                     prop="phone"
                     rules={[
                        { required: true, message: '请输入手机号' },
                        { pattern: /^\d{6}$/, message: '请输入6位阿拉伯数字' }
                      ]}
                     >
                         <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            value={dynamicValidateForm.phone}
                            placeholder="这请输入手机号"
                            onChangeText={text => this.changeText('phone',text)}
                          />
                    </Form.elFormItem>

                    <Form.elFormItem 
                    label="昵称:"
                     prop="nickname"
                     value={dynamicValidateForm.nickname}
                     rules={[
                        { required: true, message: '请输入昵称' },
                      ]}
                     >
                          <Form.elInput
                            value={dynamicValidateForm.nickname}
                            placeholder="这是个自定义的输入框，prop和原生的一致"
                            onChangeText={text => this.changeText('nickname',text)}
                          />
                    </Form.elFormItem>

                    <Form.elFormItem 
                    label="选择:"
                     prop="picker"
                     rules={[
                        { required: true, message: '请输入选择' }
                      ]}
                    >
                         <Picker
                          selectedValue={this.state.dynamicValidateForm.picker}
                          style={{height: 200, width: 100,borderColor: 'gray', borderWidth: 1 }}
                          onValueChange={(itemValue, itemIndex) =>
                            this.changeText('picker',itemValue)
                          }>
                          <Picker.Item label="请选择" value="" />
                          <Picker.Item label="Java" value="java" />
                          <Picker.Item label="JavaScript" value="js" />
                          <Picker.Item label="css" value="css" />
                        </Picker>
                    </Form.elFormItem> */}

                     <View style={{marginTop:20}}>
                        {
                          canpush?(
                            <TouchableOpacity onPress={((()=>this.submit()))}>
                              <View style={styles.normalBtn}>
                                      <Text style={styles.normalBtnTxt}>点击提交</Text>
                              </View>
                          </TouchableOpacity>
                          ):(
                            <TouchableOpacity activeOpacity={1}>
                            <View style={{...styles.normalBtn,...styles.disabledBtn}}>
                                    <Text style={{...styles.normalBtnTxt,...styles.disabledBtnTxt}}>还不能提交</Text>
                            </View>
                        </TouchableOpacity>
                          )
                        }
                    </View>
                </Form.elForm> 
          </View>
        )
  }
  changeText(type,text){
    let obj=this.state.dynamicValidateForm;
    obj[type]=text;
    this.setState({dynamicValidateForm:obj},()=>{
      console.log("input 变了",this.state.dynamicValidateForm.name)
    })
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
