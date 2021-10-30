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
import XmlComment from "../../../lib/nodes/XmlComment";

describe("XmlComment", () => {
    describe("#charData", () => {
        it("get", () => {
            const node = new XmlComment(undefined, true, {
                charData: "abc",
            });
            assert.strictEqual(node.charData, "abc");
        });

        it("set", () => {
            const node = new XmlComment(undefined, true, {
                charData: "abc",
            });
            node.charData = "def";
            assert.strictEqual(node.charData, "def");
        });
    });

    describe("#toString", () => {
        it("normal character data; default replace invalid chars", () => {
            assert.strictEqual(
                new XmlComment(undefined, true, {
                    charData: "abc",
                }).toString(),
                "<!--abc-->"
            );

            assert.strictEqual(
                new XmlComment(undefined, true, {
                    charData: "-a-bc",
                }).toString(),
                "<!---a-bc-->"
            );
        });

        it(
            "character data with characters not allowed in XML; default" +
                " replace invalid chars",
            () => {
                assert.throws(
                    () =>
                        new XmlComment(undefined, true, {
                            charData:
                                "abc" + String.fromCharCode(0x0001) + "def",
                        })
                );
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, false, {
                            charData:
                                "abc" + String.fromCharCode(0x0001) + "def",
                        }).toString(),
                        "<!--abc\u0001def-->"
                    );
                });
            }
        );

        it(
            "character data with characters not allowed in XML; do not" +
                " replace invalid chars",
            () => {
                assert.throws(
                    () =>
                        new XmlComment(undefined, true, {
                            charData:
                                "abc" + String.fromCharCode(0x0001) + "def",
                            replaceInvalidCharsInCharData: false,
                        })
                );
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, false, {
                            charData:
                                "abc" + String.fromCharCode(0x0001) + "def",
                            replaceInvalidCharsInCharData: false,
                        }).toString(),
                        "<!--abc\u0001def-->"
                    );
                });
            }
        );

        it(
            "character data with characters not allowed in XML; replace" +
                " invalid chars",
            () => {
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, true, {
                            charData:
                                "abc" + String.fromCharCode(0x0001) + "def",
                            replaceInvalidCharsInCharData: true,
                        }).toString(),
                        "<!--abc\uFFFDdef-->"
                    );
                });
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, false, {
                            charData:
                                "abc" + String.fromCharCode(0x0001) + "def",
                            replaceInvalidCharsInCharData: true,
                        }).toString(),
                        "<!--abc\uFFFDdef-->"
                    );
                });
            }
        );

        it(
            "character data with characters not allowed in comments; default" +
                " replace invalid chars",
            () => {
                assert.throws(
                    () =>
                        new XmlComment(undefined, true, {
                            charData: "--",
                        })
                );
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, false, {
                            charData: "--",
                        }).toString(),
                        "<!------>"
                    );
                });

                assert.throws(
                    () =>
                        new XmlComment(undefined, true, {
                            charData: "abc--def",
                        })
                );
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, false, {
                            charData: "abc--def",
                        }).toString(),
                        "<!--abc--def-->"
                    );
                });

                assert.throws(
                    () =>
                        new XmlComment(undefined, true, {
                            charData: "--abcdef",
                        })
                );
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, false, {
                            charData: "--abcdef",
                        }).toString(),
                        "<!----abcdef-->"
                    );
                });

                assert.throws(
                    () =>
                        new XmlComment(undefined, true, {
                            charData: "abcdef--",
                        })
                );
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, false, {
                            charData: "abcdef--",
                        }).toString(),
                        "<!--abcdef---->"
                    );
                });

                assert.throws(
                    () =>
                        new XmlComment(undefined, true, {
                            charData: "abcdef-",
                        })
                );
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, false, {
                            charData: "abcdef-",
                        }).toString(),
                        "<!--abcdef--->"
                    );
                });
            }
        );

        it(
            "character data with characters not allowed in comments; do not" +
                " replace invalid chars",
            () => {
                assert.throws(
                    () =>
                        new XmlComment(undefined, true, {
                            charData: "--",
                            replaceInvalidCharsInCharData: false,
                        })
                );
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, false, {
                            charData: "--",
                            replaceInvalidCharsInCharData: false,
                        }).toString(),
                        "<!------>"
                    );
                });

                assert.throws(
                    () =>
                        new XmlComment(undefined, true, {
                            charData: "abc--def",
                            replaceInvalidCharsInCharData: false,
                        })
                );
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, false, {
                            charData: "abc--def",
                            replaceInvalidCharsInCharData: false,
                        }).toString(),
                        "<!--abc--def-->"
                    );
                });

                assert.throws(
                    () =>
                        new XmlComment(undefined, true, {
                            charData: "--abcdef",
                            replaceInvalidCharsInCharData: false,
                        })
                );
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, false, {
                            charData: "--abcdef",
                            replaceInvalidCharsInCharData: false,
                        }).toString(),
                        "<!----abcdef-->"
                    );
                });

                assert.throws(
                    () =>
                        new XmlComment(undefined, true, {
                            charData: "abcdef--",
                            replaceInvalidCharsInCharData: false,
                        })
                );
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, false, {
                            charData: "abcdef--",
                            replaceInvalidCharsInCharData: false,
                        }).toString(),
                        "<!--abcdef---->"
                    );
                });

                assert.throws(
                    () =>
                        new XmlComment(undefined, true, {
                            charData: "abcdef-",
                            replaceInvalidCharsInCharData: false,
                        })
                );
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, false, {
                            charData: "abcdef-",
                            replaceInvalidCharsInCharData: false,
                        }).toString(),
                        "<!--abcdef--->"
                    );
                });
            }
        );

        it(
            "character data with characters not allowed in comments; replace" +
                " invalid chars",
            () => {
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, true, {
                            charData: "--",
                            replaceInvalidCharsInCharData: true,
                        }).toString(),
                        "<!--\uFFFD\uFFFD-->"
                    );
                });
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, false, {
                            charData: "--",
                            replaceInvalidCharsInCharData: true,
                        }).toString(),
                        "<!--\uFFFD\uFFFD-->"
                    );
                });

                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, true, {
                            charData: "abc--def",
                            replaceInvalidCharsInCharData: true,
                        }).toString(),
                        "<!--abc\uFFFD\uFFFDdef-->"
                    );
                });
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, false, {
                            charData: "abc--def",
                            replaceInvalidCharsInCharData: true,
                        }).toString(),
                        "<!--abc\uFFFD\uFFFDdef-->"
                    );
                });

                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, true, {
                            charData: "--abcdef",
                            replaceInvalidCharsInCharData: true,
                        }).toString(),
                        "<!--\uFFFD\uFFFDabcdef-->"
                    );
                });
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, false, {
                            charData: "--abcdef",
                            replaceInvalidCharsInCharData: true,
                        }).toString(),
                        "<!--\uFFFD\uFFFDabcdef-->"
                    );
                });

                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, true, {
                            charData: "abcdef--",
                            replaceInvalidCharsInCharData: true,
                        }).toString(),
                        "<!--abcdef\uFFFD\uFFFD-->"
                    );
                });
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, false, {
                            charData: "abcdef--",
                            replaceInvalidCharsInCharData: true,
                        }).toString(),
                        "<!--abcdef\uFFFD\uFFFD-->"
                    );
                });

                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, true, {
                            charData: "abcdef-",
                            replaceInvalidCharsInCharData: true,
                        }).toString(),
                        "<!--abcdef\uFFFD-->"
                    );
                });
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlComment(undefined, false, {
                            charData: "abcdef-",
                            replaceInvalidCharsInCharData: true,
                        }).toString(),
                        "<!--abcdef\uFFFD-->"
                    );
                });
            }
        );
    });

    it("#up", () => {
        assert.strictEqual(
            new XmlComment(undefined, false, {
                charData: "a",
            }).up(),
            undefined
        );
    });
});
