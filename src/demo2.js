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
        name: '',
        phone: "",
        picker: "",
        nickname: ""
      }
    };

  }
  render() {
    let { dynamicValidateForm, canpush } = this.state;
    return (
      <View style={{ marginHorizontal: 10 }}>
        <View style={{ paddingVertical: 10, marginBottom: 10, borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
          <Text>Automatic inspection</Text>
        </View>
        <Form.elForm
          model={this.state.dynamicValidateForm}
          canPushChange={(pass,err) => {
            this.setState({ canpush: pass })
            console.log("canPushChange errs fields",err)
          }}
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
          <Form.elFormItem
            label="phone:"
            prop="phone"
            rules={[
              { required: true, message: 'input your phone ' },
              { pattern: /^\d{6}$/, message: 'Please enter 6 Arabic numerals' }
            ]}
          >
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              value={dynamicValidateForm.phone}
              placeholder="input your phone"
              maxLength={6}
              onChangeText={text => this.changeText('phone', text)}
            />
          </Form.elFormItem>

          <Form.elFormItem
            label="nickname:"
            prop="nickname"
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

          <Form.elFormItem
            label="picker:"
            prop="picker"
            rules={[
              { required: true, message: 'picker what you want' }
            ]}
          >
            <Picker
              selectedValue={this.state.dynamicValidateForm.picker}
              style={{ height: 200, width: 100, borderColor: 'gray', borderWidth: 1 }}
              onValueChange={(itemValue, itemIndex) =>
                this.changeText('picker', itemValue)
              }>
              <Picker.Item label="=picker=" value="" />
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
              <Picker.Item label="css" value="css" />
            </Picker>
          </Form.elFormItem>

          <View style={{ marginTop: 20 }}>
            {
              canpush ? (
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
    this.setState({ dynamicValidateForm: obj }, () => {
    })
  }
  submit() {
    this.refs['dynamicValidateForm'].validate(res => {
      if (!res) {
        alert("success")
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
