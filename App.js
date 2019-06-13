import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView, AsyncStorage } from 'react-native';
import ToDo from './ToDo'
import {AppLoading} from 'expo';
import uuidv1 from 'uuid/v1'

const {height, width} = Dimensions.get("window");

export default class App extends React.Component{

  /* newTodoData: 새로 추가할 ToDo 작성중인 데이터 | loadedToDos: ToDo 앱 실행여부 | toDos:state에 저장된 ToDo Array*/
  state={
    newTodoData:"",
    loadedToDos:false,
    toDos:{}
  };

  componentDidMount = () =>{
    this._loadToDoApp();
  }

  render(){
    const{newTodoData, loadedToDos, toDos} = this.state;

    if(!loadedToDos){
      return <AppLoading/>;
    }
    
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
          autoCorrect={false}
          onSubmitEditing={this._addTodo}/>
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(toDos).reverse().map(toDoObj=>(
              <ToDo key={toDoObj.id} {...toDoObj} deleteToDo={this._deleteToDo} completeToDo={this._completeToDo} uncompleteToDo={this._uncompleteToDo} updateToDo={this._updateToDo}/>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  };

  _loadToDoApp = async ()=>{
    try{
      //await을 통해 해당 작업을 마칠때 까지 wait 함.
      const loadToDos = await AsyncStorage.getItem("toDos");
      const toDosFromJson = JSON.parse(loadToDos);
      this.setState({
        loadedToDos:true,
        toDos:toDosFromJson
      });
    }catch(err){
      //AsyncStorage Data Loading Failed
      console.log(err);
    }
  }

  _handleNewTodo=text=>{
    this.setState({
      newTodoData:text
    });
  }

  _addTodo = ()=>{
    const {newTodoData} = this.state;
    if(newTodoData!==""){
      this.setState({
        newTodoData:""
      });

      this.setState(prevState=>{
        const UUID = uuidv1();
        const newToDoObj = {
          [UUID]:{
            id:UUID,
            isCompleted:false,
            toDoText:newTodoData,
            createdTime:Date.now()
          }
        }
        const newState={
          ...prevState,
          newTodoData:"",
          toDos:{
            ...prevState.toDos,
            ...newToDoObj
          }
        }
        this._saveTodos(newState.toDos);
        return {...newState}
      });
    }
  }

  _deleteToDo=(id)=>{
    this.setState(prevState=>{
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      };
      this._saveTodos(newState.toDos);
      return {...newState};
    });
  }

  _completeToDo=(id)=>{
    this.setState(prevState=>{
      const newState={
        ...prevState,
        toDos:{
          ...prevState.toDos,
          [id]:{
            ...prevState.toDos[id],
            isCompleted:true
          }
        }
      };
      this._saveTodos(newState.toDos);
      return {...newState};
    });
  }

  _uncompleteToDo=(id)=>{
    this.setState(prevState=>{
      const newState={
        ...prevState,
        toDos:{
          ...prevState.toDos,
          [id]:{
            ...prevState.toDos[id],
            isCompleted:false
          }
        }
      };
      this._saveTodos(newState.toDos);      
      return {...newState};
    });
  }

  _updateToDo=(id, text)=>{
    this.setState(prevState=>{
      const newState={
        ...prevState,
        toDos:{
          ...prevState.toDos,
          [id]:{
            ...prevState.toDos[id],
            toDoText:text
          }
        }
      };
      this._saveTodos(newState.toDos);
      return {...newState};
    });
  }

  _saveTodos=(newToDos)=>{
    //Object Array To Json Array
    const saveToDos = AsyncStorage.setItem("toDos",JSON.stringify(newToDos));
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
