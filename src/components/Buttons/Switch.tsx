import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import UButton from "../UButton/index";

interface IProps {
  label?: string;
  options: [string, string];
}

export default function USwitch({ label, options }: IProps) {
  const [genderState, setGenderState] = useState({ MALE: true, FEMALE: false });

  const handleChangeState = () => {
    setGenderState({ MALE: !genderState.MALE, FEMALE: !genderState.FEMALE });
  };

  return (
    <View style={styles.mainContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.btnsContainer}>
        <SwitchBtn
          active={genderState.MALE}
          title={options[0]}
          onPress={handleChangeState}
        />
        <SwitchBtn
          active={genderState.FEMALE}
          title={options[1]}
          onPress={handleChangeState}
        />
      </View>
    </View>
  );
}

interface IProps {}

interface IToggleBtnProps {
  active: boolean;
  title: string;
  onPress: () => void;
}

const SwitchBtn = ({ active, title, onPress }: IToggleBtnProps) => {
  return (
    <UButton
      title={title}
      style={styles.button}
      backgroundColor={active ? "#56BBBC" : "#F9FAFB"}
      textStyle={active ? styles.activeTest : styles.text}
      onPress={onPress}
      underlayColor={"#56BBBC"}
    />
  );
};

const styles = StyleSheet.create({
  mainContainer: { paddingTop: 12 },
  btnsContainer: { flexDirection: "row" },
  label: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#404F7A",
    paddingVertical: 12
  },
  button: { flex: 1, height: 50, borderColor: "#DEE2E6" },
  text: { color: "#A8B6BF", fontSize: 16 },
  activeTest: { color: "white", fontSize: 16 }
});
