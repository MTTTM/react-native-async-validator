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
import PubSub from 'pubsub-js'
 class elFormItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }
  componentDidMount() {
    //  console.log("formProps",this.context)
      let {CusRefName}=this.context;
      console.log("CusRefName",CusRefName)

        PubSub.publish(`${CusRefName}addFieldSubScriber`,this.props);

  }
  componentWillUnmount(){}
  render() {
      let {label}=this.props;
      let {labelWidth,labelPosition}=this.context;
        return (
            <View style={styles.container} {...this.props}>
                <View style={{width:labelWidth}}>
                        <Text style={{textAlign:labelPosition?labelPosition:"right"}}>{label}</Text>
                </View>
                <View style={{flex:1}}>
                { this.props.children}
                </View>
            </View>
        )
  }
}
elFormItem.propTypes={
    label:PropTypes.string,
    prop:PropTypes.string
  }
  elFormItem.contextType = ThemeContext;  
const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
    alignItems:"center",
    marginBottom:20
  },

});

export default elFormItem;