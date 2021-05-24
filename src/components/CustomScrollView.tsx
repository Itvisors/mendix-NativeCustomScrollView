import React, { Component, ReactNode, createElement } from "react";
import { ContentItem } from "./ContentItem";
import { LayoutRectangle, ScrollView } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";
import { ContentTypeEnum, SectionContainerListType } from "../../typings/NativeCustomScrollViewProps";
import { CustomStyle } from "../NativeCustomScrollView";
import { DynamicValue, EditableValue, ListValue, ListWidgetValue, ValueStatus } from "mendix";

export interface CustomScrollViewProps {
    contentType: ContentTypeEnum;
    triggerAttr: EditableValue<Date>;
    scrollToIdAttr?: EditableValue<string>;
    animateScroll?: DynamicValue<boolean>;
    basicContent: ReactNode;
    ds?: ListValue;
    dsContent?: ListWidgetValue;
    sectionContainerList: SectionContainerListType[];
    scrollToSectionAttr?: EditableValue<string>;
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
        const { basicContent, contentType, ds, sectionContainerList } = this.props;
        switch (contentType) {
            case "list":
                if (!ds) {
                    console.error("Native Custom Scroll View: Specify the datasource for list content");
                    return null;
                }
                break;

            case "section":
                if (!sectionContainerList || sectionContainerList.length === 0) {
                    console.error("Native Custom Scroll View: Add at least one section.");
                    return null;
                }
                break;

            default:
                if (!basicContent) {
                    console.error("Native Custom Scroll View: Add content to the basic content drop zone");
                    return null;
                }
                break;
        }

        const { triggerAttr } = this.props;
        if (triggerAttr && triggerAttr.status === ValueStatus.Available) {
            if (!this.previousDate || triggerAttr.value?.getTime() !== this.previousDate?.getTime()) {
                this.previousDate = triggerAttr.value;
                setTimeout(() => {
                    let scrollToY = 0;
                    const itemId = this.getScrollToId();
                    if (itemId) {
                        const mapItem = this.itemMap.get(itemId);
                        if (mapItem) {
                            scrollToY = mapItem.layout.y;
                        } else {
                            console.error("CustomScrollView item id " + itemId + " not found in map");
                        }
                    }
                    if (this.scrollViewRef.current) {
                        this.scrollViewRef.current.scrollTo({
                            x: 0,
                            y: scrollToY,
                            animated: !!this.props.animateScroll?.value
                        });
                    }
                }, 0);
            }
        }

        // Render the scrollview with the chosen content type. Basic content is always rendered, may be used as header.
        return (
            <ScrollView ref={this.scrollViewRef} style={this.styles.container}>
                {basicContent}
                {contentType === "list" ? this.renderDatasourceItems() : null}
                {contentType === "section" ? this.renderSections() : null}
            </ScrollView>
        );
    }

    renderDatasourceItems(): ReactNode[] {
        const { ds, dsContent } = this.props;

        if (!ds?.items || ds.status !== ValueStatus.Available || !dsContent) {
            return [];
        }

        return ds.items.map(item => (
            <ContentItem key={item.id} itemId={item.id} content={dsContent.get(item)} onLayout={this.onLayout} />
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
