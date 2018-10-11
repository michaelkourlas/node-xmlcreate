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
 * The options used to create a new comment.
 */
export interface IXmlCommentOptions {
    /**
     * The content of the comment.
     */
    charData: string;
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
    private readonly _charData: string;
    private readonly _parent: Parent;

    constructor(parent: Parent, validation: boolean,
                options: IXmlCommentOptions)
    {
        if (validation && !validateChar(options.charData)) {
            throw new Error("Comment content should not contain characters"
                            + " not allowed in XML");
        }
        if (validation && !/^([^-]|-[^-])*$/.test(options.charData)) {
            throw new Error("Comment content should not contain the string"
                            + " '--' or end with '-'");
        }
        this._charData = options.charData;
        this._parent = parent;
    }

    /**
     * Returns an XML string representation of this comment.
     */
    public toString(): string {
        return "<!--" + this._charData + "-->";
    }

    /**
     * Returns the parent of this comment.
     */
    public up(): Parent {
        return this._parent;
    }
}
