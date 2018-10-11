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

import {IStringOptions, StringOptions} from "../options";
import {isUndefined, validateChar, validateName} from "../validate";
import XmlComment, {IXmlCommentOptions} from "./XmlComment";
import XmlDtdAttlist, {IXmlDtdAttlistOptions} from "./XmlDtdAttlist";
import XmlDtdElement, {IXmlDtdElementOptions} from "./XmlDtdElement";
import XmlDtdEntity, {IXmlDtdEntityOptions} from "./XmlDtdEntity";
import XmlDtdNotation, {IXmlDtdNotationOptions} from "./XmlDtdNotation";
import {
    default as XmlDtdParamEntityRef,
    IXmlDtdParamEntityRefOptions
} from "./XmlDtdParamEntityRef";
import XmlProcInst, {IXmlProcInstOptions} from "./XmlProcInst";

/**
 * The options used to create a new document type definition.
 */
export interface IXmlDtdOptions {
    /**
     * The name of the attribute.
     */
    name: string;
    /**
     * The system identifier of the DTD, excluding quotation marks.
     */
    sysId?: string;
    /**
     * The public identifier of the DTD, excluding quotation marks. If a public
     * identifier is provided, a system identifier must be provided as well.
     */
    pubId?: string;
}

type Child<Parent> = XmlComment<XmlDtd<Parent>>
    | XmlDtdAttlist<XmlDtd<Parent>>
    | XmlDtdElement<XmlDtd<Parent>>
    | XmlDtdEntity<XmlDtd<Parent>>
    | XmlDtdNotation<XmlDtd<Parent>>
    | XmlDtdParamEntityRef<XmlDtd<Parent>>
    | XmlProcInst<XmlDtd<Parent>>;

/**
 * Represents an XML document type definition (DTD).
 *
 * A document type definition  is structured as follows, where `{name}` is
 * the name of the DTD, `{sysId}` is the system identifier of the DTD,
 * `{pubId}` is the public identifier of the DTD, and `{intSubset}` is the
 * internal subset of the DTD:
 *
 * ```xml
 * <!DOCTYPE {name} SYSTEM "{sysId}" PUBLIC "{pubId}" [
 *     {intSubset}
 * ]>
 * ```
 *
 * DTDs can have an unlimited number of comments, attribute-list declarations,
 * element declarations, entity declarations, notation declarations, parameter
 * entity references, and processing instructions.
 */
export default class XmlDtd<Parent> {
    private readonly _children: Array<Child<Parent>>;
    private readonly _name: string;
    private readonly _parent: Parent;
    private readonly _pubId?: string;
    private readonly _sysId?: string;
    private readonly _validation: boolean;

    constructor(parent: Parent, validation: boolean, options: IXmlDtdOptions) {
        this._children = [];
        this._parent = parent;
        if (validation && !validateName(options.name)) {
            throw new Error("DTD name should not contain characters not"
                            + " allowed in XML names");
        }
        this._name = options.name;
        if (!isUndefined(options.pubId)) {
            const regex =
                /^(\u0020|\u000D|\u000A|[a-zA-Z0-9]|[-'()+,./:=?;!*#@$_%])*$/;
            if (validation && !regex.test(options.pubId)) {
                throw new Error("DTD public identifier should not contain"
                                + " characters not allowed in public"
                                + " identifiers");
            }
            if (validation && isUndefined(options.sysId)) {
                throw new Error("DTD public identifier should not be"
                                + " defined if system identifier is undefined");
            }
        }
        this._pubId = options.pubId;
        if (!isUndefined(options.sysId)) {
            if (validation && !validateChar(options.sysId)) {
                throw new Error("DTD system identifier should not contain"
                                + " characters not allowed in XML");
            } else if (validation
                       && options.sysId.indexOf("'") !== -1
                       && options.sysId.indexOf("\"") !== -1)
            {
                throw new Error("DTD system identifier should not contain"
                                + " both single quotes and double quotes");
            }
        }
        this._sysId = options.sysId;
        this._validation = validation;
    }

    /**
     * Adds an attribute-list declaration to this document type declaration
     * and returns the new attribute-list declaration.
     */
    public attlist(
        options: IXmlDtdAttlistOptions): XmlDtdAttlist<XmlDtd<Parent>>
    {
        const attlist = new XmlDtdAttlist(this, this._validation, options);
        this._children.push(attlist);
        return attlist;
    }

    /**
     * Adds a comment to this document type declaration and returns the
     * new comment.
     */
    public comment(options: IXmlCommentOptions): XmlComment<XmlDtd<Parent>> {
        const comment = new XmlComment(this, this._validation, options);
        this._children.push(comment);
        return comment;
    }

    /**
     * Adds an element declaration to this document type declaration
     * and returns the new element declaration.
     */
    public element(
        options: IXmlDtdElementOptions): XmlDtdElement<XmlDtd<Parent>>
    {
        const element = new XmlDtdElement(this, this._validation, options);
        this._children.push(element);
        return element;
    }

    /**
     * Adds an entity declaration to this document type declaration
     * and returns the new entity declaration.
     */
    public entity(options: IXmlDtdEntityOptions): XmlDtdEntity<XmlDtd<Parent>> {
        const entity = new XmlDtdEntity(this, this._validation, options);
        this._children.push(entity);
        return entity;
    }

    /**
     * Adds a notation declaration to this document type declaration
     * and returns the new notation declaration.
     */
    public notation(
        options: IXmlDtdNotationOptions): XmlDtdNotation<XmlDtd<Parent>>
    {
        const notation = new XmlDtdNotation(this, this._validation, options);
        this._children.push(notation);
        return notation;
    }

    /**
     * Adds a parameter entity reference to this document type declaration
     * and returns the new parameter entity reference.
     */
    public paramEntityRef(
        options: IXmlDtdParamEntityRefOptions)
        : XmlDtdParamEntityRef<XmlDtd<Parent>>
    {
        const paramEntity = new XmlDtdParamEntityRef(this, this._validation,
                                                     options);
        this._children.push(paramEntity);
        return paramEntity;
    }

    /**
     * Adds a processing instruction to this document type declaration
     * and returns the new processing instruction.
     */
    public procInst(options: IXmlProcInstOptions): XmlProcInst<XmlDtd<Parent>> {
        const procInst = new XmlProcInst(this, this._validation, options);
        this._children.push(procInst);
        return procInst;
    }

    /**
     * Returns an XML string representation of this document type declaration.
     */
    public toString(options: IStringOptions = {}): string {
        const optionsObj = new StringOptions(options);

        let str = "<!DOCTYPE " + this._name;
        if (isUndefined(this._pubId)) {
            if (!isUndefined(this._sysId)) {
                str += " ";
                str = this.appendId("SYSTEM", this._sysId, str, optionsObj);
            }
        } else {
            if (isUndefined(this._sysId)) {
                throw new Error("this._sysId is undefined");
            }

            str += " ";
            str = this.appendId("PUBLIC", this._pubId, str, optionsObj);
            str = this.appendId("", this._sysId, str, optionsObj);
        }

        if (this._children.length !== 0) {
            str += " [";
            for (const node of this._children) {
                if (optionsObj.pretty) {
                    str += optionsObj.newline + optionsObj.indent;
                }
                str += node.toString();
            }
            if (optionsObj.pretty) {
                str += optionsObj.newline;
            }
            str += "]>";
        } else {
            str += ">";
        }

        return str;
    }

    /**
     * Returns the parent of this attribute.
     */
    public up(): Parent {
        return this._parent;
    }

    /**
     * Appends the XML string representation of a public or system identifier
     * to an existing string.
     */
    private appendId(type: string, value: string, str: string,
                     options: StringOptions): string
    {
        str += type + " ";
        if (options.doubleQuotes) {
            if (this._validation && value.indexOf("\"") !== -1) {
                throw new Error("doubleQuotes option inconsistent with"
                                + " system identifier or public identifier"
                                + " in DTD");
            }
            str += "\"" + value + "\"";
        } else {
            if (this._validation && value.indexOf("'") !== -1) {
                throw new Error("doubleQuotes option inconsistent with"
                                + " system identifier or public identifier"
                                + " in DTD");
            }
            str += "'" + value + "'";
        }
        return str;
    }
}
