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
import {isString} from "../utils";
import {validateChar} from "../validate";
import XmlNode from "./XmlNode";

/**
 * Represents text in an XML attribute value.
 *
 * Restricted characters, such as the ampersand (`&`) and the opening angle
 * bracket (`<`), are all automatically escaped.
 *
 * To create an character reference or entity reference, you should use
 * {@link XmlCharRef} or {@link XmlEntityRef} respectively instead.
 *
 * XmlAttributeText nodes cannot have any children.
 */
export default class XmlAttributeText extends XmlNode {
    private _text: string;

    /**
     * Initializes a new instance of the {@link XmlAttributeText} class.
     *
     * @param text Text.
     */
    constructor(text: string) {
        super();
        this.text = text;
    }

    /**
     * Gets the text associated with this node.
     *
     * @returns The text associated with this node.
     */
    get text(): string {
        return this._text;
    }

    /**
     * Sets the text associated with this node.
     *
     * @param text Text.
     */
    set text(text: string) {
        if (!isString(text)) {
            throw new TypeError("text should be a string");
        } else if (!validateChar(text)) {
            throw new Error("text should not contain characters not allowed"
                            + " in XML");
        }

        this._text = text;
    }

    /**
     * Throws an exception since {@link XmlAttributeText} nodes cannot have any
     * children.
     *
     * @returns This method does not return.
     */
    public children(): XmlNode[] {
        throw new Error("XmlAttributeText nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlAttributeText} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    public insertChild(node: XmlNode, index?: number): XmlNode | undefined {
        throw new Error("XmlAttributeText nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlAttributeText} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     *
     * @returns This method does not return.
     */
    public removeChild(node: XmlNode): boolean {
        throw new Error("XmlAttributeText nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlAttributeText} nodes cannot have any
     * children.
     *
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    public removeChildAtIndex(index: number): XmlNode {
        throw new Error("XmlAttributeText nodes cannot have children");
    }

    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
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
