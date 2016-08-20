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

import {IStringOptions, validateStringOptions} from "../options";
import {isType} from "../utils";
import {validateName} from "../validate";
import XmlAttribute from "./XmlAttribute";
import XmlCdata from "./XmlCdata";
import XmlCharRef from "./XmlCharRef";
import XmlComment from "./XmlComment";
import XmlEntityRef from "./XmlEntityRef";
import XmlNode from "./XmlNode";
import XmlProcInst from "./XmlProcInst";
import XmlText from "./XmlText";

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
 * {@link XmlText} nodes as children.
 */
export default class XmlElement extends XmlNode {
    private _name: string;

    /**
     * Initializes a new instance of the {@link XmlElement} class.
     *
     * @param {string} name The name of the element.
     */
    constructor(name: string) {
        super();
        this.name = name;
    }

    /**
     * Gets the name of the element.
     *
     * @returns {string} The name of the element.
     */
    get name(): string {
        return this._name;
    }

    /**
     * Sets the name of the element.
     *
     * @param {string} name The name of the element.
     */
    set name(name: string) {
        if (!isType(name, "String")) {
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
     * @param {string} name
     *        The name of the attribute.
     * @param {string|XmlNode|Array.<string|XmlNode>} value
     *        The value of the attribute. Strings are converted to XmlText
     *        nodes.
     * @param {number} [index]
     *        The index at which the node should be inserted. If no index is
     *        specified, the node is inserted at the end of this node's
     *        children.
     *
     * @returns {XmlAttribute} The newly created attribute.
     */
    public attribute(name: string, value: string | XmlNode | (string|XmlNode)[],
                     index?: number): XmlAttribute
    {
        if (isType(value, "String")) {
            value = new XmlText(<string> value);
        } else if (isType(value, "Array")) {
            let arrayVal = <(string|XmlNode)[]> value;
            for (let i = 0; i < arrayVal.length; i++) {
                if (isType(arrayVal[i], "String")) {
                    let strVal = <string> arrayVal[i];
                    arrayVal[i] = new XmlText(strVal);
                }
            }
        }

        let attribute = new XmlAttribute(name, <XmlNode|XmlNode[]> value);
        this.insertChild(attribute, index);
        return attribute;
    }

    /**
     * Returns an array containing all of the children of this node that are
     * instances of {@link XmlAttribute}.
     *
     * @returns {XmlAttribute[]} An array containing all of the children of
     *                           this node that are instances of
     *                           {@link XmlAttribute}.
     */
    public attributes(): XmlAttribute[] {
        return <XmlAttribute[]> this._children.filter(
            node => node instanceof XmlAttribute);
    }

    /**
     * Inserts a new CDATA section at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param {string} content The data of the CDATA section.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlCdata} The newly created CDATA section.
     */
    public cdata(content: string, index?: number): XmlCdata {
        let cdata = new XmlCdata(content);
        this.insertChild(cdata, index);
        return cdata;
    }

    /**
     * Inserts a new character reference at the specified index. If no index
     * is specified, the node is inserted at the end of this node's children.
     *
     * @param {string} char    The character to represent using the reference.
     * @param {boolean} [hex]  Whether to use the hexadecimal or decimal
     *                         representation for the reference. If left
     *                         undefined, decimal is the default.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlCharRef} The newly created character reference.
     */
    public charRef(char: string, hex?: boolean, index?: number): XmlCharRef {
        let charRef = new XmlCharRef(char, hex);
        this.insertChild(charRef, index);
        return charRef;
    }

    /**
     * Inserts a new comment at the specified index. If no index is specified,
     * the node is inserted at the end of this node's children.
     *
     * @param {string} content The data of the comment.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlComment} The newly created comment.
     */
    public comment(content: string, index?: number): XmlComment {
        let comment = new XmlComment(content);
        this.insertChild(comment, index);
        return comment;
    }

    /**
     * Inserts a new element at the specified index. If no index is specified,
     * the node is inserted at the end of this node's children.
     *
     * @param {string} name    The name of the element.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlElement} The newly created element.
     */
    public element(name: string, index?: number): XmlElement {
        let element = new XmlElement(name);
        this.insertChild(element, index);
        return element;
    }

    /**
     * Inserts a new entity reference at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param {string} entity  The entity to be referenced.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlEntityRef} The newly created entity reference.
     */
    public entityRef(entity: string, index?: number): XmlEntityRef {
        let entityRef = new XmlEntityRef(entity);
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
     * {@link XmlEntityRef}, {@link XmlProcInst}, or {@link XmlText} nodes can
     * be inserted; otherwise, an exception will be thrown.
     *
     * @param {XmlNode} node   The node to insert.
     * @param {number} [index] The index at which to insert the node. Nodes at
     *                         or after the index are shifted to the right. If
     *                         no index is specified, the node is inserted at
     *                         the end.
     *
     * @returns {XmlNode} The node inserted into this node's children, or
     *                    undefined if no node was inserted.
     */
    public insertChild(node: XmlNode, index?: number): XmlNode {
        if (!(node instanceof XmlAttribute
              || node instanceof XmlCdata
              || node instanceof XmlCharRef
              || node instanceof XmlComment
              || node instanceof XmlElement
              || node instanceof XmlEntityRef
              || node instanceof XmlProcInst
              || node instanceof XmlText))
        {
            throw new TypeError("node should be an instance of XmlAttribute,"
                                + " XmlCdata, XmlCharRef, XmlComment,"
                                + " XmlElement, XmlEntityRef, XmlProcInst,"
                                + " or XmlText");
        }

        if (node instanceof XmlAttribute) {
            let attributes = this._children.filter(
                n => n instanceof XmlAttribute);
            for (let attribute of <XmlAttribute[]> attributes) {
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
     * @param {string} target    The target of the processing instruction.
     * @param {string} [content] The data of the processing instruction, or
     *                           undefined if there is no target.
     * @param {number} [index]   The index at which the node should be inserted.
     *                           If no index is specified, the node is inserted
     *                           at the end of this node's children.
     *
     * @returns {XmlProcInst} The newly created processing instruction.
     */
    public procInst(target: string, content?: string,
                    index?: number): XmlProcInst
    {
        let procInst = new XmlProcInst(target, content);
        this.insertChild(procInst, index);
        return procInst;
    }

    /**
     * Inserts some new text at the specified index. If no index is specified,
     * the node is inserted at the end of this node's children.
     *
     * @param {string} text    Arbitrary character data.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlText} The newly created text node.
     */
    public text(text: string, index?: number): XmlText {
        let txt = new XmlText(text);
        this.insertChild(txt, index);
        return txt;
    }

    /**
     * Returns an XML string representation of this node.
     *
     * @param {IStringOptions} [options] Formatting options for the string
     *                                  representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    public toString(options: IStringOptions = {}) {
        validateStringOptions(options);

        let attributes = this.attributes();
        let nodes = this._children.filter(node => {
            return (<XmlNode[]> attributes).indexOf(node) === -1;
        });

        // Element tag start
        let str = "<" + this._name;

        // Attributes
        for (let attribute of attributes) {
            str += " " + attribute.toString(options);
        }

        // Child nodes
        if (nodes.length > 0) {
            // Element non-empty tag end
            str += ">";

            let indenter = (line: string) => options.indent + line;
            for (let i = 0; i < nodes.length; i++) {
                let next = nodes[i];
                let nextStr = next.toString(options);
                let prev = i > 0 ? nodes[i - 1] : undefined;

                // Line break before child nodes unless all nodes, or at least
                // the most recent two, are of type XmlCharacterReference,
                // XmlEntityReference, or XmlText
                if (options.pretty) {
                    if (!allSameLineNodes(nodes)) {
                        if (!(i > 0 && onSameLine(next, prev))) {
                            str += options.newline;
                            nextStr = nextStr.split(options.newline)
                                             .map(indenter)
                                             .join(options.newline);
                        }
                    }
                }

                str += nextStr;
            }

            // Line break before end tag unless all nodes are of type
            // XmlCharacterReference, XmlEntityReference, or XmlText
            if (options.pretty) {
                if (!allSameLineNodes(nodes)) {
                    str += options.newline;
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
 * {@link XmlEntityRef}, or {@link XmlText}.
 *
 * @param {XmlNode[]} nodes The specified nodes.
 *
 * @returns {boolean} Whether or not the specified nodes are all of type
 *                    {@link XmlCharRef}, {@link XmlEntityRef}, or
 *                    {@link XmlText}.
 *
 * @private
 */
function allSameLineNodes(nodes: XmlNode[]): boolean {
    for (let node of nodes) {
        if (!((node instanceof XmlCharRef
               || node instanceof XmlEntityRef
               || node instanceof XmlText)))
        {
            return false;
        }
    }
    return true;
}

/**
 * Returns true if the specified nodes are all of type {@link XmlCharRef},
 * {@link XmlEntityRef}, or {@link XmlText}.
 *
 * @param {XmlNode} prev The first specified node.
 * @param {XmlNode} next The second specified node.
 *
 * @returns {boolean} Whether or not the specified nodes are all of type
 *                    {@link XmlCharRef}, {@link XmlEntityRef}, or
 *                    {@link XmlText}.
 *
 * @private
 */
function onSameLine(prev: XmlNode, next: XmlNode): boolean {
    return (prev instanceof XmlCharRef
            || prev instanceof XmlEntityRef
            || prev instanceof XmlText)
           && (next instanceof XmlCharRef
               || next instanceof XmlEntityRef
               || next instanceof XmlText);
}
