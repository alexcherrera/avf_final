package com.example.collegeorg;

import android.os.Bundle;
import android.view.Menu;
import org.apache.cordova.*;

public class CollegeOrg extends DroidGap {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activity_college_org, menu);
        return true;
    }
}
