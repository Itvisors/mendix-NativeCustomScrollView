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
        const { animateScroll, triggerAttr, scrollToIdAttr, content, ds, dsContent, style } = this.props;
        return (
            <CustomScrollView
                triggerAttr={triggerAttr}
                scrollToIdAttr={scrollToIdAttr}
                animateScroll={animateScroll}
                content={content}
                ds={ds}
                dsContent={dsContent}
                style={style}
            />
        );
    }
}
