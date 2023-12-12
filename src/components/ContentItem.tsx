import { ReactElement, createElement, ReactNode } from "react";
import { LayoutRectangle, View, ViewStyle } from "react-native";

export interface ContentItemProps {
    itemId: string;
    itemType: "section" | "item";
    content: ReactNode;
    style: ViewStyle;
    testID: string;
    onLayout: (itemId: string, layout: LayoutRectangle) => void;
}

export function ContentItem(props: ContentItemProps): ReactElement {
    const { content, itemId, itemType, testID } = props;
    return (
        <View
            onLayout={event => {
                props.onLayout(itemId, event.nativeEvent.layout);
            }}
            style={props.style}
            testID={`${testID}$${itemType}$${itemId}`}
        >
            {content}
        </View>
    );
}
