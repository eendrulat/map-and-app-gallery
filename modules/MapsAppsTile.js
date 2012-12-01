/** @license
 | Version 10.1.1
 | Copyright 2012 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
dojo.provide('local.modules.MapsAppsTile');

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare('local.modules.MapsAppsTile', [dijit._Widget, dijit._Templated],{
    id: "",
    titleLine: "title",
    author: "author",
    shortDesc: "description",
    readMoreOnClickHandler: "",
    tryItURL: "",
    thumbnailURL: "",

    baseClass: "mapsAppsTile",
    fullTitle: "",
    fullAuthor: "",

    postMixInProperties: function(){
        // Use the untrimmed titleLine for the hover title;
        this.title = this.fullTitle = this.titleLine;
        this.fullAuthor = this.author;

        // Trim some of the other content so that we stay within the gallery tiles
        this.titleLine = this._ellipsify(this.titleLine, 25);
        this.author = this._ellipsify(this.author, 25);
        this.shortDesc = this._ellipsify(this.shortDesc, 120);
    },

    templateString:
        "<span class='mapTileFrame mapTileSize columnPadRight columnPadBottom' data-dojo-type='dijit.layout.ContentPane'>" +
        "    <div class='mapTileSize sideColumnBkgd roundedPageItem absoluteContainer'>" +
        "        <div class='mapTileTitleBar titleBar'>" +
        "            <span class='mapTileTitle'>${titleLine}</span>" +
        "        </div>" +
        "        <div class='mapTileImageFrame shadow'>" +
        "            <a href='${tryItURL}' target='_blank' title='Try ${fullTitle}'>" +
        "            <img class='mapTileImage' src='${thumbnailURL}'></a>" +
        "        </div>" +
        "        <div title='By ${fullAuthor}' class='mapTileAuthor'>By: ${author}</div>" +
        "        <div class='mapTileSummary'>" +
        "            ${shortDesc}<br>" +
        "        </div>" +
        "        <div title='More information about ${fullTitle}' class='mapTileReadMore sideColumnBkgd' onclick='${readMoreOnClickHandler}(\"${id}\")'>" +
        "            Read more..." +
        "        </div>" +
        "    </div>" +
        "</span>",

    _ellipsify: function(original, maxLength) {
        // If string is within length restriction, simply return it
        if(!original || original.length < maxLength+1)
        {
            return original;
        }

        // Otherwise, try to trim it on a space boundary
        else if(" " == original[maxLength])
        {
            return original.substr(0, maxLength) + "...";
        }
        else
        {
            var iSpaceChar = original.lastIndexOf(" ", maxLength);
            if(0 <= iSpaceChar)
            {
                return original.substr(0, iSpaceChar) + "...";
            }
            else
            {
                // No space characters within length restriction, so just
                // cut the string
                return original.substr(0, maxLength) + "...";
            }
        }
    }
});
