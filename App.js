import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import ToDo from './ToDo'

const {height, width} = Dimensions.get("window");

export default class App extends React.Component{

  state={
    newTodoData:""
  };

  render(){
    const{newTodoData} = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <Text style={styles.topTitle}>What's my To do?</Text>
        <View style={styles.card}>
          <TextInput
          style={styles.input} 
          placeholder={"Input New To Do!"} 
          value={newTodoData} 
          onChangeText={this._handleNewTodo} 
          placeholderTextColor={"#999"}
          returnKeyType={"done"}
          autoCorrect={false}/>
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo />
            <ToDo />
            <ToDo />
          </ScrollView>
        </View>
      </View>
    );
  };

  _handleNewTodo=text=>{
    this.setState({
      newTodoData:text
    });
    (Platform.OS==='android' ? console.log("android로부터 작성중인 input : "+text):console.log("ios로부터 작성중인 input : "+text))
  }
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
    fontWeight:"200"
  },
  card:{
    backgroundColor:"white",
    flex:1,
    width:width-30,
    marginTop:15,
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
    fontSize:22,
    padding:10,
    borderBottomColor:"#bbb",
    borderBottomWidth: 1
  },
  toDos:{
    alignItems:"center",
  }
});
