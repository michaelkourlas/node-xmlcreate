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
 * Represents an XML parameter entity reference in a document type definition.
 *
 * An XML parameter entity reference is structured as follows, where
 * <code>{entity}</code> is the name of the entity:
 *
 * <code>%{entity};</code>
 *
 * The <code>{entity}</code> value is a property of this node.
 *
 * XmlDtdParamEntityRef nodes cannot have any children.
 */
export default class XmlDtdParamEntityRef extends XmlNode {
    /**
     * Initializes a new instance of the {@link XmlDtdParamEntityRef} class.
     *
     * @param {string} entity The entity to be referenced.
     */
    constructor(entity) {
        super();
        this.entity = entity;
    }

    /**
     * Gets the entity to be referenced.
     *
     * @returns {string} The entity to be referenced.
     */
    get entity() {
        return this._entity;
    }

    /**
     * Sets the entity to be referenced.
     *
     * @param {string} entity The entity to be referenced.
     */
    set entity(entity) {
        if (!typeCheck("String", entity)) {
            throw new TypeError("entity should be a string");
        } else if (!validate.name(entity)) {
            throw new Error("entity should not contain characters" +
                " not allowed in XML names");
        }
        this._entity = entity;
    }

    /**
     * Throws an exception since {@link XmlDtdParamEntityRef} nodes cannot have
     * any children.
     */
    children() {
        throw new Error("XmlDtdParamEntityRef nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlDtdParamEntityRef} nodes cannot have
     * any children.
     */
    insertChild(node, index) {
        throw new Error("XmlDtdParamEntityRef nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlDtdParamEntityRef} nodes cannot have
     * any children.
     */
    removeChild(node) {
        throw new Error("XmlDtdParamEntityRef nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlDtdParamEntityRef} nodes cannot have
     * any children.
     */
    removeChildAtIndex(index) {
        throw new Error("XmlDtdParamEntityRef nodes cannot have children");
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
        return "%" + this.entity + ";";
    }
}
