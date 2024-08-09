import {Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import React, {ReactElement, ReactNode, useState} from "react";
import {Checkbox} from "expo-checkbox";
import {Input} from "@/app/input/Input";
import {globalStyles} from "@/app/global-styles";


export default function HomeScreen() {
    const initialTasks = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS', isDone: false},
        {id: 4, title: 'React', isDone: true},
        {id: 5, title: 'React Native', isDone: false},
    ]
    const [value, setValue] = useState('')
    const [tasks, setTasks] = useState(initialTasks)
    const addTask = () => {
        const newTask = {
            id: tasks.length + 1,
            title: value,
            isDone: false
        }
        //Alert.alert(JSON.stringify(newTask))
        setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (taskId: number, status: boolean) => {
        setTasks(tasks.map(task => task.id === taskId ? {...task, isDone: status} : task))
    }
    const [show, setShow] = useState(0)
    const changeTitle = (taskId: number, newTaskTitle: string)=> {
        setTasks(tasks.map(task => task.id === taskId ? {...task, title: newTaskTitle} : task))
    }
    return (
        <View style={styles.container}>
            <HideKeyboard>
                <View style={[globalStyles.border, {width: '80%', alignItems: 'center', padding: 30}]}>
                    <TextInput style={globalStyles.input} value={value} onChangeText={setValue}/>
                </View>
            </HideKeyboard>
            <View style={{backgroundColor: '#9985e8', margin: 5}}>
                <Button title={'Add task'} color={'#fff'} onPress={addTask}/>
            </View>
            <View style={{width: '60%'}}>
                {tasks.map(task => {
                    return <View style={styles.boxTask} key={task.id}>
                        <Checkbox value={task.isDone} onValueChange={(value) => changeTaskStatus(task.id, value)}/>
                        {show === task.id
                            ? <Input id={task.id} changeTitle={changeTitle} title={task.title} setShow={setShow}/>
                            : <Text onPress={() => setShow(task.id)}>{task.title}</Text>}
                    </View>
                })}
            </View>
        </View>
    );
}

const HideKeyboard = ({children}: { children: ReactNode }): ReactElement => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cabcff',
    },
    boxTask: {
        flexDirection: 'row',
        backgroundColor: 'rgb(221,215,243)',
        padding: 5
    }
})