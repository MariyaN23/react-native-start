import React from 'react';
import {Button, StyleSheet, TextInput, View} from "react-native";
import {globalStyles} from "@/app/global-styles";

type InputPropsType = {
    title: string
    id: number
    changeTitle: (taskId: number, title: string)=> void
    setShow: (taskId: number)=> void
}

export const Input = (props: InputPropsType) => {
    const [title, setTitle] = React.useState(props.title)
    const changeInput = (newTitle: string) => {
        setTitle(newTitle)
    }

    return (
        <View style={{flexDirection: 'row'}}>
            <TextInput style={[globalStyles.border, globalStyles.input]}
                       value={title}
                       onChangeText={(newTitle)=> changeInput(newTitle)}/>
            <Button title={'+'} onPress={()=> {
                props.changeTitle(props.id, title)
                props.setShow(0)
            }}/>
        </View>
    )
}