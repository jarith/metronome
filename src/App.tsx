import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native'

const FLEX_FULL = 1
const TITLE_FONT_SIZE = 32

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#800080" />
      <View style={styles.content}>
        <Text style={styles.text}>Hello World</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: FLEX_FULL,
    backgroundColor: '#800080', // Purple background
  },
  content: {
    flex: FLEX_FULL,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: TITLE_FONT_SIZE,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
})

export default App
