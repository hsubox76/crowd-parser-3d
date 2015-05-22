var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 1100;

var renderer = new THREE.CSS3DRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById( 'container' ).appendChild( renderer.domElement );

var ribbonObjs = [];

var makeTweetLayer = function(data, layerTitle, z) {
  var objects = [];

  var layerBG = document.createElement('div');
  layerBG.className = 'layerBG';

  var layerObject = new THREE.CSS3DObject( layerBG );
  layerObject.position.x = 0;
  layerObject.position.y = 0;
  layerObject.position.z = z-1;
  scene.add( layerObject );
  objects.push({obj: layerObject, el: layerBG});
  ribbonObjs.push(layerObject);


  for (var i = 0; i < 72; i++) {
    var x=i;

    if (x > 23) {
      x = x % 23;
    }
    x += 1;

    if (x === 0) {
      console.log(x);
      console.log(i);
    }

    var tweet = document.createElement( 'div' );
    tweet.className = 'tweet';
    var normalizedScore = data[x].score;
    var bgRBGA;
    if (normalizedScore < -5) {
      normalizedScore = -5;
    }
    if (normalizedScore > 5) {
      normalizedScore = 5;
    }
    if (normalizedScore < 0) {
      bgRGBA = '225,0,0,' + (0.25 - normalizedScore/10);
    }
    if (normalizedScore > 0) {
      bgRGBA = '0,180,225,' + (0.25 + normalizedScore/10);
    }
    if (normalizedScore === 0) {
      bgRGBA = '225,225,225,0.8';
    }
    tweet.style.backgroundColor = 'rgba(' + bgRGBA + ')';

    var username = document.createElement( 'div' );
    username.className = 'username';
    username.textContent = 'user' + x;
    tweet.appendChild( username );

    var tweetText = document.createElement( 'div' );
    tweetText.className = 'tweetText';
    tweetText.textContent = data[x].text;
    tweet.appendChild( tweetText );

    var score = document.createElement( 'div' );
    score.className = 'score';
    score.textContent = layerTitle + ' score: ' + data[x].score;
    tweet.appendChild( score );

    var rows = 4;
    var ySpacing = 200;
    var yStart = 300;
    var xSpacing = 320;
    var xStart = -1000;

    var object = new THREE.CSS3DObject( tweet );
    object.position.x = xStart + Math.floor(i / rows) * xSpacing;
    object.position.y = yStart - (i % rows) * ySpacing;
    object.position.z = z;
    scene.add( object );

    objects.push({obj: object, el: tweet});

  }
  return objects;
};

var layerSpacing = 300;

var emojiTweets = makeTweetLayer(emojiData, 'emoji', layerSpacing);
var sentTweets = makeTweetLayer(sentimentData, 'word', 0);



controls = new THREE.TrackballControls( camera, renderer.domElement );
controls.rotateSpeed = 1;
controls.addEventListener( 'change', render );

var button = document.getElementById( 'separate' );
button.addEventListener( 'click', function ( event ) {
  // darken front layer
  emojiTweets.forEach(function(tweet) {
    var tmpColor = tweet.el.style.backgroundColor;
    var tmpArray = tmpColor.split(',');
    tmpArray[3] = '0.8';
    tmpColor = tmpArray.join(',');
    tweet.el.style.backgroundColor = tmpColor;
  });
  sentTweets.forEach(function(tweet) {
    var tmpColor = tweet.el.style.backgroundColor;
    var tmpArray = tmpColor.split(',');
    tmpArray[3] = '0.8';
    tmpColor = tmpArray.join(',');
    tweet.el.style.backgroundColor = tmpColor;
    var tween = new TWEEN.Tween( tweet.obj.position )
      .to( {z: 0}, 1000 )
      .easing( TWEEN.Easing.Exponential.InOut )
      .start();
  });

}, false );

var button = document.getElementById( 'flatten' );
button.addEventListener( 'click', function ( event ) {
  // lighten front layer
  emojiTweets.forEach(function(tweet) {
    var tmpColor = tweet.el.style.backgroundColor;
    var tmpArray = tmpColor.split(',');
    tmpArray[3] = '0.5';
    tmpColor = tmpArray.join(',');
    tweet.el.style.backgroundColor = tmpColor;
  });
  sentTweets.forEach(function(tweet) {
    var tmpColor = tweet.el.style.backgroundColor;
    var tmpArray = tmpColor.split(',');
    tmpArray[3] = '0.5';
    tmpColor = tmpArray.join(',');
    tweet.el.style.backgroundColor = tmpColor;
    var tween = new TWEEN.Tween( tweet.obj.position )
      .to( {z: layerSpacing-1}, 1000 )
      .easing( TWEEN.Easing.Exponential.InOut )
      .start();
  });

}, false );


// left and right mouse hover buttons
var leftHover = false;
var rightHover = false;
var scrollSpeed = 15;

var button = document.getElementById('left');
button.addEventListener( 'mouseover', function (event) {
  leftHover = true;
});
button.addEventListener( 'mouseleave', function (event) {
  leftHover = false;
});

var button = document.getElementById('right');
button.addEventListener( 'mouseover', function (event) {
  rightHover = true;
});
button.addEventListener( 'mouseleave', function (event) {
  rightHover = false;
});

function animate() {
  requestAnimationFrame( animate );
  if (leftHover) {
    camera.position.x -= scrollSpeed;
    controls.target.x -= scrollSpeed;
    for (var i = 0; i < ribbonObjs.length; i++) {
      ribbonObjs[i].position.x -= scrollSpeed;
    }
  }
  if (rightHover) {
    camera.position.x += scrollSpeed;
    controls.target.x += scrollSpeed;
    for (var i = 0; i < ribbonObjs.length; i++) {
      ribbonObjs[i].position.x += scrollSpeed;
    }
  }
  TWEEN.update();
  controls.update();
  render();
}

function render() {
  renderer.render( scene, camera );
}

animate();