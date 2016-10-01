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

import {isBoolean, isObject, isString, isUndefined} from "./utils";

/**
 * Formatting options for the string representation of an {@link XmlNode} and
 * its children. This object is used by the `toString` method of
 * {@link XmlNode}.
 */
export interface IStringOptions {
    /**
     * Whether double quotes or single quotes should be used in XML attributes.
     * If left undefined, single quotes are used.
     */
    doubleQuotes?: boolean;
    /**
     * The indent string used for pretty-printing. If left undefined, the
     * default indent string is four spaces.
     */
    indent?: string;
    /**
     * The newline string used for pretty-printing. If left undefined, the
     * default newline string is "\n".
     */
    newline?: string;
    /**
     * Whether pretty-printing is enabled. If left undefined, pretty-printing
     * is enabled.
     */
    pretty?: boolean;
}

/**
 * Implementation of the IStringOptions interface used to provide default values
 * to fields.
 *
 * @private
 */
export class StringOptions implements IStringOptions {
    public doubleQuotes: boolean = false;
    public indent: string = "    ";
    public newline: string = "\n";
    public pretty: boolean = true;

    constructor(stringOptions: IStringOptions = {}) {
        if (!isObject(stringOptions)) {
            throw new TypeError("options should be an Object or undefined");
        }

        if (!isBoolean(stringOptions.doubleQuotes)) {
            if (!isUndefined(stringOptions.doubleQuotes)) {
                throw new TypeError("options.doubleQuotes should be a boolean"
                                    + " or undefined");
            }
        } else {
            this.doubleQuotes = stringOptions.doubleQuotes;
        }

        if (!isString(stringOptions.indent)) {
            if (!isUndefined(stringOptions.indent)) {
                throw new TypeError("options.indent should be a string"
                                    + " or undefined");
            }
        } else {
            this.indent = stringOptions.indent;
        }

        if (!isString(stringOptions.newline)) {
            if (!isUndefined(stringOptions.newline)) {
                throw new TypeError("options.newline should be a string"
                                    + " or undefined");
            }
        } else {
            this.newline = stringOptions.newline;
        }

        if (!isBoolean(stringOptions.pretty)) {
            if (!isUndefined(stringOptions.pretty)) {
                throw new TypeError("options.pretty should be a boolean"
                                    + " or undefined");
            }
        } else {
            this.pretty = stringOptions.pretty;
        }
    }
}

/**
 * The options associated with the XML declaration. This object is used to
 * create a new {@link XmlDecl} object.
 */
export interface IDeclarationOptions {
    /**
     * The XML encoding to be included in the declaration. This value must be a
     * valid encoding. If left undefined, no encoding is included.
     */
    encoding?: string;
    /**
     * The XML standalone attribute to be included. This value must be "yes" or
     * "no". If left undefined, no standalone attribute is included.
     */
    standalone?: string;
    /**
     * The XML version to be included in the declaration. This value must be a
     * valid XML version number. If left undefined, the default version is
     * "1.0".
     */
    version?: string;
}

/**
 * Implementation of the IDeclarationOptions interface used to provide default
 * values to fields.
 *
 * @private
 */
export class DeclarationOptions implements IDeclarationOptions {
    public encoding?: string;
    public standalone?: string;
    public version: string = "1.0";

    constructor(declarationOptions: IDeclarationOptions = {}) {
        if (!isObject(declarationOptions)) {
            throw new TypeError("options should be an Object or undefined");
        }

        if (!isString(declarationOptions.encoding)) {
            if (!isUndefined(declarationOptions.encoding)) {
                throw new TypeError("options.encoding should be a string"
                                    + " or undefined");
            }
        } else {
            this.encoding = declarationOptions.encoding;
        }

        if (!isString(declarationOptions.standalone)) {
            if (!isUndefined(declarationOptions.standalone)) {
                throw new TypeError("options.standalone should be a string"
                                    + " or undefined");
            }
        } else {
            this.standalone = declarationOptions.standalone;
        }

        if (!isString(declarationOptions.version)) {
            if (!isUndefined(declarationOptions.version)) {
                throw new TypeError("options.version should be a string"
                                    + " or undefined");
            }
        } else {
            this.version = declarationOptions.version;
        }
    }
}
