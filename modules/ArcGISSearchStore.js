/***
 * Adapted from "Mastering Dojo",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/rgdojo for more book information.
***/
dojo.provide("local.modules.ArcGISSearchStore");

dojo.require("dojo.data.util.simpleFetch");
dojo.require("dojo.io.script");

dojo.declare("local.modules.ArcGISSearchStore", null, {
    _groupId: "",
    _processedData: null,

    constructor: function(args){
        if (args)
        {
            if(args.groupId) this._groupId = args.groupId;
        }
    },

    // A reference to the store is kept in every item in the _S attribute. That
    // way, we catch errors with items being passed to us from different stores.
    _storeRef: "_S",

    getFeatures: function(){
        return {
            'dojo.data.api.Read': true
        };
    },

    getAttributes: function(item){
        // These are all the interesting properties
        return ["id", "uploaded", "title", "type", "description", "tags", "snippet", "thumbnail",
            "accessInformation", "url", "access", "numComments", "numRatings", "avgRating", "numViews"];
    },

     _processSearchData: function(data){
        // Default to empty store
        var items = [];
        if(data.results){
            items = data.results;

            //Add on the store ref so that isItem can work.
            var storeObject = this;
            dojo.forEach(items, function(item) {
                item[storeObject._storeRef] = storeObject;
                var imageFilename = item["thumbnail"];
                if(imageFilename) {
                    item["thumbnail"] = "http://www.arcgis.com/sharing/content/items/" + item["id"] + "/info/" + imageFilename;
                    var filenamePieces = imageFilename.split(".");
                    imageFilename = filenamePieces[0] + "_orig." + filenamePieces[1];
                    item["fullsize"] = "http://www.arcgis.com/sharing/content/items/" + item["id"] + "/info/" + imageFilename;
                } else {
                    item["thumbnail"] = null;
                    item["fullsize"] = null;
                }
            });
        }
        return items;
    },

    _fetchItems: function(request, fetchHandler, errorHandler){
        // storeObject is pulled into handler by closures.
        var storeObject = this;

        // Reuse the initial fetch if it exists
        if(null != storeObject._processedData)
        {
            fetchHandler(storeObject._processedData, request);
        }
        // Otherwise query the server
        else
        {
            // Post the query so that we can use a proxy
            dojo.xhrPost({
                url: "proxy.ashx?http://www.arcgis.com/sharing/search",
                postData:
                    "q=group:" + escape(storeObject._groupId) +
                    "&start=0&num=200&f=json",
                handleAs: "json",
                timeout: 40000,  // ms
                load: function(data) {
    	            // Process the items.  fetchHandler is a reference to
    	            // a function that simpleFetch passes here
                    storeObject._processedData = storeObject._processSearchData(data);
    	            fetchHandler(storeObject._processedData, request);
                },
                error: function(text) {
                    return text;
                }
            });
        }
    },

    // HTTP requests don't need closing
    close: function(request){ },

    isItem: function(item){
        return item && item[this._storeRef] === this;
    },

    // The following two functions are used for lazy-loading
    // data stores who fetch only the identifiers up front, then
    // fill in the rest as they're accessed.  ArcGISSearchStore does not
    // lazy-load, so these are trivial.
    isItemLoaded: function(item){
         return this.isItem(item);
    },

    loadItem: function(keywordArgs){ },

    getValues: function(item, attribute){
        //  summary:
        //      See dojo.data.api.Read.getValue()
        if(!this.isItem(item)){
            throw new Error("ArcGISSearchStore: invalid item");
        }
        if(typeof attribute !== "string"){
            throw new Error("ArcGISSearchStore: invalid attribute");
        }

        try {
            return [ item[attribute] ];
        } catch (e) {
            return [];
        }
    },

    getValue: function(item, attribute){
        // Basic read out of the items array
        var values = this.getValues(item, attribute);
        return values.length == 0 ? undefined : values[0];
    },

    hasAttribute: function(item, attribute){
        // We simply look up the attribute
        return this.getValues(item,attribute) > 0;
    },

    containsValue: function(item, attribute, value){
        var values = this.getValues(item,attribute);
        return dojo.some(values, function(thisValue) {
            return thisValue == value;
        });
    }

// End of the dojo.declare for ArcGISSearchStore
});

dojo.extend(
   local.modules.ArcGISSearchStore,
   dojo.data.util.simpleFetch
);
