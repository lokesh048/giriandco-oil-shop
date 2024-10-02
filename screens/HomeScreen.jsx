import { useNavigation } from '@react-navigation/native';
// import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

//  AsyncStorage.setItem('giriapiip','192.168.0.174');
// AsyncStorage.getItem('giriapiip').then(asyncStorageRes => {
//   console.log(asyncStorageRes)
// });

const { width, height } = Dimensions.get('window');

  function WelcomeScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.mainContainer}>
            <View>
            <TouchableOpacity
                onPress={() => navigation.navigate('IP')}>
                <Text style={styles.title1}>EASY INVOICE 1.1</Text>
              </TouchableOpacity>
            </View>
          
            <Text style={styles.title}>GIRI & CO</Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assetimage/oilcan.jpg')}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.title2}>YEMYES TECHNOLOGIES</Text>
          </ScrollView>
        </View>
      );
    };
    
    export default WelcomeScreen;
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white',
      },
      mainContainer: {
        flexGrow: 1,
        justifyContent: 'space-around',
        paddingVertical: height * 0.01,
        paddingHorizontal: width * 0.05,
      },
      title: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: height * 0.05,
        textAlign: 'center',
      },
      title1: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: height * 0.025,
        textAlign: 'center',
        marginBottom: height * 0.04,
      },
      title2: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: height * 0.02,
        textAlign: 'right',
        marginTop: height *0.1,
      },
      imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: '80%',
        height: undefined,
        aspectRatio: 1,
      },
      buttonContainer: {
        alignItems: 'center',
        marginTop: height * 0.1,
      },
      button: {
        paddingVertical: height * 0.03,
        paddingHorizontal: width * 0.05,
        backgroundColor: 'yellow',
        borderRadius: 12,
        width: '80%',
      },
      buttonText: {
        fontSize: height * 0.02,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
      },
    });

