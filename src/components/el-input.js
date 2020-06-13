import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
} from 'react-native';
import ThemeContext from "./context"
import STYLES from "./styles"
import PubSub from 'pubsub-js'
import ENUM from "./enum"
import PropTypes from 'prop-types'; // ES6
class ElInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      pass: true,
      afterValid: false,//是否对当前表单实施过校验的动作
    };
    //属于需要校验的表单
    this.needCheck = this.props.formItem.prop && this.props.formItem.rules && this.props.formItem.rules[0];
    this.endStyles = STYLES;
    console.log("this.endStyles", this.endStyles)
    // try{
    //   this.endStyles=this.context.elForm.styles?StyleSheet.create(this.context.elForm.styles):STYLES.elInput;
    // }catch(e){}
    this.$accetpCheckedResult = this.$accetpCheckedResult.bind(this);
    this.clearValidate = this.clearValidate.bind(this);
  }
  componentDidMount() {
    console.log("input---", this.props)
    if (this.needCheck) {

      // let {CusRefName}=this.props.form;
      // //  //接收错误信息
      //   PubSub.subscribe(`${CusRefName}${ENUM.accetpCheckedResult}`, this.accetpCheckedResult);
      //    //清除校验UI效果
      //    PubSub.subscribe(`${CusRefName}${ENUM.clearValidate}`, this.clearValidate);
    }
    this.props.formItem.$setChildField(this)

  }
  componentWillUnmount() {
    // if(this.needCheck){
    //   let {CusRefName}=this.props.form;
    //   //不在接收结果
    //   PubSub.unsubscribe(`${CusRefName}${ENUM.accetpCheckedResult}`);
    //   //拒绝再处理清空UI事务
    //   PubSub.unsubscribe(`${CusRefName}${ENUM.clearValidate}`);
    // }
  }
  componentWillReceiveProps(nextProps, nextState) {
    if (this.needCheck) {

      let { CusRefName } = this.props.form;
      //两次值不一样，且非失去焦点才校验，才会触发校验
      //这里需要使用绝对不等于，因为undefined!="" 等于false，
      //但是我们需要他们等同，所以且需要取反反做对比
      //||(!!nextProps.props.value||!!this.props.props.value))

      if (nextProps.props.value !== this.props.props.value && !this.props.formItem.checkOnBlur) {
        //  console.log("表单触发的校验",this.props.formItem.prop,"nextProps.props.value",nextProps.props.value,"this.props.props.value",this.props.props.value)
        // PubSub.publish(`${CusRefName}${ENUM.notifyFormToCheck}`,this.props.formItem);
        return true;
      } else {
        return false;
      }
    }
    else {
      return false;
    }

  }
  /**
  * 接受Form的推送的校验结果
  * 
  */
  /**
   * 
   * @param {*} data 
   * @description 通过格式：null
   * @description 未通过格式:{message: "请输入昵称", field: "nickname"}
   */
  $accetpCheckedResult(data) {
    console.log("input 错误检查", data)
    if (!data) {
      this.setState({ pass: true })
    }
    else {
      this.setState({ pass: false })
    }
    this.setState({ afterValid: true })
  }
  /**
* 清楚表单效果
*/
  clearValidate() {
    this.setState({
      value: '',
      pass: true,
      afterValid: false,//是否对当前表单实施过校验的动作
    });
  }
  render() {
    let props = this.props;
    let style = props.style ? props.style : {};//普通样式覆盖
    let errStyle = props.errStyle ? props.errStyle : {};//成功样式覆盖
    let succStyle = props.succStyle ? props.succStyle : {};//失败样式覆盖
    //console.log("成功的样式",succStyle,this.props.props.value)
    let otherProps = {};
    for (let k in props) {
      //这三个特殊处理
      if (k != 'style' || k != 'onBlur' || k != "onChangeText") {
        otherProps[k] = props[k];
      }
    }
    //执行过校验的样式(不一定校验通过)
    let elInputPass = this.state.afterValid ? this.endStyles.elInputPass : {};
    return (

      this.state.pass ? (
        <TextInput
          {...otherProps}
          style={{ ...this.endStyles.elInput, ...style, ...elInputPass, ...succStyle }}
          onChangeText={text => this.changeText(text)}
          onBlur={() => this.onBlurFunc()}
          value={this.props.value}
        />
      ) : (
          <TextInput
            {...otherProps}
            style={{ ...this.endStyles.elInput, ...style, ...this.endStyles.elInputError, ...errStyle }}
            onChangeText={text => this.changeText(text)}
            onBlur={() => this.onBlurFunc()}
            value={this.props.value}
          />
        )
    )
  }
  onBlurFunc() {
    let { checkOnBlur } = this.props.formItem.props;
    if (typeof this.props.onBlur == "function") {
      this.props.onBlur();
    }
    if (checkOnBlur) {
      this.checkValid();
    }
  }
  changeText(text) {
    this.setState({ value: text });
    if (typeof this.props.onChangeText == "function") {
      this.props.onChangeText(text);
    }
    let { checkOnBlur } = this.props.formItem.props;
    if (!checkOnBlur) {
      this.checkValid();
    }
  }
  checkValid() {
    // let {CusRefName}=this.props.form;
    // PubSub.publish(`${CusRefName}${ENUM.notifyFormToCheck}`,this.props.formItem)
    console.log("表单触发的  this.props.formItem", this.props.formItem)
    this.context.elForm.$acceptCheckField(this.props.formItem);
  }
}
const styles = StyleSheet.create(STYLES);
// ElInput.propTypes={
//   props:PropTypes.object.isRequired,//TextInput组件的prop
//   formItem:PropTypes.object.isRequired,//formItem携带的信息
//   form:PropTypes.object.isRequired,//form携带的信息
// }
ElInput.contextType = ThemeContext;
export default ElInput;
