const qd = require("qwickDom");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM('<!DOCTYPE html><head></head><body></body></html>');
const { document } = dom.window;

console.log(qd.dom({tagName: "div", innerHTML: "test"}));


