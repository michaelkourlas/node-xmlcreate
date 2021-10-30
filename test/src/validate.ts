/**
 * Copyright (C) 2016-2019 Michael Kourlas
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
    fixChar,
    fixName,
    isUndefined,
    validateChar,
    validateName,
    validateSingleChar,
} from "../../lib/validate";

describe("validate", () => {
    describe("#validateChar", () => {
        it("invalid characters", () => {
            assert.isFalse(validateChar(String.fromCharCode(0x0000)));
            assert.isFalse(validateChar(String.fromCharCode(0x0008)));
            assert.isFalse(validateChar(String.fromCharCode(0x000b)));
            assert.isFalse(validateChar(String.fromCharCode(0x000c)));
            assert.isFalse(validateChar(String.fromCharCode(0x000e)));
            assert.isFalse(validateChar(String.fromCharCode(0x001f)));
            assert.isFalse(validateChar(String.fromCharCode(0xd800)));
            assert.isFalse(validateChar(String.fromCharCode(0xdbff)));
            assert.isFalse(validateChar(String.fromCharCode(0xdc00)));
            assert.isFalse(validateChar(String.fromCharCode(0xdfff)));

            assert.isFalse(validateChar(String.fromCharCode(0x0001)));
            assert.isFalse(validateChar(String.fromCharCode(0xdb80)));
            assert.isFalse(validateChar(String.fromCharCode(0xdc80)));
            assert.isFalse(validateChar("abc" + String.fromCharCode(0x0001)));
            assert.isFalse(
                validateChar("a" + String.fromCharCode(0x0001) + "bc")
            );
            assert.isFalse(validateChar("abc" + String.fromCharCode(0xdb80)));
            assert.isFalse(
                validateChar("a" + String.fromCharCode(0xdb80) + "bc")
            );
            assert.isFalse(validateChar("abc" + String.fromCharCode(0xdc80)));
            assert.isFalse(
                validateChar("a" + String.fromCharCode(0xdc80) + "bc")
            );

            assert.isFalse(
                validateChar(
                    String.fromCharCode(0xdb80) + String.fromCharCode(0xdb40)
                )
            );
            assert.isFalse(
                validateChar(
                    String.fromCharCode(0xdc80) + String.fromCharCode(0xdc40)
                )
            );
            assert.isFalse(
                validateChar(
                    String.fromCharCode(0xdc80) + String.fromCharCode(0xdb80)
                )
            );
            assert.isFalse(
                validateChar(
                    "abc" +
                        String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdb40)
                )
            );
            assert.isFalse(
                validateChar(
                    "abc" +
                        String.fromCharCode(0xdc80) +
                        String.fromCharCode(0xdc40)
                )
            );
            assert.isFalse(
                validateChar(
                    "abc" +
                        String.fromCharCode(0xdc80) +
                        String.fromCharCode(0xdb80)
                )
            );
            assert.isFalse(
                validateChar(
                    "a" +
                        String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdb40) +
                        "bc"
                )
            );
            assert.isFalse(
                validateChar(
                    "a" +
                        String.fromCharCode(0xdc80) +
                        String.fromCharCode(0xdc40) +
                        "bc"
                )
            );
            assert.isFalse(
                validateChar(
                    "a" +
                        String.fromCharCode(0xdc80) +
                        String.fromCharCode(0xdb80) +
                        "bc"
                )
            );

            assert.isFalse(
                validateChar(
                    String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdc80) +
                        String.fromCharCode(0xdb80)
                )
            );
            assert.isFalse(
                validateChar(
                    String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdc80) +
                        String.fromCharCode(0xdc80)
                )
            );
            assert.isFalse(
                validateChar(
                    String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdc80)
                )
            );
            assert.isFalse(
                validateChar(
                    String.fromCharCode(0xdc80) +
                        String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdc80)
                )
            );
        });

        it("valid characters", () => {
            assert.isTrue(validateChar(String.fromCharCode(0x9)));
            assert.isTrue(validateChar(String.fromCharCode(0xa)));
            assert.isTrue(validateChar(String.fromCharCode(0xd)));
            assert.isTrue(validateChar(String.fromCharCode(0x20)));
            assert.isTrue(validateChar(String.fromCharCode(0xd7ff)));
            assert.isTrue(validateChar(String.fromCharCode(0xe000)));
            assert.isTrue(validateChar(String.fromCharCode(0xfffd)));
            assert.isTrue(
                validateChar(
                    String.fromCharCode(0xd800) + String.fromCharCode(0xdc00)
                )
            );
            assert.isTrue(
                validateChar(
                    String.fromCharCode(0xdbff) + String.fromCharCode(0xdfff)
                )
            );

            assert.isTrue(validateChar("a"));
            assert.isTrue(validateChar("&"));
            assert.isTrue(validateChar("<"));
            assert.isTrue(
                validateChar(
                    String.fromCharCode(0xdb80) + String.fromCharCode(0xdc80)
                )
            );
            assert.isTrue(validateChar("&abc"));
            assert.isTrue(validateChar("abc<"));
            assert.isTrue(validateChar("a&<bc"));
            assert.isTrue(
                validateChar(
                    "abc" +
                        String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdc80)
                )
            );
            assert.isTrue(
                validateChar(
                    "a" +
                        String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdc80) +
                        "bc"
                )
            );
            assert.isTrue(
                validateChar(
                    String.fromCharCode(0xdb80) + String.fromCharCode(0xdc80)
                )
            );
            assert.isTrue(
                validateChar(
                    String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdc80) +
                        "abc"
                )
            );
            assert.isTrue(
                validateChar(
                    String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdc80) +
                        "abc" +
                        String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdc80)
                )
            );
        });
    });

    describe("#fixChar", () => {
        it("invalid characters", () => {
            assert.strictEqual(fixChar(String.fromCharCode(0x0000)), "\uFFFD");
            assert.strictEqual(fixChar(String.fromCharCode(0x0008)), "\uFFFD");
            assert.strictEqual(fixChar(String.fromCharCode(0x000b)), "\uFFFD");
            assert.strictEqual(fixChar(String.fromCharCode(0x000c)), "\uFFFD");
            assert.strictEqual(fixChar(String.fromCharCode(0x000e)), "\uFFFD");
            assert.strictEqual(fixChar(String.fromCharCode(0x001f)), "\uFFFD");
            assert.strictEqual(fixChar(String.fromCharCode(0xd800)), "\uFFFD");
            assert.strictEqual(fixChar(String.fromCharCode(0xdbff)), "\uFFFD");
            assert.strictEqual(fixChar(String.fromCharCode(0xdc00)), "\uFFFD");
            assert.strictEqual(fixChar(String.fromCharCode(0xdfff)), "\uFFFD");

            assert.strictEqual(fixChar(String.fromCharCode(0x0001)), "\uFFFD");
            assert.strictEqual(fixChar(String.fromCharCode(0xdb80)), "\uFFFD");
            assert.strictEqual(fixChar(String.fromCharCode(0xdc80)), "\uFFFD");
            assert.strictEqual(
                fixChar("abc" + String.fromCharCode(0x0001)),
                "abc\uFFFD"
            );
            assert.strictEqual(
                fixChar("a" + String.fromCharCode(0x0001) + "bc"),
                "a\uFFFDbc"
            );
            assert.strictEqual(
                fixChar("abc" + String.fromCharCode(0xdb80)),
                "abc\uFFFD"
            );
            assert.strictEqual(
                fixChar("a" + String.fromCharCode(0xdb80) + "bc"),
                "a\uFFFDbc"
            );
            assert.strictEqual(
                fixChar("abc" + String.fromCharCode(0xdc80)),
                "abc\uFFFD"
            );
            assert.strictEqual(
                fixChar("a" + String.fromCharCode(0xdc80) + "bc"),
                "a\uFFFDbc"
            );

            assert.strictEqual(
                fixChar(
                    String.fromCharCode(0xdb80) + String.fromCharCode(0xdb40)
                ),
                "\uFFFD\uFFFD"
            );
            assert.strictEqual(
                fixChar(
                    String.fromCharCode(0xdc80) + String.fromCharCode(0xdc40)
                ),
                "\uFFFD\uFFFD"
            );
            assert.strictEqual(
                fixChar(
                    String.fromCharCode(0xdc80) + String.fromCharCode(0xdb80)
                ),
                "\uFFFD\uFFFD"
            );
            assert.strictEqual(
                fixChar(
                    "abc" +
                        String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdb40)
                ),
                "abc\uFFFD\uFFFD"
            );
            assert.strictEqual(
                fixChar(
                    "abc" +
                        String.fromCharCode(0xdc80) +
                        String.fromCharCode(0xdc40)
                ),
                "abc\uFFFD\uFFFD"
            );
            assert.strictEqual(
                fixChar(
                    "abc" +
                        String.fromCharCode(0xdc80) +
                        String.fromCharCode(0xdb80)
                ),
                "abc\uFFFD\uFFFD"
            );
            assert.strictEqual(
                fixChar(
                    "a" +
                        String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdb40) +
                        "bc"
                ),
                "a\uFFFD\uFFFDbc"
            );
            assert.strictEqual(
                fixChar(
                    "a" +
                        String.fromCharCode(0xdc80) +
                        String.fromCharCode(0xdc40) +
                        "bc"
                ),
                "a\uFFFD\uFFFDbc"
            );
            assert.strictEqual(
                fixChar(
                    "a" +
                        String.fromCharCode(0xdc80) +
                        String.fromCharCode(0xdb80) +
                        "bc"
                ),
                "a\uFFFD\uFFFDbc"
            );

            assert.strictEqual(
                fixChar(
                    String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdc80) +
                        String.fromCharCode(0xdb80)
                ),
                "\uDB80\uDC80\uFFFD"
            );
            assert.strictEqual(
                fixChar(
                    String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdc80) +
                        String.fromCharCode(0xdc80)
                ),
                "\uDB80\uDC80\uFFFD"
            );
            assert.strictEqual(
                fixChar(
                    String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdc80)
                ),
                "\uFFFD\uDB80\uDC80"
            );
            assert.strictEqual(
                fixChar(
                    String.fromCharCode(0xdc80) +
                        String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdc80)
                ),
                "\uFFFD\uDB80\uDC80"
            );
        });

        it("valid characters", () => {
            assert.strictEqual(fixChar(String.fromCharCode(0x9)), "\u0009");
            assert.strictEqual(fixChar(String.fromCharCode(0xa)), "\u000a");
            assert.strictEqual(fixChar(String.fromCharCode(0xd)), "\u000d");
            assert.strictEqual(fixChar(String.fromCharCode(0x20)), "\u0020");
            assert.strictEqual(fixChar(String.fromCharCode(0xd7ff)), "\uD7FF");
            assert.strictEqual(fixChar(String.fromCharCode(0xe000)), "\uE000");
            assert.strictEqual(fixChar(String.fromCharCode(0xfffd)), "\uFFFD");
            assert.strictEqual(
                fixChar(
                    String.fromCharCode(0xd800) + String.fromCharCode(0xdc00)
                ),
                "\uD800\uDC00"
            );
            assert.strictEqual(
                fixChar(
                    String.fromCharCode(0xdbff) + String.fromCharCode(0xdfff)
                ),
                "\uDBFF\uDFFF"
            );

            assert.strictEqual(fixChar("a"), "a");
            assert.strictEqual(fixChar("&"), "&");
            assert.strictEqual(fixChar("<"), "<");
            assert.strictEqual(
                fixChar(
                    String.fromCharCode(0xdb80) + String.fromCharCode(0xdc80)
                ),
                "\uDB80\uDC80"
            );
            assert.strictEqual(fixChar("&abc"), "&abc");
            assert.strictEqual(fixChar("abc<"), "abc<");
            assert.strictEqual(fixChar("a&<bc"), "a&<bc");
            assert.strictEqual(
                fixChar(
                    "abc" +
                        String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdc80)
                ),
                "abc\uDB80\uDC80"
            );
            assert.strictEqual(
                fixChar(
                    "a" +
                        String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdc80) +
                        "bc"
                ),
                "a\uDB80\uDC80bc"
            );
            assert.strictEqual(
                fixChar(
                    String.fromCharCode(0xdb80) + String.fromCharCode(0xdc80)
                ),
                "\uDB80\uDC80"
            );
            assert.strictEqual(
                fixChar(
                    String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdc80) +
                        "abc"
                ),
                "\uDB80\uDC80abc"
            );
            assert.strictEqual(
                fixChar(
                    String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdc80) +
                        "abc" +
                        String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdc80)
                ),
                "\uDB80\uDC80abc\uDB80\uDC80"
            );
        });
    });

    describe("#validateSingleChar", () => {
        it("invalid characters", () => {
            assert.isFalse(validateSingleChar("ab"));
            assert.isFalse(validateSingleChar(String.fromCharCode(0x0001)));
            assert.isFalse(
                validateSingleChar("a" + String.fromCharCode(0x0001))
            );
            assert.isFalse(validateSingleChar(String.fromCharCode(0xd800)));
            assert.isFalse(validateSingleChar(String.fromCharCode(0xdc00)));
            assert.isFalse(
                validateSingleChar(
                    String.fromCharCode(0xd800) + String.fromCharCode(0xe000)
                )
            );
            assert.isFalse(
                validateSingleChar(
                    String.fromCharCode(0xe000) + String.fromCharCode(0xdc00)
                )
            );
        });

        it("valid characters", () => {
            assert.isTrue(validateSingleChar("a"));
            assert.isTrue(validateSingleChar("&"));
            assert.isTrue(validateSingleChar("<"));
            assert.isTrue(
                validateSingleChar(
                    String.fromCharCode(0xd800) + String.fromCharCode(0xdc00)
                )
            );
        });
    });

    describe("#validateName", () => {
        it("invalid characters", () => {
            assert.isFalse(validateName(""));
            assert.isFalse(validateName(String.fromCharCode(0x0001)));
            assert.isFalse(validateName("."));
            assert.isFalse(validateName(String.fromCharCode(0xd800)));
            assert.isFalse(validateName(String.fromCharCode(0xdb80)));
            assert.isFalse(validateName(String.fromCharCode(0xdc00)));
            assert.isFalse(validateName(String.fromCharCode(0xe000)));
            assert.isFalse(validateName("abc&"));
            assert.isFalse(validateName("a<bc"));
            assert.isFalse(
                validateName("a" + String.fromCharCode(0xd800) + "bc")
            );
            assert.isFalse(
                validateName("a" + String.fromCharCode(0xdb80) + "bc")
            );
            assert.isFalse(
                validateName("a" + String.fromCharCode(0xdc00) + "bc")
            );
            assert.isFalse(
                validateName("a" + String.fromCharCode(0xe000) + "bc")
            );
            assert.isFalse(
                validateName(
                    "a" +
                        String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdfff) +
                        "bc"
                )
            );
            assert.isFalse(validateName(String.fromCharCode(0xd800) + "a"));
            assert.isFalse(
                validateName(
                    String.fromCharCode(0xdb80) + String.fromCharCode(0xdfff)
                )
            );
            assert.isFalse(validateName("ab" + String.fromCharCode(0xd800)));
            assert.isFalse(
                validateName(
                    "ab" +
                        String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdfff)
                )
            );
            assert.isFalse(
                validateName(
                    String.fromCharCode(0xd800) +
                        String.fromCharCode(0xdc00) +
                        String.fromCharCode(0xd800)
                )
            );
            assert.isFalse(
                validateName(
                    String.fromCharCode(0xd800) +
                        String.fromCharCode(0xdc00) +
                        String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdfff)
                )
            );
        });

        it("valid characters", () => {
            assert.isTrue(validateName(":"));
            assert.isTrue(validateName("_abc"));
            assert.isTrue(validateName("abc-"));
            assert.isTrue(validateName("a-bc"));
            assert.isTrue(
                validateName(
                    "abc" +
                        String.fromCharCode(0xd800) +
                        String.fromCharCode(0xdc00)
                )
            );
            assert.isTrue(
                validateName(
                    "a" +
                        String.fromCharCode(0xd800) +
                        String.fromCharCode(0xdc00) +
                        "bc"
                )
            );
            assert.isTrue(
                validateName(
                    String.fromCharCode(0xd800) + String.fromCharCode(0xdc00)
                )
            );
            assert.isTrue(
                validateName(
                    String.fromCharCode(0xd800) +
                        String.fromCharCode(0xdc00) +
                        "abc"
                )
            );
            assert.isTrue(
                validateName(
                    String.fromCharCode(0xd800) +
                        String.fromCharCode(0xdc00) +
                        "abc" +
                        String.fromCharCode(0xd800) +
                        String.fromCharCode(0xdc00)
                )
            );
        });
    });

    describe("#fixName", () => {
        it("invalid characters", () => {
            assert.strictEqual(fixName(""), "");
            assert.strictEqual(fixName(String.fromCharCode(0x0001)), "\uFFFD");
            assert.strictEqual(fixName("."), "\uFFFD");
            assert.strictEqual(fixName(String.fromCharCode(0xd800)), "\uFFFD");
            assert.strictEqual(fixName(String.fromCharCode(0xdb80)), "\uFFFD");
            assert.strictEqual(fixName(String.fromCharCode(0xdc00)), "\uFFFD");
            assert.strictEqual(fixName(String.fromCharCode(0xe000)), "\uFFFD");
            assert.strictEqual(fixName("abc&"), "abc\uFFFD");
            assert.strictEqual(fixName("a<bc"), "a\uFFFDbc");
            assert.strictEqual(
                fixName("a" + String.fromCharCode(0xd800) + "bc"),
                "a\uFFFDbc"
            );
            assert.strictEqual(
                fixName("a" + String.fromCharCode(0xdb80) + "bc"),
                "a\uFFFDbc"
            );
            assert.strictEqual(
                fixName("a" + String.fromCharCode(0xdc00) + "bc"),
                "a\uFFFDbc"
            );
            assert.strictEqual(
                fixName("a" + String.fromCharCode(0xe000) + "bc"),
                "a\uFFFDbc"
            );
            assert.strictEqual(
                fixName(
                    "a" +
                        String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdfff) +
                        "bc"
                ),
                "a\uFFFD\uFFFDbc"
            );
            assert.strictEqual(
                fixName(String.fromCharCode(0xd800) + "a"),
                "\uFFFDa"
            );
            assert.strictEqual(
                fixName(
                    String.fromCharCode(0xdb80) + String.fromCharCode(0xdfff)
                ),
                "\uFFFD\uFFFD"
            );
            assert.strictEqual(
                fixName("ab" + String.fromCharCode(0xd800)),
                "ab\uFFFD"
            );
            assert.strictEqual(
                fixName(
                    "ab" +
                        String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdfff)
                ),
                "ab\uFFFD\uFFFD"
            );
            assert.strictEqual(
                fixName(
                    String.fromCharCode(0xd800) +
                        String.fromCharCode(0xdc00) +
                        String.fromCharCode(0xd800)
                ),
                "\uD800\uDC00\uFFFD"
            );
            assert.strictEqual(
                fixName(
                    String.fromCharCode(0xd800) +
                        String.fromCharCode(0xdc00) +
                        String.fromCharCode(0xdb80) +
                        String.fromCharCode(0xdfff)
                ),
                "\uD800\uDC00\uFFFD\uFFFD"
            );
        });

        it("valid characters", () => {
            assert.strictEqual(fixName(":"), ":");
            assert.strictEqual(fixName("_abc"), "_abc");
            assert.strictEqual(fixName("abc-"), "abc-");
            assert.strictEqual(fixName("a-bc"), "a-bc");
            assert.strictEqual(
                fixName(
                    "abc" +
                        String.fromCharCode(0xd800) +
                        String.fromCharCode(0xdc00)
                ),
                "abc\uD800\uDC00"
            );
            assert.strictEqual(
                fixName(
                    "a" +
                        String.fromCharCode(0xd800) +
                        String.fromCharCode(0xdc00) +
                        "bc"
                ),
                "a\uD800\uDC00bc"
            );
            assert.strictEqual(
                fixName(
                    String.fromCharCode(0xd800) + String.fromCharCode(0xdc00)
                ),
                "\uD800\uDC00"
            );
            assert.strictEqual(
                fixName(
                    String.fromCharCode(0xd800) +
                        String.fromCharCode(0xdc00) +
                        "abc"
                ),
                "\uD800\uDC00abc"
            );
            assert.strictEqual(
                fixName(
                    String.fromCharCode(0xd800) +
                        String.fromCharCode(0xdc00) +
                        "abc" +
                        String.fromCharCode(0xd800) +
                        String.fromCharCode(0xdc00)
                ),
                "\uD800\uDC00abc\uD800\uDC00"
            );
        });
    });

    describe("#isUndefined", () => {
        it("undefined", () => {
            assert.isTrue(isUndefined(undefined));
        });

        it("not undefined", () => {
            assert.isFalse(isUndefined("test"));
            assert.isFalse(isUndefined(3));
            assert.isFalse(isUndefined(null));
            assert.isFalse(isUndefined(true));
        });
    });
});
