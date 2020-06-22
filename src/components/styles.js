const LabelWidth=100;//表单左侧文字的宽度
const ErrorTxtWrapHeight=25;//错误提示文字容器的高度
const labelPaddingRight=10;
export default{
    //formItem相关样式====================
    formItemWrap:{
        position:"relative",
        marginBottom:20,
        paddingBottom:ErrorTxtWrapHeight
    },
    formItemInnerWrap:{
        flexDirection:"row",
        alignItems:"center",
        
    },
    formItemLeftTextWrap:{
        textAlign:"right"
    },
    formItemRequired:{
        color:"red",
        paddingRight:5
    },
    formItemErrWrap:{
        position:"absolute",
        left:0,
        bottom:0,
        height:ErrorTxtWrapHeight,
        justifyContent:"center",
        paddingLeft:LabelWidth+labelPaddingRight
    },
    formItemErrorTxt:{
        color:"red"
    },
    formItemLeftWrap:{
        width:LabelWidth,
        paddingRight:labelPaddingRight
    },
    formItemLeftText:{
        
    },
    //封装的input标签样式
    elInput:{
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius:5,
        paddingHorizontal:5
    },
    elInputError:{
        borderColor:'red',
        color:"red"
    },
    elInputPass:{
        borderColor:'green',
    }
   
}