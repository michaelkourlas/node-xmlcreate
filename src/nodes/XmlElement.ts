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
import {IStringOptions, StringOptions} from "../options";
import {isArray, isString} from "../utils";
import {validateName} from "../validate";
import XmlAttribute from "./XmlAttribute";
import XmlAttributeText from "./XmlAttributeText";
import XmlCdata from "./XmlCdata";
import XmlCharData from "./XmlCharData";
import XmlCharRef from "./XmlCharRef";
import XmlComment from "./XmlComment";
import XmlEntityRef from "./XmlEntityRef";
import XmlNode from "./XmlNode";
import XmlProcInst from "./XmlProcInst";

/**
 * Represents an XML element.
 *
 * A sample XML element is structured as follows, where `{name}` is the name
 * of the element:
 *
 * ```xml
 * <{name} attname="attvalue">
 *     <subelem/>
 *     <?pitarget picontent?>
 *     text
 * </{name}></pre>
 * ```
 *
 * The `{name}` value is a property of the node, while the attributes and
 * children of the element (such as other elements, processing instructions,
 * and text) are children of this node.
 *
 * XmlElement nodes can have an unlimited number of {@link XmlAttribute},
 * {@link XmlCdata}, {@link XmlCharRef}, {@link XmlComment},
 * {@link XmlElement}, {@link XmlEntityRef}, {@link XmlProcInst}, or
 * {@link XmlCharData} nodes as children.
 */
export default class XmlElement extends XmlNode {
    private _name: string;

    /**
     * Initializes a new instance of the {@link XmlElement} class.
     *
     * @param name The name of the element.
     */
    constructor(name: string) {
        super();
        this.name = name;
    }

    /**
     * Gets the name of the element.
     *
     * @returns The name of the element.
     */
    get name(): string {
        return this._name;
    }

    /**
     * Sets the name of the element.
     *
     * @param name The name of the element.
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
     * Inserts an new attribute at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param name The name of the attribute.
     * @param value The value of the attribute. Strings are converted to
     *        XmlAttributeText nodes.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this
     *              node's children.
     *
     * @returns {XmlAttribute} The newly created attribute.
     */
    public attribute(name: string,
                     value: string | XmlNode | Array<string | XmlNode>,
                     index?: number): XmlAttribute
    {
        if (isString(value)) {
            value = new XmlAttributeText(value);
        } else if (isArray(value)) {
            for (let i = 0; i < value.length; i++) {
                if (isString(value[i])) {
                    value[i] = new XmlAttributeText(value[i] as string);
                }
            }
        }

        const attribute = new XmlAttribute(name, value as XmlNode | XmlNode[]);
        this.insertChild(attribute, index);
        return attribute;
    }

    /**
     * Returns an array containing all of the children of this node that are
     * instances of {@link XmlAttribute}.
     *
     * @returns An array containing all of the children of this node that are
     *          instances of {@link XmlAttribute}.
     */
    public attributes(): XmlAttribute[] {
        return this._children.filter(
            (node) => node instanceof XmlAttribute) as XmlAttribute[];
    }

    /**
     * Inserts a new CDATA section at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param content The data of the CDATA section.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this node's
     *              children.
     *
     * @returns The newly created CDATA section.
     */
    public cdata(content: string, index?: number): XmlCdata {
        const cdata = new XmlCdata(content);
        this.insertChild(cdata, index);
        return cdata;
    }

    /**
     * Inserts some character data at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param charData Character data.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this
     *              node's children.
     *
     * @returns The newly created text node.
     */
    public charData(charData: string, index?: number): XmlCharData {
        const charDataNode = new XmlCharData(charData);
        this.insertChild(charDataNode, index);
        return charDataNode;
    }

    /**
     * Inserts a new character reference at the specified index. If no index
     * is specified, the node is inserted at the end of this node's children.
     *
     * @param char The character to represent using the reference.
     * @param hex Whether to use the hexadecimal or decimal representation for
     *            the reference. If left undefined, decimal is the default.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this
     *              node's children.
     *
     * @returns The newly created character reference.
     */
    public charRef(char: string, hex?: boolean, index?: number): XmlCharRef {
        const charRef = new XmlCharRef(char, hex);
        this.insertChild(charRef, index);
        return charRef;
    }

    /**
     * Inserts a new comment at the specified index. If no index is specified,
     * the node is inserted at the end of this node's children.
     *
     * @param content The data of the comment.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this
     *              node's children.
     *
     * @returns The newly created comment.
     */
    public comment(content: string, index?: number): XmlComment {
        const comment = new XmlComment(content);
        this.insertChild(comment, index);
        return comment;
    }

    /**
     * Inserts a new element at the specified index. If no index is specified,
     * the node is inserted at the end of this node's children.
     *
     * @param name The name of the element.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this
     *              node's children.
     *
     * @returns The newly created element.
     */
    public element(name: string, index?: number): XmlElement {
        const element = new XmlElement(name);
        this.insertChild(element, index);
        return element;
    }

    /**
     * Inserts a new entity reference at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param entity The entity to be referenced.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this
     *              node's children.
     *
     * @returns The newly created entity reference.
     */
    public entityRef(entity: string, index?: number): XmlEntityRef {
        const entityRef = new XmlEntityRef(entity);
        this.insertChild(entityRef, index);
        return entityRef;
    }

    /**
     * Inserts the specified node into this node's children at the specified
     * index. The node is not inserted if it is already present. If this node
     * already has a parent, it is removed from that parent.
     *
     * Note that only {@link XmlAttribute}, {@link XmlCdata},
     * {@link XmlCharRef}, {@link XmlComment}, {@link XmlElement},
     * {@link XmlEntityRef}, {@link XmlProcInst}, or {@link XmlCharData} nodes
     * can be inserted; otherwise, an exception will be thrown.
     *
     * @param node The node to insert.
     * @param index The index at which to insert the node. Nodes at or after
     *              the index are shifted to the right. If no index is
     *              specified, the node is inserted at the end.
     *
     * @returns The node inserted into this node's children, or undefined if no
     *          node was inserted.
     */
    public insertChild(node: XmlNode, index?: number): XmlNode | undefined {
        if (!(node instanceof XmlAttribute
              || node instanceof XmlCdata
              || node instanceof XmlCharRef
              || node instanceof XmlComment
              || node instanceof XmlElement
              || node instanceof XmlEntityRef
              || node instanceof XmlProcInst
              || node instanceof XmlCharData))
        {
            throw new TypeError("node should be an instance of XmlAttribute,"
                                + " XmlCdata, XmlCharRef, XmlComment,"
                                + " XmlElement, XmlEntityRef, XmlProcInst,"
                                + " or XmlText");
        }

        if (node instanceof XmlAttribute) {
            const attributes = this._children.filter(
                (n) => n instanceof XmlAttribute) as XmlAttribute[];
            for (const attribute of attributes) {
                if (attribute.name === node.name) {
                    throw new Error("element already contains an"
                                    + " XmlAttribute object with name "
                                    + node.name);
                }
            }
        }

        return super.insertChild(node, index);
    }

    /**
     * Inserts a new processing instruction at the specified index. If no index
     * is specified, the node is inserted at the end of this node's children.
     *
     * @param target The target of the processing instruction.
     * @param content The data of the processing instruction, or undefined if
     *                there is no target.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this node's
     *              children.
     *
     * @returns The newly created processing instruction.
     */
    public procInst(target: string, content?: string,
                    index?: number): XmlProcInst
    {
        const procInst = new XmlProcInst(target, content);
        this.insertChild(procInst, index);
        return procInst;
    }

    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns An XML string representation of this node.
     */
    public toString(options: IStringOptions = {}) {
        const optionsObj = new StringOptions(options);

        const attributes = this.attributes();
        const nodes = this._children.filter(
            (node) => attributes.indexOf(node as XmlAttribute) === -1);

        // Element tag start
        let str = "<" + this._name;

        // Attributes
        for (const attribute of attributes) {
            str += " " + attribute.toString(options);
        }

        // Child nodes
        if (nodes.length > 0) {
            // Element non-empty tag end
            str += ">";

            const indenter = (line: string) => optionsObj.indent + line;
            for (let i = 0; i < nodes.length; i++) {
                const next = nodes[i];
                let nextStr = next.toString(options);
                const prev = i > 0 ? nodes[i - 1] : undefined;

                // Line break before child nodes unless all nodes, or at least
                // the most recent two, are of type XmlCharacterReference,
                // XmlEntityReference, or XmlCharData
                if (optionsObj.pretty) {
                    if (!allSameLineNodes(nodes)) {
                        if (!(i > 0 && onSameLine(next, prev))) {
                            str += optionsObj.newline;
                            nextStr = nextStr.split(optionsObj.newline)
                                             .map(indenter)
                                             .join(optionsObj.newline);
                        }
                    }
                }

                str += nextStr;
            }

            // Line break before end tag unless all nodes are of type
            // XmlCharacterReference, XmlEntityReference, or XmlCharData
            if (optionsObj.pretty) {
                if (!allSameLineNodes(nodes)) {
                    str += optionsObj.newline;
                }
            }

            // Element end tag
            str += "</" + this._name + ">";
        } else {
            // Element empty tag end
            str += "/>";
        }

        return str;
    }
}

/**
 * Returns true if the specified nodes are all of type {@link XmlCharRef},
 * {@link XmlEntityRef}, or {@link XmlCharData}.
 *
 * @param nodes The specified nodes.
 *
 * @returns Whether or not the specified nodes are all of type
 *          {@link XmlCharRef}, {@link XmlEntityRef}, or {@link XmlCharData}.
 *
 * @private
 */
function allSameLineNodes(nodes: XmlNode[]): boolean {
    for (const node of nodes) {
        if (!((node instanceof XmlCharRef
               || node instanceof XmlEntityRef
               || node instanceof XmlCharData)))
        {
            return false;
        }
    }
    return true;
}

/**
 * Returns true if the specified nodes are all of type {@link XmlCharRef},
 * {@link XmlEntityRef}, or {@link XmlCharData}.
 *
 * @param prev The first specified node.
 * @param next The second specified node.
 *
 * @returns Whether or not the specified nodes are all of type
 *          {@link XmlCharRef}, {@link XmlEntityRef}, or {@link XmlCharData}.
 *
 * @private
 */
function onSameLine(prev: XmlNode, next?: XmlNode): boolean {
    return (prev instanceof XmlCharRef
            || prev instanceof XmlEntityRef
            || prev instanceof XmlCharData)
           && (next instanceof XmlCharRef
               || next instanceof XmlEntityRef
               || next instanceof XmlCharData);
}
