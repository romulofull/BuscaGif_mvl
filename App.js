import React from 'react';
import { SafeAreaView } from 'react-native';
import BuscaGifs from './BuscaGifs';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BuscaGifs />
    </SafeAreaView>
  );
};

export default App;