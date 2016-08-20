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

import {IStringOptions} from "../options";
import {isType} from "../utils";
import {validateChar} from "../validate";
import XmlNode from "./XmlNode";

/**
 * Represents an XML attribute-list declaration in a document type definition.
 *
 * An XML attribute-list declaration is structured as follows, where `{text}`
 * is the text of the declaration:
 *
 * ```xml
 * <!ATTLIST {text}>
 * ```
 *
 * The `{text}` value is a property of this node.
 *
 * XmlDtdAttlist nodes cannot have any children.
 */
export default class XmlDtdAttlist extends XmlNode {
    private _text: string;

    /**
     * Initializes a new instance of the {@link XmlDtdAttlist} class.
     *
     * @param {string} text The text associated with the XML attribute-list
     *                      declaration.
     */
    constructor(text: string) {
        super();
        this.text = text;
    }

    /**
     * Gets the text associated with the XML attribute-list declaration.
     *
     * @return {string} The text associated with the XML attribute-list
     *                  declaration.
     */
    get text(): string {
        return this._text;
    }

    /**
     * Sets the text associated with the XML attribute-list declaration.
     *
     * @param {string} text The text associated with the XML attribute-list
     *                      declaration.
     */
    set text(text: string) {
        if (!isType(text, "String")) {
            throw new TypeError("text should be a string");
        } else if (!validateChar(text)) {
            throw new Error("data should not contain characters"
                            + " not allowed in XML");
        }
        this._text = text;
    }

    /**
     * Throws an exception since {@link XmlDtdAttlist} nodes cannot have any
     * children.
     */
    public children(): XmlNode[] {
        throw new Error("XmlDtdAttlist nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlDtdAttlist} nodes cannot have any
     * children.
     */
    public insertChild(node: XmlNode, index?: number): XmlNode {
        throw new Error("XmlDtdAttlist nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlDtdAttlist} nodes cannot have any
     * children.
     */
    public removeChild(node: XmlNode): boolean {
        throw new Error("XmlDtdAttlist nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlDtdAttlist} nodes cannot have any
     * children.
     */
    public removeChildAtIndex(index: number): XmlNode {
        throw new Error("XmlDtdAttlist nodes cannot have children");
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
        return "<!ATTLIST " + this.text + ">";
    }
}
