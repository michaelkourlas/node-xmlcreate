/**
 * Copyright (C) 2016-2018 Michael Kourlas
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

import {validateName} from "../validate";

/**
 * The options used to create a new entity reference.
 */
export interface IXmlEntityRefOptions {
    /**
     * The name of the entity to be referenced.
     */
    name: string;
}

/**
 * Represents an entity reference.
 *
 * An entity reference is structured as follows, where `{name}` is the name of
 * the entity to be referenced:
 *
 * ```xml
 * &{entity};
 * ```
 */
export default class XmlEntityRef<Parent> {
    private readonly _name: string;
    private readonly _parent: Parent;

    constructor(parent: Parent, validation: boolean,
                options: IXmlEntityRefOptions)
    {
        if (validation && !validateName(options.name)) {
            throw new Error("Entity reference name should not contain"
                            + " characters not allowed in XML names");
        }
        this._name = options.name;
        this._parent = parent;
    }

    /**
     * Returns an XML string representation of this entity reference.
     */
    public toString(): string {
        return "&" + this._name + ";";
    }

    /**
     * Returns the parent of this entity reference.
     */
    public up(): Parent {
        return this._parent;
    }
}
