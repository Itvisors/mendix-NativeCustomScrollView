/**
 * This file was generated from NativeCustomScrollView.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, ReactNode } from "react";
import { DynamicValue, EditableValue, ListValue, ListWidgetValue } from "mendix";

export interface NativeCustomScrollViewProps<Style> {
    name: string;
    style: Style[];
    triggerAttr: EditableValue<Date>;
    animateScroll?: DynamicValue<boolean>;
    content?: ReactNode;
    ds?: ListValue;
    dsContent?: ListWidgetValue;
    scrollToIdAttr?: EditableValue<string>;
}

export interface NativeCustomScrollViewPreviewProps {
    class: string;
    style: string;
    triggerAttr: string;
    animateScroll: string;
    content: { widgetCount: number; renderer: ComponentType };
    ds: {} | null;
    dsContent: { widgetCount: number; renderer: ComponentType };
    scrollToIdAttr: string;
}
