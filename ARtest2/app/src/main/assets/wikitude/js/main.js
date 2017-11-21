document.write("aaaaaaaa");

var World = {
    loaded: false,
    rotating: false,
    //initialized: false,

    init: function initFn() {
        document.write("ARcreate");

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
        var location = new AR.RelativeLocation(null, 5, 5, 5);
        //var location = new AR.RelativeLocation(null, 1, 0, 0);

        document.write("AR読み込み");
        var modelMashu = new AR.Model("assets/cube.wt3", {
            onLoaded: this.worldLoaded,
            //onLoaded: this.loadingStep,
            scale: {
                x: 1,
                y: 1,
                z: 1
            }
        });

        /*var imgModel = new AR.ImageDrawables("assets/10.png", 5, {
                translate : {x: 1}
        });*/
/*
        var indicatorImage = new AR.ImageResoruce("assets/10.png");
        var indicatorDrawable = new AR.ImageDrawables(indicatorImage, 0.1, {
            verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP
        });
*/

        document.write("AR表示の前");
        var obj = new AR.GeoObject(location, {
            drawables: {
                cam: [modelMashu]
            }
        });
        document.write("AR表示のとこ");
    },

    worldLoaded: function worldLoadedFn() {
        World.loaded = true;
        var e = document.getElementById('loadingMessage');
        e.parentElement.removeChild(e);
    }

/*
    locationChanged: function (lat, lon, alt, acc) {
            AR.logger.info("緯度・経度：" + lat + ", " + lon);
            //alert("緯度・経度：" + lat + ", " + lon);
    },
*/
};

World.init();
