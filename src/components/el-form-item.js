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
import PropTypes from 'prop-types'; // ES6
import ThemeContext from "./context"
import FormItemContext from "./contextFormItem"
import ENUM from "./enum"
import PubSub from 'pubsub-js'
import STYLES from "./styles"
 class elFormItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
        pass:true,//是否校验通过
        errTxt:"",//错误提示
    };
    this.accetpCheckedResult=this.accetpCheckedResult.bind(this);
    
  }
  componentDidMount() {
    //  console.log("formProps",this.context)
      let {CusRefName}=this.context;
      //通知Form添加校验规则
      console.log("`${CusRefName}${ENUM.addFieldSubScriber}`",`${CusRefName}${ENUM.addFieldSubScriber}`)
      PubSub.publish(`${CusRefName}${ENUM.addFieldSubScriber}`,this.props);
      //接收错误信息
      PubSub.subscribe(`${CusRefName}${ENUM.accetpCheckedResult}`, this.accetpCheckedResult);

  }
  componentWillUnmount(){
    let {CusRefName}=this.context;
    console.log("开始卸载",this.props)
    PubSub.publish(`${CusRefName}${ENUM.removeFieldSubScriber}`, this.props);
    //不在接收结果
    PubSub.unsubscribe(`${CusRefName}${ENUM.accetpCheckedResult}`);
  }
  componentWillReceiveProps(nextProps,nextState){
    if(nextProps.value!=this.props.value){
     // console.log("before:",this.props.propVal,"next:",nextProps.propVal)
     //子节点非自定义表单才执行校验
      if(!this.props.customInput){
        let {CusRefName}=this.context;
        PubSub.publish(`${CusRefName}${ENUM.notifyFormToCheck}`,this.props);
      }
      
      return true;
    }else{
      return false;
    }
    console.log("this",this)
    return true;
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
   console.log("表单接收校验结果",JSON.stringify(data),data.prop==this.props.prop,data.prop,this.props.prop)

    if(data.prop==this.props.prop){
      if(!data.errors){
        this.setState({pass:true,errTxt:null})
      }
      else{
        let txt=data.errors[0].message;
        console.log("没通过的错误文字",txt)
        this.setState({pass:false,errTxt:txt})
      }
    }
  }
  getLabelWidth(){
    let labelWidthStyle='';
    try{
      if(this.props.hasOwnProperty("labelWidth")&&!isNaN(Number(this.props.labelWidth))){
        labelWidthStyle=this.props.labelWidth
      }
      else if(this.context.hasOwnProperty("labelWidth")&&!isNaN(Number(this.context.labelWidth))){
        labelWidthStyle=this.context.labelWidth
      }
    }catch(e){}
    return  labelWidthStyle;
  }
  errorTxt(){
     let labelWidth=this.getLabelWidth();
     let lablePaddingLeftStyle=labelWidth?{paddingLeft:labelWidth}:{};
     return (
       <View style={{...styles.formItemErrWrap,...lablePaddingLeftStyle}}>
          <Text style={styles.formItemErrorTxt}>{this.state.errTxt}</Text>
       </View>
     )
  }
  render() {
    let labelWidth=this.getLabelWidth();
    let lableWidthLeftStyle=labelWidth?{width:labelWidth}:{};
    let {label}=this.props;
        return (
            <View style={styles.formItemWrap}>
                <View style={styles.formItemInnerWrap} {...this.props}>
                    <View style={{...styles.formItemLeftWrap,...lableWidthLeftStyle}}>
                            <Text style={styles.formItemLeftText}>{label}</Text>
                    </View>
                    <View style={{flex:1}}>
                      <FormItemContext.Provider value={{...this.props}}>
                      { this.props.children}
                      </FormItemContext.Provider>
                    </View>
                </View>
                {!this.state.pass?this.errorTxt():null}
       
            </View>
        )
  }
}
elFormItem.propTypes={
    label:PropTypes.string,
    prop:PropTypes.string
  }
  elFormItem.contextType = ThemeContext;  
const styles = StyleSheet.create(STYLES);

export default elFormItem;