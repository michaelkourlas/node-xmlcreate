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

import {validateChar} from "../validate";

/**
 * The options used to create a CDATA section.
 */
export interface IXmlCdataOptions {
    /**
     * The character data of the CDATA section.
     */
    charData: string;
}

/**
 * Represents a CDATA section.
 *
 * A CDATA section is structured as follows, where `{data}` is the
 * character data of the section:
 *
 * ```xml
 * <![CDATA[{data}]]>
 * ```
 */
export default class XmlCdata<Parent> {
    private readonly _charData: string;
    private readonly _parent: Parent;

    constructor(parent: Parent, validation: boolean,
                options: IXmlCdataOptions)
    {
        if (validation && !validateChar(options.charData)) {
            throw new Error("CDATA section should not contain characters"
                            + " not allowed in XML");
        }
        if (validation && /]]>/.test(options.charData)) {
            throw new Error("CDATA section should not contain the string"
                            + " ']]>'");
        }
        this._charData = options.charData;
        this._parent = parent;
    }

    /**
     * Returns an XML string representation of this CDATA section.
     */
    public toString(): string {
        return "<![CDATA[" + this._charData + "]]>";
    }

    /**
     * Returns the parent of this CDATA section.
     */
    public up(): Parent {
        return this._parent;
    }
}
