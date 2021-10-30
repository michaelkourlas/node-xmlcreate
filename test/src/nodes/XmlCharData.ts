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
import XmlCharData from "../../../lib/nodes/XmlCharData";

describe("XmlCharData", () => {
    describe("#charData", () => {
        it("get", () => {
            const node = new XmlCharData(undefined, true, {
                charData: "abc",
            });
            assert.strictEqual(node.charData, "abc");
        });

        it("set", () => {
            const node = new XmlCharData(undefined, true, {
                charData: "abc",
            });
            node.charData = "def";
            assert.strictEqual(node.charData, "def");
        });
    });

    describe("#toString", () => {
        it("normal character data; default replace invalid chars", () => {
            assert.strictEqual(
                new XmlCharData(undefined, true, {
                    charData: "abc",
                }).toString(),
                "abc"
            );
        });

        it(
            "character data with characters to be escaped; default replace" +
                " invalid chars",
            () => {
                assert.strictEqual(
                    new XmlCharData(undefined, true, {
                        charData: "<&a&b<c&<>]]>",
                    }).toString(),
                    "&lt;&amp;a&amp;b&lt;c&amp;&lt;>]]&gt;"
                );
            }
        );

        it(
            "character data with characters not allowed in XML; default" +
                " replace invalid chars",
            () => {
                assert.throws(
                    () =>
                        new XmlCharData(undefined, true, {
                            charData:
                                "abc" + String.fromCharCode(0x0001) + "def",
                        })
                );
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlCharData(undefined, false, {
                            charData:
                                "abc" + String.fromCharCode(0x0001) + "def",
                        }).toString(),
                        "abc\u0001def"
                    );
                });
            }
        );

        it(
            "character data with characters not allowed in XML; do not" +
                " replace invalid chars",
            () => {
                assert.throws(
                    () =>
                        new XmlCharData(undefined, true, {
                            charData:
                                "abc" + String.fromCharCode(0x0001) + "def",
                            replaceInvalidCharsInCharData: false,
                        })
                );
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlCharData(undefined, false, {
                            charData:
                                "abc" + String.fromCharCode(0x0001) + "def",
                            replaceInvalidCharsInCharData: false,
                        }).toString(),
                        "abc\u0001def"
                    );
                });
            }
        );

        it(
            "character data with characters not allowed in XML; replace" +
                " invalid chars",
            () => {
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlCharData(undefined, true, {
                            charData:
                                "abc" + String.fromCharCode(0x0001) + "def",
                            replaceInvalidCharsInCharData: true,
                        }).toString(),
                        "abc\uFFFDdef"
                    );
                });
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlCharData(undefined, false, {
                            charData:
                                "abc" + String.fromCharCode(0x0001) + "def",
                            replaceInvalidCharsInCharData: true,
                        }).toString(),
                        "abc\uFFFDdef"
                    );
                });
            }
        );
    });

    it("#up", () => {
        assert.strictEqual(
            new XmlCharData(undefined, false, {
                charData: "a",
            }).up(),
            undefined
        );
    });
});
