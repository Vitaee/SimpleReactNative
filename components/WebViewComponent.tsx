import React from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useLocalSearchParams } from 'expo-router';


const WebViewScreen = () => {
  const { url } = useLocalSearchParams();
  
  return (
    <View style={styles.container}>
      <WebView source={{ uri: url }} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
    },
});

export default WebViewScreen;