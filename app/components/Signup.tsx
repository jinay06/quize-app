import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native'
import * as React from 'react';
import FormHeader from './FormHeader'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const IsValidobj = (obj: any) => {
    return Object.values(obj).every((value: any) => value.trim())
}

const Signup = () => {
    const navigation = useNavigation<any>();

    const fetchApi = async () => {
        try {
            const res = await axios.post('http://192.168.29.119:3030/auth/create-user', userInfo)
            console.log('res :', res.data);
            if (res.status === 200) {
            }
            navigation.navigate('Login');
        } catch (error: any) {
            console.log('error :', error.message);
        }
    }


    const [userInfo, setuserInfo] = useState({
        fname: '',
        lname: '',
        email: '',
        mobile: '',
        password: ''
    })
    const { fname, lname, email, mobile, password } = userInfo

    const handleOnChangeText = (value: any, filedName: any) => {
        setuserInfo({ ...userInfo, [filedName]: value })
    };



    const isValidForm = () => {
        if (!IsValidobj(userInfo)) return console.log("Enter Value")

        if (!fname.trim() || fname.length < 2) {
            return console.log("Invalid Name")
        };
        if (!mobile.trim() || mobile.length < 10) {
            return console.log("Invalid Number")
        };
        if (!password.trim() || password.length < 8) {
            return console.log("Invalid Password Must be 8 char long")
        };
        return true
    }

    const CreatUser = () => {

        if (isValidForm()) {
            fetchApi()
            console.log("UserInfo", userInfo);
        }

    };

    return (
        <>
            <ScrollView>
                <View style={{ width: Dimensions.get('window').width, padding: 7 }}>
                    <View style={{ flex: 1, paddingTop: 120 }}>
                        <FormHeader heading="Sign-Up" signuporlogin="Alredy User ? Swipe Left to Login" />
                    </View>
                    <View style={{ padding: 7 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>First-Name</Text>
                        <TextInput
                            value={fname}
                            onChangeText={(value) => handleOnChangeText(value, 'fname')}
                            style={{ backgroundColor: "#DAE0E2", color: 'black', fontWeight: 'bold', borderRadius: 5, marginTop: 7, padding: 7 }}
                            placeholder='john'
                        />
                    </View>
                    <View style={{ padding: 7 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Last-Name</Text>
                        <TextInput
                            value={lname}
                            onChangeText={(value) => handleOnChangeText(value, 'lname')}
                            style={{ backgroundColor: "#DAE0E2", color: 'black', fontWeight: 'bold', borderRadius: 5, marginTop: 7, padding: 7 }}
                            placeholder='Deo'
                        />
                    </View>
                    <View style={{ padding: 7 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Mo:Number</Text>
                        <TextInput
                            value={mobile}
                            onChangeText={(value) => handleOnChangeText(value, 'mobile')}
                            style={{ backgroundColor: "#DAE0E2", color: 'black', fontWeight: 'bold', borderRadius: 5, marginTop: 7, padding: 7 }}
                            placeholder='1234567890'
                        />
                    </View>
                    <View style={{ padding: 7 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Email</Text>
                        <TextInput
                            value={email}
                            onChangeText={(value) => handleOnChangeText(value, 'email')}
                            style={{ backgroundColor: "#DAE0E2", color: 'black', fontWeight: 'bold', borderRadius: 5, marginTop: 7, padding: 7 }}
                            placeholder='exmaple123@.com'
                        />
                    </View>
                    <View style={{ padding: 7 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Password</Text>
                        <TextInput
                            value={password}
                            onChangeText={(value) => handleOnChangeText(value, 'password')}
                            secureTextEntry={true}
                            style={{ backgroundColor: "#DAE0E2", color: 'black', fontWeight: 'bold', borderRadius: 5, marginTop: 7, padding: 7 }}
                            placeholder='********'
                        />
                    </View>
                    <View style={{ margin: 5 }}>
                        <TouchableOpacity style={styles.button}
                            onPress={() => CreatUser()}
                        >
                            <Text style={{ color: 'white', fontSize: 19, fontWeight: 'bold' }}>Create-Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default Signup

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 20,
        borderRadius: 20
    },
})