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
 * Retrieve the Unicode code point at the specified index in the specified
 * string.
 *
 * @param {string} str The string from which to retrieve the Unicode code
 *                     point.
 * @param {number} index The specified index.
 *
 * @returns {number} The Unicode code point at the specified position.
 *
 * @private
 */
export function getCodePoint(str: string, index: number): number {
    let size = str.length;
    if (index < 0 || index >= size) {
        return undefined;
    }
    let first = str.charCodeAt(index);
    if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
        let second = str.charCodeAt(index + 1);
        if (second >= 0xDC00 && second <= 0xDFFF) {
            return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
        }
    }
    return first;
}

/**
 * Determines whether a number is an integer.
 *
 * @param {number} value The number to check.
 *
 * @returns {boolean} Whether or not the number is an integer.
 *
 * @private
 */
export function isInteger(value: number): boolean {
    return typeof value === "number" &&
           isFinite(value) &&
           Math.floor(value) === value;
}

/**
 * Returns true if the specified value are of any of the specified types, as
 * determined by the Object.prototype.toString.call function.
 *
 * @param {*} val The specified value.
 * @param {...string[]} types The specified types.
 *
 * @returns {boolean} Whether or not the specified value are of any of the
 *                    specified types.
 *
 * @private
 */
export function isType(val: any, ...types: string[]): boolean {
    for (let type of types) {
        if (Object.prototype.toString.call(val) === "[object " + type + "]") {
            return true;
        }
    }
    return false;
}
