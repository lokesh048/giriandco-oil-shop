import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
    const navigation = useNavigation();
    {
        return (
            
            <View style ={styles.header}>
  

                <Text style={styles.oil}>GIRI & CO</Text>
 
            </View>
        );
}
}

    const styles = StyleSheet.create({
        header: {
            flexDirection:'row',
            height: '20 %',
            alignItems: 'center',
            width: '100 %',
            justifyContent: 'center',
             backgroundColor: '#eee',
             paddingTop:10
             
        },
        oil:{
            
            fontSize:40,
            fontWeight:"bold",
            color:'green'

        },

    });
    