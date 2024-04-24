import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import QuoteCard from './components/quoteCard';
import styles from './styles/quoteStyles';

const TEST_LIST = [
  {
      message: "Test Message 1."
  },
  {
      message: "Test Message blabla 2."
  },
  {
      message: "Test Message lololo 3."
  },
  {
      message: "Test Message yayaya 4."
  }
];

export default function App() {
  return (
    <QuoteCard quotes={TEST_LIST}/>
  );
}

