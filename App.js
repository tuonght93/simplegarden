import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import { LogBox } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import NetInfo from "@react-native-community/netinfo";
import DropdownAlert from 'react-native-dropdownalert';
import appReducers from './src/reducers/index';
import Route from './src/routers';

LogBox.ignoreAllLogs(['Warning: ...']);
const store = createStore(
  appReducers,
  applyMiddleware(thunk),
);

export default function App() {

  const [firstApp, setFirstApp] = useState(true);

  const dropDownAlertRef = useRef(null);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setFirstApp(false)
        dropDownAlertRef.current.alertWithType('error', '', 'Không có kết nối internet');
      }
      if (state.isConnected) {
        if (!firstApp) {
          setFirstApp(true)
        }
        dropDownAlertRef.current.closeAction()
      }
    });
  }, [])

  return (
    <Provider store={store}>
      <Route />
      <DropdownAlert ref={dropDownAlertRef} errorImageSrc={require('./src/assets/wifi_disconnect.png')} closeInterval={10000000000} tapToCloseEnabled={false} panResponderEnabled={true} contentContainerStyle={{ flexDirection: 'row', flex: 1, alignItem: 'center' }} containerStyle={{ padding: 0, flexDirection: 'row', alignItem: 'center' }} defaultTextContainer={{ flex: 1 }} messageStyle={{ fontSize: 14, textAlign: 'left', fontWeight: 'normal', color: 'white', backgroundColor: 'transparent', paddingLeft: 10 }} imageStyle={{ padding: 4, width: 20, height: 20, alignSelf: 'center' }} errorColor={'#4c4545'} />
    </Provider>
  );
}