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
import {escapeAmpersands, escapeLeftAngleBrackets} from "../escape";
import {fixChar, isUndefined, validateChar} from "../validate";

/**
 * The options used to create attribute text.
 */
export interface IXmlAttributeTextOptions {
    /**
     * The attribute text.
     */
    charData: string;
    /**
     * Whether to replace any invalid characters in the attribute text with the
     * Unicode replacement character. By default, this is disabled.
     */
    replaceInvalidCharsInCharData?: boolean;
}

/**
 * Represents text in an attribute value.
 *
 * Restricted characters, such as the ampersand (`&`) and the opening angle
 * bracket (`<`), are all automatically escaped.
 */
export default class XmlAttributeText<Parent> {
    private readonly _replaceInvalidCharsInCharData: boolean;
    private readonly _parent: Parent;
    private readonly _validation: boolean;
    private _charData!: string;

    constructor(
        parent: Parent,
        validation: boolean,
        options: IXmlAttributeTextOptions
    ) {
        this._validation = validation;
        if (!isUndefined(options.replaceInvalidCharsInCharData)) {
            this._replaceInvalidCharsInCharData =
                options.replaceInvalidCharsInCharData;
        } else {
            this._replaceInvalidCharsInCharData = false;
        }
        this._parent = parent;
        this.charData = options.charData;
    }

    /**
     * Gets this attribute text.
     */
    public get charData() {
        return this._charData;
    }

    /**
     * Sets this attribute text.
     */
    public set charData(charData: string) {
        if (this._replaceInvalidCharsInCharData) {
            charData = fixChar(charData);
        } else if (this._validation && !validateChar(charData)) {
            throw new Error(
                `${getContext(this.up())}: attribute text` +
                    ` "${charData}" should not contain characters not` +
                    " allowed in XML"
            );
        }
        this._charData = charData;
    }

    /**
     * Returns an XML string representation of this attribute text.
     */
    public toString() {
        let str = this._charData;
        str = escapeAmpersands(str);
        str = escapeLeftAngleBrackets(str);
        return str;
    }

    /**
     * Returns the parent of this attribute text.
     */
    public up() {
        return this._parent;
    }
}
