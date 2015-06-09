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

require.def("bobtv/appui/datasources/ldpfeed",
    [
        "antie/class",
        "bower/q/q",
        "bower/jquery/dist/jquery"
    ],
    function(Class) {
        return Class.extend({
            // You will probably want to do something
            // more useful then returning static data.
            // An array of objects is expected.
            loadTrendingData : function(callbacks) {
                //var test = this.getTagConcepts('London');
                this.getTagConcepts()
                .then(function(results){
                    callbacks.onSuccess(results);
                })
            },
            loadStoriesById : function(callbacks, id) {
                //var test = this.getTagConcepts('London');
                this.getStoriesById(id)
                .then(function(results){
                    callbacks.onSuccess(results);
                })
// console.log("in load stories by id", id);
// callbacks.onSuccess(
                    // [
                    //     {
                    //         "id":"1",
                    //         "label":"Apple2",
                    //         "image" : "static/img/fruit/apple.png"
                    //     },
                    //     {
                    //         "id":"2",
                    //         "label":"Banana",
                    //         "image" : "static/img/fruit/banana.png"
                    //     },
                    //     {
                    //         "id":"3",
                    //         "label":"Grapes",
                    //         "image" : "static/img/fruit/grapes.png"
                    //     },
                    //     {
                    //         "id":"4",
                    //         "label":"Orange",
                    //         "image" : "static/img/fruit/orange.png"
                    //     },
                    //     {
                    //         "id":"5",
                    //         "label":"Peach",
                    //         "image" : "static/img/fruit/peach.png"
                    //     },
                    //     {
                    //         "id":"6",
                    //         "label":"Pear",
                    //         "image" : "static/img/fruit/pear.png"
                    //     }
                    // ]
                //     [{"@id":"http://www.bbc.co.uk/things/8cfac0f8-1123-47fe-9127-745031a75140#id","@type":["Thing","Event"],"metric:tagUsageCount":31,"domain:canonicalName":"Fifa corruption inquiries","disambiguationHint":"Investigation into 2018 and 2022 World Cups","label":"Fifa corruption inquiries","preferredLabel":"Fifa corruption inquiries","primaryTopicOf":"http://www.bbc.co.uk/news/world-europe-32895048","image":"http://news.bbcimg.co.uk/media/images/83280000/jpg/_83280992_hi027428380.jpg"},{"@id":"http://www.bbc.co.uk/things/13bba436-5d61-409b-82ec-2d2f4ecbe1e6#id","@type":["Thing","Event"],"metric:tagUsageCount":8,"domain:canonicalName":"Islamic State conflict","disambiguationHint":"Conflict and rise in support of IS in Iraq, Syria and globally","label":"Islamic State conflict","preferredLabel":"Islamic State conflict","image":"http://news.bbcimg.co.uk/media/images/83266000/jpg/_83266660_genmcmaster.jpg"},{"@id":"http://www.bbc.co.uk/things/c1400025-cfb7-43cd-8489-91786486f5e3#id","@type":["Thing","Event"],"metric:tagUsageCount":3,"domain:canonicalName":"Ukraine crisis","disambiguationHint":"The ongoing crisis in Ukraine which began on 21 November 2013","label":"Ukraine crisis","preferredLabel":"Ukraine crisis","sameAs":"http://dbpedia.org/resource/2014_Crimean_crisis","image":"http://news.bbcimg.co.uk/media/images/83271000/jpg/_83271236_83271234.jpg"},{"@id":"http://www.bbc.co.uk/things/23672ac3-fcad-42c7-a557-23a954eb0e7b#id","@type":["Thing","Event"],"metric:tagUsageCount":3,"domain:canonicalName":"Mediterranean migrant crisis","disambiguationHint":"Ongoing cases of migrants crossing the Mediterranean Sea to get to Europe","label":"Mediterranean migrant crisis","preferredLabel":"Mediterranean migrant crisis","primaryTopicOf":"http://www.bbc.co.uk/news/world-europe-32371348","image":"http://news.bbcimg.co.uk/media/images/83265000/jpg/_83265813_83263943.jpg"},{"@id":"http://www.bbc.co.uk/things/45d1e6e1-6001-4449-801d-ba85eed04025#id","@type":["Thing","Event"],"metric:tagUsageCount":3,"domain:canonicalName":"Syrian civil war","label":"Syrian civil war","preferredLabel":"Syrian civil war","sameAs":"http://dbpedia.org/resource/Syrian_Civil_War","image":"http://news.bbcimg.co.uk/media/images/83156000/jpg/_83156036_83149716.jpg"},{"@id":"http://www.bbc.co.uk/things/530d1350-d83c-405b-b6c3-809473e23c58#id","@type":["Thing","Event"],"metric:tagUsageCount":2,"domain:canonicalName":"US elections 2016","disambiguationHint":"8 November","label":"US elections 2016","preferredLabel":"US elections 2016","sameAs":["http://dbpedia.org/resource/United_States_presidential_election,_2016","http://www.wikidata.org/entity/Q47566"],"image":"http://news.bbcimg.co.uk/media/images/82763000/jpg/_82763697_82762213.jpg"},{"@id":"http://www.bbc.co.uk/things/af57eb83-4d07-42a1-85ee-4ddaf179ce8d#id","@type":["Thing","Event"],"metric:tagUsageCount":1,"domain:canonicalName":"Turner Prize 2014","disambiguationHint":"annual prize presented to a British visual artist under the age of 50","label":"Turner Prize 2014","preferredLabel":"Turner Prize 2014","image":"http://news.bbcimg.co.uk/media/images/79439000/jpg/_79439887_hi024946265.jpg"},{"@id":"http://www.bbc.co.uk/things/42454710-cc3c-44e1-8261-b4487525bf9c#id","@type":["Thing","Event"],"metric:tagUsageCount":1,"domain:canonicalName":"ISIS capture Mosul","disambiguationHint":"Islamist insurgents captured Iraq's second city of Mosul in June 2014","label":"ISIS capture Mosul","preferredLabel":"ISIS capture Mosul","image":"http://news.bbcimg.co.uk/media/images/83134000/jpg/_83134702_83134700.jpg"},{"@id":"http://www.bbc.co.uk/things/027ac66c-c913-4c73-a175-bae39e0b4d7d#id","@type":["Thing","Event"],"metric:tagUsageCount":1,"domain:canonicalName":"London mayor election 2016","disambiguationHint":"5 May ","label":"London mayor election 2016","preferredLabel":"London mayor election 2016","sameAs":"http://dbpedia.org/resource/London_mayoral_election,_2016","image":"http://news.bbcimg.co.uk/media/images/82982000/jpg/_82982711_dianne.jpg"},{"@id":"http://www.bbc.co.uk/things/31b0b51b-1997-443f-96ce-1c82fee04006#id","@type":["Thing","Event"],"metric:tagUsageCount":1,"domain:canonicalName":"Asia migrant crisis","disambiguationHint":"Migration of Rohingya muslims from Myanmar across countries south east asia, can include Australia asylum stories involving refugees from other parts of the world","label":"Asia migrant crisis","preferredLabel":"Asia migrant crisis","image":"http://news.bbcimg.co.uk/media/images/83209000/jpg/_83209140_malaysia.jpg"},{"@id":"http://www.bbc.co.uk/things/f43a4147-76f2-4e31-80db-2c97307a796d#id","@type":["pol:Election","Thing","Event"],"metric:tagUsageCount":1,"domain:canonicalName":"Election 2015","disambiguationHint":"UK general election, May 2015.","label":"Election 2015","preferredLabel":"Election 2015","image":"http://news.bbcimg.co.uk/media/images/83130000/jpg/_83130212_83130210.jpg"},{"@id":"http://www.bbc.co.uk/things/1c4d272b-7673-4c05-884d-9e504354777e#id","@type":["Thing","Event"],"metric:tagUsageCount":1,"domain:canonicalName":"Edinburgh Festival Fringe","disambiguationHint":"World's largest arts festival held in Edinburgh, Scotland.","label":"Edinburgh Festival Fringe","preferredLabel":"Edinburgh Festival Fringe","image":"http://news.bbcimg.co.uk/media/images/77173000/jpg/_77173139_gamarjobat.jpg"},{"@id":"http://www.bbc.co.uk/things/e90e8e1d-ab7d-43ec-aa5c-b8de17ead6e2#id","@type":["Thing","Event"],"metric:tagUsageCount":1,"domain:canonicalName":"Greece debt deal","disambiguationHint":"Ongoing Greek debt crisis","label":"Greece debt deal","preferredLabel":"Greece debt deal","primaryTopicOf":"http://www.bbc.co.uk/news/business-31545115","image":"http://news.bbcimg.co.uk/media/images/83195000/jpg/_83195352_83195350.jpg"},{"@id":"http://www.bbc.co.uk/things/e039408a-6592-4098-8316-505b41cf4d01#id","@type":["Thing","Event"],"metric:tagUsageCount":1,"domain:canonicalName":"Hillsborough disaster","label":"Hillsborough disaster","preferredLabel":"Hillsborough disaster","sameAs":"http://dbpedia.org/resource/Hillsborough_disaster","image":"http://news.bbcimg.co.uk/media/images/82719000/jpg/_82719592_82719590.jpg"},{"@id":"http://www.bbc.co.uk/things/43f93481-f582-4f30-9228-2f6f1268a1cb#id","@type":["Thing","Event"],"metric:tagUsageCount":1,"domain:canonicalName":"Arab Uprisings","disambiguationHint":"Revolutionary wave of demonstrations and protests, riots, and civil wars in the Arab world that began on 18 December 2010.","label":"Arab Uprisings","preferredLabel":"Arab Uprisings","image":"http://news.bbcimg.co.uk/media/images/83038000/jpg/_83038961_83038959.jpg"},{"@id":"http://www.bbc.co.uk/things/ae2fa419-0a11-449d-8dd5-32c40b26957a#id","@type":["Thing","Event"],"metric:tagUsageCount":1,"domain:canonicalName":"Gaza conflict","disambiguationHint":"the Israel Defense Forces (IDF) launched an offensive in the Palestinian Gaza Strip on 8 July 2014. The operation is known as Operation Protective Edge and follows an escalation between Israel and Hamas","label":"Gaza conflict","preferredLabel":"Gaza conflict","image":"http://news.bbcimg.co.uk/media/images/81751000/jpg/_81751182_81751181.jpg"},{"@id":"http://www.bbc.co.uk/things/47b781c7-0152-4a0a-9845-46d3ef307484#id","@type":["Thing","Event"],"metric:tagUsageCount":1,"domain:canonicalName":"Nepal earthquakes","disambiguationHint":"Two earthquakes - magnitude 7.8 and 7.3 respectively - which hit Nepal on 25 April and 12 May 2015","label":"Nepal earthquakes","preferredLabel":"Nepal earthquakes","primaryTopicOf":["http://m.bbc.co.uk/news/world-asia-32701385","http://www.bbc.co.uk/news/world-asia-32461019"],"sameAs":"http://www.wikidata.org/entity/Q19830062","image":"http://news.bbcimg.co.uk/media/images/83208000/jpg/_83208948_83208944.jpg"},{"@id":"http://www.bbc.co.uk/things/305ee244-8b7f-44c5-9895-fccdedc6e359#id","@type":["Thing","Event"],"metric:tagUsageCount":1,"domain:canonicalName":"Labour leadership","disambiguationHint":"Search for new Labour Party leader after Ed Miliband stood down in the wake of the May 2015 general election","label":"Labour leadership","preferredLabel":"Labour leadership","primaryTopicOf":"http://www.bbc.co.uk/news/uk-politics-32654262","image":"http://news.bbcimg.co.uk/media/images/83242000/jpg/_83242278_83241685.jpg"},{"@id":"http://www.bbc.co.uk/things/6f7ad8c2-e708-4fd3-a516-5f33623dfbd5#id","@type":["Thing","Event"],"metric:tagUsageCount":1,"domain:canonicalName":"Missing Syria girls","disambiguationHint":"Three UK schoolgirls - Shamima Begum and Amira Abase, both 15, and Kadiza Sultana, 16 - missing from London since 17 February and said to be in Syria","label":"Missing Syria girls","preferredLabel":"Missing Syria girls","primaryTopicOf":"http://bbc.co.uk/news/uk-31568241","image":"http://news.bbcimg.co.uk/media/images/82021000/jpg/_82021574_82021539.jpg"},{"@id":"http://www.bbc.co.uk/things/2e1db902-cbd5-4bac-83f5-ab2960fc6815#id","@type":["Thing","Event"],"metric:tagUsageCount":1,"domain:canonicalName":"Eurovision 2015","disambiguationHint":"20 May 2015","label":"Eurovision 2015","preferredLabel":"Eurovision 2015","sameAs":"http://dbpedia.org/resource/Eurovision_Song_Contest","image":"http://news.bbcimg.co.uk/media/images/83195000/jpg/_83195161_83194439.jpg"}]
                // );
                //console.log(test);
            },
            getTagConcepts : function() {
                var deferred = Q.defer();
                $.getJSON("http://localhost:3000/ldpTrending?callback=?", function(result){
                    deferred.resolve(result);
                });
                return deferred.promise;
            },
            getStoriesById : function(id) {
                var deferred = Q.defer();
                console.log("http://localhost:3000/stories?callback=?&id="+encodeURIComponent(id));
                $.getJSON("http://localhost:3000/stories?callback=?&id="+encodeURIComponent(id), function(result){
                    deferred.resolve(result);
                });
                return deferred.promise;
            }
        });
    });