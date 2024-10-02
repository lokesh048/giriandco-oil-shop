import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, BackHandler, Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

var ipvalue;
AsyncStorage.getItem('giriapiip').then(asyncStorageRes => {
  ipvalue = asyncStorageRes;
});

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const itemData = null;
const ButtonList = ({ buttonData, onPressButton }) => {
const route = useRoute();
const selectedItems = route.params?.billingItems;
const yearDetail = route.params?.yearDetail;
const [modifieddata, setitemdata] = useState('');
const [inputValues, setInputValues] = useState('');
const [items, setItems] = useState([]);
const handleInputChange = (item, text,rate) => {
    item.itemQty = text;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [item.itemQty]: text,
    }));
    item.itemAmount=text*rate;
  };

  const qtySetFocused = (item, text) => {
    // if(text="0")
    // {
    //   console.log(text);
    //   item.itemQty = "";
    //   //text = "";
    // }
    // else
    // {
    //   item.itemQty = text;
    // }
    // setInputValues((prevInputValues) => ({
    //   ...prevInputValues,
    //   [item.itemQty]: text,
    // }));
  };

  const qtyFocusOut = (item, text) => {
    // console.log(text);
    // if(text==null)
    // {
    //   item.itemQty = "0";
    //   text = "0";
    // }
    // else
    // {
    //   item.itemQty = text;
    // }
    // setInputValues((prevInputValues) => ({
    //   ...prevInputValues,
    //   [item.itemQty]: text,
    // }));
  };
  
  const inputRef = useRef(null);
  const [isCleared, setIsCleared] = useState(false);
  const setFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();

      if (!isCleared) {
        //setInputValue(''); // Clear the default value only once
        setIsCleared(true);
      }
    }};
    
  const addItem = () => {
    // // Check if an item with the same id already exists in the array
    // const isItemExists = items.some(item => item.id === inputValues.id);
  
    // if (isItemExists) {
    //   Alert.alert('Item already added', 'An item with this ID already exists in the list.');
    // } else {
    //   // Add the new item to the array
    //   setItems([...items, { ...inputValues }]);
    //   setInputValues(''); // Clear the input fields
    // }
    buttonData.map((data,index)=>
    {if(data.itemQty>0)
    {
      const isItemExists = selectedItems.some(item => item.itemCode === data.itemCode);
      if(isItemExists)
      {
        Alert.alert('Item already added', 'An item with this ID already exists in the list.');
        return false;
      }
    }
    })
    return true;
  };
  const handlePress = () => {
    //const isItemExists = addItem();
    setFocus();
    var isItemExists = false;
    var isZero = false;
    buttonData.map((data,index)=>
    {
      if((data.itemQty>0) && (!isItemExists))
      {
        isZero = true;
        isItemExists = selectedItems.some(item => item.itemCode === data.itemCode);
        if(isItemExists)
        {
          Alert.alert('Item already added', (data.itemFullName + ' exists in the list.'));
        }
      }
    });

    if(!isZero)
    {
      Alert.alert('Select Item', ('Please select any one item.'));
    }
    else
    {
      if(!isItemExists)
      {
        BtnCompleteClick();  
      }
    }
  };

  const handlePressadd = () => {
    //const isItemExists = addItem();
    setFocus();
    var isItemExists = false;
    var isZero = false;
    buttonData.map((data,index)=>
    {
      if((data.itemQty>0) && (!isItemExists))
      {
        isZero = true;
        isItemExists = selectedItems.some(item => item.itemCode === data.itemCode);
        if(isItemExists)
        {
          Alert.alert('Item already added', (data.itemFullName + ' exists in the list.'));
        }
      }
    });

    if(!isZero)
    {
      Alert.alert('Select Item', ('Please select any one item.'));
    }
    else
    {
      if(!isItemExists)
      {
        BtnaddClick();  
      }
    }
  };  
const renderItem = ({ item }) => (
    
 <View style={styles.container}>
 <View style={styles.box}>
 <View style={styles.inner}>
            <View style={styles.button}>
            {/* <Image source={require('../assets/images/oilcan.jpg')} style={{ width: 50, height: 62,alignItems:'center' }} /> */}
            <Text style={styles.Text}>{item.itemName} </Text>
            <Text style={styles.Text}>Rs.{item.itemRate}.00 </Text>
            <Text style={styles.Text}>No.QTY </Text>
            <TextInput
                 style={styles.input}
                 // onChangeText        
                 onChangeText={(text) => handleInputChange(item, text,item.itemRate)}
                 onFocus={(text) => qtySetFocused(item, text)}
                 onBlur={(text) => qtyFocusOut(item, text)}
                 ref={inputRef}
                 //value={item.itemQty.toString()}
                 //placeholder="0"
                 keyboardType="numeric"/>
           </View>
  </View>
  </View>
  </View>    
);
  
  FlatListFooter = () => {
    return(
      <View style={styles.container1}>
        <View style = {styles.box}>
        <View style={styles.inner}>
        <TouchableOpacity style={styles.button1} onPress={handlePressadd}>
        {/* <Text style={{fontSize:30,color:'#000000',}} >
           Add Items
        </Text> */}
        <Image source={require('../assets/images/add.jpg')} style={{ width: 70, height: 70 }} />
        </TouchableOpacity>
      </View>
      </View>
      <View style={styles.box1}>
      <View style={styles.inner}>
      <TouchableOpacity onPress={handlePress}>
      <View>
      {/* <Text style={{fontSize:30,color:'#000000',fontWeight:'bold'}}>
          Complete
      </Text>*/}
      <Image source={require('../assets/images/cart.jpg')} style={{ width: 70, height: 70 }} />
      </View> 
      </TouchableOpacity>
      </View></View>
      </View>
    )
  }
  
BtnCompleteClick = () => {

  buttonData.map((data,index)=>
  {if(data.itemQty>0)
  {
    selectedItems.push(data);
  }
  })
  
  navigation.navigate('screen3',{ billingItems : selectedItems,yearDetail : yearDetail})
  
}

BtnaddClick = () => {

  buttonData.map((data,index)=>
  {if(data.itemQty>0)
  {
    selectedItems.push(data);
  }
  })
  
  navigation.navigate('Main1',{ billingItems : selectedItems,yearDetail : yearDetail})
  
}
  FlatListHeader = () => {
    return (
      <View elevation={1} 
        style={{
          height: 100,
          width: "97%",
          margin: 5,
          backgroundColor: "#fff",
          border: 2.9,
          borderColor: "black",
          alignSelf: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 16,
          },
          shadowOpacity: 1,
          shadowRadius: 7.49
        }}
      >
        <Text style={{  textShadowColor: 'green',color:'green', textShadowOffset: { width: 1, height: 3 },textShadowRadius: 10, fontSize: 40, fontWeight: '800', flex: 1, alignSelf: "center", paddingTop: 30, fontSize: 40}}>GIRI & CO</Text>
      </View>
    );
  }



const keyExtractor = (item) => {
    return item ? item.itemCode.toString() : '';
  };
  const [numColumns] = useState(2);
  const navigation = useNavigation();
  return (
    <FlatList
      data={buttonData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      ListHeaderComponent = { this.FlatListHeader }  
      ListFooterComponent={this.FlatListFooter}
    />
  );
};

export default function App() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  categoryName = route.params?.categoryName;
  const yearDetail = route.params?.yearDetail;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://'+ ipvalue + '/easyinvoiceapi/api/items/GetItemNameList?companyCode=1&financialYear='+yearDetail.yearId+'&categoryName='+categoryName);
        const data = await response.json();
        setApiData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

const handleButtonPress = (button) => {
    // Handle button press here
    console.log(`Button ${button.id} pressed`);
};

const handleExitApp = () => {
  navigation.goBack();
  return true;

};
useEffect(() => {
  const backHandler = BackHandler.addEventListener('hardwareBackPress', handleExitApp);

  return () => {
    backHandler.remove();
  };
}, [navigation]);
  return (    
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',flexDirection: 'row' }}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ButtonList buttonData={apiData} onPressButton={handleButtonPress} />
      )}
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  box: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.23,
    padding: 10,
  },
  box1: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.1,
    padding: 30,
    paddingTop:30,
    
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    width: windowWidth * 0.45,
    height: windowHeight * 0.45,
    
  },
  button1: {
    flex: 1,
    alignItems: 'center',
    //backgroundColor: 'yellow',
    borderRadius: 20,
    width: windowWidth * 0.17,
    height: windowHeight * 0.11,
    justifyContent: 'center',
    marginTop: windowHeight * 0.21,
    marginBottom: windowHeight * 0.2,
    marginRight:40,
  },
  Text: {
    fontSize: windowWidth * 0.035,
    textAlign: 'center',
    paddingTop: windowHeight * 0.01,
    fontWeight: 'bold',
    color: '#000000',
 
    
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: windowWidth * 0.2,
    textAlign: 'center',
    fontWeight: 'bold',
    color:'#000000'
  },
});

