import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import FormHeader from './FormHeader'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import Snackbar from 'react-native-snackbar'
import AsyncStorage from '@react-native-async-storage/async-storage';

const IsValidobj = (obj: any) => {
    return Object.values(obj).every((value: any) => value.trim())
}
const Login = () => {
    const navigation = useNavigation<any>();

    const fetchApi = async () => {
        try {
            const res = await axios.post('http://192.168.29.119:3030/auth/sign-in', userInfo)
            console.log('res :', res.data.token);
            if (res.status === 200) {
                Snackbar.show({
                    text: res.data.message,
                    duration: Snackbar.LENGTH_INDEFINITE,
                    action: {
                        text: 'Close',
                        textColor: 'red',
                    },
                });
                await AsyncStorage.setItem('jwtToken', res.data.token);
                navigation.navigate('Home');
            }
        } catch (error: any) {
            console.log('error :', error.message);
        }
    }

    const [userInfo, setuserInfo] = useState({
        email: '',
        password: '',
    })
    const { email, password } = userInfo

    const handleOnChangeText = (value: any, filedName: any) => {
        setuserInfo({ ...userInfo, [filedName]: value })
    };

    const isValidForm = () => {
        if (!IsValidobj(userInfo)) return console.log("Enter Value")

        if (!email.trim()) {
            return console.log("Required")
        };
        if (!password.trim()) {
            return console.log("Required")
        };
        return true
    }
    const LoginUser = () => {
        if (isValidForm()) {
            fetchApi()
            console.log("UserInfo", userInfo);
        }
    }

    return (
        <>
            <ScrollView>
                <View style={{ width: Dimensions.get('window').width, padding: 10 }}>
                    <View style={{ flex: 1, paddingTop: 120 }}>
                        <FormHeader heading="Login" signuporlogin="New here ? Swipe Right to Signup for Free" />
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Email</Text>
                        <TextInput
                            value={email}
                            onChangeText={(value) => handleOnChangeText(value, 'email')}
                            style={{ backgroundColor: "#DAE0E2", color: 'black', fontWeight: 'bold', borderRadius: 5, marginTop: 10, padding: 10 }}
                            placeholder='exmaple123@.com'
                        />
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Password</Text>
                        <TextInput
                            value={password}
                            onChangeText={(value) => handleOnChangeText(value, 'password')}
                            secureTextEntry={true}
                            style={{ backgroundColor: "#DAE0E2", color: 'black', fontWeight: 'bold', borderRadius: 5, marginTop: 10, padding: 10 }}
                            placeholder='********'
                        />
                    </View>
                    <View style={{ margin: 5 }}>
                        <TouchableOpacity style={styles.button}
                            onPress={() => LoginUser()}
                        >
                            <Text style={{ color: 'white', fontSize: 19, fontWeight: 'bold' }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default Login

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 20,
        borderRadius: 20
    },
})