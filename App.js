import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import QuoteCard from './components/quoteCard';
import styles from './styles/quoteStyles';

const TEST_LIST = [
  {
      message: "Test Message 1. Dsafdsafa fdsfsafdsa fdsafsad"
  },
  {
      message: "Test Message blabla 2. fdsfdsfsafa sdfsadf asfdsfsadfsa"
  },
  {
      message: "Test Message lololo 3 sdfdsafdsafasfd s."
  },
  {
      message: "Test Message yayaya 4 dsfdsfsdfdsfs."
  },
  {
      message: "Test Message yayaya 4 dsfdsfsdfdsfs."
  },
  {
      message: "Test Message yayaya 4 dsfdsfsdfdsfs."
  },
  {
      message: "Test Message yayaya 4 dsfdsfsdfdsfs."
  },
  {
      message: "Test Message yayaya 4 dsfdsfsdfdsfs."
  },
  {
      message: "Test Message yayaya 4 dsfdsfsdfdsfs."
  },
  {
      message: "Test Message yayaya 4 dsfdsfsdfdsfs."
  },
  {
      message: "Test Message yayaya 4 dsfdsfsdfdsfs."
  },
  {
      message: "Test Message yayaya 4 dsfdsfsdfdsfs."
  }
];

export default function App() {
  return (
    <QuoteCard quotes={TEST_LIST}/>
  );
}

