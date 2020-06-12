import React, {Component} from 'react';
import {
  StyleSheet,
} from 'react-native';
import PubSub from 'pubsub-js'
import schema from 'async-validator';
import PropTypes from 'prop-types'; // ES6
import ENUM from "./enum"
import ThemeContext from "./context"
import elFormItem from './el-form-item';
 class elForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fields: [],
        descriptor:{},//符合‘async-validator’要求的格式
        valided:true,//验证通过
    };
    this.validator={};
    // this.addFieldSubScriber=this.addFieldSubScriber.bind(this);
    // this.removeFieldSubScriber=this.removeFieldSubScriber.bind(this);
    // this.acceptCheckField=this.acceptCheckField.bind(this);
    //确保子节点添加事件时候能准确添加到本表单
    this.CusRefName="form"+new Date().getTime();
    // PubSub.subscribe(`${this.CusRefName}${ENUM.addFieldSubScriber}`, this.addFieldSubScriber);
    // PubSub.subscribe(`${this.CusRefName}${ENUM.removeFieldSubScriber}`, this.removeFieldSubScriber);
    // PubSub.subscribe(`${this.CusRefName}${ENUM.notifyFormToCheck}`, this.acceptCheckField);
  }
  componentDidMount() {
    //prop是否符合规范监测
    this._wranCheck();
  }
  componentWillUnmount(){
    //  PubSub.unsubscribe(`${this.CusRefName}${ENUM.addFieldSubScriber}`);
    //  PubSub.unsubscribe(`${this.CusRefName}${ENUM.removeFieldSubScriber}`);
    //  PubSub.unsubscribe(`${this.CusRefName}${ENUM.notifyFormToCheck}`);
  }
  _wranCheck(){
    let canPush=this.props.canPush;
      if(canPush){
          if(!this.props.scope.state.hasOwnProperty(canPush)){
            console.warn("canPush在state里面不存在");
          }
          else if(this.props.scope.state[canPush]==true){
            console.warn("canPush默认应该是false，或者可以转换成false，但是现在它是true或者可以转换成true");
          }
      }
  }
  render() {
    return (
      <ThemeContext.Provider value={{...this.props,CusRefName:this.CusRefName,elForm:this}}>
        { this.props.children}
      </ThemeContext.Provider>
    )
    
  }
  /**
   * 新增元素elFormItem,他的props是
   *  obj {Object}
   * {
   *   prop:"string",
   *   rules="[
   *    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
   *   { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
   *  ]"
   *  }
   */
  $addFieldSubScriber(obj){
  //  console.log("新增",msg,"目标key",`${this.CusRefName}${ENUM.addFieldSubScriber}`,obj)
    //如果不是当前Form的子节点触发的时间不接受
    // if(msg!==`${this.CusRefName}${ENUM.addFieldSubScriber}`){
    //   return;
    // }
    
    let fields=this.state.fields;
    //不允许重复追加，开启开发环境热更也会重复触发追加(这行代码能避免)
    // elFormItem.props.prop
    if(fields.findIndex(item=>item.props.prop==obj.props.prop)>-1){
      console.warn(`已禁止重复提交的fields:${obj.prop},如果是开发环境热更导致的请忽视警告`)
      return;
    }
    fields.push(obj);
    this.setState({fields},()=>{
    //  console.log("form,this.state.fields",this.state.fields)
      this.updateDescriptor(()=>this.updateCanPush());
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
  removeFieldSubScriber(msg,obj){
     //如果不是当前Form的子节点触发的时间不接受
     if(msg!==`${this.CusRefName}${ENUM.removeFieldSubScriber}`){
      return;
    }
   // console.log("删除的Fied",obj)
    let fields=this.state.fields.filter(item=>{
      return item.prop!==obj.prop;
    });
    this.setState({fields},()=>{
    //  console.log("卸载后的剩余的fields",fields)
      this.updateDescriptor(()=>this.updateCanPush());
    });
  }
  /**
   * 更新‘async-validator’的校验数据
   * @param {function} func  更新数据后的回调
   */
  updateDescriptor(func){
    let descriptor={};
    this.state.fields.forEach(formItem=>{
       if(formItem.props.rules){
         if(!formItem.props.prop){
           console.warn("校验表单缺少prop")
         }
         else{
          descriptor[formItem.props.prop]=formItem.props.rules;
         }
       }
    })
    this.setState({descriptor},()=>{
      this.validator = new schema(this.state.descriptor);
      typeof func =="function"?func():null;
    });
  }
  /**
   * model里面是否包含指定的key
   * 需要做数组和对象的区分
   */
  modelContain(key){
    let keys=key.split(".");
 //   console.log("keys",keys,key)
    if(keys.length>1){
   //   console.log("进入多个的了?")
      let obj=this.props.model;
      for(let v=0;v<keys.length;v++){
          if(this.hasOwnPropertyFuc(obj,keys[v])){
            obj=obj[keys[v]];
          }
          else{
            return false;
          }
      }
      return true;
    }
    else{
  //    console.log("this.context",)
    //  console.log("判定对象不包含key",this.props.model,key)
       return this.hasOwnPropertyFuc(this.props.model,key);
    }
   // return this.props.model.hasOwnProperty(key); 
  }
  /**
   * 判定obj是否包括key这个【key】
   * @param {*} obj 
   * @param {*} key 
   */
  hasOwnPropertyFuc(obj,key){
    return obj.hasOwnProperty(key);
  }
  /**
   * 获取Fied的值
   * @param {string}
   * 调用前请使用this.modelContain判定是否存在改值，避免报错
   */
  getFiedValue(key){
    let keys=key.split(".");
    // console.log("key",key)
    if(keys.length>1){
      let result=this.props.model;
      for(let v=0;v<keys.length;v++){
        result=result[keys[v]];
      }
      return result;
    }
    else{
      console.log("key",key,this.props.model,this.props.model[key])
      return this.props.model[key];
    }
  }
  /**
   * 因为model可能是包含数组的对象，所以需要特别处理
   */
  getModel(){
    let model=this.props.model;
   // console.log("his.state.fields[0]",this.state.fields[0])
    //针对
    let fieldsKeys=[];
    try{
      fieldsKeys=this.state.fields[0].prop.split(".");
    }catch(e){}

    if(fieldsKeys.length){
       model={};
       for(let v=0;v<this.state.fields.length;v++){
         let field=this.state.fields[v].prop;
        let fieldValue=this.getFiedValue(field);//获取表单的值(field可能是“xx.xx”的格式)
          model[field]=fieldValue;
       }
    }
    return model;
  }
  /**
   * 校验单个表单
   * @param {string} field 
   * @param {*} callBack 
   */
  _validateField(field,callBack){
    console.log("校验单个值~~",field)
    return new Promise((resolve)=>{
      if(!this.modelContain(field)){
        console.log("fields",this.state.fields)
        console.warn(`model不存在key:${field}`)
        resolve(`model不存在key:${field}`);
        return;
      }
      let target={
        [field]:this.state.descriptor[field]
      };
      console.log("tarhget",target)
      let valider = new schema(target);
      let fieldValue=this.getFiedValue(field);//获取表单的值(field可能是“xx.xx”的格式)
      valider.validate({[field]:fieldValue}, (errors, fields) => {
        callBack(errors&&errors[0]?errors[0]:null, fields)
      });
      
      this.updateCanPush();
    })
  }
 /**
  * 更新是提价按钮是否可以提交
  */
  updateCanPush(){
    let canPush=this.props.canPush;
    if(canPush){
        if(this.props.scope.state.hasOwnProperty(canPush)){
          //校验所有表单，但是不通知表单
          this.validate((errors, fields)=>{
         //   console.log("是否可以提交",errors)
             if(errors){
              this.props.scope.setState({[canPush]:false})
             }
             else{
              this.props.scope.setState({[canPush]:true})
             }
          },false)
        }
        else{
          console.warn(`model不存在key${field}`)
        }
    }
  }
  /**
   *  校验所有表单
   * @param {*} callBack 
   * @param {boolean} notify 是否不通知表单
   */
  validate(callBack,notify=true){
      let model=this.getModel();
      console.log("全部表单校验",model)
     return this.validator.validate(model, (errors, fields) => {
        try{
          notify?this.notifyAllFields(errors):null;
        }catch(e){
          console.warn("校验异常",e)
        }
         callBack(errors, fields)
      });
  }


  /**
   * 对外开放的校验单个表单接口
   * @param {string} key
   */
  validateField(key){
    this.acceptCheckField("",{prop:key});
  }
  /**
   * 清空校验效果，但是不清空值
   */
  clearValidate(){
    PubSub.publish(`${this.CusRefName}${ENUM.clearValidate}`);
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
  notifyAllFields(errorsArr=[]){
    console.log("errorsArr",JSON.stringify(errorsArr));
    /*
    *  错误信息会如此:
    * 未通过格式:[{"message":"请输入姓名","field":"name"}],{"name2":[{"message":"请输入姓名","field":"name"}]
    */
    // for(let k in this.state.descriptor){
    //     let item=this.getArrayItemByKey(errorsArr,"field",k);
    //   //  console.log("赛选到的错误对象",item)
    //     // PubSub.publish(`${this.CusRefName}${ENUM.accetpCheckedResult}`,{
    //     //   prop:k,
    //     //   errors:item?[item]:item
    //     // });
    //     console.log("k",k,item)
    //    // $accetpCheckedResult(

    // }

    // [{"message":"请输入姓名","field":"name"},{"message":"请输入姓名","field":"name2"}]
    for(let k in this.state.descriptor){
      let formItem=this.state.fields.filter(formItem=>formItem.props.prop===k)
      let errorItem=errorsArr?errorsArr.filter(item=>item.field===k):[];
      console.log("error  form:",formItem[0],errorItem[0])
      if(formItem[0]){
       formItem[0].$accetpCheckedResult(errorItem[0]);
      }
    }
    // errorsArr.forEach(item=>{
    //   console.log("this.state.fields",this.state.fields[0])
       
    // })
  }
    /**
   * 接收到[单个]表单请求校验后，开始校验并反馈结果
   * @param {*} msg  key
   * @param {*} obj 
   * obj.prop
   */
  $acceptCheckField(formItem){
     console.log("接收到表单的请求，开始校验",formItem.props.prop)
     this._validateField(formItem.props.prop,(errors, fields)=>{
     //  console.log("单个校验结果",errors, fields)
       // PubSub.publish(`${this.CusRefName}${ENUM.accetpCheckedResult}`,{
       //   prop:obj.prop,
       //   errors,
       //   fields
       // });
       console.log("校验单个",errors)
       formItem.$accetpCheckedResult(errors);
     })
   }
  
}

elForm.propTypes={
  model:PropTypes.object.isRequired,
  scope:PropTypes.object.isRequired,
  canPush:PropTypes.string
}

const styles = StyleSheet.create({
  container: {
   
    flex: 1,
  }
});
export default  elForm;
