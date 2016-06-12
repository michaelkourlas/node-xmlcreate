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
 * Represents an XML entity declaration in a document type definition.
 *
 * An XML entity declaration is structured as follows, where <code>{text}</code>
 * is the text of the declaration:
 *
 * <code>&lt;!ENTITY {text}&gt;</code>
 *
 * The <code>{text}</code> value is a property of this node.
 *
 * XmlDtdEntity nodes cannot have any children.
 */
export default class XmlDtdEntity extends XmlNode {
    /**
     * Initializes a new instance of the {@link XmlDtdEntity} class.
     *
     * @param {string} text The text associated with the XML entity
     *                      declaration.
     */
    constructor(text) {
        super();
        this.text = text;
    }

    /**
     * Gets the text associated with the XML entity declaration.
     *
     * @return {string} The text associated with the XML entity declaration.
     */
    get text() {
        return this._text;
    }

    /**
     * Sets the text associated with the XML entity declaration.
     *
     * @param {string} text The text associated with the XML entity declaration.
     */
    set text(text) {
        if (!typeCheck("String", text)) {
            throw new TypeError("text should be a string");
        } else if (!validate.char(text)) {
            throw new Error("data should not contain characters" +
                " not allowed in XML");
        }
        this._text = text;
    }

    /**
     * Throws an exception since {@link XmlDtdEntity} nodes cannot have any
     * children.
     */
    children() {
        throw new Error("XmlDtdEntity nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlDtdEntity} nodes cannot have any
     * children.
     */
    insertChild(node, index) {
        throw new Error("XmlDtdEntity nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlDtdEntity} nodes cannot have any
     * children.
     */
    removeChild(node) {
        throw new Error("XmlDtdEntity nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlDtdEntity} nodes cannot have any
     * children.
     */
    removeChildAtIndex(index) {
        throw new Error("XmlDtdEntity nodes cannot have children");
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
        return "<!ENTITY " + this.text + ">";
    }
}
