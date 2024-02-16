import React, { useState } from 'react'
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import { Product } from '../HomeScreen'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ERROR_COLOR, PRIMARY_COLOR } from '../../../commons/constantsColor';

interface Props{
    product: Product;
    isVisible: boolean;
    changeVisible: ()=>void;
    handlerChangeStockProduct:(idProducto: number, quantity: number)=>void;
}

export const ModalProduct = ({product, isVisible, changeVisible, handlerChangeStockProduct}:Props) => {

    //Hook para tomar el tamaño de la pantalla
    const {width}=useWindowDimensions();
    //Hook para determinar la cantidad del producto
    const [quantity, setQuantity] = useState(1);

    //Función para incremento de la cantidad
    const handlerChangeQuantity=(value: number)=>{
        setQuantity(quantity+value)
    }

    //Función para agregar el producto - actualizar stock
    const handlerAddProduct=()=>{
        handlerChangeStockProduct(product.id, quantity)
        //Cerramos modal
        changeVisible()
    }
    
  return (
    <Modal visible={isVisible} animationType='fade' transparent={true}>
        <View style={styles.root}>
            <View style={{width: width*0.80,
                        ...styles.content}}>
                <View style={styles.header}>          
                    <Text style={styles.title}>{product.name}  -  ${product.price.toFixed(2)}</Text>
                    <View style={styles.iconClose}>
                        <Icon name={'cancel'} size={20} color={PRIMARY_COLOR} onPress={changeVisible}/>
                    </View>
                </View> 
                <View style={styles.image}>
                    <Image
                        source={{
                            uri: product.pathImage
                        }}
                        style={{width:200, height:200}}/>
                </View>  
                {
                    (product.stock == 0)
                    ?<Text style={styles.textStock}>Producto agotado!</Text>
                    :
                    <View>
                        <View style={styles.quantityContainer}>
                        <TouchableOpacity style={styles.buttonQuantity}
                            onPress={()=>handlerChangeQuantity(-1)}
                            disabled={quantity == 1}>
                            <Text style={styles.buttonQuantityText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.textQuantity}>{quantity}</Text>
                        <TouchableOpacity style={styles.buttonQuantity}
                            onPress={()=>handlerChangeQuantity(1)}
                            disabled={quantity == product.stock}>
                            <Text style={styles.buttonQuantityText}>+</Text>
                        </TouchableOpacity>
                        </View>   
                        <View style={styles.containerTotalPrice}>
                            <Text style={styles.textQuantity}>Total: ${(product.price*quantity).toFixed(2)}</Text>
                        </View>
                        <TouchableOpacity style={styles.buttonCar}
                            onPress={handlerAddProduct}>
                            <Text style={styles.buttonCarText}>Agregar Carrito</Text>
                        </TouchableOpacity>
                    </View>
                } 
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
    },
    image:{
        alignItems:'center'
    },
    quantityContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    buttonQuantity:{
        width:50,
        height:50,
        backgroundColor:PRIMARY_COLOR,
        margin:15,
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonQuantityText:{
        color:"#fff",
        fontSize:20,
        fontWeight:'bold'
    },
    textQuantity:{
        fontSize:20,
        color:'#000'
    },
    buttonCar:{
        backgroundColor:PRIMARY_COLOR,
        marginTop:15,
        alignItems:'center',
        paddingVertical:10,
        borderRadius:7
    },
    buttonCarText:{
        color:'#fff',
        fontWeight:'bold'
    },
    containerTotalPrice:{
        alignItems:'center'
    },
    textStock:{
        fontSize:19,
        color:ERROR_COLOR,
        textAlign:'center'
    }
})