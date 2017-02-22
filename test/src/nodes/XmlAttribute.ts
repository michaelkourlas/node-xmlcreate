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
import {assert} from "chai";
import {
    XmlAttribute,
    XmlAttributeText,
    XmlCharRef,
    XmlEntityRef,
    XmlNode
} from "../../../lib/main";

describe("XmlAttribute", () => {
    describe("#constructor", () => {
        it("should create an XmlAttribute node with the specified name and"
           + " value or values", () => {
            let node = new XmlAttribute("name",
                new XmlAttributeText("value"));
            assert.strictEqual(node.toString(),
                               "name='value'");

            node = new XmlAttribute("name", [
                new XmlAttributeText("value"),
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
            const node = new XmlAttribute("name",
                new XmlAttributeText("value"));
            assert.strictEqual(node.name, "name");
        });

        it("should set this node's name to the specified value", () => {
            const node = new XmlAttribute("name",
                new XmlAttributeText("value"));
            node.name = "name2";
            assert.strictEqual(node.name, "name2");
        });

        it("should throw an error if the specified value is not a"
           + " string", () => {
            const node = new XmlAttribute("name",
                new XmlAttributeText("value"));
            assert.throws((): void => node.name = undefined as any);
            assert.throws((): void => node.name = null as any);
            assert.throws((): void => node.name = 0 as any);
            assert.throws((): void => node.name =
                new XmlAttributeText("") as any);
        });

        it("should throw an error if the specified value contains characters"
           + " not allowed in XML names", () => {
            const node = new XmlAttribute("name",
                new XmlAttributeText("value"));
            assert.throws(() => node.name = ".");
        });
    });

    describe("#charRef", () => {
        it("should add an XmlCharRef node to this node's children at the"
           + " specified index with the specified char and hex"
           + " property and return the newly added node", () => {
            const node = new XmlAttribute("name", new XmlAttributeText(""));
            assert.isTrue(node.charRef("a", true) instanceof XmlCharRef);
            assert.isTrue(node.charRef("b", false, 0) instanceof XmlCharRef);
            assert.strictEqual(node.toString(), "name='&#98;&#x61;'");
        });
    });

    describe("#entityRef", () => {
        it("should add an XmlEntityRef node to this node's children at the"
           + " specified index with the specified entity name and return"
           + " the newly added node", () => {
            const node = new XmlAttribute("name", new XmlAttributeText(""));
            assert.isTrue(node.entityRef("a") instanceof XmlEntityRef);
            assert.isTrue(node.entityRef("b", 0) instanceof XmlEntityRef);
            assert.strictEqual(node.toString(), "name='&b;&a;'");
        });
    });

    describe("#insertChild", () => {
        it("should throw an error if the specified node is not an"
           + " XmlCharRef, XmlEntityRef, or XmlAttributeText node", () => {
            const node = new XmlAttribute("name", new XmlAttributeText(""));
            assert.throws(() => node.insertChild(new XmlNode()));
        });

        it("should insert an XmlCharRef, XmlEntityRef, or XmlAttributeText"
           + " node at the specified index in this node's children", () => {
            const charRefNode = new XmlCharRef("x");
            const entityRefNode = new XmlEntityRef("y");
            const textNode = new XmlAttributeText("z");
            const node = new XmlAttribute("name", new XmlAttributeText(""));
            node.insertChild(charRefNode);
            node.insertChild(entityRefNode, 0);
            node.insertChild(textNode, 1);
            assert.strictEqual(node.toString(), "name='&y;z&#120;'");
        });
    });

    describe("#removeChild", () => {
        it("should throw an error if this node only has one child", () => {
            const textNode = new XmlAttributeText("");
            const secondTextNode = new XmlAttributeText("");
            const node = new XmlAttribute("name", textNode);
            assert.throws(() => node.removeChild(textNode));
            assert.throws(() => node.removeChild(secondTextNode));
        });

        it("should remove the specified node from this node", () => {
            const textNode = new XmlAttributeText("");
            const secondTextNode = new XmlAttributeText("");
            const node = new XmlAttribute("name", textNode);
            node.insertChild(secondTextNode);
            assert.isTrue(node.removeChild(textNode));
            assert.strictEqual(node.children().length, 1);
            assert.strictEqual(node.children()[0], secondTextNode);
        });
    });

    describe("#removeChildAtIndex", () => {
        it("should throw an error if this node only has one child", () => {
            const textNode = new XmlAttributeText("");
            const node = new XmlAttribute("name", textNode);
            assert.throws(() => node.removeChildAtIndex(0));
        });

        it("should remove the node at the specified index from this"
           + " node", () => {
            const textNode = new XmlAttributeText("");
            const secondTextNode = new XmlAttributeText("");
            const node = new XmlAttribute("name", textNode);
            node.insertChild(secondTextNode);
            assert.strictEqual(node.removeChildAtIndex(0), textNode);
            assert.strictEqual(node.children().length, 1);
            assert.strictEqual(node.children()[0], secondTextNode);
        });
    });

    describe("#text", () => {
        it("should add an XmlAttributeText node to this node's children at the"
           + " specified index with the specified text and return the"
           + " newly added node", () => {
            const node = new XmlAttribute("name", new XmlAttributeText(""));
            assert.isTrue(node.text("a") instanceof XmlAttributeText);
            assert.isTrue(node.text("b", 0) instanceof XmlAttributeText);
            assert.strictEqual(node.toString(), "name='ba'");
        });
    });

    describe("#toString(options)", () => {
        it("should return a string containing the XML string representation"
           + " for this node", () => {
            const node = new XmlAttribute("a", new XmlAttributeText(""));
            node.insertChild(new XmlAttributeText("b"));
            node.insertChild(new XmlEntityRef("c"));
            node.insertChild(new XmlCharRef("d"));
            assert.strictEqual(node.toString(), "a='b&c;&#100;'");
        });

        it("should return a string that uses single or double quotes for"
           + " attribute values depending on the specified options", () => {
            const node = new XmlAttribute("name",
                new XmlAttributeText(""));
            node.insertChild(new XmlAttributeText("'hello'"));
            assert.strictEqual(node.toString({doubleQuotes: false}),
                               "name='&apos;hello&apos;'");

            const secondNode = new XmlAttribute("name",
                new XmlAttributeText(""));
            secondNode.insertChild(new XmlAttributeText("\"hello\""));
            assert.strictEqual(secondNode.toString({doubleQuotes: true}),
                               "name=\"&quot;hello&quot;\"");
        });
    });
});
