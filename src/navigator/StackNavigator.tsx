import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { PRIMARY_COLOR } from '../commons/constantsColor';
import { RegisterScreen } from '../screens/RegisterScreen';
import { useState } from 'react';
import { HomeScreen } from '../screens/HomeScreen';

//Data de prueba
export interface User{
  id: number,
  username: string,
  email: string,
  password: string
}

const users:User[]=[
  {id:1, username:'vflores', email:'vflores@gmail.com', password:'123456'},
  {id:2, username:'caguas', email:'caguas@gmail.com', password:'12345678'},
]

const Stack = createStackNavigator();

export const StackNavigator=()=> {

  //Hook gestionar los usuarios registrados en el login
  const [usersLogin, setUsersLogin]=useState(users);

  //Función para agregar los nuevos usuarios desde el setUserLogin
  const handlerAddUser=(user: User)=>{
    setUsersLogin([...usersLogin, user])
  }

  return (
    <Stack.Navigator screenOptions={{
        cardStyle:{
            backgroundColor:PRIMARY_COLOR
        }
    }}
        >
      <Stack.Screen name="LoginScreen" options={{headerShown:false}} children={()=><LoginScreen users={usersLogin}/>}/>
      <Stack.Screen name="RegisterScreen" options={{headerShown:false}} children={()=><RegisterScreen usersLogin={usersLogin} setUsersLogin={handlerAddUser}/>} />
      <Stack.Screen name="HomeScreen" options={{headerShown:false}} component={HomeScreen}/>
    </Stack.Navigator>
  );
}