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
    IDeclarationOptions,
    IStringOptions,
    validateDeclarationOptions,
    validateStringOptions
} from "../options";
import {isType} from "../utils";
import XmlNode from "./XmlNode";

/**
 * Represents an XML declaration.
 *
 * An XML declaration is structured as follows, where `{version}` is the XML
 * version, `{encoding}` is the encoding of the document, and `{standalone}`
 * is either "yes" or "no", depending on whether the document may contain
 * external markup declarations:
 *
 * ```xml
 * <?xml version="{version}" encoding="{encoding}" standalone="{standalone}"?>
 * ```
 *
 * The `{version}`, `{encoding}`, and `{standalone}` values are properties of
 * this node.
 *
 * XmlDecl nodes cannot have any children.
 */
export default class XmlDecl extends XmlNode {
    private _encoding: string;
    private _standalone: string;
    private _version: string;

    /**
     * Initializes a new instance of the {@link XmlDecl} class.
     *
     * @param {IDeclarationOptions} [options] The options associated with the
     *     XML declaration.
     */
    constructor(options: IDeclarationOptions = {}) {
        super();
        validateDeclarationOptions(options);
        this.encoding = options.encoding;
        this.standalone = options.standalone;
        this.version = options.version;
    }

    /**
     * Gets the XML encoding to be included in the declaration.
     *
     * @returns {string} The XML encoding to be included in the declaration.
     *                   This value may be undefined.
     */
    get encoding(): string {
        return this._encoding;
    }

    /**
     * Sets the XML encoding to be included in the declaration.
     *
     * @param encoding {string} The XML encoding to be included in the
     *                          declaration. This value must be a valid
     *                          encoding. If left undefined, no encoding is
     *                          included.
     */
    set encoding(encoding: string) {
        if (isType(encoding, "String")) {
            if (!/^[A-Za-z][A-Za-z0-9._-]*$/.test(encoding)) {
                throw new Error("encoding should be a valid XML encoding");
            }
        } else if (!isType(encoding, "Undefined")) {
            throw new TypeError("name should be a string or undefined");
        }
        this._encoding = encoding;
    }

    /**
     * Gets the XML standalone attribute to be included in the declaration.
     *
     * @returns {string} The XML standalone attribute to be included in the
     *                   declaration. This value may be undefined.
     */
    get standalone(): string {
        return this._standalone;
    }

    /**
     * Sets the XML standalone attribute to be included in the declaration.
     *
     * @param {string} standalone The XML standalone attribute to be included.
     *                            This value must be "yes" or "no". If left
     *                            undefined, no standalone attribute is
     *                            included.
     */
    set standalone(standalone: string) {
        if (isType(standalone, "String")) {
            if (!/^(yes|no)$/.test(standalone)) {
                throw new Error("standalone should be either the string"
                                + " 'yes' or the string 'no'");
            }
        } else if (!isType(standalone, "Undefined")) {
            throw new TypeError("standalone should be a string or undefined");
        }
        this._standalone = standalone;
    }

    /**
     * Gets the XML version to be included in the declaration.
     *
     * @returns {string} The XML version to tbe included in the declaration.
     */
    get version(): string {
        return this._version;
    }

    /**
     * Sets the XML version to be included in the declaration.
     *
     * @param {string} version The XML version to be included in the
     *                         declaration. This value must be a valid XML
     *                         version number. If left undefined, the default
     *                         version is "1.0".
     */
    set version(version: string) {
        if (!isType(version, "String")) {
            throw new TypeError("version should be a string");
        } else if (!/^1\.[0-9]+$/.test(version)) {
            throw new Error("version should be a valid XML version");
        }
        this._version = version;
    }

    /**
     * Throws an exception since {@link XmlDecl} nodes cannot have any
     * children.
     */
    public children(): XmlNode[] {
        throw new Error("XmlDecl nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlDecl} nodes cannot have any
     * children.
     */
    public insertChild(node: XmlNode, index?: number): XmlNode {
        throw new Error("XmlDecl nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlDecl} nodes cannot have any
     * children.
     */
    public removeChild(node: XmlNode): boolean {
        throw new Error("XmlDecl nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlDecl} nodes cannot have any
     * children.
     */
    public removeChildAtIndex(index: number): XmlNode {
        throw new Error("XmlDecl nodes cannot have children");
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
        validateStringOptions(options);

        let quote = options.doubleQuotes ? '"' : "'";
        let str = "<?xml version=" + quote + this.version + quote;
        if (isType(this.encoding, "String")) {
            str += " encoding=" + quote + this.encoding + quote;
        }
        if (isType(this.standalone, "String")) {
            str += " standalone=" + quote + this.standalone + quote;
        }
        str += "?>";
        return str;
    }
}
