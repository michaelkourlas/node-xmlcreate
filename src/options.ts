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

import {isType} from "./utils";

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
 * @private
 */
const stringOptionsDefaults = {
    doubleQuotes: false,
    indent: "    ",
    newline: "\n",
    pretty: true,
};
Object.freeze(stringOptionsDefaults);

/**
 * Validates a string options object and replaces undefined values with their
 * appropriate defaults.
 *
 * @param {IStringOptions} options The string options object to validate.
 *
 * @returns {IStringOptions} The updated string options object.
 *
 * @private
 */
export function validateStringOptions(options: IStringOptions): IStringOptions {
    if (!isType(options.doubleQuotes, "Boolean", "Undefined")) {
        throw new TypeError("options.doubleQuotes should be a boolean or"
                            + " undefined");
    }
    if (!isType(options.doubleQuotes, "Boolean")) {
        options.doubleQuotes = stringOptionsDefaults.doubleQuotes;
    }

    if (!isType(options.indent, "String", "Undefined")) {
        throw new TypeError("options.indent should be a string or undefined");
    }
    if (!isType(options.indent, "String")) {
        options.indent = stringOptionsDefaults.indent;
    }

    if (!isType(options.newline, "String", "Undefined")) {
        throw new TypeError("options.newline should be a string or undefined");
    }
    if (!isType(options.newline, "String")) {
        options.newline = stringOptionsDefaults.newline;
    }

    if (!isType(options.pretty, "Boolean", "Undefined")) {
        throw new TypeError("options.pretty should be a boolean or undefined");
    }
    if (!isType(options.pretty, "Boolean")) {
        options.pretty = stringOptionsDefaults.pretty;
    }

    return options;
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
 * @private
 */
const declarationOptionsDefaults: IDeclarationOptions = {
    encoding: undefined,
    standalone: undefined,
    version: "1.0",
};
Object.freeze(declarationOptionsDefaults);

/**
 * Validates an XML declaration options object and replaces undefined values
 * with their appropriate defaults.
 *
 * @param {IDeclarationOptions} options The XML declaration options object to
 *                                     validate.
 *
 * @returns {IDeclarationOptions} The updated XML declaration options object.
 *
 * @private
 */
export function validateDeclarationOptions(options: IDeclarationOptions): IDeclarationOptions
{
    if (!isType(options.encoding, "String", "Undefined")) {
        throw new TypeError("options.encoding should be a string or undefined");
    }

    if (!isType(options.standalone, "String", "Undefined")) {
        throw new TypeError("options.standalone should be a string or" +
                            " undefined");
    }

    if (!isType(options.version, "String", "Undefined")) {
        throw new TypeError("options.version should be a string or undefined");
    }
    if (!isType(options.version, "String")) {
        options.version = declarationOptionsDefaults.version;
    }

    return options;
}
