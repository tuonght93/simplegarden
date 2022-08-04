/**
 * @format
 */

import {AppRegistry} from 'react-native'
import 'react-native-get-random-values'
import App from './App'
import {name as appName} from './app.json'
import { typography } from './src/utils/typography'
typography()
AppRegistry.registerComponent(appName, () => App)
