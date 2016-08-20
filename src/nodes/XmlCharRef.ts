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

import {IStringOptions} from "../options";
import {getCodePoint, isType} from "../utils";
import {validateSingleChar} from "../validate";
import XmlNode from "./XmlNode";

/**
 * Represents an XML character reference.
 *
 * An XML character reference is structured as follows, where `{dec}` is the
 * decimal representation code point corresponding to a particular Unicode
 * character:
 *
 * ```xml
 * &#{dec};
 * ```
 *
 * The corresponding hexadecimal version is structured as follows, where
 * `{hex}` is the hexadecimal representation code point corresponding to a
 * particular Unicode character:
 *
 * ```xml
 * &#x{hex};
 * ```
 *
 * Unicode characters outside of the Basic Multilingual Plane are represented
 * using a surrogate pair consisting of two character references.
 *
 * The `{dec}` and `{hex}` values are defined by the `char` and `hex`
 * properties of this node; the former is the character to be represented while
 * the latter indicates whether the decimal or hexadecimal representation
 * should be used.
 *
 * XmlCharRef nodes cannot have any children.
 */
export default class XmlCharRef extends XmlNode {
    private _char: string;
    private _hex: boolean;

    /**
     * Initializes a new instance of the {@link XmlCharRef} class.
     *
     * @param {string} char   The character to represent using the reference.
     * @param {boolean} [hex] Whether to use the hexadecimal or decimal
     *                        representation for the reference. If left
     *                        undefined, decimal is the default.
     */
    constructor(char: string, hex: boolean = false) {
        super();
        this.char = char;
        this.hex = hex;
    }

    /**
     * Gets the character to represent using the reference.
     *
     * @returns {string} The character to represent using the reference.
     */
    get char(): string {
        return this._char;
    }

    /**
     * Sets the character to represent using the reference.
     *
     * @param {string} char The character to represent using the reference.
     */
    set char(char: string) {
        if (!isType(char, "String")) {
            throw new TypeError("char should be a string");
        } else if (!validateSingleChar(char)) {
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
    get hex(): boolean {
        return this._hex;
    }

    /**
     * Sets whether or not to use the hexadecimal or decimal representation for
     * the reference.
     *
     * @param {boolean} hex Whether or not to use the hexadecimal or decimal
     *                      representation for the reference.
     */
    set hex(hex: boolean) {
        if (!isType(hex, "Boolean")) {
            throw new TypeError("hex should be a boolean");
        }
        this._hex = hex;
    }

    /**
     * Throws an exception since {@link XmlCharRef} nodes cannot have any
     * children.
     */
    public children(): XmlNode[] {
        throw new Error("XmlCharRef nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlCharRef} nodes cannot have any
     * children.
     */
    public insertChild(node: XmlNode, index?: number): XmlNode {
        throw new Error("XmlCharRef nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlCharRef} nodes cannot have any
     * children.
     */
    public removeChild(node: XmlNode): boolean {
        throw new Error("XmlCharRef nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlCharRef} nodes cannot have any
     * children.
     */
    public removeChildAtIndex(index: number): XmlNode {
        throw new Error("XmlCharRef nodes cannot have children");
    }

    /**
     * Returns an XML string representation of this node.
     *
     * @param {IStringOptions} [options] Formatting options for the string
     *                                  representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    public toString(options: IStringOptions = {}): string {
        let char: number;
        if (this.char.length === 1) {
            char = this.char.charCodeAt(0);
        } else {
            char = getCodePoint(this.char, 0);
        }

        if (this.hex) {
            return "&#x" + char.toString(16) + ";";
        } else {
            return "&#" + char + ";";
        }
    }
}
