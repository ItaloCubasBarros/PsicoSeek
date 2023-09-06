import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Linking, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Home, {psicologos} from '../../Home';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons'; 

export default function Psicologos_pages() {
    
    const psicologo = route.params?.psicologo;


    const navigation = useNavigation();
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader} >
                    <AntDesign name="arrowleft" color="white" size={30} style={styles.icons} />
                    <Text style={styles.message}>Voltar</Text>
                </Animatable.View>
            </TouchableOpacity>
            <Text>{psicologo?.name}</Text>

            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      paddingHorizontal: 10,
      backgroundColor: '#f5f5f5',
    },
    containerHeader:{
      flexDirection: 'row',  // Alinhe os itens horizontalmente
      backgroundColor: '#38a69D',
      paddingStart: '5%',
      padding: 20,
      alignItems: 'center'  // Alinhe verticalmente no meio
    },
    message:{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF'
      },
    icons:{
        marginRight: 10  // Espaço entre o ícone e o texto
    }
});