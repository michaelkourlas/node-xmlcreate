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
import {StringOptions} from "../../lib/options";

describe("options", () => {
    describe("#StringOptions", () => {
        it("normal options", () => {
            const options = {
                doubleQuotes: false,
                indent: "    ",
                newline: "\n",
                pretty: true
            };
            assert.deepEqual(new StringOptions(options), options);
        });

        it("custom options", () => {
            const options = {
                doubleQuotes: true,
                indent: "\t",
                newline: "\r\n",
                pretty: false
            };
            assert.deepEqual(new StringOptions(options), options);
        });

        it("default options", () => {
            const options = {};
            assert.deepEqual(new StringOptions(options), {
                doubleQuotes: false,
                indent: "    ",
                newline: "\n",
                pretty: true
            });
        });
    });
});
