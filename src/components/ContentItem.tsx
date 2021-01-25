import { Component, ReactNode, createElement } from "react";
import { LayoutRectangle, View } from "react-native";

export interface ContentItemProps {
    itemId: string;
    content: ReactNode;
    onLayout: (itemId: string, layout: LayoutRectangle) => void;
}

export class ContentItem extends Component<ContentItemProps> {
    render(): ReactNode {
        const { content } = this.props;
        return (
            <View
                onLayout={event => {
                    this.props.onLayout(this.props.itemId, event.nativeEvent.layout);
                }}
            >
                {content}
            </View>
        );
    }
}
