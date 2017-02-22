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
import {XmlCharRef} from "../../../lib/main";

describe("XmlCharRef", () => {
    describe("#constructor", () => {
        it("should create an XmlCharRef node with the specified"
           + " character value and representation", () => {
            let node = new XmlCharRef("a");
            assert.strictEqual(node.toString(), "&#97;");

            node = new XmlCharRef("b", true);
            assert.strictEqual(node.toString(), "&#x62;");

            node = new XmlCharRef("c", false);
            assert.strictEqual(node.toString(), "&#99;");
        });
    });

    describe("#char", () => {
        it("should return this node's character value", () => {
            const node = new XmlCharRef("a");
            assert.strictEqual(node.char, "a");
        });

        it("should set this node's character value to the specified"
           + " value", () => {
            const node = new XmlCharRef("a");
            node.char = "b";
            assert.strictEqual(node.char, "b");
        });

        it("should throw an error if the specified value is not a"
           + " string", () => {
            const node = new XmlCharRef("a");
            assert.throws((): void => node.char = undefined as any);
            assert.throws((): void => node.char = null as any);
            assert.throws((): void => node.char = 0 as any);
            assert.throws((): void => node.char = new XmlCharRef("") as any);
        });

        it("should throw an error if the specified value contains characters"
           + " not allowed in XML", () => {
            const node = new XmlCharRef("a");
            assert.throws(() => node.char = String.fromCharCode(0x0001));
        });

        it("should throw an error if the specified value contains more than"
           + " one character", () => {
            const node = new XmlCharRef("a");
            assert.throws(() => node.char = "bc");
        });
    });

    describe("#hex", () => {
        it("should return this node's hex value", () => {
            const node = new XmlCharRef("a", false);
            assert.isFalse(node.hex);
        });

        it("should set this node's hex value to the specified value", () => {
            const node = new XmlCharRef("a", false);
            node.hex = true;
            assert.isTrue(node.hex);
        });

        it("should throw an error if the specified value is not a"
           + " boolean", () => {
            const node = new XmlCharRef("a");
            assert.throws((): void => node.hex = undefined as any);
            assert.throws((): void => node.hex = null as any);
            assert.throws((): void => node.hex = 0 as any);
            assert.throws((): void => node.hex = "test" as any);
            assert.throws((): void => node.hex = new XmlCharRef("") as any);
        });
    });

    describe("#children", () => {
        it("should throw an error", () => {
            const node = new XmlCharRef("a");
            assert.throws(() => node.children());
        });
    });

    describe("#insertChild", () => {
        it("should throw an error", () => {
            const node = new XmlCharRef("a");
            const childNode = new XmlCharRef("b");
            assert.throws(() => node.insertChild(childNode));
        });
    });

    describe("#removeChild", () => {
        it("should throw an error", () => {
            const node = new XmlCharRef("a");
            const childNode = new XmlCharRef("b");
            assert.throws(() => node.removeChild(childNode));
        });
    });

    describe("#removeChildAtIndex", () => {
        it("should throw an error", () => {
            const node = new XmlCharRef("a");
            assert.throws(() => node.removeChildAtIndex(0));
        });
    });

    describe("#toString", () => {
        it("should return a string containing the XML string representation"
           + " for this node", () => {
            let node = new XmlCharRef("a");
            assert.strictEqual(node.toString(), "&#97;");

            node = new XmlCharRef(String.fromCharCode(0xdbff)
                                  + String.fromCharCode(0xdc00));
            assert.strictEqual(node.toString(), "&#1113088;");

            node = new XmlCharRef("b", true);
            assert.strictEqual(node.toString(), "&#x62;");

            node = new XmlCharRef(String.fromCharCode(0xdbff)
                                  + String.fromCharCode(0xdc00), true);
            assert.strictEqual(node.toString(), "&#x10fc00;");
        });
    });
});
