## NativeCustomScrollView
Scroll view with option to scroll to top or a datasource item.

## Features
- Single or list content
- For single content scroll to top
- For list content scroll to list item

## Usage
- Widget needs a context object.
- Drop the widget in a dataview
- Configure the trigger date attribute
- For list content, configure the Scroll to item attribute if you want to scroll to a specific item. Set the GUID of the datasource item you want the widget to scroll into view. The item will be positioned at the top of the visible area, unless there are not enough entries coming after it to fill the visible area. In that case the list will be scrolled to the end.
- Whenever you want the widget to scroll, change the trigger date, preferably to `[%CurrentDateTime%]`.

## The trigger date
When using a boolean for scroll to top, the widget needs to turn it off after processing the request. This would trigger another render and another datasource load.
That is why the trigger attribute is added

## Issues, suggestions and feature requests
[link to GitHub issues](https://github.com/Itvisors/mendix-NativeCustomScrollView/issues)
