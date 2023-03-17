/** 
    Quick DOM
    Creates and modifies DOM elements.
    Simplifies multiple calls to create, add classes, styles and events.
**/
class qwickDom {
  /** Converts objects to DOM **/
  static dom(d, elm) {
    const _d = document;
    const te = (s) => s instanceof Element ? s : _d.querySelector(s);
    const t = elm ? te(elm) : _d.createElement(d.tagName ? d.tagName : typeof d === "string" ? d : "div");
    if (d && t) {
        for (const a in d) {
            if (a === "tagName") continue;
            else if (a === "parent") te(d[a]).appendChild(t);
            else if (a === "styles") for (const p in d[a]) t.style[p] = d[a][p];
            else if (a === "events") for (const e in d[a]) t.addEventListener(e, d[a][e]);
            else if (a === "children") d[a].map(e => { return e && e instanceof Element ? e : this.dom(e)})
              .filter(c => c && c instanceof Element)
              .forEach(c => t.appendChild(c));
            else if (a in t) t[a] = d[a];
            else t.setAttribute(a, d[a]);
        }
    }
    return t;
  }
}

module.exports = qwickDom;