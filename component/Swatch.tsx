import React from 'react'
import { View, StyleSheet, Text } from "react-native";
import type { COLORSET } from '@/component/utilities';
import { invertedHslHex } from '@/component/utilities';

interface SwatchProps {
    color: COLORSET,
    label: string
}

export default function Swatch({ color, label }: SwatchProps) {
    const inverted = invertedHslHex(color.hsl)
    return (
        <View style={[styles.swatch, { backgroundColor: color.hex }]}>
            <View style={[styles.panel, { backgroundColor: inverted }]}>
                <Text style={[styles.swatchAnnotation, { color: color.hex }]}>{label}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    swatch: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    panel: {
        display: 'flex',
        alignItems: "center",
        width: '100%',
        padding: 10
    },
    swatchAnnotation: {
        textTransform: 'uppercase'
    }
})