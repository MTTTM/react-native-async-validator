import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
} from 'react-native';
import STYLES from "./styles"
import PubSub from 'pubsub-js'
import ENUM from "./enum"
import PropTypes from 'prop-types'; // ES6
class ElInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value:'',
        pass:true,
        afterValid:false,//是否对当前表单实施过校验的动作
    };
     //属于需要校验的表单
     this.needCheck=this.props.formItem.prop&&this.props.formItem.rules&&this.props.formItem.rules[0];
    this.endStyles={};
    try{
      this.endStyles=this.props.form.styles?StyleSheet.create(this.props.form.styles):styles;
    }catch(e){}
     this.accetpCheckedResult=this.accetpCheckedResult.bind(this);
     this.clearValidate=this.clearValidate.bind(this);
  }
  componentDidMount() {
     if(this.needCheck){
      let {CusRefName}=this.props.form;
      //  //接收错误信息
        PubSub.subscribe(`${CusRefName}${ENUM.accetpCheckedResult}`, this.accetpCheckedResult);
         //清除校验UI效果
         PubSub.subscribe(`${CusRefName}${ENUM.clearValidate}`, this.clearValidate);
     }
    
  }
  componentWillUnmount(){
    if(this.needCheck){
      let {CusRefName}=this.props.form;
      //不在接收结果
      PubSub.unsubscribe(`${CusRefName}${ENUM.accetpCheckedResult}`);
      //拒绝再处理清空UI事务
      PubSub.unsubscribe(`${CusRefName}${ENUM.clearValidate}`);
    }
  }
  componentWillReceiveProps(nextProps,nextState){
    if(this.needCheck){
     
      let {CusRefName}=this.props.form;
      //两次值不一样，且非失去焦点才校验，才会触发校验
      //这里需要使用绝对不等于，因为undefined!="" 等于false，
      //但是我们需要他们等同，所以且需要取反反做对比
      //||(!!nextProps.props.value||!!this.props.props.value))
        
      if(nextProps.props.value!==this.props.props.value&&!this.props.formItem.checkOnBlur){
      //  console.log("表单触发的校验",this.props.formItem.prop,"nextProps.props.value",nextProps.props.value,"this.props.props.value",this.props.props.value)
          PubSub.publish(`${CusRefName}${ENUM.notifyFormToCheck}`,this.props.formItem);
        return true;
      }else{
        return false;
      }
    }
    else{
      return false;
    }
    
  }
   /**
   * 接受Form的推送的校验结果
   * 
   */
  /**
   * 
   * @param {*} msg 
   * @param {*} data 
   * @description 通过格式： {"prop":"name","errors":null,"fields":null}
   * @description 未通过格式:{"prop":"name","errors":[{"message":"请输入姓名","field":"name"}],"fields":{"name":[{"message":"请输入姓名","field":"name"}]}}
   */
  accetpCheckedResult(msg,data){ 
     if(data.prop==this.props.formItem.prop){
       if(!data.errors){
         this.setState({pass:true})
       }
       else{
         let txt=data.errors[0].message;
         this.setState({pass:false})
       }
       this.setState({afterValid:true})
     }
   }
     /**
   * 清楚表单效果
   */
  clearValidate(){
    this.setState({
      value:'',
      pass:true,
      afterValid:false,//是否对当前表单实施过校验的动作
  });
}
  render() {
    let props=this.props.props;
    let style=props.style?props.style:{};//普通样式覆盖
    let errStyle=props.errStyle?props.errStyle:{};//成功样式覆盖
    let succStyle=props.succStyle?props.succStyle:{};//失败样式覆盖
    //console.log("成功的样式",succStyle,this.props.props.value)
    let otherProps={};
    for(let k in props){
      //这三个特殊处理
      if(k!='style'||k!='onBlur'||k!="onChangeText"){
          otherProps[k]=props[k];
      }
    }
    //执行过校验的样式(不一定校验通过)
    let elInputPass=this.state.afterValid?this.endStyles.elInputPass:{};
    return (
       
        this.state.pass?(
          <TextInput
             {...otherProps}
            style={{...this.endStyles.elInput,...style,...elInputPass,...succStyle}}
            onChangeText={text => this.changeText(text)}
            onBlur={()=>this.onBlurFunc()}
            value={this.props.props.value}
            />
        ):(
          <TextInput
             {...otherProps}
            style={{...this.endStyles.elInput,...style,...this.endStyles.elInputError,...errStyle}}
            onChangeText={text => this.changeText(text)}
            onBlur={()=>this.onBlurFunc()}
            value={this.props.props.value}
            />
        )
    )
  }
  onBlurFunc(){
    
    let {checkOnBlur}=this.props.formItem;
   // console.log("失去焦点",checkOnBlur)
    //如果外层有传递onBlur函数
    if(typeof this.props.props.onBlur=="function"){
      this.props.props.onBlur();
    }
  
    if(checkOnBlur){
        this.checkValid();
    }
  }
  changeText(text){
      this.setState({value:text});
      if(typeof this.props.props.onChangeText=="function"){
        this.props.props.onChangeText(text);
      }
      let {checkOnBlur}=this.props.formItem;
     // console.log("checkOnBlur",checkOnBlur)
      if(!checkOnBlur){
        this.checkValid();
      //  console.log("这还能校验?,",checkOnBlur)
      }
  }
  checkValid(){
    let {CusRefName}=this.props.form;
    PubSub.publish(`${CusRefName}${ENUM.notifyFormToCheck}`,this.props.formItem)
  }
}
const styles = StyleSheet.create(STYLES);
ElInput.propTypes={
  props:PropTypes.object.isRequired,//TextInput组件的prop
  formItem:PropTypes.object.isRequired,//formItem携带的信息
  form:PropTypes.object.isRequired,//form携带的信息
}
export default  ElInput;
