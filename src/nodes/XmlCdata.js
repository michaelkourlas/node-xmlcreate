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
 * Represents an XML CDATA section.
 *
 * An XML CDATA section is structured as follows, where <code>{data}</code> is
 * the character data of the section:
 *
 * <code>&lt;![CDATA[{data}]]&gt;</code>
 *
 * The <code>{data}</code> value is a property of this node.
 *
 * XmlCdata nodes cannot have any children.
 */
export default class XmlCdata extends XmlNode {
    /**
     * Initializes a new instance of the {@link XmlCdata} class.
     *
     * @param {string} data The character data of the CDATA section.
     */
    constructor(data) {
        super();
        this.data = data;
    }

    /**
     * Gets the character data of the CDATA section.
     *
     * @returns {string} The character data of the CDATA section.
     */
    get data() {
        return this._data;
    }

    /**
     * Sets the character data of the CDATA section.
     *
     * @param {string} data The character data of the CDATA section.
     */
    set data(data) {
        if (!typeCheck("String", data)) {
            throw new TypeError("character data should be a string");
        } else if (!validate.char(data)) {
            throw new Error("character data should not contain characters not" +
                " allowed in XML");
        } else if (/]]>/.test(data)) {
            throw new Error("data should not contain the string ']]>'");
        }
        this._data = data;
    }

    /**
     * Throws an exception since {@link XmlCdata} nodes cannot have any
     * children.
     */
    children() {
        throw new Error("XmlCdata nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlCdata} nodes cannot have any
     * children.
     */
    insertChild(node, index) {
        throw new Error("XmlCdata nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlCdata} nodes cannot have any
     * children.
     */
    removeChild(node) {
        throw new Error("XmlCdata nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlCdata} nodes cannot have any
     * children.
     */
    removeChildAtIndex(index) {
        throw new Error("XmlCdata nodes cannot have children");
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
        return "<![CDATA[" + this.data + "]]>";
    }
}
