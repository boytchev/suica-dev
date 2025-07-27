//
// Suica 3.0
//
//===================================================

//document.write( '<script src="misc/csg/BSPNode.js"></script>' );
//document.write( '<script src="misc/csg/CSG.js"></script>' );
//document.write( '<script src="misc/csg/CSGCuttingPlane.js"></script>' );
//document.write( '<script src="misc/csg/CSGPolygon.js"></script>' );
//document.write( '<script src="misc/csg/CSGVertex.js"></script>' );
//document.write( '<script src="src/suica-construct.js"></script>' );

import './suica-main.js';
import { degrees, radians, random } from './suica-globals.js';

window.radians = radians;
window.degrees = degrees;
window.random = random;


// old: Capture( suica, name, time, fps, format, skipFrames )
// new: Capture( suica, name, time, fps, format, skipTime ) - times in seconds
