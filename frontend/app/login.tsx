import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function login() {
  const [showPassword, setShowPassword] = useState(false);
 const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.titleLogin} > Connexion </Text>
        <TextInput
        style={styles.input}
        placeholder="Username"
      />
     
    
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity
        style={styles.icon}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Ionicons
          name={showPassword ? "eye" : "eye-off"}
          size={22}
          color="#4b41dfff"
        />
              <Text style={styles.titleLogin} > </Text>

      </TouchableOpacity >
      
             <TouchableOpacity  style={styles.bttnLogin}
              onPress={() => router.push("/addTask")} >


              <Text style={styles.textBtn}> Se connecter </Text>
             </TouchableOpacity>
            
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
     paddingHorizontal: 20,

    marginVertical: 100,

  },
    backgroundImage: {
    flex: 1, // Ensures the image background takes up the full available space
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleLogin:{
  fontSize:40,
  fontWeight:"black",
  alignSelf:"center",
  marginVertical:20

  },

    input: {
    borderWidth: 2,
    borderColor: "#c4c9d8",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },

  icon: {
    position: "absolute",
    right: 30,
    top: "58%",
  },
  
  bttnLogin:{
  width: '80%',
     backgroundColor: '#261e65ff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginTop:15,
    alignSelf:"center"

  },
  textBtn :{
    color:"white",
    fontSize:20,
    fontWeight:"bold",
    alignSelf:"center",
    marginVertical:10

  }

});
