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

import {
    escapeAmpersands,
    escapeLeftAngleBrackets,
    escapeRightAngleBracketsInCdataTerminator
} from "../escape";
import {validateChar} from "../validate";

/**
 * The options used to create new character data.
 */
export interface IXmlCharDataOptions {
    /**
     * The character data.
     */
    charData: string;
}

/**
 * Represents character data.
 *
 * Restricted characters, such as the ampersand (`&`), the opening angle
 * bracket (`<`), and the closing angle bracket (`>`) when it appears in the
 * string `]]>`, are all automatically escaped.
 */
export default class XmlCharData<Parent> {
    private readonly _charData: string;
    private readonly _parent: Parent;

    constructor(parent: Parent, validation: boolean,
                options: IXmlCharDataOptions)
    {
        if (validation && !validateChar(options.charData)) {
            throw new Error("Character data should not contain characters"
                            + " not allowed in XML");
        }
        this._charData = options.charData;
        this._parent = parent;
    }

    /**
     * Returns an XML string representation of this character data.
     */
    public toString(): string {
        let str = this._charData;
        str = escapeAmpersands(str);
        str = escapeLeftAngleBrackets(str);
        str = escapeRightAngleBracketsInCdataTerminator(str);
        return str;
    }

    /**
     * Returns the parent of this character data.
     */
    public up(): Parent {
        return this._parent;
    }
}
