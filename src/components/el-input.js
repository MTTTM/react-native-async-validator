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
     this.accetpCheckedResult=this.accetpCheckedResult.bind(this);
  }
  componentDidMount() {
    console.log("inputprops",this.props)
     let {CusRefName}=this.props.form;
    //  //接收错误信息
      PubSub.subscribe(`${CusRefName}${ENUM.accetpCheckedResult}`, this.accetpCheckedResult);
  }
  componentWillUnmount(){}
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
     }
     this.setState({afterValid:true})

   }
  render() {
    let props=this.props.props;
    let style=props.style?props.style:{};//普通样式覆盖
    let errStyle=props.errStyle?props.errStyle:{};//成功样式覆盖
    let succStyle=props.succStyle?props.succStyle:{};//失败样式覆盖
    let otherProps={};
    for(let k in props){
      //这三个特殊处理
      if(k!='style'||k!='onBlur'||k!="onChangeText"){
          otherProps[k]=props[k];
      }
    }
    let elInputPass=this.state.afterValid?styles.elInputPass:{};
    console.log("this.state.afterValid",this.state.afterValid)
    return (
       
        this.state.pass?(
          <TextInput
             {...otherProps}
            style={{...styles.elInput,...style,...elInputPass,...succStyle}}
            onChangeText={text => this.changeText(text)}
            onBlur={()=>this.onBlurFunc()}
            value={this.state.value}
            />
        ):(
          <TextInput
             {...otherProps}
            style={{...styles.elInput,...style,...styles.elInputError,...errStyle}}
            onChangeText={text => this.changeText(text)}
            onBlur={()=>this.onBlurFunc()}
            value={this.state.value}
            />
        )
    )
  }
  onBlurFunc(){
    console.log("失去焦点",checkOnBlur)
    let {checkOnBlur}=this.props.formItem;
   
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
      console.log("checkOnBlur",checkOnBlur)
      if(!checkOnBlur){
        this.checkValid();
        console.log("这还能校验?,",checkOnBlur)
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
