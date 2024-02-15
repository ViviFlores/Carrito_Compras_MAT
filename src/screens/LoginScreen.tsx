import React, { useState } from 'react'
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { TitleComponent } from '../components/TitleComponent'
import { ERROR_COLOR, PRIMARY_COLOR } from '../commons/constantsColor'
import { BodyComponent } from '../components/BodyComponent'
import { InputComponent } from '../components/InputComponent'
import { ButtonComponent } from '../components/ButtonComponent'
import Snackbar from 'react-native-snackbar'
import { StackScreenProps } from '@react-navigation/stack'
import { stylesGlobal } from '../theme/appTheme'
import { User } from '../navigator/StackNavigator'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { hasErrorFormLogin, showSnackBar, verifyExistUser } from '../commons/authValidations'


export interface LoginForm{
  username: string;
  password: string;
  hasError: boolean;
}

interface LoginProps{
  users:User[]
}

//interface Props extends StackScreenProps<any,any>{};

export const LoginScreen = ({users}:LoginProps) => {

  //Hook de navegación
 const navigation=useNavigation();

  //Hook - control de los datos en el form
  const[form, setForm]=useState<LoginForm>({
    username:'',
    password:'',
    hasError: false,
  });

  //const [numero, setNumero] = useState(0);

  //Hook - desencriptar el password
  const [hiddenPassword, setHiddenPassword] = useState(true);

  //Función que cambie el valor del useState (form)
  const handlerChangeText=(name: string, value:string)=>{
    //console.log(name);
    //console.log(value); 
    setForm(prevState=>({
      ...prevState,
      [name]:value,
    }))
  }

  //Funcion que envie los datos del formulario
  const handlerSendInfo=()=>{
  //Validar formulario
  if(hasErrorFormLogin(form)){ 
    setForm(prevState=>({
      ...prevState,
      hasError:true
  }))
  return;  
  }
  setForm(prevState=>({
    ...prevState,
    hasError:false
  }))

  // llamar función que verifica si el usuario existe en el arreglo
  const existUser=verifyExistUser(users,form);
  if(!existUser || existUser.password != form.password){
    showSnackBar("Usuario y/o contraseña incorrecta!", ERROR_COLOR);
    return;
  }
  //console.log(form);
  navigation.dispatch(CommonActions.navigate({name:'HomeScreen'}))

}

  return (
    <View>
        <StatusBar backgroundColor={PRIMARY_COLOR}/>
        <TitleComponent title='Iniciar Sesión'/>
        <BodyComponent>
          <Text style={stylesGlobal.textPrincipal}>Bienvenido de nuevo!</Text>
          <Text style={stylesGlobal.textDescription}>Realiza tus compras de manera rápida y segura</Text>
          <View style={stylesGlobal.containerForm}>
            <InputComponent placeholder='Usuario' name={'username'} onChangeText={handlerChangeText} hasError={form.hasError}/>
            <InputComponent 
              placeholder='Contraseña' 
              name={'password'} 
              onChangeText={handlerChangeText} 
              isPassword={hiddenPassword}
              hasIcon={true}
              accionIcon={()=>setHiddenPassword(!hiddenPassword)}
              hasError={form.hasError}/>
              {/* <TextInput
                placeholder='numero'
                keyboardType='numeric'
                onChangeText={(numero:string)=>setNumero(parseInt(numero))}/> */}
          </View>
          <ButtonComponent title='Iniciar Sesión' onPress={handlerSendInfo}/>

          <TouchableOpacity 
            onPress={()=>navigation.dispatch(CommonActions.navigate({name:'RegisterScreen'}))}>
            <Text style={stylesGlobal.textNavigation}>No tienes una cuenta? Regístrate ahora!</Text>
          </TouchableOpacity>
        </BodyComponent>
    </View>
  )
}


