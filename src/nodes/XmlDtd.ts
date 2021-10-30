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
import {isUndefined, validateChar, validateName} from "../validate";
import XmlComment, {IXmlCommentOptions} from "./XmlComment";
import XmlDtdAttlist, {IXmlDtdAttlistOptions} from "./XmlDtdAttlist";
import XmlDtdElement, {IXmlDtdElementOptions} from "./XmlDtdElement";
import XmlDtdEntity, {IXmlDtdEntityOptions} from "./XmlDtdEntity";
import XmlDtdNotation, {IXmlDtdNotationOptions} from "./XmlDtdNotation";
import {
    default as XmlDtdParamEntityRef,
    IXmlDtdParamEntityRefOptions,
} from "./XmlDtdParamEntityRef";
import XmlProcInst, {IXmlProcInstOptions} from "./XmlProcInst";

/**
 * The options used to create a new document type definition.
 */
export interface IXmlDtdOptions {
    /**
     * The name of the DTD.
     */
    name: string;
    /**
     * The system identifier of the DTD, excluding quotation marks. By default,
     * no system identifier is included.
     */
    sysId?: string;
    /**
     * The public identifier of the DTD, excluding quotation marks. If a public
     * identifier is provided, a system identifier must be provided as well.
     * By default, no public identifier is included.
     */
    pubId?: string;
}

type Child<Parent> =
    | XmlComment<XmlDtd<Parent>>
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
    private readonly _parent: Parent;
    private _name!: string;
    private readonly _validation: boolean;
    private _pubId: string | undefined = undefined;
    private _sysId: string | undefined = undefined;

    constructor(parent: Parent, validation: boolean, options: IXmlDtdOptions) {
        this._validation = validation;
        this._children = [];
        this._parent = parent;
        this.name = options.name;
        if (!isUndefined(options.sysId)) {
            this.sysId = options.sysId;
        }
        if (!isUndefined(options.pubId)) {
            this.pubId = options.pubId;
        }
    }

    /**
     * Gets the name of the DTD.
     */
    public get name() {
        return this._name;
    }

    /**
     * Sets the name of the DTD.
     */
    public set name(name: string) {
        if (this._validation && !validateName(name)) {
            throw new Error(
                `${getContext(this.up())}: DTD name "${name}"` +
                    " should not contain characters not allowed in" +
                    " XML names"
            );
        }
        this._name = name;
    }

    /**
     * Gets the public identifier of the DTD.
     */
    public get pubId() {
        return this._pubId;
    }

    /**
     * Sets the public identifier of the DTD.
     */
    public set pubId(pubId: string | undefined) {
        if (!isUndefined(pubId)) {
            if (this._validation && !validatePubId(pubId)) {
                throw new Error(
                    `${getContext(this.up())}: DTD public` +
                        ` identifier "${pubId}" should not contain` +
                        " characters not allowed in public" +
                        " identifiers"
                );
            }
            if (this._validation && isUndefined(this._sysId)) {
                throw new Error(
                    `${getContext(this.up())}: DTD public` +
                        ` identifier "${pubId}" should not be defined` +
                        " if system identifier is undefined"
                );
            }
        }
        this._pubId = pubId;
    }

    /**
     * Gets the system identifier of the DTD.
     */
    public get sysId() {
        return this._sysId;
    }

    /**
     * Sets the system identifier of the DTD.
     */
    public set sysId(sysId: string | undefined) {
        if (!isUndefined(sysId)) {
            if (this._validation && !validateChar(sysId)) {
                throw new Error(
                    `${getContext(this.up())}: DTD system` +
                        ` identifier "${sysId}" should not contain` +
                        " characters not allowed in XML"
                );
            } else if (
                this._validation &&
                sysId.indexOf("'") !== -1 &&
                sysId.indexOf('"') !== -1
            ) {
                throw new Error(
                    `${getContext(this.up())}: DTD system` +
                        ` identifier "${sysId}" should not contain` +
                        " both single quotes and double quotes"
                );
            }
        }
        this._sysId = sysId;
    }

    /**
     * Adds an attribute-list declaration to this document type declaration
     * and returns the new attribute-list declaration.
     */
    public attlist(options: IXmlDtdAttlistOptions) {
        const attlist = new XmlDtdAttlist(this, this._validation, options);
        this._children.push(attlist);
        return attlist;
    }

    /**
     * Adds a comment to this document type declaration and returns the
     * new comment.
     */
    public comment(options: IXmlCommentOptions) {
        const comment = new XmlComment(this, this._validation, options);
        this._children.push(comment);
        return comment;
    }

    /**
     * Adds an element declaration to this document type declaration
     * and returns the new element declaration.
     */
    public element(options: IXmlDtdElementOptions) {
        const element = new XmlDtdElement(this, this._validation, options);
        this._children.push(element);
        return element;
    }

    /**
     * Adds an entity declaration to this document type declaration
     * and returns the new entity declaration.
     */
    public entity(options: IXmlDtdEntityOptions) {
        const entity = new XmlDtdEntity(this, this._validation, options);
        this._children.push(entity);
        return entity;
    }

    /**
     * Adds a notation declaration to this document type declaration
     * and returns the new notation declaration.
     */
    public notation(options: IXmlDtdNotationOptions) {
        const notation = new XmlDtdNotation(this, this._validation, options);
        this._children.push(notation);
        return notation;
    }

    /**
     * Adds a parameter entity reference to this document type declaration
     * and returns the new parameter entity reference.
     */
    public paramEntityRef(options: IXmlDtdParamEntityRefOptions) {
        const paramEntity = new XmlDtdParamEntityRef(
            this,
            this._validation,
            options
        );
        this._children.push(paramEntity);
        return paramEntity;
    }

    /**
     * Adds a processing instruction to this document type declaration
     * and returns the new processing instruction.
     */
    public procInst(options: IXmlProcInstOptions) {
        const procInst = new XmlProcInst(this, this._validation, options);
        this._children.push(procInst);
        return procInst;
    }

    /**
     * Returns an XML string representation of this document type declaration.
     */
    public toString(options: IStringOptions = {}) {
        const optionsObj = new StringOptions(options);

        let str = "<!DOCTYPE " + this._name;
        if (isUndefined(this._pubId)) {
            if (!isUndefined(this._sysId)) {
                str += " ";
                str = this.appendId("SYSTEM", this._sysId, str, optionsObj);
            }
        } else {
            if (isUndefined(this._sysId)) {
                throw new Error(
                    `${getContext(this.up())}: DTD system` +
                        " identifier is not undefined"
                );
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
    public up() {
        return this._parent;
    }

    /**
     * Appends the XML string representation of a public or system identifier
     * to an existing string.
     */
    private appendId(
        type: string,
        value: string,
        str: string,
        options: StringOptions
    ) {
        str += type + " ";
        if (options.doubleQuotes) {
            if (this._validation && value.indexOf('"') !== -1) {
                throw new Error(
                    `${getContext(this.up())}: doubleQuotes option` +
                        " inconsistent with DTD system identifier or" +
                        " public identifier"
                );
            }
            str += '"' + value + '"';
        } else {
            if (this._validation && value.indexOf("'") !== -1) {
                throw new Error(
                    `${getContext(this)}: doubleQuotes option` +
                        " inconsistent with DTD system identifier or" +
                        " public identifier"
                );
            }
            str += "'" + value + "'";
        }
        return str;
    }
}

/**
 * Returns true if the specified public identifier only contains characters
 * permitted by the XML specification.
 */
export function validatePubId(str: string) {
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        if (
            char === 0xa ||
            char === 0xd ||
            char === 0x20 ||
            char === 0x21 ||
            (char >= 0x23 && char <= 0x25) ||
            (char >= 0x27 && char <= 0x2f) ||
            (char >= 0x30 && char <= 0x39) ||
            char === 0x3a ||
            char === 0x3b ||
            char === 0x3d ||
            char === 0x3f ||
            (char >= 0x40 && char <= 0x5a) ||
            char === 0x5f ||
            (char >= 0x61 && char <= 0x7a)
        ) {
            continue;
        }

        if (i + 1 === str.length) {
            return false;
        }

        return false;
    }

    return true;
}
