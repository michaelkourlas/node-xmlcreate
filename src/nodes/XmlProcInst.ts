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
    private readonly _validation: boolean;
    private readonly _parent: Parent;
    private _content!: string | undefined;
    private _target!: string;

    constructor(parent: Parent, validation: boolean,
                options: IXmlProcInstOptions)
    {
        this._validation = validation;
        this._parent = parent;
        this.content = options.content;
        this.target = options.target;
    }

    /**
     * Gets the content of this processing instruction.
     */
    public get content() {
        return this._content;
    }

    /**
     * Sets the content of this processing instruction.
     */
    public set content(content: string | undefined) {
        if (!isUndefined(content)) {
            if (this._validation && !validateChar(content)) {
                throw new Error(`${getContext(this.up())}: processing`
                                + ` instruction content "${content}" should`
                                + " not contain characters not allowed in XML");
            } else if (this._validation && content.indexOf("?>") !== -1) {
                throw new Error(`${getContext(this.up())}: processing`
                                + ` instruction content "${content}" should`
                                + " not contain the string '?>'");
            }
        }
        this._content = content;
    }

    /**
     * Gets the target of this processing instruction.
     */
    public get target() {
        return this._target;
    }

    /**
     * Sets the content of this processing instruction.
     */
    public set target(target: string) {
        if (this._validation && !validateName(target)) {
            throw new Error(`${getContext(this.up())}: processing`
                            + ` instruction target "${target}" should`
                            + " not contain characters not allowed in XML"
                            + " names");
        }
        if (this._validation && target === "xml") {
            throw new Error(`${getContext(this.up())}: processing`
                            + ` instruction target "${target}" should`
                            + " not be the string 'xml'");
        }
        this._target = target;
    }

    /**
     * Returns an XML string representation of this processing instruction.
     */
    public toString() {
        if (isUndefined(this._content)) {
            return "<?" + this._target + "?>";
        } else {
            return "<?" + this._target + " " + this._content + "?>";
        }
    }

    /**
     * Returns the parent of this processing instruction.
     */
    public up() {
        return this._parent;
    }
}
