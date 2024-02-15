import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { TitleComponent } from '../components/TitleComponent'
import { BodyComponent } from '../components/BodyComponent'
import { stylesGlobal } from '../theme/appTheme'
import { InputComponent } from '../components/InputComponent'
import { ButtonComponent } from '../components/ButtonComponent'
import { User } from '../navigator/StackNavigator'
import { getIdNewUser, hasErrorFormRegister, showSnackBar, verifyExistUser } from '../commons/authValidations'
import { ERROR_COLOR, PRIMARY_COLOR } from '../commons/constantsColor'
import { useNavigation } from '@react-navigation/native'

export interface RegisterForm{
  username: string;
  email: string;
  password: string;
  hasError: boolean;
}

interface RegisterProps{
  usersLogin:User[];
  setUsersLogin:(user:User)=>void;
}

export const RegisterScreen = ({usersLogin, setUsersLogin}:RegisterProps) => {

  //Hook de navegación
  const navigation=useNavigation();

  //Hook - desencriptar el password
  const [hiddenPassword, setHiddenPassword] = useState(true);

  //Hook - control de los datos en el form
  const[form, setForm]=useState<RegisterForm>({
    username:'',
    email:'',
    password:'',
    hasError: false,
  });

  //Función para guardar los usuarios
  const handlerSaveUser=()=>{
  //Validar formulario
  if(hasErrorFormRegister(form)){ 
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

  const existUser=verifyExistUser(usersLogin, form);
  if(existUser){
    showSnackBar("El usuario ya se encuentra registrado", ERROR_COLOR)
    return;
  }

  //Usuario nuevo
  const newUser:User={
    id: getIdNewUser(usersLogin),
    ...form
  }

  //agregar el nuevo usario en el arreglo de usersLogin
  setUsersLogin(newUser)
  showSnackBar("Usuario registrado con éxito!", PRIMARY_COLOR)
  
  console.log(form);
  //volver inicio sesión
  navigation.goBack();
  }

  //Función que cambie el valor del useState (form)
  const handlerChangeText=(name: string, value:string)=>{
    setForm(prevState=>({
      ...prevState,
      [name]:value,
    }))
  }

  return (
    <View>
        <TitleComponent title='Regístrate'/>
        <BodyComponent>
          <Text style={stylesGlobal.textPrincipal}>Estás muy cerca!</Text>
          <Text style={stylesGlobal.textDescription}>Realiza tus compras de manera rápida y segura</Text>
          <View style={stylesGlobal.containerForm}>
          <InputComponent 
              placeholder='Correo electrónico'
              onChangeText={handlerChangeText}
              name={'email'}
              hasError={form.hasError}/>
            <InputComponent 
              placeholder='Usuario'
              onChangeText={handlerChangeText}
              name={'username'}
              hasError={form.hasError}/>
            <InputComponent
              placeholder='Password'
              onChangeText={handlerChangeText}
              name={'password'}
              isPassword={hiddenPassword}
              hasIcon={true}
              accionIcon={()=>setHiddenPassword(!hiddenPassword)}
              hasError={form.hasError}
            />
          </View>
          <ButtonComponent title='Registrarse' onPress={handlerSaveUser} />
          <TouchableOpacity
            onPress={()=>navigation.goBack()}>
              <Text style={stylesGlobal.textNavigation}>Ya tienes una cuenta? Inicia sesión ahora!</Text>
          </TouchableOpacity>
        </BodyComponent>
    </View>
  )
}
