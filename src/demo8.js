import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Picker
} from 'react-native';
import Form from "./index"
export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dynamicValidateForm: {
        name: '',
        nickname: "",
        phone: ""
      },
      canpush:false
    };
  }
  componentDidMount() { }
  render() {
    let { dynamicValidateForm } = this.state;
    return (
      <View style={{ marginHorizontal: 10 }}>
        <View style={{ paddingVertical: 10, marginBottom: 10, borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
          <Text>Function </Text>
        </View>
        <Form.elForm
          model={dynamicValidateForm}
          labelWidth={60}
          canPushChange={pass => this.setState({ canpush: pass })}
          ref="dynamicValidateForm">


          <ScrollView horizontal={true} alwaysBounceHorizontal={true} style={{ width: "100%", marginBottom: 10, paddingVertical: 10, borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
            <TouchableOpacity
              onPress={() => this.setState({
                dynamicValidateForm: {
                  name: "lucy2", nickname: "",
                  phone: ""
                }
              })}>
              <View style={styles.normalBtn2}>
                <Text style={styles.normalBtnTxt}>set name</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginLeft: 5 }}
              onPress={() => {
                let t = this.state.dynamicValidateForm;
                t.name = ""
                this.setState({ dynamicValidateForm: { ...t } })
              }}>
              <View style={styles.normalBtn2}>
                <Text style={styles.normalBtnTxt}>clear name</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 5 }}
              onPress={() => this.refs.dynamicValidateForm.validateField("name", (err) => {
                console.log("通过了不?", err)
              })}>
              <View style={styles.activityBtn}>
                <Text style={styles.normalBtnTxt}>check name</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 5 }}
              onPress={() => this.refs.dynamicValidateForm.clearValidate()}>
              <View style={{ ...styles.activityBtn, width: 120 }}>
                <Text style={styles.normalBtnTxt}>Clear effect</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 5 }}
              onPress={() => this.resetField()}>
              <View style={{ ...styles.activityBtn, width: 180, backgroundColor: "#f56c6c" }}>
                <Text style={styles.normalBtnTxt}>Clear effect and value</Text>
              </View>
            </TouchableOpacity>

          </ScrollView>
          <View style={{ paddingVertical: 10 }}><Text>The name will be verified only if it loses focus, mainly to facilitate the test effect</Text></View>
          <Form.elFormItem
            label="name:"
            prop="name"
            checkOnBlur={true}
            rules={[
              { required: true, message: 'input' },
            ]}
          >
            <Form.elInput
              value={dynamicValidateForm.name}
              placeholder="check after blur"
              onChangeText={text => this.changeText('name', text)}
            />
          </Form.elFormItem>
          <Form.elFormItem
            label="phone:"
            prop="phone"
          >
            <Form.elInput
              value={dynamicValidateForm.phone}
              placeholder="no check field"
              onChangeText={text => this.changeText('phone', text)}
            />
          </Form.elFormItem>

          <Form.elFormItem
            label="nickname:"
            prop="nickname"
            rules={[
              { required: true, message: 'input nickname' },
            ]}
          >
            <Form.elInput
              value={dynamicValidateForm.nickname}
              placeholder="input nickname"
              onChangeText={text => this.changeText('nickname', text)}
            />
          </Form.elFormItem>

          <View style={{ marginTop: 20 }}>
            {
              this.state.canpush ? (
                <TouchableOpacity onPress={((() => this.submit()))}>
                  <View style={styles.normalBtn}>
                    <Text style={styles.normalBtnTxt}>submit</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                  <TouchableOpacity activeOpacity={1}>
                    <View style={{ ...styles.normalBtn, ...styles.disabledBtn }}>
                      <Text style={{ ...styles.normalBtnTxt, ...styles.disabledBtnTxt }}>submit</Text>
                    </View>
                  </TouchableOpacity>
                )
            }
          </View>
        </Form.elForm>
      </View>
    )
  }
  changeText(type, text) {
    let obj = { ...this.state.dynamicValidateForm };
    obj[type] = text;
    this.setState({ dynamicValidateForm: obj })
  }
  submit() {
    this.refs['dynamicValidateForm'].validate(res => {
      console.log("校验", res)
      if (!res) {
        alert("提交成功")
      }
    })
  }
  resetField() {

    this.setState({
      dynamicValidateForm: {
        name: '',
        nickname: "",
        phone: ""
      }
    }, () => {
      this.refs.dynamicValidateForm.clearValidate()
    })
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  normalBtn: {
    backgroundColor: "#409eff",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    borderRadius: 5
  },
  normalBtn2: {
    backgroundColor: "#409eff",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    paddingHorizontal: 5,
    marginLeft: 5,
    borderRadius: 5
  },
  normalBtnTxt: {
    color: '#fff'
  },
  disabledBtn: {
    backgroundColor: "#dcdfe6"
  },
  disabledBtnTxt: {
    color: "#ccc"
  },
  activityBtn: {
    backgroundColor: "#67c23a",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    height: 35,
    borderRadius: 5,
  },
});
