import { Platform } from "react-native";

export function e2eID(id?: string): any {
    if (Platform.OS === "android") {
        return {
            accessibilityLabel: id,
            accessible: true
        };
    }
    return {
        testID: id
    };
}
