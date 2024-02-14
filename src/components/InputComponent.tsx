import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { ERROR_COLOR, INPUT_COLOR, PRIMARY_COLOR } from '../commons/constantsColor'
import Icon from 'react-native-vector-icons/MaterialIcons';

interface InputProps{
    placeholder: string;
    name: string;
    isPassword?: boolean;
    hasIcon?: boolean;
    hasError:boolean;
    //método que captura el valor del input
    onChangeText: (name: string, value: string) =>void;
    accionIcon?:()=>void;
}

export const InputComponent = ({placeholder, name, onChangeText, isPassword=false, hasIcon=false, accionIcon=()=>{}, hasError}:InputProps) => {
  return (
    <View>
        {
            (hasIcon)
            ?<Icon style={styles.icon} name='visibility' size={20} color={PRIMARY_COLOR} onPress={accionIcon}/>
            : null
        }
        
        <TextInput
            placeholder={placeholder}
            keyboardType={'default'}
            style={(hasError)
                ?{...styles.inputText, ...styles.error}
                :{...styles.inputText}}
            onChangeText={(value: string)=>onChangeText(name, value)}
            secureTextEntry={isPassword}/>
        {
            (hasError)
            ?<Text style={styles.errorText}>El campo es obligatorio</Text>
            :null
        }
    </View>
  )
}

const styles=StyleSheet.create({
    icon:{
        position:'absolute',
        right:20,
        zIndex:1,
        marginTop:22
    },
    inputText:{
        backgroundColor:INPUT_COLOR,
        paddingHorizontal:20,
        borderRadius:10,
        marginVertical:10
    },
    error:{
        borderColor:ERROR_COLOR,
        borderStyle: 'solid',
        borderWidth:1
    },
    errorText:{
        color:ERROR_COLOR,
        fontSize:12,
        fontWeight:'bold'
    },
})