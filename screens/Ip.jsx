import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import RNRestart from 'react-native-restart';


const IPAddressScreen = ({ navigation }) => {
  const [currentIp, setCurrentIp] = useState('192.168.0.174');
  const [ipInput, setIpInput] = useState('192.168.0.174');

  // Function to load IP address from AsyncStorage when the screen loads
  const loadIpAddress = async () => {
    try {
      const savedIp = await AsyncStorage.getItem('giriapiip');
      if (savedIp !== null) {
        setCurrentIp(savedIp);    // Set the saved IP as the current IP
        setIpInput(savedIp);      // Set the saved IP in the TextInput
      }
    } catch (error) {
      console.log("Error loading IP address: ", error);
    }
  };

  // Use useEffect to load the IP address when the screen mounts
  useEffect(() => {
    loadIpAddress();
  }, []);

  // Function to handle the save action
  const handleSave = async () => {
    if (ipInput.trim() === '') {
      Alert.alert("Error", "IP Address cannot be empty.");
      return;
    }

    try {
      await AsyncStorage.setItem('giriapiip', ipInput);  // Save IP to AsyncStorage
      setCurrentIp(ipInput);  // Update the current IP with the new one entered
      Alert.alert(
        "Save IP Address",
        "Are you sure you want to Save IP and reload the app?",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { 
            text: "OK", 
            onPress: () => RNRestart.Restart() // This should work after fixing the issue
          }
        ]
      );
    } catch (error) {
      console.log("Error saving IP address: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>IP Address</Text>

      {/* TextInput to allow user to enter new IP */}
      <TextInput
        style={styles.input}
        value={ipInput}
        onChangeText={(text) => setIpInput(text)}
        keyboardType="numeric"
      />

      {/* Save button to update IP */}
      <Button title="Save" onPress={handleSave} />

      {/* Display current IP */}
      <Text style={styles.currentIp}>Current IP: {currentIp}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color:'black',
    fontWeight:'bold'
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 18,
    color:'black',
    fontWeight:'bold'
  },
  currentIp: {
    marginTop: 20,
    fontSize: 22,
    textAlign: 'center',
    color:'black',
    fontWeight:'bold'
  },
});

export default IPAddressScreen;


