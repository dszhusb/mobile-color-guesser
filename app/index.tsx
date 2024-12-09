import React, { useState, CSSProperties } from 'react'
import { Text, View, StyleSheet } from "react-native";
import type { COLOR, RGB, HSL, HWB, Answer } from '../component/utilities';
import { createAnswer, getColorFromDate, randomColor } from '../component/utilities';

export default function Index() {
  const dateColor = getColorFromDate(new Date())
  const [answer, setAnswer] = useState<Answer>(createAnswer(dateColor))
  const swatchColor = {
    backgroundColor: answer.hex
  }

  return (
    <View style={styles.container}>
      <View style={[styles.swatch, swatchColor]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  swatch: {
    width: 100,
    height: 100,
  }
})