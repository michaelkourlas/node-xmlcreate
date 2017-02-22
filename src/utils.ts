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

/**
 * @private
 */
export function isString(val: any): val is string {
    return Object.prototype.toString.call(val) === "[object String]";
}

/**
 * @private
 */
export function isNumber(val: any): val is number {
    return Object.prototype.toString.call(val) === "[object Number]";
}

/**
 * @private
 */
export function isBoolean(val: any): val is boolean {
    return Object.prototype.toString.call(val) === "[object Boolean]";
}

/**
 * @private
 */
export function isUndefined(val: any): val is undefined {
    return Object.prototype.toString.call(val) === "[object Undefined]";
}

/**
 * @private
 */
export function isObject(val: any): val is Object {
    return Object.prototype.toString.call(val) === "[object Object]";
}

/**
 * @private
 */
export function isArray(val: any): val is any[] {
    return Object.prototype.toString.call(val) === "[object Array]";
}

/**
 * @private
 */
export function isInteger(value: any): boolean {
    return typeof value === "number" &&
           isFinite(value) &&
           Math.floor(value) === value;
}

/**
 * Retrieve the Unicode code point at the specified index in the specified
 * string.
 *
 * @param str The string from which to retrieve the Unicode code point.
 * @param index The specified index.
 *
 * @returns The Unicode code point at the specified position.
 *
 * @private
 */
export function getCodePoint(str: string, index: number): number {
    if (index < 0 || index >= str.length) {
        throw new Error("invalid index for specified string");
    }
    const first = str.charCodeAt(index);
    if (first >= 0xD800 && first <= 0xDBFF && str.length > index + 1) {
        const second = str.charCodeAt(index + 1);
        if (second >= 0xDC00 && second <= 0xDFFF) {
            return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
        }
    }
    return first;
}
