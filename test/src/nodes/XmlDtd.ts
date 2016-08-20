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

import {
    XmlComment,
    XmlDtd,
    XmlDtdAttlist,
    XmlDtdElement,
    XmlDtdEntity,
    XmlDtdNotation,
    XmlDtdParamEntityRef,
    XmlNode,
    XmlProcInst,
} from "../../../lib/main";
import {assert} from "chai";

describe("XmlDtd", () => {
    describe("#constructor", () => {
        it("should create an XmlDtd node with the specified name, sysId," +
            " and pubId", () => {
            let node = new XmlDtd("abc", "def", "ghi");
            assert.strictEqual(node.toString(), "<!DOCTYPE abc PUBLIC 'ghi'" +
                " 'def'>");

            node = new XmlDtd("abc", "def");
            assert.strictEqual(node.toString(), "<!DOCTYPE abc SYSTEM 'def'>");

            node = new XmlDtd("abc");
            assert.strictEqual(node.toString(), "<!DOCTYPE abc>");
        });
    });

    describe("#name", () => {
        it("should return this node's name", () => {
            let node = new XmlDtd("abc");
            assert.strictEqual(node.name, "abc");
        });

        it("should set this node's name to the specified value", () => {
            let node = new XmlDtd("abc");
            node.name = "def123";
            assert.strictEqual(node.name, "def123");
        });

        it("should throw an error if the specified value is not a" +
            " string", () => {
            let node = new XmlDtd("abc");
            assert.throws((): void => node.name = undefined);
            assert.throws((): void => node.name = null);
            assert.throws((): void => node.name = <any> 0);
            assert.throws((): void => node.name = <any> new XmlDtd("abc"));
        });

        it("should throw an error if the specified value contains characters" +
            " not allowed in XML names", () => {
            let node = new XmlDtd("abc");
            assert.throws(() => node.name = ".");
        });
    });

    describe("#pubId", () => {
        it("should return this node's pubId", () => {
            let node = new XmlDtd("abc", "def", "ghi");
            assert.strictEqual(node.pubId, "ghi");
        });

        it("should set this node's pubId to the specified value", () => {
            let node = new XmlDtd("abc", "def");
            node.pubId = "ghi";
            assert.strictEqual(node.pubId, "ghi");
            node.pubId = "azAz09-'()+,./:=?;!*#@$_% \r\n";
            assert.strictEqual(node.pubId, "azAz09-'()+,./:=?;!*#@$_% \r\n");
        });

        it("should throw an error if the specified value is not a" +
            " string or undefined", () => {
            let node = new XmlDtd("abc", "def");
            assert.throws((): void => node.pubId = null);
            assert.throws((): void => node.pubId = <any> 0);
            assert.throws((): void => node.pubId = <any> new XmlDtd("abc"));
        });

        it("should throw an error if the specified value contains characters" +
            " not allowed in public identifiers", () => {
            let node = new XmlDtd("abc", "def");
            assert.throws(() => node.pubId = "~");
            assert.throws(() => node.pubId = "~ab");
            assert.throws(() => node.pubId = "ab~");
            assert.throws(() => node.pubId = "a~b");
            assert.throws(() => node.pubId = "a~b~~ab~a");
        });

        it("should throw an error if the specified value is undefined when" +
            " sysId is undefined", () => {
            let node = new XmlDtd("abc");
            assert.throws(() => node.pubId = "def");
        });
    });

    describe("#sysId", () => {
        it("should return this node's sysId", () => {
            let node = new XmlDtd("abc", "def");
            assert.strictEqual(node.sysId, "def");
        });

        it("should set this node's sysId to the specified value", () => {
            let node = new XmlDtd("abc");
            node.sysId = "def";
            assert.strictEqual(node.sysId, "def");
        });

        it("should throw an error if the specified value is not a" +
            " string or undefined", () => {
            let node = new XmlDtd("abc");
            assert.throws((): void => node.sysId = null);
            assert.throws((): void => node.sysId = <any> 0);
            assert.throws((): void => node.sysId = <any> new XmlDtd("abc"));
        });

        it("should throw an error if the specified value contains characters" +
            " not allowed in system identifiers", () => {
            let node = new XmlDtd("abc");
            assert.throws(() => node.sysId = "abc" +
                String.fromCharCode(0x0001) + "def");
            assert.throws(() => node.sysId = "'\"");
            assert.throws(() => node.sysId = "abc'abc\"abc");
        });

        it("should throw an error if the specified value is undefined when" +
            " pubId is defined", () => {
            let node = new XmlDtd("abc", "def", "ghi");
            assert.throws((): void => node.sysId = undefined);
        });
    });

    describe("#attlist", () => {
        it("should add an XmlDtdAttlist node to this node's children at the" +
            " specified index with the specified text and return" +
            " the newly added node", () => {
            let node = new XmlDtd("abc");
            assert.isTrue(node.attlist("test") instanceof XmlDtdAttlist);
            assert.isTrue(node.attlist("test2", 0) instanceof XmlDtdAttlist);
            assert.isTrue(node.attlist("test3", 1) instanceof XmlDtdAttlist);
            assert.strictEqual(node.toString(), "<!DOCTYPE abc [\n" +
                "    <!ATTLIST test2>\n    <!ATTLIST test3>\n" +
                "    <!ATTLIST test>\n]>");
        });
    });

    describe("#comment", () => {
        it("should add an XmlComment node to this node's children at the" +
            " specified index with the specified text and return" +
            " the newly added node", () => {
            let node = new XmlDtd("abc");
            assert.isTrue(node.comment("test") instanceof XmlComment);
            assert.isTrue(node.comment("test2", 0) instanceof XmlComment);
            assert.isTrue(node.comment("test3", 1) instanceof XmlComment);
            assert.strictEqual(node.toString(), "<!DOCTYPE abc [\n" +
                "    <!--test2-->\n    <!--test3-->\n    <!--test-->\n]>");
        });
    });

    describe("#element", () => {
        it("should add an XmlDtdElement node to this node's children at the" +
            " specified index with the specified text and return" +
            " the newly added node", () => {
            let node = new XmlDtd("abc");
            assert.isTrue(node.element("test") instanceof XmlDtdElement);
            assert.isTrue(node.element("test2", 0) instanceof XmlDtdElement);
            assert.isTrue(node.element("test3", 1) instanceof XmlDtdElement);
            assert.strictEqual(node.toString(), "<!DOCTYPE abc [\n" +
                "    <!ELEMENT test2>\n    <!ELEMENT test3>\n" +
                "    <!ELEMENT test>\n]>");
        });
    });

    describe("#entity", () => {
        it("should add an XmlDtdEntity node to this node's children at the" +
            " specified index with the specified text and return" +
            " the newly added node", () => {
            let node = new XmlDtd("abc");
            assert.isTrue(node.entity("test") instanceof XmlDtdEntity);
            assert.isTrue(node.entity("test2", 0) instanceof XmlDtdEntity);
            assert.isTrue(node.entity("test3", 1) instanceof XmlDtdEntity);
            assert.strictEqual(node.toString(), "<!DOCTYPE abc [\n" +
                "    <!ENTITY test2>\n    <!ENTITY test3>\n" +
                "    <!ENTITY test>\n]>");
        });
    });

    describe("#insertChild", () => {
        it("should add the specified node to this node's children at the" +
            " specified index", () => {
            let commentNode = new XmlComment("comment");
            let attlistNode = new XmlDtdAttlist("attlist");
            let elementNode = new XmlDtdElement("element");
            let entityNode = new XmlDtdElement("entity");
            let notationNode = new XmlDtdNotation("notation");
            let paramEntityRefNode = new XmlDtdParamEntityRef("ref");
            let procInstNode = new XmlProcInst("target", "content");
            let node = new XmlDtd("abc");
            node.insertChild(commentNode);
            node.insertChild(procInstNode, 0);
            node.insertChild(attlistNode, 1);
            node.insertChild(elementNode, 2);
            node.insertChild(entityNode, 3);
            node.insertChild(notationNode, 4);
            node.insertChild(paramEntityRefNode, 5);
            assert.strictEqual(node.toString(),
                "<!DOCTYPE abc [\n    <?target content?>\n" +
                "    <!ATTLIST attlist>\n    <!ELEMENT element>\n" +
                "    <!ELEMENT entity>\n    <!NOTATION notation>\n" +
                "    %ref;\n    <!--comment-->\n]>");
        });

        it("should throw an error if the specified node is not an" +
            " XmlComment, XmlDecl, XmlDtd, or XmlProcInst node", () => {
            let node = new XmlDtd("abc");
            assert.throws(() => node.insertChild(new XmlNode()));
        });
    });

    describe("#notation", () => {
        it("should add an XmlDtdNotation node to this node's children at the" +
            " specified index with the specified text and return" +
            " the newly added node", () => {
            let node = new XmlDtd("abc");
            assert.isTrue(node.notation("test") instanceof XmlDtdNotation);
            assert.isTrue(node.notation("test2", 0) instanceof XmlDtdNotation);
            assert.isTrue(node.notation("test3", 1) instanceof XmlDtdNotation);
            assert.strictEqual(node.toString(), "<!DOCTYPE abc [\n" +
                "    <!NOTATION test2>\n    <!NOTATION test3>\n" +
                "    <!NOTATION test>\n]>");
        });
    });

    describe("#paramEntityRef", () => {
        it("should add an XmlDtdParamEntityRef node to this node's children" +
            " at the specified index with the specified text and" +
            " return the newly added node", () => {
            let node = new XmlDtd("abc");
            assert.isTrue(node.paramEntityRef("test") instanceof XmlDtdParamEntityRef);
            assert.isTrue(node.paramEntityRef("test2", 0) instanceof XmlDtdParamEntityRef);
            assert.isTrue(node.paramEntityRef("test3", 1) instanceof XmlDtdParamEntityRef);
            assert.strictEqual(node.toString(), "<!DOCTYPE abc [\n" +
                "    %test2;\n    %test3;\n    %test;\n]>");
        });
    });

    describe("#procInst", () => {
        it("should add an XmlProcInst node to this node's children" +
            " at the specified index with the specified text and" +
            " return the newly added node", () => {
            let node = new XmlDtd("abc");
            assert.isTrue(node.procInst("test", "a") instanceof XmlProcInst);
            assert.isTrue(node.procInst("test2", "b", 0) instanceof XmlProcInst);
            assert.isTrue(node.procInst("test3", "c", 1) instanceof XmlProcInst);
            assert.isTrue(node.procInst("test4") instanceof XmlProcInst);
            assert.isTrue(node.procInst("test5", undefined, 0) instanceof XmlProcInst);
            assert.strictEqual(node.toString(), "<!DOCTYPE abc [\n" +
                "    <?test5?>\n    <?test2 b?>\n    <?test3 c?>\n" +
                "    <?test a?>\n    <?test4?>\n]>");
        });
    });

    describe("#toString", () => {
        it("should return a string containing the XML string representation" +
            " for this node", () => {
            let node = new XmlDtd("abc");
            assert.strictEqual(node.toString(), "<!DOCTYPE abc>");

            node = new XmlDtd("abc");
            node.attlist("test1");
            node.comment("test2");
            node.element("test3");
            node.entity("test4");
            node.notation("test5");
            node.paramEntityRef("test6");
            node.procInst("test7", "test8");
            assert.strictEqual(node.toString(),
                "<!DOCTYPE abc [\n    <!ATTLIST test1>\n    <!--test2-->\n" +
                "    <!ELEMENT test3>\n    <!ENTITY test4>\n" +
                "    <!NOTATION test5>\n    %test6;\n    <?test7 test8?>\n]>");

            node = new XmlDtd("abc", "def");
            node.attlist("test1");
            node.comment("test2");
            node.element("test3");
            node.entity("test4");
            node.notation("test5");
            node.paramEntityRef("test6");
            node.procInst("test7", "test8");
            assert.strictEqual(node.toString(),
                "<!DOCTYPE abc SYSTEM \'def\' [\n    <!ATTLIST test1>\n" +
                "    <!--test2-->\n    <!ELEMENT test3>\n" +
                "    <!ENTITY test4>\n    <!NOTATION test5>\n" +
                "    %test6;\n    <?test7 test8?>\n]>");

            node = new XmlDtd("abc", "def", "ghi");
            node.attlist("test1");
            node.comment("test2");
            node.element("test3");
            node.entity("test4");
            node.notation("test5");
            node.paramEntityRef("test6");
            node.procInst("test7", "test8");
            assert.strictEqual(node.toString(),
                "<!DOCTYPE abc PUBLIC \'ghi\' \'def\' [\n" +
                "    <!ATTLIST test1>\n    <!--test2-->\n" +
                "    <!ELEMENT test3>\n    <!ENTITY test4>\n" +
                "    <!NOTATION test5>\n    %test6;\n    <?test7 test8?>\n]>");
        });

        it("should return a string that uses pretty printing depending on" +
            " the specified options", () => {
            let node = new XmlDtd("abc");
            node.attlist("test1");
            node.comment("test2");
            node.element("test3");
            node.entity("test4");
            node.notation("test5");
            node.paramEntityRef("test6");
            node.procInst("test7", "test8");
            assert.strictEqual(node.toString({pretty: false}),
                "<!DOCTYPE abc [<!ATTLIST test1><!--test2-->" +
                "<!ELEMENT test3><!ENTITY test4><!NOTATION test5>%test6;" +
                "<?test7 test8?>]>");
        });

        it("should return a string that uses a specific newline character" +
            " depending on the specified options", () => {
            let node = new XmlDtd("abc");
            node.attlist("test1");
            node.comment("test2");
            node.element("test3");
            node.entity("test4");
            node.notation("test5");
            node.paramEntityRef("test6");
            node.procInst("test7", "test8");
            assert.strictEqual(node.toString({newline: "\r\n"}),
                "<!DOCTYPE abc [\r\n    <!ATTLIST test1>\r\n" +
                "    <!--test2-->\r\n    <!ELEMENT test3>\r\n" +
                "    <!ENTITY test4>\r\n    <!NOTATION test5>\r\n" +
                "    %test6;\r\n    <?test7 test8?>\r\n]>");
        });

        it("should return a string that uses a specific indent character" +
            " depending on the specified options", () => {
            let node = new XmlDtd("abc");
            node.attlist("test1");
            node.comment("test2");
            node.element("test3");
            node.entity("test4");
            node.notation("test5");
            node.paramEntityRef("test6");
            node.procInst("test7", "test8");
            assert.strictEqual(node.toString({indent: "\t"}),
                "<!DOCTYPE abc [\n\t<!ATTLIST test1>\n\t<!--test2-->\n" +
                "\t<!ELEMENT test3>\n\t<!ENTITY test4>\n" +
                "\t<!NOTATION test5>\n\t%test6;\n\t<?test7 test8?>\n]>");
        });

        it("should return a string that uses a specified quotes" +
            " character depending on the specified options", () => {
            let node = new XmlDtd("abc", "def", "ghi");
            node.attlist("test1");
            node.comment("test2");
            node.element("test3");
            node.entity("test4");
            node.notation("test5");
            node.paramEntityRef("test6");
            node.procInst("test7", "test8");
            assert.strictEqual(node.toString({doubleQuotes: true}),
                "<!DOCTYPE abc PUBLIC \"ghi\" \"def\" [\n" +
                "    <!ATTLIST test1>\n    <!--test2-->\n" +
                "    <!ELEMENT test3>\n    <!ENTITY test4>\n" +
                "    <!NOTATION test5>\n    %test6;\n    <?test7 test8?>\n]>");
        });

        it("should throw an error if the sysId or pubId are inconsistent" +
            " with the quotes option", () => {
            let node = new XmlDtd("abc", "'def'", "'ghi'");
            assert.throws(() => node.toString());

            node = new XmlDtd("abc", "\"def\"", "ghi");
            assert.throws(() => node.toString({doubleQuotes: true}));

            node = new XmlDtd("abc", "\"def\"", "'ghi'");
            assert.throws(() => node.toString({doubleQuotes: false}));
            assert.throws(() => node.toString({doubleQuotes: true}));
        });
    });
});
