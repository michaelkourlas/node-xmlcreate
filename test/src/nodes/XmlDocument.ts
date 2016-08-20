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
    XmlDecl,
    XmlDocument,
    XmlDtd,
    XmlElement,
    XmlNode,
    XmlProcInst,
} from "../../../lib/main";
import {assert} from "chai";

describe("XmlDocument", () => {
    describe("#constructor", () => {
        it("should create an XmlDocument node with the specified root" +
            " element name", () => {
            let node = new XmlDocument("abc");
            assert.strictEqual(node.toString(), "<abc/>");
        });
    });

    describe("#comment", () => {
        it("should add an XmlComment node to this node's children at the" +
            " specified index with the specified comment text and return" +
            " the newly added node", () => {
            let node = new XmlDocument("abc");
            assert.isTrue(node.comment("test") instanceof XmlComment);
            assert.isTrue(node.comment("test2", 0) instanceof XmlComment);
            assert.isTrue(node.comment("test3", 1) instanceof XmlComment);
            assert.strictEqual(node.toString(), "<!--test2-->\n" +
                "<!--test3-->\n<abc/>\n<!--test-->");
        });
    });

    describe("#decl", () => {
        it("should add an XmlDecl node to the beginning of this node's" +
            " children with the specified options and return the newly" +
            " added node", () => {
            let node = new XmlDocument("root");
            node.comment("test");
            assert.isTrue(node.decl({encoding: "UTF-8"}) instanceof XmlDecl);
            assert.strictEqual(node.toString(), "<?xml version='1.0'" +
                " encoding='UTF-8'?>\n<root/>\n<!--test-->");

            node = new XmlDocument("root");
            node.comment("test", 0);
            assert.isTrue(node.decl({standalone: "yes"}) instanceof XmlDecl);
            assert.strictEqual(node.toString(), "<?xml version='1.0'" +
                " standalone='yes'?>\n<!--test-->\n<root/>");

            node = new XmlDocument("root");
            assert.isTrue(node.decl({version: "1.1"}) instanceof XmlDecl);
            assert.strictEqual(node.toString(), "<?xml version='1.1'?>" +
                "\n<root/>");
        });
    });

    describe("#dtd", () => {
        it("should add an XmlDtd node to this node's children at the" +
            " specified index with the specified options and return the newly" +
            " added node", () => {
            let node = new XmlDocument("root");
            assert.isTrue(node.dtd("a", "b", "c", 0) instanceof XmlDtd);
            assert.strictEqual(node.toString(),
                "<!DOCTYPE a PUBLIC \'c\' \'b\'>\n<root/>");

            node = new XmlDocument("root");
            node.decl();
            assert.isTrue(node.dtd("d", "e", undefined, 1) instanceof XmlDtd);
            assert.strictEqual(node.toString(),
                "<?xml version='1.0'?>\n<!DOCTYPE d SYSTEM \'e\'>\n<root/>");

            node = new XmlDocument("root");
            node.comment("cmt", 0);
            node.comment("cmt2", 1);
            node.decl();
            assert.isTrue(node.dtd("d", "e", undefined, 2) instanceof XmlDtd);
            assert.strictEqual(node.toString(),
                "<?xml version='1.0'?>\n<!--cmt-->\n" +
                "<!DOCTYPE d SYSTEM \'e\'>\n<!--cmt2-->\n<root/>");
        });

        it("should add an XmlDtd node to this node's children immediately" +
            " after the XML declaration if one exists, or at the beginning" +
            " if one does not, with the specified options and return the" +
            " newly added node", () => {
            let node = new XmlDocument("root");
            assert.isTrue(node.dtd("a", "b", "c") instanceof XmlDtd);
            assert.strictEqual(node.toString(),
                "<!DOCTYPE a PUBLIC \'c\' \'b\'>\n<root/>");

            node = new XmlDocument("root");
            node.decl();
            assert.isTrue(node.dtd("d", "e") instanceof XmlDtd);
            assert.strictEqual(node.toString(),
                "<?xml version='1.0'?>\n<!DOCTYPE d SYSTEM \'e\'>\n<root/>");

            node = new XmlDocument("root");
            assert.isTrue(node.dtd("f") instanceof XmlDtd);
            assert.strictEqual(node.toString(),
                "<!DOCTYPE f>\n<root/>");
        });
    });

    describe("#insertChild", () => {
        it("should add the specified node to this node's children at the" +
            " specified index", () => {
            let commentNode = new XmlComment("comment");
            let declNode = new XmlDecl();
            let dtdNode = new XmlDtd("html");
            let procInstNode = new XmlProcInst("target", "content");
            let node = new XmlDocument("root");
            node.insertChild(commentNode);
            node.insertChild(declNode, 0);
            node.insertChild(dtdNode, 1);
            node.insertChild(procInstNode, 2);
            assert.strictEqual(node.toString(), "<?xml version=\'1.0\'?>\n" +
                "<!DOCTYPE html>\n<?target content?>\n<root/>\n<!--comment-->");
        });

        it("should throw an error if the specified node is not an" +
            " XmlComment, XmlDecl, XmlDtd, or XmlProcInst node", () => {
            let node = new XmlDocument("root");
            assert.throws(() => node.insertChild(new XmlNode()));
        });

        it("should throw an error if the specified node is an XmlComment or" +
            " XmlProcInst node being inserted before an existing XmlDecl" +
            " node in this node's children", () => {
            let node = new XmlDocument("root");
            node.decl();
            assert.throws(() => node.insertChild(new XmlComment("comment"), 0));
            assert.throws(() => node.insertChild(new XmlProcInst("target",
                "content"), 0));
        });

        it("should throw an error if the specified node is an XmlDecl node" +
            " but this node's children already contains an XmlDecl" +
            " node", () => {
            let node = new XmlDocument("root");
            node.decl();
            assert.throws(() => node.insertChild(new XmlDecl()));
        });

        it("should throw an error if the specified node is an XmlDecl node" +
            " and is not being inserted at the beginning of this node's" +
            " children", () => {
            let node = new XmlDocument("root");
            assert.throws(() => node.insertChild(new XmlDecl(), 1));
        });

        it("should throw an error if the specified node is an XmlDtd node" +
            " and is being inserted before an existing XmlDecl node in this" +
            " node's children", () => {
            let node = new XmlDocument("root");
            node.decl();
            assert.throws(() => node.insertChild(new XmlDtd("html"), 0));
        });

        it("should throw an error if the specified node is an XmlDtd node" +
            " and is being inserted after an existing XmlElement node in" +
            " this node's children", () => {
            let node = new XmlDocument("root");
            assert.throws(() => node.insertChild(new XmlDtd("html"), 1));
        });

        it("should throw an error if the specified node is an XmlDtd node" +
            " but this node's children already contains an XmlDtd node", () => {
            let node = new XmlDocument("root");
            node.dtd("html");
            assert.throws(() => node.insertChild(new XmlDtd("html")));
        });
    });

    describe("#procInst", () => {
        it("should add an XmlProcInst node to this node's children at the" +
            " specified index with the specified options and return the newly" +
            " added node", () => {
            let node = new XmlDocument("abc");
            assert.isTrue(node.procInst("test",
                    "test1") instanceof XmlProcInst);
            assert.isTrue(node.procInst("test2",
                    "test3", 0) instanceof XmlProcInst);
            assert.isTrue(node.procInst("test4",
                    "test5", 1) instanceof XmlProcInst);
            assert.strictEqual(node.toString(), "<?test2 test3?>\n" +
                "<?test4 test5?>\n<abc/>\n<?test test1?>");
        });
    });

    describe("#removeChild", () => {
        it("should throw an error if the specified node is an XmlElement" +
            " node", () => {
            let node = new XmlDocument("root");
            assert.throws(() => node.removeChild(node.root()));
        });

        it("should remove the specified node from this node", () => {
            let node = new XmlDocument("root");
            let commentNode = node.comment("cmt");
            assert.isTrue(node.removeChild(commentNode));
        });
    });

    describe("#removeChildAtIndex", () => {
        it("should throw an error if the node at the specified index is an" +
            " XmlElement node", () => {
            let node = new XmlDocument("root");
            assert.throws(() => node.removeChildAtIndex(0));
        });

        it("should remove the node at the specified index from this" +
            " node", () => {
            let node = new XmlDocument("root");
            let commentNode = node.comment("cmt");
            assert.strictEqual(node.removeChildAtIndex(1), commentNode);
        });
    });

    describe("#root", () => {
        it("should return the root element of this document", () => {
            let node = new XmlDocument("abc");
            assert.isTrue(node.root() instanceof XmlElement);
            assert.strictEqual((<XmlElement> node.root()).name, "abc");
        });
    });

    describe("#toString", () => {
        it("should return a string containing the XML string representation" +
            " for this node", () => {
            let node = new XmlDocument("abc");
            node.comment("comment1");
            node.comment("comment2", 0);
            node.decl({
                encoding: "UTF-8",
                standalone: "no",
                version: "1.1",
            });
            node.dtd("html", "a", "b");
            node.procInst("t", "c");
            assert.strictEqual(node.toString(), "<?xml version='1.1'" +
                " encoding='UTF-8' standalone='no'?>\n<!DOCTYPE html PUBLIC" +
                " 'b' 'a'>\n<!--comment2-->\n<abc/>\n<!--comment1-->\n<?t c?>");
        });

        it("should return a string that uses pretty printing depending on" +
            " the specified options", () => {
            let node = new XmlDocument("abc");
            node.comment("comment1");
            node.comment("comment2", 0);
            node.decl({
                encoding: "UTF-8",
                standalone: "no",
                version: "1.1",
            });
            node.dtd("html", "a", "b");
            node.procInst("t", "c");
            assert.strictEqual(node.toString({pretty: false}),
                "<?xml version='1.1' encoding='UTF-8' standalone='no'?>" +
                "<!DOCTYPE html PUBLIC 'b' 'a'><!--comment2--><abc/>" +
                "<!--comment1--><?t c?>");
        });

        it("should return a string that uses a specific newline character" +
            " depending on the specified options", () => {
            let node = new XmlDocument("abc");
            node.comment("comment1");
            node.comment("comment2", 0);
            node.decl({
                encoding: "UTF-8",
                standalone: "no",
                version: "1.1",
            });
            node.dtd("html", "a", "b");
            node.procInst("t", "c");
            assert.strictEqual(node.toString({newline: "\r\n"}),
                "<?xml version='1.1' encoding='UTF-8' standalone='no'?>\r\n" +
                "<!DOCTYPE html PUBLIC 'b' 'a'>\r\n<!--comment2-->\r\n" +
                "<abc/>\r\n<!--comment1-->\r\n<?t c?>");
        });
    });
});
