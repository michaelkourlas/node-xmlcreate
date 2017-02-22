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
import {escapeDoubleQuotes, escapeSingleQuotes} from "../escape";
import {IStringOptions, StringOptions} from "../options";
import {isArray, isString} from "../utils";
import {validateName} from "../validate";
import XmlAttributeText from "./XmlAttributeText";
import XmlCharRef from "./XmlCharRef";
import XmlEntityRef from "./XmlEntityRef";
import XmlNode from "./XmlNode";

/**
 * Represents an XML element attribute.
 *
 * An XML element attribute is part of the start tag of an element and is
 * structured as follows, where `{name}` is the name of the attribute and
 * `{value}` is the value of the attribute:
 *
 * ```xml
 * <element {name}="{value}">
 * ```
 *
 * The `{name}` value is a property of this node, while the `{value}` property
 * consists of the children of this node.
 *
 * XmlAttribute nodes must have at least one child, and can have an unlimited
 * number of {@link XmlAttributeText}, {@link XmlCharRef}, and
 * {@link XmlEntityRef} nodes as children.
 */
export default class XmlAttribute extends XmlNode {
    private _name: string;

    /**
     * Initializes a new instance of the {@link XmlAttribute} class.
     *
     * @param name The name of the XML attribute.
     * @param value The initial value of the XML attribute. Additional children
     *              can be added later. Only {@link XmlAttributeText},
     *              {@link XmlCharRef}, and {@link XmlEntityRef} nodes are
     *              permitted.
     */
    constructor(name: string, value: XmlNode | XmlNode[]) {
        super();
        this.name = name;
        if (isArray(value)) {
            for (const node of value) {
                this.insertChild(node);
            }
        } else {
            this.insertChild(value);
        }
    }

    /**
     * Gets the name of this attribute.
     *
     * @returns The name of this attribute.
     */
    get name(): string {
        return this._name;
    }

    /**
     * Sets the name of this attribute.
     *
     * @param name The name of this attribute.
     */
    set name(name: string) {
        if (!isString(name)) {
            throw new TypeError("name should be a string");
        } else if (!validateName(name)) {
            throw new Error("name should not contain characters not"
                            + " allowed in XML names");
        }
        this._name = name;
    }

    /**
     * Inserts a new XML character reference at the specified index.
     *
     * @param char The character to represent using the reference.
     * @param hex Whether to use the hexadecimal or decimal representation for
     *            the reference. If left undefined, decimal is the default.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this node's
     *              children.
     *
     * @returns The newly created XML declaration.
     */
    public charRef(char: string, hex: boolean, index?: number): XmlCharRef {
        const charRef = new XmlCharRef(char, hex);
        this.insertChild(charRef, index);
        return charRef;
    }

    /**
     * Inserts a new XML entity reference at the specified index.
     *
     * @param entity The entity to be referenced.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this
     *              node's children.
     *
     * @returns The newly created XML declaration.
     */
    public entityRef(entity: string, index?: number): XmlEntityRef {
        const charRef = new XmlEntityRef(entity);
        this.insertChild(charRef, index);
        return charRef;
    }

    /**
     * Inserts the specified node into this node's children at the specified
     * index. The node is not inserted if it is already present. If this node
     * already has a parent, it is removed from that parent.
     *
     * Note that only {@link XmlCharRef}, {@link XmlEntityRef}, and
     * {@link XmlCharData} nodes can be inserted; otherwise, an exception will
     * be thrown.
     *
     * @param node The node to insert.
     * @param index The index at which to insert the node. Nodes at or after the
     *              index are shifted to the right. If no index is specified,
     *              the node is inserted at the end.
     *
     * @returns The node inserted into this node's children, or undefined if no
     *          node was inserted.
     */
    public insertChild(node: XmlNode, index?: number): XmlNode | undefined {
        if (!(node instanceof XmlCharRef || node instanceof XmlEntityRef ||
              node instanceof XmlAttributeText))
        {
            throw new TypeError("node should be an instance of XmlCharRef,"
                                + " XmlEntityRef, or XmlAttributeText");
        }
        return super.insertChild(node, index);
    }

    /**
     * Removes the specified node from this node's children.
     *
     * Note that this node must have at least one child. Attempts to remove
     * the last child node will result in an exception.
     *
     * @param node The node to remove.
     *
     * @returns Whether a node was removed.
     */
    public removeChild(node: XmlNode): boolean {
        if (this._children.length === 1) {
            throw new Error("XmlAttribute nodes must have at least one child");
        }
        return super.removeChild(node);
    }

    /**
     * Removes the node at the specified index from this node's children.
     *
     * Note that this node must have at least one child. Attempts to remove
     * the last child node will result in an exception.
     *
     * @param index The index at which the node to be removed is located.
     *
     * @returns The node that was removed, or undefined if no node was removed.
     */
    public removeChildAtIndex(index: number): XmlNode {
        if (this._children.length === 1) {
            throw new Error("XmlAttribute nodes must have at least one child");
        }
        return super.removeChildAtIndex(index);
    }

    /**
     * Inserts a new XML text node at the specified index.
     *
     * @param text Arbitrary character data.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this node's
     *              children.
     *
     * @returns The newly created XML declaration.
     */
    public text(text: string, index?: number): XmlAttributeText {
        const textNode = new XmlAttributeText(text);
        this.insertChild(textNode, index);
        return textNode;
    }

    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns An XML string representation of this node.
     */
    public toString(options: IStringOptions = {}): string {
        const optionsObj = new StringOptions(options);

        const quote = optionsObj.doubleQuotes ? "\"" : "'";
        let str = this.name + "=" + quote;
        for (const child of this._children) {
            if (optionsObj.doubleQuotes) {
                str += escapeDoubleQuotes(child.toString(options));
            } else {
                str += escapeSingleQuotes(child.toString(options));
            }
        }
        str += quote;
        return str;
    }
}
