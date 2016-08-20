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

import {
    XmlAttribute,
    XmlCharRef,
    XmlEntityRef,
    XmlNode,
    XmlText
} from "../../../lib/main";
import {assert} from "chai";

describe("XmlAttribute", () => {
    describe("#constructor", () => {
        it("should create an XmlAttribute node with the specified name and"
           + " value or values", () => {
            let node = new XmlAttribute("name",
                new XmlText("value"));
            assert.strictEqual(node.toString(),
                               "name='value'");

            node = new XmlAttribute("name", [
                new XmlText("value"),
                new XmlCharRef("a", true),
                new XmlCharRef("b", false),
                new XmlEntityRef("test")
            ]);
            assert.strictEqual(node.toString(),
                               "name='value&#x61;&#98;&test;'");
        });
    });

    describe("#name", () => {
        it("should return this node's name", () => {
            let node = new XmlAttribute("name", new XmlText("value"));
            assert.strictEqual(node.name, "name");
        });

        it("should set this node's name to the specified value", () => {
            let node = new XmlAttribute("name", new XmlText("value"));
            node.name = "name2";
            assert.strictEqual(node.name, "name2");
        });

        it("should throw an error if the specified value is not a"
           + " string", () => {
            let node = new XmlAttribute("name", new XmlText("value"));
            assert.throws((): void => node.name = undefined);
            assert.throws((): void => node.name = null);
            assert.throws((): void => node.name = <any> 0);
            assert.throws((): void => node.name = <any> new XmlText(""));
        });

        it("should throw an error if the specified value contains characters"
           + " not allowed in XML names", () => {
            let node = new XmlAttribute("name", new XmlText("value"));
            assert.throws(() => node.name = ".");
        });
    });

    describe("#charRef", () => {
        it("should add an XmlCharRef node to this node's children at the"
           + " specified index with the specified char and hex"
           + " property and return the newly added node", () => {
            let node = new XmlAttribute("name", new XmlText(""));
            assert.isTrue(node.charRef("a", true) instanceof XmlCharRef);
            assert.isTrue(node.charRef("b", false, 0) instanceof XmlCharRef);
            assert.strictEqual(node.toString(), "name='&#98;&#x61;'");
        });
    });

    describe("#entityRef", () => {
        it("should add an XmlEntityRef node to this node's children at the"
           + " specified index with the specified entity name and return"
           + " the newly added node", () => {
            let node = new XmlAttribute("name", new XmlText(""));
            assert.isTrue(node.entityRef("a") instanceof XmlEntityRef);
            assert.isTrue(node.entityRef("b", 0) instanceof XmlEntityRef);
            assert.strictEqual(node.toString(), "name='&b;&a;'");
        });
    });

    describe("#insertChild", () => {
        it("should throw an error if the specified node is not an"
           + " XmlCharRef, XmlEntityRef, or XmlText node", () => {
            let node = new XmlAttribute("name", new XmlText(""));
            assert.throws(() => node.insertChild(new XmlNode()));
        });

        it("should insert an XmlCharRef, XmlEntityRef, or XmlText node at"
           + " the specified index in this node's children", () => {
            let charRefNode = new XmlCharRef("x");
            let entityRefNode = new XmlEntityRef("y");
            let textNode = new XmlText("z");
            let node = new XmlAttribute("name", new XmlText(""));
            node.insertChild(charRefNode);
            node.insertChild(entityRefNode, 0);
            node.insertChild(textNode, 1);
            assert.strictEqual(node.toString(), "name='&y;z&#120;'");
        });
    });

    describe("#removeChild", () => {
        it("should throw an error if this node only has one child", () => {
            let textNode = new XmlText("");
            let secondTextNode = new XmlText("");
            let node = new XmlAttribute("name", textNode);
            assert.throws(() => node.removeChild(textNode));
            assert.throws(() => node.removeChild(secondTextNode));
        });

        it("should remove the specified node from this node", () => {
            let textNode = new XmlText("");
            let secondTextNode = new XmlText("");
            let node = new XmlAttribute("name", textNode);
            node.insertChild(secondTextNode);
            assert.isTrue(node.removeChild(textNode));
            assert.strictEqual(node.children().length, 1);
            assert.strictEqual(node.children()[0], secondTextNode);
        });
    });

    describe("#removeChildAtIndex", () => {
        it("should throw an error if this node only has one child", () => {
            let textNode = new XmlText("");
            let node = new XmlAttribute("name", textNode);
            assert.throws(() => node.removeChildAtIndex(0));
        });

        it("should remove the node at the specified index from this"
           + " node", () => {
            let textNode = new XmlText("");
            let secondTextNode = new XmlText("");
            let node = new XmlAttribute("name", textNode);
            node.insertChild(secondTextNode);
            assert.strictEqual(node.removeChildAtIndex(0), textNode);
            assert.strictEqual(node.children().length, 1);
            assert.strictEqual(node.children()[0], secondTextNode);
        });
    });

    describe("#text", () => {
        it("should add an XmlText node to this node's children at the"
           + " specified index with the specified text and return the"
           + " newly added node", () => {
            let node = new XmlAttribute("name", new XmlText(""));
            assert.isTrue(node.text("a") instanceof XmlText);
            assert.isTrue(node.text("b", 0) instanceof XmlText);
            assert.strictEqual(node.toString(), "name='ba'");
        });
    });

    describe("#toString(options)", () => {
        it("should return a string containing the XML string representation"
           + " for this node", () => {
            let node = new XmlAttribute("a", new XmlText(""));
            node.insertChild(new XmlText("b"));
            node.insertChild(new XmlEntityRef("c"));
            node.insertChild(new XmlCharRef("d"));
            assert.strictEqual(node.toString(), "a='b&c;&#100;'");
        });

        it("should return a string that uses single or double quotes for"
           + " attribute values depending on the specified options", () => {
            let node = new XmlAttribute("name", new XmlText(""));
            node.insertChild(new XmlText("'hello'"));
            assert.strictEqual(node.toString({doubleQuotes: false}),
                               "name='&apos;hello&apos;'");

            let secondNode = new XmlAttribute("name", new XmlText(""));
            secondNode.insertChild(new XmlText("\"hello\""));
            assert.strictEqual(secondNode.toString({doubleQuotes: true}),
                               "name=\"&quot;hello&quot;\"");
        });
    });
});
