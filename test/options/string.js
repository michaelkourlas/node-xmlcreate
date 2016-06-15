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

import * as declaration from "../../lib/options/string";

describe("string", () => {
    describe("#validate", () => {
        it("should return the specified options object if all options are" +
            " specified and valid", () => {
            let options = {
                doubleQuotes: false,
                indent: "    ",
                newline: "\n",
                pretty: true
            };
            assert.strictEqual(declaration.validate(options), options);

            options = {
                doubleQuotes: true,
                indent: "\t",
                newline: "\r\n",
                pretty: false
            };
            assert.strictEqual(declaration.validate(options), options);
        });

        it("should throw an error if the specified options object contains" +
            " invalid options", () => {
            let options = {
                doubleQuotes: null
            };
            assert.throws(() => declaration.validate(options));

            options = {
                indent: null
            };
            assert.throws(() => declaration.validate(options));

            options = {
                newline: null
            };
            assert.throws(() => declaration.validate(options));

            options = {
                pretty: null
            };
            assert.throws(() => declaration.validate(options));
        });

        it("should return a validated version of the specified options with" +
            " undefined values replaced with appropriate defaults if not all" +
            " options are specified", () => {
            let options = {};
            assert.strictEqual(JSON.stringify(declaration.validate(options)),
                JSON.stringify({
                    doubleQuotes: false,
                    indent: "    ",
                    newline: "\n",
                    pretty: true
                })
            );
        });
    });
});
