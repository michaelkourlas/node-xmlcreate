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
import {XmlDtdParamEntityRef} from "../../../lib/main";

describe("XmlDtdParamEntityRef", () => {
    describe("#constructor", () => {
        it("should create an XmlDtdParamEntityRef node with the specified"
           + " data", () => {
            const node = new XmlDtdParamEntityRef("abc");
            assert.strictEqual(node.toString(), "%abc;");
        });
    });

    describe("#entity", () => {
        it("should return this node's entity", () => {
            const node = new XmlDtdParamEntityRef("abc");
            assert.strictEqual(node.entity, "abc");
        });

        it("should set this node's entity to the specified value", () => {
            const node = new XmlDtdParamEntityRef("abc");
            node.entity = "def123";
            assert.strictEqual(node.entity, "def123");
        });

        it("should throw an error if the specified value is not a"
           + " string", () => {
            const node = new XmlDtdParamEntityRef("abc");
            assert.throws((): void => node.entity = undefined as any);
            assert.throws((): void => node.entity = null as any);
            assert.throws((): void => node.entity = 0 as any);
            assert.throws((): void => node.entity =
                new XmlDtdParamEntityRef("abc") as any);
        });

        it("should throw an error if the specified value contains characters"
           + " not allowed in XML names", () => {
            const node = new XmlDtdParamEntityRef("abc");
            assert.throws(() => node.entity = ".");
        });
    });

    describe("#children", () => {
        it("should throw an error", () => {
            const node = new XmlDtdParamEntityRef("a");
            assert.throws(() => node.children());
        });
    });

    describe("#insertChild", () => {
        it("should throw an error", () => {
            const node = new XmlDtdParamEntityRef("a");
            const childNode = new XmlDtdParamEntityRef("b");
            assert.throws(() => node.insertChild(childNode));
        });
    });

    describe("#removeChild", () => {
        it("should throw an error", () => {
            const node = new XmlDtdParamEntityRef("a");
            const childNode = new XmlDtdParamEntityRef("b");
            assert.throws(() => node.removeChild(childNode));
        });
    });

    describe("#removeChildAtIndex", () => {
        it("should throw an error", () => {
            const node = new XmlDtdParamEntityRef("a");
            assert.throws(() => node.removeChildAtIndex(0));
        });
    });

    describe("#toString", () => {
        it("should return a string containing the XML string representation"
           + " for this node", () => {
            const node = new XmlDtdParamEntityRef("abc");
            assert.strictEqual(node.toString(), "%abc;");
        });
    });
});
