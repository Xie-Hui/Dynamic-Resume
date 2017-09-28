var camera, scene, renderer;
var fixcamera;
var controler;
var cameraHelper;
var activecamera;
var vanishPt;

var sceneWebgl, rendererWebgl;

window.onload = function(){
    //createCvElements()
    init();
    animate();
}

function init(){

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 3000;
	scene = new THREE.Scene();

    createCvElements()

    renderer = new THREE.CSS3DRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.domElement.style.position = 'absolute';
	document.getElementById( 'container' ).appendChild( renderer.domElement );

}
/*
function createCSSobjs() {

    for ( var i = 0; i < objects.length; i++ ) {

        if ( levels[ i ] == 0 ) {

            var object = objects[ i ]
            var object = new THREE.CSS3DObject(c1);

        }
    }

}
*/
function transform(targets, duration){

    TWEEN.removeAll();
    //move camera to starting location
    for ( i = 0; i < objects.length; i++ ) {

        var object = objects[i]
        var target = targets[i]

        new TWEEN.Tween( object.position )
            .to({ x: target.position.x, y: target.position.y, z: target.position.z }, duration )
            .easing( TWEEN.Easing.Exponential.InOut )
            .onUpdate( function(){

                //camera.position.x = objects[0].position.x
                //camera.position.y = objects[0].position.y

            } )
            .start();

    }

    new TWEEN.Tween( this )
            .to( {}, duration * 2 )
            .onUpdate( render )
            .start();

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
