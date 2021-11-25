void getViewDir() 
{
    dViewDirW = normalize(view_position - vPositionW);
}

vec3 c_dReflDirW;
vec3 c_dSpecularity;
vec3 c_dDiffuseLight;
vec4 c_dReflection;
vec3 c_dSpecularLight;
vec3 c_dAlbedo;
float c_dGlossiness;
float c_dAo;
float c_metalness;

uniform vec3 uc_dAlbedo;

void getAlbedo_c() {
    c_dAlbedo = vec3(1.0);
    c_dAlbedo *= uc_dAlbedo.rgb;
}

uniform float uc_metalness;

void getSpecularity_c() {
    c_metalness = 1.0;
    c_metalness *= uc_metalness;
    const float dielectricF0 = 0.04;
    c_dSpecularity = mix(vec3(dielectricF0), c_dAlbedo, c_metalness);
    c_dAlbedo *= 1.0 - c_metalness;
}

uniform float uc_dGlossiness;

void getGlossiness_c() {
    c_dGlossiness = 1.0;
    c_dGlossiness *= uc_dGlossiness; 
    c_dGlossiness += 0.0000001;
}


void getFresnel_c() {
    float fresnel = 1.0 - max(dot(vNormalW, dViewDirW), 0.0);
    float fresnel2 = fresnel * fresnel;
    fresnel *= fresnel2 * fresnel2;
    fresnel *= c_dGlossiness * c_dGlossiness;
    c_dSpecularity = c_dSpecularity + (1.0 - c_dSpecularity) * fresnel;
}

uniform samplerCube reflection_cubemap;
uniform float reflection_reflectivity;
uniform float reflection_strength;
void addReflection_c() {
    c_dReflDirW = normalize(-reflect(dViewDirW, vNormalW));
    vec3 lookupVec = fixSeams(cubeMapProject(c_dReflDirW));
    lookupVec.x *= -1.0;
    c_dReflection += vec4(textureCubeRGBM(reflection_cubemap, lookupVec).rgb, reflection_reflectivity);
}

void addAmbient_c() {
    vec3 fixedReflDir = fixSeamsStatic(vNormalW, 1.0 - 1.0 / 4.0);
    fixedReflDir.x *= -1.0;
    //c_dDiffuseLight += processEnvironment(decodeRGBM( textureCubeLodEXT(texture_prefilteredCubeMap128, fixedReflDir, 5.0) ).rgb);
    c_dDiffuseLight = vec3(1.0);
}

void applyAO_c() {
    c_dAo = 1.0;
    
    #ifdef AO_UV1
    c_dAo *= texture2D(texture_aoMap, vUv1).r;
    #endif
    #ifdef AO_UV0
    c_dAo *= texture2D(texture_aoMap, vUv0).r;
    #endif
    c_dDiffuseLight *= c_dAo;
}



void occludeSpecular_c() {
    float specOcc = c_dAo;
    c_dSpecularLight *= specOcc;
    c_dReflection *= specOcc;
}

vec3 combineColor_c() {
    return mix(c_dAlbedo * c_dDiffuseLight, c_dSpecularLight + c_dReflection.rgb * c_dReflection.a * reflection_strength, c_dSpecularity);
}

vec3 combineColor_c2() {
    return mix(c_dAlbedo, c_dSpecularLight + c_dReflection.rgb * c_dReflection.a * reflection_strength, c_dSpecularity);
}



uniform float coat_weight_base;
float getCoatWeightCustom(vec3 coat_color){
    float rw = coat_color.r/coat_weight_base;
    float gw = coat_color.g/coat_weight_base;
    float bw = coat_color.b/coat_weight_base;
    return max(rw, max(gw, bw));
}

uniform sampler2D decal_texture;
uniform int decal_mode;

uniform float decal_glossiness;
uniform float decal_metalness;
uniform float decal_reflectivity;
uniform float decal_weight;

vec3 base_color;
vec3 coat_color;
vec3 mix_color;
float coat_weight;


uniform int show_mode;

uniform float contrast_base;

uniform float contrast_value;
uniform float brightness_value;

float adjustContrast_f2(float x){
    return x + (x - 0.5) * contrast_value / 1.0;
}

vec3 adjustContrast2(vec3 cc){
    
    return vec3(adjustContrast_f2(cc.r),adjustContrast_f2(cc.g),adjustContrast_f2(cc.b));
}

vec3 adjustBrightness(vec3 cc){
    return vec3(cc.r * (brightness_value+1.0), cc.g * (brightness_value+1.0), cc.b * (brightness_value+1.0) );
}


void getDecalColor(int phase){   
    #ifdef ENABLE_DECAL
    vec4 decal_albedo = vec4(0.0);
    #ifdef DECAL_UV1
    decal_albedo = texture2D(decal_texture, vUv1);
    #endif
    #ifdef DECAL_UV0
    decal_albedo = texture2D(decal_texture, vUv0);
    #endif
    if(phase == 0){
        base_color = mix( base_color, decal_albedo.rgb, decal_albedo.a);
    }

    if(phase == 1){
        vec3 decal_color = mix( mix_color, decal_albedo.rgb, decal_albedo.a);
        //coat_color = decal_albedo;
        if(decal_albedo.a != 0.0){
            //coat_weight = 1.0;
            /*
            float d_metalness = 1.0;
            d_metalness *= decal_metalness;
            const float dielectricF0 = 0.04;
            vec3 d_dSpecularity = mix(vec3(dielectricF0), decal_albedo, d_metalness);
            decal_albedo *= 1.0 - d_metalness;

            float d_glossiness = 1.0;
            d_glossiness *= decal_glossiness;
            d_glossiness+=0.0000001;

            float fresnel = 1.0 - max(dot(vNormalW, dViewDirW), 0.0);
            float fresnel2 = fresnel * fresnel;
            fresnel *= fresnel2 * fresnel2;
            fresnel *= d_glossiness * d_glossiness;
            d_dSpecularity = d_dSpecularity + (1.0 - d_dSpecularity) * fresnel;

            vec3 d_dDiffuseLight = vec3(0);

            vec3 fixedReflDir = fixSeamsStatic(vNormalW, 1.0 - 1.0 / 4.0);
            fixedReflDir.x *= -1.0;
            d_dDiffuseLight += processEnvironment(decodeRGBM(textureCube(texture_prefilteredCubeMap4, fixedReflDir)).rgb);

            float d_dAo = 1.0;
            #ifdef MAPTEXTURE
            d_dAo *= texture2D(texture_aoMap, vUv0).r;
            #endif
            d_dDiffuseLight *= d_dAo;


            vec4 d_dReflection = vec4(0);
            float bias = saturate(1.0 - dGlossiness) * 5.0; // multiply by max mip level
            int index1 = int(bias);
            int index2 = int(min(bias + 1.0, 7.0));
            fixedReflDir = fixSeams(cubeMapProject(dReflDirW), bias);
            fixedReflDir.x *= -1.0;
            vec4 cubes[6];
            cubes[0] = textureCube(texture_prefilteredCubeMap128, fixedReflDir);
            cubes[1] = textureCube(texture_prefilteredCubeMap64, fixedReflDir);
            cubes[2] = textureCube(texture_prefilteredCubeMap32, fixedReflDir);
            cubes[3] = textureCube(texture_prefilteredCubeMap16, fixedReflDir);
            cubes[4] = textureCube(texture_prefilteredCubeMap8, fixedReflDir);
            cubes[5] = textureCube(texture_prefilteredCubeMap4, fixedReflDir);
            // Also we don't have dynamic indexing in PS, so...
            vec4 cube[2];
            for(int i = 0; i < 6; i++) {
                if (i == index1) {
                    cube[0] = cubes[i];
                }
                if (i == index2) {
                    cube[1] = cubes[i];
                }
            }
            // another variant

            vec4 cubeFinal = mix(cube[0], cube[1], fract(bias));
            vec3 refl = processEnvironment(decodeRGBM(cubeFinal).rgb);
            d_dReflection += vec4(refl, decal_reflectivity);

            vec3 d_dSpecularLight = vec3(0);

            float specOcc = d_dAo;
            d_dSpecularLight *= specOcc;
            d_dReflection *= specOcc;


            decal_albedo = mix(decal_albedo * d_dDiffuseLight, d_dSpecularLight + d_dReflection.rgb * d_dReflection.a, d_dSpecularity);
            #ifndef HDR
            decal_albedo = toneMap(decal_albedo);
            decal_albedo = gammaCorrectOutput(decal_albedo);
            #endif
            
            */
            mix_color = mix(mix_color,decal_albedo.rgb,decal_weight);
        }
        else{
            mix_color = decal_color;
        }
    }
    #endif
}

uniform bool enable_cc;
uniform bool enable_decal;
uniform bool enable_adjust_contrast;
uniform bool enable_ao;
uniform bool enable_albedo;
