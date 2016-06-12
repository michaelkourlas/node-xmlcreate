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

import XmlComment from "./XmlComment";
import XmlDtdAttlist from "./XmlDtdAttlist";
import XmlDtdElement from "./XmlDtdElement";
import XmlDtdEntity from "./XmlDtdEntity";
import XmlDtdNotation from "./XmlDtdNotation";
import XmlDtdParamEntityRef from "./XmlDtdParamEntityRef";
import XmlNode from "./XmlNode";
import XmlProcInst from "./XmlProcInst";

/**
 * Represents an XML document type definition (DTD).
 *
 * An XML document type definition  is structured as follows, where
 * <code>{name}</code> is the name of the DTD, <code>{sysId}</code> is the
 * system identifier of the DTD, <code>{pubId}</code> is the public identifier
 * of the DTD, and <code>{intSubset}</code> is the internal subset of the DTD:
 * <code><pre>&lt;!DOCTYPE {name} SYSTEM "{sysId}" PUBLIC "{pubId}" [
 *     {intSubset}
 * ]&gt;</pre></code>
 *
 * The <code>{name}</code>, <code>{pubId}</code>, and <code>{sysId}</code>
 * values are properties of the node, while the <code>{intSubset}</code> value
 * consists of the children of this node.
 *
 * XmlDtd nodes can have an unlimited number of {@link XmlComment},
 * {@link XmlDtdAttlist}, {@link XmlDtdElement}, {@link XmlDtdEntity},
 * {@link XmlDtdNotation}, {@link XmlDtdParamEntityRef}, and
 * {@link XmlProcInst} nodes.
 */
export default class XmlDtd extends XmlNode {
    /**
     * Initializes a new instance of the {@link XmlDtd} class.
     *
     * @param {string} name    The name of the DTD.
     * @param {string} [sysId] The system identifier of the DTD, excluding
     *                         quotation marks.
     * @param {string} [pubId] The public identifier of the DTD, excluding
     *                         quotation marks. If a public identifier is
     *                         provided, a system identifier must be provided
     *                         as well.
     */
    constructor(name, sysId, pubId) {
        super();
        this.name = name;
        this.sysId = sysId;
        this.pubId = pubId;
    }

    /**
     * Gets the name of the DTD.
     *
     * @returns {string} The name of the DTD.
     */
    get name() {
        return this._name;
    }

    /**
     * Sets the name of the DTD.
     * 
     * @param {string} name The name of the DTD.
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
     * Gets the public identifier of the DTD, excluding quotation marks.
     *
     * @returns {string|undefined} The public identifier of the DTD, excluding
     *                             quotation marks.
     */
    get pubId() {
        return this._pubId;
    }

    /**
     * Sets the public identifier of the DTD, excluding quotation marks. If a
     * public identifier is provided, a system identifier must be provided as
     * well.
     *
     * @param {string|undefined} pubId The public identifier of the DTD,
     *                                 excluding quotation marks.
     */
    set pubId(pubId) {
        if (typeCheck("String", pubId)) {
            if (!/^(\u0020|\u000D|\u000A|[a-zA-Z0-9]|[-'()+,./:=?;!*#@$_%])*$/
                    .test(pubId)) {
                throw new Error("pubId should not contain characters not" +
                    " allowed in public identifiers");
            } else if (typeCheck("Undefined", this.sysId)) {
                throw new Error("pubId should not be defined if sysId is" +
                    " undefined");
            }
        } else if (!typeCheck("Undefined", pubId)) {
            throw new TypeError("pubId should be a string or undefined");
        }
        this._pubId = pubId;
    }

    /**
     * Gets the system identifier of the DTD, excluding quotation marks.
     *
     * @returns {string|undefined} The system identifier of the DTD, excluding
     *                             quotation marks.
     */
    get sysId() {
        return this._sysId;
    }

    /**
     * Sets the system identifier of the DTD, excluding quotation marks.
     *
     * @param {string|undefined} sysId The system identifier of the DTD,
     *                                 excluding quotation marks.
     */
    set sysId(sysId) {
        if (typeCheck("String", sysId)) {
            if (!validate.char(sysId)) {
                throw new Error("sysId should not contain characters not" +
                    " allowed in XML");
            } else if (sysId.indexOf("'") !== -1 &&
                sysId.indexOf("\"") !== -1) {
                throw new Error("sysId should not contain both single quotes" +
                    " and double quotes");
            }
        } else if (typeCheck("Undefined", sysId)) {
            if (!typeCheck("Undefined", this.pubId)) {
                throw new Error("sysId should not be undefined if pubId is" +
                    " defined");
            }
        } else {
            throw new TypeError("sysId should be a string or undefined");
        }
        this._sysId = sysId;
    }

    /**
     * Inserts a new attribute-list declaration at the specified index. If no
     * index is specified, the node is inserted at the end of this node's
     * children.
     *
     * @param {string} text    The text of the attribute-list declaration.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlDtdAttlist} The newly created attribute-list declaration.
     */
    attlist(text, index) {
        let attlist = new XmlDtdAttlist(text);
        this.insertChild(attlist, index);
        return attlist;
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
     * Inserts a new element declaration at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param {string} text    The text of the element declaration.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlDtdElement} The newly created element declaration.
     */
    element(text, index) {
        let element = new XmlDtdElement(text);
        this.insertChild(element, index);
        return element;
    }

    /**
     * Inserts a new entity declaration at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param {string} text    The text of the entity declaration.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlDtdEntity} The newly created entity declaration.
     */
    entity(text, index) {
        let entity = new XmlDtdEntity(text);
        this.insertChild(entity, index);
        return entity;
    }

    /**
     * Inserts the specified node into this node's children at the specified
     * index. The node is not inserted if it is already present. If this node
     * already has a parent, it is removed from that parent.
     *
     * Only {@link XmlComment}, {@link XmlDtdAttlist}, {@link XmlDtdElement},
     * {@link XmlDtdEntity}, {@link XmlDtdNotation}, and {@link XmlProcInst}
     * nodes can be inserted; otherwise an exception will be thrown.
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
        if (!(node instanceof XmlComment || node instanceof XmlDtdAttlist ||
            node instanceof XmlDtdElement || node instanceof XmlDtdEntity ||
            node instanceof XmlDtdNotation ||
            node instanceof XmlDtdParamEntityRef ||
            node instanceof XmlProcInst)) {
            throw new TypeError("node should be an instance of" +
                " XmlComment, XmlDtdAttlist, XmlDtdElement, XmlDtdEntity," +
                " XmlDtdNotation, XmlDtdParamEntityRef, or XmlProcInst");
        }
        return super.insertChild(node, index);
    }

    /**
     * Inserts a new notation declaration at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param {string} text    The text of the notation declaration.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlDtdNotation} The newly created notation declaration.
     */
    notation(text, index) {
        let notation = new XmlDtdNotation(text);
        this.insertChild(notation, index);
        return notation;
    }

    /**
     * Inserts a new parameter entity reference at the specified index. If no
     * index is specified, the node is inserted at the end of this node's
     * children.
     *
     * @param {string} entity  The entity to reference.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlDtdParamEntityRef} The newly created parameter entity
     *                                 reference.
     */
    paramEntityRef(entity, index) {
        let paramEntity = new XmlDtdParamEntityRef(entity);
        this.insertChild(paramEntity, index);
        return paramEntity;
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
     * Returns an XML string representation of this node.
     *
     * @param {StringOptions} [options] Formatting options for the string
     *                                  representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    toString(options = {}) {
        stringOptions.validate(options);

        let str = "<!DOCTYPE " + this.name;
        if (typeCheck("Undefined", this.pubId)) {
            if (!typeCheck("Undefined", this.sysId)) {
                str += " ";
                str = appendId("SYSTEM", this.sysId, str, options);
            }
        } else {
            str += " ";
            str = appendId("PUBLIC", this.pubId, str, options);
            str = appendId("", this.sysId, str, options);
        }

        if (this._children.length !== 0) {
            str += " [";
            for (let node of this._children) {
                if (options.pretty) {
                    str += options.newline + options.indent;
                }
                str += node.toString(options);
            }
            if (options.pretty) {
                str += options.newline;
            }
            str += "]>";
        } else {
            str += ">";
        }

        return str;
    }
}

/**
 * Appends the XML string representation of a public or system identifier to
 * an existing string.
 *
 * @param {string} type           "SYSTEM", "PUBLIC", or ""
 * @param {string} value          The value of the identifier.
 * @param {string} str            The string to which the string representation
 *                                should be appended.
 * @param {StringOptions} options Formatting options for the string
 *                                representation.
 *
 * @returns {string} The updated string.
 */
function appendId(type, value, str, options) {
    str += type + " ";
    if (options.doubleQuotes) {
        if (value.indexOf("\"") !== -1) {
            throw new Error("options.doubleQuotes inconsistent with" +
                " sysId or pubId");
        }
        str += "\"" + value + "\"";
    } else {
        if (value.indexOf("'") !== -1) {
            throw new Error("options.doubleQuotes inconsistent with" +
                " sysId or pubId");
        }
        str += "'" + value + "'";
    }
    return str;
}
