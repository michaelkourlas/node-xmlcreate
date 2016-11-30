/**
 * Copyright (C) 2016 Michael Kourlas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var xmlcreate = require("../lib/main");

/**
 * The following example demonstrates the standard usage of xmlcreate.
 */
var example1 = function() {
    var document = xmlcreate.document("html");
    document
        .decl({encoding: "UTF-8"})
        .up()
        .dtd("html", "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd",
             "-//W3C//DTD XHTML 1.0 Strict//EN")
        .up()
        .root()
        .attribute("xmlns", "http://www.w3.org/1999/xhtml")
        .up()
        .attribute("xml:lang", "en")
        .up()
        .attribute("lang", "en")
        .up()
        .element("head")
        .element("title")
        .charData("My page title")
        .up()
        .up()
        .up()
        .element("body")
        .element("h1")
        .charData("Welcome!")
        .up()
        .up()
        .element("p")
        .charData("This is some text on my website.")
        .up()
        .up()
        .element("div")
        .element("img")
        .attribute("src", "picture.png")
        .up()
        .attribute("alt", "picture");

    console.log(document.toString({doubleQuotes: true}));
    console.log();
};
example1();

/**
 * The following example demonstrates the usage of an alternate xmlcreate API.
 * The code for this example and the previous example generate identical XML.
 */
var example2 = function() {
    var document = new xmlcreate.XmlDocument("html");
    document.insertChild(new xmlcreate.XmlDecl({encoding: "UTF-8"}), 0);
    document.insertChild(new xmlcreate.XmlDtd("html",
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd",
        "-//W3C//DTD XHTML 1.0 Strict//EN"), 1);

    var root = document.root();
    root.insertChild(new xmlcreate.XmlAttribute("xmlns",
        new xmlcreate.XmlAttributeText("http://www.w3.org/1999/xhtml")));
    root.insertChild(new xmlcreate.XmlAttribute("xml:lang",
        new xmlcreate.XmlAttributeText("en")));
    root.insertChild(new xmlcreate.XmlAttribute("lang",
        new xmlcreate.XmlAttributeText("en")));

    var headElement = new xmlcreate.XmlElement("head");
    root.insertChild(headElement);

    var titleElement = new xmlcreate.XmlElement("title");
    headElement.insertChild(titleElement);
    titleElement.insertChild(new xmlcreate.XmlCharData("My page title"));

    var bodyElement = new xmlcreate.XmlElement("body");
    root.insertChild(bodyElement);

    var headingElement = new xmlcreate.XmlElement("h1");
    bodyElement.insertChild(headingElement);
    headingElement.insertChild(new xmlcreate.XmlCharData("Welcome!"));

    var paragraphElement = new xmlcreate.XmlElement("p");
    bodyElement.insertChild(paragraphElement);
    paragraphElement.insertChild(new xmlcreate.XmlCharData(
        "This is some text on my website."));

    var divElement = new xmlcreate.XmlElement("div");
    bodyElement.insertChild(divElement);

    var imageElement = new xmlcreate.XmlElement("img");
    divElement.insertChild(imageElement);
    imageElement.insertChild(new xmlcreate.XmlAttribute("src",
        new xmlcreate.XmlAttributeText("picture.png")));
    imageElement.insertChild(new xmlcreate.XmlAttribute("alt",
        new xmlcreate.XmlAttributeText("picture")));

    console.log(document.toString({doubleQuotes: true}));
    console.log();
};
example2();
