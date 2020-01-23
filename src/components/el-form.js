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
import PubSub from 'pubsub-js'
import schema from 'async-validator';
import PropTypes from 'prop-types'; // ES6
import ThemeContext from "./context"
 class elForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fields: [],
        descriptor:{},//符合‘async-validator’要求的格式
        valided:true,//验证通过
    };
    this.validator={};
    this.addFieldSubScriber=this.addFieldSubScriber.bind(this);
    this.removeFieldSubScriber=this.removeFieldSubScriber.bind(this);
    //确保子节点添加事件时候能准确添加到本表单
    this.CusRefName="form"+new Date().getTime();
    console.log("this.CusRefName",this.CusRefName)
    PubSub.subscribe(`${this.CusRefName}addFieldSubScriber`, this.addFieldSubScriber);
    PubSub.subscribe(`${this.CusRefName}removeFieldSubScriber`, this.removeFieldSubScriber);
  }
  componentDidMount() {}
  componentWillUnmount(){
    // PubSub.unsubscribe(`${this.CusRefName}addFieldSubScriber`);
    // PubSub.unsubscribe(`${this.CusRefName}removeFieldSubScriber`);
  }
  render() {
    return (
      <ThemeContext.Provider value={{...this.props,CusRefName:this.CusRefName}}>
        { this.props.children}
      </ThemeContext.Provider>
    )
    
  }
  /**
   * 新增元素
   *  obj {Object}
   * {
   *   prop:"string",
   *   rules="[
   *    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
   *   { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
   *  ]"
   *  }
   */
  addFieldSubScriber(msg,obj){
    console.log("进入了么",obj,msg)
    if(msg!==this.CusRefName+'addFieldSubScriber'){
      return;
    }
    let fields=this.state.fields;
    fields.push(obj);
    this.setState({fields},()=>{
      console.log("form,this.state.fields",this.state.fields)
      this.updateDescriptor();
    });

  }
    /**
   * 新增元素
   *  obj {Object}
   * {
   *   prop:"string",
   *   rules="[
   *    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
   *   { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
   *  ]"
   *  }
   */
  removeFieldSubScriber(obj){
    let fields=this.state.fields.map(item=>{
      return item.prop!==obj.prop;
    });
    this.setState({fields},()=>{
      this.updateDescriptor();
    });
  }
  /**
   * 更新‘async-validator’的校验数据
   */
  updateDescriptor(){
    let descriptor={};
    this.state.fields.forEach(item=>{
       if(item.rules){
         if(!item.prop){
           console.warn("校验表单缺少prop")
         }
         else{
          descriptor[item.prop]=item.rules;
         }
       }
    })
    this.setState({descriptor},()=>{
      this.validator = new schema(this.state.descriptor);
    });
  }
  /**
   * model里面是否包含指定的key
   */
  modelContain(key){
    return this.props.model.hasOwnProperty(key); 
  }
  validateField(field,callBack){
    return new Promise((resolve)=>{
      if(!this.modelContain(field)){
        console.warn(`model不存在key${field}`)
        resolve(`model不存在key${field}`);
        return;
      }
      this.validator.validate({[field]:this.props.model[field]}, (errors, fields) => {
        callBack(errors, fields)
      });
    })
  }
  validate(callBack){

     return this.validator.validate(this.props.model, (errors, fields) => {
         callBack(errors, fields)
      });
    
  }
  
}

elForm.propTypes={
  model:PropTypes.object.isRequired,
  labelWidth:PropTypes.number
}

const styles = StyleSheet.create({
  container: {
   
    flex: 1,
  }
});
export default  elForm;
