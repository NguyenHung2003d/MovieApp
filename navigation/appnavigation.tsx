import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreeen";

const Stack = createNativeStackNavigator();
export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}