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
import {XmlDtdAttlist} from "../../../lib/main";

describe("XmlDtdAttlist", () => {
    describe("#constructor", () => {
        it("should create an XmlDtdAttlist node with the specified data",
           () => {
               const node = new XmlDtdAttlist("abc");
               assert.strictEqual(node.toString(), "<!ATTLIST abc>");
           });
    });

    describe("#text", () => {
        it("should return this node's text", () => {
            const node = new XmlDtdAttlist("abc");
            assert.strictEqual(node.text, "abc");
        });

        it("should set this node's text to the specified value", () => {
            const node = new XmlDtdAttlist("abc");
            node.text = "123";
            assert.strictEqual(node.text, "123");
        });

        it("should throw an error if the specified value is not a" +
           " string", () => {
            const node = new XmlDtdAttlist("abc");
            assert.throws((): void => node.text = undefined as any);
            assert.throws((): void => node.text = null as any);
            assert.throws((): void => node.text = 0 as any);
            assert.throws(
                (): void => node.text = new XmlDtdAttlist("abc") as any);
        });

        it("should throw an error if the specified value contains characters"
           + " not allowed in XML", () => {
            const node = new XmlDtdAttlist("abc");
            assert.throws(() => node.text = "abc"
                                            + String.fromCharCode(0x0001)
                                            + "def");
        });
    });

    describe("#children", () => {
        it("should throw an error", () => {
            const node = new XmlDtdAttlist("a");
            assert.throws(() => node.children());
        });
    });

    describe("#insertChild", () => {
        it("should throw an error", () => {
            const node = new XmlDtdAttlist("a");
            const childNode = new XmlDtdAttlist("b");
            assert.throws(() => node.insertChild(childNode));
        });
    });

    describe("#removeChild", () => {
        it("should throw an error", () => {
            const node = new XmlDtdAttlist("a");
            const childNode = new XmlDtdAttlist("b");
            assert.throws(() => node.removeChild(childNode));
        });
    });

    describe("#removeChildAtIndex", () => {
        it("should throw an error", () => {
            const node = new XmlDtdAttlist("a");
            assert.throws(() => node.removeChildAtIndex(0));
        });
    });

    describe("#toString", () => {
        it("should return a string containing the XML string representation"
           + " for this node", () => {
            const node = new XmlDtdAttlist("abc");
            assert.strictEqual(node.toString(), "<!ATTLIST abc>");
        });
    });
});
