import { ReactElement, createElement, ReactNode } from "react";
import { LayoutRectangle, View } from "react-native";
import { e2eID } from "./utils";

export interface ContentItemProps {
    type: "section" | "item";
    itemId: string;
    content: ReactNode;
    onLayout: (itemId: string, layout: LayoutRectangle) => void;
}

export function ContentItem(props: ContentItemProps): ReactElement {
    const { content, type } = props;
    return (
        <View
            {...e2eID(`nativeCustomScrollView$${type}$${props.itemId}`)}
            onLayout={event => {
                props.onLayout(props.itemId, event.nativeEvent.layout);
            }}
        >
            {content}
        </View>
    );
}
