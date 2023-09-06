import React,{ useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native';

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  

  const handleLogin = async () => {
    try {
        const storedEmail = await AsyncStorage.getItem('@asyncStorage:email');
        const storedPassword = await AsyncStorage.getItem('@asyncStorage:password' );
        if (email === storedEmail && password === storedPassword) {
            navigation.navigate('Home'); 
        } else {
            Alert.alert("Erro", "E-mail ou senha inválidos.");
        }
    } catch (error) {
        Alert.alert("Erro", "Ocorreu um erro ao tentar fazer login.");
    }
};



 return (
   <View style={styles.container}>
    <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
      <Text style={styles.message}>Bem-Vindo(a) </Text>
    </Animatable.View>

    <Animatable.View animation="fadeInUp" style={styles.containerForm}>
    <Text style={styles.title}>Email</Text>
    <TextInput 
    placeholder='Digite um email...'
    style={styles.input}
    onChangeText={setEmail}
    value={email}
    />

    <Text style={styles.title}>Senha</Text>
    <TextInput 
    placeholder='Digite sua senha...'
    style={styles.input}
    secureTextEntry={true}
    onChangeText={setPassword}
    value={password}
    />

    <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText}>Acessar</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.buttonRegister} onPress={ () => navigation.navigate('SignUp')}>
      <Text style={styles.registerText} >Não possui uma conta? Cadastre-se</Text>
    </TouchableOpacity>

    </Animatable.View>

   </View>
  );
}

const styles =  StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#38a69d',
  },
  containerHeader:{
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF'
  },
  containerForm:{
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  title:{
    fontSize: 20,
    marginTop: 28,
  },
  input:{
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button:{
    backgroundColor: '#38a69d',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonRegister:{
    marginTop: 14,
    alignSelf: 'center'
  },
  registerText:{
    color: '#a1a1a1'
  }
})