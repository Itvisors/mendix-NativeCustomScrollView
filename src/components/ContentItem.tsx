import { ReactElement, createElement, ReactNode } from "react";
import { LayoutRectangle, View, ViewStyle } from "react-native";

export interface ContentItemProps {
    itemId: string;
    content: ReactNode;
    style: ViewStyle;
    onLayout: (itemId: string, layout: LayoutRectangle) => void;
}

export function ContentItem(props: ContentItemProps): ReactElement {
    const { content } = props;
    return (
        <View
            onLayout={event => {
                props.onLayout(props.itemId, event.nativeEvent.layout);
            }}
            style={props.style}
        >
            {content}
        </View>
    );
}
