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

import {XmlDtdNotation} from "../../../lib/main";
import {assert} from "chai";

describe("XmlDtdNotation", () => {
    describe("#constructor", () => {
        it("should create an XmlDtdNotation node with the specified data",
           () => {
               let node = new XmlDtdNotation("abc");
               assert.strictEqual(node.toString(), "<!NOTATION abc>");
           });
    });

    describe("#text", () => {
        it("should return this node's text", () => {
            let node = new XmlDtdNotation("abc");
            assert.strictEqual(node.text, "abc");
        });

        it("should set this node's text to the specified value", () => {
            let node = new XmlDtdNotation("abc");
            node.text = "123";
            assert.strictEqual(node.text, "123");
        });

        it("should throw an error if the specified value is not a"
           + " string", () => {
            let node = new XmlDtdNotation("abc");
            assert.throws((): void => node.text = <any> undefined);
            assert.throws((): void => node.text = <any> null);
            assert.throws((): void => node.text = <any> 0);
            assert.throws(
                (): void => node.text = <any> new XmlDtdNotation("abc"));
        });

        it("should throw an error if the specified value contains characters"
           + " not allowed in XML", () => {
            let node = new XmlDtdNotation("abc");
            assert.throws(
                () => node.text = "abc" + String.fromCharCode(0x0001) + "def");
        });
    });

    describe("#children", () => {
        it("should throw an error", () => {
            let node = new XmlDtdNotation("a");
            assert.throws(() => node.children());
        });
    });

    describe("#insertChild", () => {
        it("should throw an error", () => {
            let node = new XmlDtdNotation("a");
            let childNode = new XmlDtdNotation("b");
            assert.throws(() => node.insertChild(childNode));
        });
    });

    describe("#removeChild", () => {
        it("should throw an error", () => {
            let node = new XmlDtdNotation("a");
            let childNode = new XmlDtdNotation("b");
            assert.throws(() => node.removeChild(childNode));
        });
    });

    describe("#removeChildAtIndex", () => {
        it("should throw an error", () => {
            let node = new XmlDtdNotation("a");
            assert.throws(() => node.removeChildAtIndex(0));
        });
    });

    describe("#toString", () => {
        it("should return a string containing the XML string representation"
           + " for this node", () => {
            let node = new XmlDtdNotation("abc");
            assert.strictEqual(node.toString(), "<!NOTATION abc>");
        });
    });
});
