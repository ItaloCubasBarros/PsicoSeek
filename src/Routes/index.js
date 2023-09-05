import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Welcome from '../Pages/Welcome'
import SignIn from '../Pages/SignIn'
import SignUp from '../Pages/SignUp';
import Home from '../Pages/Home';
import InfoUser from '../Pages/InfoUser'
import Profile from '../Pages/Profile';

const Stack = createNativeStackNavigator();


export default function Router() {
    const [hasInfo, setHasInfo] = useState(null);

    useEffect(() => {
        async function checkUserInfo() {
            try {
                const userInfo = await AsyncStorage.getItem('user_info_key');
                if (userInfo) {
                    const data = JSON.parse(userInfo);
                    if (data.birthDate && data.choice) {
                        setHasInfo(true);
                    } else {
                        setHasInfo(false);
                    }
                } else {
                    setHasInfo(false);
                }
            } catch (error) {
                console.error("Failed to load user info", error);
                setHasInfo(false);
            }
        }

        checkUserInfo();
    }, []);

    if (hasInfo === null) {
        return null; 
    }

    return (
        <Stack.Navigator>
            {hasInfo ? (
                <>
                    <Stack.Screen 
                        name="Home"
                        component={Home}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="Welcome"
                        component={Welcome}
                        options={{ headerShown: false }}
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
                   
                </>
            ) : (
                <>
                        
                        <Stack.Screen
                        name="InfoUser"
                        component={InfoUser}
                        options={{ headerShown: false }}
                    />
                        
                </>
            )}
        </Stack.Navigator>
    );
}