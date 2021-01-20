import { Component, ReactNode, createElement } from "react";
import { ViewStyle } from "react-native";

import { Style } from "@mendix/pluggable-widgets-tools";

import { CustomScrollView } from "./components/CustomScrollView";
import { NativeCustomScrollViewProps } from "../typings/NativeCustomScrollViewProps";

export interface CustomStyle extends Style {
    container: ViewStyle;
}

export class NativeCustomScrollView extends Component<NativeCustomScrollViewProps<CustomStyle>> {
    render(): ReactNode {
        const { scrollToTopAttr, content, style } = this.props;
        return <CustomScrollView scrollToTopAttr={scrollToTopAttr} content={content} style={style} />;
    }
}
