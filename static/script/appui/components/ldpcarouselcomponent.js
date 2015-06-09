require.def("bobtv/appui/components/ldpcarouselcomponent",
    [
        "antie/widgets/component",
        "antie/datasource",
        "antie/widgets/label",
        "antie/widgets/carousel",
        "antie/widgets/carousel/binder",
        "antie/widgets/carousel/keyhandlers/activatefirsthandler",
        "antie/widgets/carousel/strips/wrappingstrip",
        "antie/widgets/carousel/navigators/wrappingnavigator",
        "antie/widgets/carousel/strips/cullingstrip",
        "antie/widgets/carousel/strips/hidingstrip",
        "bobtv/appui/formatters/storyformatter",
        "bobtv/appui/datasources/ldpfeed"
    ],
    function (
        Component,
        DataSource,
        Label,
        Carousel,
        Binder,
        ActivateFirstHandler,
        WrappingStrip,
        WrappingNavigator,
        CullingStrip,
        HidingStrip,
        StoryFormatter,
        LdpFeed
        ) {
        'use strict';

        function evtBind(self, functionName) {
            return function (evt) {
                self[functionName].call(self, evt);
            };
        }

        var CarouselComponent;
        CarouselComponent = Component.extend({
            init: function () {
                this._super('carouselComponent');
                this._addComponentListeners();
                this._description = new Label();
                this._description.addClass('description');
                this.appendChildWidget(this._description);
            },

            onBeforeShow: function (evt) {
                this._initialItem = evt.args.initialItem || 0;
                this._dontShowYet(evt);
                this.setDescription(evt.args.description || "");
                this._createCarousel(evt.args);
                this.appendChildWidget(this._carousel);
                this._addCarouselListeners();
                this._setCarouselAlignPoints(evt);
                this._saveCarouselLengths(evt);
                this._startCarouselDataBinding(evt);
            },

            onAfterHide: function (evt) {
                this._tearDownCarousel();
                this.removeChildWidget(this._carousel);
                this._carousel = null;
            },

            onSelect: function (evt) {
                //console.log(evt.target._childWidgetOrder[0].outputElement.nextElementSibling.childNodes[0].data);
                var title = evt.target._childWidgetOrder[0].outputElement.nextElementSibling.childNodes[0].data;
                var config = this._getCarouselConfigStory(evt.target._childWidgetOrder[0].id, title);
                this._createCarousel(config);
                //this._super('carouselComponentSub');
                
                evt.target.parentWidget.parentWidget.parentWidget.parentWidget.getCurrentApplication().pushComponent(
                        "maincontainer",
                        "bobtv/appui/components/storycarouselcomponent",
                        config
                    );
                this.hide();
                //this.init();
                //console.log(evt.);
                //this._goBack();
                // self.parentWidget.getCurrentApplication().pushComponent(
                //         "maincontainer",
                //         "sampleapp/appui/components/carouselcomponent",
                //         self._getCarouselConfig()
                //     );
                
            },

            onDataBound: function (evt) {
                // In practice you might set widget lengths from data source rather then component args
                // and do it during a bind per widget (on append), however if you're doing it in a block
                // this is where it needs to happen (post bind, pre align)
                if (this._lengths) {
                    this._carousel.setWidgetLengths(this._lengths);
                }
                // tell wrapping strips to generate clones now binding is finished
                this._carousel.recalculate();
                // could set initial/aligned item from data source
                this._setCarouselAlignedAndActiveItems(this._initialItem, this._initialItem);
                this.show({});
            },

            setDescription: function (titleText) {
                this._description.setText(titleText);
            },

            getCurrentState: function() {
                console.log("I CALLED GET CURRENT STATE IN LDP CAROUSEL");
                return this.getCurrentApplication().getFocussedWidget();
            },

            _addComponentListeners: function () {
                var componentEventListenerMap;
                componentEventListenerMap = {
                    'beforeshow': evtBind(this, 'onBeforeShow'),
                    'afterhide': evtBind(this, 'onAfterHide'),
                    'select': evtBind(this, 'onSelect')
                };
                this._addListenersTo(this, componentEventListenerMap);
            },

            _dontShowYet: function (showEvt) {
                showEvt.preventDefault();
            },

            _createCarousel: function (args) {
                this._carousel = new Carousel(args.carouselId, args.orientation);
                this._setCarouselNavigatorAndWidgetStrip(args);

                this._attachCarouselHandler(args.animOptions);
            },

            _setCarouselNavigatorAndWidgetStrip: function (args) {
                switch (args.type) {
                case "WRAPPING":
                    this._carousel.setWidgetStrip(WrappingStrip);
                    this._carousel.setNavigator(WrappingNavigator);
                    break;
                case "CULLING":
                    this._carousel.setWidgetStrip(CullingStrip);
                    break;
                case "HIDING":
                    this._carousel.setWidgetStrip(HidingStrip);
                    break;
                }
            },

            _attachCarouselHandler: function (animOptions) {
                var handler;
                handler = new ActivateFirstHandler();
                handler.setAnimationOptions(animOptions);
                handler.attach(this._carousel);
            },

            _addCarouselListeners: function () {
                this._addListenersTo(this._carousel, this._getCarouselListenerMap());
            },

            _getCarouselListenerMap: function () {
                this._carouselListenerMap = this._carouselListenerMap || {
                    'databound': evtBind(this, 'onDataBound')
                };
                return this._carouselListenerMap;
            },

            _addListenersTo: function (target, listenerMap) {
                this._modifyListenersOn(target, listenerMap, true);
            },

            _modifyListenersOn: function (target, listenerMap, add) {
                var eventName, modifyFunction;
                modifyFunction = add ? target.addEventListener : target.removeEventListener;
                for (eventName in listenerMap) {
                    if (listenerMap.hasOwnProperty(eventName)) {
                        modifyFunction.call(target, eventName, listenerMap[eventName]);
                    }
                }
            },

            _setCarouselAlignPoints: function (evt) {
                if (evt.args && evt.args.alignment) {
                    var alignPoint = evt.args.alignment.alignPoint;
                    var normalisedAlignPoint = evt.args.alignment.normalisedAlignPoint;
                    var normalisedWidgetAlignPoint = evt.args.alignment.normalisedWidgetAlignPoint;
                    if (normalisedAlignPoint) {
                        this._carousel.setNormalisedAlignPoint(normalisedAlignPoint);
                    }
                    if (normalisedWidgetAlignPoint) {
                        this._carousel.setNormalisedWidgetAlignPoint(normalisedWidgetAlignPoint);
                    }
                    if (alignPoint) {
                        this._carousel.setAlignPoint(alignPoint);
                    }
                }
            },

            _saveCarouselLengths: function (evt) {
                this._lengths = evt.args.lengths;
            },

            _startCarouselDataBinding: function (evt) {
                var dataSource, formatter, binder;
                // disabling auto calc is to prevent wrapping strips from
                // creating clones multiple times during a large data bind
                this._carousel.autoCalculate(false);
                dataSource = evt.args.dataSource;
                formatter = evt.args.formatter;
                binder = new Binder(formatter, dataSource);
                binder.appendAllTo(this._carousel);
            },

            _setCarouselAlignedAndActiveItems: function (alignedIndex, activeIndex) {
                this._carousel.alignToIndex(alignedIndex);
                this._carousel.setActiveChildIndex(activeIndex);
                this._carousel.getChildWidgets()[activeIndex].focus();
            },

            _goBack: function () {
                this.parentWidget.back();
            },

            /* possibly over cautious but should prevent memory leakage.
             * stops running animations,
             * removes all items individually (rather then via removeChildWidgets
             * as this way clears down widget listeners) then removes any listeners
             * added to the carousel.
             */
            _tearDownCarousel: function () {
                this._carousel.completeAlignment();
                this._removeCarouselItems();
                this._removeCarouselListeners();
            },

            _removeCarouselItems: function () {
                var items;
                while (this._carousel.getChildWidgetCount() > 0) {
                    items = this._carousel.getChildWidgets();
                    this._carousel.removeChildWidget(items[0]);
                }
            },

            _removeCarouselListeners: function () {
                this._removeListenersFrom(this._carousel, this._getCarouselListenerMap());
            },

            _removeListenersFrom: function (target, listenerMap) {
                this._modifyListenersOn(target, listenerMap, false);
            },

            _getCarouselConfigStory: function (storyId, title) {
                return {
                    description: title,
                    dataSource: new DataSource(null, new LdpFeed(), 'loadStoriesById', storyId),
                    formatter: new StoryFormatter(),
                    orientation: Carousel.orientations.VERTICAL,
                    carouselId: 'verticalCullingCarousel3',
                    animOptions: {
                        skipAnim: false
                    },
                    alignment: {
                        normalisedAlignPoint: 0.5,
                        normalisedWidgetAlignPoint: 0.5
                    },
                    initialItem: 0,
                    type: "CULLING",
                    lengths: 264
                };
            },
        });

        return CarouselComponent;
    }
);

