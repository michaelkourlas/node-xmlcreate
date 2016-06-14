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

import {typeCheck} from "type-check";

import * as validate from "../utils/validate";

import XmlNode from "./XmlNode";

/**
 * Represents an XML character reference.
 *
 * An XML character reference is structured as follows, where
 * <code>{dec}</code> is the decimal representation code point corresponding to
 * a particular Unicode character:
 *
 * <code>&amp;#{num};</code>
 *
 * The corresponding hexadecimal version is structured as follows, where
 * <code>{hex}</code> is the hexadecimal representation code point corresponding
 * to a particular Unicode character:
 *
 * <code>&amp;#x{hex};</code>
 *
 * Unicode characters outside of the Basic Multilingual Plane are represented
 * using a surrogate pair consisting of two character references.
 *
 * The <code>{dec}</code> and <code>{hex}</code> values are defined by the
 * <code>{char}</code> and <code>{hex}</code> properties of this node; the
 * former is the character to be represented while the latter indicates whether
 * the decimal or hexadecimal representation should be used.
 *
 * XmlCharRef nodes cannot have any children.
 */
export default class XmlCharRef extends XmlNode {
    /**
     * Initializes a new instance of the {@link XmlCharRef} class.
     *
     * @param {string} char   The character to represent using the reference.
     * @param {boolean} [hex] Whether to use the hexadecimal or decimal
     *                        representation for the reference. If left
     *                        undefined, decimal is the default.
     */
    constructor(char, hex = false) {
        super();
        this.char = char;
        this.hex = hex;
    }

    /**
     * Gets the character to represent using the reference.
     *
     * @returns {string} The character to represent using the reference.
     */
    get char() {
        return this._char;
    }

    /**
     * Sets the character to represent using the reference.
     *
     * @param {string} char The character to represent using the reference.
     */
    set char(char) {
        if (!typeCheck("String", char)) {
            throw new TypeError("char should be a string");
        } else if (!validate.singleChar(char)) {
            throw new Error("char should contain a single character, and this" +
                " character should be allowed in XML");
        }
        this._char = char;
    }

    /**
     * Gets whether or not to use the hexadecimal or decimal representation for
     * the reference.
     *
     * @returns {boolean} Whether or not to use the hexadecimal or decimal
     *                    representation for the reference.
     */
    get hex() {
        return this._hex;
    }

    /**
     * Sets whether or not to use the hexadecimal or decimal representation for
     * the reference.
     *
     * @param {boolean} hex Whether or not to use the hexadecimal or decimal
     *                      representation for the reference.
     */
    set hex(hex) {
        if (!typeCheck("Boolean", hex)) {
            throw new TypeError("hex should be a boolean");
        }
        this._hex = hex;
    }

    /**
     * Throws an exception since {@link XmlCharRef} nodes cannot have any
     * children.
     */
    children() {
        throw new Error("XmlCharRef nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlCharRef} nodes cannot have any
     * children.
     */
    insertChild(node, index) {
        throw new Error("XmlCharRef nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlCharRef} nodes cannot have any
     * children.
     */
    removeChild(node) {
        throw new Error("XmlCharRef nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlCharRef} nodes cannot have any
     * children.
     */
    removeChildAtIndex(index) {
        throw new Error("XmlCharRef nodes cannot have children");
    }

    /**
     * Returns an XML string representation of this node.
     *
     * @param {StringOptions} [options] Formatting options for the string
     *                                  representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    toString(options = {}) {
        let char;
        if (this.char.length === 1) {
            char = this.char.charCodeAt(0);
        } else {
            char = String.codePointAt(this.char, 0);
        }

        if (this.hex) {
            return "&#x" + char.toString(16) + ";";
        } else {
            return "&#" + char + ";";
        }
    }
}
