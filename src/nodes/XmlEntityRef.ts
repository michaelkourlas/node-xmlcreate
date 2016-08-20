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

import {IStringOptions} from "../options";
import {isType} from "../utils";
import {validateName} from "../validate";
import XmlNode from "./XmlNode";

/**
 * Represents an XML entity reference.
 *
 * An XML entity reference is structured as follows, where
 * `{entity}` is name of the entity to be referenced:
 *
 * ```xml
 * &{entity};
 * ```
 *
 * The `{entity}` value is a property of this node.
 *
 * XmlEntityRef nodes cannot have any children.
 */
export default class XmlEntityRef extends XmlNode {
    private _entity: string;

    /**
     * Initializes a new instance of the {@link XmlEntityRef} class.
     *
     * @param {string} entity The entity to be referenced.
     */
    constructor(entity: string) {
        super();
        this.entity = entity;
    }

    /**
     * Gets the entity to be referenced.
     *
     * @returns {string} The entity to be referenced.
     */
    get entity(): string {
        return this._entity;
    }

    /**
     * Sets the entity to be referenced.
     *
     * @param {string} entity The entity to be referenced.
     */
    set entity(entity: string) {
        if (!isType(entity, "String")) {
            throw new TypeError("entity should be a string");
        } else if (!validateName(entity)) {
            throw new Error("entity should not contain characters" +
                            " not allowed in XML names");
        }
        this._entity = entity;
    }

    /**
     * Throws an exception since {@link XmlEntityRef} nodes cannot have any
     * children.
     */
    public children(): XmlNode[] {
        throw new Error("XmlEntityRef nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlEntityRef} nodes cannot have any
     * children.
     */
    public insertChild(node: XmlNode, index?: number): XmlNode {
        throw new Error("XmlEntityRef nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlEntityRef} nodes cannot have any
     * children.
     */
    public removeChild(node: XmlNode): boolean {
        throw new Error("XmlEntityRef nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlEntityRef} nodes cannot have any
     * children.
     */
    public removeChildAtIndex(index: number): XmlNode {
        throw new Error("XmlEntityRef nodes cannot have children");
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
        return "&" + this.entity + ";";
    }
}
