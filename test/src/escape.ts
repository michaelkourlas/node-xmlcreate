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
    escapeAmpersands,
    escapeDoubleQuotes,
    escapeLeftAngleBrackets,
    escapeSingleQuotes
} from "../../lib/escape";

describe("escape", () => {
    describe("#escapeAmpersands", () => {
        it("should escape all ampersands in a string", () => {
            assert.strictEqual(escapeAmpersands("&"), "&amp;");
            assert.strictEqual(escapeAmpersands("abc&"), "abc&amp;");
            assert.strictEqual(escapeAmpersands("&abc"), "&amp;abc");
            assert.strictEqual(escapeAmpersands("&a&bc&"),
                               "&amp;a&amp;bc&amp;");
            assert.strictEqual(escapeAmpersands("&amp;"), "&amp;amp;");
        });
    });

    describe("#escapeLeftAngleBrackets", () => {
        it("should escape all left angle brackets in a string", () => {
            assert.strictEqual(escapeLeftAngleBrackets("<"), "&lt;");
            assert.strictEqual(escapeLeftAngleBrackets("abc<"), "abc&lt;");
            assert.strictEqual(escapeLeftAngleBrackets("<abc"), "&lt;abc");
            assert.strictEqual(escapeLeftAngleBrackets("<a<bc<"),
                               "&lt;a&lt;bc&lt;");
        });
    });

    describe("#escapeSingleQuotes", () => {
        it("should escape all single quotes in a string", () => {
            assert.strictEqual(escapeSingleQuotes("'"), "&apos;");
            assert.strictEqual(escapeSingleQuotes("abc'"), "abc&apos;");
            assert.strictEqual(escapeSingleQuotes("'abc"), "&apos;abc");
            assert.strictEqual(escapeSingleQuotes("'a'bc'"),
                               "&apos;a&apos;bc&apos;");
        });
    });

    describe("#escapeDoubleQuotes", () => {
        it("should escape all double quotes in a string", () => {
            assert.strictEqual(escapeDoubleQuotes("\""), "&quot;");
            assert.strictEqual(escapeDoubleQuotes("abc\""), "abc&quot;");
            assert.strictEqual(escapeDoubleQuotes("\"abc"), "&quot;abc");
            assert.strictEqual(escapeDoubleQuotes("\"a\"bc\""),
                               "&quot;a&quot;bc&quot;");
        });
    });
});
