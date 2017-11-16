package com.example.krlab.artest2;

//11/12

import android.location.Location;
import android.location.LocationListener;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.Toast;

import com.wikitude.architect.ArchitectStartupConfiguration;
import com.wikitude.architect.ArchitectView;
import com.wikitude.architect.ArchitectView.SensorAccuracyChangeListener;
import com.wikitude.common.camera.CameraSettings;

import java.io.IOException;


public class MainActivity extends AppCompatActivity implements ArchitectViewHolderInterface {
//public class MainActivity extends AppCompatActivity {
    protected ArchitectView     architectView;  //11/12
    protected Location          lastKnownLocation;  //11/16
    protected SensorAccuracyChangeListener  sensorAccuracyListener;
    protected LocationListener  locationListener;
    protected ArchitectViewHolderInterface.ILocationProvider    locationProvider;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //11/12(ねっくだったとこ)
        this.architectView = (ArchitectView) this.findViewById(R.id.architectView);
        final ArchitectStartupConfiguration config = new ArchitectStartupConfiguration();
        config.setLicenseKey(this.getWikitudeSDKLicenseKey());

        //config.setFeatures(ArchitectStartupConfiguration.Features.Geo);
        //config.getCameraPosition();


        //final ArchitectStartupConfiguration config = new ArchitectStartupConfiguration(this.getWikitudeSDKLicenseKey(), ArchitectStartupConfiguration.Features.Geo, config.getCameraPosition());


        try {
            this.architectView.onCreate(config);
        } catch (RuntimeException ex) {
            this.architectView = null;
            Toast.makeText(getApplicationContext(), "can't create Architect View", Toast.LENGTH_SHORT).show();
        }

/*
        //11/16
        this.sensorAccuracyListener = this.getSensorAccuracyListener();
        this.locationListener = new LocationListener() {
            @Override
            public void onStatusChanged( String provider, int status, Bundle extras ) {
            }

            @Override
            public void onProviderEnabled( String provider ) {
            }

            @Override
            public void onProviderDisabled( String provider ) {
            }

            @Override
            public void onLocationChanged(final Location location) {
                if (location != null) {
                    MainActivity.this.lastKnownLocation = location;
                    if (MainActivity.this.architectView != null) {
                        if (location.hasAltitude() && location.hasAccuracy() &&location.getAccuracy() < 7) {
                            MainActivity.this.architectView.setLocation(location.getLatitude(), location.getLongitude(), location.getAltitude(), location.getAccuracy());
                        } else {
                            MainActivity.this.architectView.setLocation(location.getLatitude(), location.getLongitude(), location.hasAccuracy() ? location.getAccuracy() : 1000);
                        }
                    }
                }
            }
        };
        this.locationProvider = getLocationProvider(this.locationListener);
        */
    }

    //11/12下全部
    @Override
    protected void onPostCreate( final Bundle savedInstanceState ) {
        super.onPostCreate(savedInstanceState);

        if( this.architectView != null ) {
            //call mandatory live-cycle method of architect view
            this.architectView.onPostCreate();
            try {
                this.architectView.load( this.getARchitectWorldPath());
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        //11/16
        if ( this.architectView != null ) {
            this.architectView.onResume();
            if ( this.sensorAccuracyListener != null ) {
                this.architectView.registerSensorAccuracyChangeListener( this.sensorAccuracyListener );
            }
        }
        if (this.architectView != null) {
            this.architectView.onResume();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        //11/16
        if ( this.architectView != null ) {
            this.architectView.onPause();
            if (this.sensorAccuracyListener!=null) {

                this.architectView.unregisterSensorAccuracyChangeListener(this.sensorAccuracyListener);
            }
        }
        if (this.architectView != null) {
            this.architectView.onPause();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        if (this.architectView != null) {
            this.architectView.onDestroy();
        }
    }

    protected String getWikitudeSDKLicenseKey() {
        return WikitudeSDKConstants.WIKITUDE_SDK_KEY;
    }

    protected String getARchitectWorldPath() {
        return "wikitude/index.html";
    }

    protected CameraSettings.CameraPosition getCameraPosition() {
        return CameraSettings.CameraPosition.BACK;
    }


    //11/16
    public ArchitectViewHolderInterface.ILocationProvider getLocationProvider(final LocationListener locationListener) {
        return new LocationProvider(this, locationListener);
    }
/*
    private long lastCalibrationToastShownTimeMillis = System.currentTimeMillis();

    public ArchitectView.SensorAccuracyChangeListener getSensorAccuracyListener() {
        return new ArchitectView.SensorAccuracyChangeListener() {
            @Override
            public void onCompassAccuracyChanged( int accuracy ) {
				// UNRELIABLE = 0, LOW = 1, MEDIUM = 2, HIGH = 3
                if ( accuracy < SensorManager.SENSOR_STATUS_ACCURACY_MEDIUM && MainActivity.this != null && !MainActivity.this.isFinishing() && System.currentTimeMillis() - MainActivity.this.lastCalibrationToastShownTimeMillis > 5 * 1000) {
                    //Toast.makeText( MainActivity.this, R.string.compass_accuracy_low, Toast.LENGTH_LONG ).show();
                    MainActivity.this.lastCalibrationToastShownTimeMillis = System.currentTimeMillis();
                }
            }
        };
    }
*/
}
