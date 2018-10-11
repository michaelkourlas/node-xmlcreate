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
import XmlComment from "../../../lib/nodes/XmlComment";

describe("XmlComment", () => {
    describe("#toString", () => {
        it("normal character data", () => {
            assert.strictEqual(
                new XmlComment(undefined, true, {
                    charData: "abc"
                }).toString(),
                "<!--abc-->");

            assert.strictEqual(
                new XmlComment(undefined, true, {
                    charData: "-a-bc"
                }).toString(),
                "<!---a-bc-->");
        });

        it("character data with characters not allowed in XML", () => {
            assert.throws(
                () => new XmlComment(undefined, true, {
                    charData: "abc" + String.fromCharCode(0x0001) + "def"
                }));
            assert.doesNotThrow(
                () => new XmlComment(undefined, false, {
                    charData: "abc" + String.fromCharCode(0x0001) + "def"
                }));
        });

        it("character data with characters not allowed in comments", () => {
            assert.throws(
                () => new XmlComment(undefined, true, {
                    charData: "--"
                }));
            assert.doesNotThrow(
                () => new XmlComment(undefined, false, {
                    charData: "--"
                }));

            assert.throws(
                () => new XmlComment(undefined, true, {
                    charData: "abc--def"
                }));
            assert.doesNotThrow(
                () => new XmlComment(undefined, false, {
                    charData: "abc--def"
                }));

            assert.throws(
                () => new XmlComment(undefined, true, {
                    charData: "--abcdef"
                }));
            assert.doesNotThrow(
                () => new XmlComment(undefined, false, {
                    charData: "--abcdef"
                }));

            assert.throws(
                () => new XmlComment(undefined, true, {
                    charData: "abcdef--"
                }));
            assert.doesNotThrow(
                () => new XmlComment(undefined, false, {
                    charData: "abcdef--"
                }));

            assert.throws(
                () => new XmlComment(undefined, true, {
                    charData: "abcdef-"
                }));
            assert.doesNotThrow(
                () => new XmlComment(undefined, false, {
                    charData: "abcdef-"
                }));
        });
    });

    it("#up", () => {
        assert.strictEqual(
            new XmlComment(undefined, false, {
                charData: "a"
            }).up(),
            undefined);
    });
});
