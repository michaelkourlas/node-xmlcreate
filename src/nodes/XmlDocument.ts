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

import {IStringOptions, StringOptions} from "../options";
import {isUndefined} from "../validate";
import XmlComment, {IXmlCommentOptions} from "./XmlComment";
import XmlDecl, {IXmlDeclOptions} from "./XmlDecl";
import XmlDtd, {IXmlDtdOptions} from "./XmlDtd";
import XmlElement, {IXmlElementOptions} from "./XmlElement";
import XmlProcInst, {IXmlProcInstOptions} from "./XmlProcInst";

/**
 * The options used to create a new document.
 */
export interface IXmlDocumentOptions {
    /**
     * Whether to throw an exception if document validation fails.
     */
    validation?: boolean;
}

/**
 * @private
 */
type Child = XmlComment<XmlDocument>
    | XmlDecl<XmlDocument>
    | XmlDtd<XmlDocument>
    | XmlElement<XmlDocument>
    | XmlProcInst<XmlDocument>;

/**
 * Represents a document.
 *
 * A sample document is structured as follows:
 *
 * ```xml
 * <?xml version="1.0" encoding="UTF-8"?>
 * <DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
 *                      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
 * <html>
 *     <head>
 *         <title>My page title</title>
 *     </head>
 *     <body>
 *         <h1>Welcome!</h1>
 *         <p>I hope you enjoy visiting my website.</p>
 *         <img src="picture.png"/>
 *     </body>
 * </html>
 * ```
 *
 * Each component of the document, such as the declaration, document type
 * definition, and root element, are children of this node.
 *
 * Documents must have exactly one element, which is the document's root
 * element.
 *
 * Documents can have exactly one declaration and one document type definition
 * in that order, so long as they precede the element.
 *
 * Documents can have an unlimited number of comments or processing
 * instructions, so long as they follow the declaration, if one exists.
 */
export default class XmlDocument {
    private readonly _children: Child[];
    private readonly _validation: boolean;

    constructor(options: IXmlDocumentOptions) {
        this._children = [];
        this._validation = !isUndefined(options.validation)
                           ? options.validation
                           : true;
    }

    /**
     * Adds a comment to this document and returns the new comment.
     */
    public comment(options: IXmlCommentOptions) {
        const comment = new XmlComment(this, this._validation, options);
        this._children.push(comment);
        return comment;
    }

    /**
     * Adds a declaration to this document and returns the new declaration.
     */
    public decl(options: IXmlDeclOptions = {}) {
        if (this._validation && this._children.length !== 0) {
            throw new Error("in XML document: declaration must be the first"
                            + " child");
        }

        const declaration = new XmlDecl(this, this._validation, options);
        this._children.push(declaration);
        return declaration;
    }

    /**
     * Adds a document type definition to this document and returns the new
     * document type definition.
     */
    public dtd(options: IXmlDtdOptions) {
        const filteredChildren = this._children.filter((value) => {
            return value instanceof XmlElement;
        });
        if (this._validation && filteredChildren.length !== 0) {
            throw new Error("in XML document: DTD must precede the root"
                            + " element");
        }

        const dtd = new XmlDtd(this, this._validation, options);
        this._children.push(dtd);
        return dtd;
    }

    /**
     * Adds the root element to this document and returns the element.
     */
    public element(options: IXmlElementOptions) {
        const filteredChildren = this._children.filter((value) => {
            return value instanceof XmlElement;
        });
        if (this._validation && filteredChildren.length !== 0) {
            throw new Error("in XML document: only one root element is"
                            + " permitted");
        }

        const element = new XmlElement(this, this._validation, options);
        this._children.push(element);
        return element;
    }

    /**
     * Adds a processing instruction to this document and returns the new
     * processing instruction.
     */
    public procInst(options: IXmlProcInstOptions) {
        const procInst = new XmlProcInst(this, this._validation, options);
        this._children.push(procInst);
        return procInst;
    }

    /**
     * Returns an XML string representation of this document using the
     * specified options.
     */
    public toString(options: IStringOptions = {}) {
        const filteredChildren = this._children.filter((value) => {
            return value instanceof XmlElement;
        });
        if (this._validation && filteredChildren.length !== 1) {
            throw new Error("in XML document: no more than one root element"
                            + " is permitted");
        }

        const optionsObj = new StringOptions(options);

        let str = "";
        for (const node of this._children) {
            if (node instanceof XmlDecl
                || node instanceof XmlDtd
                || node instanceof XmlElement)
            {
                str += node.toString(options);
            } else {
                str += node.toString();
            }

            if (optionsObj.pretty) {
                str += optionsObj.newline;
            }
        }

        const len = str.length - optionsObj.newline.length;
        if (str.substr(len) === optionsObj.newline) {
            str = str.substr(0, len);
        }

        return str;
    }
}
