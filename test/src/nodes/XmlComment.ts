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

import {XmlComment} from "../../../lib/main";
import {assert} from "chai";

describe("XmlComment", () => {
    describe("#constructor", () => {
        it("should create an XmlComment node with the specified data", () => {
            let node = new XmlComment("abc");
            assert.strictEqual(node.toString(), "<!--abc-->");
        });
    });

    describe("#content", () => {
        it("should return this node's content", () => {
            let node = new XmlComment("a");
            assert.strictEqual(node.content, "a");
        });

        it("should set this node's content to the specified value", () => {
            let node = new XmlComment("a");
            node.content = "b";
            assert.strictEqual(node.content, "b");
        });

        it("should throw an error if the specified value is not a"
           + " string", () => {
            let node = new XmlComment("a");
            assert.throws((): void => node.content = undefined);
            assert.throws((): void => node.content = null);
            assert.throws((): void => node.content = <any> 0);
            assert.throws((): void => node.content = <any> new XmlComment(""));
        });

        it("should throw an error if the specified value contains characters"
           + " not allowed in XML", () => {
            let node = new XmlComment("abc");
            assert.throws(() => node.content = "abc"
                                               + String.fromCharCode(0x0001)
                                               + "def");
        });

        it("should throw an error if the specified value contains characters"
           + " not allowed in XML comments", () => {
            let node = new XmlComment("-a-bc");
            assert.throws(() => node.content = "--");
            assert.throws(() => node.content = "abc--def");
            assert.throws(() => node.content = "--abcdef");
            assert.throws(() => node.content = "abcdef--");
            assert.throws(() => node.content = "abcdef-");
        });
    });

    describe("#children", () => {
        it("should throw an error", () => {
            let node = new XmlComment("a");
            assert.throws(() => node.children());
        });
    });

    describe("#insertChild", () => {
        it("should throw an error", () => {
            let node = new XmlComment("a");
            let childNode = new XmlComment("b");
            assert.throws(() => node.insertChild(childNode));
        });
    });

    describe("#removeChild", () => {
        it("should throw an error", () => {
            let node = new XmlComment("a");
            let childNode = new XmlComment("b");
            assert.throws(() => node.removeChild(childNode));
        });
    });

    describe("#removeChildAtIndex", () => {
        it("should throw an error", () => {
            let node = new XmlComment("a");
            assert.throws(() => node.removeChildAtIndex(0));
        });
    });

    describe("#toString", () => {
        it("should return a string containing the XML string representation"
           + " for this node", () => {
            let node = new XmlComment("abc");
            assert.strictEqual(node.toString(), "<!--abc-->");
        });
    });
});
