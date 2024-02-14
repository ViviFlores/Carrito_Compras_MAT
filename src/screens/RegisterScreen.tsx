import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { TitleComponent } from '../components/TitleComponent'
import { BodyComponent } from '../components/BodyComponent'
import { stylesGlobal } from '../theme/appTheme'
import { InputComponent } from '../components/InputComponent'
import { ButtonComponent } from '../components/ButtonComponent'

export const RegisterScreen = () => {

  //Hook - desencriptar el password
  const [hiddenPassword, setHiddenPassword] = useState(true);

  //Hook - control de los datos en el form
  const[form, setForm]=useState({
    username:'',
    password:'',
    hasError: false,
  });

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
          <ButtonComponent title='Registrarse' onPress={()=>{}} />
          <TouchableOpacity
            onPress={()=>{}}>
              <Text style={stylesGlobal.textNavigation}>Ya tienes una cuenta? Inicia sesión ahora!</Text>
          </TouchableOpacity>
        </BodyComponent>
    </View>
  )
}
