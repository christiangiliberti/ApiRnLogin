
import React, {Component} from 'react';
import { StyleSheet, TextInput, Button, View, Text, FlatList, SafeAreaView, Image} from 'react-native';

const axios = require('axios');

export default class MainScreen extends Component{
    constructor(props){
        super(props);
        this.state ={consulteApi:false, item:[]};
        
    }

    handlerBtn(){
        axios.get("https://breakingbadapi.com/api/characters",{params:{name:this.state.nombre}})
        .then(response=>{
          console.log(response);
         this.setState(() => {return {consulteApi: true, item: response.data}});
        })
        .catch(error=>{
          console.log(error);
        });
        console.log("Click");
      }
    
      handlerText(text){
        //console.log("escribieron" + text);
        this.setState({nombre: text});
      }

    handlerLogout(){
        this.props.onLogout();
    }

    render(){
        const Item = ({ item, onPress, style }) => (
            <>
            <Text>Nombre: {item.name}</Text>
            <Text>Sobrenombre: {item.nickname}</Text>
            <Text>Cumple: {item.birthday}</Text>
            <Text>Estado: {item.status}</Text>
            <Image style={styles.tinyLogo} source={{uri: item.img}}/>
            </>
        );
        const renderItem = ({ item }) => {
          return (
            <Item
              item={item}
            />
          );
        };
      
        return (
            <>
            <View style={styles.container}>

           <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1,width:200 }}
            onChangeText={text => this.handlerText(text)}  
            />
            <Button
              onPress={this.handlerBtn.bind(this)}
              title="Buscar Personaje "
              color="#006400"
              accessibilityLabel="Learn more about this purple button"
            /> 

            </View>
            <SafeAreaView style={styles.container}>
            <FlatList
              data={this.state.item}
              renderItem={renderItem}
              keyExtractor={(item) => item.char_id}
            />
             </SafeAreaView>
             <Text>Te has loggeado correctamente</Text>
                <Button
                    onPress={() => this.handlerLogout()}
                    title="Cerrar sesión"
                />
            </>


            
        );
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: `#f0f8ff`,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tinyLogo: {
      width: 200,
      height: 400,
    },
  });

/*


import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export default class MainScreen extends Component{

    handlerLogout(){
        this.props.onLogout();
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>Te has loggeado correctamente</Text>
                <Button
                    onPress={() => this.handlerLogout()}
                    title="Cerrar sesión"
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
*/