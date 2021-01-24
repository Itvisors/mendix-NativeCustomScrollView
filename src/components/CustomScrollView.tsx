import React, { Component, ReactNode, createElement } from "react";
import { DatasourceItem } from "./DatasourceItem";
import { LayoutRectangle, ScrollView } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { CustomStyle } from "../NativeCustomScrollView";
import { EditableValue, ListValue, ObjectItem, ValueStatus } from "mendix";

export interface CustomScrollViewProps {
    triggerAttr: EditableValue<Date>;
    scrollToIdAttr?: EditableValue<string>;
    content: ReactNode;
    ds?: ListValue;
    dsContent?: (item: ObjectItem) => ReactNode;
    style: CustomStyle[];
}

interface MapItem {
    layout: LayoutRectangle;
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
    private itemMap: Map<string, MapItem> = new Map();
    private readonly styles = mergeNativeStyles(defaultStyle, this.props.style);

    constructor(props: CustomScrollViewProps) {
        super(props);

        this.onLayout = this.onLayout.bind(this);
    }

    render(): ReactNode {
        console.info("CustomScrollView.render");
        const { content, triggerAttr } = this.props;
        if (triggerAttr && triggerAttr.status === ValueStatus.Available) {
            if (!this.previousDate || triggerAttr.value?.getTime() !== this.previousDate?.getTime()) {
                console.info("CustomScrollView.render scrollTo");
                this.previousDate = triggerAttr.value;
                setTimeout(() => {
                    const { scrollToIdAttr } = this.props;
                    let scrollToY = 0;
                    if (scrollToIdAttr && scrollToIdAttr.status === ValueStatus.Available && scrollToIdAttr.value) {
                        const itemId = scrollToIdAttr.value;
                        console.info("CustomScrollView scrollTo setTimeout item id " + itemId);
                        const mapItem = this.itemMap.get(scrollToIdAttr.value);
                        if (mapItem) {
                            console.info("CustomScrollView item id " + itemId + " found, y: " + mapItem.layout.y);
                            scrollToY = mapItem.layout.y;
                        } else {
                            console.info("CustomScrollView item id " + itemId + " not found in map");
                        }
                    } else {
                        console.info("CustomScrollView scrollTo setTimeout no item ID");
                    }
                    if (this.scrollViewRef.current) {
                        this.scrollViewRef.current.scrollTo({ x: 0, y: scrollToY, animated: false });
                    }
                }, 0);
            }
        }
        return (
            <ScrollView ref={this.scrollViewRef} style={this.styles.container}>
                {content}
                {this.renderDatasourceItems()}
            </ScrollView>
        );
    }

    renderDatasourceItems(): ReactNode[] {
        const { ds, dsContent } = this.props;

        if (!ds?.items || ds.status !== ValueStatus.Available || !dsContent) {
            return [];
        }

        return ds.items.map(item => (
            <DatasourceItem key={item.id} itemId={item.id} content={dsContent(item)} onLayout={this.onLayout} />
        ));
        // return ds.items.map(item => <View key={item.id}>{dsContent(item)}</View>);
    }

    onLayout(itemId: string, layout: LayoutRectangle): void {
        this.itemMap.set(itemId, { layout });
    }
}
