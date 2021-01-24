/**
 * This file was generated from NativeCustomScrollView.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, ReactNode } from "react";
import { EditableValue, ListValue, ListWidgetValue } from "mendix";

export interface NativeCustomScrollViewProps<Style> {
    name: string;
    style: Style[];
    triggerAttr: EditableValue<Date>;
    scrollToIdAttr?: EditableValue<string>;
    content?: ReactNode;
    ds?: ListValue;
    dsContent?: ListWidgetValue;
}

export interface NativeCustomScrollViewPreviewProps {
    class: string;
    style: string;
    triggerAttr: string;
    scrollToIdAttr: string;
    content: { widgetCount: number; renderer: ComponentType };
    ds: {} | null;
    dsContent: { widgetCount: number; renderer: ComponentType };
}
