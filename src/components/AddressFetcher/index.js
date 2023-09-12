import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const AddressFetcher = () => {
  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchAddress = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      Alert.alert("Permission not granted");
      return;
    }

    let locationData = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = locationData.coords;
    let addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });

    if (addressResponse && addressResponse.length > 0) {
      const addressInfo = addressResponse[0];
      const addressText = `${addressInfo.street}, ${addressInfo.region}, ${addressInfo.country}, ${addressInfo.postalCode}`;
      setLocation(addressText);
    } else {
      Alert.alert("Não foi possível localizar sua posição atual!");
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Endereço"
        value={location}
        onChangeText={setLocation}
        
      />
      <Button color="#1c1c1c" title="Localize meu endereço." onPress={fetchAddress} />
    </View>
  );
};



export default AddressFetcher;

