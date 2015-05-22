var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 1100;
camera.position.y = 300;

var renderer = new THREE.CSS3DRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById( 'container' ).appendChild( renderer.domElement );

var keepAddingTweets = true;
var layers = [];

var addTweet = function(rawTweet, layerObj, index) {

  var rows = 4;
  var ySpacing = 200;
  var yStart = 300;
  var xSpacing = 320;
  var xStart = -1000;

  var tweet = document.createElement( 'div' );
  tweet.className = 'tweet';
  var normalizedScore = rawTweet[layerObj.resultsName].score;
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
  username.textContent = rawTweet.username;
  tweet.appendChild( username );

  var tweetText = document.createElement( 'div' );
  tweetText.className = 'tweetText';
  tweetText.textContent = rawTweet.text;
  tweet.appendChild( tweetText );

  var score = document.createElement( 'div' );
  score.className = 'score';
  score.textContent = layerObj.title + ' score: ' + rawTweet[layerObj.resultsName].score;
  tweet.appendChild( score );

  var object = new THREE.CSS3DObject( tweet );
  object.position.x = xStart + Math.floor(index / rows) * xSpacing;
  object.position.y = yStart - (index % rows) * ySpacing;
  object.position.z = layerObj.z;
  scene.add( object );

  layerObj.tweets.push({obj: object, el: tweet});

};

var makeTweetLayer = function(layerResultsProp, layerTitle, z) {
  var layerObj = {};
  layerObj.name = layerTitle;
  layerObj.tweets = [];
  layerObj.resultsName = layerResultsProp;
  layerObj.title = layerTitle;
  layerObj.z = z;

  var ribbon = document.createElement('div');
  ribbon.className = 'ribbon';

  var ribbonText = document.createElement( 'div' );
  ribbonText.className = 'layer-title';
  ribbonText.textContent = layerTitle + ' layer';
  ribbon.appendChild( ribbonText );

  var ribbonObject = new THREE.CSS3DObject( ribbon );
  ribbonObject.position.x = 0;
  ribbonObject.position.y = 0;
  ribbonObject.position.z = z-1;

  scene.add( ribbonObject );
  layerObj.ribbonObj = ribbonObject;
  layerObj.ribbonEl = ribbon;


  for (var i = 0; i < 24; i++) {
    var x=i;

    if (x > 23) {
      x = x % 23;
    }

    addTweet(tweetData[x], layerObj, i);

  }
  layers.push(layerObj);
};

var layerSpacing = 300;

makeTweetLayer('baseLayerResults', 'word', layerSpacing);
makeTweetLayer('emoticonLayerResults', 'emoji', 0);



controls = new THREE.TrackballControls( camera, renderer.domElement );
controls.rotateSpeed = 1;
controls.addEventListener( 'change', render );

var button = document.getElementById( 'separate' );
button.addEventListener( 'click', function ( event ) {
  // // darken front layer
  // sentTweets.forEach(function(tweet) {
  //   var tmpColor = tweet.el.style.backgroundColor;
  //   var tmpArray = tmpColor.split(',');
  //   tmpArray[3] = '0.8';
  //   tmpColor = tmpArray.join(',');
  //   tweet.el.style.backgroundColor = tmpColor;
  // });
  for (var i = 1; i < layers.length; i++) {
    layers[i].tweets.forEach(function(tweet) {
      var tween = new TWEEN.Tween( tweet.obj.position )
        .to( {z: 0}, 1000 )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();
    });
    var tween = new TWEEN.Tween( layers[i].ribbonObj.position )
      .to( {z: -1}, 1000 )
      .easing( TWEEN.Easing.Exponential.InOut )
      .start();
    layers[i].z = 0;
  }

}, false );

var button = document.getElementById( 'flatten' );
button.addEventListener( 'click', function ( event ) {
  // // lighten front layer
  // sentTweets.forEach(function(tweet) {
  //   var tmpColor = tweet.el.style.backgroundColor;
  //   var tmpArray = tmpColor.split(',');
  //   tmpArray[3] = '0.5';
  //   tmpColor = tmpArray.join(',');
  //   tweet.el.style.backgroundColor = tmpColor;
  // });
  for (var i = 1; i < layers.length; i++) {
    layers[i].tweets.forEach(function(tweet) {
      var tween = new TWEEN.Tween( tweet.obj.position )
        .to( {z: layerSpacing-1}, 1000 )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();
    });
    var tween = new TWEEN.Tween( layers[i].ribbonObj.position )
      .to( {z: layerSpacing-2}, 1000 )
      .easing( TWEEN.Easing.Exponential.InOut )
      .start();
    layers[i].z = layerSpacing-1;
  }

}, false );

var button = document.getElementById( 'stop' );
button.addEventListener( 'click', function ( event ) {
  keepAddingTweets = false;
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

var tick = 0;

function animate() {
  requestAnimationFrame( animate );

  tick++;

  // every 60 ticks add a tweet
  if (tick >= 30 && keepAddingTweets) {
    console.log('hi');
    tick = 0;
    var newTweetIndex = layers[0].tweets.length;
    var x = newTweetIndex;
    if (x > 23) {
      x = x % 23;
    }
    for (var j = 0; j < layers.length; j++) {
      addTweet(tweetData[x], layers[j], newTweetIndex);
    }
    //var addTweet = function(rawTweet, layerObj, index)
  }

  if (leftHover) {
    camera.position.x -= scrollSpeed;
    controls.target.x -= scrollSpeed;
    for (var i = 0; i < layers.length; i++) {
      layers[i].ribbonObj.position.x -= scrollSpeed;
    }
  }
  if (rightHover) {
    camera.position.x += scrollSpeed;
    controls.target.x += scrollSpeed;
    for (var i = 0; i < layers.length; i++) {
      layers[i].ribbonObj.position.x += scrollSpeed;
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