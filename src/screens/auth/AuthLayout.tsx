import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { FORGOT_PASS_SCREEN } from '@/constants/Routes';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Button, Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

const logo = require("../../../assets/images/icon.png");

interface AuthLayout {
  title: string;
  email: string;
  setEmail: (email: string) => void;
  emailPlaceHolder: string;
  password: string | null;
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
  emailPlaceHolder = "Email",
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.select({ ios: 50, android: 70 })}
    >
      <ParallaxScrollView contentContainerStyle={styles.scrollContent}>
          <ThemedView style={styles.container}>
            <Image source={logo} style={styles.image} resizeMode='cover' />

            <Text style={styles.title}>{title}</Text>

            <ThemedView style={styles.inputView}>
              <TextInput
                style={styles.input}
                placeholder={emailPlaceHolder}
                value={email}
                onChangeText={setEmail}
                autoCorrect={false}
                autoCapitalize='none'
              />
              {password !== null ?             
              <TextInput
                style={styles.input}
                placeholder='Password'
                secureTextEntry
                value={password!}
                onChangeText={setPassword}
                autoCorrect={false}
                autoCapitalize='none'
              /> : null}

            </ThemedView>

            <ThemedView style={styles.rememberView}>
                <Pressable onPress={() => router.push(FORGOT_PASS_SCREEN)}>
                    {showText ? (
                    <Text style={styles.forgetText}>
                      Forgot Password ?
                    </Text> ) : ( null )
                    }
                </Pressable>
            </ThemedView>

            <ThemedView style={styles.buttonView}>
              <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>{submitText}</Text>
              </Pressable>
            </ThemedView>

            <Text style={styles.footerText}>
              {footerText}
              <Pressable onPress={onFooterActionPress}>
                <Text style={styles.signup}> {footerActionText}</Text>
              </Pressable>
            </Text>
          </ThemedView>
      </ParallaxScrollView>
    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
    container : {
      alignItems : "center",
      paddingTop: 60,
    },
    image : {
      height : 160,
      width : 170
    },
    title : {
      fontSize : 30,
      fontWeight : "bold",
      textAlign: "center",
      paddingVertical : 40,
  
    },
    inputView : {
      gap : 15,
      width : "140%",
      marginBottom  :5,
    },
    input : {
      height : 50,
      paddingHorizontal : 10,
      borderColor : "gray",
      borderWidth : 1,
      borderRadius: 7,
      backgroundColor: 'gray'
    },
    rememberView : {
      width : "100%",
      //paddingHorizontal : 50,
      flexDirection : "row",
      marginBottom : 8,
      marginTop: 8
    },
    switch :{
      flexDirection : "row",
      gap : 1,
      justifyContent : "center",
      alignItems : "center"
    },
    forgetText : {
      fontSize : 14,
      color : "red"
    },
    button : {
      backgroundColor : "purple",
      height : 45,
      borderColor : "gray",
      borderWidth  : 1,
      borderRadius : 5,
      alignItems : "center",
      justifyContent : "center",
      marginTop: 6
    },
    buttonText : {
      color : "white",
      fontSize: 18,
      fontWeight : "bold"
    }, 
    buttonView :{
      width :"100%",
    },
    icons : {
      width : 40,
      height: 40,
    },
    footerText : {
      color : "gray",
      marginTop: 6
    },
    signup : {
      color : "red",
    },
    headerImage: {
      color: '#808080',
      bottom: -90,
      left: -35,
      position: 'absolute',
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    scrollContent: {
      flexGrow: 1,
      alignItems: 'center',
    },
  })
  

export default AuthLayoutComponent;