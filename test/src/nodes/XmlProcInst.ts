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
import XmlProcInst from "../../../lib/nodes/XmlProcInst";

describe("XmlProcInst", () => {
    describe("#toString", () => {
        it("normal target; no content", () => {
            assert.strictEqual(
                new XmlProcInst(undefined, true, {
                    target: "abc"
                }).toString(),
                "<?abc?>");

            assert.strictEqual(
                new XmlProcInst(undefined, true, {
                    target: "xmxlxmmlmxlxmx"
                }).toString(),
                "<?xmxlxmmlmxlxmx?>");
        });

        it("normal target; normal content", () => {
            assert.strictEqual(
                new XmlProcInst(undefined, true, {
                    content: "def",
                    target: "abc"
                }).toString(),
                "<?abc def?>");

            assert.strictEqual(
                new XmlProcInst(undefined, true, {
                    content: "?a?b??c>>?",
                    target: "abc"
                }).toString(),
                "<?abc ?a?b??c>>??>");
        });

        it("target with characters not allowed in XML; no content", () => {
            assert.throws(
                () => new XmlProcInst(undefined, true, {
                    target: "abc" + String.fromCharCode(0x0001) + "def"
                }));
            assert.doesNotThrow(
                () => new XmlProcInst(undefined, false, {
                    target: "abc" + String.fromCharCode(0x0001) + "def"
                }));
        });

        it("target 'xml'; no content", () => {
            assert.throws(
                () => new XmlProcInst(undefined, true, {
                    target: "xml"
                }));
            assert.doesNotThrow(
                () => new XmlProcInst(undefined, false, {
                    target: "xml"
                }));
        });

        it("normal target; content with characters not allowed in"
           + " XML", () => {
            assert.throws(
                () => new XmlProcInst(undefined, true, {
                    content: "abc" + String.fromCharCode(0x0001) + "def",
                    target: "abc"
                }));
            assert.doesNotThrow(
                () => new XmlProcInst(undefined, false, {
                    content: "abc" + String.fromCharCode(0x0001) + "def",
                    target: "abc"
                }));
        });

        it("normal target; content containing the string '?>'", () => {
            assert.throws(
                () => new XmlProcInst(undefined, true, {
                    content: "?>",
                    target: "abc"
                }));
            assert.doesNotThrow(
                () => new XmlProcInst(undefined, false, {
                    content: "?>",
                    target: "abc"
                }));

            assert.throws(
                () => new XmlProcInst(undefined, true, {
                    content: "abc?>123",
                    target: "abc"
                }));
            assert.doesNotThrow(
                () => new XmlProcInst(undefined, false, {
                    content: "abc?>123",
                    target: "abc"
                }));

            assert.throws(
                () => new XmlProcInst(undefined, true, {
                    content: "?>abc123",
                    target: "abc"
                }));
            assert.doesNotThrow(
                () => new XmlProcInst(undefined, false, {
                    content: "?>abc123",
                    target: "abc"
                }));

            assert.throws(
                () => new XmlProcInst(undefined, true, {
                    content: "abc123?>",
                    target: "abc"
                }));
            assert.doesNotThrow(
                () => new XmlProcInst(undefined, false, {
                    content: "abc123?>",
                    target: "abc"
                }));
        });
    });

    it("#up", () => {
        assert.strictEqual(
            new XmlProcInst(undefined, false, {
                content: "a",
                target: "a"
            }).up(),
            undefined);
    });
});
