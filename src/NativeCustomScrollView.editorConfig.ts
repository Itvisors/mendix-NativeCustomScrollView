import { hidePropertyIn } from "@mendix/pluggable-widgets-tools";
import { NativeCustomScrollViewPreviewProps } from "../typings/NativeCustomScrollViewProps";

export type Platform = "web" | "desktop";

export type Properties = PropertyGroup[];

type PropertyGroup = {
    caption: string;
    propertyGroups?: PropertyGroup[];
    properties?: Property[];
};

type Property = {
    key: string;
    caption: string;
    description?: string;
    objectHeaders?: string[]; // used for customizing object grids
    objects?: ObjectProperties[];
    properties?: Properties[];
};

type ObjectProperties = {
    properties: PropertyGroup[];
    captions?: string[]; // used for customizing object grids
};

export type Problem = {
    property?: string; // key of the property, at which the problem exists
    severity?: "error" | "warning" | "deprecation"; // default = "error"
    message: string; // description of the problem
    studioMessage?: string; // studio-specific message, defaults to message
    url?: string; // link with more information about the problem
    studioUrl?: string; // studio-specific link
};

type BaseProps = {
    type: "Image" | "Container" | "RowLayout" | "Text" | "DropZone" | "Selectable" | "Datasource";
    grow?: number; // optionally sets a growth factor if used in a layout (default = 1)
};

type ImageProps = BaseProps & {
    type: "Image";
    document?: string; // svg image
    data?: string; // base64 image
    property?: object; // widget image property object from Values API
    width?: number; // sets a fixed maximum width
    height?: number; // sets a fixed maximum height
};

type ContainerProps = BaseProps & {
    type: "Container" | "RowLayout";
    children: PreviewProps[]; // any other preview element
    borders?: boolean; // sets borders around the layout to visually group its children
    borderRadius?: number; // integer. Can be used to create rounded borders
    backgroundColor?: string; // HTML color, formatted #RRGGBB
    borderWidth?: number; // sets the border width
    padding?: number; // integer. adds padding around the container
};

type RowLayoutProps = ContainerProps & {
    type: "RowLayout";
    columnSize?: "fixed" | "grow"; // default is fixed
};

type TextProps = BaseProps & {
    type: "Text";
    content: string; // text that should be shown
    fontSize?: number; // sets the font size
    fontColor?: string; // HTML color, formatted #RRGGBB
    bold?: boolean;
    italic?: boolean;
};

type DropZoneProps = BaseProps & {
    type: "DropZone";
    property: object; // widgets property object from Values API
};

type SelectableProps = BaseProps & {
    type: "Selectable";
    object: object; // object property instance from the Value API
    child: PreviewProps; // any type of preview property to visualize the object instance
};

type DatasourceProps = BaseProps & {
    type: "Datasource";
    property: object | null; // datasource property object from Values API
    child?: PreviewProps; // any type of preview property component (optional)
};

export type PreviewProps =
    | ImageProps
    | ContainerProps
    | RowLayoutProps
    | TextProps
    | DropZoneProps
    | SelectableProps
    | DatasourceProps;

export function getProperties(
    _values: NativeCustomScrollViewPreviewProps,
    defaultProperties: Properties /* , target: Platform*/
): Properties {
    // Do the values manipulation here to control the visibility of properties in Studio and Studio Pro conditionally.
    if (_values.scrollDirection === "horizontal") {
        hidePropertyIn(defaultProperties, _values, "pullToRefreshAction");
    }

    return defaultProperties;
}

export function check(values: NativeCustomScrollViewPreviewProps): Problem[] {
    const errors: Problem[] = [];
    // Add errors to the above array to throw errors in Studio and Studio Pro.
    switch (values.contentType) {
        case "list":
            if (!values.ds) {
                errors.push({
                    property: "ds",
                    message: "Specify the datasource for list content"
                });
            }
            if (!values.triggerAttr) {
                errors.push({
                    property: "triggerAttr",
                    message: "Trigger date is required"
                });
            }
            break;

        case "section":
            if (!values.sectionContainerList || values.sectionContainerList.length === 0) {
                errors.push({
                    property: "sectionContainerList",
                    message: "Add at least one section"
                });
            }
            if (!values.triggerAttr) {
                errors.push({
                    property: "triggerAttr",
                    message: "Trigger date is required"
                });
            }
            break;

        default:
            if (!values.basicContent || values.basicContent.widgetCount === 0) {
                errors.push({
                    property: "basicContent",
                    message: "Add content to the basic content drop zone"
                });
            }
            break;
    }
    return errors;
}

// export function getPreview(values: EmptyNativeTsPreviewProps, isDarkMode: boolean): PreviewProps {
//     // Customize your pluggable widget appearance for Studio Pro.
//     return {
//         type: "Container",
//         children: []
//     }
// }

// export function getCustomCaption(values: EmptyNativeTsPreviewProps, platform: Platform): string {
//     return "EmptyNativeTs";
// }
