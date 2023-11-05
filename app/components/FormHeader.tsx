import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FormHeader = ({ heading, signuporlogin }: any) => {
    return (
        <>
            <View style={{ justifyContent: "center", alignItems: 'center' }}>
                <Text style={{ fontSize: 40, color: 'black', fontWeight: "bold" }}>{heading}</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: 'center', paddingTop: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>{signuporlogin}</Text>
            </View>
        </>
    )
}

export default FormHeader

const styles = StyleSheet.create({})