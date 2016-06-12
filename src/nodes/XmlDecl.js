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

import * as declarationOptions from "../options/declaration";
import * as stringOptions from "../options/string";

import XmlNode from "./XmlNode";

/**
 * Represents an XML declaration.
 *
 * An XML declaration is structured as follows, where <code>{version}</code> is
 * the XML version, <code>{encoding}</code> is the encoding of the document,
 * and <code>{standalone}</code> is either "yes" or "no", depending on whether
 * the document may contain external markup declarations:
 *
 * <code>&lt;?xml version="{version}" encoding="{encoding}"
 * standalone="{standalone}"?&gt;</code>
 *
 * The <code>{version}</code>, <code>{encoding}</code>, and
 * <code>{standalone}</code> values are properties of this node.
 *
 * XmlDecl nodes cannot have any children.
 */
export default class XmlDecl extends XmlNode {
    /**
     * Initializes a new instance of the {@link XmlDecl} class.
     *
     * @param {DeclarationOptions} [options] The options associated with the XML
     *                                       declaration.
     */
    constructor(options = {}) {
        super();
        declarationOptions.validate(options);
        this.encoding = options.encoding;
        this.standalone = options.standalone;
        this.version = options.version;
    }

    /**
     * Gets the XML encoding to be included in the declaration.
     *
     * @returns {string|undefined} The XML encoding to be included in the
     *                             declaration.
     */
    get encoding() {
        return this._encoding;
    }

    /**
     * Sets the XML encoding to be included in the declaration.
     *
     * @param encoding {string|undefined} The XML encoding to be included in
     *                                    the declaration. This value must be a
     *                                    valid encoding. If left undefined, no
     *                                    encoding is included.
     */
    set encoding(encoding) {
        if (typeCheck("String", encoding)) {
            if (!/^[A-Za-z][A-Za-z0-9._-]*$/.test(encoding)) {
                throw new Error("encoding should be a valid XML encoding");
            }
        } else if (!typeCheck("Undefined", encoding)) {
            throw new TypeError("name should be a string or undefined");
        }
        this._encoding = encoding;
    }

    /**
     * Gets the XML standalone attribute to be included in the declaration.
     *
     * @returns {string|undefined} The XML standalone attribute to be included
     *                             in the declaration.
     */
    get standalone() {
        return this._standalone;
    }

    /**
     * Sets the XML standalone attribute to be included in the declaration.
     *
     * @param {string|undefined} standalone The XML standalone attribute to be
     *                                      included. This value must be "yes"
     *                                      or "no". If left undefined, no
     *                                      standalone attribute is included.
     */
    set standalone(standalone) {
        if (typeCheck("String", standalone)) {
            if (!/^(yes|no)$/.test(standalone)) {
                throw new Error("standalone should be either the string" +
                    " 'yes' or the string 'no'");
            }
        } else if (!typeCheck("Undefined", standalone)) {
            throw new TypeError("standalone should be a string or undefined");
        }
        this._standalone = standalone;
    }

    /**
     * Gets the XML version to be included in the declaration.
     *
     * @returns {string} The XML version to tbe included in the declaration.
     */
    get version() {
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
    set version(version) {
        if (!typeCheck("String", version)) {
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
    children() {
        throw new Error("XmlDecl nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlDecl} nodes cannot have any
     * children.
     */
    insertChild(node, index) {
        throw new Error("XmlDecl nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlDecl} nodes cannot have any
     * children.
     */
    removeChild(node) {
        throw new Error("XmlDecl nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlDecl} nodes cannot have any
     * children.
     */
    removeChildAtIndex(index) {
        throw new Error("XmlDecl nodes cannot have children");
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
        stringOptions.validate(options);

        let quote = options.doubleQuotes ? '"' : "'";
        let str = "<?xml version=" + quote + this.version + quote;
        if (typeCheck("String", this.encoding)) {
            str += " encoding=" + quote + this.encoding + quote;
        }
        if (typeCheck("String", this.standalone)) {
            str += " standalone=" + quote + this.standalone + quote;
        }
        str += "?>";
        return str;
    }
}
