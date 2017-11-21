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
        //var location = new AR.GeoLocation(33.620761, 133.718828);
        var location = new AR.RelativeLocation(null, 1, 1, 0);
        //var location = new AR.RelativeLocation(null, 1, 0, 0);

        document.write("AR読み込み");
        var modelMashu = new AR.Model("assets/cube.wt3", {
            onLoaded: this.worldLoaded,
            //onLoaded: this.loadingStep,
            scale: {
                x: 0.001,
                y: 0.001,
                z: 0.001
            }
        });

        document.write("AR表示の前");


        var obj = new AR.GeoObject(location, {
            drawables: {
                cam: [modelMashu]
            }
        });


        //var obj = new AR.GeoObject(location);
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
