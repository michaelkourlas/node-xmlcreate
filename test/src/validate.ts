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
import {
    validateChar,
    validateName,
    validateSingleChar
} from "../../lib/validate";

describe("validate", () => {
    describe("#validateChar", () => {
        it("should return false if the specified string contains" +
           " characters not allowed in XML", () => {
            assert.isFalse(validateChar(String.fromCharCode(0x0000)));
            assert.isFalse(validateChar(String.fromCharCode(0x0008)));
            assert.isFalse(validateChar(String.fromCharCode(0x000B)));
            assert.isFalse(validateChar(String.fromCharCode(0x000C)));
            assert.isFalse(validateChar(String.fromCharCode(0x000E)));
            assert.isFalse(validateChar(String.fromCharCode(0x001F)));
            assert.isFalse(validateChar(String.fromCharCode(0xd800)));
            assert.isFalse(validateChar(String.fromCharCode(0xdbff)));
            assert.isFalse(validateChar(String.fromCharCode(0xdc00)));
            assert.isFalse(validateChar(String.fromCharCode(0xdfff)));

            assert.isFalse(validateChar(String.fromCharCode(0x0001)));
            assert.isFalse(validateChar(String.fromCharCode(0xdb80)));
            assert.isFalse(validateChar(String.fromCharCode(0xdc80)));
            assert.isFalse(validateChar("abc" + String.fromCharCode(0x0001)));
            assert.isFalse(validateChar("a" + String.fromCharCode(0x0001)
                                        + "bc"));
            assert.isFalse(validateChar("abc" + String.fromCharCode(0xdb80)));
            assert.isFalse(validateChar("a" + String.fromCharCode(0xdb80)
                                        + "bc"));
            assert.isFalse(validateChar("abc" + String.fromCharCode(0xdc80)));
            assert.isFalse(validateChar("a" + String.fromCharCode(0xdc80)
                                        + "bc"));

            assert.isFalse(validateChar(String.fromCharCode(0xdb80)
                                        + String.fromCharCode(0xdb40)));
            assert.isFalse(validateChar(String.fromCharCode(0xdc80)
                                        + String.fromCharCode(0xdc40)));
            assert.isFalse(validateChar(String.fromCharCode(0xdc80)
                                        + String.fromCharCode(0xdb80)));
            assert.isFalse(validateChar("abc" + String.fromCharCode(0xdb80)
                                        + String.fromCharCode(0xdb40)));
            assert.isFalse(validateChar("abc" + String.fromCharCode(0xdc80)
                                        + String.fromCharCode(0xdc40)));
            assert.isFalse(validateChar("abc" + String.fromCharCode(0xdc80)
                                        + String.fromCharCode(0xdb80)));
            assert.isFalse(validateChar("a" + String.fromCharCode(0xdb80)
                                        + String.fromCharCode(0xdb40) + "bc"));
            assert.isFalse(validateChar("a" + String.fromCharCode(0xdc80)
                                        + String.fromCharCode(0xdc40) + "bc"));
            assert.isFalse(validateChar("a" + String.fromCharCode(0xdc80)
                                        + String.fromCharCode(0xdb80) + "bc"));

            assert.isFalse(validateChar(String.fromCharCode(0xdb80)
                                        + String.fromCharCode(0xdc80)
                                        + String.fromCharCode(0xdb80)));
            assert.isFalse(validateChar(String.fromCharCode(0xdb80)
                                        + String.fromCharCode(0xdc80)
                                        + String.fromCharCode(0xdc80)));
        });

        it("should return true if the specified string contains no" +
           " characters or only contains characters allowed in XML", () => {
            assert.isTrue(validateChar(String.fromCharCode(0x9)));
            assert.isTrue(validateChar(String.fromCharCode(0xa)));
            assert.isTrue(validateChar(String.fromCharCode(0xd)));
            assert.isTrue(validateChar(String.fromCharCode(0x20)));
            assert.isTrue(validateChar(String.fromCharCode(0xd7ff)));
            assert.isTrue(validateChar(String.fromCharCode(0xe000)));
            assert.isTrue(validateChar(String.fromCharCode(0xfffd)));
            assert.isTrue(validateChar(String.fromCharCode(0xd800) +
                                       String.fromCharCode(0xdc00)));
            assert.isTrue(validateChar(String.fromCharCode(0xdbff) +
                                       String.fromCharCode(0xdfff)));

            assert.isTrue(validateChar("a"));
            assert.isTrue(validateChar("&"));
            assert.isTrue(validateChar("<"));
            assert.isTrue(validateChar(String.fromCharCode(0xdb80) +
                                       String.fromCharCode(0xdc80)));
            assert.isTrue(validateChar("&abc"));
            assert.isTrue(validateChar("abc<"));
            assert.isTrue(validateChar("a&<bc"));
            assert.isTrue(validateChar("abc" + String.fromCharCode(0xdb80) +
                                       String.fromCharCode(0xdc80)));
            assert.isTrue(validateChar("a" + String.fromCharCode(0xdb80) +
                                       String.fromCharCode(0xdc80) + "bc"));
            assert.isTrue(validateChar(String.fromCharCode(0xdb80) +
                                       String.fromCharCode(0xdc80)));
            assert.isTrue(validateChar(String.fromCharCode(0xdb80) +
                                       String.fromCharCode(0xdc80) + "abc"));
            assert.isTrue(validateChar(String.fromCharCode(0xdb80) +
                                       String.fromCharCode(0xdc80) + "abc" +
                                       String.fromCharCode(0xdb80)
                                       + String.fromCharCode(0xdc80)));
        });
    });

    describe("#validateSingleChar", () => {
        it("should return false if the specified string contains more" +
           " than one character or if that character is not allowed in" +
           " XML", () => {
            assert.isFalse(validateSingleChar("ab"));
            assert.isFalse(validateSingleChar(String.fromCharCode(0x0001)));
            assert.isFalse(validateSingleChar("a" +
                                              String.fromCharCode(0x0001)));
            assert.isFalse(validateSingleChar(String.fromCharCode(0xd800)));
            assert.isFalse(validateSingleChar(String.fromCharCode(0xdc00)));
            assert.isFalse(validateSingleChar(String.fromCharCode(0xd800) +
                                              String.fromCharCode(0xe000)));
            assert.isFalse(validateSingleChar(String.fromCharCode(0xe000) +
                                              String.fromCharCode(0xdc00)));
        });

        it("should return true if the specified string contains a single" +
           " character allowed in XML", () => {
            assert.isTrue(validateSingleChar("a"));
            assert.isTrue(validateSingleChar("&"));
            assert.isTrue(validateSingleChar("<"));
            assert.isTrue(validateSingleChar(String.fromCharCode(0xd800) +
                                             String.fromCharCode(0xdc00)));
        });
    });

    describe("#validateName", () => {
        it("should return false if the specified string contains characters" +
           " not allowed in XML names", () => {
            assert.isFalse(validateName(String.fromCharCode(0x0001)));
            assert.isFalse(validateName("."));
            assert.isFalse(validateName(String.fromCharCode(0xd800)));
            assert.isFalse(validateName(String.fromCharCode(0xdb80)));
            assert.isFalse(validateName(String.fromCharCode(0xdc00)));
            assert.isFalse(validateName(String.fromCharCode(0xe000)));
            assert.isFalse(validateName("abc&"));
            assert.isFalse(validateName("a<bc"));
            assert.isFalse(validateName("a" +
                                        String.fromCharCode(0xd800) + "bc"));
            assert.isFalse(validateName("a" +
                                        String.fromCharCode(0xdb80) + "bc"));
            assert.isFalse(validateName("a" +
                                        String.fromCharCode(0xdc00) + "bc"));
            assert.isFalse(validateName("a" +
                                        String.fromCharCode(0xe000) + "bc"));
            assert.isFalse(validateName("a" +
                                        String.fromCharCode(0xdb80) +
                                        String.fromCharCode(0xdfff) + "bc"));
            assert.isFalse(validateName(String.fromCharCode(0xd800) +
                                        "a"));
            assert.isFalse(validateName(String.fromCharCode(0xdb80) +
                                        String.fromCharCode(0xdfff)));
            assert.isFalse(validateName("ab" + String.fromCharCode(0xd800)));
            assert.isFalse(validateName("ab" + String.fromCharCode(0xdb80) +
                                        String.fromCharCode(0xdfff)));
            assert.isFalse(validateName(String.fromCharCode(0xd800) +
                                        String.fromCharCode(0xdc00)
                                        + String.fromCharCode(0xd800)));
            assert.isFalse(validateName(String.fromCharCode(0xd800) +
                                        String.fromCharCode(0xdc00)
                                        + String.fromCharCode(0xdb80) +
                                        String.fromCharCode(0xdfff)));
        });

        it("should return true if the specified value only contains" +
           " characters allowed in XML names", () => {
            assert.isTrue(validateName(":"));
            assert.isTrue(validateName("_abc"));
            assert.isTrue(validateName("abc-"));
            assert.isTrue(validateName("a-bc"));
            assert.isTrue(validateName("abc" + String.fromCharCode(0xd800) +
                                       String.fromCharCode(0xdc00)));
            assert.isTrue(validateName("a" + String.fromCharCode(0xd800) +
                                       String.fromCharCode(0xdc00) + "bc"));
            assert.isTrue(validateName(String.fromCharCode(0xd800) +
                                       String.fromCharCode(0xdc00)));
            assert.isTrue(validateName(String.fromCharCode(0xd800) +
                                       String.fromCharCode(0xdc00) + "abc"));
            assert.isTrue(validateName(String.fromCharCode(0xd800) +
                                       String.fromCharCode(0xdc00) + "abc" +
                                       String.fromCharCode(0xd800)
                                       + String.fromCharCode(0xdc00)));
        });
    });
});
