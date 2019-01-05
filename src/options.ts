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

import {isUndefined} from "./validate";

/**
 * Formatting options for the string representation of an XML node.
 */
export interface IStringOptions {
    /**
     * Whether double quotes or single quotes should be used in XML attributes.
     * By default, single quotes are used.
     */
    doubleQuotes?: boolean;
    /**
     * The indent string used for pretty-printing. The default indent string is
     * four spaces.
     */
    indent?: string;
    /**
     * The newline string used for pretty-printing. The default newline string
     * is "\n".
     */
    newline?: string;
    /**
     * Whether pretty-printing is enabled. By default, pretty-printing is
     * enabled.
     */
    pretty?: boolean;
}

/**
 * Implementation of the IStringOptions interface used to provide default
 * values to fields.
 *
 * @private
 */
export class StringOptions implements IStringOptions {
    public doubleQuotes: boolean = false;
    public indent: string = "    ";
    public newline: string = "\n";
    public pretty: boolean = true;

    constructor(options: IStringOptions) {
        if (!isUndefined(options.doubleQuotes)) {
            this.doubleQuotes = options.doubleQuotes;
        }
        if (!isUndefined(options.indent)) {
            this.indent = options.indent;
        }
        if (!isUndefined(options.newline)) {
            this.newline = options.newline;
        }
        if (!isUndefined(options.pretty)) {
            this.pretty = options.pretty;
        }
    }
}
