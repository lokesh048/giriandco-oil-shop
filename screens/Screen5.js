import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

var ipvalue;
AsyncStorage.getItem('giriapiip').then(asyncStorageRes => {
  ipvalue = asyncStorageRes;
});

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Screen5() {
    const navigation = useNavigation();
    const [apiData, setApiData] = useState([]);
    const route = useRoute();
    const selectedItems = route.params?.billingItems;  
    const yearDetail = route.params?.yearDetail;
    console.log(selectedItems);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://'+ ipvalue + '/easyinvoiceapi/api/sales/SaveSales?companyCode=1&financialYear='+yearDetail.yearId+'&invPrefix='+yearDetail.prefix+'&invSuffix='+yearDetail.suffix,
            {method : 'POST', headers: { 'Content-Type': 'application/json' }, body:JSON.stringify(selectedItems)})
            .then(response => {response.json()
            .then(data => {
                // Handle the API response data
                console.log('API response:', data);
                setApiData(data);
              });
            //const data = await response.json();
            // setApiData(data);
            //setLoading(false);
            //console.log(response);
            })
          } catch (error) {
            console.error('Error fetching data:', error);
           // setLoading(false);
          }
        };
        fetchData();
      }, []);
console.log(apiData);

const handleExitApp = () => {
  Alert.alert(
    'Exit App',
    'Do you want to exit?',
    [{
      text: 'Cancel',
      onPress: () => {
        console.log('cancel pressed');
      },
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: () => {
        BackHandler.exitApp();
        // Clear the data or perform any other necessary actions
        setApiData([]); // Assuming setApiData is the function to update your data state
      },
    },
  ],
    {
      cancelable: false,
    },
  );
  return true;
};

useEffect(() => {
  BackHandler.addEventListener('hardwareBackPress', handleExitApp);

  return () => {
    BackHandler.removeEventListener('hardwareBackPress', handleExitApp);  
  };
}, []);
return (
    <ScrollView contentContainerStyle={styles.container}>
    
    <View elevation={1} 
        style={{
          height: 180,
          width: "97%",
          alignSelf: "center",
           shadowOffset: {
            width: 0,
            height: 16,
          },
          shadowOpacity: 1,
          shadowRadius: 7.49,
          paddingTop:50,
        }}
      >
        <Text style={{  textShadowColor: 'green',color:'green', textShadowOffset: { width: 1, height: 3 },textShadowRadius: 10, fontSize: 40, fontWeight: '800', flex: 1, alignSelf: "center", paddingTop: 30,paddingBottom:10, fontSize: 40}}>GIRI & CO</Text>
      </View>
      <View style={styles.box}>
        <View style={styles.inner}>
          <Text style={styles.Text}>Bill No.</Text>
          <Text style={styles.input1}>{apiData.salesBillNo}</Text>
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.inner}>
          <Text style={styles.Text}>Total Qty</Text>
          <Text style={styles.input1}>{apiData.salesQty}</Text>
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.inner}>
          <Text style={styles.Text}>Bill Amount</Text>
          <Text style={styles.input1}>Rs.{apiData.salesAmount}</Text>
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.inner}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main1', { billingItems: [] ,yearDetail:yearDetail})}>
            <Text style={{ fontWeight: 'bold', fontSize: 30,color:'#000000' }}>New Bill</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      paddingVertical: 20,
      marginBottom: 120,
    },
    box: {
      width: windowWidth * 0.8,
      height: windowHeight * 0.25,
      marginVertical: 10,
    },
    button: {
      flex: 0.5,
      alignItems: 'center',
      backgroundColor: 'yellow',
      borderRadius: 20,
      width: '100%',
      padding: 10,
      justifyContent: 'center',
      
    },
    Text: {
      fontSize: windowWidth * 0.05, // Adjust this multiplier as needed
      textAlign: 'left',
      marginBottom: windowHeight * 0.01, // Adjust this multiplier as needed
      color:'#000000',
      fontWeight:'bold', 
    },
    inner: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input1: {
      width: '100%',
      height: windowHeight * 0.1, // Adjust this multiplier as needed
      borderWidth: 1,
      borderColor: 'gray',
      fontSize: windowWidth * 0.08, // Adjust this multiplier as needed
      fontWeight: 'bold',
      color: 'blue',
      padding: 15,
      textAlign: 'center',
    },
  });