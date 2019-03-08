/**
 * Copyright (C) 2018-2019 Michael Kourlas
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
import XmlAttribute from "../../../lib/nodes/XmlAttribute";
import XmlCdata from "../../../lib/nodes/XmlCdata";
import XmlCharData from "../../../lib/nodes/XmlCharData";
import XmlCharRef from "../../../lib/nodes/XmlCharRef";
import XmlComment from "../../../lib/nodes/XmlComment";
import XmlElement from "../../../lib/nodes/XmlElement";
import XmlEntityRef from "../../../lib/nodes/XmlEntityRef";
import XmlProcInst from "../../../lib/nodes/XmlProcInst";

describe("XmlElement", () => {
    it("#attribute", () => {
        const node = new XmlElement(undefined, true, {name: "abc"});
        assert.isTrue(node.attribute({name: "def"}) instanceof XmlAttribute);
        assert.isTrue(
            node.attribute({name: "ghi"}).text({charData: "jkl"}).up()
            instanceof XmlAttribute);
        assert.strictEqual(node.toString(), "<abc def='' ghi='jkl'/>");
    });

    it("#cdata", () => {
        const node = new XmlElement(undefined, true, {name: "abc"});
        assert.isTrue(node.cdata({charData: "def"}) instanceof XmlCdata);
        assert.strictEqual(node.toString(),
                           "<abc>\n    <![CDATA[def]]>\n</abc>");
    });

    it("#charData", () => {
        const node = new XmlElement(undefined, true, {name: "abc"});
        assert.isTrue(node.charData({charData: "def"}) instanceof XmlCharData);
        assert.strictEqual(node.toString(), "<abc>def</abc>");
    });

    it("#charRef", () => {
        const node = new XmlElement(undefined, true, {name: "abc"});
        assert.isTrue(node.charRef({char: "a"}) instanceof XmlCharRef);
        assert.strictEqual(node.toString(), "<abc>&#97;</abc>");
    });

    it("#comment", () => {
        const node = new XmlElement(undefined, true, {name: "abc"});
        assert.isTrue(node.comment({charData: "def"}) instanceof XmlComment);
        assert.strictEqual(node.toString(), "<abc>\n    <!--def-->\n</abc>");
    });

    it("#element", () => {
        const node = new XmlElement(undefined, true, {name: "abc"});
        assert.isTrue(node.element({name: "def"}) instanceof XmlElement);
        assert.strictEqual(node.toString(), "<abc>\n    <def/>\n</abc>");
    });

    it("#entityRef", () => {
        const node = new XmlElement(undefined, true, {name: "abc"});
        assert.isTrue(node.entityRef({name: "def"}) instanceof XmlEntityRef);
        assert.strictEqual(node.toString(), "<abc>&def;</abc>");
    });

    describe("#name", () => {
        it("get", () => {
            const node = new XmlElement(undefined, true, {name: "abc"});
            assert.strictEqual(node.name, "abc");
        });

        it("set", () => {
            const node = new XmlElement(undefined, true, {name: "abc"});
            node.name = "def";
            assert.strictEqual(node.name, "def");
        });
    });

    it("#procInst", () => {
        const node = new XmlElement(undefined, true, {name: "abc"});
        assert.isTrue(node.procInst({target: "def", content: "ghi"})
                      instanceof XmlProcInst);
        assert.strictEqual(node.toString(), "<abc>\n    <?def ghi?>\n</abc>");
    });

    describe("#toString", () => {
        function getElement(): XmlElement<undefined> {
            const node = new XmlElement(undefined, true, {name: "root"});
            // @formatter:off
            node
                .attribute({name: "overt"})
                    .charRef({char: "v"}).up()
                    .entityRef({name: "repair"}).up()
                    .text({charData: "probable hospitable"}).up().up()
                .attribute({name: "stage"})
                    .text({charData: ""}).up().up()
                .attribute({name: "shop"}).up()
                .attribute({name: "length"}).up()
                .element({name: "abacus"})
                    .element({name: "windows"})
                        .element({name: "fire"})
                            .charData({charData: "blue"}).up().up()
                        .element({name: "laughable"})
                            .charData({charData: "hateful"}).up().up()
                        .element({name: "ring"})
                            .charData({charData: "terrific"}).up().up().up()
                    .element({name: "plug"})
                        .element({name: "utter"})
                            .charData({charData: "wander"}).up().up()
                        .element({name: "toys"})
                            .charData({charData: "groan"}).up().up().up()
                    .element({name: "powerful"})
                        .element({name: "coal"})
                            .charData({charData: "dear"}).up().up()
                        .element({name: "warm"})
                            .charData({charData: "impartial"}).up().up()
                        .element({name: "wink"})
                            .charData({charData: "twig"}).up().up()
                        .element({name: "secret"})
                            .charData({charData: "x"}).up().up().up().up()
                .element({name: "plant"})
                    .comment({charData: "pin punch"}).up()
                    .procInst({target: "arrogant", content: "sun rad"}).up()
                    .entityRef({name: "functional"}).up()
                    .charData({charData: "educated"}).up()
                    .charRef({char: "w"}).up()
                    .element({name: "thunder"}).up()
                    .element({name: "berserk"})
                        .charData({charData: ""}).up().up()
                    .charData({charData: "route flaky"}).up()
                    .entityRef({name: "ragged"}).up()
                    .charRef({char: "q"}).up()
                    .cdata({charData: "physical educated"}).up().up()
                .element({name: "baseball"})
                    .charData({charData: "yawn"}).up()
                    .entityRef({name: "jagged"}).up()
                    .charRef({char: "g"}).up()
                    .charData({charData: "camp"}).up()
                    .charRef({char: "y"}).up()
                    .entityRef({name: "tangible"}).up()
                    .charData({charData: "squeamish"}).up().up()
                .element({name: "multilineone"})
                    .charData({charData: "first line\nsecond line"}).up().up()
                .element({name: "multilinetwo"})
                    .element({name: "indented"})
                        .charData({charData: "third line\nfourth line"})
                            .up().up()
                    .charData({charData: "fifth line"});
            // @formatter:on

            return node;
        }

        it("normal name; default replace invalid chars; no attributes;"
           + " no children; default quotes; default pretty printing;"
           + " default indentation; default newline", () => {
            const node = new XmlElement(undefined, true, {name: "abc"});
            assert.strictEqual(node.toString(), "<abc/>");
        });

        it("name with characters not allowed in XML names; default replace"
           + " invalid chars; no attributes; no children; default quotes;"
           + " default pretty printing; default indentation; default"
           + " newline", () => {
            assert.throws(
                () => new XmlElement(undefined, true, {
                    name: "."
                }));
            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlElement(undefined, false, {
                            name: "."
                        }).toString(),
                        "<./>");
                });
        });

        it("name with characters not allowed in XML names; do not replace"
           + " invalid chars; no attributes; no children; default quotes;"
           + " default pretty printing; default indentation; default"
           + " newline", () => {
            assert.throws(
                () => new XmlElement(undefined, true, {
                    name: ".",
                    replaceInvalidCharsInName: false
                }));
            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlElement(undefined, false, {
                            name: ".",
                            replaceInvalidCharsInName: false
                        }).toString(),
                        "<./>");
                });
        });

        it("name with characters not allowed in XML names; replace"
           + " invalid chars; no attributes; no children; default quotes;"
           + " default pretty printing; default indentation; default"
           + " newline", () => {
            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlElement(undefined, true, {
                            name: ".",
                            replaceInvalidCharsInName: true
                        }).toString(),
                        "<\uFFFD/>");
                });
            assert.doesNotThrow(
                () => {
                    assert.strictEqual(
                        new XmlElement(undefined, false, {
                            name: ".",
                            replaceInvalidCharsInName: true
                        }).toString(),
                        "<\uFFFD/>");
                });
        });

        it("normal name; default replace invalid chars; attributes; no"
           + " children; default quotes; default pretty printing; default"
           + " indentation; default newline", () => {
            const node = new XmlElement(undefined, true, {name: "abc"});
            node.attribute({name: "def"}).text({charData: "ghi"});
            node.attribute({name: "jkl"}).text({charData: "mno"});
            assert.strictEqual(node.toString(), "<abc def='ghi' jkl='mno'/>");
        });

        it("normal name; default replace invalid chars; no attributes; single"
           + " empty child; default quotes; default pretty printing; default"
           + " indentation; default newline", () => {
            const node = new XmlElement(undefined, true, {name: "abc"});
            node.charData({charData: ""});
            assert.strictEqual(node.toString(), "<abc/>");
        });

        it("normal name; default replace invalid chars; no attributes; single"
           + " empty child with self-closing tag enabled; default quotes;"
           + " default pretty printing; default indentation; default"
           + " newline", () => {
            const node = new XmlElement(
                undefined, true, {name: "abc", useSelfClosingTagIfEmpty: true});
            node.charData({charData: ""});
            assert.strictEqual(node.toString(), "<abc/>");
        });

        it("normal name; default replace invalid chars; no attributes; single"
           + " empty child with self-closing tag disabled; default quotes;"
           + " default pretty printing; default indentation; default"
           + " newline", () => {
            const node = new XmlElement(
                undefined, true,
                {name: "abc", useSelfClosingTagIfEmpty: false});
            node.charData({charData: ""});
            assert.strictEqual(node.toString(), "<abc></abc>");
        });

        it("normal name; default replace invalid chars; no attributes;"
           + " children; default quotes; default pretty printing; default"
           + " indentation; default newline", () => {
            const node = getElement();
            assert.strictEqual(
                node.toString(),
                "<root overt='&#118;&repair;probable hospitable'"
                + " stage='' shop='' length=''>\n    <abacus>"
                + "\n        <windows>"
                + "\n            <fire>blue</fire>"
                + "\n            <laughable>hateful</laughable>"
                + "\n            <ring>terrific</ring>\n        </windows>"
                + "\n        <plug>\n            <utter>wander</utter>"
                + "\n            <toys>groan</toys>\n        </plug>"
                + "\n        <powerful>\n            <coal>dear</coal>"
                + "\n            <warm>impartial</warm>"
                + "\n            <wink>twig</wink>"
                + "\n            <secret>x</secret>\n        </powerful>"
                + "\n    </abacus>\n    <plant>\n        <!--pin punch-->"
                + "\n        <?arrogant sun rad?>"
                + "\n        &functional;educated&#119;\n        <thunder/>"
                + "\n        <berserk/>\n        route flaky&ragged;&#113;"
                + "\n        <![CDATA[physical educated]]>\n    </plant>"
                + "\n    <baseball>yawn&jagged;&#103;camp&#121;"
                + "&tangible;squeamish</baseball>"
                + "\n    <multilineone>first line\nsecond line</multilineone>"
                + "\n    <multilinetwo>\n        <indented>"
                + "third line\nfourth line</indented>"
                + "\n        fifth line\n    </multilinetwo>\n</root>");
        });

        it("normal name; default replace invalid chars; no attributes;"
           + " children; single quotes; default pretty printing; default"
           + " indentation; default newline", () => {
            const node = getElement();
            assert.strictEqual(
                node.toString({doubleQuotes: false}),
                "<root overt='&#118;&repair;probable hospitable'"
                + " stage='' shop='' length=''>"
                + "\n    <abacus>\n        <windows>"
                + "\n            <fire>blue</fire>"
                + "\n            <laughable>hateful</laughable>"
                + "\n            <ring>terrific</ring>\n        </windows>"
                + "\n        <plug>\n            <utter>wander</utter>"
                + "\n            <toys>groan</toys>\n        </plug>"
                + "\n        <powerful>\n            <coal>dear</coal>"
                + "\n            <warm>impartial</warm>"
                + "\n            <wink>twig</wink>"
                + "\n            <secret>x</secret>\n        </powerful>"
                + "\n    </abacus>\n    <plant>\n        <!--pin punch-->"
                + "\n        <?arrogant sun rad?>"
                + "\n        &functional;educated&#119;\n        <thunder/>"
                + "\n        <berserk/>\n        route flaky&ragged;&#113;"
                + "\n        <![CDATA[physical educated]]>\n    </plant>"
                + "\n    <baseball>yawn&jagged;&#103;camp&#121;"
                + "&tangible;squeamish</baseball>"
                + "\n    <multilineone>first line\nsecond line</multilineone>"
                + "\n    <multilinetwo>\n        <indented>"
                + "third line\nfourth line</indented>"
                + "\n        fifth line\n    </multilinetwo>\n</root>");
        });

        it("normal name; default replace invalid chars; no attributes;"
           + " children; double quotes; default pretty printing; default"
           + " indentation; default newline", () => {
            const node = getElement();
            /* tslint:disable:quotemark */
            assert.strictEqual(
                node.toString({doubleQuotes: true}),
                '<root overt="&#118;&repair;probable hospitable"'
                + ' stage="" shop="" length="">'
                + '\n    <abacus>\n        <windows>'
                + '\n            <fire>blue</fire>'
                + '\n            <laughable>hateful</laughable>'
                + '\n            <ring>terrific</ring>\n        </windows>'
                + '\n        <plug>\n            <utter>wander</utter>'
                + '\n            <toys>groan</toys>\n        </plug>'
                + '\n        <powerful>\n            <coal>dear</coal>'
                + '\n            <warm>impartial</warm>'
                + '\n            <wink>twig</wink>'
                + '\n            <secret>x</secret>\n        </powerful>'
                + '\n    </abacus>\n    <plant>\n        <!--pin punch-->'
                + '\n        <?arrogant sun rad?>'
                + '\n        &functional;educated&#119;\n        <thunder/>'
                + '\n        <berserk/>\n        route flaky&ragged;&#113;'
                + '\n        <![CDATA[physical educated]]>\n    </plant>'
                + '\n    <baseball>yawn&jagged;&#103;camp&#121;'
                + '&tangible;squeamish</baseball>'
                + '\n    <multilineone>first line\nsecond line</multilineone>'
                + '\n    <multilinetwo>\n        <indented>'
                + 'third line\nfourth line</indented>'
                + '\n        fifth line\n    </multilinetwo>\n</root>');
            /* tslint:enable:quotemark */
        });

        it("normal name; default replace invalid chars; no attributes;"
           + " children; default quotes; pretty printing on; default"
           + " indentation; default newline", () => {
            const node = getElement();
            assert.strictEqual(
                node.toString({pretty: true}),
                "<root overt='&#118;&repair;probable hospitable'"
                + " stage='' shop='' length=''>"
                + "\n    <abacus>\n        <windows>"
                + "\n            <fire>blue</fire>"
                + "\n            <laughable>hateful</laughable>"
                + "\n            <ring>terrific</ring>\n        </windows>"
                + "\n        <plug>\n            <utter>wander</utter>"
                + "\n            <toys>groan</toys>\n        </plug>"
                + "\n        <powerful>\n            <coal>dear</coal>"
                + "\n            <warm>impartial</warm>"
                + "\n            <wink>twig</wink>"
                + "\n            <secret>x</secret>\n        </powerful>"
                + "\n    </abacus>\n    <plant>\n        <!--pin punch-->"
                + "\n        <?arrogant sun rad?>"
                + "\n        &functional;educated&#119;\n        <thunder/>"
                + "\n        <berserk/>\n        route flaky&ragged;&#113;"
                + "\n        <![CDATA[physical educated]]>\n    </plant>"
                + "\n    <baseball>yawn&jagged;&#103;camp&#121;"
                + "&tangible;squeamish</baseball>"
                + "\n    <multilineone>first line\nsecond line</multilineone>"
                + "\n    <multilinetwo>\n        <indented>"
                + "third line\nfourth line</indented>"
                + "\n        fifth line\n    </multilinetwo>\n</root>");
        });

        it("normal name; default replace invalid chars; no attributes;"
           + " children; default quotes; pretty printing off; default"
           + " indentation; default newline", () => {
            const node = getElement();
            assert.strictEqual(
                node.toString({pretty: false}),
                "<root overt='&#118;&repair;probable hospitable'"
                + " stage='' shop='' length=''><abacus><windows>"
                + "<fire>blue</fire>"
                + "<laughable>hateful</laughable>"
                + "<ring>terrific</ring></windows>"
                + "<plug><utter>wander</utter>"
                + "<toys>groan</toys></plug>"
                + "<powerful><coal>dear</coal>"
                + "<warm>impartial</warm>"
                + "<wink>twig</wink>"
                + "<secret>x</secret></powerful>"
                + "</abacus><plant><!--pin punch-->"
                + "<?arrogant sun rad?>"
                + "&functional;educated&#119;<thunder/>"
                + "<berserk/>route flaky&ragged;&#113;"
                + "<![CDATA[physical educated]]></plant>"
                + "<baseball>yawn&jagged;&#103;camp&#121;"
                + "&tangible;squeamish</baseball>"
                + "<multilineone>first line\nsecond line</multilineone>"
                + "<multilinetwo><indented>third line\nfourth line</indented>"
                + "fifth line</multilinetwo></root>");
        });

        it("normal name; default replace invalid chars; no attributes;"
           + " children; default quotes; default pretty printing; indentation"
           + " four spaces; default newline", () => {
            const node = getElement();
            assert.strictEqual(
                node.toString({indent: "    "}),
                "<root overt='&#118;&repair;probable hospitable'"
                + " stage='' shop='' length=''>"
                + "\n    <abacus>\n        <windows>"
                + "\n            <fire>blue</fire>"
                + "\n            <laughable>hateful</laughable>"
                + "\n            <ring>terrific</ring>\n        </windows>"
                + "\n        <plug>\n            <utter>wander</utter>"
                + "\n            <toys>groan</toys>\n        </plug>"
                + "\n        <powerful>\n            <coal>dear</coal>"
                + "\n            <warm>impartial</warm>"
                + "\n            <wink>twig</wink>"
                + "\n            <secret>x</secret>\n        </powerful>"
                + "\n    </abacus>\n    <plant>\n        <!--pin punch-->"
                + "\n        <?arrogant sun rad?>"
                + "\n        &functional;educated&#119;\n        <thunder/>"
                + "\n        <berserk/>\n        route flaky&ragged;&#113;"
                + "\n        <![CDATA[physical educated]]>\n    </plant>"
                + "\n    <baseball>yawn&jagged;&#103;camp&#121;"
                + "&tangible;squeamish</baseball>"
                + "\n    <multilineone>first line\nsecond line</multilineone>"
                + "\n    <multilinetwo>\n        <indented>"
                + "third line\nfourth line</indented>"
                + "\n        fifth line\n    </multilinetwo>\n</root>");
        });

        it("normal name; default replace invalid chars; no attributes;"
           + " children; default quotes; default pretty printing; indentation"
           + " tabs; default newline", () => {
            const node = getElement();
            assert.strictEqual(
                node.toString({indent: "\t"}),
                "<root overt='&#118;&repair;probable hospitable'"
                + " stage='' shop='' length=''>\n\t<abacus>\n\t\t<windows>"
                + "\n\t\t\t<fire>blue</fire>"
                + "\n\t\t\t<laughable>hateful</laughable>"
                + "\n\t\t\t<ring>terrific</ring>\n\t\t</windows>"
                + "\n\t\t<plug>\n\t\t\t<utter>wander</utter>"
                + "\n\t\t\t<toys>groan</toys>\n\t\t</plug>"
                + "\n\t\t<powerful>\n\t\t\t<coal>dear</coal>"
                + "\n\t\t\t<warm>impartial</warm>"
                + "\n\t\t\t<wink>twig</wink>"
                + "\n\t\t\t<secret>x</secret>\n\t\t</powerful>"
                + "\n\t</abacus>\n\t<plant>\n\t\t<!--pin punch-->"
                + "\n\t\t<?arrogant sun rad?>"
                + "\n\t\t&functional;educated&#119;\n\t\t<thunder/>"
                + "\n\t\t<berserk/>\n\t\troute flaky&ragged;&#113;"
                + "\n\t\t<![CDATA[physical educated]]>\n\t</plant>"
                + "\n\t<baseball>yawn&jagged;&#103;camp&#121;"
                + "&tangible;squeamish</baseball>"
                + "\n\t<multilineone>first line\nsecond line</multilineone>"
                + "\n\t<multilinetwo>\n\t\t<indented>"
                + "third line\nfourth line</indented>"
                + "\n\t\tfifth line\n\t</multilinetwo>\n</root>");
        });

        it("normal name; default replace invalid chars; no attributes;"
           + " children; default quotes; default pretty printing; default"
           + " indentation; \\n newline", () => {
            const node = getElement();
            assert.strictEqual(
                node.toString({newline: "\n"}),
                "<root overt='&#118;&repair;probable hospitable'"
                + " stage='' shop='' length=''>"
                + "\n    <abacus>\n        <windows>"
                + "\n            <fire>blue</fire>"
                + "\n            <laughable>hateful</laughable>"
                + "\n            <ring>terrific</ring>\n        </windows>"
                + "\n        <plug>\n            <utter>wander</utter>"
                + "\n            <toys>groan</toys>\n        </plug>"
                + "\n        <powerful>\n            <coal>dear</coal>"
                + "\n            <warm>impartial</warm>"
                + "\n            <wink>twig</wink>"
                + "\n            <secret>x</secret>\n        </powerful>"
                + "\n    </abacus>\n    <plant>\n        <!--pin punch-->"
                + "\n        <?arrogant sun rad?>"
                + "\n        &functional;educated&#119;\n        <thunder/>"
                + "\n        <berserk/>\n        route flaky&ragged;&#113;"
                + "\n        <![CDATA[physical educated]]>\n    </plant>"
                + "\n    <baseball>yawn&jagged;&#103;camp&#121;"
                + "&tangible;squeamish</baseball>"
                + "\n    <multilineone>first line\nsecond line</multilineone>"
                + "\n    <multilinetwo>\n        <indented>"
                + "third line\nfourth line</indented>"
                + "\n        fifth line\n    </multilinetwo>\n</root>");
        });

        it("normal name; default replace invalid chars; no attributes;"
           + " children; default quotes; default pretty printing; default"
           + " indentation; \\r\\n newline", () => {
            const node = getElement();
            assert.strictEqual(
                node.toString({newline: "\r\n"}),
                "<root overt='&#118;&repair;probable hospitable'"
                + " stage='' shop='' length=''>"
                + "\r\n    <abacus>\r\n        <windows>"
                + "\r\n            <fire>blue</fire>"
                + "\r\n            <laughable>hateful</laughable>"
                + "\r\n            <ring>terrific</ring>\r\n        </windows>"
                + "\r\n        <plug>\r\n            <utter>wander</utter>"
                + "\r\n            <toys>groan</toys>\r\n        </plug>"
                + "\r\n        <powerful>\r\n            <coal>dear</coal>"
                + "\r\n            <warm>impartial</warm>"
                + "\r\n            <wink>twig</wink>"
                + "\r\n            <secret>x</secret>\r\n        </powerful>"
                + "\r\n    </abacus>\r\n    <plant>\r\n        <!--pin punch-->"
                + "\r\n        <?arrogant sun rad?>"
                + "\r\n        &functional;educated&#119;\r\n        <thunder/>"
                + "\r\n        <berserk/>\r\n        route flaky&ragged;&#113;"
                + "\r\n        <![CDATA[physical educated]]>\r\n    </plant>"
                + "\r\n    <baseball>yawn&jagged;&#103;camp&#121;"
                + "&tangible;squeamish</baseball>"
                + "\r\n    <multilineone>first line\nsecond line</multilineone>"
                + "\r\n    <multilinetwo>\r\n        <indented>"
                + "third line\nfourth line</indented>"
                + "\r\n        fifth line\r\n    </multilinetwo>\r\n</root>");
        });
    });
});
