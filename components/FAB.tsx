import React, { memo } from "react";
import {
    Pressable,
    PressableProps,
    StyleSheet,
    Text,
    ViewStyle,
} from "react-native";
import { Colors } from "../constants/theme";
import * as Haptics from 'expo-haptics';

// STALIN DAVID MUELA SANGUCHO

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "+" | "-" | "x" | "÷" | "=" | "C" | "+/-" | "del" | ".";

export interface FABProps extends Omit<PressableProps, "onPress"> {
    digit: Digit;
    onKey: (digit: Digit) => void;
    label?: string;
    size?: number;
    extended?: boolean;
    bg?: string;
    color?: string;
    style?: ViewStyle;
}

const FAB = memo(function FAB({
    digit,
    onKey,
    label,
    size = 64,
    extended = false,
    bg = Colors.darkGray,
    color = Colors.textPrimary,
    style,
    ...rest
}: FABProps) {
    const shape: ViewStyle = extended
        ? { height: size, borderRadius: size / 2, width: size * 2 + 30 }
        : { width: size, height: size, borderRadius: size / 2 };

    return (
        <Pressable
            onPress={() => {
                Haptics.selectionAsync();
                onKey(digit)
            }}
            android_ripple={{ color: "rgba(255,255,255,0.15)", borderless: false }}
            style={[styles.base, shape, { backgroundColor: bg }, style]}
            {...rest}
        >
            <Text
                style={[
                    styles.label,
                    { color, fontSize: Math.min(26, size * 0.4) },
                ]}
            >
                {label ?? digit}
            </Text>
        </Pressable>
    );
});

const styles = StyleSheet.create({
    base: {
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    label: {
        fontWeight: "700",
        fontFamily:"SpaceMono"
    },
});

export default FAB;
