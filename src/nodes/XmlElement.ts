/**
 * Copyright (C) 2016-2019 Michael Kourlas
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

import {getContext} from "../error";
import {IStringOptions, StringOptions} from "../options";
import {fixName, isUndefined, validateName} from "../validate";
import {
    default as XmlAttribute,
    IXmlAttributeOptions as IXmlAttributeOptions
} from "./XmlAttribute";
import XmlCdata, {IXmlCdataOptions} from "./XmlCdata";
import XmlCharData, {IXmlCharDataOptions} from "./XmlCharData";
import XmlCharRef, {IXmlCharRefOptions} from "./XmlCharRef";
import XmlComment, {IXmlCommentOptions} from "./XmlComment";
import XmlEntityRef, {IXmlEntityRefOptions} from "./XmlEntityRef";
import XmlProcInst, {IXmlProcInstOptions} from "./XmlProcInst";

/**
 * The options used to create a new element.
 */
export interface IXmlElementOptions {
    /**
     * The name of the element.
     */
    name: string;
    /**
     * Whether to replace any invalid characters in the name of the element
     * with the Unicode replacement character. By default, this is disabled.
     */
    replaceInvalidCharsInName?: boolean;
    /**
     * Whether to use a self-closing tag if this element is empty.
     *
     * For example, use:
     * ```xml
     * <element/>
     * ```
     * instead of:
     * ```xml
     * <element></element>
     * ```
     *
     * By default, this is enabled.
     */
    useSelfClosingTagIfEmpty?: boolean;
}

type Child<Parent> = XmlAttribute<XmlElement<Parent>>
    | XmlCdata<XmlElement<Parent>>
    | XmlCharData<XmlElement<Parent>>
    | XmlCharRef<XmlElement<Parent>>
    | XmlComment<XmlElement<Parent>>
    | XmlElement<XmlElement<Parent>>
    | XmlEntityRef<XmlElement<Parent>>
    | XmlProcInst<XmlElement<Parent>>;

/**
 * Represents an XML element.
 *
 * A sample element is structured as follows, where `{name}` is the name
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
 * XML elements can have an unlimited number of attributes, CDATA sections,
 * character references, comments, elements, entity references, processing
 * instructions, and character data.
 *
 * An element with no content will be represented using an empty element tag:
 *
 * ```xml
 * <{name}/>
 * ```
 */
export default class XmlElement<Parent> {
    private readonly _validation: boolean;
    private readonly _children: Array<Child<Parent>>;
    private readonly _attributeNames: string[];
    private readonly _parent: Parent;
    private readonly _replaceInvalidCharsInName: boolean;
    private readonly _useSelfClosingTagIfEmpty: boolean;
    private _name!: string;

    constructor(parent: Parent, validation: boolean,
                options: IXmlElementOptions)
    {
        this._validation = validation;
        if (!isUndefined(options.replaceInvalidCharsInName)) {
            this._replaceInvalidCharsInName = options.replaceInvalidCharsInName;
        } else {
            this._replaceInvalidCharsInName = false;
        }
        if (!isUndefined(options.useSelfClosingTagIfEmpty)) {
            this._useSelfClosingTagIfEmpty = options.useSelfClosingTagIfEmpty;
        } else {
            this._useSelfClosingTagIfEmpty = true;
        }
        this._children = [];
        this._attributeNames = [];
        this._parent = parent;

        this.name = options.name;
    }

    /**
     * Gets the name of this element.
     */
    public get name() {
        return this._name;
    }

    /**
     * Sets the name of this element.
     */
    public set name(name: string) {
        if (this._replaceInvalidCharsInName) {
            name = fixName(name);
            if (name.length === 0) {
                throw new Error(`${getContext(this.up())}: element name should`
                                + " not be empty");
            }
        } else if (this._validation && !validateName(name)) {
            if (name.length === 0) {
                throw new Error(`${getContext(this.up())}: element name should`
                                + " not be empty");
            } else {
                throw new Error(`${getContext(this.up())}: element name`
                                + ` "${name}" should not contain characters not`
                                + " allowed in XML names");
            }
        }
        this._name = name;
    }

    /**
     * Adds an attribute to this element and returns the new attribute.
     */
    public attribute(options: IXmlAttributeOptions) {
        if (this._validation
            && this._attributeNames.indexOf(options.name) !== -1)
        {
            throw new Error(`${getContext(this.up())}: element "${this.name}"`
                            + " already contains an attribute with the"
                            + ` name "${options.name}"`);
        }
        const attribute = new XmlAttribute(this, this._validation, options);
        this._children.push(attribute);
        this._attributeNames.push(options.name);
        return attribute;
    }

    /**
     * Adds a CDATA section to this element and returns the new CDATA section.
     */
    public cdata(options: IXmlCdataOptions) {
        const cdata = new XmlCdata(this, this._validation, options);
        this._children.push(cdata);
        return cdata;
    }

    /**
     * Adds character data to this element and returns the new character data.
     */
    public charData(options: IXmlCharDataOptions) {
        const charDataNode = new XmlCharData(this, this._validation, options);
        this._children.push(charDataNode);
        return charDataNode;
    }

    /**
     * Adds a character reference to this element and returns the new
     * character reference.
     */
    public charRef(options: IXmlCharRefOptions) {
        const charRef = new XmlCharRef(this, this._validation, options);
        this._children.push(charRef);
        return charRef;
    }

    /**
     * Adds a comment to this element and returns the new comment.
     */
    public comment(options: IXmlCommentOptions) {
        const comment = new XmlComment(this, this._validation, options);
        this._children.push(comment);
        return comment;
    }

    /**
     * Adds an element to this element and returns the new element.
     */
    public element(options: IXmlElementOptions) {
        const element = new XmlElement(this, this._validation, options);
        this._children.push(element);
        return element;
    }

    /**
     * Adds an entity reference to this element and returns the new entity
     * reference.
     */
    public entityRef(options: IXmlEntityRefOptions) {
        const entityRef = new XmlEntityRef(this, this._validation, options);
        this._children.push(entityRef);
        return entityRef;
    }

    /**
     * Adds a processing instruction to this element and returns the new
     * processing instruction.
     */
    public procInst(options: IXmlProcInstOptions) {
        const procInst = new XmlProcInst(this, this._validation, options);
        this._children.push(procInst);
        return procInst;
    }

    /**
     * Returns an XML string representation of this element using the specified
     * options.
     */
    public toString(options: IStringOptions = {}) {
        return this.toStringWithIndent(options, "");
    }

    /**
     * Returns the parent of this element.
     */
    public up() {
        return this._parent;
    }

    /**
     * Returns an XML string representation of this element using the specified
     * options and initial indent.
     */
    private toStringWithIndent(options: IStringOptions, indent: string) {
        const optionsObj = new StringOptions(options);

        const newIndent = indent + optionsObj.indent;

        // Element tag start
        let str = "<" + this._name;

        // Attributes and other nodes
        const nodes: Array<Child<Parent>> = [];
        for (const node of this._children) {
            if (node instanceof XmlAttribute) {
                str += " " + node.toString(options);
            } else {
                nodes.push(node);
            }
        }

        // Child nodes
        if (nodes.length > 0) {
            let childStr = "";

            for (let i = 0; i < nodes.length; i++) {
                const next = nodes[i];

                let nextStr = "";
                if (next instanceof XmlElement) {
                    nextStr += next.toStringWithIndent(
                        optionsObj, newIndent);
                } else {
                    nextStr += next.toString();
                }

                const prev = i > 0 ? nodes[i - 1] : undefined;

                // Skip empty nodes
                if (next instanceof XmlCharData && next.toString() === "") {
                    continue;
                }

                // Line break before child nodes unless all nodes, or at least
                // the most recent two, are of type XmlCharacterReference,
                // XmlEntityReference, or XmlCharData
                if (optionsObj.pretty) {
                    if (!this.allSameLineNodes(nodes)) {
                        if (!(i > 0 && this.onSameLine(next, prev))) {
                            nextStr = optionsObj.newline + newIndent + nextStr;
                        }
                    }
                }

                childStr += nextStr;
            }

            // Line break before end tag unless all nodes are of type
            // XmlCharacterReference, XmlEntityReference, or XmlCharData
            if (optionsObj.pretty) {
                if (!this.allSameLineNodes(nodes)) {
                    childStr += optionsObj.newline + indent;
                }
            }

            if (childStr.length === 0 && this._useSelfClosingTagIfEmpty) {
                // Element empty tag end
                str += "/>";
            } else {
                // Element start and end tags
                str += ">" + childStr + "</" + this._name + ">";
            }
        } else if (this._useSelfClosingTagIfEmpty) {
            // Element empty tag end
            str += "/>";
        } else {
            // Element start and end tags
            str += "></" + this._name + ">";
        }

        return str;
    }

    /**
     * Returns true if the specified nodes are all character references,
     * entity references, or character data.
     */
    private allSameLineNodes(nodes: Array<Child<Parent>>) {
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
     * Returns true if the specified nodes are all character references,
     * entity references, or character data.
     */
    private onSameLine(prev: Child<Parent>, next?: Child<Parent>) {
        return (prev instanceof XmlCharRef
                || prev instanceof XmlEntityRef
                || prev instanceof XmlCharData)
               && (!isUndefined(next)
               && (next instanceof XmlCharRef
                   || next instanceof XmlEntityRef
                   || next instanceof XmlCharData));
    }
}
