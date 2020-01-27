/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
/**
 * npm 发布包的几个流程
 * 1.npm login
 * 2.修改package.json的包，选择需要提交的文件（package.json和reade.md是默认的无法忽略）
 * 3.npm publish --dry-run 测试有效提交文件
 * 4.npm publish 提交成功
 */
