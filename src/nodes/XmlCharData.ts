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
import {
    escapeAmpersands,
    escapeLeftAngleBrackets,
    escapeRightAngleBracketsInCdataTerminator
} from "../escape";
import {IStringOptions} from "../options";
import {isString} from "../utils";
import {validateChar} from "../validate";
import XmlNode from "./XmlNode";

/**
 * Represents character data in an XML document.
 *
 * Restricted characters, such as the ampersand (`&`), the opening angle
 * bracket (`<`), and the closing angle bracket (`>`) when it appears in the
 * string `]]>`, are all automatically escaped.
 *
 * To create an character reference or entity reference, you should use
 * {@link XmlCharRef} or {@link XmlEntityRef} respectively instead.
 *
 * XmlCharData nodes cannot have any children.
 */
export default class XmlCharData extends XmlNode {
    private _charData: string;

    /**
     * Initializes a new instance of the {@link XmlCharData} class.
     *
     * @param charData Character data.
     */
    constructor(charData: string) {
        super();
        this.charData = charData;
    }

    /**
     * Gets the character data associated with this node.
     *
     * @returns The character data associated with this node.
     */
    get charData(): string {
        return this._charData;
    }

    /**
     * Sets the character data associated with this node.
     *
     * @param charData Character data.
     */
    set charData(charData: string) {
        if (!isString(charData)) {
            throw new TypeError("charData should be a string");
        } else if (!validateChar(charData)) {
            throw new Error("charData should not contain characters not allowed"
                            + " in XML");
        }

        this._charData = charData;
    }

    /**
     * Throws an exception since {@link XmlCharData} nodes cannot have any
     * children.
     *
     * @returns This method does not return.
     */
    public children(): XmlNode[] {
        throw new Error("XmlCharData nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlCharData} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    public insertChild(node: XmlNode, index?: number): XmlNode | undefined {
        throw new Error("XmlCharData nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlCharData} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     *
     * @returns This method does not return.
     */
    public removeChild(node: XmlNode): boolean {
        throw new Error("XmlCharData nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlCharData} nodes cannot have any
     * children.
     *
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    public removeChildAtIndex(index: number): XmlNode {
        throw new Error("XmlCharData nodes cannot have children");
    }

    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    public toString(options: IStringOptions = {}): string {
        let str = this.charData;
        str = escapeAmpersands(str);
        str = escapeLeftAngleBrackets(str);
        str = escapeRightAngleBracketsInCdataTerminator(str);
        return str;
    }
}
