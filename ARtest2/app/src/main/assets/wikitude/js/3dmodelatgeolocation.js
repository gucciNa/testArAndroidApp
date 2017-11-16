:var World = {
    loaded: false,
    //rotating: false,
    //initialized: false,

    init: function initFn() {
        this.createModelAtLocation();
        //World.initialized = true;
    },



    createModelAtLocation: function createModelAtLocationFn() {
        //var location = new AR.RelativeLocation(null, 1, 0, 1);
        var location = new AR.RelativeLocation(null, 1, 0, 0);


        var modelMashu = new AR.Model("assets/cube.wt3", {
            onLoaded: this.worldLoaded,
            scale: {
                x: 1,
                y: 1,
                z: 1
            },
            onError: function(errorMessage) {
                alert(errorMessage );
            }
        }
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
    }
*/
    var obj = new AR.GeoObject(location, {
        drawables: {
            cam: [modelMashu]
        }
    });

/*
    var trackable = new AR.ImageTrackable(this.tracker, "*", {
        drawables: {
            cam:[this.modelMashu]
        }
    });
*/

    locationChanged: function (lat, lon, alt, acc) {
            AR.logger.info("緯度・経度：" + lat + ", " + lon);
            //alert("緯度・経度：" + lat + ", " + lon);
    },

};

//World.init();