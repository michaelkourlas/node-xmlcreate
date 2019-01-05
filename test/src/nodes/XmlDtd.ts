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
import XmlDtd from "../../../lib/nodes/XmlDtd";
import XmlDtdAttlist from "../../../lib/nodes/XmlDtdAttlist";
import XmlDtdElement from "../../../lib/nodes/XmlDtdElement";
import XmlDtdEntity from "../../../lib/nodes/XmlDtdEntity";
import XmlDtdNotation from "../../../lib/nodes/XmlDtdNotation";
import XmlDtdParamEntityRef from "../../../lib/nodes/XmlDtdParamEntityRef";
import XmlProcInst from "../../../lib/nodes/XmlProcInst";

describe("XmlDtd", () => {
    it("#attlist", () => {
        const node = new XmlDtd(undefined, false, {name: "abc"});
        assert.isTrue(node.attlist({charData: "test"})
                      instanceof XmlDtdAttlist);
        assert.isTrue(node.attlist({charData: "test2"})
                      instanceof XmlDtdAttlist);
        assert.strictEqual(
            node.toString(),
            "<!DOCTYPE abc [\n    <!ATTLIST test>\n    <!ATTLIST test2>\n]>");
    });

    it("#comment", () => {
        const node = new XmlDtd(undefined, false, {name: "abc"});
        assert.isTrue(node.comment({charData: "test"}) instanceof XmlComment);
        assert.isTrue(node.comment({charData: "test2"}) instanceof XmlComment);
        assert.strictEqual(
            node.toString(),
            "<!DOCTYPE abc [\n    <!--test-->\n    <!--test2-->\n]>");
    });

    it("#element", () => {
        const node = new XmlDtd(undefined, false, {name: "abc"});
        assert.isTrue(node.element({charData: "test"})
                      instanceof XmlDtdElement);
        assert.isTrue(node.element({charData: "test2"})
                      instanceof XmlDtdElement);
        assert.strictEqual(
            node.toString(),
            "<!DOCTYPE abc [\n    <!ELEMENT test>\n    <!ELEMENT test2>\n]>");
    });

    it("#entity", () => {
        const node = new XmlDtd(undefined, false, {name: "abc"});
        assert.isTrue(node.entity({charData: "test"}) instanceof XmlDtdEntity);
        assert.isTrue(node.entity({charData: "test2"}) instanceof XmlDtdEntity);
        assert.strictEqual(
            node.toString(),
            "<!DOCTYPE abc [\n    <!ENTITY test>\n    <!ENTITY test2>\n]>");
    });

    describe("#name", () => {
        it("get", () => {
            const node = new XmlDtd(undefined, true, {
                name: "abc"
            });
            assert.strictEqual(node.name, "abc");
        });

        it("set", () => {
            const node = new XmlDtd(undefined, true, {
                name: "abc"
            });
            node.name = "def";
            assert.strictEqual(node.name, "def");
        });
    });

    it("#notation", () => {
        const node = new XmlDtd(undefined, false, {name: "abc"});
        assert.isTrue(node.notation({charData: "test"})
                      instanceof XmlDtdNotation);
        assert.isTrue(node.notation({charData: "test2"})
                      instanceof XmlDtdNotation);
        assert.strictEqual(
            node.toString(),
            "<!DOCTYPE abc [\n    <!NOTATION test>\n    <!NOTATION test2>\n]>");
    });

    it("#paramEntityRef", () => {
        const node = new XmlDtd(undefined, false, {name: "abc"});
        assert.isTrue(node.paramEntityRef({name: "test"})
                      instanceof XmlDtdParamEntityRef);
        assert.isTrue(node.paramEntityRef({name: "test2"})
                      instanceof XmlDtdParamEntityRef);
        assert.strictEqual(
            node.toString(),
            "<!DOCTYPE abc [\n    %test;\n    %test2;\n]>");
    });

    describe("#pubId", () => {
        it("get", () => {
            const node = new XmlDtd(undefined, true, {
                name: "a",
                pubId: "abc",
                sysId: "b"
            });
            assert.strictEqual(node.pubId, "abc");
        });

        it("set", () => {
            const node = new XmlDtd(undefined, true, {
                name: "a",
                pubId: "abc",
                sysId: "b"
            });
            node.pubId = "def";
            assert.strictEqual(node.pubId, "def");
        });
    });

    it("#procInst", () => {
        const node = new XmlDtd(undefined, false, {name: "abc"});
        assert.isTrue(node.procInst({target: "test", content: "a"})
                      instanceof XmlProcInst);
        assert.isTrue(node.procInst({target: "test2"})
                      instanceof XmlProcInst);
        assert.strictEqual(
            node.toString(),
            "<!DOCTYPE abc [\n    <?test a?>\n    <?test2?>\n]>");
    });

    describe("#sysId", () => {
        it("get", () => {
            const node = new XmlDtd(undefined, true, {
                name: "a",
                sysId: "abc"
            });
            assert.strictEqual(node.sysId, "abc");
        });

        it("set", () => {
            const node = new XmlDtd(undefined, true, {
                name: "a",
                sysId: "abc"
            });
            node.sysId = "def";
            assert.strictEqual(node.sysId, "def");
        });
    });

    describe("#toString", () => {
        it("normal name; normal sysId; normal pubId; no children;"
           + " default quotes; default pretty printing;"
           + " default indentation; default newline", () => {
            assert.strictEqual(
                new XmlDtd(undefined, true, {
                    name: "abc",
                    pubId: "ghi",
                    sysId: "def"
                }).toString(),
                "<!DOCTYPE abc PUBLIC 'ghi' 'def'>");

            assert.strictEqual(
                new XmlDtd(undefined, true, {
                    name: "abc",
                    pubId: "azAz09-'()+,./:=?;!*#@$_% \n",
                    sysId: "def"
                }).toString({doubleQuotes: true}),
                "<!DOCTYPE abc PUBLIC \"azAz09-'()+,./:=?;!*#@$_% \n\""
                + " \"def\">");

            assert.strictEqual(
                new XmlDtd(undefined, true, {
                    name: "abc",
                    pubId: "ghi",
                    sysId: "\"def\""
                }).toString(),
                "<!DOCTYPE abc PUBLIC 'ghi' '\"def\"'>");
        });

        it("normal name; normal sysId; normal pubId; children;"
           + " default quotes; default pretty printing;"
           + " default indentation; default newline", () => {
            const node = new XmlDtd(undefined, true, {
                name: "abc",
                pubId: "ghi",
                sysId: "def"
            });
            node.attlist({charData: "test1"});
            node.comment({charData: "test2"});
            node.element({charData: "test3"});
            node.entity({charData: "test4"});
            node.notation({charData: "test5"});
            node.paramEntityRef({name: "test6"});
            node.procInst({target: "test7", content: "test8"});
            assert.strictEqual(
                node.toString(),
                "<!DOCTYPE abc PUBLIC \'ghi\' \'def\' [\n"
                + "    <!ATTLIST test1>\n    <!--test2-->\n"
                + "    <!ELEMENT test3>\n    <!ENTITY test4>\n"
                + "    <!NOTATION test5>\n    %test6;\n"
                + "    <?test7 test8?>\n]>");
        });

        it("normal name; normal sysId; no pubId; no children;"
           + " default quotes; default pretty printing;"
           + " default indentation; default newline", () => {
            assert.strictEqual(
                new XmlDtd(undefined, true, {
                    name: "abc",
                    sysId: "def"
                }).toString(),
                "<!DOCTYPE abc SYSTEM 'def'>");
        });

        it("normal name; normal sysId; no pubId; children;"
           + " default quotes; default pretty printing;"
           + " default indentation; default newline", () => {
            const node = new XmlDtd(undefined, true, {
                name: "abc",
                sysId: "def"
            });
            node.attlist({charData: "test1"});
            node.comment({charData: "test2"});
            node.element({charData: "test3"});
            node.entity({charData: "test4"});
            node.notation({charData: "test5"});
            node.paramEntityRef({name: "test6"});
            node.procInst({target: "test7", content: "test8"});
            assert.strictEqual(node.toString(),
                               "<!DOCTYPE abc SYSTEM \'def\' [\n"
                               + "    <!ATTLIST test1>\n    <!--test2-->\n"
                               + "    <!ELEMENT test3>\n    <!ENTITY test4>\n"
                               + "    <!NOTATION test5>\n    %test6;\n"
                               + "    <?test7 test8?>\n]>");
        });

        it("normal name; no sysId; no pubId; no children;"
           + " default quotes; default pretty printing;"
           + " default indentation; default newline", () => {
            assert.strictEqual(
                new XmlDtd(undefined, true, {
                    name: "abc"
                }).toString(),
                "<!DOCTYPE abc>");
        });

        it("normal name; no sysId; no pubId; children;"
           + " default quotes; default pretty printing;"
           + " default indentation; default newline", () => {
            const node = new XmlDtd(undefined, true, {name: "abc"});
            node.attlist({charData: "test1"});
            node.comment({charData: "test2"});
            node.element({charData: "test3"});
            node.entity({charData: "test4"});
            node.notation({charData: "test5"});
            node.paramEntityRef({name: "test6"});
            node.procInst({target: "test7", content: "test8"});
            assert.strictEqual(
                node.toString(),
                "<!DOCTYPE abc [\n    <!ATTLIST test1>\n"
                + "    <!--test2-->\n    <!ELEMENT test3>\n"
                + "    <!ENTITY test4>\n    <!NOTATION test5>\n"
                + "    %test6;\n    <?test7 test8?>\n]>");
        });

        it("name with characters not allowed in XML names;"
           + " no sysId; no pubId; no children; default quotes;"
           + " default pretty printing; default indentation;"
           + " default newline", () => {
            assert.throws(
                () => new XmlDtd(undefined, true, {
                    name: "."
                }));
            assert.doesNotThrow(
                () => new XmlDtd(undefined, false, {
                    name: "."
                }));
        });

        it("normal name; normal sysId; pubId with characters not allowed in"
           + " public identifiers; no children; default quotes;"
           + " default pretty printing; default indentation;"
           + " default newline", () => {
            assert.throws(
                () => new XmlDtd(undefined, true, {
                    name: "abc",
                    pubId: "~",
                    sysId: "def"
                }));
            assert.doesNotThrow(
                () => new XmlDtd(undefined, false, {
                    name: "abc",
                    pubId: "~",
                    sysId: "def"
                }));

            assert.throws(
                () => new XmlDtd(undefined, true, {
                    name: "abc",
                    pubId: "~ab",
                    sysId: "def"
                }));
            assert.doesNotThrow(
                () => new XmlDtd(undefined, false, {
                    name: "abc",
                    pubId: "~ab",
                    sysId: "def"
                }));

            assert.throws(
                () => new XmlDtd(undefined, true, {
                    name: "abc",
                    pubId: "ab~",
                    sysId: "def"
                }));
            assert.doesNotThrow(
                () => new XmlDtd(undefined, false, {
                    name: "abc",
                    pubId: "ab~",
                    sysId: "def"
                }));

            assert.throws(
                () => new XmlDtd(undefined, true, {
                    name: "abc",
                    pubId: "a~b",
                    sysId: "def"
                }));
            assert.doesNotThrow(
                () => new XmlDtd(undefined, false, {
                    name: "abc",
                    pubId: "a~b",
                    sysId: "def"
                }));

            assert.throws(
                () => new XmlDtd(undefined, true, {
                    name: "abc",
                    pubId: "a~b~~ab~a",
                    sysId: "def"
                }));
            assert.doesNotThrow(
                () => new XmlDtd(undefined, false, {
                    name: "abc",
                    pubId: "a~b~~ab~a",
                    sysId: "def"
                }));
        });

        it("normal name; sysId with characters not allowed in"
           + " system identifiers; no pubId; no children; default quotes;"
           + " default pretty printing; default indentation;"
           + " default newline", () => {
            assert.throws(
                () => new XmlDtd(undefined, true, {
                    name: "abc",
                    sysId: "abc" + String.fromCharCode(0x0001) + "def"
                }));
            assert.doesNotThrow(
                () => new XmlDtd(undefined, false, {
                    name: "abc",
                    sysId: "abc" + String.fromCharCode(0x0001) + "def"
                }));

            assert.throws(
                () => new XmlDtd(undefined, true, {
                    name: "abc",
                    sysId: "'\""
                }));
            assert.doesNotThrow(
                () => new XmlDtd(undefined, false, {
                    name: "abc",
                    sysId: "'\""
                }));

            assert.throws(
                () => new XmlDtd(undefined, true, {
                    name: "abc",
                    sysId: "abc'abc\"abc"
                }));
            assert.doesNotThrow(
                () => new XmlDtd(undefined, false, {
                    name: "abc",
                    sysId: "abc'abc\"abc"
                }));
        });

        it("normal name; no sysId; normal pubId; no children; default quotes;"
           + " default pretty printing; default indentation;"
           + " default newline", () => {
            assert.throws(
                () => new XmlDtd(undefined, true, {
                    name: "abc",
                    pubId: "def"
                }));
            assert.doesNotThrow(
                () => new XmlDtd(undefined, false, {
                    name: "abc",
                    pubId: "def"
                }));
        });

        it("normal name; normal sysId; normal pubId; children;"
           + " single quotes; default pretty printing;"
           + " default indentation; default newline", () => {
            const node = new XmlDtd(undefined, true, {
                name: "abc",
                pubId: "ghi",
                sysId: "def"
            });
            node.attlist({charData: "test1"});
            node.comment({charData: "test2"});
            node.element({charData: "test3"});
            node.entity({charData: "test4"});
            node.notation({charData: "test5"});
            node.paramEntityRef({name: "test6"});
            node.procInst({target: "test7", content: "test8"});
            assert.strictEqual(
                node.toString({doubleQuotes: false}),
                "<!DOCTYPE abc PUBLIC \'ghi\' \'def\' [\n"
                + "    <!ATTLIST test1>\n    <!--test2-->\n"
                + "    <!ELEMENT test3>\n    <!ENTITY test4>\n"
                + "    <!NOTATION test5>\n    %test6;\n"
                + "    <?test7 test8?>\n]>");
        });

        it("normal name; normal sysId; normal pubId; children;"
           + " double quotes; default pretty printing;"
           + " default indentation; default newline", () => {
            const node = new XmlDtd(undefined, true, {
                name: "abc",
                pubId: "ghi",
                sysId: "def"
            });
            node.attlist({charData: "test1"});
            node.comment({charData: "test2"});
            node.element({charData: "test3"});
            node.entity({charData: "test4"});
            node.notation({charData: "test5"});
            node.paramEntityRef({name: "test6"});
            node.procInst({target: "test7", content: "test8"});
            assert.strictEqual(
                node.toString({doubleQuotes: true}),
                "<!DOCTYPE abc PUBLIC \"ghi\" \"def\" [\n"
                + "    <!ATTLIST test1>\n    <!--test2-->\n"
                + "    <!ELEMENT test3>\n    <!ENTITY test4>\n"
                + "    <!NOTATION test5>\n    %test6;\n"
                + "    <?test7 test8?>\n]>");
        });

        it("normal name; normal sysId; normal pubId; children;"
           + " default quotes; pretty printing on;"
           + " default indentation; default newline", () => {
            const node = new XmlDtd(undefined, true, {
                name: "abc",
                pubId: "ghi",
                sysId: "def"
            });
            node.attlist({charData: "test1"});
            node.comment({charData: "test2"});
            node.element({charData: "test3"});
            node.entity({charData: "test4"});
            node.notation({charData: "test5"});
            node.paramEntityRef({name: "test6"});
            node.procInst({target: "test7", content: "test8"});
            assert.strictEqual(
                node.toString({pretty: true}),
                "<!DOCTYPE abc PUBLIC \'ghi\' \'def\' [\n"
                + "    <!ATTLIST test1>\n    <!--test2-->\n"
                + "    <!ELEMENT test3>\n    <!ENTITY test4>\n"
                + "    <!NOTATION test5>\n    %test6;\n"
                + "    <?test7 test8?>\n]>");
        });

        it("normal name; normal sysId; normal pubId; children;"
           + " default quotes; pretty printing off;"
           + " default indentation; default newline", () => {
            const node = new XmlDtd(undefined, true, {
                name: "abc",
                pubId: "ghi",
                sysId: "def"
            });
            node.attlist({charData: "test1"});
            node.comment({charData: "test2"});
            node.element({charData: "test3"});
            node.entity({charData: "test4"});
            node.notation({charData: "test5"});
            node.paramEntityRef({name: "test6"});
            node.procInst({target: "test7", content: "test8"});
            assert.strictEqual(
                node.toString({pretty: false}),
                "<!DOCTYPE abc PUBLIC \'ghi\' \'def\' ["
                + "<!ATTLIST test1><!--test2-->"
                + "<!ELEMENT test3><!ENTITY test4>"
                + "<!NOTATION test5>%test6;"
                + "<?test7 test8?>]>");
        });

        it("normal name; normal sysId; normal pubId; children;"
           + " default quotes; default pretty printing;"
           + " indentation four spaces; default newline", () => {
            const node = new XmlDtd(undefined, true, {
                name: "abc",
                pubId: "ghi",
                sysId: "def"
            });
            node.attlist({charData: "test1"});
            node.comment({charData: "test2"});
            node.element({charData: "test3"});
            node.entity({charData: "test4"});
            node.notation({charData: "test5"});
            node.paramEntityRef({name: "test6"});
            node.procInst({target: "test7", content: "test8"});
            assert.strictEqual(
                node.toString({indent: "    "}),
                "<!DOCTYPE abc PUBLIC \'ghi\' \'def\' [\n"
                + "    <!ATTLIST test1>\n    <!--test2-->\n"
                + "    <!ELEMENT test3>\n    <!ENTITY test4>\n"
                + "    <!NOTATION test5>\n    %test6;\n"
                + "    <?test7 test8?>\n]>");
        });

        it("normal name; normal sysId; normal pubId; children;"
           + " default quotes; default pretty printing;"
           + " indentation tabs; default newline", () => {
            const node = new XmlDtd(undefined, true, {
                name: "abc",
                pubId: "ghi",
                sysId: "def"
            });
            node.attlist({charData: "test1"});
            node.comment({charData: "test2"});
            node.element({charData: "test3"});
            node.entity({charData: "test4"});
            node.notation({charData: "test5"});
            node.paramEntityRef({name: "test6"});
            node.procInst({target: "test7", content: "test8"});
            assert.strictEqual(
                node.toString({indent: "\t"}),
                "<!DOCTYPE abc PUBLIC \'ghi\' \'def\' [\n"
                + "\t<!ATTLIST test1>\n\t<!--test2-->\n"
                + "\t<!ELEMENT test3>\n\t<!ENTITY test4>\n"
                + "\t<!NOTATION test5>\n\t%test6;\n"
                + "\t<?test7 test8?>\n]>");
        });

        it("normal name; normal sysId; normal pubId; children;"
           + " default quotes; default pretty printing;"
           + " default indentation; newline \\n", () => {
            const node = new XmlDtd(undefined, true, {
                name: "abc",
                pubId: "ghi",
                sysId: "def"
            });
            node.attlist({charData: "test1"});
            node.comment({charData: "test2"});
            node.element({charData: "test3"});
            node.entity({charData: "test4"});
            node.notation({charData: "test5"});
            node.paramEntityRef({name: "test6"});
            node.procInst({target: "test7", content: "test8"});
            assert.strictEqual(
                node.toString({newline: "\n"}),
                "<!DOCTYPE abc PUBLIC \'ghi\' \'def\' [\n"
                + "    <!ATTLIST test1>\n    <!--test2-->\n"
                + "    <!ELEMENT test3>\n    <!ENTITY test4>\n"
                + "    <!NOTATION test5>\n    %test6;\n"
                + "    <?test7 test8?>\n]>");
        });

        it("normal name; normal sysId; normal pubId; children;"
           + " default quotes; default pretty printing;"
           + " default indentation; newline \\r\\n", () => {
            const node = new XmlDtd(undefined, true, {
                name: "abc",
                pubId: "ghi",
                sysId: "def"
            });
            node.attlist({charData: "test1"});
            node.comment({charData: "test2"});
            node.element({charData: "test3"});
            node.entity({charData: "test4"});
            node.notation({charData: "test5"});
            node.paramEntityRef({name: "test6"});
            node.procInst({target: "test7", content: "test8"});
            assert.strictEqual(
                node.toString({newline: "\r\n"}),
                "<!DOCTYPE abc PUBLIC \'ghi\' \'def\' [\r\n"
                + "    <!ATTLIST test1>\r\n    <!--test2-->\r\n"
                + "    <!ELEMENT test3>\r\n    <!ENTITY test4>\r\n"
                + "    <!NOTATION test5>\r\n    %test6;\r\n"
                + "    <?test7 test8?>\r\n]>");
        });

        it("normal name; sysId with single quotes; normal pubId; children;"
           + " single quotes; default pretty printing;"
           + " default indentation; default newline", () => {
            assert.throws(() => {
                const node = new XmlDtd(undefined, true, {
                    name: "test1",
                    pubId: "test3",
                    sysId: "'test2'"
                });
                node.toString({doubleQuotes: false});
            });
            assert.doesNotThrow(() => {
                const node = new XmlDtd(undefined, false, {
                    name: "test1",
                    pubId: "test3",
                    sysId: "'test2'"
                });
                node.toString({doubleQuotes: false});
            });
        });

        it("normal name; sysId with double quotes; normal pubId; children;"
           + " double quotes; default pretty printing;"
           + " default indentation; default newline", () => {
            assert.throws(() => {
                const node = new XmlDtd(undefined, true, {
                    name: "test1",
                    pubId: "test3",
                    sysId: "\"test2\""
                });
                node.toString({doubleQuotes: true});
            });
            assert.doesNotThrow(() => {
                const node = new XmlDtd(undefined, false, {
                    name: "test1",
                    pubId: "test3",
                    sysId: "\"test2\""
                });
                node.toString({doubleQuotes: true});
            });
        });

        it("normal name; normal sysId; pubId with single quotes; children;"
           + " double quotes; default pretty printing;"
           + " default indentation; default newline", () => {
            assert.throws(() => {
                const node = new XmlDtd(undefined, true, {
                    name: "test1",
                    pubId: "'test2''",
                    sysId: "test3"
                });
                node.toString({doubleQuotes: false});
            });
            assert.doesNotThrow(() => {
                const node = new XmlDtd(undefined, false, {
                    name: "test1",
                    pubId: "'test2''",
                    sysId: "test3"
                });
                node.toString({doubleQuotes: false});
            });
        });

        it("normal name; normal sysId; pubId with double quotes; children;"
           + " double quotes; default pretty printing;"
           + " default indentation; default newline", () => {
            assert.throws(() => {
                const node = new XmlDtd(undefined, true, {
                    name: "test1",
                    pubId: "\"test2\"",
                    sysId: "test3"
                });
                node.toString({doubleQuotes: true});
            });
            assert.doesNotThrow(() => {
                const node = new XmlDtd(undefined, false, {
                    name: "test1",
                    pubId: "\"test2\"",
                    sysId: "test3"
                });
                node.toString({doubleQuotes: true});
            });
        });
    });

    it("#up", () => {
        assert.strictEqual(
            new XmlDtd(undefined, false, {
                name: "a"
            }).up(),
            undefined);
    });
});
