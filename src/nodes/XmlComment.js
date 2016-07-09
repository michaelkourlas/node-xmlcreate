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
 * Represents an XML comment.
 *
 * An XML character reference is structured as follows, where
 * <code>{content}</code> is the text of the comment.
 *
 * <code>&lt;!--{content}--></code>
 *
 * The <code>{content}</code> value is a property of this node.
 *
 * XmlComment nodes cannot have any children.
 */
export default class XmlComment extends XmlNode {
    /**
     * Initializes a new instance of the {@link XmlComment} class.
     *
     * @param {string} content The content of the comment.
     */
    constructor(content) {
        super();
        this.content = content;
    }

    /**
     * Gets the content of the comment.
     *
     * @returns {string} The content of the comment.
     */
    get content() {
        return this._content;
    }

    /**
     * Sets the content of the comment.
     *
     * @param {string} content The content of the comment.
     */
    set content(content) {
        if (!typeCheck("String", content)) {
            throw new TypeError("content should be a string");
        } else if (!validate.char(content)) {
            throw new Error("content should not contain characters" +
                " not allowed in XML");
        } else if (!/^([^-]|-[^-])*$/.test(content)) {
            throw new Error("content should not contain the string '--' or" +
                " end with '-'");
        }
        this._content = content;
    }

    /**
     * Throws an exception since {@link XmlComment} nodes cannot have any
     * children.
     */
    children() {
        throw new Error("XmlComment nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlComment} nodes cannot have any
     * children.
     */
    insertChild(node, index) {
        throw new Error("XmlComment nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlComment} nodes cannot have any
     * children.
     */
    removeChild(node) {
        throw new Error("XmlComment nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlComment} nodes cannot have any
     * children.
     */
    removeChildAtIndex(index) {
        throw new Error("XmlComment nodes cannot have children");
    }

    /**
     * Returns an XML string representation of this node.
     *
     * @param {StringOptions} [options] Formatting options for the string
     *                                  representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    toString(options) {
        return "<!--" + this.content + "-->";
    }
}
