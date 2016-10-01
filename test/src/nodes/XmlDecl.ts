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

import {XmlDecl} from "../../../lib/main";
import {assert} from "chai";

describe("XmlDecl", () => {
    describe("#constructor", () => {
        it("should create an XmlDecl node with the specified options", () => {
            let node = new XmlDecl({encoding: "UTF-8"});
            assert.strictEqual(node.toString(),
                               "<?xml version='1.0' encoding='UTF-8'?>");

            node = new XmlDecl({standalone: "yes"});
            assert.strictEqual(node.toString(),
                               "<?xml version='1.0' standalone='yes'?>");

            node = new XmlDecl({version: "1.1"});
            assert.strictEqual(node.toString(),
                               "<?xml version='1.1'?>");
        });
    });

    describe("#encoding", () => {
        it("should return this node's encoding", () => {
            let node = new XmlDecl({encoding: "UTF-16"});
            assert.strictEqual(node.encoding, "UTF-16");
        });

        it("should set this node's encoding to the specified value", () => {
            let node = new XmlDecl();
            node.encoding = "UTF-16";
            assert.strictEqual(node.encoding, "UTF-16");
            node.encoding = "u.-_16";
            assert.strictEqual(node.encoding, "u.-_16");
            node.encoding = undefined;
            assert.strictEqual(node.encoding, undefined);
        });

        it("should throw an error if the specified value is not a"
           + " string or undefined", () => {
            let node = new XmlDecl();
            assert.throws((): void => node.encoding = <any> null);
            assert.throws((): void => node.encoding = <any> 0);
            assert.throws((): void => node.encoding = <any> new XmlDecl());
        });

        it("should throw an error if the specified value contains characters"
           + " not allowed in XML encodings or is empty", () => {
            let node = new XmlDecl();
            assert.throws(() => node.encoding = "");
            assert.throws(() => node.encoding = "UTF-16$");
            assert.throws(() => node.encoding = "9UTF-16");
            assert.throws(() => node.encoding = "-UTF-16");
            assert.throws(() => node.encoding = "_UTF-16");
            assert.throws(() => node.encoding = ".UTF-16");
        });
    });

    describe("#standalone", () => {
        it("should return this node's standalone attribute", () => {
            let node = new XmlDecl({standalone: "yes"});
            assert.strictEqual(node.standalone, "yes");
        });

        it("should set this node's standalone attribute to the specified"
           + " value", () => {
            let node = new XmlDecl();
            node.standalone = "yes";
            assert.strictEqual(node.standalone, "yes");
            node.standalone = "no";
            assert.strictEqual(node.standalone, "no");
            node.standalone = undefined;
            assert.strictEqual(node.standalone, undefined);
        });

        it("should throw an error if the specified value is not a"
           + " string or undefined", () => {
            let node = new XmlDecl();
            assert.throws((): void => node.standalone = <any> null);
            assert.throws((): void => node.standalone = <any> 0);
            assert.throws((): void => node.standalone = <any> new XmlDecl());
        });

        it("should throw an error if the specified value contains characters"
           + " not allowed in the standalone attribute or is empty", () => {
            let node = new XmlDecl();
            assert.throws(() => node.standalone = "");
            assert.throws(() => node.standalone = "maybe");
        });
    });

    describe("#version", () => {
        it("should return this node's version", () => {
            let node = new XmlDecl({version: "1.0"});
            assert.strictEqual(node.version, "1.0");
        });

        it("should set this node's version to the specified value", () => {
            let node = new XmlDecl();
            node.version = "1.1";
            assert.strictEqual(node.version, "1.1");
            node.version = "1.789";
            assert.strictEqual(node.version, "1.789");
            node.version = "1.1234567890";
            assert.strictEqual(node.version, "1.1234567890");
        });

        it("should throw an error if the specified value is not a"
           + " string", () => {
            let node = new XmlDecl();
            assert.throws((): void => node.version = <any> undefined);
            assert.throws((): void => node.version = <any> null);
            assert.throws((): void => node.version = <any> 0);
            assert.throws((): void => node.version = <any> new XmlDecl());
        });

        it("should throw an error if the specified value contains characters"
           + " not allowed in the version attribute or is empty", () => {
            let node = new XmlDecl();
            assert.throws(() => node.version = "");
            assert.throws(() => node.version = "1");
            assert.throws(() => node.version = "1.");
            assert.throws(() => node.version = "1.2a");
            assert.throws(() => node.version = "2.0");
        });
    });

    describe("#children", () => {
        it("should throw an error", () => {
            let node = new XmlDecl();
            assert.throws(() => node.children());
        });
    });

    describe("#insertChild", () => {
        it("should throw an error", () => {
            let node = new XmlDecl();
            let childNode = new XmlDecl();
            assert.throws(() => node.insertChild(childNode));
        });
    });

    describe("#removeChild", () => {
        it("should throw an error", () => {
            let node = new XmlDecl();
            let childNode = new XmlDecl();
            assert.throws(() => node.removeChild(childNode));
        });
    });

    describe("#removeChildAtIndex", () => {
        it("should throw an error", () => {
            let node = new XmlDecl();
            assert.throws(() => node.removeChildAtIndex(0));
        });
    });

    describe("#toString", () => {
        it("should return a string containing the XML string representation"
           + " for this node", () => {
            let node = new XmlDecl({
                encoding: "UTF-8",
                standalone: "yes",
                version: "1.0"
            });
            assert.strictEqual(node.toString(),
                               "<?xml version='1.0' encoding='UTF-8'"
                               + " standalone='yes'?>");

            node = new XmlDecl({
                encoding: undefined,
                standalone: undefined,
                version: "1.1"
            });
            assert.strictEqual(node.toString(), "<?xml version='1.1'?>");
        });

        it("should return a string that uses single or double quotes for"
           + " attribute values depending on the specified options", () => {
            let node = new XmlDecl({
                encoding: "UTF-8",
                standalone: "yes"
            });
            assert.strictEqual(node.toString({doubleQuotes: false}),
                               "<?xml version='1.0' encoding='UTF-8'"
                               + " standalone='yes'?>");

            node = new XmlDecl({
                encoding: "UTF-8",
                standalone: "yes"
            });
            assert.strictEqual(node.toString({doubleQuotes: true}),
                               "<?xml version=\"1.0\" encoding=\"UTF-8\"" +
                               " standalone=\"yes\"?>");
        });
    });
});
