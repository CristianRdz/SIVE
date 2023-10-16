import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const SplashScreen = () => {
  return (
    <View
      style={{flex: 1, justifyContent: 'center', backgroundColor: '#fff'}}>
      <ActivityIndicator size="large" color={'#000'} />
    </View>
  );
};

export default SplashScreen;
