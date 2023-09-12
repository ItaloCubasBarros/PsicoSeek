import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { useNavigation, useRoute } from '@react-navigation/native';

export default function InfoUser() {
    const route = useRoute()
    const navigation = useNavigation();
    const [birthDate, setBirthDate] = useState('');
    const [choice, setChoice] = useState(null);
    const [gender, setGender] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    

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
    
        try {
            await AsyncStorage.setItem('@asyncStorage:birthDate', birthDate);
            await AsyncStorage.setItem('@asyncStorage:gender', gender);
            await AsyncStorage.setItem('@asyncStorage:choice', choice);
    
            if(choice === 'Psicólogo') {
                navigation.navigate('Psicologos_cadastro');
            } else {
                navigation.navigate('SignIn'); 
            }
            
        } catch (error) {
            Alert.alert("Erro ao adicionar informações.");
        }   
    };

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Image 
                    source={require('../../assets/psicoguia.jpg')}
                    style={styles.logo}
                    resizeMode='contain'
                />
                <Text style={styles.message}>Adicione algumas informações.</Text>
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

                    <TouchableOpacity
                        style={[choiceButtonStyle(gender, 'Outro'), { marginRight: 0 }]}
                        onPress={() => setGender('Outro')}
                    >
                        <Text style={choiceButtonTextStyle(gender, 'Outro')}>Outro</Text>
                    </TouchableOpacity>
                </View>

                {/* Paciente ou cliente */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <TouchableOpacity
                        style={choice === 'Psicólogo' ? styles.choiceButtonRoleSelected : styles.choiceButtonRole}
                        onPress={() => setChoice('Psicólogo')}
                    >
                        <Text style={choiceButtonTextStyle(choice, 'Psicólogo')}>Psicólogo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[choice === 'Paciente' ? styles.choiceButtonRoleSelected : styles.choiceButtonRole, { marginRight: 0 }]}
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
        color: '#ea900f'
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
    choiceButton: {
        width: '29.33%',  
        padding: 10,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        marginRight: 4,
    },
    choiceButtonSelected: {
        width: '29.33%',  
        padding: 10,
        backgroundColor: '#1c1c1c',
        borderRadius: 5,
        marginRight: 4,
    },
    choiceButtonText: {
        textAlign: 'center',
        color: 'black',
    },
    choiceButtonTextSelected: {
        textAlign: 'center',
        color: 'white',
    },
    choiceButtonRole: {
        width: '49%', 
        padding: 10,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        marginRight: 2, 
    },
    choiceButtonRoleSelected: {
        width: '49%', 
        padding: 10,
        backgroundColor: '#1c1c1c',
        borderRadius: 5,
        marginRight: 2, 
    },
    buttonText:{
        color:'#FFF',
        fontSize: 20,
    }
})

