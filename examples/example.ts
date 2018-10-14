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

import {document} from "../lib/main";

const tree = document();
// @formatter:off
tree
    .decl({encoding: "UTF-8"}).up()
    .dtd({
             name: "html",
             pubId: "-//W3C//DTD XHTML 1.0 Strict//EN",
             sysId: "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
         }).up()
    .element({name: "html"})
        .attribute({name: "xmlns"})
            .text({charData: "http://www.w3.org/1999/xhtml"}).up().up()
        .attribute({name: "xml:lang"})
            .text({charData: "en"}).up().up()
        .element({name: "head"})
            .element({name: "title"})
                .charData({charData: "My page title"}).up().up().up()
        .element({name: "body"})
            .element({name: "h1"})
                .charData({charData: "Welcome!"}).up().up()
            .element({name: "p"})
                .charData({charData: "This is some text on my website."})
                .up().up()
            .element({name: "div"})
                .element({name: "img"})
                    .attribute({name: "src"})
                        .text({charData: "picture.png"}).up().up()
                    .attribute({name: "alt"})
                        .text({charData: "picture"})
                            .up().up().up().up().up().up();
// @formatter:on

// noinspection TsLint
console.log(tree.toString({doubleQuotes: true}));
