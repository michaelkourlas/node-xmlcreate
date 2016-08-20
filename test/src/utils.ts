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

import {getCodePoint, isInteger, isType} from "../../lib/utils";
import {assert} from "chai";

describe("utils", () => {
    describe("#getCodePoint", () => {
        it("should return the Unicode code point at the specified index in a"
           + " string", () => {
            assert.strictEqual(getCodePoint("abc", 1), 0x62);
            assert.strictEqual(getCodePoint("a" + String.fromCharCode(0xd801)
                                            + String.fromCharCode(0xdc37)
                                            + "bc", 1), 0x10437);
        });
    });

    describe("#isInteger", () => {
        it("should return true if the specified value is an integer", () => {
            assert.isTrue(isInteger(3));
        });

        it("should return false if the specified value is not an"
           + " integer", () => {
            assert.isFalse(isInteger(3.2));
            /* tslint:disable:no-construct */
            // noinspection JSPrimitiveTypeWrapperUsage
            assert.isFalse(isInteger(<any> new Number(7)));
            /* tslint:enable:no-construct */
            assert.isFalse(isInteger(undefined));
            assert.isFalse(isInteger(null));
            assert.isFalse(isInteger(<any> "blah"));
        });
    });

    describe("#isType", () => {
        it("should return true if the specified value is of the specified"
           + " types", () => {
            assert.isTrue(isType(true, "Boolean"));
            assert.isTrue(isType(true, "String", "Boolean"));
            assert.isTrue(isType(undefined, "Undefined"));
            assert.isTrue(isType(null, "Null"));
            assert.isTrue(isType("blah", "String"));
        });

        it("should return false if the specified value is not of the specified"
           + " types", () => {
            assert.isFalse(isType("blah", "Boolean"));
            assert.isFalse(isType(true, "String", "Undefined"));
        });
    });
});
