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
                    .attribute({name: "att"})
                        .text({charData: "text"}).up().up()
                    .element({name: "ele"})
                        .comment({charData: "cmt"}).up()
                        .element({name: "subele"})
                            .element({name: "subsubele"})
                                .charData({charData: "subsubelecd"}).up().up()
                            .element({name: "subsubele2"})
                                .charData({charData: "subsubelecd"})
                                    .up().up().up()
                        .procInst({target: "proc", content: "cont"}).up()
                        .entityRef({name: "ent"}).up().up()
                    .element({name: "ele2"})
                        .charData({charData: "cha"}).up()
                        .charRef({char: "c"}).up()
                        .cdata({charData: "cda"});
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
                + "\n<root att='text'>\n    <ele>\n        <!--cmt-->"
                + "\n        <subele>"
                + "\n            <subsubele>subsubelecd</subsubele>"
                + "\n            <subsubele2>subsubelecd</subsubele2>"
                + "\n        </subele>\n        <?proc cont?>\n        &ent;"
                + "\n    </ele>\n    <ele2>\n        cha&#99;"
                + "\n        <![CDATA[cda]]>\n    </ele2>\n</root>"
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
                + "\n<root att='text'>\n    <ele>\n        <!--cmt-->"
                + "\n        <subele>"
                + "\n            <subsubele>subsubelecd</subsubele>"
                + "\n            <subsubele2>subsubelecd</subsubele2>"
                + "\n        </subele>\n        <?proc cont?>\n        &ent;"
                + "\n    </ele>\n    <ele2>\n        cha&#99;"
                + "\n        <![CDATA[cda]]>\n    </ele2>\n</root>"
                + "\n<?abstracted hungry bath?>\n<!--shoe-->");
        });

        it("root element and other children; double quotes; default pretty"
           + " printing; default indentation; default newline", () => {
            const node = getXmlDocument();
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
                + '\n<root att="text">\n    <ele>\n        <!--cmt-->'
                + '\n        <subele>'
                + '\n            <subsubele>subsubelecd</subsubele>'
                + '\n            <subsubele2>subsubelecd</subsubele2>'
                + '\n        </subele>\n        <?proc cont?>\n        &ent;'
                + '\n    </ele>\n    <ele2>\n        cha&#99;'
                + '\n        <![CDATA[cda]]>\n    </ele2>\n</root>'
                + '\n<?abstracted hungry bath?>\n<!--shoe-->');
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
                + "\n<root att='text'>\n    <ele>\n        <!--cmt-->"
                + "\n        <subele>"
                + "\n            <subsubele>subsubelecd</subsubele>"
                + "\n            <subsubele2>subsubelecd</subsubele2>"
                + "\n        </subele>\n        <?proc cont?>\n        &ent;"
                + "\n    </ele>\n    <ele2>\n        cha&#99;"
                + "\n        <![CDATA[cda]]>\n    </ele2>\n</root>"
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
                + "<root att='text'><ele><!--cmt--><subele><subsubele>"
                + "subsubelecd</subsubele><subsubele2>subsubelecd</subsubele2>"
                + "</subele><?proc cont?>&ent;</ele><ele2>cha&#99;"
                + "<![CDATA[cda]]></ele2></root><?abstracted hungry bath?>"
                + "<!--shoe-->");
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
                + "\n<root att='text'>\n    <ele>\n        <!--cmt-->"
                + "\n        <subele>"
                + "\n            <subsubele>subsubelecd</subsubele>"
                + "\n            <subsubele2>subsubelecd</subsubele2>"
                + "\n        </subele>\n        <?proc cont?>\n        &ent;"
                + "\n    </ele>\n    <ele2>\n        cha&#99;"
                + "\n        <![CDATA[cda]]>\n    </ele2>\n</root>"
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
                + "\n<root att='text'>\n\t<ele>\n\t\t<!--cmt-->"
                + "\n\t\t<subele>"
                + "\n\t\t\t<subsubele>subsubelecd</subsubele>"
                + "\n\t\t\t<subsubele2>subsubelecd</subsubele2>"
                + "\n\t\t</subele>\n\t\t<?proc cont?>\n\t\t&ent;"
                + "\n\t</ele>\n\t<ele2>\n\t\tcha&#99;"
                + "\n\t\t<![CDATA[cda]]>\n\t</ele2>\n</root>"
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
                + "\n<root att='text'>\n    <ele>\n        <!--cmt-->"
                + "\n        <subele>"
                + "\n            <subsubele>subsubelecd</subsubele>"
                + "\n            <subsubele2>subsubelecd</subsubele2>"
                + "\n        </subele>\n        <?proc cont?>\n        &ent;"
                + "\n    </ele>\n    <ele2>\n        cha&#99;"
                + "\n        <![CDATA[cda]]>\n    </ele2>\n</root>"
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
                + "\r\n<root att='text'>\r\n    <ele>\r\n        <!--cmt-->"
                + "\r\n        <subele>"
                + "\r\n            <subsubele>subsubelecd</subsubele>"
                + "\r\n            <subsubele2>subsubelecd</subsubele2>"
                + "\r\n        </subele>\r\n        <?proc cont?>"
                + "\r\n        &ent;"
                + "\r\n    </ele>\r\n    <ele2>\r\n        cha&#99;"
                + "\r\n        <![CDATA[cda]]>\r\n    </ele2>\r\n</root>"
                + "\r\n<?abstracted hungry bath?>\r\n<!--shoe-->");
        });
    });
});
