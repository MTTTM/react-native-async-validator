import React from 'react';
import ThemeContext from "./context"
import FormItemContext from "./contextFormItem"
import ElInput from "./el-input"
/**
 * 消费两个context，为input标签提供Provider
 */
export default function ContextForInput(props) {
    return (
      <ThemeContext.Consumer>
        {form => (
          <FormItemContext.Consumer>
            {formItem => (
              <ElInput formItem={formItem} form={form} props={props}/>
            )}
          </FormItemContext.Consumer>
        )}
      </ThemeContext.Consumer>
    );
  }
