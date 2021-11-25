base_color = vec3(0);
base_color = combineColor();
base_color += getEmission();
base_color = addFog(base_color);
if(enable_decal && decal_mode == 0){
    getDecalColor(0);
} 
if(enable_cc){
    //compute coat color
    c_dDiffuseLight = vec3(0);
    c_dSpecularLight = vec3(0);
    c_dReflection = vec4(0);
    c_dSpecularity = vec3(0);

    
    if(enable_albedo){
       getAlbedo_c();
    }
    getSpecularity_c();
    getGlossiness_c();
    getFresnel_c();
    addReflection_c();
    coat_color = combineColor_c2();
    if(enable_ao){
       applyAO_c();
       coat_color *= c_dAo;
    }
    
    //occludeSpecular_c();

    
    if(enable_adjust_contrast){
        coat_color = adjustBrightness(coat_color);
        coat_color = adjustContrast2(coat_color);
    
    }


    if(enable_decal && decal_mode == 1){
        getDecalColor(1); 
    }

    if(show_mode == 0){
        coat_weight = 0.0;
        mix_color = mix(base_color,coat_color,coat_weight);
    }
    if(show_mode == 1){
        coat_weight = getCoatWeightCustom(coat_color);
        mix_color = mix(base_color,coat_color,coat_weight);
    }
    if(show_mode == 2){
        mix_color = base_color + c_dReflection.rgb * reflection_strength;
    }
    
    if(show_mode == 3){
        mix_color = c_dReflection.rgb * reflection_strength;
    }
    
    if(show_mode == 4){
        coat_weight = 1.0;
        mix_color = mix(base_color,coat_color,coat_weight);
    }
    
    gl_FragColor.rgb = mix_color ;
    
}
else{
    gl_FragColor.rgb = base_color;
}


#ifndef HDR
gl_FragColor.rgb = toneMap(gl_FragColor.rgb);
gl_FragColor.rgb = gammaCorrectOutput(gl_FragColor.rgb);
#endif
