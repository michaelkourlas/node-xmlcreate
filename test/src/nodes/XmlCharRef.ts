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
import XmlCharRef from "../../../lib/nodes/XmlCharRef";

describe("XmlCharRef", () => {
    describe("#char", () => {
        it("get", () => {
            const node = new XmlCharRef(undefined, true, {
                char: "a",
            });
            assert.strictEqual(node.char, "a");
        });

        it("set", () => {
            const node = new XmlCharRef(undefined, true, {
                char: "a",
            });
            node.char = "b";
            assert.strictEqual(node.char, "b");
        });
    });

    describe("#hex", () => {
        it("get", () => {
            const node = new XmlCharRef(undefined, true, {
                char: "a",
                hex: true,
            });
            assert.strictEqual(node.hex, true);
        });

        it("set", () => {
            const node = new XmlCharRef(undefined, true, {
                char: "a",
                hex: true,
            });
            node.hex = false;
            assert.strictEqual(node.hex, false);
        });
    });

    describe("#toString", () => {
        it("normal single character; default hex", () => {
            assert.strictEqual(
                new XmlCharRef(undefined, true, {
                    char: "a",
                    // hex: false
                }).toString(),
                "&#97;"
            );
        });

        it("normal single character; hex true", () => {
            assert.strictEqual(
                new XmlCharRef(undefined, true, {
                    char: "b",
                    hex: true,
                }).toString(),
                "&#x62;"
            );
        });

        it("normal single character; hex false", () => {
            assert.strictEqual(
                new XmlCharRef(undefined, true, {
                    char: "c",
                    hex: false,
                }).toString(),
                "&#99;"
            );
        });

        it("single character with surrogate pairs; hex false", () => {
            assert.strictEqual(
                new XmlCharRef(undefined, true, {
                    char:
                        String.fromCharCode(0xdbff) +
                        String.fromCharCode(0xdc00),
                }).toString(),
                "&#1113088;"
            );
        });

        it("single character not allowed in XML; hex false", () => {
            assert.throws(
                () =>
                    new XmlCharRef(undefined, true, {
                        char: String.fromCharCode(0x0001),
                    })
            );
            assert.doesNotThrow(() => {
                assert.strictEqual(
                    new XmlCharRef(undefined, false, {
                        char: String.fromCharCode(0x0001),
                    }).toString(),
                    "&#1;"
                );
            });
        });

        it("multiple characters; hex false", () => {
            assert.throws(
                () =>
                    new XmlCharRef(undefined, true, {
                        char: "bc",
                    })
            );
            assert.doesNotThrow(() => {
                assert.strictEqual(
                    new XmlCharRef(undefined, false, {
                        char: "bc",
                    }).toString(),
                    "&#98;"
                );
            });
        });
    });

    it("#up", () => {
        assert.strictEqual(
            new XmlCharRef(undefined, false, {char: "a"}).up(),
            undefined
        );
    });
});
