import React from 'react';
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

const logo = require("../../../assets/images/icon.png");

interface AuthLayout {
  title: string;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: () => void;
  submitText: string;
  footerText: string;
  footerActionText: string;
  onFooterActionPress: () => void;
  showText: boolean;
}

const AuthLayoutComponent: React.FC<AuthLayout> = ({
  title,
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  submitText,
  footerText,
  footerActionText,
  onFooterActionPress,
  showText
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode='contain' />

      <Text style={styles.title}>{title}</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize='none'
        />
      </View>

      <View style={styles.rememberView}>
          <Pressable onPress={() => Alert.alert('Forget Password!')}>
              {showText ? (
              <Text style={styles.forgetText}>
                Forgot Password ?
              </Text> ) : ( null )
              }
          </Pressable>
      </View>

      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{submitText}</Text>
        </Pressable>
      </View>

      <Text style={styles.footerText}>
        {footerText}
        <Pressable onPress={onFooterActionPress}>
          <Text style={styles.signup}> {footerActionText}</Text>
        </Pressable>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container : {
      alignItems : "center",
      paddingTop: 70,
    },
    image : {
      height : 160,
      width : 170
    },
    title : {
      fontSize : 30,
      fontWeight : "bold",
      //textTransform : "uppercase",
      textAlign: "center",
      paddingVertical : 40,
      color : "purple"
    },
    inputView : {
      gap : 15,
      width : "100%",
      paddingHorizontal : 40,
      marginBottom  :5
    },
    input : {
      height : 50,
      paddingHorizontal : 20,
      borderColor : "purple",
      borderWidth : 1,
      borderRadius: 7
    },
    rememberView : {
      width : "100%",
      paddingHorizontal : 50,
      justifyContent: "space-between",
      alignItems : "center",
      flexDirection : "row",
      marginBottom : 8
    },
    switch :{
      flexDirection : "row",
      gap : 1,
      justifyContent : "center",
      alignItems : "center"
      
    },
    rememberText : {
      fontSize: 13,
    },
    forgetText : {
      fontSize : 11,
      color : "red"
    },
    button : {
      backgroundColor : "purple",
      height : 45,
      borderColor : "gray",
      borderWidth  : 1,
      borderRadius : 5,
      alignItems : "center",
      justifyContent : "center"
    },
    buttonText : {
      color : "white"  ,
      fontSize: 18,
      fontWeight : "bold"
    }, 
    buttonView :{
      width :"100%",
      paddingHorizontal : 50
    },
    optionsText : {
      textAlign : "center",
      paddingVertical : 10,
      color : "gray",
      fontSize : 13,
      marginBottom : 6
    },
    mediaIcons : {
      flexDirection : "row",
      gap : 15,
      alignItems: "center",
      justifyContent : "center",
      marginBottom : 23
    },
    icons : {
      width : 40,
      height: 40,
    },
    footerText : {
      textAlign: "center",
      color : "gray",
      marginTop: 6
    },
    signup : {
      color : "red",
      fontSize : 13
    }
  })
  

export default AuthLayoutComponent;