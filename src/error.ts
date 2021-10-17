/**
 * Copyright (C) 2019 Michael Kourlas
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

import XmlAttribute from "./nodes/XmlAttribute";
import XmlDocument from "./nodes/XmlDocument";
import XmlDtd from "./nodes/XmlDtd";
import XmlElement from "./nodes/XmlElement";

/**
 * Returns a context string for the specified node, for use in error messages.
 */
export function getContext(obj: unknown): string {
    if (obj instanceof XmlAttribute) {
        return getContext(obj.up()) + ` > attribute "${obj.name}"`;
    } else if (obj instanceof XmlDocument) {
        return `in XML document`;
    } else if (obj instanceof XmlDtd) {
        return getContext(obj.up()) + ` > DTD`;
    } else if (obj instanceof XmlElement) {
        return getContext(obj.up()) + ` > element "${obj.name}"`;
    } else {
        throw new Error("Unrecognized object of type "
                        + Object.prototype.toString.call(obj));
    }
}
