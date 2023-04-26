/** 
    Qwick DOM
    Creates and modifies DOM elements.
    Simplifies multiple calls to create, add classes, styles and events.
**/
class qwickDom {
  /** Converts objects to DOM **/
  static create(props, elm) {
    /* Ensures that the target is a valid Element */
    const getElement = (target) => target instanceof Element ? target : qwickDom.create(target);

    /* If there isn't a provided element, create an element */
    elm = elm ? getElement(elm) : document.createElement(props.tagName || "div");

    if (props && elm) {
      for (const attr in props) {
        if (attr === "tagName") continue;
        const value = props[attr];
        const lattr = attr.toLowerCase();
        if (lattr === "parent" || lattr === "parentNode" || lattr === "parentElement") getElement(value)?.appendChild(elm);
        else if (lattr === "styles") for (const prop in value) elm.style[prop] = value[prop];
        else if (lattr === "events") for (const event in value) elm.addEventListener(event, value[event]);
        else if (lattr === "children") value.map(child => elm.appendChild(getElement(child)));
        else if (attr in elm) elm[attr] = value;
        else elm.setAttribute(attr, value);
      }
    }
    return elm;
  }
}

module.exports = qwickDom;
