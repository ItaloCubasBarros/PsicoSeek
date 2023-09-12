import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();


  return (
    <View style={styles.container}>

      <View style={styles.containerLogo}>
        <View style={styles.containerLogo}>
          <View style={styles.logoContainer}>
            <Animatable.Image
              animation={"flipInY"}
              source={require('../../assets/psicoguia.jpg')}
              style={styles.logo}
              resizeMode='contain'
            />
            <Text style={[styles.titleP, styles.shadowText]}>
              <Text style={styles.psico}>Psico</Text>
              <Text style={styles.guia}>Guia</Text>
            </Text>
          </View>
        </View>
      </View>
      <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.slogan}>Sua Jornada para uma Mente Saudável</Text>
        <Text style={styles.text}> Faça login para começar</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}
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
    backgroundColor: '#1c1c1c',

  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '##1c1c1c'
  },
  containerLogo: {
    flex: 2,
    backgroundColor: '#1c1c1c',
    justifyContent: 'center',
    alignItems: 'center',

  },
  containerForm: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  slogan: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
  },
  titleP: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  psico: {
    color: '#ea900f', 
  },
  guia: {
    color: '#258e73', 
  },
  shadowText: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)', 
    textShadowOffset: { width: -1, height: 1 }, 
    textShadowRadius: 10, 
  },
  button: {
    position: 'absolute',
    backgroundColor: '#1c1c1c',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: 'bold'
  },
  title: {
    fontSize: 25,
    color: '#FFF',
    fontWeight: 'bold',
  }
})