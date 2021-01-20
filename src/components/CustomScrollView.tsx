import { Component, ReactNode, createElement } from "react";
import { ScrollView } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { CustomStyle } from "../NativeCustomScrollView";
import { EditableValue } from "mendix";

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
    private readonly styles = mergeNativeStyles(defaultStyle, this.props.style);

    render(): ReactNode {
        return <ScrollView style={this.styles.container}>{this.props.content}</ScrollView>;
    }
}
