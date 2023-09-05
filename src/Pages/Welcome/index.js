import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem('userLoggedIn');
      if (isLoggedIn) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        });
      }
    };

    checkLoginStatus();
  }, []);

 return (
   <View style={styles.container}>

<View style={styles.containerLogo}>
<View style={styles.containerLogo}>
    <View style={styles.logoContainer}>
        <Animatable.Image 
            animation={"flipInY"}
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode='contain'
        />
      <Text style={styles.title}>PsicoGuia</Text>
    </View>
</View>
</View> 
    <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
    <Text style={styles.slogan}>Sua Jornada para uma Mente Saudável</Text>
    <Text style={styles.text}> Faça login para começar</Text>

    <TouchableOpacity 
    style={styles.button}
    onPress={ () => navigation.navigate('SignIn')}
    >
      <Text style={styles.buttonText}>Acessar</Text>
    </TouchableOpacity>

    </Animatable.View>


   </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    width: 251,          
        height: 251,
        borderRadius: 125.5,
        overflow: 'hidden',  
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#38a69d',  
    
},
  logo: {
    width: 251,    
    height: (251/378) * 251, 
},
  container:{
    flex:1,
    backgroundColor: '#38a69d'
  },
  containerLogo:{
    flex:2,
    backgroundColor: '#38a69d',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  containerForm: {
    flex:1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart:'5%',
    paddingEnd: '5%'
  },
  slogan:{
    fontSize:24,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
  },
  text:{
    color:'#a1a1a1'
  },
  button:{
    position: 'absolute',
    backgroundColor: '#38a69d',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText:{
    fontSize: 18,
    color: "#FFF",
    fontWeight: 'bold'
  },
  title:{
    fontSize: 25,
    color: '#FFF',
    fontWeight: 'bold',
  }
})