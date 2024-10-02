import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

var ipvalue;
AsyncStorage.getItem('giriapiip').then(asyncStorageRes => {
  ipvalue = asyncStorageRes;
});
const { width, height } = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const emptyItems = [];

const ButtonList = ({ buttonData, onPressButton }) => {
const route = useRoute();

var billitems = [];
billitems = route.params?.billingItems;
var selectedItems = [];

if((billitems == null))
{
  selectedItems.length = 0 ;
}
else
{
  selectedItems = route.params?.billingItems;
}
const yearDetail = route.params?.yearDetail;
const renderItem = ({ item }) => (

  <View style={styles.container}>
  <View style={styles.box}>
  <View style={styles.inner}>
  <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main2', {categoryName : item, billingItems : selectedItems, yearDetail : yearDetail})}>
  <View >
    <Image source={require('../assetimage/oilcan.jpg')} style={{ width: 70, height: 80 }} />
    <Text style={styles.Text}>{item}</Text>
  </View>
  </TouchableOpacity>
  </View>
  </View>
  </View>
);

const keyExtractor = (item) => {
   return item ? item.toString() : '';
  };

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
  const handlePress = () => {
    //const isItemExists = addItem();
    //setFocus();
    BtnCompleteClick();  
  };
  FlatListFooter = () => {
    return(
      <View style={styles.container1}>
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
    
    navigation.navigate('screen3',{ billingItems : selectedItems, yearDetail : yearDetail})
    
  }
  const [numColumns] = useState(2);
const navigation = useNavigation();
  return (
    <FlatList
      data={buttonData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent = { this.FlatListHeader }  
      numColumns={numColumns}
      ListFooterComponent={this.FlatListFooter}
    />
  );
};

export default function App() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const yearDetail = route.params?.yearDetail;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://'+ ipvalue + '/easyinvoiceapi/api/category/GetItemCategoryList?companyCode=1&financialYear='+ yearDetail.yearId);
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
    console.log(`Button ${button.id} pressed`);
    
  };

  
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%', // Use 100% to take the full width
    height: '100%',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  box: {
    width: '50%',
    height: '50%', // Adjust height to desired percentage
    padding: 10,
  },
  box1: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.1,
    padding: 30,
    marginRight: windowWidth*0.45,
    marginBottom:windowHeight*0.05,
  },
  inner: {
    flex: 1,
    paddingLeft: windowWidth * 0.3, // Adjust left padding based on screen width
    paddingRight: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: windowHeight * 0.1, // Adjust padding based on screen height
    paddingTop:30,
    paddingBottom:20,
    borderRadius: 20,
    width: windowWidth * 0.1, // Adjust width based on screen width
    height: windowHeight * 0.21, // Adjust height based on screen height
    marginRight:60,

  },
  Text: {
    fontSize: windowWidth * 0.035, // Adjust font size based on screen width
    textAlign: 'center',
    paddingTop: windowHeight * 0.01, // Adjust padding based on screen height
    fontWeight: 'bold',
    color: '#000000',
  },
});



