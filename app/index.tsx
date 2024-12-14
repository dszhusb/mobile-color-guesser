import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from "react-native";
import type { COLORSET } from '@/component/utilities';
import { createAnswer, getColorFromDate, defaultColorset } from '@/component/utilities';
import Menu from "@/component/Menu"
import Swatch from "@/component/Swatch"
import Controls from '@/component/Controls';

export default function Index() {
  const dateColor = getColorFromDate(new Date())
  const [guessNum, setGuessNum] = useState(0)
  const [answer, setAnswer] = useState<COLORSET>(createAnswer(dateColor))
  const [guess, setGuess] = useState<COLORSET>(defaultColorset)

  return (
    <View style={styles.container}>
      <View style={styles.sticky}>
        <Menu setAnswer={setAnswer} />
        <View style={styles.swatchContainer}>
          <Swatch color={answer} label="target" />
          <Swatch color={guess} label="guess" />
        </View>
      </View>
      <View style={styles.controlsContainer}>
        <Controls guess={guess} setGuess={setGuess} type={"rgb"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sticky: {
    flex: 1,
  },
  controlsContainer: {
    flex: 2,
  },
  swatchContainer: {
    flex: 1,
    flexDirection: 'row'
  }
})