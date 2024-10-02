import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class itemdetail
{
    itemName;
}

var yearDetail;

const MyTable = () => {
    const route = useRoute();
    const selectedItems = route.params?.billingItems;
     yearDetail = route.params?.yearDetail;
    const navigation = useNavigation();
    FlatListHeader = () => {
    return (
        
      <View elevation={1} 
        style={{
          height: 200,
          width: "97%",
          alignSelf: "center",
           shadowOffset: {
            width: 0,
            height: 20,
          },
          shadowOpacity: 1,
          shadowRadius: 7.49
        }}
      >
        <Text style={{  textShadowColor: 'green',color:'green', textShadowOffset: { width: 1, height: 3 },textShadowRadius: 10, fontSize: 40, fontWeight: '800', flex: 1, alignSelf: "center", paddingTop: 30,paddingBottom:10, fontSize: 40}}>GIRI & CO</Text>
        <View style={styles.tableContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Item Name</Text>
          {/* <Text style={styles.headerCell2}>Rate</Text> */}
          <Text style={styles.headerCell3}>QTY</Text>
          <Text style={styles.headerCell4}>Total   Amount</Text>
          <Text style={styles.headerCell5}>Delete</Text>
        </View>
</View>
      </View>
    );
  }
  

  const handlePress = (buttonData) => {

    // var isItemExists = false;
    // var isZero = false;
  
    // // buttonData.forEach((data, index) => {
    // //   if (data.itemQty > 0) {
    // //     isZero = true;
    // //     isItemExists = selectedItems.some((item) => item.itemCode === data.itemCode);
    // //     if (isItemExists) {
    // //       Alert.alert('Item already added', `${data.itemFullName} exists in the list.`);
    // //     }
    // //   }
    // // });
  
    if (sum>0) {
      navigation.navigate('Screen5',{ billingItems : myArray,yearDetail : yearDetail})
      
    } else {
      Alert.alert('Add Item', 'Please add any one item.');
  
    }
  };

  
  FlatListFooter = () => {
    return(
      <ScrollView>
              <View style={styles.box1}>
      <View style={styles.inner}>
      <Text style={styles.button2}>Total Amount</Text>
      <Text style={styles.input1}>
        
      Rs.
      {sum}.00
      </Text>
      </View></View> 
      <View style={styles.container1}>
      {/* <View style={styles.box}>
      <View style={styles.inner}>
      <Text style={styles.button2}>Total Amount</Text>
      </View></View> */}

       <View style = {styles.box}>
      <View style={styles.inner}>
        <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Main1',{ billingItems : myArray, yearDetail: yearDetail})}>
        {/* <Text style={{fontSize:30,color:'#000000',}} >
           Add Items
        </Text> */}
        <Image source={require('../assets/images/add.jpg')} style={{ width: 70, height: 70 }} />
        </TouchableOpacity>
      </View>
      </View>
      <View style={styles.box}>
      <View style={styles.inner}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
        {/* <Text style={{fontSize:30,color:'#000000',}}>
          Print Bill
        </Text> */}
        <Image source={require('../assets/images/printer.jpg')} style={{ width: 70, height: 70 }} />
        </TouchableOpacity>
      </View>
      </View>
  
   </View>
   </ScrollView>
      
    );
  }
     

     
     const myArrayData = Object.keys(selectedItems).map(key => selectedItems[key]);
     const [myArray , setData] = useState([...myArrayData]);
     var sum = myArray.reduce((a,v) =>  a = a + v.itemAmount , 0 )
     const headers = ['Item Name','Rate', 'Quandity', 'Total Amount'];
     const renderItem = ({ item, index }) => (
      <ScrollView horizontal='true'> 
      <View style={styles.dataRow}>
        <Text style={styles.dataCell1}>{item.itemFullName} </Text>
        {/* <Text style={styles.dataCell2}>Rs.{item.itemRate}.00 </Text> */}
        <TextInput
          style={styles.input}
           onChangeText={(text) => handleTextChange(text, index,item.itemRate)}
           value={item.itemQty}
           placeholder="0"
           keyboardType="numeric"
        />
        <Text style={styles.dataCell3}>Rs.{item.itemAmount}.00 </Text>
        <TouchableOpacity onPress={() => handleDelete(index)}>
        <Image source={require('../assets/images/delete.jpg')} style={{ width: 40, height: 40 ,marginRight:20}} />
        {/* <Text style={styles.deleteButton}>X</Text> */}
        </TouchableOpacity>
      </View>
      </ScrollView>
    );
  
    const handleTextChange = (text, index,rate) => {
        //item.itemQty = text;  
      const newData = [...myArray];
      newData[index].itemQty = text;
      newData[index].itemAmount=text*rate;
      setData(newData);
    };
    const handleDelete = (index) => {
      const newData = [...myArray];
      newData.splice(index, 1);
      setData(newData);
    };

    return (
   
       <FlatList
          ListHeaderComponent = { this.FlatListHeader }
          data={myArray}
          renderItem={renderItem}
          keyExtractor={(item) => item.itemCode}
          ListFooterComponent={ this.FlatListFooter}
       />
       

);
};

// export default function MyTable() {

//   const handleButtonPress = (button) => {
//     console.log(`Button ${button.id} pressed`);
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',flexDirection: 'row' }}>
//       {loading ? (
//         <Text>Loading...</Text>
//       ) : (
//         <ButtonList buttonData={apiData} onPressButton={handleButtonPress} />
//       )}
//     </View>
//   );
// }

  export default MyTable;
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: windowWidth * 0.04,
      fontSize: windowWidth * 0.05,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: windowHeight * 0.02,
    },
    container1: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
      
    },
    box: {
      width: '30%',
      height: '30%',
     
    },
    box1: {
      width: '30%',
      height: '30%',
      paddingLeft:155,
      paddingTop:100,
      
    },
    inner: {
      flex: 1,
      paddingLeft: windowWidth * 0.1,
      paddingRight: windowWidth * 0.1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: windowWidth * 0.02,
    },
    button: {
      flex: 1,
      alignItems: 'center',
      //backgroundColor: 'green',
      borderRadius: 20,
      width: windowWidth * 0.2,
      height: windowHeight * 0.10,
      justifyContent: 'center',
      marginBottom: 10,
      marginTop:10,
      marginLeft:15,
      color: '#000000',
    },
    button1: {
      flex: 1,
      alignItems: 'center',
      //backgroundColor: 'yellow',
      borderRadius: 20,
      width: windowWidth * 0.17,
      height: windowHeight * 0.11,
      justifyContent: 'center',
      marginTop: windowHeight * 0.01,
      marginBottom: windowHeight * 0.2,
      marginRight:40,
    },
    button2: {
      flex: 1,
      alignItems: 'center',
      fontSize: windowWidth * 0.07,
      borderRadius: 20,
      width: windowWidth * 0.75,
      height: windowHeight * 0.07,
      justifyContent: 'center',
      paddingBottom: 0,
      color: '#000000',
    },
    tableContainer: {
      flex: 1,
      flexDirection: 'column',
      borderWidth: 1,
      borderColor: '#000000',
      marginBottom: windowHeight * 0.04,
    },
    headerRow: {
      flexDirection: 'row',
      borderBottomWidth: 0,
      borderBottomColor: '#ccc',
      backgroundColor: '#f2f2f2',
    },
    headerCell: {
      flex: 1,
      padding: windowWidth * 0.03,
      fontWeight: 'bold',
      paddingLeft: windowWidth * 0.06,
      paddingRight: windowWidth * 0.06,
      color: '#000000',
    },
    headerCell3: {
      flex: 1,
      padding: windowWidth * 0.03,
      fontWeight: 'bold',
      paddingLeft: windowWidth * 0.06,
      paddingRight: windowWidth * 0.05,
      color: '#000000',
    },
    headerCell4: {
      flex: 1,
      padding: windowWidth * 0.03,
      fontWeight: 'bold',
      paddingLeft: windowWidth * 0.08,
      paddingRight: windowWidth * 0.01,
      color: '#000000',
    },
    headerCell5: {
      flex: 1,
      padding: windowWidth * 0.03,
      fontWeight: 'bold',
      paddingLeft: windowWidth * 0.07,
      paddingRight: windowWidth * 0.06,
      color: '#000000',
    },
    dataRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#000000',
      paddingBottom: windowHeight * 0.01,
    },
    dataCell1: {
      flex: 1,
      padding: windowWidth * 0.03,
      paddingLeft: windowWidth * 0.05,
      color: '#000000',
    },
    dataCell2: {
      flex: 1,
      padding: windowWidth * 0.03,
      textAlign: 'right',
      paddingRight: windowWidth * 0.06,
    },
    dataCell3: {
      flex: 1,
      padding: windowWidth * 0.03,
      paddingLeft: windowWidth * 0.07,
      textAlign: 'right',
      paddingRight: windowWidth * 0.1,
      color: '#000000',
    },
    // input: {
    //   width: windowWidth * 0.18,
    //   height: windowHeight * 0.04,
    //   borderWidth: 1,
    //   borderColor: '#000000',
    //   padding: windowWidth * 0.03,
    //   textAlign: 'right',
    //   fontWeight: 'bold',
    //   marginTop: windowHeight * 0.01,
    // },
    input: {
      width: 60,
      height: 40,
      borderWidth: 1,
      borderColor: '#000000',
      padding: 10,
      // paddingLeft: 60,
      textAlign: 'right',
      // marginLeft: 60,
      fontWeight:'bold',
      color: '#000000',
      marginTop:10,
      
    },
    input1: {
      width: windowWidth * 0.75,
      height: windowHeight * 0.1,
      borderWidth: 1,
      borderColor: 'black',
      padding: windowWidth * 0.03,
      textAlign: 'center',
      borderRadius: windowWidth * 0.06,
      borderWidth: windowWidth * 0.01,
      fontSize: windowWidth * 0.10,
      color: '#000000',
      marginBottom: windowHeight * 0.02,
    },
    deleteButton: {
      color: 'red',
      fontSize: windowWidth * 0.06,
      paddingRight: windowWidth * 0.06,
      fontWeight: 'bold',
    },
    Text: {
      fontSize: windowWidth * 0.04,
      textAlign: 'center',
      paddingTop: windowHeight * 0.005,
      fontWeight: 'bold',
      paddingLeft: windowWidth * 0.2,
      paddingRight: 0,
      borderColor: 'black',
      color: '#000000',
    },
  });
  