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
 * @typedef {object} DeclarationOptions
 *
 * @desc The options associated with the XML declaration. This object is used
 *       to create a new {@link XmlDecl} object.
 *
 * @property {string} [encoding]   The XML encoding to be included in the
 *                                 declaration. This value must be a valid
 *                                 encoding. If left undefined, no encoding is
 *                                 included.
 * @property {string} [standalone] The XML standalone attribute to be included.
 *                                 This value must be "yes" or "no". If left
 *                                 undefined, no standalone attribute is
 *                                 included.
 * @property {string} [version]    The XML version to be included in the
 *                                 declaration. This value must be a valid XML
 *                                 version number. If left undefined, the
 *                                 default version is "1.0".
 */

const defaults = {
    encoding: undefined,
    standalone: undefined,
    version: "1.0"
};
Object.freeze(defaults);

/**
 * Validates an XML declaration options object and replaces undefined values
 * with their appropriate defaults.
 *
 * @param {DeclarationOptions} options The XML declaration options object to
 *                                     validate.
 *
 * @returns {DeclarationOptions} The updated XML declaration options object.
 *
 * @private
 */
export function validate(options) {
    if (!typeCheck("String | Undefined", options.encoding)) {
        throw new TypeError("options.encoding should be a string or undefined");
    }
    
    if (!typeCheck("String | Undefined", options.standalone)) {
        throw new TypeError("options.standalone should be a string or" +
            " undefined");
    }

    if (!typeCheck("String | Undefined", options.version)) {
        throw new TypeError("options.version should be a string or undefined");
    }
    if (!typeCheck("String", options.version)) {
        options.version = defaults.version;
    }

    return options;
}
