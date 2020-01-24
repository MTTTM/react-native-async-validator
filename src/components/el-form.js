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
import ENUM from "./enum"
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
    this.acceptCheckField=this.acceptCheckField.bind(this);
    //确保子节点添加事件时候能准确添加到本表单
    this.CusRefName="form"+new Date().getTime();
    PubSub.subscribe(`${this.CusRefName}addFieldSubScriber`, this.addFieldSubScriber);
    PubSub.subscribe(`${this.CusRefName}removeFieldSubScriber`, this.removeFieldSubScriber);
    PubSub.subscribe(`${this.CusRefName}${ENUM.notifyFormToCheck}`, this.acceptCheckField);
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
  /**
   * 校验单个表单
   * @param {*} field 
   * @param {*} callBack 
   */
  validateField(field,callBack){
    return new Promise((resolve)=>{
      if(!this.modelContain(field)){
        console.warn(`model不存在key${field}`)
        resolve(`model不存在key${field}`);
        return;
      }
      let target={
        [field]:this.state.descriptor[field]
      };
      let valider = new schema(target);
      valider.validate({[field]:this.props.model[field]}, (errors, fields) => {
        callBack(errors, fields)
      });
    })
  }
  /**
   *  校验所有表单
   * @param {*} callBack 
   */
  validate(callBack){

     return this.validator.validate(this.props.model, (errors, fields) => {
        try{
          this.notifyAllFields(errors);
        }catch(e){
          console.log("异常",e)
        }
         callBack(errors, fields)
      });
    
  }
  /**
   * 接收到[单个]表单请求校验后，开始校验并反馈结果
   * @param {*} msg  key
   * @param {*} obj 
   * obj.prop
   */
  acceptCheckField(msg,obj){
    console.log("接收到表单的请求，开始校验",obj)
    this.validateField(obj.prop,(errors, fields)=>{
      console.log("单个校验结果",errors, fields)
      PubSub.publish(`${this.CusRefName}${ENUM.accetpCheckedResult}`,{
        prop:obj.prop,
        errors,
        fields
      });
    })
  }
 /**
  * 通过数组里面的对象的key来获取指定数组元素
  * @param {*} arr 
  * @param {*} key 
  * @param {*} val
  */
  getArrayItemByKey(arr,key,val){
    if(!arr){
      return null;
    }
    return arr.filter(item=>item[key]==val)[0];
  }
  /**
   * 通知所有表单校验结果
   * @param {*} errorsArr 
   */
  notifyAllFields(errorsArr){
    console.log("errorsArr",errorsArr)
    /*
    *  错误信息会如此:
    * 未通过格式:[{"message":"请输入姓名","field":"name"}],"fields":{"name":[{"message":"请输入姓名","field":"name"}]
    */
    for(let k in this.state.descriptor){
        let item=this.getArrayItemByKey(errorsArr,"field",k);
        console.log("赛选到的错误对象",item)
        PubSub.publish(`${this.CusRefName}${ENUM.accetpCheckedResult}`,{
          prop:k,
          errors:item?[item]:item
        });
    }
    
    
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
