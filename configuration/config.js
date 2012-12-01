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
dojo.provide("local.configuration.config");
dojo.declare("local.configuration.config", null, {
    // General configuration note: many of the configuration parts contain lists ("items" & "about"). You can add and remove entries
    // from these lists, but be sure that every entry ends with a comma except for the last one.

    // Gallery owner receives submissions and can place approved ones into the gallery group, which can be public or private.
    galleryOwner: "yourEsriGlobalID",
    galleryGroupId: "yourArcGIS.comGroupID",

    // Government name for News heading, license information, and unique name generation in submitted items
    govtDisplayName: "Naperville",  // Use null to get title from feed
    govtFormalName: "City of Naperville",
    govtInternalVariableName: "Naperville", // Alphanumeric only, beginning with letter

    // Tooltip and URL for clicking on government logo
    govtMainLabel: "Go to Naperville web site",
    govtMainLink: "http://www.naperville.il.us/index.aspx",

    // Banner
    mainTitle: "Maps and Apps",
    searchBoxPrompt: "Search Gallery",

    // Social media navigation on home page (maximum of 6 entries)
    socialNavigation: {
        label: "",
        items: [{
            name: "Email Naperville",
            link: "http://mygovhelp.com/NAPERVILLEIL/_cs/QuestionAskCI.aspx",
            icon: "graphics/email_26.jpg"
        }, {
            name: "Naperville on Facebook",
            link: "http://www.facebook.com/pages/Naperville/112317108784448",
            icon: "graphics/facebook_26.jpg"
        }, {
            name: "Naperville on Twitter",
            link: "http://twitter.com/NapervilleIL",
            icon: "graphics/twitter_26.jpg"
        }, {
            name: "Naperville on YouTube",
            link: "http://www.youtube.com/results?search_query=Naperville%2C+IL&aq=f",
            icon: "graphics/youtube_26.jpg"
        }, {
            name: "Naperville RSS feeds",
            link: "http://www.naperville.il.us/rssfeeds.aspx",
            icon: "graphics/rss_26.jpg"
        }]
    },

    // Social media navigation on item detail popup (maximum of 3 entries)
    itemSocialNavigation: {
        label: "",
        items: [{
            name: "Log into Facebook",
            link: "http://www.facebook.com/",
            icon: "graphics/facebook_26.jpg"
        }, {
            name: "Log into Twitter",
            link: "http://twitter.com/",
            icon: "graphics/twitter_26.jpg"
        }]
    },

    // Navigation on bottom left of page; use empty string in link to list the name without making it into a link
    leftFooterNavigation: {
        label: "",
        items: [{
            name: "Privacy/Legal",
            link: "http://www.naperville.il.us/dynamic_content.aspx?id=817#Privacy"
        }, {
            name: "Accessibility",
            link: "http://www.naperville.il.us/dsclinks.aspx"
        }, {
            name: "Feedback",
            link: "http://mygovhelp.com/NAPERVILLEIL/_cs/QuestionAsk.aspx"
        }, {
            name: "Site Map",
            link: "http://www.naperville.il.us/sitemap.aspx"
        }]
    },

    // Navigation on bottom right of page; use empty string in link to list the name without making it into a link
    rightFooterNavigation: {
        label: "Our Neighbors: ",
        items: [{
            name: "Aurora",
            link: "http://www.aurora-il.org/"
        }, {
            name: "Wheaton",
            link: "http://www.wheaton.il.us/"
        }, {
            name: "Downers Grove",
            link: "http://www.downers.us/"
        }, {
            name: "Plainfield",
            link: "http://www.plainfield-il.org/"
        }]
    },

    // What's new. Use either newsfeedlink and an RSS feed or a newsItems structure like this:
    //  newsItems: {
    //      items: [
    //          {title: "7-8-2011: Public Information Center app added"},
    //          {title: "7-1-2011: New app for finding parks for the 4th of July"},
    //          {title: "6-28-2011: We want your ideas for new apps"}
    //      ]
    //  },
    newsfeedLink: "http://www.naperville.il.us/News_rss.aspx",
    newsItems: null,

    // Gallery item classifications used in your ArcGIS.com items. Be sure NOT to have commas in these names.
    // If editing the item in ArcGIS.com, an item's classification and its average rating are stored in its Tags field as
    // <category>,<type>,<sum of ratings>,<number of ratings>
    appCategories: {
        identifier: "name",
        label: "name",
        items: [{
            name: "Community Activities"
        }, {
            name: "Elections & Voting"
        }, {
            name: "Water or Sewer & Transportation"
        }, {
            name: "Property Value & Taxes"
        }, {
            name: "Permits & Land Use"
        }, {
            name: "Recreation & Conservation"
        }]
    },

    appTypes: {
        identifier: "name",
        label: "name",
        items: [{
            name: "Web"
        }, {
            name: "Desktop"
        }, {
            name: "Mobile"
        }]
    },

    // About the site; use as many or as few paragraphs as you need; all but last one needs comma after right brace (})
    about: [{
        para: "The City of Naperville Maps and Apps Gallery is the place where you can find maps and apps that increase transparency and help you interact with your local government. The maps and apps are organized around city services and the information you need to do business with the City of Naperville on a daily basis."
    }, {
        para: "You’ll find maps and apps provided by the City Information Technology Department, Community Relations, Public Utilities, Fire, Police, Emergency Management, Public Works, and Transportation, Engineering and Development."
    }, {
        para: "The site will also highlight innovators and innovations that demonstrate a more collaborative and open government. If you have an application using City data not in our gallery, we would like to hear from you."
    }, {
        para: "This site is made possible by the City of Naperville GIS. The City of Naperville began developing its Geographic Information Systems (GIS) technology in 1994. GIS and related-technologies help city staff manage new development and changes in our infrastructure and natural environment."
    }, {
        para: "The maps and apps on this site are compatible with the following browsers: Mozilla Firefox 3.5+, Google Chrome 4+, Microsoft Internet Explorer 7+, and Apple Safari 3+."
    }],

    // Support; use empty strings to omit text, email, and/or phone
    supportContact: {
        text: "Please refer to the <a href='http://www.mygovhelp.com/napervilleil/_cs/FindAnswers.aspx' target='_blank'>FAQ</a> before contacting support. Additional questions should be directed to:",
        emailAddr: "mailto:support@naperville.gov",
        emailLabel: "support@naperville.gov",
        phone: "630-411-4070"
    },

    // Additional Contact Info; use empty strings to omit text, email, and/or phone
    additionalContact: {
        text: "Naperville Information Technology Department",
        emailAddr: "mailto:support@naperville.gov",
        emailLabel: "support@naperville.gov",
        phone: "630-411-4070"
    },

    // Display parameters
    displayRules: {
        // Delete or comment out line to turn off language feature; use empty string to get all of Google's languages.
        // Language codes are the ISO 639-1 two-letter codes (e.g., "es" for Spanish, "vi" for Vietnamese), except for Chinese, where simplified Chinese
        // is represented as "zh-CN" and traditional Chinese is represented as "zh-TW". For supported languages, see the web page
        // http://translate.google.com/support/. For language codes, see the web page http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
        alternateLanguages: "en,zh-CN,tl,fr,de,it,es,vi",
        // Use 'true' to show full banner image stretched and shrunk as needed to fill with width of the page; use 'false' for a wide banner image
        // that's chopped off on the right as needed to fill the width of the page
        bannerImageStretchesToFit: false
    },

    // Web map viewer preference. Use one of the following:
    //  "http://www.arcgis.com/home/webmap/viewer.html?webmap="
    //  "http://explorer.arcgis.com/?open="
    webmapViewerUrl: "http://www.arcgis.com/home/webmap/viewer.html?webmap=",

    // Number of seconds between displays of most recent items; minimum is 0.5 seconds
    mostRecentCycleInterval: 2

});
