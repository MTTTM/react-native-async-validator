const LabelWidth = 130;//表单左侧文字的宽度
const ErrorTxtWrapHeight = 25;//错误提示文字容器的高度
const labelPaddingRight = 10;
export default {
    //formItem相关样式====================
    formItemWrap: {
        position: "relative",
        marginBottom: 20,
        paddingBottom: ErrorTxtWrapHeight
    },
    formItemInnerWrap: {
        flexDirection: "row",
        alignItems: "center",

    },
    formItemLeftTextWrap: {
        textAlign: "right"
    },
    formItemRequired: {
        color: "orange",
        letterSpacing:10
    },
    formItemErrWrap: {
        position: "absolute",
        left: 0,
        bottom: 0,
        height: ErrorTxtWrapHeight,
        justifyContent: "center",
        paddingLeft: LabelWidth + labelPaddingRight
    },
    formItemErrorTxt: {
        color: "orange"
    },
    formItemLeftWrap: {
        width: LabelWidth,
        paddingRight: labelPaddingRight
    },
    formItemLeftText: {
        fontSize: 14,
        color: "#999"
    },
    //封装的input标签样式
    elInput: {
        height: 40,
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 5,
        paddingLeft:40
    },
    elInputError: {
        borderColor: 'orange',
        color: "orange"
    },
    elInputPass: {
        borderColor: 'blue',
    }

}