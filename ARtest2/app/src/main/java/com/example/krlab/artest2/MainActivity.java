package com.example.krlab.artest2;

//11/12
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.Toast;
import com.wikitude.architect.ArchitectStartupConfiguration;
import com.wikitude.architect.ArchitectView;
import java.io.IOException;


public class MainActivity extends AppCompatActivity {

    protected ArchitectView     architectView;  //11/12

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate( savedInstanceState );
        setContentView(R.layout.activity_main);

        //11/12(ねっくだったとこ)
        this.architectView = (ArchitectView)this.findViewById( R.id.architectView );
        final ArchitectStartupConfiguration config = new ArchitectStartupConfiguration();
        config.setLicenseKey(this.getWikitudeSDKLicenseKey());
        this.architectView.onCreate( config );
        //final StartupConfiguration config = new StartupConfiguration(this.getWikitudeSDKLicenseKey());
                //this.getWikitudeSDKLicenseKey(),
                //Features.Geo,
                //config.getCameraPosition()
        //);  //下2行アレンジ

        //11/12下全部
        try {
            this.architectView.onCreate((ArchitectStartupConfiguration) config);
        } catch (RuntimeException ex) {
            this.architectView = null;
            Toast.makeText(getApplicationContext(), "can't create Architect View", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    protected void onPostCreate( final Bundle savedInstanceState ) {
        super.onPostCreate(savedInstanceState);

        if( this.architectView != null ) {
            //call mandatory live-cycle method of architect view
            this.architectView.onPostCreate();
            try {
                this.architectView.load( this.getARchitectWorldPath());
                this.architectView.setCullingDistance(50 * 1000);   //50k
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (this.architectView != null) {
            this.architectView.onResume();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
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
}
