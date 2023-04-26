# qwick-dom
Helper library for creating DOM, adding styles, events and appending children nodes with less code.

## About The Project
I was frustrated with how much code it took to build up DOM structures. You had to create an element with `document.createElement()`. Then you had to attach attributes. If you needed to add styles, you needed to add them individually. The same for events and children nodes.

This tries to simplify things. You can create an element or whole structures of DOM with simple objects. I have exposed existing attributes, "parent", "children", "className" and "tagName". This uses the existing HTMLelement property list as the API. In addition, I added 2 new attributes, "styles" and "events", to simplify adding to these. They take simple objects using their structure as the API.

## Usage
You need to import the library into your script file.

```
const qwickDom = require('../src/qwick-dom');
```

### Creating An Element
You can use this to create an element, by default it will create a div if the 'tagName' is not defined.

**Example:**
```
const elm = qwickDom.create();
```

You can create any valid element that you can create with `document.createElement()`

**Example:**
```
const elm = qwickDom.create({tagName: "span"})
```

Additional attributes can be added. It accepts any valid property for the element.

**Example:**
```
const link = qwickDom.create({
    tagName: "a",
    href: "http://url-to-a-page.com",
    innerHTML: "My link",
    title: "Link to my page",
    target: "_blank"
});
```

### Extending Element
You can use the `create()` method by passing in an existing element as a second argument. This makes building up content easier through the use of the create functions ability to map an object of properties to attach to a DOM element.

**Example:**
```
const div = document.createElement("div");
qwickDom.create({
    id: "my_id",
    innerHTML: "Test div"
}, div);
```

### Adding Styles
A `styles` property takes an object of CSS properties to map the elements `style` attribute. This allows a single statement to apply all of the styles needed. The properties map to the camel-cased JavaScript versions of the propert names, i.e. `font-size` -> `fontSize`.

**Example:**
```
    const elm = qwickDom.create({
        tagName: "div",
        id: "my_id",
        innerHTML: "My test div",
        styles: {
            fontFamily: "Arial",
            fontSize: "12px",
            color: "#444"
        },
    });
```

### Adding Events
An `events` property was added that allows for attaching multiple events from a single object rather than mulitple calls to `Element.addEventListener()`.

**Example:**
```
    const elm = qwickDom.create({
        tagName: "div",
        id: "my_id",
        innerHTML: "My test div",
        events: {
            mouseover: (e) => e.target.innerHTML = "Click me",
            click: (e) => e.target.innerHTML = "I've been clicked!"
        }
    });
```

### Attaching Elements
Elements can be attached during their creation. You can point an element to it's parent element.

**Example:**
```
    const elm1 = document.createElement("div");

    const elm2 = qwickDom.create({
        tagName: "div",
        id: "my_id",
        innerHTML: "My test div",
        parent: elm1
    });
```

In addition to adding an element to a parent node, you can add children elements.

**Example:**
```
    const elm1 = document.createElement("div");
    const elm2 = document.createElement("div");

    const elm3 = qwickDom.create({
        tagName: "div",
        id: "my_id",
        children: [
            elm1,
            elm2
        ]
    });
```

You can create children dynamically, by passing a `qwickDom.create` object to the children rather than references to an element.

**Example:**
```
    const elm = qwickDom.create({
        tagName: "div",
        id: "my_id",
        children: [
            {
                innerHTML: "Div 1 here"
            },
            {
                tagName: "span",
                innerHTML: "Go to page: "
            }
            {
                tagName: "a",
                href: "http://url-to-a-page.com",
                innerHTML: "My link",
            }
        ]
    });
```