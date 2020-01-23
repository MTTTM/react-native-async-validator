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
      PubSub.publish(`${CusRefName}addFieldSubScriber`,this.props);
      //接收错误信息
      PubSub.subscribe(`${CusRefName}${ENUM.accetpCheckedResult}`, this.accetpCheckedResult);

  }
  componentWillUnmount(){}
  componentWillReceiveProps(nextProps,nextState){
    if(nextProps.propVal!=this.props.propVal){
     // console.log("before:",this.props.propVal,"next:",nextProps.propVal)
      let {CusRefName}=this.context;
      PubSub.publish(`${CusRefName}${ENUM.notifyFormToCheck}`,this.props);
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
       <View style={{...styles.formItemErrWrap,paddingLeft:labelWidth}}>
          <Text style={styles.formItemErrorTxt}>{this.state.errTxt}</Text>
       </View>
     )
  }
  render() {
      let {label}=this.props;
      let {labelWidth,labelPosition}=this.context;
        return (
            <View style={styles.formItemWrap}>
                <View style={styles.formItemInnerWrap} {...this.props}>
                    <View style={{width:labelWidth}}>
                            <Text style={{textAlign:labelPosition?labelPosition:"right"}}>{label}</Text>
                    </View>
                    <View style={{flex:1}}>
                    { this.props.children}
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