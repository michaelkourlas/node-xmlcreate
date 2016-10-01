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

import {XmlEntityRef} from "../../../lib/main";
import {assert} from "chai";

describe("XmlEntityRef", () => {
    describe("#constructor", () => {
        it("should create an XmlEntityRef node with the specified data", () => {
            let node = new XmlEntityRef("abc");
            assert.strictEqual(node.toString(), "&abc;");
        });
    });

    describe("#entity", () => {
        it("should return this node's entity", () => {
            let node = new XmlEntityRef("abc");
            assert.strictEqual(node.entity, "abc");
        });

        it("should set this node's entity to the specified value", () => {
            let node = new XmlEntityRef("abc");
            node.entity = "def123";
            assert.strictEqual(node.entity, "def123");
        });

        it("should throw an error if the specified value is not a"
           + " string", () => {
            let node = new XmlEntityRef("abc");
            assert.throws((): void => node.entity = <any> undefined);
            assert.throws((): void => node.entity = <any> null);
            assert.throws((): void => node.entity = <any> 0);
            assert.throws(
                (): void => node.entity = <any> new XmlEntityRef("abc"));
        });

        it("should throw an error if the specified value contains characters"
           + " not allowed in XML names", () => {
            let node = new XmlEntityRef("abc");
            assert.throws(() => node.entity = ".");
        });
    });

    describe("#children", () => {
        it("should throw an error", () => {
            let node = new XmlEntityRef("a");
            assert.throws(() => node.children());
        });
    });

    describe("#insertChild", () => {
        it("should throw an error", () => {
            let node = new XmlEntityRef("a");
            let childNode = new XmlEntityRef("b");
            assert.throws(() => node.insertChild(childNode));
        });
    });

    describe("#removeChild", () => {
        it("should throw an error", () => {
            let node = new XmlEntityRef("a");
            let childNode = new XmlEntityRef("b");
            assert.throws(() => node.removeChild(childNode));
        });
    });

    describe("#removeChildAtIndex", () => {
        it("should throw an error", () => {
            let node = new XmlEntityRef("a");
            assert.throws(() => node.removeChildAtIndex(0));
        });
    });

    describe("#toString", () => {
        it("should return a string containing the XML string representation"
           + " for this node", () => {
            let node = new XmlEntityRef("abc");
            assert.strictEqual(node.toString(), "&abc;");
        });
    });
});
