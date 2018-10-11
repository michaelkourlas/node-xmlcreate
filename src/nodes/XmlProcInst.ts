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

import {isUndefined, validateChar, validateName} from "../validate";

/**
 * The options used to create a new processing instruction.
 */
export interface IXmlProcInstOptions {
    /**
     * The target of the processing instruction.
     */
    target: string;
    /**
     * The data of the processing instruction, or undefined if there is no
     * content.
     */
    content?: string;
}

/**
 * Represents a processing instruction.
 *
 * A processing instruction is structured as follows, where `{target}` and
 * `{content}` are the target and content of the processing instruction
 * respectively:
 *
 * ```xml
 * <?{target} {content}?>
 * ```
 */
export default class XmlProcInst<Parent> {
    private readonly _content?: string;
    private readonly _parent: Parent;
    private readonly _target: string;

    constructor(parent: Parent, validation: boolean,
                options: IXmlProcInstOptions)
    {
        if (!isUndefined(options.content)) {
            if (validation && !validateChar(options.content)) {
                throw new Error("Processing instruction content should"
                                + " not contain characters not allowed in XML");
            } else if (validation && /\?>/.test(options.content)) {
                throw new Error("Processing instruction content should"
                                + " not contain the string '?>'");
            }
        }
        this._content = options.content;
        this._parent = parent;
        if (validation && !validateName(options.target)) {
            throw new Error("Processing instruction target should not"
                            + " contain characters not allowed in XML names");
        }
        if (validation && options.target === "xml") {
            throw new Error("Processing instruction target should not be"
                            + " the string 'xml'");
        }
        this._target = options.target;
    }

    /**
     * Returns an XML string representation of this processing instruction.
     */
    public toString(): string {
        if (isUndefined(this._content)) {
            return "<?" + this._target + "?>";
        } else {
            return "<?" + this._target + " " + this._content + "?>";
        }
    }

    /**
     * Returns the parent of this processing instruction.
     */
    public up(): Parent {
        return this._parent;
    }
}
