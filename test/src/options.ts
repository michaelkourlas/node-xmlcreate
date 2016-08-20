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

import {
    validateDeclarationOptions,
    validateStringOptions,
} from "../../lib/options";
import {assert} from "chai";

describe("options", () => {
    describe("#validateDeclarationOptions", () => {
        it("should return the specified options object if all options are" +
           " specified and valid", () => {
            let options = {
                encoding: "UTF-8",
                standalone: "yes",
                version: "1.0",
            };
            assert.strictEqual(validateDeclarationOptions(options), options);

            options = {
                encoding: "UTF-16",
                standalone: "no",
                version: "1.1",
            };
            assert.strictEqual(validateDeclarationOptions(options), options);

            options = {
                encoding: undefined,
                standalone: undefined,
                version: "1.0",
            };
            assert.strictEqual(validateDeclarationOptions(options), options);
        });

        it("should throw an error if the specified options object contains" +
           " invalid options", () => {
            let options: any = {
                encoding: null,
            };
            assert.throws(() => validateDeclarationOptions(options));

            options = {
                standalone: null,
            };
            assert.throws(() => validateDeclarationOptions(options));

            options = {
                version: null,
            };
            assert.throws(() => validateDeclarationOptions(options));
        });

        it("should return a validated version of the specified options with" +
           " undefined values replaced with appropriate defaults if not all" +
           " options are specified", () => {
            let options = {};
            assert.strictEqual(
                JSON.stringify(validateDeclarationOptions(options)),
                JSON.stringify({version: "1.0"}));
        });
    });

    describe("#validateStringOptions", () => {
        it("should return the specified options object if all options are" +
           " specified and valid", () => {
            let options = {
                doubleQuotes: false,
                indent: "    ",
                newline: "\n",
                pretty: true,
            };
            assert.strictEqual(validateStringOptions(options), options);

            options = {
                doubleQuotes: true,
                indent: "\t",
                newline: "\r\n",
                pretty: false,
            };
            assert.strictEqual(validateStringOptions(options), options);
        });

        it("should throw an error if the specified options object contains" +
           " invalid options", () => {
            let options: any = {
                doubleQuotes: null,
            };
            assert.throws(() => validateStringOptions(options));

            options = {
                indent: null,
            };
            assert.throws(() => validateStringOptions(options));

            options = {
                newline: null,
            };
            assert.throws(() => validateStringOptions(options));

            options = {
                pretty: null,
            };
            assert.throws(() => validateStringOptions(options));
        });

        it("should return a validated version of the specified options with" +
           " undefined values replaced with appropriate defaults if not all" +
           " options are specified", () => {
            let options = {};
            assert.strictEqual(JSON.stringify(validateStringOptions(options)),
                               JSON.stringify({
                                                  doubleQuotes: false,
                                                  indent: "    ",
                                                  newline: "\n",
                                                  pretty: true,
                                              })
            );
        });
    });
});
