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

import * as stringOptions from "../options/string";
import * as validate from "../utils/validate";

import XmlAttribute from "./XmlAttribute";
import XmlCdata from "./XmlCdata";
import XmlCharRef from "./XmlCharRef";
import XmlComment from "./XmlComment";
import XmlEntityRef from "./XmlEntityRef";
import XmlNode from "./XmlNode";
import XmlProcInst from "./XmlProcInst";
import XmlText from "./XmlText";

/**
 * Represents an XML element.
 *
 * A sample XML element is structured as follows, where <code>{name}</code> is
 * the name of the element:
 * <code><pre>&lt;{name} attname="attvalue"&gt;
 *     &lt;subelem/&gt;
 *     &lt;?pitarget picontent?&gt;
 *     text
 * &lt;/{name}&gt;</pre></code>
 *
 * The <code>{name}</code> value is a property of the node, while the
 * attributes and children of the element (such as other elements, processing
 * instructions, and text) are children of this node.
 *
 * XmlElement nodes can have an unlimited number of {@link XmlAttribute},
 * {@link XmlCdata}, {@link XmlCharRef}, {@link XmlComment},
 * {@link XmlElement}, {@link XmlEntityRef}, {@link XmlProcInst}, or
 * {@link XmlText} nodes as children.
 */
export default class XmlElement extends XmlNode {
    /**
     * Initializes a new instance of the {@link XmlElement} class.
     *
     * @param name The name of the element.
     */
    constructor(name) {
        super();
        this.name = name;
    }

    /**
     * Gets the name of the element.
     *
     * @returns {string} The name of the element.
     */
    get name() {
        return this._name;
    }

    /**
     * Sets the name of the element.
     *
     * @param {string} name The name of the element.
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
     * Inserts an new attribute at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param {string} name
     *        The name of the attribute.
     * @param {string|XmlNode|Array.<string|XmlNode>} value
     *        The value of the attribute. Strings are converted to XmlText
     *        nodes.
     * @param {number} [index]
     *        The index at which the node should be inserted. If no index is
     *        specified, the node is inserted at the end of this node's
     *        children.
     *
     * @returns {XmlAttribute} The newly created attribute.
     */
    attribute(name, value, index) {
        if (typeCheck("String", value)) {
            value = new XmlText(value);
        } else if (typeCheck("Array", value)) {
            for (let i = 0; i < value.length; i++) {
                if (typeCheck("String", value[i])) {
                    value[i] = new XmlText(value[i]);
                }
            }
        }

        let attribute = new XmlAttribute(name, value);
        this.insertChild(attribute, index);
        return attribute;
    }

    /**
     * Returns an array containing all of the children of this node that are
     * instances of {@link XmlAttribute}.
     *
     * @returns {XmlAttribute[]} An array containing all of the children of
     *                           this node that are instances of
     *                           {@link XmlAttribute}.
     */
    attributes() {
        return this._children.filter(node => node instanceof XmlAttribute);
    }

    /**
     * Inserts a new CDATA section at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param {string} content The data of the CDATA section.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlCdata} The newly created CDATA section.
     */
    cdata(content, index) {
        let cdata = new XmlCdata(content);
        this.insertChild(cdata, index);
        return cdata;
    }

    /**
     * Inserts a new character reference at the specified index. If no index
     * is specified, the node is inserted at the end of this node's children.
     *
     * @param {string} char    The character to represent using the reference.
     * @param {boolean} [hex]  Whether to use the hexadecimal or decimal
     *                         representation for the reference. If left
     *                         undefined, decimal is the default.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlCharRef} The newly created character reference.
     */
    charRef(char, hex, index) {
        let charRef = new XmlCharRef(char, hex);
        this.insertChild(charRef, index);
        return charRef;
    }

    /**
     * Inserts a new comment at the specified index. If no index is specified,
     * the node is inserted at the end of this node's children.
     *
     * @param {string} content The data of the comment.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlComment} The newly created comment.
     */
    comment(content, index) {
        let comment = new XmlComment(content);
        this.insertChild(comment, index);
        return comment;
    }

    /**
     * Inserts a new element at the specified index. If no index is specified,
     * the node is inserted at the end of this node's children.
     *
     * @param {string} name    The name of the element.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlElement} The newly created element.
     */
    element(name, index) {
        let element = new XmlElement(name);
        this.insertChild(element, index);
        return element;
    }

    /**
     * Inserts a new entity reference at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param {string} entity  The entity to be referenced.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlEntityRef} The newly created entity reference.
     */
    entityRef(entity, index) {
        let entityRef = new XmlEntityRef(entity);
        this.insertChild(entityRef, index);
        return entityRef;
    }

    /**
     * Inserts the specified node into this node's children at the specified
     * index. The node is not inserted if it is already present. If this node
     * already has a parent, it is removed from that parent.
     *
     * Note that only {@link XmlAttribute}, {@link XmlCdata},
     * {@link XmlCharRef}, {@link XmlComment}, {@link XmlElement},
     * {@link XmlEntityRef}, {@link XmlProcInst}, or {@link XmlText} nodes can
     * be inserted; otherwise, an exception will be thrown.
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
        if (!(node instanceof XmlAttribute ||
            node instanceof XmlCdata ||
            node instanceof XmlCharRef ||
            node instanceof XmlComment ||
            node instanceof XmlElement ||
            node instanceof XmlEntityRef ||
            node instanceof XmlProcInst ||
            node instanceof XmlText)) {
            throw new TypeError("node should be an instance of" +
                " XmlAttribute, XmlCdata, XmlCharRef, XmlComment," +
                " XmlElement, XmlEntityRef, XmlProcInst, or XmlText");
        }

        if (node instanceof XmlAttribute) {
            let attributes = this._children.filter(
                node => node instanceof XmlAttribute);
            for (let attribute of attributes) {
                if (attribute.name === node.name) {
                    throw new Error("element already contains an" +
                        " XmlAttribute object with name " + node.name);
                }
            }
        }

        return super.insertChild(node, index);
    }

    /**
     * Inserts a new processing instruction at the specified index. If no index
     * is specified, the node is inserted at the end of this node's children.
     *
     * @param {string} target    The target of the processing instruction.
     * @param {string} [content] The data of the processing instruction, or
     *                           undefined if there is no target.
     * @param {number} [index]   The index at which the node should be inserted.
     *                           If no index is specified, the node is inserted
     *                           at the end of this node's children.
     *
     * @returns {XmlProcInst} The newly created processing instruction.
     */
    procInst(target, content, index) {
        let procInst = new XmlProcInst(target, content);
        this.insertChild(procInst, index);
        return procInst;
    }

    /**
     * Inserts some new text at the specified index. If no index is specified,
     * the node is inserted at the end of this node's children.
     *
     * @param {string} text    Arbitrary character data.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlText} The newly created text node.
     */
    text(text, index) {
        let txt = new XmlText(text);
        this.insertChild(txt, index);
        return txt;
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

        let attributes = this.attributes();
        let nodes = this._children.filter(node => {
            return attributes.indexOf(node) === -1;
        });

        // Element tag start
        var str = "<" + this._name;

        // Attributes
        for (let attribute of attributes) {
            str += " " + attribute.toString(options);
        }

        // Child nodes
        if (nodes.length > 0) {
            // Element non-empty tag end
            str += ">";

            let indenter = line => options.indent + line;
            for (let i = 0; i < nodes.length; i++) {
                let next = nodes[i];
                let nextStr = next.toString(options);
                let prev = i > 0 ? nodes[i - 1] : undefined;

                // Line break before child nodes unless all nodes, or at least
                // the most recent two, are of type XmlCharacterReference,
                // XmlEntityReference, or XmlText
                if (options.pretty) {
                    if (!allSameLineNodes(nodes)) {
                        if (!(i > 0 && onSameLine(next, prev))) {
                            str += options.newline;
                            nextStr = nextStr.split(options.newline)
                                .map(indenter)
                                .join(options.newline);
                        }
                    }
                }

                str += nextStr;
            }

            // Line break before end tag unless all nodes are of type
            // XmlCharacterReference, XmlEntityReference, or XmlText
            if (options.pretty) {
                if (!allSameLineNodes(nodes)) {
                    str += options.newline;
                }
            }

            // Element end tag
            str += "</" + this._name + ">";
        } else {
            // Element empty tag end
            str += "/>";
        }

        return str;
    }
}

/**
 * Returns true if the specified nodes are all of type {@link XmlCharRef},
 * {@link XmlEntityRef}, or {@link XmlText}.
 *
 * @param {XmlNode[]} nodes The specified nodes.
 *
 * @returns {boolean} Whether or not the specified nodes are all of type
 *                    {@link XmlCharRef}, {@link XmlEntityRef}, or
 *                    {@link XmlText}.
 */
function allSameLineNodes(nodes) {
    for (let node of nodes) {
        if (!((node instanceof XmlCharRef ||
            node instanceof XmlEntityRef ||
            node instanceof XmlText))) {
            return false;
        }
    }
    return true;
}

/**
 * Returns true if the specified nodes are all of type {@link XmlCharRef},
 * {@link XmlEntityRef}, or {@link XmlText}.
 *
 * @param {XmlNode} prev The first specified node.
 * @param {XmlNode} next The second specified node.
 *
 * @returns {boolean} Whether or not the specified nodes are all of type
 *                    {@link XmlCharRef}, {@link XmlEntityRef}, or
 *                    {@link XmlText}.
 */
function onSameLine(prev, next) {
    return (prev instanceof XmlCharRef ||
        prev instanceof XmlEntityRef ||
        prev instanceof XmlText) &&
        (next instanceof XmlCharRef ||
        next instanceof XmlEntityRef ||
        next instanceof XmlText);
}
