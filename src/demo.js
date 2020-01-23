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
} from 'react-native';
import Form from "./index"
export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
       
        dynamicValidateForm:{
            name:'dfdfff',
            phone:"",
        }
    };
  }
  componentDidMount() {}
  render() {
        let {dynamicValidateForm} =this.state;
        return (
          <View style={{marginHorizontal:10}}>
                <Form.elForm  model={dynamicValidateForm} ref="dynamicValidateForm" labelWidth={100} inline={false} >
                    <Form.elFormItem 
                    label="姓名:"
                     prop="name"
                     rules={[
                        { required: true, message: '请输入姓名', trigger: 'change' }
                      ]}
                    >
                        <Form.elInput  
                            style={{ height: 40, borderColor: 'blue', borderWidth: 1 }}
                        />
                    </Form.elFormItem>
                    <Form.elFormItem 
                    label="手机号:"
                     prop="phone"
                     rules={[
                        { required: true, message: '请输入手机号', trigger: 'change' }
                      ]}
                     >
                        <Form.elInput  
                            style={{ height: 40, borderColor: 'blue', borderWidth: 1 }}
                        />
                    </Form.elFormItem>
                    <View>
                        <TouchableOpacity onPress={((()=>this.submit()))}>
                            <View style={styles.normalBtn}>
                                    <Text style={styles.normalBtnTxt}>提交</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Form.elForm>
          </View>
        )
  }
 
  submit(){
    this.refs['dynamicValidateForm'].validate(res=>{
        console.log("校验",res)
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
  }
});
