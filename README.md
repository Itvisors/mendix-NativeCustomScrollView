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
- Whenever you want the widget to scroll, change the trigger date, preferably to `[%CurrentDateTime%]`.

## The trigger date
When using a boolean for scroll to top, the widget needs to turn it off after processing the request. This would trigger another render and another datasource load.
That is why the trigger attribute is added

## Basic usage
Place content in the basic content drop zone of the widget. Everytime the trigger date is updated, the scrollview will scroll to the top.

## List
- Configure the datasource
- Add list content
- Configure the Scroll to item attribute if you want to scroll to a specific item.

### Scrolling to items in the list
Set the GUID of the datasource item you want the widget to scroll into view. The item will be positioned at the top of the visible area, unless there are not enough entries coming after it to fill the visible area. In that case the list will be scrolled to the end.

### Scrolling to items that are not yet visible
If the item is not yet visible, because the object was not yet in the datasource data, you need to allow the widget a little time to render the items before attempting to scroll to one of them. An example is a questionnaire with multiple blocks. If you switch to a different block and want to scroll an item into view, the items of that block need to be rendered first. 
- Change and commit the context object so the datasource will render the new items.
- Use JavaScript action Wait to allow the widget a little time to render. Usually a value of 200 or 300 ms will be sufficient.
- Change and commit the context object:
    - Set the GUID of the item you want to scroll into view
    - Set the trigger date to `[%CurrentDateTime%]`.

## Issues, suggestions and feature requests
[link to GitHub issues](https://github.com/Itvisors/mendix-NativeCustomScrollView/issues)
