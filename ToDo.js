import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from "react-native";

const {width, height} = Dimensions.get("window");

export default class ToDo extends Component{

    /* isEditing:To do 수정중 | isCompleted:To do 작성 완료 */
    state={
        isEditing : false,
        isCompleted: false
    };

    render(){
        const {isCompleted} = this.state;

        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={this._completeToDo}>
                    <View style={[
                        styles.circle, 
                        isCompleted? styles.completedCircle : styles.uncompletedCircle
                    ]}/>
                </TouchableOpacity>
                <Text style={styles.todoTitle}>Is to do.</Text>
            </View>
        );
    }

    _completeToDo = ()=>{
        this.setState(prevState=>{
            return{
                isCompleted:!prevState.isCompleted
            }
        });
    }
}

const styles = StyleSheet.create({
    container:{
        width: width-30,
        borderBottomColor:"#bbb",
        borderBottomWidth: 1,
        flexDirection:"row",
        alignItems:"center"
    },
    todoTitle:{
        fontSize:24,
        padding:10,
        fontWeight:"400",
        marginLeft:7
    },
    circle:{
        width:33,
        height:33,
        borderRadius:25,
        borderWidth:2,
        marginLeft:12
    },
    completedCircle:{
        borderColor:"#0000fb",
        backgroundColor:"#0000fb"
    },
    uncompletedCircle:{
        borderColor:"#F23657",
        backgroundColor:"white"
    }
});