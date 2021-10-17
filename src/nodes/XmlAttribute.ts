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
import {escapeDoubleQuotes, escapeSingleQuotes} from "../escape";
import {IStringOptions, StringOptions} from "../options";
import {fixName, isUndefined, validateName} from "../validate";
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
    /**
     * Whether to replace any invalid characters in the name of the attribute
     * with the Unicode replacement character. By default, this is disabled.
     */
    replaceInvalidCharsInName?: boolean;
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
    private readonly _replaceInvalidCharsInName: boolean;
    private readonly _parent: Parent;
    private readonly _validation: boolean;
    private _name!: string;

    constructor(parent: Parent, validation: boolean,
                options: IXmlAttributeOptions)
    {
        this._validation = validation;
        if (!isUndefined(options.replaceInvalidCharsInName)) {
            this._replaceInvalidCharsInName = options.replaceInvalidCharsInName;
        } else {
            this._replaceInvalidCharsInName = false;
        }
        this._children = [];
        this._parent = parent;
        this.name = options.name;
    }

    /**
     * Gets the name of this attribute.
     */
    public get name() {
        return this._name;
    }

    /**
     * Sets the name of this attribute.
     */
    public set name(name: string) {
        if (this._replaceInvalidCharsInName) {
            name = fixName(name);
            if (name.length === 0) {
                throw new Error(`${getContext(this.up())}: attribute name`
                                + " should not be empty");
            }
        } else if (this._validation && !validateName(name)) {
            if (name.length === 0) {
                throw new Error(`${getContext(this.up())}: attribute name`
                                + " should not be empty");
            } else {
                throw new Error(`${getContext(this.up())}: attribute name`
                                + ` "${name}" should not contain characters not`
                                + " allowed in XML names");
            }
        }
        this._name = name;
    }

    /**
     * Adds a character reference to this attribute and returns the new
     * character reference.
     */
    public charRef(options: IXmlCharRefOptions)
    {
        const charRef = new XmlCharRef(this, this._validation, options);
        this._children.push(charRef);
        return charRef;
    }

    /**
     * Adds an entity reference to this attribute and returns the new entity
     * reference.
     */
    public entityRef(options: IXmlEntityRefOptions)
    {
        const charRef = new XmlEntityRef(this, this._validation, options);
        this._children.push(charRef);
        return charRef;
    }

    /**
     * Adds attribute text to this attribute and returns the new text.
     */
    public text(options: IXmlAttributeTextOptions)
    {
        const textNode = new XmlAttributeText(this, this._validation, options);
        this._children.push(textNode);
        return textNode;
    }

    /**
     * Returns an XML string representation of this attribute.
     */
    public toString(options: IStringOptions = {}) {
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
    public up() {
        return this._parent;
    }
}
