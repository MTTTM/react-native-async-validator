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
import Demo5 from "./src/demo5"
import Demo6 from "./src/demo6"
import Demo7 from "./src/demo7"
// import Demo8 from "./src/demo8"
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        type:"demo7",
        list:[
           "demo1",
           "demo2",
           "demo3",
           "demo4",
           "demo5",
           "demo6",
           "demo7",
           "demo8"
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
              <ScrollView horizontal={true} alwaysBounceHorizontal={true} style={{width:"100%",marginBottom:10,paddingVertical:10,borderBottomColor:"#ccc",borderBottomWidth:1}}>
                <View style={{flexDirection:"row"}}>
                {
                    this.state.list.map(item=>{
                       return (
                          item==this.state.type?(
                            <TouchableOpacity key={item} style={{marginLeft:5}}>
                              <View style={styles.activityBtn}>
                                <Text style={styles.normalBtnTxt}>{item}</Text>
                              </View>
                           </TouchableOpacity>
                          ):(
                            <TouchableOpacity key={item} style={{marginLeft:5}} onPress={()=>this.setState({type:item})}>
                            <View style={styles.normalBtn}>
                              <Text style={styles.normalBtnTxt}>{item}</Text>
                            </View>
                         </TouchableOpacity>
                          )
                       )
                    })
                  }
                </View>
                
            </ScrollView>
         
  
            {this.state.type=="demo1"?<Demo/>:null}
            {this.state.type=="demo2"?<Demo2/>:null}
            {this.state.type=="demo3"?<Demo3/>:null}
            {this.state.type=="demo4"?<Demo4/>:null}
            {this.state.type=="demo5"?<Demo5/>:null}
            {this.state.type=="demo6"?<Demo6/>:null}
            {this.state.type=="demo7"?<Demo7/>:null}
            {this.state.type=="demo8"?<Demo8/>:null}
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
activityBtn:{
  backgroundColor:"orange",
  justifyContent:"center",
  alignItems:"center",
  height:35,
  borderRadius:5,
  width:80
},
});

export default App;
