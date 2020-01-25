/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{ Component} from 'react';
import  {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import Demo from "./src/demo"
import Demo2 from "./src/demo2"
import Demo3 from "./src/demo3"
import Demo4 from "./src/demo4"
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        type:"demo4",
        list:[
           "demo1",
           "demo2",
           "demo3",
           "demo4"
        ]
    };
  }
   render(){
    return (
      <View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
              <ScrollView alwaysBounceHorizontal={true} style={{marginBottom:10,paddingVertical:10,borderBottomColor:"#ccc",borderBottomWidth:1}}>
                <View style={{flexDirection:"row"}}>
                {
                    this.state.list.map(item=>{
                       return (
                        <TouchableOpacity key={item} style={{marginLeft:5}} onPress={()=>this.setState({type:item})}>
                            <View style={styles.normalBtn}>
                              <Text style={styles.normalBtnTxt}>{item}</Text>
                            </View>
                        </TouchableOpacity>
                       )
                    })
                  }
                </View>
                
            </ScrollView>
         
  
            {this.state.type=="demo1"?<Demo/>:null}
            {this.state.type=="demo2"?<Demo2/>:null}
            {this.state.type=="demo3"?<Demo3/>:null}
            {this.state.type=="demo4"?<Demo4/>:null}
          </ScrollView>
        </SafeAreaView>
        </View>
    )
   }
  
  
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
    
  },
  normalBtn:{
    backgroundColor:"#409eff",
    justifyContent:"center",
    alignItems:"center",
    height:35,
    borderRadius:5,
    width:80
},
normalBtnTxt:{
    color:'#fff'
},
});

export default App;
