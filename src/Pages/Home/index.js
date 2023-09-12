import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Linking, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Animatable from 'react-native-animatable';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Profile from '../Profile';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { Ionicons, MaterialCommunityIcons,FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import Psicologos_pages from '../Psicologos/Psicologos.pages';

const Tab = createBottomTabNavigator();

export default function Home() {

  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState(null);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedRating, setSelectedRating] = useState('')
  const [selectedPreco, setSelectedPreco] = useState('')
 
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    })();
  }, []);

  const calculardistancia = (lat1, lon1, lat2, lon2) => {
    var R = 6371; 
    var dLat = (lat2 - lat1) * (Math.PI / 180);
    var dLon = (lon2 - lon1) * (Math.PI / 180);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) 
            * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; 
    return d;
  }

  const psicologos = [
    { id: '1', name: 'Dr. João Lucas', gender: 'Masculino', image: 'https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg', rating: 5, location: { latitude: -15.610126247519439, longitude: -56.07270112293936 }, preco: 5, atendimentos:350 },
    { id: '2', name: 'Dra. Ana Alice', gender: 'Feminino', image: 'https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg', rating: 4, location: { latitude: -15.610126247519439, longitude: -56.07270112293936 }, preco: 3, atendimentos: 1000 },
    { id: '3', name: 'Dr. Gabriel Antonio', gender: 'Masculino', image: 'https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg', rating: 1, location: { latitude: -15.610126247519439, longitude: -56.07270112293936 }, preco: 3, atendimentos: 800 },
    { id: '4', name: 'Dra. Carla Ferreira', gender: 'Feminino', image: 'https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg', rating: 3, location: { latitude: -15.610126247519439, longitude: -56.07270112293936 }, preco: 3, atendimentos: 100 },
    { id: '5', name: 'Dr. Carlos Andrade', gender: 'Masculino', image: 'https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg', rating: 4, location: { latitude: -15.610126247519439, longitude: -56.07270112293936 }, preco: 3, atendimentos: 30 },
    { id: '6', name: 'Dr. Wellington Silva', gender: 'Masculino', image: 'https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg', rating: 5, location: { latitude: -15.610126247519439, longitude: -56.07270112293936 }, preco: 2 , atendimentos: 90},
    { id: '7', name: 'Dr. Lucas Matos', gender: 'Masculino', image: 'https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',   rating: 2, location: { latitude: -15.610126247519439, longitude: -56.07270112293936 }, preco: 3, atendimentos: 80 },
    { id: '8', name: 'Dr. Matias Guedes', gender: 'Masculino', image: 'https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg', rating: 1 , location: { latitude: -15.610126247519439, longitude: -56.07270112293936 }, preco: 5, atendimentos: 1300 },
    { id: '9', name: 'Dr. Luciana Amaral', gender: 'Feminino', image: 'https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg', rating: 5 , location: { latitude: -15.610126247519439, longitude: -56.07270112293936 }, preco: 5, atendimentos: 15 },
  ]
  const filteredPsicologos = psicologos
  .filter(p => {
    if (selectedGender) {
      return p.gender === selectedGender;
    }
    return true;
  })
  
  filteredPsicologos.sort((a, b) => {
    if (selectedRating === 'Maior' && selectedPreco === 'MaiorPreco') {
      if (a.rating === b.rating) {
        return b.preco - a.preco;
      }
      return b.rating - a.rating;
    } else if (selectedRating === 'Menor') {
      return a.rating - b.rating;
    } else if (selectedRating === 'Maior') {
      return b.rating - a.rating;
    } else if (selectedPreco === 'MenorPreco') {
      return a.preco - b.preco;
    } else if (selectedPreco === 'MaiorPreco') {
      return b.preco - a.preco;
    }
    return 0;
  });

  function RenderStars({ rating }) {
    const totalStars = 5; 

    return (
        <View style={{ flexDirection: 'row' }}>
            {[...Array(totalStars)].map((_, index) => (
                <Ionicons 
                    key={index}
                    name={index < rating ? 'star' : 'star-outline'} 
                    size={15} 
                    color="gold" 
                />
            ))}
        </View>
    );
}



  const renderItem = ({ item }) => {
    let distance = null;
  
  if (userLocation && userLocation.latitude && userLocation.longitude && item.location) {
    distance = calculardistancia(userLocation.latitude, userLocation.longitude, item.location.latitude, item.location.longitude).toFixed(2);
  }


    return (
      <TouchableOpacity onPress={ () => navigation.navigate('Psicologos_pages', { psicologo: item })}>
      <View style={styles.card}>
        <View style={styles.cardRow}>
          <Image source={{ uri: item.image }} style={styles.cardImage} />
          <View style={styles.cardInfo}>
            <Text style={styles.cardText}>Nome: {item.name}</Text>
            <Text style={styles.cardText}>Gênero: {item.gender}</Text>
            <RenderStars rating={item.rating} />
            <Text style={styles.cardText}>{distance ? `Distância: ${distance} km` : "Calculando distância..."}</Text>
            <TouchableOpacity style={styles.button} onPress={() => openInMaps(item.location.latitude, item.location.longitude)}>
              <Text style={styles.buttonText}>Ver no mapa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    );
  };

  const openInMaps = (latitude, longitude) => {
    const url = `http://maps.google.com/?q=${latitude},${longitude}`;
    Linking.openURL(url);
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userLoggedIn');
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    });
  };

 

  function ListaPsicologos() {
    return (
        <View style={{ flex: 1 }}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Escolha seu Psicólogo(a) </Text>
            </Animatable.View>
            <View style={styles.containerPickers}>
            <Picker 
            style={styles.pickerStyle}
            selectedValue={selectedGender}
            onValueChange={
              (itemValor, itemIndex) => 
              setSelectedGender(itemValor)
            }
            >
              <Picker.Item label='Genêro' color='#fff'  value="" />
              <Picker.Item label='👨‍⚕️' value="Masculino" style={styles.pickerText}/>
              <Picker.Item label='Feminino:' value="Feminino" style={styles.pickerText}/>
            </Picker>
            <Picker 
            style={styles.pickerStyle}
            selectedValue={selectedRating}
            onValueChange={
              (itemValor, itemIndex) => 
              setSelectedRating(itemValor)
            }
            >
              <Picker.Item label='Avaliação' color='#fff' value="" />
              <Picker.Item label='⭐⬇' value="Menor"  style={styles.pickerText} />
              <Picker.Item label='⭐⬆' value="Maior" style={styles.pickerText}/>
            </Picker>
            </View>
            <FlatList
                data={filteredPsicologos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        {filteredPsicologos.length === 0 && (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Nenhum psicólogo encontrado com o gênero selecionado.
          </Text>
        )}
        </View>
    );
  }

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Logout') {
              iconName = focused ? 'exit' : 'exit-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#383838",
          tabBarInactiveTintColor: "#383838",
          tabBarStyle: [
            {
              display: "flex"
            },
            null
          ]
        })}
>
        <Tab.Screen name="Home" component={ListaPsicologos} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Tab.Screen 
          name="Logout" 
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              handleLogout();
            }
          }}
          component={EmptyScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,  
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,  
    marginRight: 10,
  },
  cardInfo: {
    flex: 1,
  },
  containerHeader:{
    backgroundColor: '#1c1c1c',
    paddingStart: '5%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  message:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    justifyContent: 'center'
  },
  button:{
    width: '10px',
  },
  pickerComponent:{

    width: 350,
  },
  textSelecionado:{
    fontSize: 12,
    padding: 10,
    fontWeight: 'bold'
  },
  containerPickers: {
    backgroundColor: '#1c1c1c',
    flexDirection: 'row',  
    justifyContent: 'space-between', 
    padding: 10,  
  },
  pickerStyle: {
    flex: 1,  
    margin: 5,  
    fontSize: 12,
    padding: 10,
    fontWeight: 'bold',
    borderWidth: 1,  
    borderColor: '#ccc', 
  },

});
const EmptyScreen = () => null;