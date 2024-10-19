import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Image, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { REACT_APP_API_KEY } from '@env';

const BuscaGifs = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [gifs, setGifs] = useState([]);
  const [cargando, setCargando] = useState(false);

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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={terminoBusqueda}
        onChangeText={setTerminoBusqueda}
        placeholder="Ingresa una palabra"
      />
      <Button title="Buscar" onPress={manejarBusqueda} />

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
});

export default BuscaGifs;
