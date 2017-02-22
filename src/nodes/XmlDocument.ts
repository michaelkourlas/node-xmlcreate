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
import {IDeclarationOptions, IStringOptions, StringOptions} from "../options";
import {isUndefined} from "../utils";
import XmlComment from "./XmlComment";
import XmlDecl from "./XmlDecl";
import XmlDtd from "./XmlDtd";
import XmlElement from "./XmlElement";
import XmlNode from "./XmlNode";
import XmlProcInst from "./XmlProcInst";

/**
 * Represents an XML document.
 *
 * A sample XML document is structured as follows:
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
 * Each component of the document, such as the XML declaration, document type
 * definition, and root element, are children of this node.
 *
 * XmlDocument nodes must have exactly one {@link XmlElement} child, which is
 * the document's root element.
 *
 * XmlDocument nodes can have exactly one {@link XmlDecl} and {@link XmlDtd}
 * child in that order, so long as they precede the {@link XmlElement} node.
 *
 * XmlDocument nodes can have an unlimited number of {@link XmlComment} or
 * {@link XmlProcInst} nodes, so long as they follow the {@link XmlDecl} node,
 * if one exists.
 */
export default class XmlDocument extends XmlNode {
    /**
     * Initializes a new instance of the {@link XmlDocument} class.
     *
     * @param root The name of the root element.
     */
    constructor(root: string) {
        super();
        super.insertChild(new XmlElement(root));
    }

    /**
     * Inserts a new comment at the specified index. If no index is specified,
     * the node is inserted at the end of this node's children.
     *
     * @param content The data of the comment.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this node's
     *              children.
     *
     * @returns The newly created element.
     */
    public comment(content: string,
                   index: number = this._children.length): XmlComment {
        const comment = new XmlComment(content);
        this.insertChild(comment, index);
        return comment;
    }

    /**
     * Inserts a new XML declaration at the beginning of this node's children.
     *
     * @param options The options associated with the XML declaration.
     *
     * @returns The newly created XML declaration.
     */
    public decl(options?: IDeclarationOptions): XmlDecl {
        const declaration = new XmlDecl(options);
        this.insertChild(declaration, 0);
        return declaration;
    }

    /**
     * Inserts a new XML document type definition. Unless a different index is
     * specified, the node is inserted immediately after the XML declaration
     * if one exists, or at the beginning of this node's children if one does
     * not.
     *
     * @param name The name of the DTD.
     * @param sysId The system identifier of the DTD, excluding quotation marks.
     * @param pubId The public identifier of the DTD, excluding quotation marks.
     *              If a public identifier is provided, a system identifier
     *              must be provided as well.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted immediately after the
     *              XML declaration if one exists, or at the beginning of this
     *              node's children if one does not.
     *
     * @returns The newly created XML document type definition.
     */
    public dtd(name: string, sysId?: string, pubId?: string,
               index?: number): XmlDtd
    {
        const dtd = new XmlDtd(name, sysId, pubId);
        if (isUndefined(index)) {
            if (this._children[0] instanceof XmlDecl) {
                index = 1;
            } else {
                index = 0;
            }
        }
        this.insertChild(dtd, index);
        return dtd;
    }

    /**
     * Inserts the specified node into this node's children at the specified
     * index. The node is not inserted if it is already present. If this node
     * already has a parent, it is removed from that parent.
     *
     * Only {@link XmlComment}, {@link XmlDecl}, {@link XmlDtd}, or
     * {@link XmlProcInst} nodes can be inserted. Furthermore, {@link XmlDecl}
     * and {@link XmlDtd} nodes must be inserted in that order and must
     * precede the {@link XmlElement} node. In addition, {@link XmlComment} or
     * {@link XmlProcInst} nodes must follow the {@link XmlDecl} node.
     *
     * @param node The node to insert.
     * @param index The index at which to insert the node. Nodes at or after
     *              the index are shifted to the right. If no index is
     *              specified, the node is inserted at the end.
     *
     * @returns The node inserted into this node's children, or undefined if no
     *          node was inserted.
     */
    public insertChild(node: XmlNode,
                       index: number
                           = this._children.length): XmlNode | undefined {
        if (!(node instanceof XmlComment
              || node instanceof XmlDecl
              || node instanceof XmlDtd
              || node instanceof XmlProcInst))
        {
            throw new TypeError("node should be an instance of"
                                + " XmlComment, XmlDecl, XmlDtd, or"
                                + " XmlProcInst");
        }

        if (node instanceof XmlComment || node instanceof XmlProcInst) {
            if (this._children[0] instanceof XmlDecl) {
                if (index === 0) {
                    throw new Error("XmlComment or XmlProcInst node should be"
                                    + " inserted after the XmlDecl node");
                }
            }
        } else if (node instanceof XmlDecl) {
            if (this._children[0] instanceof XmlDecl) {
                throw new Error("XmlDocument node should only contain one"
                                + " XmlDecl node");
            }
            if (index !== 0) {
                throw new Error("XmlDecl node should be inserted at the"
                                + " beginning of an XmlDocument node");
            }
        } else if (node instanceof XmlDtd) {
            if (this._children[0] instanceof XmlDecl) {
                if (index === 0) {
                    throw new Error("XmlDtd node should be inserted after"
                                    + " the XmlDecl node");
                }
            }
            for (let i = 0; i < index && i < this._children.length; i++) {
                if (this._children[i] instanceof XmlElement) {
                    throw new Error("XmlDtd node should be inserted before"
                                    + " the XmlElement node");
                }
            }
            for (const child of this._children) {
                if (child instanceof XmlDtd) {
                    throw new Error("XmlDocument node should only contain"
                                    + " one XmlDtd node");
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
                    index: number = this._children.length): XmlProcInst
    {
        const procInst = new XmlProcInst(target, content);
        this.insertChild(procInst, index);
        return procInst;
    }

    /**
     * Removes the specified node from this node's children.
     *
     * Note that {@link XmlElement} nodes cannot be removed from this node;
     * attempts to do so will result in an exception being thrown.
     *
     * @param node The node to remove.
     *
     * @returns Whether a node was removed.
     */
    public removeChild(node: XmlNode): boolean {
        if (node instanceof XmlElement) {
            throw new Error("XmlElement nodes cannot be removed from"
                            + " XmlDocument nodes");
        }
        return super.removeChild(node);
    }

    /**
     * Removes the node at the specified index from this node's children.
     *
     * Note that {@link XmlElement} nodes cannot be removed from this node;
     * attempts to do so will result in an exception being thrown.
     *
     * @param index The index at which the node to be removed is
     *                       located.
     *
     * @returns The node that was removed, or undefined if no node was removed.
     */
    public removeChildAtIndex(index: number): XmlNode {
        if (this._children[index] instanceof XmlElement) {
            throw new Error("XmlElement nodes cannot be removed from"
                            + " XmlDocument nodes");
        }
        return super.removeChildAtIndex(index);
    }

    /**
     * Returns the root element of this document.
     *
     * @returns The root element of this document.
     */
    public root(): XmlElement {
        for (const node of this._children) {
            if (node instanceof XmlElement) {
                return node;
            }
        }
        throw new Error("XmlDocument does not contain a root node");
    }

    /**
     * Returns an XML string representation of this node.
     *
     * @param {IStringOptions} [options] Formatting options for the string
     *                                  representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    public toString(options: IStringOptions = {}): string {
        const optionsObj = new StringOptions(options);

        let str = "";
        for (const node of this._children) {
            str += node.toString(options);
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
