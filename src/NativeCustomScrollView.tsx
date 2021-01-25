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
                contentType={this.props.contentType}
                triggerAttr={this.props.triggerAttr}
                scrollToIdAttr={this.props.scrollToIdAttr}
                animateScroll={this.props.animateScroll}
                basicContent={this.props.basicContent}
                ds={this.props.ds}
                dsContent={this.props.dsContent}
                sectionContainerList={this.props.sectionContainerList}
                scrollToSectionAttr={this.props.scrollToSectionAttr}
                style={this.props.style}
            />
        );
    }
}
