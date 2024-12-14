import React, { useState } from 'react'
import Slider, { SliderProps } from "@react-native-community/slider"
import { Text, View, StyleSheet, Button } from "react-native";
import type { COLOR, COLORDATA } from '@/component/utilities';
import { getRanges } from '@/component/utilities';

interface ControlsProps {
    name: string
    value: number,
    setValue: (n: number) => void
    fill: string,
    ranges: COLORDATA,
}

export default function ColorSlider({ name, value, setValue, fill, ranges }: ControlsProps) {
    return (
        <View style={styles.outer}>
            <View style={[styles.miniSwatch, { backgroundColor: fill }]} />
            <View style={styles.inner}>
                <Text>{name}: {value}</Text>
                <Slider
                    style={styles.slider}
                    value={value}
                    onValueChange={setValue}
                    minimumValue={ranges.low}
                    maximumValue={ranges.high}
                    step={ranges.step}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    outer: {
        flex: 1,
        gap: 10,
    },
    inner: {
        flex: 1,
    },
    slider: {
        flex: 1
    },
    miniSwatch: {
        width: '100%',
        height: 75
    }
})