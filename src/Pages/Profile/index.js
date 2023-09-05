import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';


export default function Profile() {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>PROFILE</Text>
      <Image
        source={require('../../assets/placeholder.jpg')}
        style={styles.avatar}
      />
      <Text style={styles.nome}>Nome: <Text style={styles.userName}>Nome Do Usuario</Text></Text>
      <Text style={styles.email}>Email:<Text style={styles.emailUser}>exemplo@gmail.com</Text> </Text>
      <Text style={styles.genero}>Gênero:<Text style={styles.Gen}>Gênero do usuario</Text> </Text>
      <Text style={styles.idade}>Idade:<Text style={styles.idadeUser}>Idade do Usuario</Text> </Text>
    </View>
  );
}

const styles =  StyleSheet.create({
  container:{
    flex: 1
  },
  title:{
    fontSize: 25,
    marginTop: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: '38%',
  },
  avatar:{
    width: 60,
    height: 60,
    borderRadius: 30,  
    marginLeft: '43%',
  },
  nome: {
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: '5%',
    marginTop: 10
},
email: {
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: '5%',
    marginTop: 10
},
genero: {
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: '5%',
    marginTop: 10
},
idade: {
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: '5%',
    marginTop: 10
},
userName:{
  color:'#a1a1a1'
},
emailUser:{
  color:'#a1a1a1'
},
idadeUser:{
  color:'#a1a1a1'
},
Gen:{
  color:'#a1a1a1'
}
})