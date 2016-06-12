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

"use strict";

import {assert} from "chai";

import * as validate from "../../lib/utils/validate";

describe("validate", () => {
    describe("#char(str)", () => {
        it("should return false if the specified string contains" +
            " characters not allowed in XML", () => {
            assert.isFalse(validate.char(String.fromCodePoint(0x0001)));
            assert.isFalse(validate.char(String.fromCodePoint(0xd800)));
            assert.isFalse(validate.char(String.fromCodePoint(0xdb80)));
            assert.isFalse(validate.char(String.fromCodePoint(0xdc00)));
            assert.isFalse(validate.char(String.fromCodePoint(0xe000)));
            assert.isFalse(validate.char("abc" + String.fromCodePoint(0x0001)));
            assert.isFalse(validate.char("a" + String.fromCodePoint(0x0001) +
                "bc"));
            assert.isFalse(validate.char("a" +
                String.fromCodePoint(0xd800) + "bc"));
            assert.isFalse(validate.char("a" +
                String.fromCodePoint(0xdb80) + "bc"));
            assert.isFalse(validate.char("a" +
                String.fromCodePoint(0xdc00) + "bc"));
            assert.isFalse(validate.char("a" +
                String.fromCodePoint(0xe000) + "bc"));
            assert.isFalse(validate.char("a" +
                String.fromCodePoint(0xdb80) +
                String.fromCodePoint(0xe000) + "bc"));
            assert.isFalse(validate.char(String.fromCodePoint(0xd800) +
                "a"));
            assert.isFalse(validate.char(String.fromCodePoint(0xe000) +
                String.fromCodePoint(0xdfff)));
            assert.isFalse(validate.char("ab" + String.fromCodePoint(0xd800)));
            assert.isFalse(validate.char("ab" + String.fromCodePoint(0xe000) +
                String.fromCodePoint(0xdfff)));
            assert.isFalse(validate.char(String.fromCodePoint(0xd800) +
                String.fromCodePoint(0xdc00) + String.fromCodePoint(0xd800)));
            assert.isFalse(validate.char(String.fromCodePoint(0xd800) +
                String.fromCodePoint(0xdc00) + String.fromCodePoint(0xe000) +
                String.fromCodePoint(0xdfff)));
        });

        it("should return true if the specified string contains no" +
            " characters or only contains characters allowed in XML", () => {
            assert.isTrue(validate.char("a"));
            assert.isTrue(validate.char("&"));
            assert.isTrue(validate.char("<"));
            assert.isTrue(validate.char(String.fromCodePoint(0xd800) +
                String.fromCodePoint(0xdc00)));
            assert.isTrue(validate.char(String.fromCodePoint(0xdbff) +
                String.fromCodePoint(0xdc00)));
            assert.isTrue(validate.char("&abc"));
            assert.isTrue(validate.char("abc<"));
            assert.isTrue(validate.char("a&<bc"));
            assert.isTrue(validate.char("abc" + String.fromCodePoint(0xdbff) +
                String.fromCodePoint(0xdc00)));
            assert.isTrue(validate.char("a" + String.fromCodePoint(0xdbff) +
                String.fromCodePoint(0xdc00) + "bc"));
            assert.isTrue(validate.char(String.fromCodePoint(0xdbff) +
                String.fromCodePoint(0xdc00)));
            assert.isTrue(validate.char(String.fromCodePoint(0xdbff) +
                String.fromCodePoint(0xdc00) + "abc"));
            assert.isTrue(validate.char(String.fromCodePoint(0xdbff) +
                String.fromCodePoint(0xdc00) + "abc" +
                String.fromCodePoint(0xdbff) + String.fromCodePoint(0xdc00)));
        });
    });

    describe("#singleChar(str)", () => {
        it("should return false if the specified string contains more" +
            " than one character or if that character is not allowed in" +
            " XML", () => {
            assert.isFalse(validate.singleChar("ab"));
            assert.isFalse(validate.singleChar(String.fromCodePoint(0x0001)));
            assert.isFalse(validate.singleChar("a" +
                String.fromCodePoint(0x0001)));
            assert.isFalse(validate.singleChar(String.fromCodePoint(0xd800)));
            assert.isFalse(validate.singleChar(String.fromCodePoint(0xdc00)));
            assert.isFalse(validate.singleChar(String.fromCodePoint(0xd800) +
                String.fromCodePoint(0xe000)));
            assert.isFalse(validate.singleChar(String.fromCodePoint(0xe000) +
                String.fromCodePoint(0xdc00)));
        });

        it("should return true if the specified string contains a single" +
            " character allowed in XML", () => {
            assert.isTrue(validate.singleChar("a"));
            assert.isTrue(validate.singleChar("&"));
            assert.isTrue(validate.singleChar("<"));
            assert.isTrue(validate.singleChar(String.fromCodePoint(0xd800) +
                String.fromCodePoint(0xdc00)));
        });
    });

    describe("#name(str)", () => {
        it("should return false if the specified string contains characters" +
            " not allowed in XML names", () => {
            assert.isFalse(validate.name(String.fromCodePoint(0x0001)));
            assert.isFalse(validate.name("."));
            assert.isFalse(validate.name(String.fromCodePoint(0xd800)));
            assert.isFalse(validate.name(String.fromCodePoint(0xdb80)));
            assert.isFalse(validate.name(String.fromCodePoint(0xdc00)));
            assert.isFalse(validate.name(String.fromCodePoint(0xe000)));
            assert.isFalse(validate.name("abc&"));
            assert.isFalse(validate.name("a<bc"));
            assert.isFalse(validate.name("a" +
                String.fromCodePoint(0xd800) + "bc"));
            assert.isFalse(validate.name("a" +
                String.fromCodePoint(0xdb80) + "bc"));
            assert.isFalse(validate.name("a" +
                String.fromCodePoint(0xdc00) + "bc"));
            assert.isFalse(validate.name("a" +
                String.fromCodePoint(0xe000) + "bc"));
            assert.isFalse(validate.name("a" +
                String.fromCodePoint(0xdb80) +
                String.fromCodePoint(0xdfff) + "bc"));
            assert.isFalse(validate.name(String.fromCodePoint(0xd800) +
                "a"));
            assert.isFalse(validate.name(String.fromCodePoint(0xdb80) +
                String.fromCodePoint(0xdfff)));
            assert.isFalse(validate.name("ab" + String.fromCodePoint(0xd800)));
            assert.isFalse(validate.name("ab" + String.fromCodePoint(0xdb80) +
                String.fromCodePoint(0xdfff)));
            assert.isFalse(validate.name(String.fromCodePoint(0xd800) +
                String.fromCodePoint(0xdc00) + String.fromCodePoint(0xd800)));
            assert.isFalse(validate.name(String.fromCodePoint(0xd800) +
                String.fromCodePoint(0xdc00) + String.fromCodePoint(0xdb80) +
                String.fromCodePoint(0xdfff)));
        });

        it("should return true if the specified value only contains" +
            " characters allowed in XML names", () => {
            assert.isTrue(validate.name(":"));
            assert.isTrue(validate.name("_abc"));
            assert.isTrue(validate.name("abc-"));
            assert.isTrue(validate.name("a-bc"));
            assert.isTrue(validate.name("abc" + String.fromCodePoint(0xd800) +
                String.fromCodePoint(0xdc00)));
            assert.isTrue(validate.name("a" + String.fromCodePoint(0xd800) +
                String.fromCodePoint(0xdc00) + "bc"));
            assert.isTrue(validate.name(String.fromCodePoint(0xd800) +
                String.fromCodePoint(0xdc00)));
            assert.isTrue(validate.name(String.fromCodePoint(0xd800) +
                String.fromCodePoint(0xdc00) + "abc"));
            assert.isTrue(validate.name(String.fromCodePoint(0xd800) +
                String.fromCodePoint(0xdc00) + "abc" +
                String.fromCodePoint(0xd800) + String.fromCodePoint(0xdc00)));
        });
    });
});
