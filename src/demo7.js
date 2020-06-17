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
                  <Text>inline style</Text>
               </View>
                <Form.elForm 
                   model={dynamicValidateForm}
                   styles={STYLES}
                   labelWidth={60}
                   ref="dynamicValidateForm">
                    <Form.elFormItem 
                    label="nickname:"
                     prop="name"
                     rules={[
                        { required: true, message: 'input your name' }
                      ]}
                    >
                         <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            value={dynamicValidateForm.name}
                            placeholder="default labelWidth"
                            onChangeText={text => this.changeText('name',text)}
                          />
                    </Form.elFormItem>
                    <Form.elFormItem 
                    label="phone:"
                     prop="phone"
                     value={dynamicValidateForm.phone}
                     labelWidth={80}
                     rules={[
                        { required: true, message: 'input your phone' },
                        { pattern: /^\d{6}$/, message: 'Please enter 6 Arabic numerals' }
                      ]}
                     >
                           <Form.elInput
                            value={dynamicValidateForm.phone}
                            placeholder="set labelWidth"
                            onChangeText={text => this.changeText('phone',text)}
                          />
                    </Form.elFormItem>

                    <Form.elFormItem 
                    label="nickname:"
                     prop="nickname"
                     checkOnBlur={true}
                     rules={[
                        { required: true, message: 'input nikname' },
                      ]}
                     >
                          <Form.elInput
                           errStyle={{borderColor:"yellow",color:"yellow"}}
                           succStyle={{borderColor:"#d603d6",color:"#d603d6"}}
                            value={dynamicValidateForm.nickname}
                            placeholder="inline status style work after blur"
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
        if(!res){
          alert("succ")
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
