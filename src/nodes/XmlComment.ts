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
 * Represents an XML comment.
 *
 * An XML character reference is structured as follows, where `{content}` is
 * the text of the comment.
 *
 * ```xml
 * <!--{content}-->
 * ```
 *
 * The `{content}` value is a property of this node.
 *
 * XmlComment nodes cannot have any children.
 */
export default class XmlComment extends XmlNode {
    private _content: string;

    /**
     * Initializes a new instance of the {@link XmlComment} class.
     *
     * @param content The content of the comment.
     */
    constructor(content: string) {
        super();
        this.content = content;
    }

    /**
     * Gets the content of the comment.
     *
     * @returns The content of the comment.
     */
    get content(): string {
        return this._content;
    }

    /**
     * Sets the content of the comment.
     *
     * @param content The content of the comment.
     */
    set content(content: string) {
        if (!isString(content)) {
            throw new TypeError("content should be a string");
        } else if (!validateChar(content)) {
            throw new Error("content should not contain characters"
                            + " not allowed in XML");
        } else if (!/^([^-]|-[^-])*$/.test(content)) {
            throw new Error("content should not contain the string '--' or"
                            + " end with '-'");
        }
        this._content = content;
    }

    /**
     * Throws an exception since {@link XmlComment} nodes cannot have any
     * children.
     *
     * @returns This method does not return.
     */
    public children(): XmlNode[] {
        throw new Error("XmlComment nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlComment} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    public insertChild(node: XmlNode, index?: number): XmlNode | undefined
    {
        throw new Error("XmlComment nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlComment} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     *
     * @returns This method does not return.
     */
    public removeChild(node: XmlNode): boolean {
        throw new Error("XmlComment nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlComment} nodes cannot have any
     * children.
     *
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    public removeChildAtIndex(index: number): XmlNode {
        throw new Error("XmlComment nodes cannot have children");
    }

    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns An XML string representation of this node.
     */
    public toString(options: IStringOptions = {}): string {
        return "<!--" + this.content + "-->";
    }
}
