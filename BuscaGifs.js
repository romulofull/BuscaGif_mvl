import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Image, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { REACT_APP_API_KEY } from '@env';
import Modal from 'react-native-modal';

const BuscaGifs = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [gifs, setGifs] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const buscarGifs = async (termino) => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${REACT_APP_API_KEY}&q=${termino}&limit=10`;

    try {
      setCargando(true);
      const respuesta = await axios.get(url);
      setGifs(respuesta.data.data);
    } catch (error) {
      console.error('Error al buscar GIFs:', error);
    } finally {
      setCargando(false);
    }
  };

  const manejarBusqueda = () => {
    if (terminoBusqueda.trim()) {
      buscarGifs(terminoBusqueda);
      setTerminoBusqueda('');
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible); 
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={terminoBusqueda}
        onChangeText={setTerminoBusqueda}
        placeholder="Ingresa una palabra"
      />
      <Button title="Buscar" onPress={manejarBusqueda} />

      <TouchableOpacity onPress={toggleModal} style={styles.aboutButton}>
        <Text style={styles.buttonText}>ACERCA DE</Text>
      </TouchableOpacity>

      {cargando ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={gifs}
          keyExtractor={(gif) => gif.id}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.images.fixed_height.url }}
              style={styles.gif}
              resizeMode="contain"
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>ACERCA DE</Text>
          <Image source={require('./assets/11.png')} style={styles.image} />
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  list: {
    paddingBottom: 20,
  },
  gif: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 5,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
  },
  aboutButton: {
    marginTop: 10, 
    backgroundColor: '#007BFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-end', 
  },
  buttonText: {
    color: 'white',
  },
});

export default BuscaGifs;
