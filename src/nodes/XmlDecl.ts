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
    private readonly _validation: boolean;
    private _encoding!: string | undefined;
    private readonly _parent: Parent;
    private _standalone!: string | undefined;
    private _version: string = "1.0";

    constructor(parent: Parent, validation: boolean, options: IXmlDeclOptions) {
        this._validation = validation;
        this._parent = parent;
        this.encoding = options.encoding;
        this.standalone = options.standalone;
        if (!isUndefined(options.version)) {
            this.version = options.version;
        }
    }

    /**
     * Gets the encoding associated with this declaration.
     */
    public get encoding() {
        return this._encoding;
    }

    /**
     * Sets the encoding associated with this declaration.
     */
    public set encoding(encoding: string | undefined) {
        if (this._validation && !isUndefined(encoding)) {
            if (!validateEncoding(encoding)) {
                throw new Error(`${getContext(this.up())}: declaration`
                                + ` encoding attribute ${encoding} should be a`
                                + " valid encoding");
            }
        }
        this._encoding = encoding;
    }

    /**
     * Gets the value of the standalone attribute associated with this
     * declaration.
     */
    public get standalone() {
        return this._standalone;
    }

    /**
     * Sets the value of the standalone attribute associated with this
     * declaration.
     */
    public set standalone(standalone: string | undefined) {
        if (this._validation && !isUndefined(standalone)) {
            if (standalone !== "yes" && standalone !== "no") {
                throw new Error(`${getContext(this.up())}: declaration`
                                + ` standalone attribute ${standalone} should`
                                + " be the string 'yes' or the string 'no'");
            }
        }
        this._standalone = standalone;
    }

    /**
     * Gets the XML version associated with this declaration.
     */
    public get version() {
        return this._version;
    }

    /**
     * Sets the XML version associated with this declaration.
     */
    public set version(version: string) {
        if (this._validation && !validateVersion(version)) {
            throw new Error(`${getContext(this.up())}: declaration version`
                            + ` attribute ${version} should be a valid XML`
                            + " version");
        }
        this._version = version;
    }

    /**
     * Returns an XML string representation of this declaration.
     */
    public toString(options: IStringOptions = {}) {
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
    public up() {
        return this._parent;
    }
}

/**
 * Returns true if the specified encoding only contains characters permitted by
 * the XML specification.
 *
 * @private
 */
function validateEncoding(str: string) {
    if (str.length === 0) {
        return false;
    }

    const initialChar = str.charCodeAt(0);
    if (!((initialChar >= 0x41 && initialChar <= 0x5A)
          || (initialChar >= 0x61 && initialChar <= 0x7A)))
    {
        return false;
    }

    for (let i = 1; i < str.length; i++) {
        const char = str.charCodeAt(i);
        if (char === 0x5F
            || char === 0x2D
            || char === 0x2E
            || (char >= 0x30 && char <= 0x39)
            || (char >= 0x41 && char <= 0x5A)
            || (char >= 0x61 && char <= 0x7A))
        {
            continue;
        }

        if (i + 1 === str.length) {
            return false;
        }

        return false;
    }

    return true;
}

/**
 * Returns true if the specified version only contains characters permitted by
 * the XML specification.
 *
 * @private
 */
function validateVersion(str: string) {
    for (let i = 0; i <= 9; i++) {
        if (str === "1." + i) {
            return true;
        }
    }
    return false;
}
