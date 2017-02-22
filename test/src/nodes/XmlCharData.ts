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
import {XmlCharData} from "../../../lib/main";

describe("XmlCharData", () => {
    describe("#constructor", () => {
        it("should create an XmlCharData node with the specified text", () => {
            const node = new XmlCharData("abc");
            assert.strictEqual(node.toString(), "abc");
        });
    });

    describe("#text", () => {
        it("should return this node's text", () => {
            const node = new XmlCharData("abc");
            assert.strictEqual(node.charData, "abc");
        });

        it("should set this node's text to the specified value", () => {
            const node = new XmlCharData("abc");
            node.charData = "123";
            assert.strictEqual(node.charData, "123");
        });

        it("should throw an error if the specified value is not a"
           + " string", () => {
            const node = new XmlCharData("abc");
            assert.throws((): void => node.charData = undefined as any);
            assert.throws((): void => node.charData = null as any);
            assert.throws((): void => node.charData = 0 as any);
            assert.throws((): void => node.charData =
                new XmlCharData("") as any);
        });

        it("should throw an error if the specified value contains characters"
           + " not allowed in XML", () => {
            const node = new XmlCharData("abc");
            assert.throws(() => node.charData = "abc"
                                                + String.fromCharCode(0x0001)
                                                + "def");
        });
    });

    describe("#children", () => {
        it("should throw an error", () => {
            const node = new XmlCharData("a");
            assert.throws(() => node.children());
        });
    });

    describe("#insertChild", () => {
        it("should throw an error", () => {
            const node = new XmlCharData("a");
            const childNode = new XmlCharData("b");
            assert.throws(() => node.insertChild(childNode));
        });
    });

    describe("#removeChild", () => {
        it("should throw an error", () => {
            const node = new XmlCharData("a");
            const childNode = new XmlCharData("b");
            assert.throws(() => node.removeChild(childNode));
        });
    });

    describe("#removeChildAtIndex", () => {
        it("should throw an error", () => {
            const node = new XmlCharData("a");
            assert.throws(() => node.removeChildAtIndex(0));
        });
    });

    describe("#toString", () => {
        it("should return a string containing the XML string representation"
           + " for this node", () => {
            let node = new XmlCharData("abc");
            assert.strictEqual(node.toString(), "abc");

            node = new XmlCharData("<&a&b<c&<>]]>");
            assert.strictEqual(node.toString(),
                               "&lt;&amp;a&amp;b&lt;c&amp;&lt;>]]&gt;");
        });
    });
});
