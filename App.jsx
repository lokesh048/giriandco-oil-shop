// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import React from 'react';
// import HomeScreen from './screens/HomeScreen';

// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator >
//         <Stack.Screen name="Home" component={HomeScreen} />
//         {/* Add more screens as needed */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;

import AppNavigation from './navigation/appNavigation';

// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from './screens/HomeScreen';
// import GameStore from './screens/gameStore';

// const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <AppNavigation />
  );
};
