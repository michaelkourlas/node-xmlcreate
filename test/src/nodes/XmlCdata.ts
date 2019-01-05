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

import {assert} from "chai";
import XmlCdata from "../../../lib/nodes/XmlCdata";
import XmlElement from "../../../lib/nodes/XmlElement";

describe("XmlCdata", () => {
    describe("#charData", () => {
        it("get", () => {
            const node = new XmlCdata(undefined, true, {
                charData: "abc"
            });
            assert.strictEqual(node.charData, "abc");
        });

        it("set", () => {
            const node = new XmlCdata(undefined, true, {
                charData: "abc"
            });
            node.charData = "def";
            assert.strictEqual(node.charData, "def");
        });
    });

    describe("#toString", () => {
        it("normal character data; default replace invalid chars", () => {
            assert.strictEqual(
                new XmlCdata(undefined, true, {
                    charData: "abc"
                }).toString(),
                "<![CDATA[abc]]>");

            assert.strictEqual(
                new XmlCdata(undefined, true, {
                    charData: "]]a]>bc>"
                }).toString(),
                "<![CDATA[]]a]>bc>]]>");
        });

        it("character data with string ']]>'; default replace invalid"
           + " chars", () => {
            assert.throws(
                () => new XmlCdata(undefined, true, {
                    charData: "]]>"
                }));
            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlCdata(undefined, false, {
                            charData: "]]>"
                        }).toString(),
                        "<![CDATA[]]>]]>");
                });

            assert.throws(
                () => new XmlCdata(undefined, true, {
                    charData: "abc]]>123"
                }));
            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlCdata(undefined, false, {
                            charData: "abc]]>123"
                        }).toString(),
                        "<![CDATA[abc]]>123]]>");
                });

            assert.throws(
                () => new XmlCdata(undefined, true, {
                    charData: "]]>abc123"
                }));
            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlCdata(undefined, false, {
                            charData: "]]>abc123"
                        }).toString(),
                        "<![CDATA[]]>abc123]]>");
                });

            assert.throws(
                () => new XmlCdata(undefined, true, {
                    charData: "abc123]]>"
                }));
            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlCdata(undefined, false, {
                            charData: "abc123]]>"
                        }).toString(),
                        "<![CDATA[abc123]]>]]>");
                });
        });

        it("character data with string ']]>'; do not replace invalid"
           + " chars", () => {
            assert.throws(
                () => new XmlCdata(undefined, true, {
                    charData: "]]>",
                    replaceInvalidCharsInCharData: false
                }));
            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlCdata(undefined, false, {
                            charData: "]]>",
                            replaceInvalidCharsInCharData: false
                        }).toString(),
                        "<![CDATA[]]>]]>");
                });

            assert.throws(
                () => new XmlCdata(undefined, true, {
                    charData: "abc]]>123",
                    replaceInvalidCharsInCharData: false
                }));
            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlCdata(undefined, false, {
                            charData: "abc]]>123",
                            replaceInvalidCharsInCharData: false
                        }).toString(),
                        "<![CDATA[abc]]>123]]>");
                });

            assert.throws(
                () => new XmlCdata(undefined, true, {
                    charData: "]]>abc123",
                    replaceInvalidCharsInCharData: false
                }));
            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlCdata(undefined, false, {
                            charData: "]]>abc123",
                            replaceInvalidCharsInCharData: false
                        }).toString(),
                        "<![CDATA[]]>abc123]]>");
                });

            assert.throws(
                () => new XmlCdata(undefined, true, {
                    charData: "abc123]]>",
                    replaceInvalidCharsInCharData: false
                }));
            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlCdata(undefined, false, {
                            charData: "abc123]]>",
                            replaceInvalidCharsInCharData: false
                        }).toString(),
                        "<![CDATA[abc123]]>]]>");
                });
        });

        it("character data with string ']]>'; replace invalid chars", () => {
            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlCdata(undefined, true, {
                            charData: "]]>",
                            replaceInvalidCharsInCharData: true
                        }).toString(),
                        "<![CDATA[\uFFFD\uFFFD\uFFFD]]>");
                });
            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlCdata(undefined, false, {
                            charData: "]]>",
                            replaceInvalidCharsInCharData: true
                        }).toString(),
                        "<![CDATA[\uFFFD\uFFFD\uFFFD]]>");
                });

            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlCdata(undefined, true, {
                            charData: "abc]]>123",
                            replaceInvalidCharsInCharData: true
                        }).toString(),
                        "<![CDATA[abc\uFFFD\uFFFD\uFFFD123]]>");
                });
            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlCdata(undefined, false, {
                            charData: "abc]]>123",
                            replaceInvalidCharsInCharData: true
                        }).toString(),
                        "<![CDATA[abc\uFFFD\uFFFD\uFFFD123]]>");
                });

            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlCdata(undefined, true, {
                            charData: "]]>abc123",
                            replaceInvalidCharsInCharData: true
                        }).toString(),
                        "<![CDATA[\uFFFD\uFFFD\uFFFDabc123]]>");
                });
            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlCdata(undefined, false, {
                            charData: "]]>abc123",
                            replaceInvalidCharsInCharData: true
                        }).toString(),
                        "<![CDATA[\uFFFD\uFFFD\uFFFDabc123]]>");
                });

            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlCdata(undefined, true, {
                            charData: "abc123]]>",
                            replaceInvalidCharsInCharData: true
                        }).toString(),
                        "<![CDATA[abc123\uFFFD\uFFFD\uFFFD]]>");
                });
            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlCdata(undefined, false, {
                            charData: "abc123]]>",
                            replaceInvalidCharsInCharData: true
                        }).toString(),
                        "<![CDATA[abc123\uFFFD\uFFFD\uFFFD]]>");
                });
        });

        it("character data with characters not allowed in XML; default replace"
           + " invalid chars", () => {
            assert.throws(
                () => new XmlCdata(undefined, true, {
                    charData: "abc" + String.fromCharCode(0x0001) + "def"
                }));
            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlCdata(undefined, false, {
                            charData: "abc" + String.fromCharCode(0x0001)
                                      + "def"
                        }).toString(),
                        "<![CDATA[abc\u0001def]]>");
                });
        });

        it("character data with characters not allowed in XML; do not replace"
           + " invalid chars", () => {
            assert.throws(
                () => new XmlCdata(undefined, true, {
                    charData: "abc" + String.fromCharCode(0x0001) + "def",
                    replaceInvalidCharsInCharData: false
                }));
            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlCdata(undefined, false, {
                            charData: "abc" + String.fromCharCode(0x0001)
                                      + "def",
                            replaceInvalidCharsInCharData: false
                        }).toString(),
                        "<![CDATA[abc\u0001def]]>");
                });
        });

        it("character data with characters not allowed in XML; replace"
           + " invalid chars", () => {
            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlCdata(undefined, true, {
                            charData: "abc" + String.fromCharCode(0x0001)
                                      + "def",
                            replaceInvalidCharsInCharData: true
                        }).toString(),
                        "<![CDATA[abc\uFFFDdef]]>");
                });
            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlCdata(undefined, false, {
                            charData: "abc" + String.fromCharCode(0x0001)
                                      + "def",
                            replaceInvalidCharsInCharData: true
                        }).toString(),
                        "<![CDATA[abc\uFFFDdef]]>");
                });
        });
    });

    it("#up", () => {
        const parent = new XmlElement(undefined, false, {name: "a"});
        const child = parent.cdata({charData: "b"});
        assert.strictEqual(child.up(), parent);
    });
});
