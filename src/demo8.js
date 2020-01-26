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
        dynamicValidateForm:{
            name:'',
            nickname:"",
            phone:""
        }
    };
  }
  componentDidMount() {}
  render() {
        let {dynamicValidateForm} =this.state;
        return (
            <View style={{marginHorizontal:10}}>
               <View style={{paddingVertical:10,marginBottom:10,borderBottomColor:"#ccc",borderBottomWidth:1}}>
                  <Text>Form函数使用(对姓名表单做测试)</Text>
               </View>
                <Form.elForm 
                   model={dynamicValidateForm}
                   scope={this}
                   labelWidth={60}
                   ref="dynamicValidateForm">


                <ScrollView horizontal={true} alwaysBounceHorizontal={true} style={{width:"100%",marginBottom:10,paddingVertical:10,borderBottomColor:"#ccc",borderBottomWidth:1}}>
                    <TouchableOpacity
                    onPress={()=>this.setState({dynamicValidateForm:{name:"设置了值", nickname:"",
                    phone:""}})}>
                        <View style={styles.normalBtn2}>
                           <Text style={styles.normalBtnTxt}>设置值</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{marginLeft:5}} 
                    onPress={()=>{
                      let t=this.state.dynamicValidateForm;
                      t.name=""
                      this.setState({dynamicValidateForm:{...t}})
                    }}>
                        <View style={styles.normalBtn2}>
                           <Text style={styles.normalBtnTxt}>清空值</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:5}} 
                    onPress={()=>this.refs.dynamicValidateForm.validateField("name",(err)=>{
                        console.log("通过了不?",err)
                    })}>
                        <View style={styles.activityBtn}>
                           <Text style={styles.normalBtnTxt}>校验</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:5}} 
                    onPress={()=>this.refs.dynamicValidateForm.clearValidate()}>
                        <View style={{...styles.activityBtn,width:120}}>
                           <Text style={styles.normalBtnTxt}>清除校验UI效果</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:5}} 
                    onPress={()=>this.resetField()}>
                        <View style={{...styles.activityBtn,width:180,backgroundColor:"#f56c6c"}}>
                           <Text style={styles.normalBtnTxt}>清除校验UI效果和表单值</Text>
                        </View>
                    </TouchableOpacity>
                   
                    </ScrollView>
                    <View style={{paddingVertical:10}}><Text>以下表单(姓名)设失去焦点才会校验，主要是方便测试效果</Text></View>
                    <Form.elFormItem 
                    label="姓名:"
                     prop="name"
                     customInput={true}
                     checkOnBlur={true}
                     rules={[
                        { required: true, message: '请输入姓名' },
                      ]}
                     >
                          <Form.elInput
                            value={dynamicValidateForm.name}
                            placeholder="失去焦点时候校验，自定义输入框才有效"
                            onChangeText={text => this.changeText('name',text)}
                          />
                    </Form.elFormItem>
                    <Form.elFormItem 
                    label="手机号:"
                     prop="phone"
                     customInput={true}
                     >
                           <Form.elInput
                            value={dynamicValidateForm.phone}
                            placeholder="不做校验"
                            onChangeText={text => this.changeText('phone',text)}
                          />
                    </Form.elFormItem>

                    <Form.elFormItem 
                    label="昵称:"
                     prop="nickname"
                     customInput={true}
                     rules={[
                        { required: true, message: '请输入昵称' },
                      ]}
                     >
                          <Form.elInput
                            value={dynamicValidateForm.nickname}
                            placeholder="失去焦点时候校验，自定义输入框才有效"
                            onChangeText={text => this.changeText('nickname',text)}
                          />
                    </Form.elFormItem>

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
  resetField(){
    this.refs.dynamicValidateForm.clearValidate()
    this.setState({dynamicValidateForm:{ 
    name:'',
    nickname:"",
    phone:""}})
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
  normalBtn2:{
    backgroundColor:"#409eff",
    justifyContent:"center",
    alignItems:"center",
    height:35,
    paddingHorizontal:5,
    marginLeft:5,
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
  },
  activityBtn:{
    backgroundColor:"#67c23a",
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal:5,
    height:35,
    borderRadius:5,
  },
});
