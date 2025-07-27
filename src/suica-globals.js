//
// Suica 3.0 Globals
//
//===================================================


import * as THREE from 'three';



window.suica = null;	// last (current) Suica instance


var OX = new THREE.Vector3( 1, 0, 0 );
var OY = new THREE.Vector3( 0, 1, 0 );
var OZ = new THREE.Vector3( 0, 0, 1 );



var ORIENTATIONS = {
	YXZ: {	SCALE: new THREE.Vector3( 1, -1, 1 ),
		LOOKAT: { FROM: [ 0, 0, 100 ], TO: [ 0, 0, 0 ], UP: [ 1, 0, 0 ] },
		RIGHT: OY,
		UP: OX,
		FORWARD: OZ,
		NAME: 'YXZ',
	},
	ZYX: {	SCALE: new THREE.Vector3( 1, 1, -1 ),
		LOOKAT: { FROM: [ 100, 0, 0 ], TO: [ 0, 0, 0 ], UP: [ 0, 1, 0 ] },
		RIGHT: OZ,
		UP: OY,
		FORWARD: OX,
		NAME: 'ZYX',
	},
	XZY: {	SCALE: new THREE.Vector3( -1, 1, 1 ),
		LOOKAT: { FROM: [ 0, 100, 0 ], TO: [ 0, 0, 0 ], UP: [ 0, 0, 1 ] },
		RIGHT: OX,
		UP: OZ,
		FORWARD: OY,
		NAME: 'XZY',
	},


	ZXY: {	SCALE: new THREE.Vector3( 1, 1, 1 ),
		LOOKAT: { FROM: [ 0, 100, 0 ], TO: [ 0, 0, 0 ], UP: [ 1, 0, 0 ] },
		RIGHT: OZ,
		UP: OX,
		FORWARD: OY,
		NAME: 'ZXY',
	},
	XYZ: {	SCALE: new THREE.Vector3( 1, 1, 1 ),
		LOOKAT: { FROM: [ 0, 0, 100 ], TO: [ 0, 0, 0 ], UP: [ 0, 1, 0 ] },
		RIGHT: OX,
		UP: OY,
		FORWARD: OZ,
		NAME: 'XYZ',
	},
	YZX: {	SCALE: new THREE.Vector3( 1, 1, 1 ),
		LOOKAT: { FROM: [ 100, 0, 0 ], TO: [ 0, 0, 0 ], UP: [ 0, 0, 1 ] },
		RIGHT: OY,
		UP: OZ,
		FORWARD: OX,
		NAME: 'YZX',
	},
}; // ORIENTATIONS



function radians( degrees ) {

	return degrees * Math.PI/180;

}



function degrees( radians ) {

	return radians * 180/Math.PI;

}



function parseSize( data, defaultValue ) {

	// empty
	if ( data===null || data==='' || data===undefined )
		return defaultValue;

	// string 'x,y,z'
	if ( typeof data === 'string' || data instanceof String ) {

		// 'x,y,z'
		var size = evaluate( '['+data+']' );
		if ( size.length == 1 )
			return size[ 0 ];
		else
			return size;

	}

	return data;

} // parseSize



function parseColor( data, defaultValue ) {

	// empty
	if ( data===null || data==='' || data===undefined )
		return defaultValue;

	// Three.js color
	if ( data instanceof THREE.Color )
		return data;

	// [r,g,b]
	if ( Array.isArray( data ) )
		return new THREE.Color( data[ 0 ], data[ 1 ]||0, data[ 2 ]||0 );

	// string
	if ( typeof data === 'string' || data instanceof String ) {

		// try constant or function
		// 0xFFFFFF, rgb(...), hsl(...)
		// note: '%' is removed, '%' is often used in hsl()
		if ( data.indexOf( '0x' )>=0 || data.indexOf( '0X' )>=0 || data.indexOf( '(' )>=0 )
			return parseColor( evaluate( data.toLowerCase().replaceAll( '%', '' ) ) );

		// r,g,b
		if ( data.indexOf( ',' ) > 0 )
			return new THREE.Color( ...evaluate( '['+data+']' ) );

	}

	return new THREE.Color( data || 'white' );

} // parseColor


function parseCenter( data, defaultValue = [ 0, 0, 0 ]) {

	// empty
	if ( data===null || data==='' || data===undefined )
		return defaultValue;

	// object with center
	if ( data.center )
		return data.center;

	// array
	if ( data instanceof Array )
		return data;

	// Three.js vector
	if ( data instanceof THREE.Vector3 )
		return [ data.x, data.y, data.z ];

	// string 'x,y,z' or global object name
	if ( typeof data === 'string' || data instanceof String ) {

		// global object name
		var global = window[ data ];
		if ( global && global.center )
			return global.center;

		// 'x,y,z'
		var center = evaluate( '['+data+']' );
		if ( center.length<3 ) center.push( 0, 0, 0 );
		return center;

	}

	return data;

} // parseCenter


function parseNumber( data, defaultValue ) {

	// empty
	if ( data===null || data==='' || data===undefined )
		return defaultValue;

	return evaluate( data );

} // Suica.parseNumber



function evaluate( string ) {

	return Function( '"use strict";return (' + string + ')' )();

}


function random( a=0, b=1 ) {

	if ( Array.isArray( a ) ) {

		var index = Math.floor( a.length*THREE.MathUtils.seededRandom() );
		return a[ index ];

	}

	return a+( b-a )*THREE.MathUtils.seededRandom();

}


function checkSuicaExists() {

	if ( !( window.suica?.isSuica ) )
		throw 'error: suica is not activated';

} // checkSuicaExists




function cloneEvents( target, source ) {

	target.onpointerenter = source.onpointerenter;
	target.onpointermove = source.onpointermove;
	target.onpointerleave = source.onpointerleave;
	target.onpointerdown = source.onpointerdown;
	target.onclick = source.onclick;
	target.onpointerup = source.onpointerup;
	target.onload = source.onload;

}



export { ORIENTATIONS, OX, OY, OZ };

export { checkSuicaExists, random, parseNumber, parseCenter, parseColor, evaluate, radians, degrees, parseSize, cloneEvents };
