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

/**
 * Replaces ampersands (&) with the appropriate XML character reference.
 */
export function escapeAmpersands(str: string): string {
    return str.replace(/&/g, "&amp;");
}

/**
 * Replaces left angle brackets (&lt;) with the appropriate XML character
 * reference.
 */
export function escapeLeftAngleBrackets(str: string): string {
    return str.replace(/</g, "&lt;");
}

/**
 * Replaces right angle brackets (&gt;) with the appropriate XML character
 * reference when part of the string "]]>".
 */
export function escapeRightAngleBracketsInCdataTerminator(str: string): string {
    return str.replace(/]]>/g, "]]&gt;");
}

/**
 * Replaces single quotes (") with the appropriate XML character reference.
 */
export function escapeSingleQuotes(str: string): string {
    return str.replace(/'/g, "&apos;");
}

/**
 * Replaces double quotes (") with the appropriate XML character reference.
 */
export function escapeDoubleQuotes(str: string): string {
    return str.replace(/"/g, "&quot;");
}
