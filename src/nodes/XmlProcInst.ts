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
import {isString, isUndefined} from "../utils";
import {validateChar} from "../validate";
import XmlNode from "./XmlNode";

/**
 * Represents an XML processing instruction.
 *
 * An XML processing instruction is structured as follows, where `{target}`
 * and `{content}` are the target and content of the processing instruction
 * respectively.
 *
 * ```xml
 * <?{target} {content}?>
 * ```
 *
 * The `{target}` and `{content}` values are properties of this node.
 *
 * XmlProcInst nodes cannot have any children.
 */
export default class XmlProcInst extends XmlNode {
    private _target: string;
    private _content?: string;

    /**
     * Initializes a new instance of the {@link XmlProcInst} class.
     *
     * @param target The target of the processing instruction.
     * @param content The data of the processing instruction, or undefined if
     *                there is no target.
     */
    constructor(target: string, content?: string) {
        super();
        this.target = target;
        this.content = content;
    }

    /**
     * Gets the target of the processing instruction.
     *
     * @returns The target of the processing instruction.
     */
    get target(): string {
        return this._target;
    }

    /**
     * Sets the target of the processing instruction.
     *
     * @param target The target of the processing instruction.
     */
    set target(target: string) {
        if (!isString(target)) {
            throw new TypeError("target should be a string");
        } else if (!validateChar(target)) {
            throw new Error("target should not contain characters"
                            + " not allowed in XML");
        } else if (target === "xml") {
            throw new Error("target should not be the string 'xml'");
        }
        this._target = target;
    }

    /**
     * Gets the data of the processing instruction.
     *
     * @returns The data of the processing instruction. This value may be
     *          undefined.
     */
    get content(): string | undefined {
        return this._content;
    }

    /**
     * Sets the data of the processing instruction.
     *
     * @param content The data of the processing instruction. This value may be
     *                undefined.
     */
    set content(content: string | undefined) {
        if (!isString(content) && !isUndefined(content)) {
            throw new TypeError("data should be a string or undefined");
        }
        if (isString(content)) {
            if (!validateChar(content)) {
                throw new Error("data should not contain characters"
                                + " not allowed in XML");
            } else if (/\?>/.test(content)) {
                throw new Error("data should not contain the string '?>'");
            }
        }
        this._content = content;
    }

    /**
     * Throws an exception since {@link XmlProcInst} nodes cannot have any
     * children.
     *
     * @returns This method does not return.
     */
    public children(): XmlNode[] {
        throw new Error("XmlProcInst nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlProcInst} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    public insertChild(node: XmlNode, index?: number): XmlNode | undefined {
        throw new Error("XmlProcInst nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlProcInst} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     *
     * @returns This method does not return.
     */
    public removeChild(node: XmlNode): boolean {
        throw new Error("XmlProcInst nodes cannot have children");
    }

    /**
     * Throws an exception since {@link XmlProcInst} nodes cannot have any
     * children.
     *
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    public removeChildAtIndex(index: number): XmlNode {
        throw new Error("XmlProcInst nodes cannot have children");
    }

    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    public toString(options: IStringOptions = {}): string {
        if (this.content === undefined) {
            return "<?" + this.target + "?>";
        } else {
            return "<?" + this.target + " " + this.content + "?>";
        }
    }
}
