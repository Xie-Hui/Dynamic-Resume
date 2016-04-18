var lang = ["cn", "en"];

var currentLang = 0;

var camera, scene, renderer;
var fixcamera;
var controler;
var cameraHelper;
var activecamera;
var prvTarget;

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
    prvTarget = new THREE.Vector3(0,0,6000);
    camera.lookAt(prvTarget);
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

    createParticles();
    createCvElements();

    window.addEventListener( 'resize', onWindowResize, false );
    //window.addEventListener( 'mousewheel', mousewheel, false );
}

function createParticles(){


    group = new THREE.Group();
    sceneWebgl.add( group );

    var PI2 = Math.PI * 2;
    var seg = 20;
    var rad = 10;
    var particleCount = 5000;
    for(var i = 0; i < particleCount; i++){
        var thisPartiX = Math.random() * 20000 - 10000;
        var thisPartiY = Math.random() * 20000 - 10000;
        var thisPartiZ = Math.random() * 6000;
        var mat = new THREE.LineBasicMaterial( {
            color: new THREE.Color( 0x001241 + Math.random() * 0x00eeee ),
            linewidth:10
        } );
        var geo = new THREE.Geometry();
        for(var j = 0; j < seg; j++)
        { 
            var the = (j/(seg-1)) * PI2;
            geo.vertices.push(new THREE.Vector3(
            thisPartiX + Math.cos(the) * rad, 
            thisPartiY + Math.sin(the) * rad, 
            thisPartiZ));
        }
        var ln = new THREE.Line(geo, mat);
        mat = null;
        geo = null;
        group.add(ln);
        //console.log(ln);

    }

}

function particleUpdate(){
    for(var i in group.children){
        var particle = group.children[i];
        particle.position.x += Math.random() * 2 - 1;
        particle.position.y += Math.random() * 2 - 1;
        particle.position.z += Math.random() * 2 - 1;
    }
}

function transform(target,loca, duration){
    TWEEN.removeAll();
    
    //camera from
    new TWEEN.Tween(camera.position )
        .to( { x:  loca.x +Math.random() * 500 - 250, y: loca.y +Math.random() * 500 - 250, z: loca.z },  duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();
    //camera target
    new TWEEN.Tween( prvTarget )
        .to( { x:  target.x, y: target.y, z: target.z }, duration  )
        .easing( TWEEN.Easing.Exponential.InOut )
        .onUpdate(function(){
            camera.lookAt(prvTarget); 
            //console.log(prvtarget);
            })
        .start();
    //prvTarget = target;
}
function flyTo(target,loca, sectionname, duration){
    var objs = cv_objects[sectionname+"Objects"];
    var desireObjs = cv_objects[sectionname+"Desired"];

    TWEEN.removeAll();

    new TWEEN.Tween(camera.position )
        .to( { x:  loca.x +Math.random() * 500 - 250, y: loca.y +Math.random() * 500 - 250, z: loca.z },  duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();
    //camera target
    new TWEEN.Tween( prvTarget )
        .to( { x:  target.x, y: target.y, z: target.z }, duration  )
        .easing( TWEEN.Easing.Exponential.InOut )
        .onUpdate(function(){
            camera.lookAt(prvTarget); 
            //console.log(prvtarget);
            })
        .start();

    for ( var i = 0; i < objs.length; i ++ ) {

        var movingobject = objs[ i ];
        var target = desireObjs[ i ];

        new TWEEN.Tween( movingobject.position )
            .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration*0.5 )
            .easing( TWEEN.Easing.Exponential.InOut )
            .start();

        new TWEEN.Tween( movingobject.rotation )
            .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration*0.5 )
            .easing( TWEEN.Easing.Exponential.InOut )
            .start();
    }
    
    new TWEEN.Tween( this )
        .to( {}, duration * 2 )
        .onUpdate( render )
        .start();

}
function flyAway(target,loca, sectionname, duration){
    var objs = cv_objects[sectionname+"Objects"];
    var desireObjs = cv_objects[sectionname+"Desired"];

    TWEEN.removeAll();

    new TWEEN.Tween(camera.position )
        .to( { x:  loca.x +Math.random() * 500 - 250, y: loca.y +Math.random() * 500 - 250, z: loca.z },  duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();
    //camera target
    new TWEEN.Tween( prvTarget )
        .to( { x:  target.x, y: target.y, z: target.z }, duration  )
        .easing( TWEEN.Easing.Exponential.InOut )
        .onUpdate(function(){
            camera.lookAt(prvTarget); 
            //console.log(prvtarget);
            })
        .start();

    for ( var i = 0; i < objs.length; i ++ ) {

        var movingobject = objs[ i ];

         var randomItemPos = new THREE.Vector3((Math.random() * 10000 + 10000) * (Math.random() > 0.5 ? 1: -1), 
                    (Math.random() * 10000 + 10000) * (Math.random() > 0.5 ? 1: -1),
                    Math.random() * 5000 - 5000) ;
        var randomItemTarget = new THREE.Vector3(Math.random() , 
            Math.random(),
            Math.random());

        new TWEEN.Tween( movingobject.position )
            .to( { x: randomItemPos.x, y: randomItemPos.y, z: randomItemPos.z }, Math.random() * duration + duration*0.5 )
            .easing( TWEEN.Easing.Exponential.InOut )
            .start();

        new TWEEN.Tween( movingobject.rotation )
            .to( { x: randomItemTarget.x, y: randomItemTarget.y, z: randomItemTarget.z }, Math.random() * duration + duration*0.5 )
            .easing( TWEEN.Easing.Exponential.InOut )
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
    particleUpdate();
    renderer.render( scene, camera );
    rendererWebgl.render( sceneWebgl, camera );
    cameraWander();
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    rendererWebgl.setSize( window.innerWidth, window.innerHeight );

    render();

}

function mousewheel( event ) {


        event.preventDefault();
        event.stopPropagation();

        var delta = 0;

        if ( event.wheelDelta ) {

            // WebKit / Opera / Explorer 9

            delta = event.wheelDelta / 40;

        } else if ( event.detail ) {

            // Firefox

            delta = - event.detail / 3;

        }

        camera.position.z += delta * 100 ;

    }
function cameraWander(){
    var myDate=new Date() / 2000;
    var rad = 5;
    camera.position.x += Math.sin(myDate) * rad;
    camera.position.y += Math.cos(myDate) * rad / 5;
    camera.lookAt(prvTarget);
}