import React, { Component, ReactNode, createElement } from "react";
import { ScrollView } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { CustomStyle } from "../NativeCustomScrollView";
import { EditableValue, ValueStatus } from "mendix";

export interface CustomScrollViewProps {
    scrollToTopTriggerAttr: EditableValue<any>;
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
    private previousDate?: Date = undefined;
    private readonly styles = mergeNativeStyles(defaultStyle, this.props.style);

    render(): ReactNode {
        console.info("CustomScrollView.render");
        const { content, scrollToTopTriggerAttr } = this.props;
        if (scrollToTopTriggerAttr && scrollToTopTriggerAttr.status === ValueStatus.Available) {
            if (!this.previousDate || scrollToTopTriggerAttr.value?.getTime() !== this.previousDate?.getTime()) {
                console.info("CustomScrollView.render scrollTo");
                this.previousDate = scrollToTopTriggerAttr.value;
                setTimeout(() => {
                    if (this.scrollViewRef.current) {
                        this.scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
                    }
                }, 0);
            }
        }
        return (
            <ScrollView ref={this.scrollViewRef} style={this.styles.container}>
                {content}
            </ScrollView>
        );
    }
}
