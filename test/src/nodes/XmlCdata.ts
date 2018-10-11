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
import XmlCdata from "../../../lib/nodes/XmlCdata";
import XmlElement from "../../../lib/nodes/XmlElement";

describe("XmlCdata", () => {
    describe("#toString", () => {
        it("normal character data", () => {
            assert.strictEqual(
                new XmlCdata(undefined, true, {
                    charData: "abc"
                }).toString(),
                "<![CDATA[abc]]>");

            assert.strictEqual(
                new XmlCdata(undefined, true, {
                    charData: "]]a]>bc>"
                }).toString(),
                "<![CDATA[]]a]>bc>]]>");
        });

        it("character data with string ']]>'", () => {
            assert.throws(
                () => new XmlCdata(undefined, true, {
                    charData: "]]>"
                }));
            assert.doesNotThrow(
                () => new XmlCdata(undefined, false, {
                    charData: "]]>"
                }));

            assert.throws(
                () => new XmlCdata(undefined, true, {
                    charData: "abc]]>123"
                }));
            assert.doesNotThrow(
                () => new XmlCdata(undefined, false, {
                    charData: "abc]]>123"
                }));

            assert.throws(
                () => new XmlCdata(undefined, true, {
                    charData: "]]>abc123"
                }));
            assert.doesNotThrow(
                () => new XmlCdata(undefined, false, {
                    charData: "]]>abc123"
                }));

            assert.throws(
                () => new XmlCdata(undefined, true, {
                    charData: "abc123]]>"
                }));
            assert.doesNotThrow(
                () => new XmlCdata(undefined, false, {
                    charData: "abc123]]>"
                }));
        });

        it("character data with characters not allowed in XML", () => {
            assert.throws(
                () => new XmlCdata(undefined, true, {
                    charData: "abc" + String.fromCharCode(0x0001) + "def"
                }));
            assert.doesNotThrow(
                () => new XmlCdata(undefined, false, {
                    charData: "abc" + String.fromCharCode(0x0001) + "def"
                }));
        });
    });

    it("#up", () => {
        const parent = new XmlElement(undefined, false, {name: "a"});
        const child = parent.cdata({charData: "b"});
        assert.strictEqual(child.up(), parent);
    });
});
