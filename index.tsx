import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
   import React, { useState, useEffect } from 'react';

import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, UIManager, Platform } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {

  UIManager.setLayoutAnimationEnabledExperimental(true);

}

export default function App() {

  const [expression, setExpression] = useState('');

  const [result, setResult] = useState('0');

  const [history, setHistory] = useState([]);

  useEffect(() => {

    loadHistory();

  }, []);


  const handlePress = (value) => {

    LayoutAnimation.easeInEaseOut();

    if (value === 'AC') {

      setExpression('');

      setResult('0');

      return;

    }

    if (value === '⌫') {

      setExpression(prev => prev.slice(0, -1));

      return;

    }


    if (value === '=') {

      calculateResult();

      return;

    }

    setExpression(prev => prev + value);

  };

  const calculateResult = async () => {

    try {

      let exp = expression

        .replace(/sin/g, 'Math.sin')

        .replace(/cos/g, 'Math.cos')

        .replace(/tan/g, 'Math.tan')

        .replace(/log/g, 'Math.log10')

        .replace(/√/g, 'Math.sqrt')

        .replace(/π/g, 'Math.PI')

        .replace(/e/g, 'Math.E');

      const evalResult = eval(exp).toString();

      setResult(evalResult);

      const newHistory = [{ exp: expression, res: evalResult }, ...history].slice(0, 5);

      setHistory(newHistory);

      await AsyncStorage.setItem('history', JSON.stringify(newHistory));

    } catch (error) {

      setResult('Error');

    }

  };

  const loadHistory = async () => {

    try {

      const stored = await AsyncStorage.getItem('history');

      if (stored) setHistory(JSON.parse(stored));

    } catch {}

  };

  const renderButton = (label) => (
<TouchableOpacity style={styles.button} onPress={() => handlePress(label)}>
<Text style={styles.buttonText}>{label}</Text>
</TouchableOpacity>

  );

  return (
<View style={styles.container}>
<View style={styles.display}>
<Text style={styles.expression}>{expression || '0'}</Text>
<Text style={styles.result}>{result}</Text>
</View>

      {/* Top Controls */}
<View style={styles.row}>{['AC','⌫','(',')'].map(renderButton)}</View>

      {/* Scientific Row */}
<View style={styles.row}>{['sin(','cos(','tan(','log('].map(renderButton)}</View>
<View style={styles.row}>{['√(','π','e','^'].map(renderButton)}</View>

      {/* Basic Buttons */}
<View style={styles.row}>{['7','8','9','/'].map(renderButton)}</View>
<View style={styles.row}>{['4','5','6','*'].map(renderButton)}</View>
<View style={styles.row}>{['1','2','3','-'].map(renderButton)}</View>
<View style={styles.row}>{['0','.','=','+'].map(renderButton)}</View>

      {/* History */}
<View style={styles.history}>
<Text style={styles.historyTitle}>Last 5 Calculations</Text>

        {history.map((item, index) => (
<Text key={index} style={styles.historyItem}>

            {item.exp} = {item.res}
</Text>

        ))}
</View>
</View>

  );

}

const styles = StyleSheet.create({

  container: { flex: 1, padding: 20, backgroundColor: '#111' },

  display: { marginBottom: 20 },

  expression: { color: '#aaa', fontSize: 22, textAlign: 'right' },

  result: { color: '#fff', fontSize: 36, textAlign: 'right' },

  row: { flexDirection: 'row', marginBottom: 10 },

  button: {

    flex: 1,

    margin: 4,

    padding: 16,

    backgroundColor: '#333',

    borderRadius: 10,

    alignItems: 'center'

  },

  buttonText: { color: '#fff', fontSize: 16 },

  history: { marginTop: 15 },

  historyTitle: { color: '#fff', fontSize: 16, marginBottom: 5 },

  historyItem: { color: '#aaa', fontSize: 12 }

});
 
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
