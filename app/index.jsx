import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'



// 
  
  const Home = () => {
  
    function myfunc() {
      alert("hello world")
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>My First React Native App</Text>
        </View>
        <Text>Hello world</Text>
        <TouchableOpacity onPress={myfunc} style={styles.button}>
          <Text style={styles.buttonText}>Hello world</Text>
        </TouchableOpacity>
        <Link href={'/todo'} style={styles.todoButton}>
          <Text style={styles.buttonText}>Todo List</Text>
        </Link>
        {/* <FlatList
          data={DATA}
          renderItem={({ item }) => <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
          </View>}
          keyExtractor={item => item.id}
        /> */}
      </View>
    )
  }
  
  export default Home
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    header: {
      backgroundColor: '#2196F3',
      width: '100%',
      padding: 20,
      paddingTop: 40,
      alignItems: 'center',
      marginBottom: 20,
    },
    headerText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#2196F3',
      padding: 15,
      margin: 20,
      borderRadius: 10,
      width: 200,
      elevation: 3,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    todoButton: {
      alignItems: 'center',
      backgroundColor: '#4CAF50',
      padding: 15,
      margin: 20,
      borderRadius: 10,
      width: 200,
      elevation: 3,
    },
  })