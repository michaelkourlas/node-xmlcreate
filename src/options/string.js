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

"use strict";

import {typeCheck} from "type-check";

/**
 * @typedef {object} StringOptions
 *
 * @desc Formatting options for the string representation of an
 *       {@link XmlNode} and its children. This object is used by
 *       {@link XmlNode#toString}.
 *
 * @property {boolean} [doubleQuotes] Whether double quotes or single quotes
 *                                    should be used in XML attributes. If left
 *                                    undefined, single quotes are used.
 * @property {string} [indent]        The indent string used for
 *                                    pretty-printing. If left undefined, the
 *                                    default indent string is four spaces
 *                                    ("    ").
 * @property {string} [newline]       The newline string used for
 *                                    pretty-printing. If left undefined,
 *                                    the default newline string is "\n".
 * @property {boolean} [pretty]       Whether pretty-printing is enabled. If
 *                                    left undefined, pretty-printing is
 *                                    enabled.
 *
 */

const defaults = {
    doubleQuotes: false,
    indent: "    ",
    newline: "\n",
    pretty: true
};
Object.freeze(defaults);

/**
 * Validates a string options object and replaces undefined values with their
 * appropriate defaults.
 *
 * @param {StringOptions} options The string options object to validate.
 *
 * @returns The updated string options object.
 *
 * @private
 */
export function validate(options) {
    if (!typeCheck("Boolean | Undefined", options.doubleQuotes)) {
        throw new TypeError("options.doubleQuotes should be a boolean");
    }
    if (!typeCheck("Boolean", options.doubleQuotes)) {
        options.doubleQuotes = defaults.doubleQuotes;
    }
    
    if (!typeCheck("String | Undefined", options.indent)) {
        throw new TypeError("options.indent should be a boolean");
    }
    if (!typeCheck("String", options.indent)) {
        options.indent = defaults.indent;
    }
    
    if (!typeCheck("String | Undefined", options.newline)) {
        throw new TypeError("options.newline should be a boolean");
    }
    if (!typeCheck("String", options.newline)) {
        options.newline = defaults.newline;
    }
    
    if (!typeCheck("Boolean | Undefined", options.pretty)) {
        throw new TypeError("options.pretty should be a boolean");
    }
    if (!typeCheck("Boolean", options.pretty)) {
        options.pretty = defaults.pretty;
    }
}
