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
   console.log("表单接收校验结果",JSON.stringify(data))

    if(data.prop==this.props.prop){
      if(!data.errors){
        this.setState({pass:true,errTxt:null})
      }
      else{
        let txt=data.errors[0].message;
        this.setState({pass:false,errTxt:txt})
      }
    }
  }
  errorTxt(){
    let {labelWidth}=this.context;
     return (
       <View style={styles.formItemErrWrap}>
          <Text style={styles.formItemErrorTxt}>{this.state.errTxt}</Text>
       </View>
     )
  }
  render() {
      let {label}=this.props;
        return (
            <View style={styles.formItemWrap}>
                <View style={styles.formItemInnerWrap} {...this.props}>
                    <View style={styles.formItemLeftWrap}>
                            <Text style={styles.formItemLeftText}>{label}</Text>
                    </View>
                    <View style={{flex:1}}>
                      <FormItemContext.Provider value={{...this.props}}>
                      { this.props.children}
                      </FormItemContext.Provider>
                    
                    </View>
                </View>
                {!this.pass?this.errorTxt():null}
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