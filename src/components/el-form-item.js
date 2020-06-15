import React, { Component,PureComponent} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types'; // ES6
import ThemeContext from "./context"
import FormItemContext from "./contextFormItem"
import ENUM from "./enum"
import PubSub from 'pubsub-js'
import STYLES from "./styles"
const styles = StyleSheet.create(STYLES);
class elFormItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pass: false,//是否校验通过
      errTxt: "",//错误提示
      field: null//子表单
    };
    //属于需要校验的表单
    this.needCheck = this.props.prop && this.props.rules && this.props.rules[0];
    this.endStyles = {};
    this.$accetpCheckedResult = this.$accetpCheckedResult.bind(this);
    this.$setChildField = this.$setChildField.bind(this);
    this.clearValidate = this.clearValidate.bind(this);
  }
  componentDidMount() {
    console.log("formProps", this.context)
    //最终匹配到的样式
    this.endStyles = this.context.styles ? StyleSheet.create(this.context.styles) : styles;
    let { CusRefName } = this.context;
    // if(this.needCheck){
    //     //通知Form添加校验规则
    //     PubSub.publish(`${CusRefName}${ENUM.addFieldSubScriber}`,this.props);
    //     //接收错误信息
    //     PubSub.subscribe(`${CusRefName}${ENUM.accetpCheckedResult}`, this.accetpCheckedResult);
    //     //清除校验UI效果
    //     PubSub.subscribe(`${CusRefName}${ENUM.clearValidate}`, this.clearValidate);
    // }
     if(this.needCheck){
         this.context.elForm.$addFieldSubScriber(this);
     }





  }
  // componentWillUnmount() {
  //   console.log("卸载!~!!!!",this)
  //   this.context.elForm.$removeFieldSubScriber(this)
  // }

  /**
   * 清楚表单效果
   */
  clearValidate() {
    this.setState({
      pass: true,//是否校验通过
      errTxt: "",//错误提示
    });
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
   * @description 未通过格式:{"message":"请输入姓名","field":"name2"}
   */
  $accetpCheckedResult(data) {
    console.log("表单接收校验结果", JSON.stringify(data))
    if (data) {
      //更新当前组件的提示
      this.setState({ pass: false, errTxt: data.message })
      //更新子组件的样式
      this.updateChildFieldStyle(data);
    }
    else {
      this.setState({ pass: true, errTxt: null })
      //更新子组件的样式
      this.updateChildFieldStyle(data);
    }
  }
  updateChildFieldStyle(data) {
    if (this.state.field && typeof this.state.field.$accetpCheckedResult === 'function') {
      this.state.field.$accetpCheckedResult(data);
    }
  }
  $setChildField(elInput) {
    this.setState({ 'field': elInput }, () => {
      console.log("input=== field", this.state.field)
    });
  }
  getLabelWidth() {
    let labelWidthStyle = '';
    try {
      if (this.props.hasOwnProperty("labelWidth") && !isNaN(Number(this.props.labelWidth))) {
        labelWidthStyle = this.props.labelWidth
      }
      else if (this.context.hasOwnProperty("labelWidth") && !isNaN(Number(this.context.labelWidth))) {
        labelWidthStyle = this.context.labelWidth
      }
    } catch (e) { }
    return labelWidthStyle;
  }
  errorTxt() {
    let labelWidth = this.getLabelWidth();
    let lablePaddingLeftStyle = labelWidth ? { paddingLeft: labelWidth } : {};
    return (
      <View style={{ ...this.endStyles.formItemErrWrap, ...lablePaddingLeftStyle }}>
        <Text style={this.endStyles.formItemErrorTxt}>{this.state.errTxt}</Text>
      </View>
    )
  }
  render() {
    let labelWidth = this.getLabelWidth();
    let lableWidthLeftStyle = labelWidth ? { width: labelWidth } : {};
    let { label } = this.props;
    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { field: this.props.prop, formItem: this })
    );

    return (
      <View style={this.endStyles.formItemWrap}>
        <View style={this.endStyles.formItemInnerWrap} {...this.props}>
          <View style={{ ...this.endStyles.formItemLeftWrap, ...lableWidthLeftStyle }}>
            <Text style={this.endStyles.formItemLeftText}>{label}</Text>
          </View>
          <View style={{ flex: 1 }}>
            {childrenWithProps}
          </View>
        </View>
        {!this.state.pass ? this.errorTxt() : null}

      </View>
    )
  }
}
elFormItem.propTypes = {
  label: PropTypes.string,
  prop: PropTypes.string
}
elFormItem.contextType = ThemeContext;


export default elFormItem;