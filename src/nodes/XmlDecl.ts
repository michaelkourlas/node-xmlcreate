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
import {isUndefined} from "../validate";

/**
 * The options used to create a new declaration.
 */
export interface IXmlDeclOptions {
    /**
     * The encoding attribute to be included in the declaration. By default,
     * no encoding attribute is included.
     */
    encoding?: string;
    /**
     * The value of the standalone attribute to be included in the declaration.
     * This value must be "yes" or "no". By default, no standalone attribute is
     * included.
     */
    standalone?: string;
    /**
     * The XML version to be included in the declaration. Defaults to "1.0".
     */
    version?: string;
}

/**
 * Represents a declaration.
 *
 * A declaration is structured as follows, where `{version}` is the XML
 * version, `{encoding}` is the encoding of the document, and `{standalone}`
 * is either "yes" or "no", depending on whether the document may contain
 * external markup declarations:
 *
 * ```xml
 * <?xml version="{version}" encoding="{encoding}" standalone="{standalone}"?>
 * ```
 */
export default class XmlDecl<Parent> {
    private readonly _encoding?: string;
    private readonly _standalone?: string;
    private readonly _version: string;
    private readonly _parent: Parent;

    constructor(parent: Parent, validation: boolean, options: IXmlDeclOptions) {
        if (validation && !isUndefined(options.encoding)) {
            if (!/^[A-Za-z][A-Za-z0-9._-]*$/.test(options.encoding)) {
                throw new Error("Declaration encoding attribute should be a"
                                + " valid encoding");
            }
        }
        this._encoding = options.encoding;
        this._parent = parent;
        if (validation && !isUndefined(options.standalone)) {
            if (!/^(yes|no)$/.test(options.standalone)) {
                throw new Error("Declaration standalone attribute should be"
                                + " the string 'yes' or the string 'no'");
            }
        }
        this._standalone = options.standalone;
        if (validation && !isUndefined(options.version)) {
            if (!/^1\.[0-9]+$/.test(options.version)) {
                throw new Error("Declaration version attribute should be a"
                                + " valid XML version");
            }
        }
        this._version = !isUndefined(options.version)
                        ? options.version
                        : "1.0";
    }

    /**
     * Returns an XML string representation of this declaration.
     */
    public toString(options: IStringOptions = {}): string {
        const optionsObj = new StringOptions(options);

        const quote = optionsObj.doubleQuotes ? '"' : "'";
        let str = "<?xml version=" + quote + this._version + quote;
        if (!isUndefined(this._encoding)) {
            str += " encoding=" + quote + this._encoding + quote;
        }
        if (!isUndefined(this._standalone)) {
            str += " standalone=" + quote + this._standalone + quote;
        }
        str += "?>";
        return str;
    }

    /**
     * Returns the parent of this declaration.
     */
    public up(): Parent {
        return this._parent;
    }
}
