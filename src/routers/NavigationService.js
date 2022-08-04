// import { StackActions } from '@react-navigation/native';
import * as React from 'react';
import { CommonActions } from '@react-navigation/native';
import { StackActions } from '@react-navigation/routers';

export const navigationRef = React.createRef();
// let navigator;

//  function setTopLevelNavigator(navigatorRef) {
//   navigator = navigatorRef;
// }

function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}


function replace(name, params = {}) {
  navigationRef.current && navigationRef.current?.dispatch(StackActions.replace(name, params));
}

function goBack() {
  navigationRef.current?.goBack()
}

function setParams(key, value) {
  navigationRef.dispatch(
    CommonActions.setParams({
       [key]: value,
     }),
  );
}


 export default {
  navigate,
  setParams,
  goBack,
  replace,
 };