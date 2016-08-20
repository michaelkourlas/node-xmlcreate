/**
 * Copyright (C) 2016 Michael Kourlas
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
import {IStringOptions} from "../options";
import {isType} from "../utils";
import {validateChar} from "../validate";
import XmlNode from "./XmlNode";

/**
 * Represents text in an XML document.
 *
 * This text may only consist of character data, not markup. Restricted
 * characters, such as the ampersand (`&`) and the opening angle bracket (`<`)
 * are all automatically escaped.
 *
 * To create an character reference or entity reference, you should use
 * {@link XmlCharRef} or {@link XmlEntityRef} respectively instead.
 *
 * XmlText nodes cannot have any children.
 */
export default class XmlText extends XmlNode {
    private _text: string;

    /**
     * Initializes a new instance of the {@link XmlText} class.
     *
     * @param {string} text Arbitrary character data.
     */
    constructor(text: string) {
        super();
        this.text = text;
    }

    /**
     * Gets the text associated with this node.
     *
     * @returns {string} The text associated with this node.
     */
    get text(): string {
        return this._text;
    }

    /**
     * Sets the text associated with this node.
     *
     * @param {string} text Arbitrary character data.
     */
    set text(text: string) {
        if (!isType(text, "String")) {
            throw new TypeError("text should be a string");
        } else if (!validateChar(text)) {
            throw new Error("text should not contain characters not allowed" +
                            " in XML");
        }

        this._text = text;
    }

    /**
     * Throws an exception since {@link XmlText} nodes cannot have any
     * children.
     */
    public children(): XmlNode[] {
        throw new Error("XmlText nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlText} nodes cannot have any
     * children.
     */
    public insertChild(node: XmlNode, index?: number): XmlNode {
        throw new Error("XmlText nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlText} nodes cannot have any
     * children.
     */
    public removeChild(node: XmlNode): boolean {
        throw new Error("XmlText nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlText} nodes cannot have any
     * children.
     */
    public removeChildAtIndex(index: number): XmlNode {
        throw new Error("XmlText nodes cannot have children");
    }

    /**
     * Returns an XML string representation of this node.
     *
     * @param {IStringOptions} [options] Formatting options for the string
     *                                  representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    public toString(options: IStringOptions = {}): string {
        let str = this.text;
        str = escapeAmpersands(str);
        str = escapeLeftAngleBrackets(str);
        return str;
    }
}
