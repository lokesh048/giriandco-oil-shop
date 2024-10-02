// AppNavigation.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import IPAddressScreen from '../screens/Ip';
import LoginScreen from '../screens/LoginScreen';
import Screen5 from '../screens/Screen5';
import MainScreen1 from '../screens/mainscreen1';
import MainScreen2 from '../screens/mainscreen2';
import screen3 from '../screens/screen3';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Main1"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Main1') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'screen3') {
          iconName = focused ? 'list' : 'list-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'grey',
      labelStyle: { paddingBottom: 10, fontSize: 10 },
      style: { padding: 10, height: 70 },
    }}
  >
    <Tab.Screen name="Main1" component={MainScreen1} />
    <Tab.Screen name="screen3" component={screen3} />
  </Tab.Navigator>
);

const CombinedNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
      <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
      <Stack.Screen name="IP" options={{ headerShown: false }} component={IPAddressScreen} />
      <Stack.Screen name="Main1" options={{ headerShown: false }} component={MainScreen1} />
      <Stack.Screen name="Main2" options={{ headerShown: false }} component={MainScreen2} />
      <Stack.Screen name="screen3" options={{ headerShown: false }} component={screen3} />
      <Stack.Screen name="Screen5" options={{ headerShown: false }} component={Screen5} />
      <Stack.Screen
        name="TabNavigator"
        options={{ headerShown: false }}
        component={BottomTabNavigator}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default CombinedNavigator;


// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import React from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import HomeScreen from '../screens/HomeScreen';
// import LoginScreen from '../screens/LoginScreen';
// import Screen5 from '../screens/Screen5';
// import MainScreen1 from '../screens/mainscreen1';
// import MainScreen2 from '../screens/mainscreen2';
// import screen3 from '../screens/screen3';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// export default function AppNavigation() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName='Home'>
//         <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
//         <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
//         <Stack.Screen name="Main1" options={{ headerShown: false }} component={MainScreen1} />
//         <Stack.Screen name="Main2" options={{ headerShown: false }} component={MainScreen2} />
//         <Stack.Screen name="screen3" options={{ headerShown: false }} component={screen3} />
//         <Stack.Screen name="Screen5" options={{ headerShown: false }} component={Screen5} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


