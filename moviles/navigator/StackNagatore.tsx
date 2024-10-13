import { createStackNavigator } from '@react-navigation/stack';


import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { View } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { LoginScreen } from '../src/LoginScreen';
import RegisterScreen from '../src/RegisterScreen';
import { HomeScreen } from '../src/HomeScreen/HomeScreen';
import { DetallesPersonalScreen } from '../src/HomeScreen/DetallesPersonalScreen';
import { auth } from '../src/config/firebaseConfig';
import { styles } from '../src/theme/styles';



//interface - rotts (StackScreen)
interface Routes{
    name:string,
    screen:()=> JSX.Element; //componente react 
    headerShow?: boolean;
    title?:string;
}
//arreglo - con rutas de la app
const routes: Routes[] = [
    {name:'Login',screen:LoginScreen},
    {name:'Register',screen:RegisterScreen},
    {name:'Home', screen:HomeScreen},
    {name:'Detail',screen:DetallesPersonalScreen, headerShow: true, title: "Detalle Personal"}

];

const Stack = createStackNavigator();

export const StackNavigator = () => {
    //hook useState: Verificar si esta autenticado o  no
    const [isAuth, setIsAuth] = useState<boolean>(false);

    //hook useState : controlar carga inicial
    const [isLoading, setIsLoading] = useState<boolean>(false)

//hook use efect : validar el estado de autenticacion
useEffect(()=>{
    //cargar el activity indicator

    setIsLoading(true);
    onAuthStateChanged(auth, (user)=>{
        if(user){ //existe autenticacion
        ///console.log(user);
        setIsAuth(true);

    }
    //ocultar el activity indicator
    setIsLoading(false);

    });
},[]);



  return (
    <>
    {isLoading ? (
    <View style={styles.rootActivity}>
        <ActivityIndicator animating={true} size={35}/>
    </View>
    ):(
    <Stack.Navigator initialRouteName={isAuth ? 'Home' : 'Login'}>
        {
           
            routes.map((item, index)=>(
                <Stack.Screen key={index}
                name={item.name} 
                options={{headerShown: item.headerShow ?? false, title:item.headerShow? item.title: ""}} 
                component={item.screen} />
                
            ))
        }
      
     
    </Stack.Navigator>
)}
    </>
  );
}