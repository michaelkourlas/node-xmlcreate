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

import * as escape from "../utils/escape";
import * as stringOptions from "../options/string";
import * as validate from "../utils/validate";

import XmlCharRef from "./XmlCharRef";
import XmlEntityRef from "./XmlEntityRef";
import XmlNode from "./XmlNode";
import XmlText from "./XmlText";

/**
 * Represents an XML element attribute.
 *
 * An XML element attribute is part of the start tag of an element and is
 * structured as follows, where <code>{name}</code> is the name of the attribute
 * and <code>{value}</code> is the value of the attribute:
 *
 * <code>&lt;element {name}="{value}"&gt;</code>
 *
 * The <code>{name}</code> value is a property of this node, while the
 * <code>{value}</code> property consists of the children of this node.
 *
 * XmlAttribute nodes must have at least one child, and can have an unlimited
 * number of {@link XmlCharRef}, {@link XmlEntityRef}, and {@link XmlText}
 * nodes as children.
 */
export default class XmlAttribute extends XmlNode {
    /**
     * Initializes a new instance of the {@link XmlAttribute} class.
     *
     * @param {string} name             The name of the XML attribute.
     * @param {XmlNode|XmlNode[]} value The initial value of the XML attribute.
     *                                  Additional children can be added later.
     *                                  Only {@link XmlCharRef},
     *                                  {@link XmlEntityRef}, and
     *                                  {@link XmlText} nodes are permitted.
     */
    constructor(name, value) {
        super();
        this.name = name;
        if (typeCheck("Array", value)) {
            for (let node of value) {
                this.insertChild(node);
            }
        } else {
            this.insertChild(value);
        }
    }

    /**
     * Gets the name of this attribute.
     *
     * @returns {string} The name of this attribute.
     */
    get name() {
        return this._name;
    }

    /**
     * Sets the name of this attribute.
     *
     * @param {string} name The name of this attribute.
     */
    set name(name) {
        if (!typeCheck("String", name)) {
            throw new TypeError("name should be a string");
        } else if (!validate.name(name)) {
            throw new Error("name should not contain characters not" +
                " allowed in XML names");
        }
        this._name = name;
    }

    /**
     * Inserts a new XML character reference at the specified index.
     *
     * @param {string} char    The character to represent using the reference.
     * @param {boolean} [hex]  Whether to use the hexadecimal or decimal
     *                         representation for the reference. If left
     *                         undefined, decimal is the default.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlCharRef} The newly created XML declaration.
     */
    charRef(char, hex, index) {
        let charRef = new XmlCharRef(char, hex);
        this.insertChild(charRef, index);
        return charRef;
    }

    /**
     * Inserts a new XML entity reference at the specified index.
     *
     * @param {string} entity  The entity to be referenced.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlEntityRef} The newly created XML declaration.
     */
    entityRef(entity, index) {
        let charRef = new XmlEntityRef(entity);
        this.insertChild(charRef, index);
        return charRef;
    }

    /**
     * Inserts the specified node into this node's children at the specified
     * index. The node is not inserted if it is already present. If this node
     * already has a parent, it is removed from that parent.
     *
     * Note that only {@link XmlCharRef}, {@link XmlEntityRef}, and
     * {@link XmlText} nodes can be inserted; otherwise, an exception will be
     * thrown.
     *
     * @param {XmlNode} node   The node to insert.
     * @param {number} [index] The index at which to insert the node. Nodes at
     *                         or after the index are shifted to the right. If
     *                         no index is specified, the node is inserted at
     *                         the end.
     *
     * @returns {XmlNode} The node inserted into this node's children, or
     *                    undefined if no node was inserted.
     */
    insertChild(node, index) {
        if (!(node instanceof XmlCharRef || node instanceof XmlEntityRef ||
            node instanceof XmlText)) {
            throw new TypeError("node should be an instance of XmlCharRef," +
                " XmlEntityRef, or XmlText");
        }
        return super.insertChild(node, index);
    }

    /**
     * Removes the specified node from this node's children.
     *
     * Note that this node must have at least one child. Attempts to remove
     * the last child node will result in an exception.
     *
     * @param {XmlNode} node The node to remove.
     *
     * @returns {boolean} Whether a node was removed.
     */
    removeChild(node) {
        if (this._children.length === 1) {
            throw new Error("XmlAttribute nodes must have at least one child");
        }
        return super.removeChild(node);
    }

    /**
     * Removes the node at the specified index from this node's children.
     *
     * Note that this node must have at least one child. Attempts to remove
     * the last child node will result in an exception.
     *
     * @param {number} index The index at which the node to be removed is
     *                       located.
     *
     * @returns {XmlNode} The node that was removed, or undefined if no node
     *                    was removed.
     */
    removeChildAtIndex(index) {
        if (this._children.length === 1) {
            throw new Error("XmlAttribute nodes must have at least one child");
        }
        return super.removeChildAtIndex(index);
    }

    /**
     * Inserts a new XML text node at the specified index.
     *
     * @param {string} text    Arbitrary character data.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlText} The newly created XML declaration.
     */
    text(text, index) {
        let textNode = new XmlText(text);
        this.insertChild(textNode, index);
        return textNode;
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

        let quote = options.doubleQuotes ? "\"" : "'";
        let str = this.name + "=" + quote;
        for (let child of this._children) {
            if (options.doubleQuotes) {
                str += escape.doubleQuotes(child.toString(options));
            } else {
                str += escape.singleQuotes(child.toString(options));
            }
        }
        str += quote;
        return str;
    }
}
