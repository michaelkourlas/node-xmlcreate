/**
 * Copyright (C) 2016-2019 Michael Kourlas
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
 * Returns true if the specified string only contains characters permitted by
 * the XML specification.
 */
export function validateChar(str: string): boolean {
    for (let i = 0; i < str.length; i++) {
        const firstChar = str.charCodeAt(i);
        if (
            firstChar === 0x9 ||
            firstChar === 0xa ||
            firstChar === 0xd ||
            (firstChar >= 0x20 && firstChar <= 0xd7ff) ||
            (firstChar >= 0xe000 && firstChar <= 0xfffd)
        ) {
            continue;
        }

        if (i + 1 === str.length) {
            return false;
        }

        // UTF-16 surrogate characters
        const secondChar = str.charCodeAt(i + 1);
        if (
            firstChar >= 0xd800 &&
            firstChar <= 0xdbff &&
            secondChar >= 0xdc00 &&
            secondChar <= 0xdfff
        ) {
            i++;
            continue;
        }

        return false;
    }

    return true;
}

/**
 * Returns a version of the specified string that only contains characters
 * permitted by the XML specification, with invalid characters replaced
 * by the replacement character U+FFFD.
 */
export function fixChar(str: string): string {
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
        const firstChar = str.charCodeAt(i);
        if (
            firstChar === 0x9 ||
            firstChar === 0xa ||
            firstChar === 0xd ||
            (firstChar >= 0x20 && firstChar <= 0xd7ff) ||
            (firstChar >= 0xe000 && firstChar <= 0xfffd)
        ) {
            newStr += str[i];
            continue;
        }

        if (i + 1 === str.length) {
            newStr += "\uFFFD";
            return newStr;
        }

        // UTF-16 surrogate characters
        const secondChar = str.charCodeAt(i + 1);
        if (
            firstChar >= 0xd800 &&
            firstChar <= 0xdbff &&
            secondChar >= 0xdc00 &&
            secondChar <= 0xdfff
        ) {
            newStr += str[i] + str[i + 1];
            i++;
            continue;
        }

        newStr += "\uFFFD";
    }

    return newStr;
}

/**
 * Returns true if the specified string only contains a single character, and
 * that this character is permitted by the XML specification.
 */
export function validateSingleChar(str: string): boolean {
    if (str.length === 0) {
        return false;
    }

    const firstChar = str.charCodeAt(0);
    if (str.length === 1) {
        return (
            firstChar === 0x9 ||
            firstChar === 0xa ||
            firstChar === 0xd ||
            (firstChar >= 0x20 && firstChar <= 0xd7ff) ||
            (firstChar >= 0xe000 && firstChar <= 0xfffd)
        );
    }

    if (str.length !== 2) {
        return false;
    }

    // UTF-16 surrogate characters
    const secondChar = str.charCodeAt(1);
    return (
        firstChar >= 0xd800 &&
        firstChar <= 0xdbff &&
        secondChar >= 0xdc00 &&
        secondChar <= 0xdfff
    );
}

/**
 * Returns true if the specified string only contains characters permitted by
 * the XML specification for names.
 */
export function validateName(str: string): boolean {
    if (str.length === 0) {
        return false;
    }

    const initialFirstChar = str.charCodeAt(0);
    const initialFirstCharMatch =
        initialFirstChar === 0x3a ||
        initialFirstChar === 0x5f ||
        (initialFirstChar >= 0x41 && initialFirstChar <= 0x5a) ||
        (initialFirstChar >= 0x61 && initialFirstChar <= 0x7a) ||
        (initialFirstChar >= 0xc0 && initialFirstChar <= 0xd6) ||
        (initialFirstChar >= 0xd8 && initialFirstChar <= 0xf6) ||
        (initialFirstChar >= 0xf8 && initialFirstChar <= 0x2ff) ||
        (initialFirstChar >= 0x370 && initialFirstChar <= 0x37d) ||
        (initialFirstChar >= 0x37f && initialFirstChar <= 0x1fff) ||
        (initialFirstChar >= 0x200c && initialFirstChar <= 0x200d) ||
        (initialFirstChar >= 0x2070 && initialFirstChar <= 0x218f) ||
        (initialFirstChar >= 0x2c00 && initialFirstChar <= 0x2fef) ||
        (initialFirstChar >= 0x3001 && initialFirstChar <= 0xd7ff) ||
        (initialFirstChar >= 0xf900 && initialFirstChar <= 0xfdcf) ||
        (initialFirstChar >= 0xfdf0 && initialFirstChar <= 0xfffd);
    if (str.length === 1) {
        return initialFirstCharMatch;
    }

    // UTF-16 surrogate characters
    const initialSecondChar = str.charCodeAt(1);
    const initialSecondCharMatch =
        initialFirstChar >= 0xd800 &&
        initialFirstChar <= 0xdb7f &&
        initialSecondChar >= 0xdc00 &&
        initialSecondChar <= 0xdfff;
    if (!initialFirstCharMatch && !initialSecondCharMatch) {
        return false;
    }

    const start = initialSecondCharMatch ? 2 : 1;
    for (let i = start; i < str.length; i++) {
        const firstChar = str.charCodeAt(i);
        if (
            firstChar === 0x3a ||
            firstChar === 0x5f ||
            firstChar === 0x2d ||
            firstChar === 0x2e ||
            firstChar === 0xb7 ||
            (firstChar >= 0x30 && firstChar <= 0x39) ||
            (firstChar >= 0x41 && firstChar <= 0x5a) ||
            (firstChar >= 0x61 && firstChar <= 0x7a) ||
            (firstChar >= 0xc0 && firstChar <= 0xd6) ||
            (firstChar >= 0xd8 && firstChar <= 0xf6) ||
            (firstChar >= 0xf8 && firstChar <= 0x2ff) ||
            (firstChar >= 0x300 && firstChar <= 0x36f) ||
            (firstChar >= 0x370 && firstChar <= 0x37d) ||
            (firstChar >= 0x37f && firstChar <= 0x1fff) ||
            (firstChar >= 0x200c && firstChar <= 0x200d) ||
            (firstChar >= 0x203f && firstChar <= 0x2040) ||
            (firstChar >= 0x2070 && firstChar <= 0x218f) ||
            (firstChar >= 0x2c00 && firstChar <= 0x2fef) ||
            (firstChar >= 0x3001 && firstChar <= 0xd7ff) ||
            (firstChar >= 0xf900 && firstChar <= 0xfdcf) ||
            (firstChar >= 0xfdf0 && firstChar <= 0xfffd)
        ) {
            continue;
        }

        if (i + 1 === str.length) {
            return false;
        }

        // UTF-16 surrogate characters
        const secondChar = str.charCodeAt(i + 1);
        if (
            firstChar >= 0xd800 &&
            firstChar <= 0xdb7f &&
            secondChar >= 0xdc00 &&
            secondChar <= 0xdfff
        ) {
            i++;
            continue;
        }

        return false;
    }

    return true;
}

/**
 * Returns a version of the specified string that only contains characters
 * permitted by the XML specification for names, with invalid characters
 * replaced by the replacement character U+FFFD.
 */
export function fixName(str: string): string {
    let newStr = "";

    if (str.length === 0) {
        return newStr;
    }

    const initialFirstChar = str.charCodeAt(0);
    const initialFirstCharMatch =
        initialFirstChar === 0x3a ||
        initialFirstChar === 0x5f ||
        (initialFirstChar >= 0x41 && initialFirstChar <= 0x5a) ||
        (initialFirstChar >= 0x61 && initialFirstChar <= 0x7a) ||
        (initialFirstChar >= 0xc0 && initialFirstChar <= 0xd6) ||
        (initialFirstChar >= 0xd8 && initialFirstChar <= 0xf6) ||
        (initialFirstChar >= 0xf8 && initialFirstChar <= 0x2ff) ||
        (initialFirstChar >= 0x370 && initialFirstChar <= 0x37d) ||
        (initialFirstChar >= 0x37f && initialFirstChar <= 0x1fff) ||
        (initialFirstChar >= 0x200c && initialFirstChar <= 0x200d) ||
        (initialFirstChar >= 0x2070 && initialFirstChar <= 0x218f) ||
        (initialFirstChar >= 0x2c00 && initialFirstChar <= 0x2fef) ||
        (initialFirstChar >= 0x3001 && initialFirstChar <= 0xd7ff) ||
        (initialFirstChar >= 0xf900 && initialFirstChar <= 0xfdcf) ||
        (initialFirstChar >= 0xfdf0 && initialFirstChar <= 0xfffd);
    if (str.length === 1) {
        if (initialFirstCharMatch) {
            newStr = str[0];
        } else {
            newStr = "\uFFFD";
        }
        return newStr;
    }

    // UTF-16 surrogate characters
    const initialSecondChar = str.charCodeAt(1);
    const initialSecondCharMatch =
        initialFirstChar >= 0xd800 &&
        initialFirstChar <= 0xdb7f &&
        initialSecondChar >= 0xdc00 &&
        initialSecondChar <= 0xdfff;
    if (initialSecondCharMatch) {
        newStr = str[0] + str[1];
    } else if (initialFirstCharMatch) {
        newStr = str[0];
    } else {
        newStr = "\uFFFD";
    }

    const start = initialSecondCharMatch ? 2 : 1;
    for (let i = start; i < str.length; i++) {
        const firstChar = str.charCodeAt(i);
        if (
            firstChar === 0x3a ||
            firstChar === 0x5f ||
            firstChar === 0x2d ||
            firstChar === 0x2e ||
            firstChar === 0xb7 ||
            (firstChar >= 0x30 && firstChar <= 0x39) ||
            (firstChar >= 0x41 && firstChar <= 0x5a) ||
            (firstChar >= 0x61 && firstChar <= 0x7a) ||
            (firstChar >= 0xc0 && firstChar <= 0xd6) ||
            (firstChar >= 0xd8 && firstChar <= 0xf6) ||
            (firstChar >= 0xf8 && firstChar <= 0x2ff) ||
            (firstChar >= 0x300 && firstChar <= 0x36f) ||
            (firstChar >= 0x370 && firstChar <= 0x37d) ||
            (firstChar >= 0x37f && firstChar <= 0x1fff) ||
            (firstChar >= 0x200c && firstChar <= 0x200d) ||
            (firstChar >= 0x203f && firstChar <= 0x2040) ||
            (firstChar >= 0x2070 && firstChar <= 0x218f) ||
            (firstChar >= 0x2c00 && firstChar <= 0x2fef) ||
            (firstChar >= 0x3001 && firstChar <= 0xd7ff) ||
            (firstChar >= 0xf900 && firstChar <= 0xfdcf) ||
            (firstChar >= 0xfdf0 && firstChar <= 0xfffd)
        ) {
            newStr += str[i];
            continue;
        }

        if (i + 1 === str.length) {
            newStr += "\uFFFD";
            return newStr;
        }

        // UTF-16 surrogate characters
        const secondChar = str.charCodeAt(i + 1);
        if (
            firstChar >= 0xd800 &&
            firstChar <= 0xdb7f &&
            secondChar >= 0xdc00 &&
            secondChar <= 0xdfff
        ) {
            newStr += str[i] + str[i + 1];
            i++;
            continue;
        }

        newStr += "\uFFFD";
    }

    return newStr;
}

/**
 * Returns true if the specified value is undefined.
 */
export function isUndefined(val: unknown): val is undefined {
    return Object.prototype.toString.call(val) === "[object Undefined]";
}
