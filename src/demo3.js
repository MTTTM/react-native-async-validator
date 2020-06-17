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
      canpush: false,
      dynamicValidateForm: {
        name: 'dfdfff',
        phone: "",
        picker: "",
        nickname: ""
      },
      showPhone: true,
      showName: true
    };
  }
  componentDidMount() { }
  render() {
    let { dynamicValidateForm } = this.state;
    return (
      <View style={{ marginHorizontal: 10 }}>
        <View style={{ paddingVertical: 10, marginBottom: 10, borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
          <Text>Dynamic form fields (object)</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ marginLeft: 5 }}
            onPress={() => this.setState({ showPhone: !this.state.showPhone })}>
            <View style={styles.normalBtn}>
              <Text style={styles.normalBtnTxt}>{this.state.showPhone ? 'hide phone' : "show phone"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 5 }}
            onPress={() => this.setState({ showName: !this.state.showName })}>
            <View style={styles.normalBtn}>
              <Text style={styles.normalBtnTxt}>{this.state.showName ? 'hide nickname' : "shownickname"}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Form.elForm
          model={dynamicValidateForm}
          canPushChange={pass => this.setState({ canpush: pass })}
          ref="dynamicValidateForm">
          <Form.elFormItem
            label="name:"
            prop="name"
            rules={[
              { required: true, message: 'input your name'}
            ]}
          >
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              value={dynamicValidateForm.name}
              placeholder="input your name"
              onChangeText={text => this.changeText('name', text)}
            />
          </Form.elFormItem>
          {
            this.state.showPhone ? (
              <Form.elFormItem
                label="phone:"
                prop="phone"
                rules={[
                  { required: true, message: 'input your phone' },
                  { pattern: /^\d{6}$/, message: 'Please enter 6 Arabic numerals' }
                ]}
              >
                <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                  value={dynamicValidateForm.phone}
                  placeholder="input your phone"
                  onChangeText={text => this.changeText('phone', text)}
                />
              </Form.elFormItem>
            ) : null
          }

          {
            this.state.showName ? (
              <Form.elFormItem
                label="nickname:"
                prop="nickname"
                customInput={true}
                rules={[
                  { required: true, message: 'input your nickname' },
                ]}
              >
                <Form.elInput
                  value={dynamicValidateForm.nickname}
                  placeholder="The input element from library"
                  onChangeText={text => this.changeText('nickname', text)}
                />
              </Form.elFormItem>
            ) : null
          }



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
    let obj = {...this.state.dynamicValidateForm};
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
  normalBtnTxt: {
    color: '#fff'
  },
  disabledBtn: {
    backgroundColor: "#dcdfe6"
  },
  disabledBtnTxt: {
    color: "#ccc"
  }
});
