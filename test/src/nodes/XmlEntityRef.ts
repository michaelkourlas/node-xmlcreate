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
import XmlEntityRef from "../../../lib/nodes/XmlEntityRef";

describe("XmlEntityRef", () => {
    describe("#name", () => {
        it("get", () => {
            const node = new XmlEntityRef(undefined, true, {name: "abc"});
            assert.strictEqual(node.name, "abc");
        });

        it("set", () => {
            const node = new XmlEntityRef(undefined, true, {name: "abc"});
            node.name = "def";
            assert.strictEqual(node.name, "def");
        });
    });

    describe("#toString", () => {
        it("normal name", () => {
            assert.strictEqual(
                new XmlEntityRef(undefined, true, {
                    name: "abc",
                }).toString(),
                "&abc;"
            );
        });

        it("name with characters not allowed in XML names", () => {
            assert.throws(
                () =>
                    new XmlEntityRef(undefined, true, {
                        name: ".",
                    })
            );
            assert.doesNotThrow(
                () =>
                    new XmlEntityRef(undefined, false, {
                        name: ".",
                    })
            );
        });
    });

    it("#up", () => {
        assert.strictEqual(
            new XmlEntityRef(undefined, false, {
                name: "a",
            }).up(),
            undefined
        );
    });
});
