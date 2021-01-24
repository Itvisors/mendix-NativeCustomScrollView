import { Component, ReactNode, createElement } from "react";
import { LayoutRectangle, View } from "react-native";

export interface DatasourceItemProps {
    itemId: string;
    content: ReactNode;
    onLayout: (itemId: string, layout: LayoutRectangle) => void;
}

export class DatasourceItem extends Component<DatasourceItemProps> {
    render(): ReactNode {
        // console.info("DatasourceItem.render");
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
