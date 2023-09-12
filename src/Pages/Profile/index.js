import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
    const [birthDate, setBirthDate] = useState('');
    const [choice, setChoice] = useState(null);
    const [gender, setGender] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [images, setImages] = useState([]);

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
            const storedImages = await AsyncStorage.getItem('@asyncStorage:images');

            if (storedName) setName(storedName);
            if (storedEmail) setEmail(storedEmail);
            if (storedGender) setGender(storedGender);
            if (storedBirthDate) setBirthDate(storedBirthDate);
            if (storedChoice) setChoice(storedChoice);
            if (storedImages) setImages(JSON.parse(storedImages));
        } catch (e) {
            Alert.alert("Erro ao carregar os dados do usuário.");
        }
    };

    const calculateAge = (dob) => {
        if (!dob) return '';
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
            <Text style={styles.email}>Email: <Text style={styles.emailUser}>{email}</Text></Text>
            <Text style={styles.genero}>Gênero: <Text style={styles.Gen}>{gender}</Text></Text>
            <Text style={styles.idade}>Idade: <Text style={styles.idadeUser}>{calculateAge(birthDate)}</Text></Text>
            <Text style={styles.choice}>Você é: <Text style={styles.choiceUser}>{choice}</Text></Text>

           
            {choice === 'Psicólogo' && (
                <View>
                  <Text style={styles.titleConsul}>Fotos de seu consúltorio:</Text>
                   <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                {images.map((image, index) => (
                    <View 
                        key={index}
                        style={image ? styles.imageBox : styles.addButton}
                    >
                        {image ? (
                            <Image source={{ uri: image }} style={styles.image} />
                        ) : (
                            <Text style={styles.addButtonText}>Sem imagem</Text>
                        )}
                    </View>
                ))}
            </View>
                </View>
            )}
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
  titleConsul:{
    fontSize: 20,
    marginTop: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    margin: 'auto',
    marginLeft: '5%'
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
  color:'#ea900f'
},
emailUser:{
  color:'#ea900f'
},
idadeUser:{
  color:'#ea900f'
},
Gen:{
  color:'#ea900f'
},
choiceUser:{
  color:'#ea900f'
},
imageBox: {
  width: 100,
  height: 100,
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: '#ccc',
  borderWidth: 2,
  borderRadius: 5,
  backgroundColor: '#f5f5f5', 
  marginHorizontal: 5
},
image: {
  width: '100%',
  height: '100%',
  borderRadius: 5
},
addButtonText: {
  textAlign: 'center',
  color: '#333'
}
})