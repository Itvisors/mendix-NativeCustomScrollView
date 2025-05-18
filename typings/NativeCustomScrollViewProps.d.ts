/**
 * This file was generated from NativeCustomScrollView.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ListWidgetValue } from "mendix";

export type ContentTypeEnum = "basic" | "list" | "section";

export type ScrollDirectionEnum = "vertical" | "horizontal";

export interface SectionContainerListType {
    sectionContainerID: DynamicValue<string>;
    sectionContent: ReactNode;
}

export interface SectionContainerListPreviewType {
    sectionContainerID: string;
    sectionContent: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
}

export interface NativeCustomScrollViewProps<Style> {
    name: string;
    style: Style[];
    contentType: ContentTypeEnum;
    triggerAttr?: EditableValue<Date>;
    scrollDirection: ScrollDirectionEnum;
    animateScroll?: DynamicValue<boolean>;
    pullToRefreshAction?: ActionValue;
    basicContent?: ReactNode;
    ds?: ListValue;
    dsContent?: ListWidgetValue;
    scrollToIdAttr?: EditableValue<string>;
    sectionContainerList: SectionContainerListType[];
    scrollToSectionAttr?: EditableValue<string>;
}

export interface NativeCustomScrollViewPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    contentType: ContentTypeEnum;
    triggerAttr: string;
    scrollDirection: ScrollDirectionEnum;
    animateScroll: string;
    pullToRefreshAction: {} | null;
    basicContent: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    ds: {} | { caption: string } | { type: string } | null;
    dsContent: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    scrollToIdAttr: string;
    sectionContainerList: SectionContainerListPreviewType[];
    scrollToSectionAttr: string;
}
