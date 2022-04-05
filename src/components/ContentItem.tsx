import { ReactElement, createElement, ReactNode } from "react";
import { LayoutRectangle, View } from "react-native";

export interface ContentItemProps {
    itemId: string;
    content: ReactNode;
    onLayout: (itemId: string, layout: LayoutRectangle) => void;
}

export function ContentItem(props: ContentItemProps): ReactElement {
    const { content } = props;
    return (
        <View
            onLayout={event => {
                props.onLayout(props.itemId, event.nativeEvent.layout);
            }}
        >
            {content}
        </View>
    );
}
