import React, { useState } from 'react'
import { ScrollView, StyleSheet, Button } from "react-native";
import type { COLORSET, RGB } from '@/component/utilities';
import { getRanges, createAnswer } from '@/component/utilities';
import ColorSlider from "@/component/ColorSlider"

interface ControlsProps {
    guess: COLORSET,
    type: string,
    setGuess: (c: COLORSET) => void
}

export default function Controls({ guess, type, setGuess }: ControlsProps) {
    const ranges = getRanges(guess.rgb)
    const [r, setR] = useState((ranges.high - ranges.low) / 2)
    const [g, setG] = useState((ranges.high - ranges.low) / 2)
    const [b, setB] = useState((ranges.high - ranges.low) / 2)
    const submit = (r: number, g: number, b: number) => {
        setGuess(createAnswer({ r: r, g: g, b: b }))
    }
    return (
        <ScrollView style={styles.container}>
            <ColorSlider
                name="red" value={r} setValue={setR} ranges={ranges}
                fill={`rgb(255 ${255 - r} ${255 - r})`}
            />
            <ColorSlider
                name="green" value={g} setValue={setG} ranges={ranges}
                fill={`rgb(${255 - g} 255 ${255 - g})`}
            />
            <ColorSlider
                name="blue" value={b} setValue={setB} ranges={ranges}
                fill={`rgb(${255 - b} ${255 - b} 255)`}
            />
            <Button title="submit" onPress={() => submit(r, g, b)} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        marginHorizontal: 16
    }
})