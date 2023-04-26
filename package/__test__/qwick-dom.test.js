
const qwickDom = require('../src/qwick-dom');

it('should create a basic Element', () => {
    const basicElement = qwickDom.create({tagName: "div"});

    expect(basicElement.outerHTML).toMatch("<div></div>");
});


it('should add basic attributes', () => {
    const id = "test_elm";
    const className = "test_class_name";

    const element = qwickDom.create({
        id: id,
        className: className
    });

    expect(element.id).toMatch(id);
    expect(element.className).toMatch(className);
});

it('should create element with a style applied', () => {
    const color = "rgb(255, 0, 0)";
    const element = qwickDom.create({
        styles: { color }
    });

    expect(element.style.color.toLowerCase()).toMatch(color.toLowerCase());
});

it('should create element with multiple styles applied', () => {
    const color = "rgb(255, 0, 0)";
    const fontFamily = "Arial";
    const fontWeight = "bold";
    const element = qwickDom.create({
        styles: { 
            color,
            fontFamily,
            fontWeight
        }
    });

    expect(element.style.color.toLowerCase()).toMatch(color.toLowerCase());
    expect(element.style.fontFamily.toLowerCase()).toMatch(fontFamily.toLowerCase());
    expect(element.style.fontWeight.toLowerCase()).toMatch(fontWeight.toLowerCase());
});

it('should create an element that attaches to another element', () => {
    const element1_id = "element1";
    const element1 = qwickDom.create({
        tagName: "div",
        id: element1_id
    });

    const element2 = qwickDom.create({
        tagName: "div",
        id: "element2",
        parent: element1
    });

    expect(element2.parentNode).toBe(element1);
});

it('should attach children during creation', () => {
    const elm1 = qwickDom.create({
        id: "elm1"
    });
    const elm2 = qwickDom.create({
        id: "elm2"
    });
    const elm3 = qwickDom.create({
        id: "elm3"
    });
    const parentElement = qwickDom.create({
        id: "parent-elm",
        children: [ elm1, elm2, elm3 ],
    });

    expect(parentElement.children.length).toBe(3);
    expect(elm1.parentNode).toBe(parentElement);
    expect(elm2.parentNode).toBe(parentElement);
    expect(elm3.parentNode).toBe(parentElement);
});

it('should recursively create children nodes', () => {
    const body = document.querySelector("body");
    const parentElement = qwickDom.create({
        id: "parent",
        children: [
            { id: "elm1" },
            { id: "elm2" },
            { id: "elm3" },
        ],
        parent: body
    });

    const elm1 = document.getElementById("elm1");
    const elm2 = document.getElementById("elm2");
    const elm3 = document.getElementById("elm3");

    expect(parentElement.children.length).toBe(3);
    expect(elm1.parentNode).toBe(parentElement);
    expect(elm2.parentNode).toBe(parentElement);
    expect(elm3.parentNode).toBe(parentElement);
});
