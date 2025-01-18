import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Button, Alert, Modal, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'

const todo = () => {
    const [input, onChangeinput] = useState('');
    const [todo, setTodo] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editInput, setEditInput] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    function addTodo() {
        if (!input.trim()) {
            Alert.alert(
                "Error",
                "Please enter a todo item",
                [{ text: "OK" }]
            );
            return;
        }
        
        const newTodo = {
            id: Date.now().toString(),
            title: input
        }
        setTodo([...todo, newTodo])
        onChangeinput('')
    }

    function deleteTodo(id) {
        console.log(id);
        const index = todo.findIndex(item => item.id === id);
        console.log(index);

        todo.splice(index, 1);
        setTodo([...todo]);
    }

    function editTodo(id) {
        if (!editInput.trim()) {
            Alert.alert(
                "Error",
                "Todo item cannot be empty",
                [{ text: "OK" }]
            );
            return;
        }

        const index = todo.findIndex(item => item.id === id);
        todo[index].title = editInput;
        setTodo([...todo]);
        setModalVisible(false);
        setEditInput('');
        setEditingId(null);
    }

    function handleEditPress(id, title) {
        setEditingId(id);
        setEditInput(title);
        setModalVisible(true);
    }

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <SafeAreaView style={[Styles.safeArea, isDarkMode && Styles.darkSafeArea]}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={Styles.keyboardView}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView 
                    style={[Styles.scrollView, isDarkMode && Styles.darkScrollView]}
                    contentContainerStyle={Styles.scrollViewContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={[Styles.container, isDarkMode && Styles.darkContainer]}>
                        <TouchableOpacity style={Styles.themeButton} onPress={toggleTheme}>
                            <Text style={Styles.buttonText}>{isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</Text>
                        </TouchableOpacity>
                        
                        <TextInput
                            style={[Styles.input, isDarkMode && Styles.darkInput]}
                            onChangeText={onChangeinput}
                            value={input}
                            placeholder='Enter your todo'
                            placeholderTextColor={isDarkMode ? '#888' : '#666'}
                        />
                        
                        <TouchableOpacity style={Styles.button} onPress={addTodo}>
                            <Text style={Styles.buttonText}>Add Todo</Text>
                        </TouchableOpacity>
                        
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <KeyboardAvoidingView 
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                style={Styles.modalContainer}
                            >
                                <View style={Styles.modalView}>
                                    <Text style={Styles.modalTitle}>Edit Todo</Text>
                                    <TextInput
                                        style={Styles.modalInput}
                                        onChangeText={setEditInput}
                                        value={editInput}
                                        placeholder='Edit your todo'
                                    />
                                    <View style={Styles.modalButtonContainer}>
                                        <TouchableOpacity 
                                            style={[Styles.modalButton, Styles.updateButton]}
                                            onPress={() => editTodo(editingId)}
                                        >
                                            <Text style={Styles.buttonText}>Update</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={[Styles.modalButton, Styles.cancelButton]}
                                            onPress={() => setModalVisible(false)}
                                        >
                                            <Text style={Styles.buttonText}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                        </Modal>

                        <FlatList
                            data={todo}
                            scrollEnabled={false}
                            renderItem={({ item, index }) => (
                                <View style={[Styles.item, isDarkMode && Styles.darkItem]}>
                                    <View style={Styles.itemNumber}>
                                        <Text style={Styles.numberText}>{index + 1}</Text>
                                    </View>
                                    <Text style={[Styles.title, isDarkMode && Styles.darkTitle]}>{item.title}</Text>
                                    <View style={Styles.buttonContainer}>
                                        <TouchableOpacity 
                                            style={Styles.deleteButton}
                                            onPress={() => deleteTodo(item.id)}
                                        >
                                            <Text style={Styles.buttonText}>Delete</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={Styles.editButton}
                                            onPress={() => handleEditPress(item.id, item.title)}
                                        >
                                            <Text style={Styles.buttonText}>Edit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default todo;


const Styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    scrollView: {
        flex: 1,
        width: '100%'
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 20
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#3498db',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: 'white',
        marginBottom: 15,
        width: '100%'
    },
    button: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    itemNumber: {
        backgroundColor: '#3498db',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    numberText: {
        color: 'white',
        fontWeight: 'bold'
    },
    title: {
        flex: 1,
        fontSize: 16
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        padding: 8,
        borderRadius: 5,
    },
    editButton: {
        backgroundColor: '#2ecc71',
        padding: 8,
        borderRadius: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2c3e50'
    },
    modalInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#3498db',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: 'white',
        marginBottom: 20,
        width: '100%'
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 10
    },
    modalButton: {
        flex: 1,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    updateButton: {
        backgroundColor: '#2ecc71'
    },
    cancelButton: {
        backgroundColor: '#e74c3c'
    },
    keyboardView: {
        flex: 1,
        width: '100%'
    },
    darkSafeArea: {
        backgroundColor: '#1a1a1a'
    },
    darkScrollView: {
        backgroundColor: '#1a1a1a'
    },
    darkContainer: {
        backgroundColor: '#1a1a1a'
    },
    darkInput: {
        backgroundColor: '#333',
        borderColor: '#666',
        color: '#fff'
    },
    darkItem: {
        backgroundColor: '#333',
        shadowColor: '#000'
    },
    darkTitle: {
        color: '#fff'
    },
    themeButton: {
        backgroundColor: '#9b59b6',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        width: '100%',
        alignItems: 'center'
    }
})