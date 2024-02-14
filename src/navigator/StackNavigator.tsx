import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { PRIMARY_COLOR } from '../commons/constantsColor';
import { RegisterScreen } from '../screens/RegisterScreen';
import { useState } from 'react';

//Data de prueba
export interface User{
  id: number,
  username: string,
  password: string
}

const users:User[]=[
  {id:1, username:'vflores', password:'123456'},
  {id:2, username:'caguas', password:'12345678'},
]

const Stack = createStackNavigator();

export const StackNavigator=()=> {

  //Hook gestionar los usuarios registrados en el login
  const [usersLogin, setUsersLogin]=useState(users);

  return (
    <Stack.Navigator screenOptions={{
        cardStyle:{
            backgroundColor:PRIMARY_COLOR
        }
    }}
        >
      <Stack.Screen name="LoginScreen" options={{headerShown:false}} children={()=><LoginScreen users={usersLogin}/>}/>
      <Stack.Screen name="RegisterScreen" options={{headerShown:false}} component={RegisterScreen} />
    </Stack.Navigator>
  );
}