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

import * as escape from "../../lib/utils/escape";

describe("escape", () => {
    describe("#ampersands", () => {
         it("should escape all ampersands in a string", () => {
             assert.strictEqual(escape.ampersands("&"), "&amp;");
             assert.strictEqual(escape.ampersands("abc&"), "abc&amp;");
             assert.strictEqual(escape.ampersands("&abc"), "&amp;abc");
             assert.strictEqual(escape.ampersands("&a&bc&"),
                 "&amp;a&amp;bc&amp;");
             assert.strictEqual(escape.ampersands("&amp;"), "&amp;amp;");
         });
    });

    describe("#leftAngleBrackets", () => {
        it("should escape all left angle brackets in a string", () => {
            assert.strictEqual(escape.leftAngleBrackets("<"), "&lt;");
            assert.strictEqual(escape.leftAngleBrackets("abc<"), "abc&lt;");
            assert.strictEqual(escape.leftAngleBrackets("<abc"), "&lt;abc");
            assert.strictEqual(escape.leftAngleBrackets("<a<bc<"),
                "&lt;a&lt;bc&lt;");
        });
    });

    describe("#singleQuotes", () => {
        it("should escape all single quotes in a string", () => {
            assert.strictEqual(escape.singleQuotes("'"), "&apos;");
            assert.strictEqual(escape.singleQuotes("abc'"), "abc&apos;");
            assert.strictEqual(escape.singleQuotes("'abc"), "&apos;abc");
            assert.strictEqual(escape.singleQuotes("'a'bc'"),
                "&apos;a&apos;bc&apos;");
        });
    });

    describe("#doubleQuotes", () => {
        it("should escape all double quotes in a string", () => {
            assert.strictEqual(escape.doubleQuotes("\""), "&quot;");
            assert.strictEqual(escape.doubleQuotes("abc\""), "abc&quot;");
            assert.strictEqual(escape.doubleQuotes("\"abc"), "&quot;abc");
            assert.strictEqual(escape.doubleQuotes("\"a\"bc\""),
                "&quot;a&quot;bc&quot;");
        });
    });
});
