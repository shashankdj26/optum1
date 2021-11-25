uniform vec3 twincolor_color_1;
uniform vec3 twincolor_color_2;
uniform sampler2D texture_diffuseMap;

void getAlbedo() {
    
    float mask = 1.0;
    #ifdef TWIN_COLOR_UV0    
    mask *= texture2D(texture_diffuseMap, vUv0).r;
    #endif
    
    #ifdef TWIN_COLOR_UV1    
    mask *= texture2D(texture_diffuseMap, vUv1).r;
    #endif
    dAlbedo = vec3(1.0);

    dAlbedo *= mix(gammaCorrectInput(twincolor_color_1), gammaCorrectInput(twincolor_color_2), mask);
}