import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform } from 'react-native';

const {height, width} = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"/>
      <Text style={styles.topTitle}>What's my To do?</Text>
      <View style={styles.card}>
        <TextInput style={styles.input} placeholder={"Input New To Do!"}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
  },
  topTitle:{
    color:"white",
    fontSize:35,
    alignItems:"center",
    marginTop:50,
    fontWeight:"600"
  },
  card:{
    backgroundColor:"white",
    flex:1,
    width:width-25,
    marginTop:10,
    marginBottom:20,
    borderRadius:8,
    ...Platform.select({
      ios:{
        shadowColor:"rgb(50,50,50)",
        shadowOpacity:0.5,
        shadowRadius:5,
        shadowOffset:{
          height:-1,
          width:1
        }
      },
      android:{
        elevation:3
      }
    })
  },
  input:{
    fontSize:20,

  }
});
