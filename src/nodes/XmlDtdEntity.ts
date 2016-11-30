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
import {isString} from "../utils";
import {validateChar} from "../validate";
import XmlNode from "./XmlNode";

/**
 * Represents an XML entity declaration in a document type definition.
 *
 * An XML entity declaration is structured as follows, where `{text}` is the
 * text of the declaration:
 *
 * ```xml
 * <!ENTITY {text}>
 * ```
 *
 * The `{text}` value is a property of this node.
 *
 * XmlDtdEntity nodes cannot have any children.
 */
export default class XmlDtdEntity extends XmlNode {
    private _text: string;

    /**
     * Initializes a new instance of the {@link XmlDtdEntity} class.
     *
     * @param text The text associated with the XML entity declaration.
     */
    constructor(text: string) {
        super();
        this.text = text;
    }

    /**
     * Gets the text associated with the XML entity declaration.
     *
     * @return The text associated with the XML entity declaration.
     */
    get text(): string {
        return this._text;
    }

    /**
     * Sets the text associated with the XML entity declaration.
     *
     * @param text The text associated with the XML entity declaration.
     */
    set text(text: string) {
        if (!isString(text)) {
            throw new TypeError("text should be a string");
        } else if (!validateChar(text)) {
            throw new Error("data should not contain characters"
                            + " not allowed in XML");
        }
        this._text = text;
    }

    /**
     * Throws an exception since {@link XmlDtdEntity} nodes cannot have any
     * children.
     *
     * @returns This method does not return.
     */
    public children(): XmlNode[] {
        throw new Error("XmlDtdEntity nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlDtdEntity} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    public insertChild(node: XmlNode, index?: number): XmlNode | undefined {
        throw new Error("XmlDtdEntity nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlDtdEntity} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     *
     * @returns This method does not return.
     */
    public removeChild(node: XmlNode): boolean {
        throw new Error("XmlDtdEntity nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlDtdEntity} nodes cannot have any
     * children.
     *
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    public removeChildAtIndex(index: number): XmlNode {
        throw new Error("XmlDtdEntity nodes cannot have children");
    }

    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns An XML string representation of this node.
     */
    public toString(options: IStringOptions = {}): string {
        return "<!ENTITY " + this.text + ">";
    }
}
