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
import {fixChar, isUndefined, validateChar} from "../validate";

/**
 * The options used to create a new comment.
 */
export interface IXmlCommentOptions {
    /**
     * The content of the comment.
     */
    charData: string;
    /**
     * Whether to replace any invalid characters in the content of the comment
     * with the Unicode replacement character. By default, this is disabled.
     */
    replaceInvalidCharsInCharData?: boolean;
}

/**
 * Represents a comment.
 *
 * A comment is structured as follows, where `{content}` is the text of the
 * comment:
 *
 * ```xml
 * <!--{content}-->
 * ```
 */
export default class XmlComment<Parent> {
    private readonly _replaceInvalidCharsInCharData: boolean;
    private readonly _parent: Parent;
    private readonly _validation: boolean;
    private _charData!: string;

    constructor(parent: Parent, validation: boolean,
                options: IXmlCommentOptions)
    {
        this._validation = validation;
        if (!isUndefined(options.replaceInvalidCharsInCharData)) {
            this._replaceInvalidCharsInCharData = (
                options.replaceInvalidCharsInCharData);
        } else {
            this._replaceInvalidCharsInCharData = false;
        }
        this._parent = parent;
        this.charData = options.charData;
    }

    /**
     * Gets the text of this comment.
     */
    public get charData() {
        return this._charData;
    }

    /**
     * Sets the text of this comment.
     */
    public set charData(charData: string) {
        if (this._replaceInvalidCharsInCharData) {
            charData = fixChar(charData);
        } else if (this._validation && !validateChar(charData)) {
            throw new Error(`${getContext(this.up())}: comment content`
                            + ` "${charData}" should not contain characters`
                            + " not allowed in XML");
        }
        if (this._replaceInvalidCharsInCharData) {
            charData = charData.replace("--", "\uFFFD\uFFFD");
        } else if (this._validation && charData.indexOf("--") !== -1) {
            throw new Error(`${getContext(this.up())}: comment content`
                            + ` "${charData}" should not contain the string`
                            + " '--'");
        }
        if (this._replaceInvalidCharsInCharData) {
            if (charData.lastIndexOf("-") === charData.length - 1) {
                charData = charData.substr(0, charData.length - 1) + "\uFFFD";
            }
        } else if (this._validation
                   && charData.lastIndexOf("-") === charData.length - 1)
        {
            throw new Error(`${getContext(this.up())}: comment content`
                            + ` "${charData}" should not end with the string`
                            + " '-'");
        }
        this._charData = charData;
    }

    /**
     * Returns an XML string representation of this comment.
     */
    public toString() {
        return "<!--" + this._charData + "-->";
    }

    /**
     * Returns the parent of this comment.
     */
    public up() {
        return this._parent;
    }
}
