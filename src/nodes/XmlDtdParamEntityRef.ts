/**
 * Copyright (C) 2016-2019 Michael Kourlas
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

import {getContext} from "../error";
import {validateName} from "../validate";

/**
 * The options used to create a new parameter entity reference.
 */
export interface IXmlDtdParamEntityRefOptions {
    /**
     * The name of the entity to be referenced.
     */
    name: string;
}

/**
 * Represents a parameter entity reference in a document type definition.
 *
 * A parameter entity reference is structured as follows, where `{entity}`
 * is the name of the entity:
 *
 * ```xml
 * %{entity};
 * ```
 */
export default class XmlDtdParamEntityRef<Parent> {
    private readonly _validation: boolean;
    private readonly _parent: Parent;
    private _name!: string;

    constructor(parent: Parent, validation: boolean,
                options: IXmlDtdParamEntityRefOptions)
    {
        this._validation = validation;
        this._parent = parent;
        this.name = options.name;
    }

    /**
     * Gets the name of this parameter entity reference.
     */
    public get name() {
        return this._name;
    }

    /**
     * Sets the name of this parameter entity reference.
     */
    public set name(name: string) {
        if (this._validation && !validateName(name)) {
            throw new Error(`${getContext(this.up())}: parameter entity`
                            + ` reference name "${name}" should not contain`
                            + " characters not allowed in XML names");
        }
        this._name = name;
    }

    /**
     * Returns an XML string representation of this parameter entity reference.
     */
    public toString() {
        return "%" + this._name + ";";
    }

    /**
     * Returns the parent of this parameter entity reference.
     */
    public up() {
        return this._parent;
    }
}
