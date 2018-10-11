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

import {escapeAmpersands, escapeLeftAngleBrackets} from "../escape";
import {validateChar} from "../validate";

/**
 * The options used to create attribute text.
 */
export interface IXmlAttributeTextOptions {
    /**
     * The attribute text.
     */
    charData: string;
}

/**
 * Represents text in an attribute value.
 *
 * Restricted characters, such as the ampersand (`&`) and the opening angle
 * bracket (`<`), are all automatically escaped.
 */
export default class XmlAttributeText<Parent> {
    private readonly _parent: Parent;
    private readonly _charData: string;

    constructor(parent: Parent, validation: boolean,
                options: IXmlAttributeTextOptions)
    {
        this._parent = parent;
        if (validation && !validateChar(options.charData)) {
            throw new Error("Attribute text should not contain characters"
                            + " not allowed in XML");
        }
        this._charData = options.charData;
    }

    /**
     * Returns an XML string representation of this attribute text.
     */
    public toString(): string {
        let str = this._charData;
        str = escapeAmpersands(str);
        str = escapeLeftAngleBrackets(str);
        return str;
    }

    /**
     * Returns the parent of this attribute text.
     */
    public up(): Parent {
        return this._parent;
    }
}
