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

import {XmlProcInst} from "../../../lib/main";
import {assert} from "chai";

describe("XmlProcInst", () => {
    describe("#constructor", () => {
        it("should create an XmlProcInst node with the specified"
           + " target", () => {
            let node = new XmlProcInst("target");
            assert.strictEqual(node.toString(), "<?target?>");
        });

        it("should create an XmlProcInst node with the specified"
           + " target and content", () => {
            let node = new XmlProcInst("target", "content");
            assert.strictEqual(node.toString(), "<?target content?>");
        });
    });

    describe("#target", () => {
        it("should return this node's target", () => {
            let node = new XmlProcInst("abc");
            assert.strictEqual(node.target, "abc");
        });

        it("should set this node's data to the specified value", () => {
            let node = new XmlProcInst("abc");
            node.target = "123";
            assert.strictEqual(node.target, "123");
        });

        it("should throw an error if the specified value is not a"
           + " string", () => {
            let node = new XmlProcInst("abc");
            assert.throws((): void => node.target = <any> undefined);
            assert.throws((): void => node.target = <any> null);
            assert.throws((): void => node.target = <any> 0);
            assert.throws(
                (): void => node.target = <any> new XmlProcInst("target"));
        });

        it("should throw an error if the specified value contains characters"
           + " not allowed in XML", () => {
            let node = new XmlProcInst("abc");
            assert.throws(() => node.target = "abc"
                                              + String.fromCharCode(0x0001)
                                              + "def");
        });

        it("should throw an error if the specified value is equal"
           + " to 'xml'", () => {
            let node = new XmlProcInst("abc");
            assert.throws(() => node.target = "xml");
        });
    });

    describe("#content", () => {
        it("should return this node's content", () => {
            let node = new XmlProcInst("abc", "def");
            assert.strictEqual(node.content, "def");
        });

        it("should set this node's data to the specified value", () => {
            let node = new XmlProcInst("abc");
            node.content = "123";
            assert.strictEqual(node.content, "123");
        });

        it("should throw an error if the specified value is not a"
           + " string or undefined", () => {
            let node = new XmlProcInst("abc", "def");
            assert.throws((): void => node.content = <any> null);
            assert.throws((): void => node.content = <any> 0);
            assert.throws(
                (): void => node.content = <any> new XmlProcInst("target"));
        });

        it("should throw an error if the specified value contains characters"
           + " not allowed in XML", () => {
            let node = new XmlProcInst("abc");
            assert.throws(() => node.content = "abc"
                                               + String.fromCharCode(0x0001)
                                               + "def");
        });

        it("should throw an error if the specified value contains the"
           + " string '?>'", () => {
            let node = new XmlProcInst("?a?b??c>>?");
            assert.throws(() => node.content = "?>");
            assert.throws(() => node.content = "abc?>123");
            assert.throws(() => node.content = "?>abc123");
            assert.throws(() => node.content = "abc123?>");
        });
    });

    describe("#children", () => {
        it("should throw an error", () => {
            let node = new XmlProcInst("a");
            assert.throws(() => node.children());
        });
    });

    describe("#insertChild", () => {
        it("should throw an error", () => {
            let node = new XmlProcInst("a");
            let childNode = new XmlProcInst("b");
            assert.throws(() => node.insertChild(childNode));
        });
    });

    describe("#removeChild", () => {
        it("should throw an error", () => {
            let node = new XmlProcInst("a");
            let childNode = new XmlProcInst("b");
            assert.throws(() => node.removeChild(childNode));
        });
    });

    describe("#removeChildAtIndex", () => {
        it("should throw an error", () => {
            let node = new XmlProcInst("a");
            assert.throws(() => node.removeChildAtIndex(0));
        });
    });

    describe("#toString", () => {
        it("should return a string containing the XML string representation"
           + " for this node", () => {
            let node = new XmlProcInst("abc");
            assert.strictEqual(node.toString(), "<?abc?>");

            node = new XmlProcInst("abc", "def");
            assert.strictEqual(node.toString(), "<?abc def?>");
        });
    });
});
