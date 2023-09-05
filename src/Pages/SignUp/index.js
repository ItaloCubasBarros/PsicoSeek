import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-async-storage/async-storage';   
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

  const handleRegister = async () => {
    if (password !== repeatPassword) {
        Alert.alert("As senhas não coincidem!");
        return;
    }
    try {
        const userInfo = JSON.stringify({ name, password });
        await AsyncStorage.setItem(email, userInfo);
        Alert.alert("Conta criada com sucesso!");
    } catch (error) {
        Alert.alert("Erro ao criar a conta.");
    }
};


 return (
   <View style={styles.container}>
    <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
      <Text style={styles.message}>Bem-Vindo(a) </Text>
    </Animatable.View>

    <Animatable.View animation="fadeInUp" style={styles.containerForm}>
    <TextInput 
    placeholder='Digite seu nome...'
    style={styles.input}
    onChangeText={setName}
    value={name}
/>
<TextInput 
    placeholder='Digite seu email...'
    style={styles.input}
    onChangeText={setEmail}
    value={email}
/>
<TextInput 
    secureTextEntry={true}
    placeholder='Digite sua senha...'
    style={styles.input}
    onChangeText={setPassword}
    value={password}
/>
<TextInput 
    secureTextEntry={true}
    placeholder='Repita sua senha...'
    style={styles.input}
    onChangeText={setRepeatPassword}
    value={repeatPassword}
/>



<TouchableOpacity style={styles.button} onPress={handleRegister}>
    <Text style={styles.buttonText}>Criar Conta</Text>
</TouchableOpacity>


    <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.loginText} > possui uma conta? Faça login</Text>
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
  buttonLogin:{
    marginTop: 14,
    alignSelf: 'center'
  },
  loginText:{
    color: '#a1a1a1'
  }
})