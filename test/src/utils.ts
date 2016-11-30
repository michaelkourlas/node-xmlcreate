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
    getCodePoint,
    isArray,
    isBoolean,
    isInteger,
    isNumber,
    isObject,
    isString,
    isUndefined
} from "../../lib/utils";

describe("utils", () => {
    describe("#isString", () => {
        it("should return true for strings", () => {
            assert.isTrue(isString("test"));
            assert.isTrue(isString(""));
            /* tslint:disable no-construct */
            // noinspection JSPrimitiveTypeWrapperUsage
            assert.isTrue(isString(new String("test")));
            /* tslint:enable no-construct */
        });

        it("should return false for non-strings", () => {
            assert.isFalse(isString(3));
            assert.isFalse(isString(false));
            assert.isFalse(isString(null));
            assert.isFalse(isString(undefined));
        });
    });

    describe("#isNumber", () => {
        it("should return true for numbers", () => {
            assert.isTrue(isNumber(3));
            assert.isTrue(isNumber(3.2));
            /* tslint:disable no-construct */
            // noinspection JSPrimitiveTypeWrapperUsage
            assert.isTrue(isNumber(new Number(3)));
            /* tslint:enable no-construct */
        });

        it("should return false for non-numbers", () => {
            assert.isFalse(isNumber("test"));
            assert.isFalse(isNumber(false));
            assert.isFalse(isNumber(null));
            assert.isFalse(isNumber(undefined));
        });
    });

    describe("#isBoolean", () => {
        it("should return true for booleans", () => {
            assert.isTrue(isBoolean(true));
            /* tslint:disable no-construct */
            // noinspection JSPrimitiveTypeWrapperUsage
            assert.isTrue(isBoolean(new Boolean(false)));
            /* tslint:enable no-construct */
        });

        it("should return false for non-booleans", () => {
            assert.isFalse(isBoolean("test"));
            assert.isFalse(isBoolean(3));
            assert.isFalse(isBoolean(null));
            assert.isFalse(isBoolean(undefined));
        });
    });

    describe("#isUndefined", () => {
        it("should return true for undefined", () => {
            assert.isTrue(isUndefined(undefined));
        });

        it("should return false for values that are not undefined", () => {
            assert.isFalse(isUndefined("test"));
            assert.isFalse(isUndefined(3));
            assert.isFalse(isUndefined(null));
            assert.isFalse(isUndefined(true));
        });
    });

    describe("#isObject", () => {
        it("should return true for objects", () => {
            assert.isTrue(isObject({a: "b"}));
            assert.isTrue(isObject({}));
            assert.isTrue(isObject(new (<any> (() => 0))()));
        });

        it("should return false for values that are not objects", () => {
            assert.isFalse(isObject("test"));
            assert.isFalse(isObject(3));
            assert.isFalse(isObject(undefined));
            assert.isFalse(isObject(true));
            assert.isFalse(isObject(null));
        });
    });

    describe("#isArray", () => {
        it("should return true for arrays", () => {
            assert.isTrue(isArray(["a", "b"]));
            assert.isTrue(isArray(["a", 3]));
            assert.isTrue(isArray([]));
        });

        it("should return false for values that are not arrays", () => {
            assert.isFalse(isArray("test"));
            assert.isFalse(isArray(3));
            assert.isFalse(isArray(undefined));
            assert.isFalse(isArray(true));
            assert.isFalse(isArray(null));
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

    describe("#getCodePoint", () => {
        it("should return the Unicode code point at the specified index in a"
           + " string", () => {
            assert.strictEqual(getCodePoint("abc", 1), 0x62);
            assert.strictEqual(getCodePoint("a" + String.fromCharCode(0xd801)
                                            + String.fromCharCode(0xdc37)
                                            + "bc", 1), 0x10437);
        });
    });
});
