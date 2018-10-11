/**
 * Copyright (C) 2016-2018 Michael Kourlas
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
import XmlAttribute from "../../../lib/nodes/XmlAttribute";
import XmlAttributeText from "../../../lib/nodes/XmlAttributeText";

describe("XmlAttributeText", () => {
    describe("#toString", () => {
        it("normal character data", () => {
            assert.strictEqual(
                new XmlAttributeText(undefined, true, {
                    charData: "abc"
                }).toString(),
                "abc");
        });

        it("character data with characters to be escaped", () => {
            assert.strictEqual(
                new XmlAttributeText(undefined, true, {
                    charData: "&"
                }).toString(),
                "&amp;");
            assert.strictEqual(
                new XmlAttributeText(undefined, true, {
                    charData: "<"
                }).toString(),
                "&lt;");
            assert.strictEqual(
                new XmlAttributeText(undefined, true, {
                    charData: "<&a&b<c&<>]]>"
                }).toString(),
                "&lt;&amp;a&amp;b&lt;c&amp;&lt;>]]>");
        });

        it("character data with characters not allowed in XML", () => {
            assert.throws(
                () => new XmlAttributeText(undefined, true, {
                    charData: "abc" + String.fromCharCode(0x0001) + "def"
                }));
            assert.doesNotThrow(
                () => new XmlAttributeText(undefined, false, {
                    charData: "abc" + String.fromCharCode(0x0001) + "def"
                }));
        });
    });

    it("#up", () => {
        const parent = new XmlAttribute(undefined, false, {name: "a"});
        const child = parent.text({charData: "b"});
        assert.strictEqual(child.up(), parent);
    });
});
