import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';  


export default function Profile() {

  const [birthDate, setBirthDate] = useState('');
  const [choice, setChoice] = useState(null);
  const [gender, setGender] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  useEffect(() => {
    getData();
}, []);


const getData = async () => {
  try {
      const storedName = await AsyncStorage.getItem('@asyncStorage:name');
      const storedEmail = await AsyncStorage.getItem('@asyncStorage:email');
      const storedGender = await AsyncStorage.getItem('@asyncStorage:gender');
      const storedBirthDate = await AsyncStorage.getItem('@asyncStorage:birthDate');
      const storedChoice = await AsyncStorage.getItem('@asyncStorage:choice');
    
      if(storedName) setName(storedName);
      if(storedEmail) setEmail(storedEmail);
      if(storedGender) setGender(storedGender);
      if(storedBirthDate) setBirthDate(storedBirthDate);
      if(storedChoice) setChoice(storedChoice);
  } catch (e) {
      console.error("Failed to load user data from storage", e);
  }
};

  const calculateAge = (dob) => {
    if(!dob) return '';
    const today = new Date();
    const birthDateParts = dob.split("/");
    const birthDate = new Date(birthDateParts[2], birthDateParts[1] - 1, birthDateParts[0]);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
  
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
  
    return age;
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>PROFILE</Text>
      <Image
        source={require('../../assets/placeholder.jpg')}
        style={styles.avatar}
      />
      
      <Text style={styles.nome}>Nome: <Text style={styles.userName}>{name}</Text></Text>
      <Text style={styles.email}>Email:<Text style={styles.emailUser}>{email}</Text> </Text>
      <Text style={styles.genero}>Gênero:<Text style={styles.Gen}>{gender}</Text> </Text>
      <Text style={styles.idade}>Idade:<Text style={styles.idadeUser}>{calculateAge(birthDate)}</Text> </Text>
      <Text style={styles.choice}>Você é:<Text style={styles.choiceUser}>{choice}</Text> </Text>
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
choice: {
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: '5%',
    marginTop: 10
},
userName:{
  color:'#38a69D'
},
emailUser:{
  color:'#38a69D'
},
idadeUser:{
  color:'#38a69D'
},
Gen:{
  color:'#38a69D'
},
choiceUser:{
  color:'#38a69D'
}
})