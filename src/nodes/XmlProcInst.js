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
 * Represents an XML processing instruction.
 *
 * An XML processing instruction is structured as follows, where
 * <code>{target}</code> and <code>{content}</code> are the target and content
 * of the processing instruction respectively.
 *
 * <code>&lt;?{target} {content}?&gt;</code>
 *
 * The <code>{target}</code> and <code>{content}</code> values are properties
 * of this node.
 *
 * XmlProcInst nodes cannot have any children.
 */
export default class XmlProcInst extends XmlNode {
    /**
     * Initializes a new instance of the {@link XmlProcInst} class.
     *
     * @param {string} target    The target of the processing instruction.
     * @param {string} [content] The data of the processing instruction, or
     *                           undefined if there is no target.
     */
    constructor(target, content) {
        super();
        this.target = target;
        this.content = content;
    }

    /**
     * Gets the target of the processing instruction.
     *
     * @returns {string} The target of the processing instruction.
     */
    get target() {
        return this._target;
    }

    /**
     * Sets the target of the processing instruction.
     *
     * @param {string} target The target of the processing instruction.
     */
    set target(target) {
        if (!typeCheck("String", target)) {
            throw new TypeError("target should be a string");
        } else if (!validate.char(target)) {
            throw new Error("target should not contain characters" +
                " not allowed in XML");
        } else if (target === "xml") {
            throw new Error("target should not be the string 'xml'");
        }
        this._target = target;
    }

    /**
     * Gets the data of the processing instruction.
     *
     * @returns {string|undefined} The data of the processing instruction.
     */
    get content() {
        return this._content;
    }

    /**
     * Sets the data of the processing instruction.
     *
     * @param {string|undefined} content The data of the processing
     *                                   instruction.
     */
    set content(content) {
        if (!typeCheck("String | Undefined", content)) {
            throw new TypeError("data should be a string");
        }
        if (typeCheck("String", content)) {
            if (!validate.char(content)) {
                throw new Error("data should not contain characters" +
                    " not allowed in XML");
            } else if (/\?>/.test(content)) {
                throw new Error("data should not contain the string '?>'");
            }
        }
        this._content = content;
    }

    /**
     * Throws an exception since {@link XmlProcInst} nodes cannot have any
     * children.
     */
    children() {
        throw new Error("XmlProcInst nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlProcInst} nodes cannot have any
     * children.
     */
    insertChild(node, index) {
        throw new Error("XmlProcInst nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlProcInst} nodes cannot have any
     * children.
     */
    removeChild(node) {
        throw new Error("XmlProcInst nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlProcInst} nodes cannot have any
     * children.
     */
    removeChildAtIndex(index) {
        throw new Error("XmlProcInst nodes cannot have children");
    }

    /**
     * Returns an XML string representation of this node.
     *
     * @param {StringOptions} [options] Formatting options for the string
     *                                  representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    toString(options = {})  {
        if (this.content === undefined) {
            return "<?" + this.target + "?>";
        } else {
            return "<?" + this.target + " " + this.content + "?>";
        }
    }
}
