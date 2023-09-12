import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Welcome from '../Pages/Welcome'
import SignIn from '../Pages/SignIn'
import SignUp from '../Pages/SignUp';
import Home from '../Pages/Home';
import InfoUser from '../Pages/InfoUser'
import Profile from '../Pages/Profile';
import Psicologos_cadastro from '../Pages/Psicologos/Psicologos.cadastro';
import Psicologos_pages from '../Pages/Psicologos/Psicologos.pages';

const Stack = createNativeStackNavigator();


export default function Router() {
    

   

    return (
        <Stack.Navigator>
           
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
            />

                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{headerShown: false}}
                    />

                    <Stack.Screen
                        name="SignIn"
                        component={SignIn}
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name="SignUp"
                        component={SignUp}
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name="InfoUser"
                        component={InfoUser}
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name="Profile"
                        component={Profile}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Psicologos_pages"
                        component={Psicologos_pages}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Psicologos_cadastro"
                        component={Psicologos_cadastro}
                        options={{ headerShown: false }}
                    />

                

        </Stack.Navigator>
    );
}