import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location'
import AddressFetcher from '../../../components/AddressFetcher';

export default function Psicologos_Cadastro() {
  const navigation = useNavigation();
  const [birthDate, setBirthDate] = useState('');
  const [choice, setChoice] = useState(null);
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [images, setImages] = useState([null, null, null]);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  const selectImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],  
    });
  
    if (!result.cancelled) {
      let newImages = [...images];
      newImages[index] = result.uri;
      setImages(newImages);
    }
  };

  const fetchAddress = async () => {
    try {

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert("Permissão negada", "Não podemos obter a localização sem permissão.");
        return;
      }


      const location = await Location.getCurrentPositionAsync({});


      const addr = await Location.reverseGeocodeAsync(location.coords);

      if (addr && addr.length > 0) {
        setAddress(`${addr[0].street}, ${addr[0].city}, ${addr[0].country}`);
      } else {
        Alert.alert("Erro", "Não foi possível obter o endereço.");
      }

    } catch (error) {
      Alert.alert("Erro", "Houve um erro ao obter a localização ou o endereço.");
    }
  };

 

  const handleContinue = async () => {
    if (!images.every(Boolean)) {
        Alert.alert("Por favor, adicione todas as imagens do seu consultório.");
        return;
    }

    try {
      
        await AsyncStorage.setItem('@asyncStorage:images', JSON.stringify(images));
        await AsyncStorage.setItem('@asyncStorage:address',(address));
  
      navigation.navigate('SignIn')
    } catch (error) {
        Alert.alert("Erro ao adicionar informações.");
    }   
  };

  return (
 
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Image 
          source={require('../../../assets/psicoguia.jpg')}
          style={styles.logo}
          resizeMode='contain'
        />
        <Text style={styles.message}>Criando conta para Psicólogo. </Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
   
        <Text style={styles.title}>Coloque O endereço de seu consultório:</Text>
        <AddressFetcher />
        <TextInput 
        />
  
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.title}>Coloque foto de seu consultório</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            {images.map((image, index) => (
              <TouchableOpacity
                key={index}
                style={image ? styles.imageBox : styles.addButton}
                onPress={() => selectImage(index)}
              >
                {image ? (
                  <Image source={{ uri: image }} style={styles.image} />
                ) : (
                  <Text style={styles.addButtonText}>Toque para adicionar</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
        
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#1c1c1c',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  containerHeader: {
    marginTop: '10%',
    marginBottom: '8%',
    alignItems: 'center', 
  },
  message: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFF'
  },
  containerForm: {
      backgroundColor: '#FFF',
      flex: 1,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingStart: '5%',
      paddingEnd: '5%',
  },
  title: {
      fontSize: 15,
      marginTop: 18,
      fontWeight: 'bold',
  },
  input: {
      borderBottomWidth: 1,
      height: 40,
      marginBottom: 12,
      fontSize: 16,
  },
  button: {
      backgroundColor: '#1c1c1c',
      width: '100%',
      borderRadius: 4,
      paddingVertical: 8,
      marginTop: 14,
      justifyContent: 'center',
      alignItems: 'center'
  },
  buttonText:{
      color:'#FFF',
      fontSize: 20,
  },
  addButton: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#e9e9e9' 
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
});