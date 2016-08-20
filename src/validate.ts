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
 * Verifies that the specified string only contains characters permitted by the
 * XML specification.
 *
 * @param {string} str The string to validate.
 *
 * @returns {boolean} Whether the specified string only contains characters
 *                    permitted by the XML specification.
 *
 * @private
 */
export function validateChar(str: string): boolean {
    let charRegex = "\\u0009|\\u000A|\\u000D|[\\u0020-\\uD7FF]";
    let surrogateCharRegex = "[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]";

    return new RegExp("^((" + charRegex + ")|(" + surrogateCharRegex + "))*$")
        .test(str);
}

/**
 * Verifies that the specified string only contains a single character, and
 * that this character is permitted by the XML specification.
 *
 * @param {string} str The string to validate.
 *
 * @returns {boolean} Whether the specified string only contains a single
 *                    character, and that this character is permitted by the
 *                    XML specification.
 *
 * @private
 */
export function validateSingleChar(str: string): boolean {
    if (str.length === 1) {
        return new RegExp("^\\u0009|\\u000A|\\u000D|[\\u0020-\\uD7FF]$")
            .test(str);
    } else if (str.length === 2) {
        return new RegExp("^[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]$").test(str);
    } else {
        return false;
    }
}

/**
 * Verifies that the specified string only contains characters permitted by the
 * XML specification for names.
 *
 * @param {string} str The string to validate.
 *
 * @returns {boolean} Whether the specified string only contains characters
 *                    permitted by the XML specification for names.
 *
 * @private
 */
export function validateName(str: string): boolean {
    if (str.length === 0) {
        return false;
    }

    let nameStartChar = ":|[A-Z]|_|[a-z]|[\\u00C0-\\u00D6]|[\\u00D8-\\u00F6]"
                        + "|[\\u00F8-\\u02FF]|[\\u0370-\\u037D]"
                        + "|[\\u037F-\\u1FFF]|[\\u200C-\\u200D]"
                        + "|[\\u2070-\\u218F]|[\\u2C00-\\u2FEF]"
                        + "|[\\u3001-\\uD7FF]|[\\uF900-\\uFDCF]"
                        + "|[\\uFDF0-\\uFFFD]";
    let nameStartCharWithSurrogatePair = "[\\uD800-\\uDB7F][\\uDC00-\\uDFFF]";

    let nameChar = nameStartChar + "|-|\\.|[0-9]|\\u00B7|[\\u0300-\\u036F]" +
                   "|[\\u203F-\\u2040]";
    let nameCharWithSurrogatePair = nameChar + "|" +
                                    nameStartCharWithSurrogatePair;

    if (new RegExp("^" + nameStartChar + "$").test(str.charAt(0))) {
        if (str.length === 1) {
            return true;
        }
        return new RegExp("^(" + nameCharWithSurrogatePair + ")+$")
            .test(str.substr(1));
    } else if (str.length >= 2) {
        if (new RegExp("^" + nameStartCharWithSurrogatePair + "$")
                .test(str.substr(0, 2)))
        {
            if (str.length === 2) {
                return true;
            }
            return new RegExp("^(" + nameCharWithSurrogatePair + ")+$")
                .test(str.substr(2));
        }
    }

    return false;
}
