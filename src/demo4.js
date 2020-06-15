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
        canPush:false,
        dynamicValidateForm:{
            form:[
                {
                    value:'',
                    key:"0"
                }
            ]
        },
        showPhone:true,
        showName:true
    };
  }
  componentDidMount() {}
  render() {
        let {dynamicValidateForm} =this.state;
        return (
          <View style={{marginHorizontal:10}}>
               <View style={{paddingVertical:10,marginBottom:10,borderBottomColor:"#ccc",borderBottomWidth:1}}>
                  <Text>动态表单(Array)1</Text>
               </View>
                <Form.elForm 
                   {...dynamicValidateForm}
                   labelWidth={80}
                   canPushChange={pass => this.setState({ canpush: pass })}
                   ref="dynamicValidateForm">

                    {
                        this.state.dynamicValidateForm.form.map((item,index)=>{
                            return (
                                <Form.elFormItem 
                                key={item.key}
                                label={`姓名:${index}`}
                                 prop={`form.${index}.value`}

                                 rules={[
                                    { required: true, message: `请输入姓名${index}` }
                                  ]}
                                >
                                     <View style={{flexDirection:"row",alignItems:"center"}}>
                                        <TextInput
                                            style={{marginRight:5, height: 40,width:150, borderColor: 'gray', borderWidth: 1 }}
                                            value={dynamicValidateForm.form[index].value}
                                            placeholder={`请输入姓名${index}`}
                                            onChangeText={text => this.changeText(index,text)}
                                        />
                                        <Text onPress={(()=>this.deleteFun(item.key))}>DELETE</Text>
                                     </View>
                                </Form.elFormItem>
                            )
                        })
                    }   
                    <View>
                    <TouchableOpacity onPress={((()=>this.addNew()))}>
                              <View style={styles.normalBtn}>
                                      <Text style={styles.normalBtnTxt}>+ 新增</Text>
                              </View>
                          </TouchableOpacity>
                    </View>
                    <View style={{marginTop:20}}>
                        {
                          this.state.canpush?(
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
  changeText(index,text){
    this.state.dynamicValidateForm.form[index].value=text;
    this.state.dynamicValidateForm.form=[...this.state.dynamicValidateForm.form];
    this.setState({dynamicValidateForm:{...this.state.dynamicValidateForm}})
}
deleteFun(key){
    if(this.state.dynamicValidateForm.form.length==1){
        alert("至少保留一个")
        return;
    }
    this.state.dynamicValidateForm.form=this.state.dynamicValidateForm.form.filter(item=>{
        return item.key!=key;
    })
    this.setState({dynamicValidateForm:{...this.state.dynamicValidateForm}})
}
addNew(){
    let len=new Date().getTime();
    this.state.dynamicValidateForm.form.push({
        value:'',
        key:len
    })
    this.setState({dynamicValidateForm:{...this.state.dynamicValidateForm}})

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
