import React, { Component, ReactNode, createElement } from "react";
import { ContentItem } from "./ContentItem";
import { LayoutRectangle, ScrollView } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";
import { ContentTypeEnum, SectionContainerListType } from "../../typings/NativeCustomScrollViewProps";
import { CustomStyle } from "../NativeCustomScrollView";
import { DynamicValue, EditableValue, ListValue, ListWidgetValue, ValueStatus } from "mendix";

type direction = "vertical" | "horizontal";

export interface CustomScrollViewProps {
    contentType: ContentTypeEnum;
    triggerAttr: EditableValue<Date>;
    scrollToIdAttr?: EditableValue<string>;
    animateScroll?: DynamicValue<boolean>;
    basicContent: ReactNode;
    scrollDirection: direction;
    ds?: ListValue;
    dsContent?: ListWidgetValue;
    sectionContainerList: SectionContainerListType[];
    scrollToSectionAttr?: EditableValue<string>;
    style: CustomStyle[];
}

interface MapItem {
    layout: LayoutRectangle;
}

const defaultStyle = function (vertical: direction): CustomStyle {
    return {
        container: {
            flex: 1,
            flexDirection: vertical === "vertical" ? "column" : "row"
        },
        item: {}
    };
};

export class CustomScrollView extends Component<CustomScrollViewProps> {
    private scrollViewRef = React.createRef<ScrollView>();
    private previousDate?: Date = undefined;
    private itemMap: Map<string, MapItem> = new Map();
    private styles: CustomStyle;

    constructor(props: CustomScrollViewProps) {
        super(props);
        this.styles = mergeNativeStyles(defaultStyle(props.scrollDirection), this.props.style);
        // console.log("styles: " + JSON.stringify(this.styles));
        this.onLayout = this.onLayout.bind(this);
    }

    render(): ReactNode {
        const { basicContent, contentType } = this.props;

        this.updateScrollPosition();

        // Render the scrollview with the chosen content type. Basic content is always rendered, may be used as header.
        return (
            <ScrollView
                ref={this.scrollViewRef}
                style={this.styles.container}
                horizontal={this.props.scrollDirection === "horizontal"}
                onContentSizeChange={() => {
                    // console.log("cs layout");
                    this.updateScrollPosition();
                }}
            >
                {basicContent}
                {contentType === "list" ? this.renderDataSourceItems() : null}
                {contentType === "section" ? this.renderSections() : null}
            </ScrollView>
        );
    }

    updateScrollPosition(): void {
        const { triggerAttr } = this.props;
        if (triggerAttr && triggerAttr.status === ValueStatus.Available && this.itemMap.size > 0) {
            if (!this.previousDate || triggerAttr.value?.getTime() !== this.previousDate?.getTime()) {
                this.previousDate = triggerAttr.value;
                setTimeout(() => {
                    let scrollToX = 0;
                    let scrollToY = 0;
                    const itemId = this.getScrollToId();
                    if (itemId) {
                        const mapItem = this.itemMap.get(itemId);
                        if (mapItem) {
                            scrollToX = this.props.scrollDirection === "horizontal" ? mapItem.layout.x : 0;
                            scrollToY = this.props.scrollDirection === "vertical" ? mapItem.layout.y : 0;
                        } else {
                            console.error("CustomScrollView item id " + itemId + " not found in map");
                        }
                    }
                    if (this.scrollViewRef.current) {
                        this.scrollViewRef.current.scrollTo({
                            x: scrollToX,
                            y: scrollToY,
                            animated: !!this.props.animateScroll?.value
                        });
                    }
                }, 0);
            }
        }
    }

    renderDataSourceItems(): ReactNode[] {
        const { ds, dsContent } = this.props;

        if (!ds?.items || ds.status !== ValueStatus.Available || !dsContent) {
            return [];
        }

        return ds.items.map(item => (
            <ContentItem
                key={item.id}
                itemId={item.id}
                content={dsContent.get(item)}
                style={this.styles.item}
                onLayout={this.onLayout}
            />
        ));
    }

    renderSections(): ReactNode[] {
        const { sectionContainerList } = this.props;

        if (!sectionContainerList) {
            return [];
        }

        return sectionContainerList.map((sectionItem, index) => {
            const { sectionContainerID } = sectionItem;
            if (!sectionContainerID || sectionContainerID.status !== ValueStatus.Available) {
                return null;
            }
            if (!sectionContainerID.value) {
                console.error("Native Custom Scroll View: Section with index " + index + " has no section ID.");
                return null;
            }
            // Force into a string.
            const itemId = "" + sectionItem.sectionContainerID.value;
            return (
                <ContentItem
                    key={itemId}
                    itemId={itemId}
                    content={sectionItem.sectionContent}
                    onLayout={this.onLayout}
                    style={this.styles.item}
                />
            );
        });
    }

    getScrollToId(): string | undefined {
        const { contentType } = this.props;

        switch (contentType) {
            case "list":
                return this.props.scrollToIdAttr?.value;

            case "section":
                return this.props.scrollToSectionAttr?.value;

            default:
                return undefined;
        }
    }

    onLayout(itemId: string, layout: LayoutRectangle): void {
        this.itemMap.set(itemId, { layout });
    }
}
