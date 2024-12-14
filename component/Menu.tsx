import React from 'react'
import { View, StyleSheet, Button } from "react-native";
import { createAnswer, getColorFromDate, randomColor } from '../component/utilities';
import { COLORSET } from '../component/utilities';

interface MenuProps {
    setAnswer: (c: COLORSET) => void
}

export default function Menu({ setAnswer }: MenuProps) {
    return (
        <View style={styles.container}>
            <Button onPress={() => setAnswer(createAnswer(getColorFromDate(new Date())))} title="Daily" />
            <Button onPress={() => setAnswer(createAnswer(randomColor()))} title="Randomize" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-between"
    },
})