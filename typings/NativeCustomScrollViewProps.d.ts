/**
 * This file was generated from NativeCustomScrollView.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, ReactNode } from "react";
import { EditableValue } from "mendix";

export interface NativeCustomScrollViewProps<Style> {
    name: string;
    style: Style[];
    scrollToTopTriggerAttr: EditableValue<Date>;
    content: ReactNode;
}

export interface NativeCustomScrollViewPreviewProps {
    class: string;
    style: string;
    scrollToTopTriggerAttr: string;
    content: { widgetCount: number; renderer: ComponentType };
}
