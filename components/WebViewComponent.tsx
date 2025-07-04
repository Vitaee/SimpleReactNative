import React from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useLocalSearchParams } from 'expo-router';


const WebViewScreen = () => {
  const { url } = useLocalSearchParams();
  
  // Ensure url is a string and not an array
  const urlString = Array.isArray(url) ? url[0] : url;
  
  return (
    <View style={styles.container}>
      <WebView source={{ uri: urlString }} />
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