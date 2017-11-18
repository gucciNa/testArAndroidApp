//document.write("aaaaaaaa");

var World = {
    loaded: false,
    rotating: false,
    //initialized: false,

    init: function initFn() {
        //console.log("js読み込んだ");

        this.createModelAtLocation();
        //World.initialized = true;
    },

/*
    locationChanged: fuinction locationChangedFn(lat, lon, alt, acc) {
        if (!World.initiallyLoadedData) {
            World.requestDataFromLocal(lat ,lon);
            World.initiallyLoadedData = true;
        }
    },
*/
/*
    requestDataFromLocal: function requestDataFromLocalFn(centerPointLatitude, centerPositionLongitude) {
        var poiData = [];
        poiData.push({
            "id": (1),
            "longitude": (),
            "latitude": (),
            "description": (),
            "altitude": "",
            "name": ("")
        });
        World.loadPoisFromJsonData(poiData);

    }
*/

    createModelAtLocation: function createModelAtLocationFn() {
    //function createModelAtLocation() {
        var location = new AR.RelativeLocation(null, 1, 0, 1);
        //var location = new AR.RelativeLocation(null, 1, 0, 0);

       // console.log("createModelAtLocationまではきた");

        var modelMashu = new AR.Model("assets/cube.wt3", {
            onLoaded: this.worldLoaded,
            //onLoaded: this.loadingStep,
            scale: {
                x: 10,
                y: 10,
                z: 10
            }
        });

        /*var imgModel = new AR.ImageDrawables("assets/10.png", 5, {
                translate : {x: 1}
        });*/

        var indicatorImage = new AR.ImageResoruce("assets/10.png");
        var indicatorDrawable = new AR.ImageDrawables(indicatorImage, 0.1, {
            verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP
        });


        //console.log("ARの大きさ定義まで");
        /*
        this.tracker = new AR.ClientTracker("assets/cube.wt3", {
            onLoaded: this.worldLoaded
        });

        var imgOne = new AR.ImageResoruce("assets/10.png");
        var overLayOne = new AR.ImageDrawables(imgOne, 1, {
            offsetX: -0.15,
            offsetY: 0
        });
        var pageOne = new AR.Trackable2DObject(this.tracker, "*", {
            drawables: {
                cam: overLayOne
            }
        });
        */
        //}
        var obj = new AR.GeoObject(location, {
            drawables: {
                cam: [modelMashu],
                indicator: [indicatorDrawable]
            }
            //console.log("AR表示できた");
            //document.write("AR create");
        });
    },

    worldLoaded: function worldLoadedFn() {
        World.loaded = true;
        var e = document.getElementById('loadingMessage');
        e.parentElement.removeChild(e);
    }

/*
    var trackable = new AR.ImageTrackable(this.tracker, "*", {
        drawables: {
            cam:[this.modelMashu]
        }
    });
*/
/*
    locationChanged: function (lat, lon, alt, acc) {
            AR.logger.info("緯度・経度：" + lat + ", " + lon);
            //alert("緯度・経度：" + lat + ", " + lon);
    },
*/
};

World.init();
