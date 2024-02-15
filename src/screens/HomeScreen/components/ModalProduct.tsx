import React from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import { Product } from '../HomeScreen'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { PRIMARY_COLOR } from '../../../commons/constantsColor';

interface Props{
    product: Product;
    isVisible: boolean;
    changeVisible: ()=>void;
}

export const ModalProduct = ({product, isVisible, changeVisible}:Props) => {
    //Hook para tomar el tamaño de la pantalla
    const {width}=useWindowDimensions();
  return (
    <Modal visible={isVisible} animationType='fade' transparent={true}>
        <View style={styles.root}>
            <View style={{width: width*0.80,
                        ...styles.content}}>
                <View style={styles.header}>          
                    <Text style={styles.title}>{product.name}</Text>
                    <View style={styles.iconClose}>
                        <Icon name={'cancel'} size={20} color={PRIMARY_COLOR} onPress={changeVisible}/>
                    </View>
                </View>       
            </View>
        </View>
    </Modal>
  )
}


const styles=StyleSheet.create({
    root:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.5)',
    },
    content:{
        padding:20,
        backgroundColor:'white',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    header:{
        flexDirection:'row',
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        borderStyle:'solid',
        padding:10
    },
    iconClose:{
        flex:1,
        alignItems:'flex-end'
    },
    title:{
        fontSize:17,
        fontWeight:'bold',
        color:'#000'
    }
})