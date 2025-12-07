import { Stack } from 'expo-router';
import React from 'react';
export default function _layout() {
  return (
<Stack screenOptions={{ headerShown: false }}> 
    <Stack.Screen name="splashScreen" />
    <Stack.Screen name="login"/>
    <Stack.Screen name="compte"/>
    <Stack.Screen name="addTask"/>
    <Stack.Screen name="dashboard"/>
    



    </Stack>    
  )
}
