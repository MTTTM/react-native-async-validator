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
var initLoading = null;
export default class elInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value:''
    };
  }
  componentDidMount() {}
  componentWillUnmount(){}
  render() {
        
        return (
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                {...this.props}
                onChangeText={text => this.changeText(text)}
                value={this.state.value}
                />
        )
  }
  changeText(text){
      this.setState({value:text})
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
