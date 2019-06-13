import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, Alert} from "react-native";
import {Foundation} from '@expo/vector-icons';
import PropTypes from "prop-types";

const {width, height} = Dimensions.get("window");

export default class ToDo extends Component{

    /* isEditing:To do 수정중 | toDoValue:To do에 대해 수정중인 데이터*/
    constructor(props){
        super(props);
        this.state = {
            isEditing:false, 
            toDoValue:this.props.toDoText,
            lastPress:0,
        };
    }

    static propTypes={
        id:PropTypes.string.isRequired,
        toDoText: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        createdTime:PropTypes.number.isRequired,
        deleteToDo:PropTypes.func.isRequired,
        completeToDo:PropTypes.func.isRequired,
        uncompleteToDo:PropTypes.func.isRequired,
        updateToDo:PropTypes.func.isRequired,
    }

    render(){
        const {isEditing, toDoValue, lastPress} = this.state;
        const {toDoText,isCompleted, id, deleteToDo} = this.props;

        return(
            <View style={styles.container}>
               <View style={styles.column}>
                    <TouchableOpacity onPress={this._compToggleCheck}>
                    <View style={[
                        styles.circle, 
                        isCompleted? styles.completedCircle : styles.uncompletedCircle
                    ]}/>
                    </TouchableOpacity>
                    {isEditing ? <TextInput 
                        style={[
                            styles.inputEditToDo,
                            styles.todoTitle,
                            isCompleted? styles.completedTitleEditing : styles.uncompletedTitle
                        ]} 
                        value={toDoValue} 
                        multiline={true}
                        onChangeText={this._handleInputToDo}
                        onBlur={this._finishEditing}
                        returnKeyType={"done"}/>
                        :<Text style={[
                        styles.todoTitle,
                        isCompleted? styles.completedTitle : styles.uncompletedTitle
                        ]} onPress={()=>{
                            var delta = new Date().getTime() - lastPress;
                            
                            if(delta<200){
                                // double tap detected
                                this._compToggleCheckDoubleClick.call()
                            }
                            
                            this.setState({
                                lastPress:new Date().getTime()
                            });
                        }}>{toDoText}</Text>}
               </View>
                    {isEditing ? (
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._finishEditing}>
                                <View style={styles.actionContainer}>
                                    <Foundation name={"check"} size={20} color={"green"}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                     ):(<View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._startEditing}>
                            <View style={styles.actionContainer}>
                                <Foundation name={"pencil"} size={20} color={"gray"}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={(event)=>{
                            event.stopPropagation();
                            Alert.alert(
                                '삭제',
                                '다음 ToDO를 삭제하시겠습니까?',
                                [
                                    {
                                        text:"No", 
                                        style:'cancel',
                                    },
                                    {text:'yes',onPress:()=>
                                        {
                                            deleteToDo(id)
                                        }
                                    },
                                ],
                                {cancelable:false}
                            )
                        }}>
                            <View style={styles.actionContainer}>
                                <Foundation name={"x"} size={20} color={"red"}/>
                            </View>
                        </TouchableOpacity>
                    </View>)}
            </View>
        );
    }

    _compToggleCheck = (event)=>{
        event.stopPropagation();
        const {id, isCompleted, completeToDo, uncompleteToDo} = this.props;

        if(isCompleted){
            uncompleteToDo(id);
        }else{
            completeToDo(id);
        }
    }

    _compToggleCheckDoubleClick = ()=>{
        const {id, isCompleted, completeToDo, uncompleteToDo} = this.props;

        if(isCompleted){
            uncompleteToDo(id);
        }else{
            completeToDo(id);
        }
    }

    _startEditing=(event)=>{
        event.stopPropagation();
        this.setState({
            isEditing:true,
        })
    }

    _finishEditing=(event)=>{
        event.stopPropagation();
        const {toDoValue} = this.state;
        const {id,updateToDo, toDoText} = this.props;

        if(toDoValue!=="" && toDoText!==toDoValue){
            updateToDo(id,toDoValue);
        }

        this.setState({
            isEditing:false
        })
    }
    
    _handleInputToDo = (toDoText)=>{
        this.setState({
            toDoValue:toDoText
        });
    }
}

const styles = StyleSheet.create({
    container:{
        width: width-30,
        borderBottomColor:"#bbb",
        borderBottomWidth: 1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    todoTitle:{
        fontSize:24,
        marginVertical:15,
        fontWeight:"400",
        marginLeft:7,
        width:(width/2)+50
    },
    completedTitle:{
        color:"#bbb",
        textDecorationLine:"line-through"
    },
    completedTitleEditing:{
        color:"#bbb",
    },
    uncompletedTitle:{
        color:"#F23657"
    },
    circle:{
        width:28,
        height:28,
        borderRadius:25,
        borderWidth:2,
        marginLeft:12
    },
    completedCircle:{
        borderColor:"#bbb",
        backgroundColor:"#bbb"
    },
    uncompletedCircle:{
        borderColor:"#F23657",
        backgroundColor:"white"
    },
    column:{
        flexDirection:"row",
        alignItems:"center",
        width:width/2
    },
    actions:{
        flexDirection:"row"
    },
    actionContainer:{
        marginVertical:10,
        marginHorizontal:10
    },
    inputEditToDo:{
        paddingBottom:5,
    }
});