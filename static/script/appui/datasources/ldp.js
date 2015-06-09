var Q = require('q'),
    http = require('http'),
    request = require('request');

module.exports = new function() {
    this.getTagConcepts = function(tag) {
        var deferred = Q.defer();
        var options = {
            url: 'http://data.bbc.co.uk/ldp/tag-concepts?api_key=rrnbeTUoajuHhTyUGE04msdolErjjrhm&search=' + tag,
            headers: {
                'Accept' : 'application/json-ld'
            },
        }
        request(options, function(error, response, body) {
          if(body && response.statusCode == 200) {
            deferred.resolve(body);
          }
        });
        return deferred.promise;
    }

    this.getVideosObjectsFromGuid = function(guid) {
        var deferred = Q.defer();
        var that = this;
        this.getCworksFromGuid(guid)
        .then(function(cworks) {
            if (cworks instanceof Object) {
                deferred.resolve(that.getAssetsFromCandy(cworks));
            } else {
                deferred.resolve('');
            }
        });
        return deferred.promise;
    }

    this.getCworksFromGuid = function(guid) {
        var deferred = Q.defer();
        var that = this;
        
        var options = {
            url: 'http://data.bbc.co.uk/ldp/creative-works-v2?api_key=rrnbeTUoajuHhTyUGE04msdolErjjrhm&about=' + guid +'&format=VideoFormat',
            headers: {
                'Accept' : 'application/json-ld'
            },
        }
        
        request(options, function(error, response, body) {
            var bodyObject = JSON.parse(body);
            if(bodyObject instanceof Object && response.statusCode == 200) {
                if (Object.keys(bodyObject).length > 0) {
                    deferred.resolve(bodyObject);
                } else {
                    deferred.resolve('');
                }
            } else {
                deferred.resolve('');
            }
        })

        return deferred.promise;
    }

    this.getCuries = function (cworks) {
        var curies = [];
        for (var i = 0; i < cworks.results.length; i++) {
            if (cworks.results[i].locator.constructor === Array && typeof cworks.results[i].locator.length != 'undefined') {
                for (var j = 0; j < cworks.results[i].locator.length; j++) {
                    var string = String;
                    string = cworks.results[i].locator[j];
                    if (string.match(/^urn:asset.*/)) {
                        curies.push(string.match(/asset.*/)[0]);
                    }
                };
            }
        };
        return curies;
    }

    this.getTagsForIds = function (cworks) {
        var tagsForIds = {};
        for (var i = 0; i < cworks.results.length; i++) {
            if (cworks.results[i].locator.constructor === Array && typeof cworks.results[i].locator.length != 'undefined') {
                for (var j = 0; j < cworks.results[i].locator.length; j++) {
                    var string = String;
                    string = cworks.results[i].locator[j];
                    if (string.match(/^urn:asset.*/)) {
                        var id = string.match(/asset.*/)[0];
                        tagsForIds[id.replace(":", "/")] = cworks.results[i].about;
                    }
                };
            }
        };
        return tagsForIds;
    }

    this.addTagsToCandyAssets = function(tagsForIds, candyAssets) {
        for (var i = 0; i < candyAssets.results.length; i++) {
            var key = candyAssets.results[i].id.match(/asset.*/);
            candyAssets.results[i].about = tagsForIds[key[0]];
        };
        return candyAssets;
    }

    this.getAssetsFromCandy = function(cworks) {
        var deferred = Q.defer();
        var that = this;
    
        var curies = this.getCuries(cworks);
        if (curies.length > 0) {
            var query_string = "curie=" + curies.join("&curie=");
            var options = {
                url: "http://data.bbc.co.uk/contentapiext/batch?api_key=rrnbeTUoajuHhTyUGE04msdolErjjrhm&"+query_string,
                headers: {
                    'Accept' : 'application/json',
                    'X-Candy-Audience' : 'Domestic',
                    'X-Candy-Platform' : 'Mobile'
                },
            }
            request(options, function(error, response, body) {
              if(body && response.statusCode == 200) {
                var tagsForIds = that.getTagsForIds(cworks);
                var candyAssets = JSON.parse(body);
                var joined = that.addTagsToCandyAssets(tagsForIds, candyAssets);
                deferred.resolve(joined);
              } else {
                deferred.resolve('');
              }
            });
        } else {
            deferred.resolve('');
        }
        return deferred.promise;
    }

    return this;
};
