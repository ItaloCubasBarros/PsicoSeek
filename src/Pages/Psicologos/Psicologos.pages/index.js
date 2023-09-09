import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Linking, TouchableOpacity, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Home, {psicologos} from '../../Home';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';


import { AntDesign } from '@expo/vector-icons'; 

export default function Psicologos_pages() {
    const route = useRoute();
    const psicologo = route.params.psicologo;
    
    // const CommentCard = ({ userImage, userName, comment, }) => <CommentCard
    //     userImage="url_da_imagem"
    //     userName="Nome do Usuário"
    //     comment="Este é um comentário."
        
    // />

    const openInMaps = (latitude, longitude) => {
        const url = `http://maps.google.com/?q=${latitude},${longitude}`;
        Linking.openURL(url);
      }

     

    const navigation = useNavigation();
    return (
        <ScrollView style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader} >
                    <AntDesign name="arrowleft" color="white" size={30} style={styles.icons} />
                    <Text style={styles.message}>Voltar</Text>
                </Animatable.View>
            </TouchableOpacity>
                <Image source={{ uri: psicologo.image }} style={styles.psicologoImage} />
                <Text style={styles.psicologoName}>{psicologo.name}</Text>
                <Text style={styles.psicologoRating}>Avaliação: {psicologo.rating} / 5</Text>
                <Text style={styles.psicologoAtendimentos}>Atendimentos: {psicologo.atendimentos}</Text>
                <Text style={styles.psicologoHorarios}>
                Horários: 7:30, 8:30, 10:30, 15:30, 16:00, 18:30
                </Text>
                
                <TouchableOpacity style={styles.buttonWhats}>
                <Ionicons name="logo-whatsapp" size={34} color="green" />
                
                
            </TouchableOpacity>

            <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Ionicons name="desktop" size={34} color="black" style={styles.icons} />
                <Text style={styles.text}>Atendimento On-line</Text>
            </View>

            <View style={styles.iconContainer}>
                <Ionicons name="people" size={34} color="black" style={styles.icons} />
                <Text style={styles.text}>Atendimento presencial</Text>
            </View>
        </View>

                <View style={styles.separator}></View>


            <Text style={styles.psicologoBio}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <TouchableOpacity style={styles.buttonCurriculo}>
                <Text style={styles.buttonText}>Curriculo</Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>
            <Text style={styles.consultorio}>
                Consultório: 
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Image source={{ uri: 'https://imgs.search.brave.com/bVggFXOuk9Uz6x__RJgvWLVRssSROI43dGl9LPdnzrU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/c2hvcGlmeS5jb20v/cy9maWxlcy8xLzA1/MzMvMjA4OS9maWxl/cy9wbGFjZWhvbGRl/ci1pbWFnZXMtaW1h/Z2VfbGFyZ2UucG5n/P2Zvcm1hdD1qcGcm/cXVhbGl0eT05MCZ2/PTE1MzAxMjkwODE' }} style={styles.imagePlaceholder} />
                <Image source={{ uri: 'https://imgs.search.brave.com/bVggFXOuk9Uz6x__RJgvWLVRssSROI43dGl9LPdnzrU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/c2hvcGlmeS5jb20v/cy9maWxlcy8xLzA1/MzMvMjA4OS9maWxl/cy9wbGFjZWhvbGRl/ci1pbWFnZXMtaW1h/Z2VfbGFyZ2UucG5n/P2Zvcm1hdD1qcGcm/cXVhbGl0eT05MCZ2/PTE1MzAxMjkwODE' }} style={styles.imagePlaceholder} />
                <Image source={{ uri: 'https://imgs.search.brave.com/bVggFXOuk9Uz6x__RJgvWLVRssSROI43dGl9LPdnzrU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/c2hvcGlmeS5jb20v/cy9maWxlcy8xLzA1/MzMvMjA4OS9maWxl/cy9wbGFjZWhvbGRl/ci1pbWFnZXMtaW1h/Z2VfbGFyZ2UucG5n/P2Zvcm1hdD1qcGcm/cXVhbGl0eT05MCZ2/PTE1MzAxMjkwODE' }} style={styles.imagePlaceholder} />
            </View>
            <TouchableOpacity style={styles.buttonMapa} onPress={() => openInMaps(psicologo.location.latitude, psicologo.location.longitude)}>
              <Text style={styles.buttonText}>Ver no mapa</Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>
            
            <Text style={styles.comentarios}>Comentários:</Text>
            <View style={styles.cardContainer}>
                    <View style={styles.commentContainer}>
                        <Image source={{ uri:'https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg' }} style={styles.userImage} />
                        <View style={styles.textContainer}>
                            <Text style={styles.userName}>Usuario</Text>
                            <Text style={styles.comment}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</Text>
                        </View>
                    </View>
        </View>
            <View style={styles.cardContainer}>
                    <View style={styles.commentContainer}>
                        <Image source={{ uri:'https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg' }} style={styles.userImage} />
                        <View style={styles.textContainer}>
                            <Text style={styles.userName}>Usuario2</Text>
                            <Text style={styles.comment}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</Text>
                        </View>
                    </View>
        </View>
            <View style={styles.cardContainer}>
                    <View style={styles.commentContainer}>
                        <Image source={{ uri:'https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg' }} style={styles.userImage} />
                        <View style={styles.textContainer}>
                            <Text style={styles.userName}>Usuario3</Text>
                            <Text style={styles.comment}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</Text>
                        </View>
                    </View>
        </View>

            </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerHeader:{
      flexDirection: 'row',  
      backgroundColor: '#38a69D',
      paddingStart: '5%',
      padding: 20,
      alignItems: 'center'  
    },
    message:{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF'
      },
    icons:{
        marginRight: 10 
    },
    psicologoImage: {
        width: 150,        
        height: 150,
        borderRadius: 75,  
        alignSelf: 'center', 
        marginTop: 20     
    },
    psicologoName:{
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    psicologoRating:{
        fontSize: 19,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    psicologoAtendimentos:{
        fontSize: 19,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    psicologoHorarios:{
        fontSize: 15,
        marginTop: 13,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    psicologoBio:{
        fontSize: 12,
        textAlign: 'center'
    },
    psicologoValor:{
        marginTop: 5,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    consultorio:{
        marginTop: 5,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    comentarios:{
        marginTop: 5,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#a1a1a1',  
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    buttonCurriculo:{
        backgroundColor: '#38a69d',
        width: '70%',
        borderRadius: 4,
        paddingVertical: 5,
        marginTop: 14,
        alignSelf: 'center', 
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonMapa:{
        backgroundColor: '#38a69d',
        width: '70%',
        borderRadius: 4,
        paddingVertical: 5,
        marginTop: 14,
        alignSelf: 'center', 
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonWhats:{
        width: '10%',
        borderRadius: 4,
        paddingVertical: 5,
        marginTop: 14,
        alignSelf: 'center', 
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    imagePlaceholder: {
        width: 100,       
        height: 100,      
        marginHorizontal: 5, 
    },
    iconContainer: {
        alignItems: 'center',
        marginHorizontal: 10,  
    },
    icons: {
        borderRadius: 4,
        paddingVertical: 5,
        marginVertical: 5,
        alignSelf: 'center',
    },
    text: {  
        fontSize: 12,
        marginTop: 5,  
        textAlign: 'center',
    },
    // STYLES PARA COMENTARIOS
    commentContainer: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 5,
        alignItems: 'center',
    },
    cardContainer: {
        flexDirection: 'row',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 5,
        alignItems: 'center',
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    userName: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    comment: {
        marginBottom: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    button: {
        marginHorizontal: 5,
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
});