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
import XmlAttribute from "../../../lib/nodes/XmlAttribute";
import XmlAttributeText from "../../../lib/nodes/XmlAttributeText";
import XmlCharRef from "../../../lib/nodes/XmlCharRef";
import XmlElement from "../../../lib/nodes/XmlElement";
import XmlEntityRef from "../../../lib/nodes/XmlEntityRef";

describe("XmlAttribute", () => {
    it("#charRef", () => {
        const node = new XmlAttribute(undefined, true, {name: "abc"});
        assert.isTrue(
            node.charRef({char: "a", hex: true}) instanceof XmlCharRef
        );
        assert.isTrue(
            node.charRef({char: "b", hex: false}) instanceof XmlCharRef
        );
        assert.isTrue(
            node.charRef({char: "c", hex: false}) instanceof XmlCharRef
        );
        assert.isTrue(
            node.charRef({char: "d", hex: true}) instanceof XmlCharRef
        );
        assert.strictEqual(node.toString(), "abc='&#x61;&#98;&#99;&#x64;'");
    });

    it("#entityRef", () => {
        const node = new XmlAttribute(undefined, true, {name: "abc"});
        assert.isTrue(node.entityRef({name: "def"}) instanceof XmlEntityRef);
        assert.isTrue(node.entityRef({name: "ghi"}) instanceof XmlEntityRef);
        assert.isTrue(node.entityRef({name: "jkl"}) instanceof XmlEntityRef);
        assert.strictEqual(node.toString(), "abc='&def;&ghi;&jkl;'");
    });

    describe("#name", () => {
        it("get", () => {
            const node = new XmlAttribute(undefined, true, {name: "abc"});
            assert.strictEqual(node.name, "abc");
        });

        it("set", () => {
            const node = new XmlAttribute(undefined, true, {name: "abc"});
            node.name = "def";
            assert.strictEqual(node.name, "def");
        });
    });

    it("#text", () => {
        const node = new XmlAttribute(undefined, true, {name: "abc"});
        assert.isTrue(node.text({charData: "def"}) instanceof XmlAttributeText);
        assert.isTrue(node.text({charData: "ghi"}) instanceof XmlAttributeText);
        assert.isTrue(node.text({charData: "jkl"}) instanceof XmlAttributeText);
        assert.strictEqual(node.toString(), "abc='defghijkl'");
    });

    describe("#toString", () => {
        it(
            "normal name; default replace invalid chars; no children; default" +
                " quotes",
            () => {
                assert.strictEqual(
                    new XmlAttribute(undefined, true, {
                        name: "abc",
                    }).toString(),
                    "abc=''"
                );
            }
        );

        it(
            "name with characters not allowed in XML names; default replace" +
                " invalid chars; no children; default quotes",
            () => {
                assert.throws(
                    () =>
                        new XmlAttribute(undefined, true, {
                            name: ".",
                        })
                );
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlAttribute(undefined, false, {
                            name: ".",
                        }).toString(),
                        ".=''"
                    );
                });
            }
        );

        it(
            "name with characters not allowed in XML names; do not replace" +
                " invalid chars; no children; default quotes",
            () => {
                assert.throws(
                    () =>
                        new XmlAttribute(undefined, true, {
                            name: ".",
                            replaceInvalidCharsInName: false,
                        })
                );
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlAttribute(undefined, false, {
                            name: ".",
                            replaceInvalidCharsInName: false,
                        }).toString(),
                        ".=''"
                    );
                });
            }
        );

        it(
            "name with characters not allowed in XML names; replace invalid" +
                " chars; no children; default quotes",
            () => {
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlAttribute(undefined, true, {
                            name: ".",
                            replaceInvalidCharsInName: true,
                        }).toString(),
                        "\uFFFD=''"
                    );
                });
                assert.doesNotThrow(() => {
                    assert.strictEqual(
                        new XmlAttribute(undefined, false, {
                            name: ".",
                            replaceInvalidCharsInName: true,
                        }).toString(),
                        "\uFFFD=''"
                    );
                });
            }
        );

        it(
            "normal name; default replace invalid chars; children; default" +
                " quotes",
            () => {
                const node = new XmlAttribute(undefined, true, {name: "a"});
                node.text({charData: "bbb"});
                node.entityRef({name: "c"});
                node.charRef({char: "d"});
                node.charRef({char: "e"});
                node.entityRef({name: "fff"});
                node.text({charData: "g"});
                assert.strictEqual(
                    node.toString(),
                    "a='bbb&c;&#100;&#101;&fff;g'"
                );
            }
        );

        it(
            "normal name; default replace invalid chars; children; single" +
                " quotes",
            () => {
                const node = new XmlAttribute(undefined, true, {name: "abc"});
                node.text({charData: "bbb"});
                node.entityRef({name: "c"});
                node.charRef({char: "d"});
                node.charRef({char: "e"});
                node.entityRef({name: "fff"});
                node.text({charData: "g"});
                node.text({charData: "'hello'"});
                assert.strictEqual(
                    node.toString({doubleQuotes: false}),
                    "abc='bbb&c;&#100;&#101;&fff;g&apos;hello&apos;'"
                );
            }
        );

        it(
            "normal name; default replace invalid chars; children; double" +
                " quotes",
            () => {
                const node = new XmlAttribute(undefined, true, {name: "abc"});
                node.text({charData: "bbb"});
                node.entityRef({name: "c"});
                node.charRef({char: "d"});
                node.charRef({char: "e"});
                node.entityRef({name: "fff"});
                node.text({charData: "g"});
                node.text({charData: '"hello"'});
                assert.strictEqual(
                    node.toString({doubleQuotes: true}),
                    'abc="bbb&c;&#100;&#101;&fff;g&quot;hello&quot;"'
                );
            }
        );
    });

    it("#up", () => {
        const parent = new XmlElement(undefined, false, {name: "a"});
        const child = parent.attribute({name: "b"});
        assert.strictEqual(child.up(), parent);
    });
});
