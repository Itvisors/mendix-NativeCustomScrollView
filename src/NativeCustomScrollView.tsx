import { Component, ReactNode, createElement } from "react";
import { ViewStyle } from "react-native";

import { Style } from "@mendix/pluggable-widgets-tools";

import { CustomScrollView } from "./components/CustomScrollView";
import { NativeCustomScrollViewProps } from "../typings/NativeCustomScrollViewProps";

export interface CustomStyle extends Style {
    container: ViewStyle;
    item: ViewStyle;
}

export class NativeCustomScrollView extends Component<NativeCustomScrollViewProps<CustomStyle>> {
    render(): ReactNode {
        return (
            <CustomScrollView
                contentType={this.props.contentType}
                triggerAttr={this.props.triggerAttr}
                scrollToIdAttr={this.props.scrollToIdAttr}
                animateScroll={this.props.animateScroll}
                pullToRefreshAction={this.props.pullToRefreshAction}
                basicContent={this.props.basicContent}
                scrollDirection={this.props.scrollDirection}
                items={this.props.ds?.items}
                dsContent={this.props.dsContent}
                sectionContainerList={this.props.sectionContainerList}
                scrollToSectionAttr={this.props.scrollToSectionAttr}
                style={this.props.style}
                testID={this.props.name}
            />
        );
    }
}
