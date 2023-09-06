import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Linking, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Profile from '../Profile';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import Psicologos_pages from '../Psicologos/Psicologos.pages';

const Tab = createBottomTabNavigator();

export default function Home() {

  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState(null);

  
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
    { id: '1', name: 'Dr. João Lucas', gender: 'Masculino', image: 'https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg', rating: 5, location: { latitude: -15.610126247519439, longitude: -56.07270112293936 } },
    { id: '2', name: 'Dra. Ana Alice', gender: 'Feminino', image: 'https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg', rating: 4, location: { latitude: -15.610126247519439, longitude: -56.07270112293936 } },
    { id: '3', name: 'Dr. Gabriel Antonio', gender: 'Masculino', image: 'https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg', rating: 1, location: { latitude: -15.610126247519439, longitude: -56.07270112293936 } },
    { id: '4', name: 'Dra. Carla Ferreira', gender: 'Feminino', image: 'https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg', rating: 3, location: { latitude: -15.610126247519439, longitude: -56.07270112293936 } },
    { id: '5', name: 'Dr. Carlos Andrade', gender: 'Masculino', image: 'https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg', rating: 4, location: { latitude: -15.610126247519439, longitude: -56.07270112293936 } },
    { id: '6', name: 'Dr. Wellington Silva', gender: 'Masculino', image: 'https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg', rating: 5, location: { latitude: -15.610126247519439, longitude: -56.07270112293936 } },
    { id: '7', name: 'Dr. Lucas Matos', gender: 'Masculino', image: 'https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',   rating: 2, location: { latitude: -15.610126247519439, longitude: -56.07270112293936 } },
    { id: '8', name: 'Dr. Matias Guedes', gender: 'Masculino', image: 'https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg', rating: 1 , location: { latitude: -15.610126247519439, longitude: -56.07270112293936 } },
  ];

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
      <TouchableOpacity onPress={ () => navigation.navigate('Psicologos_pages')}>
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
                <Text style={styles.message}>Escolha seu Psicologo(a) </Text>
            </Animatable.View>
            <FlatList
                data={psicologos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
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
      })}
      tabBarOptions={{
        activeTintColor: '#383838',
        inactiveTintColor: '#383838'
      }}>
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
    backgroundColor: '#38a69D',
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
  }
  

});
const EmptyScreen = () => null;