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

import {XmlCdata} from "../../../lib/main";
import {assert} from "chai";

describe("XmlCdata", () => {
    describe("#constructor", () => {
        it("should create an XmlCdata node with the specified data", () => {
            let node = new XmlCdata("abc");
            assert.strictEqual(node.toString(), "<![CDATA[abc]]>");
        });
    });

    describe("#data", () => {
        it("should return this node's data", () => {
            let node = new XmlCdata("abc");
            assert.strictEqual(node.data, "abc");
        });

        it("should set this node's data to the specified value", () => {
            let node = new XmlCdata("abc");
            node.data = "123";
            assert.strictEqual(node.data, "123");
        });

        it("should throw an error if the specified value is not a"
           + " string", () => {
            let node = new XmlCdata("abc");
            assert.throws((): void => node.data = <any> undefined);
            assert.throws((): void => node.data = <any> null);
            assert.throws((): void => node.data = <any> 0);
            assert.throws((): void => node.data = <any> new XmlCdata(""));
        });

        it("should throw an error if the specified value contains characters"
           + " not allowed in XML", () => {
            let node = new XmlCdata("abc");
            assert.throws(() => node.data = "abc"
                                            + String.fromCharCode(0x0001)
                                            + "def");
        });

        it("should throw an error if the specified value contains the"
           + " string ']]>'", () => {
            let node = new XmlCdata("]]a]>bc>");
            assert.throws(() => node.data = "]]>");
            assert.throws(() => node.data = "abc]]>123");
            assert.throws(() => node.data = "]]>abc123");
            assert.throws(() => node.data = "abc123]]>");
        });
    });

    describe("#children", () => {
        it("should throw an error", () => {
            let node = new XmlCdata("a");
            assert.throws(() => node.children());
        });
    });

    describe("#insertChild", () => {
        it("should throw an error", () => {
            let node = new XmlCdata("a");
            let childNode = new XmlCdata("b");
            assert.throws(() => node.insertChild(childNode));
        });
    });

    describe("#removeChild", () => {
        it("should throw an error", () => {
            let node = new XmlCdata("a");
            let childNode = new XmlCdata("b");
            assert.throws(() => node.removeChild(childNode));
        });
    });

    describe("#removeChildAtIndex", () => {
        it("should throw an error", () => {
            let node = new XmlCdata("a");
            assert.throws(() => node.removeChildAtIndex(0));
        });
    });

    describe("#toString", () => {
        it("should return a string containing the XML string representation"
           + " for this node", () => {
            let node = new XmlCdata("abc");
            assert.strictEqual(node.toString(), "<![CDATA[abc]]>");
        });
    });
});
