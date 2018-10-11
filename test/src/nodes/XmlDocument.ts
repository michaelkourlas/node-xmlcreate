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
import XmlComment from "../../../lib/nodes/XmlComment";
import XmlDecl from "../../../lib/nodes/XmlDecl";
import XmlDocument from "../../../lib/nodes/XmlDocument";
import XmlDtd from "../../../lib/nodes/XmlDtd";
import XmlElement from "../../../lib/nodes/XmlElement";
import XmlProcInst from "../../../lib/nodes/XmlProcInst";

describe("XmlDocument", () => {
    it("#comment", () => {
        const node = new XmlDocument({});
        assert.isTrue(node.element({name: "root"}) instanceof XmlElement);
        assert.isTrue(node.comment({charData: "abc"}) instanceof XmlComment);
        assert.isTrue(node.comment({charData: "def"}) instanceof XmlComment);
        assert.isTrue(node.comment({charData: "ghi"}) instanceof XmlComment);
        assert.strictEqual(node.toString(),
                           "<root/>\n<!--abc-->\n<!--def-->\n<!--ghi-->");
    });

    describe("#decl", () => {
        it("as first child", () => {
            let node = new XmlDocument({});
            assert.isTrue(node.decl({}) instanceof XmlDecl);
            assert.isTrue(node.element({name: "root"}) instanceof XmlElement);
            assert.strictEqual(
                node.toString(), "<?xml version='1.0'?>\n<root/>");

            node = new XmlDocument({});
            const declOptions = {
                encoding: "UTF-16",
                standalone: "yes",
                version: "1.1"
            };
            assert.isTrue(node.decl(declOptions) instanceof XmlDecl);
            assert.isTrue(node.element({name: "root"}) instanceof XmlElement);
            assert.strictEqual(
                node.toString(),
                "<?xml version='1.1' encoding='UTF-16' standalone='yes'?>"
                + "\n<root/>");
        });

        it("as not first child", () => {
            assert.throws(() => {
                const node = new XmlDocument({});
                assert.isTrue(
                    node.element({name: "root"}) instanceof XmlElement);
                assert.isTrue(node.decl({}) instanceof XmlDecl);
            });

            assert.doesNotThrow(() => {
                const node = new XmlDocument({validation: false});
                assert.isTrue(
                    node.element({name: "root"}) instanceof XmlElement);
                assert.isTrue(node.decl({}) instanceof XmlDecl);
            });
        });
    });

    describe("#dtd", () => {
        it("before root element", () => {
            let node = new XmlDocument({});
            assert.isTrue(
                node.comment({charData: "abc"}) instanceof XmlComment);
            assert.isTrue(node.dtd({name: "def"}) instanceof XmlDtd);
            assert.isTrue(node.element({name: "root"}) instanceof XmlElement);
            assert.strictEqual(
                node.toString(), "<!--abc-->\n<!DOCTYPE def>\n<root/>");

            node = new XmlDocument({});
            assert.isTrue(node.decl({}) instanceof XmlDecl);
            assert.isTrue(
                node.dtd({name: "abc", sysId: "def", pubId: "ghi"})
                instanceof XmlDtd);
            assert.isTrue(node.element({name: "root"}) instanceof XmlElement);
            assert.strictEqual(
                node.toString(),
                "<?xml version='1.0'?>"
                + "\n<!DOCTYPE abc PUBLIC 'ghi' 'def'>\n<root/>");
        });

        it("after root element", () => {
            assert.throws(() => {
                const node = new XmlDocument({});
                assert.isTrue(
                    node.element({name: "root"}) instanceof XmlElement);
                assert.isTrue(node.dtd({name: "def"}) instanceof XmlDtd);
            });

            assert.doesNotThrow(() => {
                const node = new XmlDocument({validation: false});
                assert.isTrue(
                    node.element({name: "root"}) instanceof XmlElement);
                assert.isTrue(node.dtd({name: "def"}) instanceof XmlDtd);
            });
        });
    });

    describe("#element", () => {
        it("single root element", () => {
            const node = new XmlDocument({});
            assert.isTrue(
                node.element({name: "root"}) instanceof XmlElement);
            assert.strictEqual(node.toString(), "<root/>");
        });

        it("multiple root elements", () => {
            assert.throws(() => {
                const node = new XmlDocument({});
                assert.isTrue(
                    node.element({name: "root"}) instanceof XmlElement);
                assert.isTrue(
                    node.element({name: "root2"}) instanceof XmlElement);
            });

            assert.doesNotThrow(() => {
                const node = new XmlDocument({validation: false});
                assert.isTrue(
                    node.element({name: "root"}) instanceof XmlElement);
                assert.isTrue(
                    node.element({name: "root2"}) instanceof XmlElement);
            });
        });
    });

    it("#procInst", () => {
        const node = new XmlDocument({});
        assert.isTrue(node.element({name: "root"}) instanceof XmlElement);
        assert.isTrue(node.procInst({target: "abc"}) instanceof XmlProcInst);
        assert.isTrue(node.procInst({target: "def", content: "ghi"})
                      instanceof XmlProcInst);
        assert.strictEqual(node.toString(),
                           "<root/>\n<?abc?>\n<?def ghi?>");
    });

    describe("#toString", () => {
        function getXmlDocument(): XmlDocument {
            const node = new XmlDocument({});
            node.decl({encoding: "UTF-16", standalone: "yes", version: "1.1"});
            // @formatter:off
            node.dtd({name: "stop"})
                .attlist({charData: "purpose type CDATA 'retire'"}).up()
                .comment({charData: "rely bite-sized magic"}).up()
                .element({charData: "noiseless EMPTY"}).up()
                .entity({charData: "protective 'multiply'"}).up()
                .notation({charData: "murky PUBLIC 'tested gratis'"}).up()
                .paramEntityRef({name: "giddy"}).up()
                .procInst({target: "pencil", content: "four design"}).up().up();
            // @formatter:on
            node.comment({charData: "reading sisters plate"});
            node.procInst({target: "birthday"});
            // @formatter:off
            node
                .element({name: "root"})
                    .attribute({name: "overt"})
                        .charRef({char: "v"}).up()
                        .entityRef({name: "repair"}).up()
                        .text({charData: "probable hospitable"}).up().up()
                    .attribute({name: "stage"})
                        .text({charData: ""}).up().up()
                    .attribute({name: "shop"}).up()
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
                        .charData({charData: "squeamish"});
            // @formatter:on
            node.procInst({target: "abstracted", content: "hungry bath"});
            node.comment({charData: "shoe"});

            return node;
        }

        it("no root element; default quotes; default pretty printing;"
           + " default indentation; default newline", () => {
            assert.throws(() => {
                const node = new XmlDocument({});
                node.decl({});
                node.dtd({name: "abc"});
                node.comment({charData: "def"});
                node.procInst({target: "ghi"});
                node.comment({charData: "jkl"});
                node.procInst({target: "mno"});
                node.toString();
            });

            assert.doesNotThrow(() => {
                const node = new XmlDocument({validation: false});
                node.decl({});
                node.dtd({name: "abc"});
                node.comment({charData: "def"});
                node.procInst({target: "ghi"});
                node.comment({charData: "jkl"});
                node.procInst({target: "mno"});
                assert.strictEqual(
                    node.toString(),
                    "<?xml version='1.0'?>\n<!DOCTYPE abc>\n"
                    + "<!--def-->\n<?ghi?>\n<!--jkl-->\n<?mno?>");
            });
        });

        it("root element and other children; default quotes; default pretty"
           + " printing; default indentation; default newline", () => {
            const node = getXmlDocument();
            assert.strictEqual(
                node.toString(),
                "<?xml version='1.1' encoding='UTF-16' standalone='yes'?>\n"
                + "<!DOCTYPE stop [\n    <!ATTLIST purpose type CDATA 'retire'>"
                + "\n    <!--rely bite-sized magic-->"
                + "\n    <!ELEMENT noiseless EMPTY>"
                + "\n    <!ENTITY protective 'multiply'>"
                + "\n    <!NOTATION murky PUBLIC 'tested gratis'>"
                + "\n    %giddy;\n    <?pencil four design?>\n]>"
                + "\n<!--reading sisters plate-->\n<?birthday?>"
                + "\n<root overt='&#118;&repair;probable hospitable'"
                + " stage='' shop=''>\n    <abacus>\n        <windows>"
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
                + "&tangible;squeamish</baseball>\n</root>"
                + "\n<?abstracted hungry bath?>\n<!--shoe-->");
        });

        it("root element and other children; single quotes; default pretty"
           + " printing; default indentation; default newline", () => {
            const node = getXmlDocument();
            assert.strictEqual(
                node.toString({doubleQuotes: false}),
                "<?xml version='1.1' encoding='UTF-16' standalone='yes'?>\n"
                + "<!DOCTYPE stop [\n    <!ATTLIST purpose type CDATA 'retire'>"
                + "\n    <!--rely bite-sized magic-->"
                + "\n    <!ELEMENT noiseless EMPTY>"
                + "\n    <!ENTITY protective 'multiply'>"
                + "\n    <!NOTATION murky PUBLIC 'tested gratis'>"
                + "\n    %giddy;\n    <?pencil four design?>\n]>"
                + "\n<!--reading sisters plate-->\n<?birthday?>"
                + "\n<root overt='&#118;&repair;probable hospitable'"
                + " stage='' shop=''>\n    <abacus>\n        <windows>"
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
                + "&tangible;squeamish</baseball>\n</root>"
                + "\n<?abstracted hungry bath?>\n<!--shoe-->");
        });

        it("root element and other children; double quotes; default pretty"
           + " printing; default indentation; default newline", () => {
            const node = getXmlDocument();
            /* tslint:disable:quotemark */
            assert.strictEqual(
                node.toString({doubleQuotes: true}),
                '<?xml version="1.1" encoding="UTF-16" standalone="yes"?>\n'
                + '<!DOCTYPE stop ['
                + '\n    <!ATTLIST purpose type CDATA \'retire\'>'
                + '\n    <!--rely bite-sized magic-->'
                + '\n    <!ELEMENT noiseless EMPTY>'
                + '\n    <!ENTITY protective \'multiply\'>'
                + '\n    <!NOTATION murky PUBLIC \'tested gratis\'>'
                + '\n    %giddy;\n    <?pencil four design?>\n]>'
                + '\n<!--reading sisters plate-->\n<?birthday?>'
                + '\n<root overt="&#118;&repair;probable hospitable"'
                + ' stage="" shop="">\n    <abacus>\n        <windows>'
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
                + '&tangible;squeamish</baseball>\n</root>'
                + '\n<?abstracted hungry bath?>\n<!--shoe-->');
            /* tslint:enable:quotemark */
        });

        it("root element and other children; default quotes; pretty"
           + " printing on; default indentation; default newline", () => {
            const node = getXmlDocument();
            assert.strictEqual(
                node.toString({pretty: true}),
                "<?xml version='1.1' encoding='UTF-16' standalone='yes'?>\n"
                + "<!DOCTYPE stop [\n    <!ATTLIST purpose type CDATA 'retire'>"
                + "\n    <!--rely bite-sized magic-->"
                + "\n    <!ELEMENT noiseless EMPTY>"
                + "\n    <!ENTITY protective 'multiply'>"
                + "\n    <!NOTATION murky PUBLIC 'tested gratis'>"
                + "\n    %giddy;\n    <?pencil four design?>\n]>"
                + "\n<!--reading sisters plate-->\n<?birthday?>"
                + "\n<root overt='&#118;&repair;probable hospitable'"
                + " stage='' shop=''>\n    <abacus>\n        <windows>"
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
                + "&tangible;squeamish</baseball>\n</root>"
                + "\n<?abstracted hungry bath?>\n<!--shoe-->");
        });

        it("root element and other children; default quotes; pretty"
           + " printing off; default indentation; default newline", () => {
            const node = getXmlDocument();
            assert.strictEqual(
                node.toString({pretty: false}),
                "<?xml version='1.1' encoding='UTF-16' standalone='yes'?>"
                + "<!DOCTYPE stop [<!ATTLIST purpose type CDATA 'retire'>"
                + "<!--rely bite-sized magic--><!ELEMENT noiseless EMPTY>"
                + "<!ENTITY protective 'multiply'><!NOTATION murky PUBLIC"
                + " 'tested gratis'>%giddy;<?pencil four design?>]>"
                + "<!--reading sisters plate--><?birthday?>"
                + "<root overt='&#118;&repair;probable hospitable'"
                + " stage='' shop=''><abacus><windows><fire>blue</fire>"
                + "<laughable>hateful</laughable><ring>terrific</ring>"
                + "</windows><plug><utter>wander</utter><toys>groan</toys>"
                + "</plug><powerful><coal>dear</coal><warm>impartial</warm>"
                + "<wink>twig</wink><secret>x</secret></powerful></abacus>"
                + "<plant><!--pin punch--><?arrogant sun rad?>&functional;"
                + "educated&#119;<thunder/><berserk/>route flaky&ragged;&#113;"
                + "<![CDATA[physical educated]]></plant>"
                + "<baseball>yawn&jagged;&#103;camp&#121;&tangible;squeamish"
                + "</baseball></root><?abstracted hungry bath?><!--shoe-->");
        });

        it("root element and other children; default quotes; default pretty"
           + " printing; indentation four spaces; default newline", () => {
            const node = getXmlDocument();
            assert.strictEqual(
                node.toString({indent: "    "}),
                "<?xml version='1.1' encoding='UTF-16' standalone='yes'?>\n"
                + "<!DOCTYPE stop [\n    <!ATTLIST purpose type CDATA 'retire'>"
                + "\n    <!--rely bite-sized magic-->"
                + "\n    <!ELEMENT noiseless EMPTY>"
                + "\n    <!ENTITY protective 'multiply'>"
                + "\n    <!NOTATION murky PUBLIC 'tested gratis'>"
                + "\n    %giddy;\n    <?pencil four design?>\n]>"
                + "\n<!--reading sisters plate-->\n<?birthday?>"
                + "\n<root overt='&#118;&repair;probable hospitable'"
                + " stage='' shop=''>\n    <abacus>\n        <windows>"
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
                + "&tangible;squeamish</baseball>\n</root>"
                + "\n<?abstracted hungry bath?>\n<!--shoe-->");
        });

        it("root element and other children; default quotes; default pretty"
           + " printing; indentation tabs; default newline", () => {
            const node = getXmlDocument();
            assert.strictEqual(
                node.toString({indent: "\t"}),
                "<?xml version='1.1' encoding='UTF-16' standalone='yes'?>\n"
                + "<!DOCTYPE stop [\n\t<!ATTLIST purpose type CDATA 'retire'>"
                + "\n\t<!--rely bite-sized magic-->"
                + "\n\t<!ELEMENT noiseless EMPTY>"
                + "\n\t<!ENTITY protective 'multiply'>"
                + "\n\t<!NOTATION murky PUBLIC 'tested gratis'>"
                + "\n\t%giddy;\n\t<?pencil four design?>\n]>"
                + "\n<!--reading sisters plate-->\n<?birthday?>"
                + "\n<root overt='&#118;&repair;probable hospitable'"
                + " stage='' shop=''>\n\t<abacus>\n\t\t<windows>"
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
                + "&tangible;squeamish</baseball>\n</root>"
                + "\n<?abstracted hungry bath?>\n<!--shoe-->");
        });

        it("root element and other children; default quotes; default pretty"
           + " printing; default indentation; \\n newline", () => {
            const node = getXmlDocument();
            assert.strictEqual(
                node.toString({newline: "\n"}),
                "<?xml version='1.1' encoding='UTF-16' standalone='yes'?>\n"
                + "<!DOCTYPE stop [\n    <!ATTLIST purpose type CDATA 'retire'>"
                + "\n    <!--rely bite-sized magic-->"
                + "\n    <!ELEMENT noiseless EMPTY>"
                + "\n    <!ENTITY protective 'multiply'>"
                + "\n    <!NOTATION murky PUBLIC 'tested gratis'>"
                + "\n    %giddy;\n    <?pencil four design?>\n]>"
                + "\n<!--reading sisters plate-->\n<?birthday?>"
                + "\n<root overt='&#118;&repair;probable hospitable'"
                + " stage='' shop=''>\n    <abacus>\n        <windows>"
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
                + "&tangible;squeamish</baseball>\n</root>"
                + "\n<?abstracted hungry bath?>\n<!--shoe-->");
        });

        it("root element and other children; default quotes; default pretty"
           + " printing; default indentation; \\r\\n newline", () => {
            const node = getXmlDocument();
            assert.strictEqual(
                node.toString({newline: "\r\n"}),
                "<?xml version='1.1' encoding='UTF-16' standalone='yes'?>\r\n"
                + "<!DOCTYPE stop ["
                + "\r\n    <!ATTLIST purpose type CDATA 'retire'>"
                + "\r\n    <!--rely bite-sized magic-->"
                + "\r\n    <!ELEMENT noiseless EMPTY>"
                + "\r\n    <!ENTITY protective 'multiply'>"
                + "\r\n    <!NOTATION murky PUBLIC 'tested gratis'>"
                + "\r\n    %giddy;\r\n    <?pencil four design?>\r\n]>"
                + "\r\n<!--reading sisters plate-->\r\n<?birthday?>"
                + "\r\n<root overt='&#118;&repair;probable hospitable'"
                + " stage='' shop=''>\r\n    <abacus>\r\n        <windows>"
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
                + "&tangible;squeamish</baseball>\r\n</root>"
                + "\r\n<?abstracted hungry bath?>\r\n<!--shoe-->");
        });
    });
});
