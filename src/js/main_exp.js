var camera, scene, renderer;
var fixcamera;
var controler;
var cameraHelper;
var activecamera;
var vanishPt;

var sceneWebgl, rendererWebgl;

window.onload = function(){
    setup();
    animate();
}

function setup(){

    camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 7500;
    //camera.fov = 10;
    scene = new THREE.Scene();
    sceneWebgl = new THREE.Scene();
    vanishPt = new THREE.Vector3(0,0,6000);
    camera.lookAt(vanishPt);
    sceneWebgl.fog = new THREE.Fog(0x11132d, 1, 10000);
    //sceneWebgl.add( new THREE.AmbientLight( 0x333333 ) );

    renderer = new THREE.CSS3DRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = 0;
    document.getElementById( 'container' ).appendChild( renderer.domElement );

    rendererWebgl = new THREE.WebGLRenderer({ antialias: true, alpha:true} );
    //rendererWebgl.setClearColor( 0x11132d);
    rendererWebgl.setPixelRatio( window.devicePixelRatio );
    rendererWebgl.setSize( window.innerWidth, window.innerHeight );
    rendererWebgl.domElement.style.position = 'absolute';
    rendererWebgl.domElement.style.zIndex = -1;
    rendererWebgl.domElement.style.top = 0;
    document.getElementById( 'container' ).appendChild( rendererWebgl.domElement );

    scene.add( camera );

    //createParticles();
    createCvElements();

}

function transform(target, location, duration){
    //TWEEN.removeAll();
    //move camera to starting location
    new TWEEN.Tween(target )
        .to( {
            x: location.x,
            y: location.y,
            z: location.z
         },  duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();
}

function flyTo(target, location, sectionName, duration){
    var objs = cv_objects[sectionName+"Objects"];
    var desireObjs = cv_objects[sectionName+"Desired"];

    TWEEN.removeAll();


    new TWEEN.Tween(camera.position )
        .to( {
            x: location.x,
            y: location.y,
            z: location.z
         },  duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();

    //camera target
    new TWEEN.Tween( vanishPt )
        .to( {
            x: target.x,
            y: target.y,
            z: target.z
         }, duration  )
        .easing( TWEEN.Easing.Exponential.InOut )
        .onUpdate(function(){
            camera.lookAt(vanishPt);
            //console.log(vanishPt);
            })
        .start();
    for ( var i = 0; i < objs.length; i ++ ) {

        var movingobject = objs[ i ];
        var target = desireObjs[ i ];

        transform(movingobject.position, target.position, duration * 0.5)
        transform(movingobject.rotation, target.rotation, duration * 0.5)

    }

}

function flyAway(target,location, sectionName, duration){
    var objs = cv_objects[sectionName+"Objects"];
    var desireObjs = cv_objects[sectionName+"Desired"];

    TWEEN.removeAll();

    new TWEEN.Tween(camera.position )
        .to( {
            x: location.x,
            y: location.y,
            z: location.z
         },  duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();
    //camera target
    new TWEEN.Tween( vanishPt )
        .to( {
            x: target.x,
            y: target.y,
            z: target.z
         }, duration  )
        .easing( TWEEN.Easing.Exponential.InOut )
        .onUpdate(function(){
            camera.lookAt(vanishPt);
            //console.log(vanishPt);
            })
        .start();


    for ( var i = 0; i < objs.length; i ++ ) {

        var movingobject = objs[ i ];

        /*
         var randomItemPos = new THREE.Vector3((Math.random() * 10 + 10) * (Math.random() > 0.5 ? 1: -1),
                    (Math.random() * 10 + 10) * (Math.random() > 0.5 ? 1: -1),
                    Math.random() * 5 - 5) ;
        */
        var randomItemPos = new THREE.Vector3(100, 0, 0)
        /*
        var randomItemTarget = new THREE.Vector3(Math.random() ,
            Math.random(),
            Math.random()
        )
        */
        var randomItemTarget = randomItemPos

        transform(movingobject.position, randomItemPos, duration * 0.5)
        transform(movingobject.rotation, target.rotation, duration * 0.5)

    }

}

function animate() {
    requestAnimationFrame( animate );
    TWEEN.update();
    render();
}

function render() {
    //particleUpdate();
    renderer.render( scene, camera );
    //rendererWebgl.render( sceneWebgl, camera );
    //cameraWander();
}
