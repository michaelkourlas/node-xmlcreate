/**
 * Copyright (C) 2016-2018 Michael Kourlas
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
import {validateName} from "../validate";
import XmlAttributeText, {IXmlAttributeTextOptions} from "./XmlAttributeText";
import XmlCharRef, {IXmlCharRefOptions} from "./XmlCharRef";
import XmlEntityRef, {IXmlEntityRefOptions} from "./XmlEntityRef";

/**
 * The options used to create a new attribute.
 */
export interface IXmlAttributeOptions {
    /**
     * The name of the attribute.
     */
    name: string;
}

type Child<Parent> = XmlAttributeText<XmlAttribute<Parent>>
    | XmlCharRef<XmlAttribute<Parent>>
    | XmlEntityRef<XmlAttribute<Parent>>;

/**
 * Represents an attribute.
 *
 * An attribute is part of the start tag of an element and is
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
 * Attributes can have an unlimited number of attribute text, character
 * references, and entity references.
 */
export default class XmlAttribute<Parent> {
    private readonly _children: Array<Child<Parent>>;
    private readonly _name: string;
    private readonly _parent: Parent;
    private readonly _validation: boolean;

    constructor(parent: Parent, validation: boolean,
                options: IXmlAttributeOptions)
    {
        this._children = [];
        if (validation && !validateName(options.name)) {
            throw new Error("Attribute name should not contain characters"
                            + " not allowed in XML names");
        }
        this._name = options.name;
        this._parent = parent;
        this._validation = validation;
    }

    /**
     * Adds a character reference to this attribute and returns the new
     * character reference.
     */
    public charRef(
        options: IXmlCharRefOptions): XmlCharRef<XmlAttribute<Parent>>
    {
        const charRef = new XmlCharRef(this, this._validation, options);
        this._children.push(charRef);
        return charRef;
    }

    /**
     * Adds an entity reference to this attribute and returns the new entity
     * reference.
     */
    public entityRef(
        options: IXmlEntityRefOptions): XmlEntityRef<XmlAttribute<Parent>>
    {
        const charRef = new XmlEntityRef(this, this._validation, options);
        this._children.push(charRef);
        return charRef;
    }

    /**
     * Adds attribute text to this attribute and returns the new text.
     */
    public text(
        options: IXmlAttributeTextOptions)
        : XmlAttributeText<XmlAttribute<Parent>>
    {
        const textNode = new XmlAttributeText(this, this._validation, options);
        this._children.push(textNode);
        return textNode;
    }

    /**
     * Returns an XML string representation of this attribute.
     */
    public toString(options: IStringOptions = {}): string {
        const optionsObj = new StringOptions(options);

        const quote = optionsObj.doubleQuotes ? "\"" : "'";
        let str = this._name + "=" + quote;
        for (const child of this._children) {
            if (optionsObj.doubleQuotes) {
                str += escapeDoubleQuotes(child.toString());
            } else {
                str += escapeSingleQuotes(child.toString());
            }
        }
        str += quote;
        return str;
    }

    /**
     * Returns the parent of this attribute.
     */
    public up(): Parent {
        return this._parent;
    }
}
