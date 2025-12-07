import React from 'react'
import { Text, TouchableOpacity, View,StyleSheet,Image } from 'react-native'
import { useRouter } from 'expo-router';
export default function splashScreen() {
    const router = useRouter();
  return (  
    <View style={styles.container}> 
              <Image source={require('../assets/images/logo.jpg')} style={styles.photo} />
        <Text> Gérez vos tâches efficacement</Text>

    <TouchableOpacity style={styles.Btn}
         
        onPress={() => {
               
                    router.push("/login");  
              }}>
            
          
          <Text style={styles.textBtn}>Se connecter </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Btn}
        onPress={()=>{
          router.push("/compte");
        }}
    >
          
         <Text style={styles.textBtn}>Créer un compte</Text>
        </TouchableOpacity>
        </View>
  )
}
const styles = StyleSheet.create({
  container: {
       flex: 1,
    alignItems: 'center',
     justifyContent: 'center',
 
    backgroundColor: 'white',
    width: "100%",},
    photo: {
      width: 150,
    height: 150,
  borderRadius:20},
  textBtn: {
    fontSize: 18,
    color: 'white',
    
    marginTop: 5,
    fontWeight: 'bold',
  alignSelf: 'center',},

  Btn: { 
    width: '80%',
     backgroundColor: '#261e65ff',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginTop:15,

  },
});
