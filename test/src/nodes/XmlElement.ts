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
    XmlAttribute,
    XmlCdata,
    XmlCharRef,
    XmlComment,
    XmlElement,
    XmlEntityRef,
    XmlNode,
    XmlProcInst,
    XmlText,
} from "../../../lib/main";
import {assert} from "chai";

describe("XmlElement", () => {
    describe("#constructor", () => {
        it("should create an XmlElement node with the specified name", () => {
            let node = new XmlElement("name");
            assert.strictEqual(node.toString(), "<name/>");
        });
    });

    describe("#name", () => {
        it("should return this node's name", () => {
            let node = new XmlElement("name");
            assert.strictEqual(node.name, "name");
        });

        it("should set this node's name to the specified value", () => {
            let node = new XmlElement("name");
            node.name = "name2";
            assert.strictEqual(node.name, "name2");
        });

        it("should throw an error if the specified value is not a" +
            " string", () => {
            let node = new XmlElement("name");
            assert.throws((): void => node.name = undefined);
            assert.throws((): void => node.name = null);
            assert.throws((): void => node.name = <any> 0);
            assert.throws((): void => node.name = <any> new XmlElement(""));
        });

        it("should throw an error if the specified value contains characters" +
            " not allowed in XML names", () => {
            let node = new XmlElement("name");
            assert.throws(() => node.name = ".");
        });
    });

    describe("#attribute", () => {
        it("should add an XmlAttribute node to this node's children at the" +
            " specified index with the specified text and return" +
            " the newly added node", () => {
            let node = new XmlElement("abc");
            assert.isTrue(node.attribute("test", "test1") instanceof XmlAttribute);
            assert.isTrue(node.attribute("test2", "test3", 0) instanceof XmlAttribute);
            assert.isTrue(node.attribute("test4", "test5", 1) instanceof XmlAttribute);
            assert.strictEqual(node.toString(), "<abc test2='test3'" +
                " test4='test5' test='test1'/>");
        });
    });

    describe("#attributes", () => {
        it("should return an array containing all of the children of this" +
            " node that are instances of XmlAttribute", () => {
            let node = new XmlElement("abc");
            let attributeNode = node.attribute("test1", "test2");
            node.comment("test3");
            node.comment("test4");
            let secondAttributeNode = node.attribute("test5", "test6");
            node.comment("test7");

            let attributes = node.attributes();
            assert.strictEqual(attributes.length, 2);
            assert.notStrictEqual(attributes.indexOf(attributeNode), -1);
            assert.notStrictEqual(attributes.indexOf(secondAttributeNode), -1);
        });
    });

    describe("#cdata", () => {
        it("should add an XmlCdata node to this node's children at the" +
            " specified index with the specified text and return" +
            " the newly added node", () => {
            let node = new XmlElement("abc");
            assert.isTrue(node.cdata("test") instanceof XmlCdata);
            assert.isTrue(node.cdata("test2", 0) instanceof XmlCdata);
            assert.isTrue(node.cdata("test3", 1) instanceof XmlCdata);
            assert.strictEqual(node.toString(), "<abc>\n" +
                "    <![CDATA[test2]]>\n    <![CDATA[test3]]>\n" +
                "    <![CDATA[test]]>\n</abc>");
        });
    });

    describe("#charRef", () => {
        it("should add an XmlCharRef node to this node's children at the" +
            " specified index with the specified char and hex" +
            " property and return the newly added node", () => {
            let node = new XmlElement("abc");
            assert.isTrue(node.charRef("a", true) instanceof XmlCharRef);
            assert.isTrue(node.charRef("b", false, 0) instanceof XmlCharRef);
            assert.strictEqual(node.toString(), "<abc>&#98;&#x61;</abc>");
        });
    });

    describe("#comment", () => {
        it("should add an XmlComment node to this node's children at the" +
            " specified index with the specified text and return" +
            " the newly added node", () => {
            let node = new XmlElement("abc");
            assert.isTrue(node.comment("test") instanceof XmlComment);
            assert.isTrue(node.comment("test2", 0) instanceof XmlComment);
            assert.isTrue(node.comment("test3", 1) instanceof XmlComment);
            assert.strictEqual(node.toString(), "<abc>\n" +
                "    <!--test2-->\n    <!--test3-->\n    <!--test-->\n</abc>");
        });
    });

    describe("#element", () => {
        it("should add an XmlElement node to this node's children at the" +
            " specified index with the specified text and return" +
            " the newly added node", () => {
            let node = new XmlElement("abc");
            assert.isTrue(node.element("test") instanceof XmlElement);
            assert.isTrue(node.element("test2", 0) instanceof XmlElement);
            assert.isTrue(node.element("test3", 1) instanceof XmlElement);
            assert.strictEqual(node.toString(), "<abc>\n    <test2/>\n" +
                "    <test3/>\n    <test/>\n</abc>");
        });
    });

    describe("#entityRef", () => {
        it("should add an XmlEntityRef node to this node's children at the" +
            " specified index with the specified entity name and return" +
            " the newly added node", () => {
            let node = new XmlElement("abc");
            assert.isTrue(node.entityRef("a") instanceof XmlEntityRef);
            assert.isTrue(node.entityRef("b", 0) instanceof XmlEntityRef);
            // noinspection CheckDtdRefs
            assert.strictEqual(node.toString(), "<abc>&b;&a;</abc>");
        });
    });

    describe("#insertChild", () => {
        it("should throw an error if the specified node is not an" +
            " XmlAttribute, XmlCdata, XmlCharRef, XmlComment," +
            " XmlElement, XmlEntityRef, XmlProcInst, or XmlText node", () => {
            let node = new XmlElement("name");
            assert.throws(() => node.insertChild(new XmlNode()));
        });

        it("should throw an error if the specified node is an XmlAttribute" +
            " node with the same name as an existing XmlAttribute node in" +
            " this node's children", () => {
            let node = new XmlElement("name");
            node.comment("test1");
            node.attribute("test2", "test3");
            node.comment("test4");
            assert.throws(() => node.insertChild(
                new XmlAttribute("test2", new XmlText("test5"))));
        });
    });

    describe("#procInst", () => {
        it("should add an XmlProcInst node to this node's children" +
            " at the specified index with the specified text and" +
            " return the newly added node", () => {
            let node = new XmlElement("abc");
            assert.isTrue(node.procInst("test", "a") instanceof XmlProcInst);
            assert.isTrue(node.procInst("test2", "b", 0) instanceof XmlProcInst);
            assert.isTrue(node.procInst("test3", "c", 1) instanceof XmlProcInst);
            assert.isTrue(node.procInst("test4") instanceof XmlProcInst);
            assert.isTrue(node.procInst("test5", undefined, 0) instanceof XmlProcInst);
            assert.strictEqual(node.toString(), "<abc>\n" +
                "    <?test5?>\n    <?test2 b?>\n    <?test3 c?>\n" +
                "    <?test a?>\n    <?test4?>\n</abc>");
        });
    });

    describe("#text", () => {
        it("should add an XmlText node to this node's children at the" +
            " specified index with the specified text and return the" +
            " newly added node", () => {
            let node = new XmlElement("name");
            assert.isTrue(node.text("a") instanceof XmlText);
            assert.isTrue(node.text("b", 0) instanceof XmlText);
            assert.strictEqual(node.toString(), "<name>ba</name>");
        });
    });

    describe("#toString", () => {
        it("should return a string containing the XML string representation" +
            " for this node", () => {
            let node = new XmlElement("test1");
            assert.strictEqual(node.toString(), "<test1/>");

            node = new XmlElement("test2");
            node.attribute("test3", "test4");
            node.attribute("test5", "test6");
            assert.strictEqual(node.toString(), "<test2 test3=\'test4\'" +
                " test5=\'test6\'/>");

            node = new XmlElement("test7");
            node.text("a");
            node.charRef("b");
            node.entityRef("c");
            // noinspection CheckDtdRefs
            assert.strictEqual(node.toString(), "<test7>a&#98;&c;</test7>");

            node = new XmlElement("test8");
            node.comment("a");
            node.charRef("b");
            node.entityRef("c");
            node.comment("d");
            node.text("e");
            node.comment("f");
            node.text("g");
            node.text("h");
            // noinspection CheckDtdRefs
            assert.strictEqual(node.toString(),
                "<test8>\n    <!--a-->\n    &#98;&c;\n    <!--d-->\n" +
                "    e\n    <!--f-->\n    gh\n</test8>");

            node = new XmlElement("test9");
            node.cdata("c");
            let subNode = node.element("test10");
            subNode.text("a");
            subNode.comment("b");
            let subSubNode = subNode.element("test11");
            subSubNode.text("d");
            subSubNode.text("e");
            subSubNode.attribute("k", "l");
            subNode.comment("f");
            node.procInst("g", "h");
            node.entityRef("i");
            node.charRef("j");
            // noinspection CheckDtdRefs
            assert.strictEqual(node.toString(),
                "<test9>\n    <![CDATA[c]]>\n    <test10>\n        a\n" +
                "        <!--b-->\n        <test11 k=\'l\'>de</test11>\n" +
                "        <!--f-->\n    </test10>\n    <?g h?>\n" +
                "    &i;&#106;\n</test9>");
        });

        it("should return a string that uses pretty printing depending on" +
            " the specified options", () => {
            let node = new XmlElement("test8");
            node.comment("a");
            node.charRef("b");
            node.entityRef("c");
            node.comment("d");
            node.text("e");
            node.comment("f");
            node.text("g");
            node.text("h");
            // noinspection CheckDtdRefs
            assert.strictEqual(node.toString({pretty: false}),
                "<test8><!--a-->&#98;&c;<!--d-->e<!--f-->gh</test8>");

            node = new XmlElement("test9");
            node.cdata("c");
            let subNode = node.element("test10");
            subNode.text("a");
            subNode.comment("b");
            let subSubNode = subNode.element("test11");
            subSubNode.text("d");
            subSubNode.text("e");
            subSubNode.attribute("k", "l");
            subNode.comment("f");
            node.procInst("g", "h");
            node.entityRef("i");
            node.charRef("j");
            // noinspection CheckDtdRefs
            assert.strictEqual(node.toString({pretty: false}),
                "<test9><![CDATA[c]]><test10>a<!--b--><test11 k=\'l\'>" +
                "de</test11><!--f--></test10><?g h?>&i;&#106;</test9>");
        });

        it("should return a string that uses a specific newline character" +
            " depending on the specified options", () => {
            let node = new XmlElement("test8");
            node.comment("a");
            node.charRef("b");
            node.entityRef("c");
            node.comment("d");
            node.text("e");
            node.comment("f");
            node.text("g");
            node.text("h");
            // noinspection CheckDtdRefs
            assert.strictEqual(node.toString({newline: "\r\n"}),
                "<test8>\r\n    <!--a-->\r\n    &#98;&c;\r\n    <!--d-->\r\n" +
                "    e\r\n    <!--f-->\r\n    gh\r\n</test8>");

            node = new XmlElement("test9");
            node.cdata("c");
            let subNode = node.element("test10");
            subNode.text("a");
            subNode.comment("b");
            let subSubNode = subNode.element("test11");
            subSubNode.text("d");
            subSubNode.text("e");
            subSubNode.attribute("k", "l");
            subNode.comment("f");
            node.procInst("g", "h");
            node.entityRef("i");
            node.charRef("j");
            // noinspection CheckDtdRefs
            assert.strictEqual(node.toString({newline: "\r\n"}),
                "<test9>\r\n    <![CDATA[c]]>\r\n    <test10>\r\n" +
                "        a\r\n        <!--b-->\r\n        <test11 k=\'l\'" +
                ">de</test11>\r\n        <!--f-->\r\n    </test10>\r\n" +
                "    <?g h?>\r\n    &i;&#106;\r\n</test9>");
        });

        it("should return a string that uses a specific indent character" +
            " depending on the specified options", () => {
            let node = new XmlElement("test8");
            node.comment("a");
            node.charRef("b");
            node.entityRef("c");
            node.comment("d");
            node.text("e");
            node.comment("f");
            node.text("g");
            node.text("h");
            // noinspection CheckDtdRefs
            assert.strictEqual(node.toString({indent: "\t"}),
                "<test8>\n\t<!--a-->\n\t&#98;&c;\n\t<!--d-->\n" +
                "\te\n\t<!--f-->\n\tgh\n</test8>");

            node = new XmlElement("test9");
            node.cdata("c");
            let subNode = node.element("test10");
            subNode.text("a");
            subNode.comment("b");
            let subSubNode = subNode.element("test11");
            subSubNode.text("d");
            subSubNode.text("e");
            subSubNode.attribute("k", "l");
            subNode.comment("f");
            node.procInst("g", "h");
            node.entityRef("i");
            node.charRef("j");
            // noinspection CheckDtdRefs
            assert.strictEqual(node.toString({indent: "\t"}),
                "<test9>\n\t<![CDATA[c]]>\n\t<test10>\n\t\ta\n" +
                "\t\t<!--b-->\n\t\t<test11 k=\'l\'>de</test11>\n" +
                "\t\t<!--f-->\n\t</test10>\n\t<?g h?>\n" +
                "\t&i;&#106;\n</test9>");
        });

        it("should return a string that uses single or double quotes for" +
            " attribute values depending on the specified options", () => {
            let node = new XmlElement("test2");
            node.attribute("test3", "test4");
            node.attribute("test5", "test6");
            assert.strictEqual(node.toString({doubleQuotes: true}),
                "<test2 test3=\"test4\" test5=\"test6\"/>");

            node = new XmlElement("test9");
            node.cdata("c");
            let subNode = node.element("test10");
            subNode.text("a");
            subNode.comment("b");
            let subSubNode = subNode.element("test11");
            subSubNode.text("d");
            subSubNode.text("e");
            subSubNode.attribute("k", "l");
            subNode.comment("f");
            node.procInst("g", "h");
            node.entityRef("i");
            node.charRef("j");
            // noinspection CheckDtdRefs
            assert.strictEqual(node.toString({doubleQuotes: true}),
                "<test9>\n    <![CDATA[c]]>\n    <test10>\n        a\n" +
                "        <!--b-->\n        <test11 k=\"l\">de</test11>\n" +
                "        <!--f-->\n    </test10>\n    <?g h?>\n" +
                "    &i;&#106;\n</test9>");
        });
    });
});
