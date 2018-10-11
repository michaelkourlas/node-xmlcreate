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

import {assert} from "chai";
import XmlDecl from "../../../lib/nodes/XmlDecl";

describe("XmlDecl", () => {
    describe("#toString", () => {
        it("default encoding; default standalone; default version;"
           + " default quotes", () => {
            assert.strictEqual(
                new XmlDecl(undefined, true, {}).toString(),
                "<?xml version='1.0'?>");
        });

        it("normal encoding; default standalone; default version;"
           + " default quotes", () => {
            assert.strictEqual(
                new XmlDecl(undefined, true, {
                    encoding: "UTF-8"
                }).toString(),
                "<?xml version='1.0' encoding='UTF-8'?>");
            assert.strictEqual(
                new XmlDecl(undefined, true, {
                    encoding: "UTF-16"
                }).toString(),
                "<?xml version='1.0' encoding='UTF-16'?>");
            assert.strictEqual(
                new XmlDecl(undefined, true, {
                    encoding: "u.-_16"
                }).toString(),
                "<?xml version='1.0' encoding='u.-_16'?>");
        });

        it("default encoding; normal standalone; default version;"
           + " default quotes", () => {
            assert.strictEqual(
                new XmlDecl(undefined, true, {
                    standalone: "yes"
                }).toString(),
                "<?xml version='1.0' standalone='yes'?>");
            assert.strictEqual(
                new XmlDecl(undefined, true, {
                    standalone: "no"
                }).toString(),
                "<?xml version='1.0' standalone='no'?>");
        });

        it("default encoding; default standalone; normal version;"
           + " default quotes", () => {
            assert.strictEqual(
                new XmlDecl(undefined, true, {
                    version: "1.0"
                }).toString(),
                "<?xml version='1.0'?>");
            assert.strictEqual(
                new XmlDecl(undefined, true, {
                    version: "1.1"
                }).toString(),
                "<?xml version='1.1'?>");
        });

        it("empty encoding; default standalone; default version;"
           + " default quotes", () => {
            assert.throws(
                () => new XmlDecl(undefined, true, {
                    encoding: ""
                }));
            assert.doesNotThrow(
                () => new XmlDecl(undefined, false, {
                    encoding: ""
                }));
        });

        it("encoding with characters not allowed in XML encodings; default"
           + " standalone; default version; default quotes", () => {
            assert.throws(
                () => new XmlDecl(undefined, true, {
                    encoding: "UTF-16$"
                }));
            assert.doesNotThrow(
                () => new XmlDecl(undefined, false, {
                    encoding: "UTF-16$"
                }));

            assert.throws(
                () => new XmlDecl(undefined, true, {
                    encoding: "9UTF-16"
                }));
            assert.doesNotThrow(
                () => new XmlDecl(undefined, false, {
                    encoding: "9UTF-16"
                }));

            assert.throws(
                () => new XmlDecl(undefined, true, {
                    encoding: "-UTF-16"
                }));
            assert.doesNotThrow(
                () => new XmlDecl(undefined, false, {
                    encoding: "-UTF-16"
                }));

            assert.throws(
                () => new XmlDecl(undefined, true, {
                    encoding: "_UTF-16"
                }));
            assert.doesNotThrow(
                () => new XmlDecl(undefined, false, {
                    encoding: "_UTF-16"
                }));

            assert.throws(
                () => new XmlDecl(undefined, true, {
                    encoding: ".UTF-16"
                }));
            assert.doesNotThrow(
                () => new XmlDecl(undefined, false, {
                    encoding: ".UTF-16"
                }));
        });

        it("default encoding; empty standalone; default version;"
           + " default quotes", () => {
            assert.throws(
                () => new XmlDecl(undefined, true, {
                    standalone: ""
                }));
            assert.doesNotThrow(
                () => new XmlDecl(undefined, false, {
                    standalone: ""
                }));
        });

        it("default encoding; standalone with characters not allowed in"
           + " attribute; default version; default quotes", () => {
            assert.throws(
                () => new XmlDecl(undefined, true, {
                    standalone: "maybe"
                }));
            assert.doesNotThrow(
                () => new XmlDecl(undefined, false, {
                    standalone: "maybe"
                }));
        });

        it("default encoding; default standalone; empty version;"
           + " default quotes", () => {
            assert.throws(
                () => new XmlDecl(undefined, true, {
                    version: ""
                }));
            assert.doesNotThrow(
                () => new XmlDecl(undefined, false, {
                    version: ""
                }));
        });

        it("default encoding; default standalone; version with characters"
           + " not allowed in attribute; default quotes", () => {
            assert.throws(
                () => new XmlDecl(undefined, true, {
                    version: "1"
                }));
            assert.doesNotThrow(
                () => new XmlDecl(undefined, false, {
                    version: "1"
                }));

            assert.throws(
                () => new XmlDecl(undefined, true, {
                    version: "1."
                }));
            assert.doesNotThrow(
                () => new XmlDecl(undefined, false, {
                    version: "1."
                }));

            assert.throws(
                () => new XmlDecl(undefined, true, {
                    version: "1.2a"
                }));
            assert.doesNotThrow(
                () => new XmlDecl(undefined, false, {
                    version: "1.2a"
                }));

            assert.throws(
                () => new XmlDecl(undefined, true, {
                    version: "2.0"
                }));
            assert.doesNotThrow(
                () => new XmlDecl(undefined, false, {
                    version: "2.0"
                }));
        });

        it("normal encoding; normal standalone; normal version;"
           + " single quotes", () => {
            assert.strictEqual(
                new XmlDecl(undefined, true, {
                    encoding: "UTF-8",
                    standalone: "yes"
                }).toString({doubleQuotes: false}),
                "<?xml version='1.0' encoding='UTF-8'"
                + " standalone='yes'?>");
        });

        it("normal encoding; normal standalone; normal version;"
           + " double quotes", () => {
            assert.strictEqual(
                new XmlDecl(undefined, true, {
                    encoding: "UTF-8",
                    standalone: "yes"
                }).toString({doubleQuotes: true}),
                "<?xml version=\"1.0\" encoding=\"UTF-8\""
                + " standalone=\"yes\"?>");
        });
    });

    it("#up", () => {
        assert.strictEqual(
            new XmlDecl(undefined, false, {}).up(),
            undefined);
    });
});
