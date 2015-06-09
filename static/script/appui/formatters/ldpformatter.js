/**
 * @preserve Copyright (c) 2013 British Broadcasting Corporation
 * (http://www.bbc.co.uk) and TAL Contributors (1)
 *
 * (1) TAL Contributors are listed in the AUTHORS file and at
 *     https://github.com/fmtvp/TAL/AUTHORS - please extend this file,
 *     not this notice.
 *
 * @license Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * All rights reserved
 * Please contact us for an alternative licence
 */

require.def("bobtv/appui/formatters/ldpformatter",
    [
        "antie/formatter",
        "antie/widgets/label",
        "antie/widgets/button",
        "antie/widgets/image"
    ],
    function(Formatter, Label, Button, Image) {
        return Formatter.extend({
            format : function (iterator) {
                //alert('in formatter', iterator);
                // for (var i = 0; i < iterator.length; i++) {
                //     iterator[i]
                // };
                //console.log(iterator);
                var button, item;
                item = iterator.next();
                button = new Button(item.label.toString());
                //console.log(JSON.stringify(item.label.toString()));
                button.appendChildWidget(new Image(item["@id"], item.image, { height: 200 }));
                button.appendChildWidget(new Label(item.label.toString()));
                //button.setDataItem(item["@id"]);
                // /console.log('HERE!', button.getDataItem());
                return button;

                // var button, item;
                // item = iterator.next();
                // button = new Button("fruit" + item.id);
                // button.appendChildWidget(new Image("img-item.id", item.img, { width : 200, height: 200}));
                // button.appendChildWidget(new Label(item.title));
                // return button;
            }
        });
    }
);