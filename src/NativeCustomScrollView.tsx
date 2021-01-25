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
        return (
            <CustomScrollView
                triggerAttr={this.props.triggerAttr}
                scrollToIdAttr={this.props.scrollToIdAttr}
                animateScroll={this.props.animateScroll}
                content={this.props.content}
                ds={this.props.ds}
                dsContent={this.props.dsContent}
                style={this.props.style}
            />
        );
    }
}
