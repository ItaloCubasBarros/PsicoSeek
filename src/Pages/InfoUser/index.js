import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';   
import { useNavigation, useRoute } from '@react-navigation/native';

export default function InfoUser() {
    const route = useRoute();
    const { userName, userEmail } = route.params;
    const navigation = useNavigation();
    const [birthDate, setBirthDate] = useState('');
    const [choice, setChoice] = useState(null);
    const [gender, setGender] = useState('')

    const choiceButtonStyle = (selection, option) => {
        return selection === option ? styles.choiceButtonSelected : styles.choiceButton;
    }

    const choiceButtonTextStyle = (selection, option) => {
        return selection === option ? styles.choiceButtonTextSelected : styles.choiceButtonText;
    }

    const calcularIdade = (dob) => {
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

    const handleBirthDateChange = (text) => {
        let newText = text.replace(/[^0-9]/g, ''); 

        if (newText.length <= 2) {
            setBirthDate(newText);
            return;
        }

        if (newText.length <= 4) {
            setBirthDate(`${newText.slice(0, 2)}/${newText.slice(2)}`);
            return;
        }

        if (newText.length <= 8) {
            setBirthDate(`${newText.slice(0, 2)}/${newText.slice(2, 4)}/${newText.slice(4, 8)}`);
        }
    };

    const handleContinue = async () => {
        if (!birthDate.trim()) {
            Alert.alert("Por favor, insira sua data de nascimento.");
            return;
        }

        const age = calcularIdade(birthDate);

        try {
            const additionalInfo = JSON.stringify({ birthDate, age, choice });
            await AsyncStorage.setItem('user_info_key', additionalInfo);
            Alert.alert("Informações adicionadas com sucesso!");
            navigation.navigate('Home');  
        } catch (error) {
            Alert.alert("Erro ao adicionar informações.");
        }
    };

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Adicione algumas informações. </Text>
                <Image 
                    source={require('../../assets/logo.png')}
                    style={styles.logo}
                    resizeMode='contain'
                />
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Data de Aniversário</Text>
                <TextInput 
                    placeholder='DD/MM/AAAA'
                    style={styles.input}
                    onChangeText={handleBirthDateChange}
                    value={birthDate}
                    maxLength={10}
                />
                
                {/* Escolhendo genero  */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <TouchableOpacity
                        style={choiceButtonStyle(gender, 'Masculino')}
                        onPress={() => setGender('Masculino')}
                    >
                        <Text style={choiceButtonTextStyle(gender, 'Masculino')}>Masculino</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={choiceButtonStyle(gender, 'Feminino')}
                        onPress={() => setGender('Feminino')}
                    >
                        <Text style={choiceButtonTextStyle(gender, 'Feminino')}>Feminino</Text>
                    </TouchableOpacity>
                </View>

                {/* Paciente ou cliente */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <TouchableOpacity
                        style={choiceButtonStyle(choice, 'Psicólogo')}
                        onPress={() => setChoice('Psicólogo')}
                    >
                        <Text style={choiceButtonTextStyle(choice, 'Psicólogo')}>Psicólogo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={choiceButtonStyle(choice, 'Paciente')}
                        onPress={() => setChoice('Paciente')}
                    >
                        <Text style={choiceButtonTextStyle(choice, 'Paciente')}>Paciente</Text>
                    </TouchableOpacity>
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
        backgroundColor: '#38a69d',
    },
    logo: {
        width: 45,    
        height: 45,
        marginLeft: '85%',
        marginBottom: '10%',
        position: 'absolute'
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message: {
        fontSize: 28,
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
        backgroundColor: '#38a69d',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    choiceButton: {
        flex: 0.48,
        padding: 10,
        backgroundColor: '#E0E0E0', // Uma cor mais clara para o botão não selecionado
        borderRadius: 5,
    },
    choiceButtonSelected: {
        flex: 0.48,
        padding: 10,
        backgroundColor: '#38a69d', // Uma cor mais escura para o botão selecionado
        borderRadius: 5,
    },
    choiceButtonText: {
        textAlign: 'center',
        color: 'black',
    },
    choiceButtonTextSelected: {
        textAlign: 'center',
        color: 'white',
    },
    buttonText:{
        color:'#FFF',
        fontSize: 20,
    }
})

