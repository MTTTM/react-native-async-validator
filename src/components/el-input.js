import React, { Component,PureComponent } from 'react';
import {
  StyleSheet,
  TextInput,
} from 'react-native';
import ThemeContext from "./context"
import STYLES from "./styles"
class ElInput extends PureComponent {
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
    // console.log("this.endStyles", this.endStyles)
    // try{
    //   this.endStyles=this.context.elForm.styles?StyleSheet.create(this.context.elForm.styles):STYLES.elInput;
    // }catch(e){}
    this.$accetpCheckedResult = this.$accetpCheckedResult.bind(this);
    this.$clearValidate = this.$clearValidate.bind(this);
  }
  componentDidMount() {
    //给el-form-item添加自己
    this.props.formItem.$setChildField(this)
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
    // console.log("input 错误检查", data)
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
$clearValidate() {
    this.setState({
      value: '',
      pass: true,
      afterValid: false,//是否对当前表单实施过校验的动作
    });
  }
  render() {
    let props = this.props;
    let fromStyle=this.context.elForm.props.styles;
    //Form 的样式覆盖
    let errStyle = fromStyle&&fromStyle.elInputError ? Object.assign({},this.endStyles.elInputError,fromStyle.elInputError) :  this.endStyles.elInputError;//失败样式覆盖 
    let succStyle = fromStyle&&fromStyle.elInputPass ? Object.assign({},this.endStyles.elInputPass,fromStyle.elInputPass) :  this.endStyles.elInputPass;//成功样式覆盖
    let defaultStyle= fromStyle&&fromStyle.elInput?fromStyle.elInput :this.endStyles.elInput;//默认样式
    console.log("succStyle1",succStyle,fromStyle&&fromStyle.elInputPass,this.context.elForm.styles)
    //自身样式覆盖
    errStyle = props.errStyle ? Object.assign({},errStyle,props.errStyle) :  errStyle;//成功样式覆盖
    succStyle = props.succStyle ? Object.assign({},succStyle,props.succStyle,) :  succStyle;//失败样式覆盖
    defaultStyle= props.style?Object.assign({},defaultStyle,props.style):defaultStyle;
    let otherProps = {};
    for (let k in props) {
      //这三个特殊处理
      if (k != 'style' || k != 'onBlur' || k != "onChangeText") {
        otherProps[k] = props[k];
      }
    }
    //执行过校验的样式(不一定校验通过)
    let statusStyle=this.state.afterValid?(this.state.pass?succStyle:errStyle):{};
 
    return (
        <TextInput
          {...otherProps}
          style={{...defaultStyle, ...statusStyle }}
          onChangeText={text => this.changeText(text)}
          onBlur={() => this.onBlurFunc()}
          value={this.props.value}
        />
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
  }
  checkValid() {
    this.context.elForm.$acceptCheckField(this.props.formItem);
  }
}
ElInput.contextType = ThemeContext;
export default ElInput;
