import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Login from './Login'
import Signup from './Signup'

const AppForm = () => {
    return (
        <>
            <ScrollView horizontal pagingEnabled>
                <View style={{ width: Dimensions.get('window').width }}>
                    <Login />
                </View>
                <View style={{ width: Dimensions.get('window').width }}>
                    <Signup />
                </View>
            </ScrollView>
        </>
    )
}

export default AppForm

const styles = StyleSheet.create({})