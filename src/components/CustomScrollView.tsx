import React, { Component, ReactNode, createElement } from "react";
import { ScrollView } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { CustomStyle } from "../NativeCustomScrollView";
import { EditableValue, ValueStatus } from "mendix";

export interface CustomScrollViewProps {
    scrollToTopAttr: EditableValue<boolean>;
    content: ReactNode;
    style: CustomStyle[];
}

const defaultStyle: CustomStyle = {
    container: {
        flex: 1,
        flexDirection: "column"
    }
};

export class CustomScrollView extends Component<CustomScrollViewProps> {
    private scrollViewRef = React.createRef<ScrollView>();
    private readonly styles = mergeNativeStyles(defaultStyle, this.props.style);

    render(): ReactNode {
        console.info("CustomScrollView.render");
        const { content, scrollToTopAttr } = this.props;
        if (scrollToTopAttr && scrollToTopAttr.status === ValueStatus.Available && scrollToTopAttr.value) {
            console.info("CustomScrollView.render scrollTo");
            setTimeout(() => {
                if (this.scrollViewRef.current) {
                    this.scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
                }
                scrollToTopAttr.setValue(false);
            }, 0);
        }
        return (
            <ScrollView ref={this.scrollViewRef} style={this.styles.container}>
                {content}
            </ScrollView>
        );
    }
}
