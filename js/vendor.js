/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

/**
 * core-js 2.4.1
 * https://github.com/zloirock/core-js
 * License: http://rock.mit-license.org
 * © 2016 Denis Pushkarev
 */
!function(a,b,c){"use strict";!function(a){function __webpack_require__(c){if(b[c])return b[c].exports;var d=b[c]={exports:{},id:c,loaded:!1};return a[c].call(d.exports,d,d.exports,__webpack_require__),d.loaded=!0,d.exports}var b={};return __webpack_require__.m=a,__webpack_require__.c=b,__webpack_require__.p="",__webpack_require__(0)}([function(a,b,c){c(1),c(50),c(51),c(52),c(54),c(55),c(58),c(59),c(60),c(61),c(62),c(63),c(64),c(65),c(66),c(68),c(70),c(72),c(74),c(77),c(78),c(79),c(83),c(86),c(87),c(88),c(89),c(91),c(92),c(93),c(94),c(95),c(97),c(99),c(100),c(101),c(103),c(104),c(105),c(107),c(108),c(109),c(111),c(112),c(113),c(114),c(115),c(116),c(117),c(118),c(119),c(120),c(121),c(122),c(123),c(124),c(126),c(130),c(131),c(132),c(133),c(137),c(139),c(140),c(141),c(142),c(143),c(144),c(145),c(146),c(147),c(148),c(149),c(150),c(151),c(152),c(158),c(159),c(161),c(162),c(163),c(167),c(168),c(169),c(170),c(171),c(173),c(174),c(175),c(176),c(179),c(181),c(182),c(183),c(185),c(187),c(189),c(190),c(191),c(193),c(194),c(195),c(196),c(203),c(206),c(207),c(209),c(210),c(211),c(212),c(213),c(214),c(215),c(216),c(217),c(218),c(219),c(220),c(222),c(223),c(224),c(225),c(226),c(227),c(228),c(229),c(231),c(234),c(235),c(237),c(238),c(239),c(240),c(241),c(242),c(243),c(244),c(245),c(246),c(247),c(249),c(250),c(251),c(252),c(253),c(254),c(255),c(256),c(258),c(259),c(261),c(262),c(263),c(264),c(267),c(268),c(269),c(270),c(271),c(272),c(273),c(274),c(276),c(277),c(278),c(279),c(280),c(281),c(282),c(283),c(284),c(285),c(286),c(287),a.exports=c(288)},function(a,b,d){var e=d(2),f=d(3),g=d(4),h=d(6),i=d(16),j=d(20).KEY,k=d(5),l=d(21),m=d(22),n=d(17),o=d(23),p=d(24),q=d(25),r=d(27),s=d(40),t=d(43),u=d(10),v=d(30),w=d(14),x=d(15),y=d(44),z=d(47),A=d(49),B=d(9),C=d(28),D=A.f,E=B.f,F=z.f,G=e.Symbol,H=e.JSON,I=H&&H.stringify,J="prototype",K=o("_hidden"),L=o("toPrimitive"),M={}.propertyIsEnumerable,N=l("symbol-registry"),O=l("symbols"),P=l("op-symbols"),Q=Object[J],R="function"==typeof G,S=e.QObject,T=!S||!S[J]||!S[J].findChild,U=g&&k(function(){return 7!=y(E({},"a",{get:function(){return E(this,"a",{value:7}).a}})).a})?function(a,b,c){var d=D(Q,b);d&&delete Q[b],E(a,b,c),d&&a!==Q&&E(Q,b,d)}:E,V=function(a){var b=O[a]=y(G[J]);return b._k=a,b},W=R&&"symbol"==typeof G.iterator?function(a){return"symbol"==typeof a}:function(a){return a instanceof G},X=function defineProperty(a,b,c){return a===Q&&X(P,b,c),u(a),b=w(b,!0),u(c),f(O,b)?(c.enumerable?(f(a,K)&&a[K][b]&&(a[K][b]=!1),c=y(c,{enumerable:x(0,!1)})):(f(a,K)||E(a,K,x(1,{})),a[K][b]=!0),U(a,b,c)):E(a,b,c)},Y=function defineProperties(a,b){u(a);for(var c,d=s(b=v(b)),e=0,f=d.length;f>e;)X(a,c=d[e++],b[c]);return a},Z=function create(a,b){return b===c?y(a):Y(y(a),b)},$=function propertyIsEnumerable(a){var b=M.call(this,a=w(a,!0));return!(this===Q&&f(O,a)&&!f(P,a))&&(!(b||!f(this,a)||!f(O,a)||f(this,K)&&this[K][a])||b)},_=function getOwnPropertyDescriptor(a,b){if(a=v(a),b=w(b,!0),a!==Q||!f(O,b)||f(P,b)){var c=D(a,b);return!c||!f(O,b)||f(a,K)&&a[K][b]||(c.enumerable=!0),c}},aa=function getOwnPropertyNames(a){for(var b,c=F(v(a)),d=[],e=0;c.length>e;)f(O,b=c[e++])||b==K||b==j||d.push(b);return d},ba=function getOwnPropertySymbols(a){for(var b,c=a===Q,d=F(c?P:v(a)),e=[],g=0;d.length>g;)!f(O,b=d[g++])||c&&!f(Q,b)||e.push(O[b]);return e};R||(G=function Symbol(){if(this instanceof G)throw TypeError("Symbol is not a constructor!");var a=n(arguments.length>0?arguments[0]:c),b=function(c){this===Q&&b.call(P,c),f(this,K)&&f(this[K],a)&&(this[K][a]=!1),U(this,a,x(1,c))};return g&&T&&U(Q,a,{configurable:!0,set:b}),V(a)},i(G[J],"toString",function toString(){return this._k}),A.f=_,B.f=X,d(48).f=z.f=aa,d(42).f=$,d(41).f=ba,g&&!d(26)&&i(Q,"propertyIsEnumerable",$,!0),p.f=function(a){return V(o(a))}),h(h.G+h.W+h.F*!R,{Symbol:G});for(var ca="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),da=0;ca.length>da;)o(ca[da++]);for(var ca=C(o.store),da=0;ca.length>da;)q(ca[da++]);h(h.S+h.F*!R,"Symbol",{"for":function(a){return f(N,a+="")?N[a]:N[a]=G(a)},keyFor:function keyFor(a){if(W(a))return r(N,a);throw TypeError(a+" is not a symbol!")},useSetter:function(){T=!0},useSimple:function(){T=!1}}),h(h.S+h.F*!R,"Object",{create:Z,defineProperty:X,defineProperties:Y,getOwnPropertyDescriptor:_,getOwnPropertyNames:aa,getOwnPropertySymbols:ba}),H&&h(h.S+h.F*(!R||k(function(){var a=G();return"[null]"!=I([a])||"{}"!=I({a:a})||"{}"!=I(Object(a))})),"JSON",{stringify:function stringify(a){if(a!==c&&!W(a)){for(var b,d,e=[a],f=1;arguments.length>f;)e.push(arguments[f++]);return b=e[1],"function"==typeof b&&(d=b),!d&&t(b)||(b=function(a,b){if(d&&(b=d.call(this,a,b)),!W(b))return b}),e[1]=b,I.apply(H,e)}}}),G[J][L]||d(8)(G[J],L,G[J].valueOf),m(G,"Symbol"),m(Math,"Math",!0),m(e.JSON,"JSON",!0)},function(a,c){var d=a.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof b&&(b=d)},function(a,b){var c={}.hasOwnProperty;a.exports=function(a,b){return c.call(a,b)}},function(a,b,c){a.exports=!c(5)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(a,b){a.exports=function(a){try{return!!a()}catch(b){return!0}}},function(a,b,d){var e=d(2),f=d(7),g=d(8),h=d(16),i=d(18),j="prototype",k=function(a,b,d){var l,m,n,o,p=a&k.F,q=a&k.G,r=a&k.S,s=a&k.P,t=a&k.B,u=q?e:r?e[b]||(e[b]={}):(e[b]||{})[j],v=q?f:f[b]||(f[b]={}),w=v[j]||(v[j]={});q&&(d=b);for(l in d)m=!p&&u&&u[l]!==c,n=(m?u:d)[l],o=t&&m?i(n,e):s&&"function"==typeof n?i(Function.call,n):n,u&&h(u,l,n,a&k.U),v[l]!=n&&g(v,l,o),s&&w[l]!=n&&(w[l]=n)};e.core=f,k.F=1,k.G=2,k.S=4,k.P=8,k.B=16,k.W=32,k.U=64,k.R=128,a.exports=k},function(b,c){var d=b.exports={version:"2.4.0"};"number"==typeof a&&(a=d)},function(a,b,c){var d=c(9),e=c(15);a.exports=c(4)?function(a,b,c){return d.f(a,b,e(1,c))}:function(a,b,c){return a[b]=c,a}},function(a,b,c){var d=c(10),e=c(12),f=c(14),g=Object.defineProperty;b.f=c(4)?Object.defineProperty:function defineProperty(a,b,c){if(d(a),b=f(b,!0),d(c),e)try{return g(a,b,c)}catch(h){}if("get"in c||"set"in c)throw TypeError("Accessors not supported!");return"value"in c&&(a[b]=c.value),a}},function(a,b,c){var d=c(11);a.exports=function(a){if(!d(a))throw TypeError(a+" is not an object!");return a}},function(a,b){a.exports=function(a){return"object"==typeof a?null!==a:"function"==typeof a}},function(a,b,c){a.exports=!c(4)&&!c(5)(function(){return 7!=Object.defineProperty(c(13)("div"),"a",{get:function(){return 7}}).a})},function(a,b,c){var d=c(11),e=c(2).document,f=d(e)&&d(e.createElement);a.exports=function(a){return f?e.createElement(a):{}}},function(a,b,c){var d=c(11);a.exports=function(a,b){if(!d(a))return a;var c,e;if(b&&"function"==typeof(c=a.toString)&&!d(e=c.call(a)))return e;if("function"==typeof(c=a.valueOf)&&!d(e=c.call(a)))return e;if(!b&&"function"==typeof(c=a.toString)&&!d(e=c.call(a)))return e;throw TypeError("Can't convert object to primitive value")}},function(a,b){a.exports=function(a,b){return{enumerable:!(1&a),configurable:!(2&a),writable:!(4&a),value:b}}},function(a,b,c){var d=c(2),e=c(8),f=c(3),g=c(17)("src"),h="toString",i=Function[h],j=(""+i).split(h);c(7).inspectSource=function(a){return i.call(a)},(a.exports=function(a,b,c,h){var i="function"==typeof c;i&&(f(c,"name")||e(c,"name",b)),a[b]!==c&&(i&&(f(c,g)||e(c,g,a[b]?""+a[b]:j.join(String(b)))),a===d?a[b]=c:h?a[b]?a[b]=c:e(a,b,c):(delete a[b],e(a,b,c)))})(Function.prototype,h,function toString(){return"function"==typeof this&&this[g]||i.call(this)})},function(a,b){var d=0,e=Math.random();a.exports=function(a){return"Symbol(".concat(a===c?"":a,")_",(++d+e).toString(36))}},function(a,b,d){var e=d(19);a.exports=function(a,b,d){if(e(a),b===c)return a;switch(d){case 1:return function(c){return a.call(b,c)};case 2:return function(c,d){return a.call(b,c,d)};case 3:return function(c,d,e){return a.call(b,c,d,e)}}return function(){return a.apply(b,arguments)}}},function(a,b){a.exports=function(a){if("function"!=typeof a)throw TypeError(a+" is not a function!");return a}},function(a,b,c){var d=c(17)("meta"),e=c(11),f=c(3),g=c(9).f,h=0,i=Object.isExtensible||function(){return!0},j=!c(5)(function(){return i(Object.preventExtensions({}))}),k=function(a){g(a,d,{value:{i:"O"+ ++h,w:{}}})},l=function(a,b){if(!e(a))return"symbol"==typeof a?a:("string"==typeof a?"S":"P")+a;if(!f(a,d)){if(!i(a))return"F";if(!b)return"E";k(a)}return a[d].i},m=function(a,b){if(!f(a,d)){if(!i(a))return!0;if(!b)return!1;k(a)}return a[d].w},n=function(a){return j&&o.NEED&&i(a)&&!f(a,d)&&k(a),a},o=a.exports={KEY:d,NEED:!1,fastKey:l,getWeak:m,onFreeze:n}},function(a,b,c){var d=c(2),e="__core-js_shared__",f=d[e]||(d[e]={});a.exports=function(a){return f[a]||(f[a]={})}},function(a,b,c){var d=c(9).f,e=c(3),f=c(23)("toStringTag");a.exports=function(a,b,c){a&&!e(a=c?a:a.prototype,f)&&d(a,f,{configurable:!0,value:b})}},function(a,b,c){var d=c(21)("wks"),e=c(17),f=c(2).Symbol,g="function"==typeof f,h=a.exports=function(a){return d[a]||(d[a]=g&&f[a]||(g?f:e)("Symbol."+a))};h.store=d},function(a,b,c){b.f=c(23)},function(a,b,c){var d=c(2),e=c(7),f=c(26),g=c(24),h=c(9).f;a.exports=function(a){var b=e.Symbol||(e.Symbol=f?{}:d.Symbol||{});"_"==a.charAt(0)||a in b||h(b,a,{value:g.f(a)})}},function(a,b){a.exports=!1},function(a,b,c){var d=c(28),e=c(30);a.exports=function(a,b){for(var c,f=e(a),g=d(f),h=g.length,i=0;h>i;)if(f[c=g[i++]]===b)return c}},function(a,b,c){var d=c(29),e=c(39);a.exports=Object.keys||function keys(a){return d(a,e)}},function(a,b,c){var d=c(3),e=c(30),f=c(34)(!1),g=c(38)("IE_PROTO");a.exports=function(a,b){var c,h=e(a),i=0,j=[];for(c in h)c!=g&&d(h,c)&&j.push(c);for(;b.length>i;)d(h,c=b[i++])&&(~f(j,c)||j.push(c));return j}},function(a,b,c){var d=c(31),e=c(33);a.exports=function(a){return d(e(a))}},function(a,b,c){var d=c(32);a.exports=Object("z").propertyIsEnumerable(0)?Object:function(a){return"String"==d(a)?a.split(""):Object(a)}},function(a,b){var c={}.toString;a.exports=function(a){return c.call(a).slice(8,-1)}},function(a,b){a.exports=function(a){if(a==c)throw TypeError("Can't call method on  "+a);return a}},function(a,b,c){var d=c(30),e=c(35),f=c(37);a.exports=function(a){return function(b,c,g){var h,i=d(b),j=e(i.length),k=f(g,j);if(a&&c!=c){for(;j>k;)if(h=i[k++],h!=h)return!0}else for(;j>k;k++)if((a||k in i)&&i[k]===c)return a||k||0;return!a&&-1}}},function(a,b,c){var d=c(36),e=Math.min;a.exports=function(a){return a>0?e(d(a),9007199254740991):0}},function(a,b){var c=Math.ceil,d=Math.floor;a.exports=function(a){return isNaN(a=+a)?0:(a>0?d:c)(a)}},function(a,b,c){var d=c(36),e=Math.max,f=Math.min;a.exports=function(a,b){return a=d(a),a<0?e(a+b,0):f(a,b)}},function(a,b,c){var d=c(21)("keys"),e=c(17);a.exports=function(a){return d[a]||(d[a]=e(a))}},function(a,b){a.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(a,b,c){var d=c(28),e=c(41),f=c(42);a.exports=function(a){var b=d(a),c=e.f;if(c)for(var g,h=c(a),i=f.f,j=0;h.length>j;)i.call(a,g=h[j++])&&b.push(g);return b}},function(a,b){b.f=Object.getOwnPropertySymbols},function(a,b){b.f={}.propertyIsEnumerable},function(a,b,c){var d=c(32);a.exports=Array.isArray||function isArray(a){return"Array"==d(a)}},function(a,b,d){var e=d(10),f=d(45),g=d(39),h=d(38)("IE_PROTO"),i=function(){},j="prototype",k=function(){var a,b=d(13)("iframe"),c=g.length,e="<",f=">";for(b.style.display="none",d(46).appendChild(b),b.src="javascript:",a=b.contentWindow.document,a.open(),a.write(e+"script"+f+"document.F=Object"+e+"/script"+f),a.close(),k=a.F;c--;)delete k[j][g[c]];return k()};a.exports=Object.create||function create(a,b){var d;return null!==a?(i[j]=e(a),d=new i,i[j]=null,d[h]=a):d=k(),b===c?d:f(d,b)}},function(a,b,c){var d=c(9),e=c(10),f=c(28);a.exports=c(4)?Object.defineProperties:function defineProperties(a,b){e(a);for(var c,g=f(b),h=g.length,i=0;h>i;)d.f(a,c=g[i++],b[c]);return a}},function(a,b,c){a.exports=c(2).document&&document.documentElement},function(a,b,c){var d=c(30),e=c(48).f,f={}.toString,g="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],h=function(a){try{return e(a)}catch(b){return g.slice()}};a.exports.f=function getOwnPropertyNames(a){return g&&"[object Window]"==f.call(a)?h(a):e(d(a))}},function(a,b,c){var d=c(29),e=c(39).concat("length","prototype");b.f=Object.getOwnPropertyNames||function getOwnPropertyNames(a){return d(a,e)}},function(a,b,c){var d=c(42),e=c(15),f=c(30),g=c(14),h=c(3),i=c(12),j=Object.getOwnPropertyDescriptor;b.f=c(4)?j:function getOwnPropertyDescriptor(a,b){if(a=f(a),b=g(b,!0),i)try{return j(a,b)}catch(c){}if(h(a,b))return e(!d.f.call(a,b),a[b])}},function(a,b,c){var d=c(6);d(d.S+d.F*!c(4),"Object",{defineProperty:c(9).f})},function(a,b,c){var d=c(6);d(d.S+d.F*!c(4),"Object",{defineProperties:c(45)})},function(a,b,c){var d=c(30),e=c(49).f;c(53)("getOwnPropertyDescriptor",function(){return function getOwnPropertyDescriptor(a,b){return e(d(a),b)}})},function(a,b,c){var d=c(6),e=c(7),f=c(5);a.exports=function(a,b){var c=(e.Object||{})[a]||Object[a],g={};g[a]=b(c),d(d.S+d.F*f(function(){c(1)}),"Object",g)}},function(a,b,c){var d=c(6);d(d.S,"Object",{create:c(44)})},function(a,b,c){var d=c(56),e=c(57);c(53)("getPrototypeOf",function(){return function getPrototypeOf(a){return e(d(a))}})},function(a,b,c){var d=c(33);a.exports=function(a){return Object(d(a))}},function(a,b,c){var d=c(3),e=c(56),f=c(38)("IE_PROTO"),g=Object.prototype;a.exports=Object.getPrototypeOf||function(a){return a=e(a),d(a,f)?a[f]:"function"==typeof a.constructor&&a instanceof a.constructor?a.constructor.prototype:a instanceof Object?g:null}},function(a,b,c){var d=c(56),e=c(28);c(53)("keys",function(){return function keys(a){return e(d(a))}})},function(a,b,c){c(53)("getOwnPropertyNames",function(){return c(47).f})},function(a,b,c){var d=c(11),e=c(20).onFreeze;c(53)("freeze",function(a){return function freeze(b){return a&&d(b)?a(e(b)):b}})},function(a,b,c){var d=c(11),e=c(20).onFreeze;c(53)("seal",function(a){return function seal(b){return a&&d(b)?a(e(b)):b}})},function(a,b,c){var d=c(11),e=c(20).onFreeze;c(53)("preventExtensions",function(a){return function preventExtensions(b){return a&&d(b)?a(e(b)):b}})},function(a,b,c){var d=c(11);c(53)("isFrozen",function(a){return function isFrozen(b){return!d(b)||!!a&&a(b)}})},function(a,b,c){var d=c(11);c(53)("isSealed",function(a){return function isSealed(b){return!d(b)||!!a&&a(b)}})},function(a,b,c){var d=c(11);c(53)("isExtensible",function(a){return function isExtensible(b){return!!d(b)&&(!a||a(b))}})},function(a,b,c){var d=c(6);d(d.S+d.F,"Object",{assign:c(67)})},function(a,b,c){var d=c(28),e=c(41),f=c(42),g=c(56),h=c(31),i=Object.assign;a.exports=!i||c(5)(function(){var a={},b={},c=Symbol(),d="abcdefghijklmnopqrst";return a[c]=7,d.split("").forEach(function(a){b[a]=a}),7!=i({},a)[c]||Object.keys(i({},b)).join("")!=d})?function assign(a,b){for(var c=g(a),i=arguments.length,j=1,k=e.f,l=f.f;i>j;)for(var m,n=h(arguments[j++]),o=k?d(n).concat(k(n)):d(n),p=o.length,q=0;p>q;)l.call(n,m=o[q++])&&(c[m]=n[m]);return c}:i},function(a,b,c){var d=c(6);d(d.S,"Object",{is:c(69)})},function(a,b){a.exports=Object.is||function is(a,b){return a===b?0!==a||1/a===1/b:a!=a&&b!=b}},function(a,b,c){var d=c(6);d(d.S,"Object",{setPrototypeOf:c(71).set})},function(a,b,d){var e=d(11),f=d(10),g=function(a,b){if(f(a),!e(b)&&null!==b)throw TypeError(b+": can't set as prototype!")};a.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(a,b,c){try{c=d(18)(Function.call,d(49).f(Object.prototype,"__proto__").set,2),c(a,[]),b=!(a instanceof Array)}catch(e){b=!0}return function setPrototypeOf(a,d){return g(a,d),b?a.__proto__=d:c(a,d),a}}({},!1):c),check:g}},function(a,b,c){var d=c(73),e={};e[c(23)("toStringTag")]="z",e+""!="[object z]"&&c(16)(Object.prototype,"toString",function toString(){return"[object "+d(this)+"]"},!0)},function(a,b,d){var e=d(32),f=d(23)("toStringTag"),g="Arguments"==e(function(){return arguments}()),h=function(a,b){try{return a[b]}catch(c){}};a.exports=function(a){var b,d,i;return a===c?"Undefined":null===a?"Null":"string"==typeof(d=h(b=Object(a),f))?d:g?e(b):"Object"==(i=e(b))&&"function"==typeof b.callee?"Arguments":i}},function(a,b,c){var d=c(6);d(d.P,"Function",{bind:c(75)})},function(a,b,c){var d=c(19),e=c(11),f=c(76),g=[].slice,h={},i=function(a,b,c){if(!(b in h)){for(var d=[],e=0;e<b;e++)d[e]="a["+e+"]";h[b]=Function("F,a","return new F("+d.join(",")+")")}return h[b](a,c)};a.exports=Function.bind||function bind(a){var b=d(this),c=g.call(arguments,1),h=function(){var d=c.concat(g.call(arguments));return this instanceof h?i(b,d.length,d):f(b,d,a)};return e(b.prototype)&&(h.prototype=b.prototype),h}},function(a,b){a.exports=function(a,b,d){var e=d===c;switch(b.length){case 0:return e?a():a.call(d);case 1:return e?a(b[0]):a.call(d,b[0]);case 2:return e?a(b[0],b[1]):a.call(d,b[0],b[1]);case 3:return e?a(b[0],b[1],b[2]):a.call(d,b[0],b[1],b[2]);case 4:return e?a(b[0],b[1],b[2],b[3]):a.call(d,b[0],b[1],b[2],b[3])}return a.apply(d,b)}},function(a,b,c){var d=c(9).f,e=c(15),f=c(3),g=Function.prototype,h=/^\s*function ([^ (]*)/,i="name",j=Object.isExtensible||function(){return!0};i in g||c(4)&&d(g,i,{configurable:!0,get:function(){try{var a=this,b=(""+a).match(h)[1];return f(a,i)||!j(a)||d(a,i,e(5,b)),b}catch(c){return""}}})},function(a,b,c){var d=c(11),e=c(57),f=c(23)("hasInstance"),g=Function.prototype;f in g||c(9).f(g,f,{value:function(a){if("function"!=typeof this||!d(a))return!1;if(!d(this.prototype))return a instanceof this;for(;a=e(a);)if(this.prototype===a)return!0;return!1}})},function(a,b,c){var d=c(2),e=c(3),f=c(32),g=c(80),h=c(14),i=c(5),j=c(48).f,k=c(49).f,l=c(9).f,m=c(81).trim,n="Number",o=d[n],p=o,q=o.prototype,r=f(c(44)(q))==n,s="trim"in String.prototype,t=function(a){var b=h(a,!1);if("string"==typeof b&&b.length>2){b=s?b.trim():m(b,3);var c,d,e,f=b.charCodeAt(0);if(43===f||45===f){if(c=b.charCodeAt(2),88===c||120===c)return NaN}else if(48===f){switch(b.charCodeAt(1)){case 66:case 98:d=2,e=49;break;case 79:case 111:d=8,e=55;break;default:return+b}for(var g,i=b.slice(2),j=0,k=i.length;j<k;j++)if(g=i.charCodeAt(j),g<48||g>e)return NaN;return parseInt(i,d)}}return+b};if(!o(" 0o1")||!o("0b1")||o("+0x1")){o=function Number(a){var b=arguments.length<1?0:a,c=this;return c instanceof o&&(r?i(function(){q.valueOf.call(c)}):f(c)!=n)?g(new p(t(b)),c,o):t(b)};for(var u,v=c(4)?j(p):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),w=0;v.length>w;w++)e(p,u=v[w])&&!e(o,u)&&l(o,u,k(p,u));o.prototype=q,q.constructor=o,c(16)(d,n,o)}},function(a,b,c){var d=c(11),e=c(71).set;a.exports=function(a,b,c){var f,g=b.constructor;return g!==c&&"function"==typeof g&&(f=g.prototype)!==c.prototype&&d(f)&&e&&e(a,f),a}},function(a,b,c){var d=c(6),e=c(33),f=c(5),g=c(82),h="["+g+"]",i="​",j=RegExp("^"+h+h+"*"),k=RegExp(h+h+"*$"),l=function(a,b,c){var e={},h=f(function(){return!!g[a]()||i[a]()!=i}),j=e[a]=h?b(m):g[a];c&&(e[c]=j),d(d.P+d.F*h,"String",e)},m=l.trim=function(a,b){return a=String(e(a)),1&b&&(a=a.replace(j,"")),2&b&&(a=a.replace(k,"")),a};a.exports=l},function(a,b){a.exports="\t\n\x0B\f\r   ᠎             　\u2028\u2029\ufeff"},function(a,b,c){var d=c(6),e=c(36),f=c(84),g=c(85),h=1..toFixed,i=Math.floor,j=[0,0,0,0,0,0],k="Number.toFixed: incorrect invocation!",l="0",m=function(a,b){for(var c=-1,d=b;++c<6;)d+=a*j[c],j[c]=d%1e7,d=i(d/1e7)},n=function(a){for(var b=6,c=0;--b>=0;)c+=j[b],j[b]=i(c/a),c=c%a*1e7},o=function(){for(var a=6,b="";--a>=0;)if(""!==b||0===a||0!==j[a]){var c=String(j[a]);b=""===b?c:b+g.call(l,7-c.length)+c}return b},p=function(a,b,c){return 0===b?c:b%2===1?p(a,b-1,c*a):p(a*a,b/2,c)},q=function(a){for(var b=0,c=a;c>=4096;)b+=12,c/=4096;for(;c>=2;)b+=1,c/=2;return b};d(d.P+d.F*(!!h&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!c(5)(function(){h.call({})})),"Number",{toFixed:function toFixed(a){var b,c,d,h,i=f(this,k),j=e(a),r="",s=l;if(j<0||j>20)throw RangeError(k);if(i!=i)return"NaN";if(i<=-1e21||i>=1e21)return String(i);if(i<0&&(r="-",i=-i),i>1e-21)if(b=q(i*p(2,69,1))-69,c=b<0?i*p(2,-b,1):i/p(2,b,1),c*=4503599627370496,b=52-b,b>0){for(m(0,c),d=j;d>=7;)m(1e7,0),d-=7;for(m(p(10,d,1),0),d=b-1;d>=23;)n(1<<23),d-=23;n(1<<d),m(1,1),n(2),s=o()}else m(0,c),m(1<<-b,0),s=o()+g.call(l,j);return j>0?(h=s.length,s=r+(h<=j?"0."+g.call(l,j-h)+s:s.slice(0,h-j)+"."+s.slice(h-j))):s=r+s,s}})},function(a,b,c){var d=c(32);a.exports=function(a,b){if("number"!=typeof a&&"Number"!=d(a))throw TypeError(b);return+a}},function(a,b,c){var d=c(36),e=c(33);a.exports=function repeat(a){var b=String(e(this)),c="",f=d(a);if(f<0||f==1/0)throw RangeError("Count can't be negative");for(;f>0;(f>>>=1)&&(b+=b))1&f&&(c+=b);return c}},function(a,b,d){var e=d(6),f=d(5),g=d(84),h=1..toPrecision;e(e.P+e.F*(f(function(){return"1"!==h.call(1,c)})||!f(function(){h.call({})})),"Number",{toPrecision:function toPrecision(a){var b=g(this,"Number#toPrecision: incorrect invocation!");return a===c?h.call(b):h.call(b,a)}})},function(a,b,c){var d=c(6);d(d.S,"Number",{EPSILON:Math.pow(2,-52)})},function(a,b,c){var d=c(6),e=c(2).isFinite;d(d.S,"Number",{isFinite:function isFinite(a){return"number"==typeof a&&e(a)}})},function(a,b,c){var d=c(6);d(d.S,"Number",{isInteger:c(90)})},function(a,b,c){var d=c(11),e=Math.floor;a.exports=function isInteger(a){return!d(a)&&isFinite(a)&&e(a)===a}},function(a,b,c){var d=c(6);d(d.S,"Number",{isNaN:function isNaN(a){return a!=a}})},function(a,b,c){var d=c(6),e=c(90),f=Math.abs;d(d.S,"Number",{isSafeInteger:function isSafeInteger(a){return e(a)&&f(a)<=9007199254740991}})},function(a,b,c){var d=c(6);d(d.S,"Number",{MAX_SAFE_INTEGER:9007199254740991})},function(a,b,c){var d=c(6);d(d.S,"Number",{MIN_SAFE_INTEGER:-9007199254740991})},function(a,b,c){var d=c(6),e=c(96);d(d.S+d.F*(Number.parseFloat!=e),"Number",{parseFloat:e})},function(a,b,c){var d=c(2).parseFloat,e=c(81).trim;a.exports=1/d(c(82)+"-0")!==-(1/0)?function parseFloat(a){var b=e(String(a),3),c=d(b);return 0===c&&"-"==b.charAt(0)?-0:c}:d},function(a,b,c){var d=c(6),e=c(98);d(d.S+d.F*(Number.parseInt!=e),"Number",{parseInt:e})},function(a,b,c){var d=c(2).parseInt,e=c(81).trim,f=c(82),g=/^[\-+]?0[xX]/;a.exports=8!==d(f+"08")||22!==d(f+"0x16")?function parseInt(a,b){var c=e(String(a),3);return d(c,b>>>0||(g.test(c)?16:10))}:d},function(a,b,c){var d=c(6),e=c(98);d(d.G+d.F*(parseInt!=e),{parseInt:e})},function(a,b,c){var d=c(6),e=c(96);d(d.G+d.F*(parseFloat!=e),{parseFloat:e})},function(a,b,c){var d=c(6),e=c(102),f=Math.sqrt,g=Math.acosh;d(d.S+d.F*!(g&&710==Math.floor(g(Number.MAX_VALUE))&&g(1/0)==1/0),"Math",{acosh:function acosh(a){return(a=+a)<1?NaN:a>94906265.62425156?Math.log(a)+Math.LN2:e(a-1+f(a-1)*f(a+1))}})},function(a,b){a.exports=Math.log1p||function log1p(a){return(a=+a)>-1e-8&&a<1e-8?a-a*a/2:Math.log(1+a)}},function(a,b,c){function asinh(a){return isFinite(a=+a)&&0!=a?a<0?-asinh(-a):Math.log(a+Math.sqrt(a*a+1)):a}var d=c(6),e=Math.asinh;d(d.S+d.F*!(e&&1/e(0)>0),"Math",{asinh:asinh})},function(a,b,c){var d=c(6),e=Math.atanh;d(d.S+d.F*!(e&&1/e(-0)<0),"Math",{atanh:function atanh(a){return 0==(a=+a)?a:Math.log((1+a)/(1-a))/2}})},function(a,b,c){var d=c(6),e=c(106);d(d.S,"Math",{cbrt:function cbrt(a){return e(a=+a)*Math.pow(Math.abs(a),1/3)}})},function(a,b){a.exports=Math.sign||function sign(a){return 0==(a=+a)||a!=a?a:a<0?-1:1}},function(a,b,c){var d=c(6);d(d.S,"Math",{clz32:function clz32(a){return(a>>>=0)?31-Math.floor(Math.log(a+.5)*Math.LOG2E):32}})},function(a,b,c){var d=c(6),e=Math.exp;d(d.S,"Math",{cosh:function cosh(a){return(e(a=+a)+e(-a))/2}})},function(a,b,c){var d=c(6),e=c(110);d(d.S+d.F*(e!=Math.expm1),"Math",{expm1:e})},function(a,b){var c=Math.expm1;a.exports=!c||c(10)>22025.465794806718||c(10)<22025.465794806718||c(-2e-17)!=-2e-17?function expm1(a){return 0==(a=+a)?a:a>-1e-6&&a<1e-6?a+a*a/2:Math.exp(a)-1}:c},function(a,b,c){var d=c(6),e=c(106),f=Math.pow,g=f(2,-52),h=f(2,-23),i=f(2,127)*(2-h),j=f(2,-126),k=function(a){return a+1/g-1/g};d(d.S,"Math",{fround:function fround(a){var b,c,d=Math.abs(a),f=e(a);return d<j?f*k(d/j/h)*j*h:(b=(1+h/g)*d,c=b-(b-d),c>i||c!=c?f*(1/0):f*c)}})},function(a,b,c){var d=c(6),e=Math.abs;d(d.S,"Math",{hypot:function hypot(a,b){for(var c,d,f=0,g=0,h=arguments.length,i=0;g<h;)c=e(arguments[g++]),i<c?(d=i/c,f=f*d*d+1,i=c):c>0?(d=c/i,f+=d*d):f+=c;return i===1/0?1/0:i*Math.sqrt(f)}})},function(a,b,c){var d=c(6),e=Math.imul;d(d.S+d.F*c(5)(function(){return e(4294967295,5)!=-5||2!=e.length}),"Math",{imul:function imul(a,b){var c=65535,d=+a,e=+b,f=c&d,g=c&e;return 0|f*g+((c&d>>>16)*g+f*(c&e>>>16)<<16>>>0)}})},function(a,b,c){var d=c(6);d(d.S,"Math",{log10:function log10(a){return Math.log(a)/Math.LN10}})},function(a,b,c){var d=c(6);d(d.S,"Math",{log1p:c(102)})},function(a,b,c){var d=c(6);d(d.S,"Math",{log2:function log2(a){return Math.log(a)/Math.LN2}})},function(a,b,c){var d=c(6);d(d.S,"Math",{sign:c(106)})},function(a,b,c){var d=c(6),e=c(110),f=Math.exp;d(d.S+d.F*c(5)(function(){return!Math.sinh(-2e-17)!=-2e-17}),"Math",{sinh:function sinh(a){return Math.abs(a=+a)<1?(e(a)-e(-a))/2:(f(a-1)-f(-a-1))*(Math.E/2)}})},function(a,b,c){var d=c(6),e=c(110),f=Math.exp;d(d.S,"Math",{tanh:function tanh(a){var b=e(a=+a),c=e(-a);return b==1/0?1:c==1/0?-1:(b-c)/(f(a)+f(-a))}})},function(a,b,c){var d=c(6);d(d.S,"Math",{trunc:function trunc(a){return(a>0?Math.floor:Math.ceil)(a)}})},function(a,b,c){var d=c(6),e=c(37),f=String.fromCharCode,g=String.fromCodePoint;d(d.S+d.F*(!!g&&1!=g.length),"String",{fromCodePoint:function fromCodePoint(a){for(var b,c=[],d=arguments.length,g=0;d>g;){if(b=+arguments[g++],e(b,1114111)!==b)throw RangeError(b+" is not a valid code point");c.push(b<65536?f(b):f(((b-=65536)>>10)+55296,b%1024+56320))}return c.join("")}})},function(a,b,c){var d=c(6),e=c(30),f=c(35);d(d.S,"String",{raw:function raw(a){for(var b=e(a.raw),c=f(b.length),d=arguments.length,g=[],h=0;c>h;)g.push(String(b[h++])),h<d&&g.push(String(arguments[h]));return g.join("")}})},function(a,b,c){c(81)("trim",function(a){return function trim(){return a(this,3)}})},function(a,b,c){var d=c(6),e=c(125)(!1);d(d.P,"String",{codePointAt:function codePointAt(a){return e(this,a)}})},function(a,b,d){var e=d(36),f=d(33);a.exports=function(a){return function(b,d){var g,h,i=String(f(b)),j=e(d),k=i.length;return j<0||j>=k?a?"":c:(g=i.charCodeAt(j),g<55296||g>56319||j+1===k||(h=i.charCodeAt(j+1))<56320||h>57343?a?i.charAt(j):g:a?i.slice(j,j+2):(g-55296<<10)+(h-56320)+65536)}}},function(a,b,d){var e=d(6),f=d(35),g=d(127),h="endsWith",i=""[h];e(e.P+e.F*d(129)(h),"String",{endsWith:function endsWith(a){var b=g(this,a,h),d=arguments.length>1?arguments[1]:c,e=f(b.length),j=d===c?e:Math.min(f(d),e),k=String(a);return i?i.call(b,k,j):b.slice(j-k.length,j)===k}})},function(a,b,c){var d=c(128),e=c(33);a.exports=function(a,b,c){if(d(b))throw TypeError("String#"+c+" doesn't accept regex!");return String(e(a))}},function(a,b,d){var e=d(11),f=d(32),g=d(23)("match");a.exports=function(a){var b;return e(a)&&((b=a[g])!==c?!!b:"RegExp"==f(a))}},function(a,b,c){var d=c(23)("match");a.exports=function(a){var b=/./;try{"/./"[a](b)}catch(c){try{return b[d]=!1,!"/./"[a](b)}catch(e){}}return!0}},function(a,b,d){var e=d(6),f=d(127),g="includes";e(e.P+e.F*d(129)(g),"String",{includes:function includes(a){return!!~f(this,a,g).indexOf(a,arguments.length>1?arguments[1]:c)}})},function(a,b,c){var d=c(6);d(d.P,"String",{repeat:c(85)})},function(a,b,d){var e=d(6),f=d(35),g=d(127),h="startsWith",i=""[h];e(e.P+e.F*d(129)(h),"String",{startsWith:function startsWith(a){var b=g(this,a,h),d=f(Math.min(arguments.length>1?arguments[1]:c,b.length)),e=String(a);return i?i.call(b,e,d):b.slice(d,d+e.length)===e}})},function(a,b,d){var e=d(125)(!0);d(134)(String,"String",function(a){this._t=String(a),this._i=0},function(){var a,b=this._t,d=this._i;return d>=b.length?{value:c,done:!0}:(a=e(b,d),this._i+=a.length,{value:a,done:!1})})},function(a,b,d){var e=d(26),f=d(6),g=d(16),h=d(8),i=d(3),j=d(135),k=d(136),l=d(22),m=d(57),n=d(23)("iterator"),o=!([].keys&&"next"in[].keys()),p="@@iterator",q="keys",r="values",s=function(){return this};a.exports=function(a,b,d,t,u,v,w){k(d,b,t);var x,y,z,A=function(a){if(!o&&a in E)return E[a];switch(a){case q:return function keys(){return new d(this,a)};case r:return function values(){return new d(this,a)}}return function entries(){return new d(this,a)}},B=b+" Iterator",C=u==r,D=!1,E=a.prototype,F=E[n]||E[p]||u&&E[u],G=F||A(u),H=u?C?A("entries"):G:c,I="Array"==b?E.entries||F:F;if(I&&(z=m(I.call(new a)),z!==Object.prototype&&(l(z,B,!0),e||i(z,n)||h(z,n,s))),C&&F&&F.name!==r&&(D=!0,G=function values(){return F.call(this)}),e&&!w||!o&&!D&&E[n]||h(E,n,G),j[b]=G,j[B]=s,u)if(x={values:C?G:A(r),keys:v?G:A(q),entries:H},w)for(y in x)y in E||g(E,y,x[y]);else f(f.P+f.F*(o||D),b,x);return x}},function(a,b){a.exports={}},function(a,b,c){var d=c(44),e=c(15),f=c(22),g={};c(8)(g,c(23)("iterator"),function(){return this}),a.exports=function(a,b,c){a.prototype=d(g,{next:e(1,c)}),f(a,b+" Iterator")}},function(a,b,c){c(138)("anchor",function(a){return function anchor(b){return a(this,"a","name",b)}})},function(a,b,c){var d=c(6),e=c(5),f=c(33),g=/"/g,h=function(a,b,c,d){var e=String(f(a)),h="<"+b;return""!==c&&(h+=" "+c+'="'+String(d).replace(g,"&quot;")+'"'),h+">"+e+"</"+b+">"};a.exports=function(a,b){var c={};c[a]=b(h),d(d.P+d.F*e(function(){var b=""[a]('"');return b!==b.toLowerCase()||b.split('"').length>3}),"String",c)}},function(a,b,c){c(138)("big",function(a){return function big(){return a(this,"big","","")}})},function(a,b,c){c(138)("blink",function(a){return function blink(){return a(this,"blink","","")}})},function(a,b,c){c(138)("bold",function(a){return function bold(){return a(this,"b","","")}})},function(a,b,c){c(138)("fixed",function(a){return function fixed(){return a(this,"tt","","")}})},function(a,b,c){c(138)("fontcolor",function(a){return function fontcolor(b){return a(this,"font","color",b)}})},function(a,b,c){c(138)("fontsize",function(a){return function fontsize(b){return a(this,"font","size",b)}})},function(a,b,c){c(138)("italics",function(a){return function italics(){return a(this,"i","","")}})},function(a,b,c){c(138)("link",function(a){return function link(b){return a(this,"a","href",b)}})},function(a,b,c){c(138)("small",function(a){return function small(){return a(this,"small","","")}})},function(a,b,c){c(138)("strike",function(a){return function strike(){return a(this,"strike","","")}})},function(a,b,c){c(138)("sub",function(a){return function sub(){return a(this,"sub","","")}})},function(a,b,c){c(138)("sup",function(a){return function sup(){return a(this,"sup","","")}})},function(a,b,c){var d=c(6);d(d.S,"Array",{isArray:c(43)})},function(a,b,d){var e=d(18),f=d(6),g=d(56),h=d(153),i=d(154),j=d(35),k=d(155),l=d(156);f(f.S+f.F*!d(157)(function(a){Array.from(a)}),"Array",{from:function from(a){var b,d,f,m,n=g(a),o="function"==typeof this?this:Array,p=arguments.length,q=p>1?arguments[1]:c,r=q!==c,s=0,t=l(n);if(r&&(q=e(q,p>2?arguments[2]:c,2)),t==c||o==Array&&i(t))for(b=j(n.length),d=new o(b);b>s;s++)k(d,s,r?q(n[s],s):n[s]);else for(m=t.call(n),d=new o;!(f=m.next()).done;s++)k(d,s,r?h(m,q,[f.value,s],!0):f.value);return d.length=s,d}})},function(a,b,d){var e=d(10);a.exports=function(a,b,d,f){try{return f?b(e(d)[0],d[1]):b(d)}catch(g){var h=a["return"];throw h!==c&&e(h.call(a)),g}}},function(a,b,d){var e=d(135),f=d(23)("iterator"),g=Array.prototype;a.exports=function(a){return a!==c&&(e.Array===a||g[f]===a)}},function(a,b,c){var d=c(9),e=c(15);a.exports=function(a,b,c){b in a?d.f(a,b,e(0,c)):a[b]=c}},function(a,b,d){var e=d(73),f=d(23)("iterator"),g=d(135);a.exports=d(7).getIteratorMethod=function(a){if(a!=c)return a[f]||a["@@iterator"]||g[e(a)]}},function(a,b,c){var d=c(23)("iterator"),e=!1;
try{var f=[7][d]();f["return"]=function(){e=!0},Array.from(f,function(){throw 2})}catch(g){}a.exports=function(a,b){if(!b&&!e)return!1;var c=!1;try{var f=[7],g=f[d]();g.next=function(){return{done:c=!0}},f[d]=function(){return g},a(f)}catch(h){}return c}},function(a,b,c){var d=c(6),e=c(155);d(d.S+d.F*c(5)(function(){function F(){}return!(Array.of.call(F)instanceof F)}),"Array",{of:function of(){for(var a=0,b=arguments.length,c=new("function"==typeof this?this:Array)(b);b>a;)e(c,a,arguments[a++]);return c.length=b,c}})},function(a,b,d){var e=d(6),f=d(30),g=[].join;e(e.P+e.F*(d(31)!=Object||!d(160)(g)),"Array",{join:function join(a){return g.call(f(this),a===c?",":a)}})},function(a,b,c){var d=c(5);a.exports=function(a,b){return!!a&&d(function(){b?a.call(null,function(){},1):a.call(null)})}},function(a,b,d){var e=d(6),f=d(46),g=d(32),h=d(37),i=d(35),j=[].slice;e(e.P+e.F*d(5)(function(){f&&j.call(f)}),"Array",{slice:function slice(a,b){var d=i(this.length),e=g(this);if(b=b===c?d:b,"Array"==e)return j.call(this,a,b);for(var f=h(a,d),k=h(b,d),l=i(k-f),m=Array(l),n=0;n<l;n++)m[n]="String"==e?this.charAt(f+n):this[f+n];return m}})},function(a,b,d){var e=d(6),f=d(19),g=d(56),h=d(5),i=[].sort,j=[1,2,3];e(e.P+e.F*(h(function(){j.sort(c)})||!h(function(){j.sort(null)})||!d(160)(i)),"Array",{sort:function sort(a){return a===c?i.call(g(this)):i.call(g(this),f(a))}})},function(a,b,c){var d=c(6),e=c(164)(0),f=c(160)([].forEach,!0);d(d.P+d.F*!f,"Array",{forEach:function forEach(a){return e(this,a,arguments[1])}})},function(a,b,d){var e=d(18),f=d(31),g=d(56),h=d(35),i=d(165);a.exports=function(a,b){var d=1==a,j=2==a,k=3==a,l=4==a,m=6==a,n=5==a||m,o=b||i;return function(b,i,p){for(var q,r,s=g(b),t=f(s),u=e(i,p,3),v=h(t.length),w=0,x=d?o(b,v):j?o(b,0):c;v>w;w++)if((n||w in t)&&(q=t[w],r=u(q,w,s),a))if(d)x[w]=r;else if(r)switch(a){case 3:return!0;case 5:return q;case 6:return w;case 2:x.push(q)}else if(l)return!1;return m?-1:k||l?l:x}}},function(a,b,c){var d=c(166);a.exports=function(a,b){return new(d(a))(b)}},function(a,b,d){var e=d(11),f=d(43),g=d(23)("species");a.exports=function(a){var b;return f(a)&&(b=a.constructor,"function"!=typeof b||b!==Array&&!f(b.prototype)||(b=c),e(b)&&(b=b[g],null===b&&(b=c))),b===c?Array:b}},function(a,b,c){var d=c(6),e=c(164)(1);d(d.P+d.F*!c(160)([].map,!0),"Array",{map:function map(a){return e(this,a,arguments[1])}})},function(a,b,c){var d=c(6),e=c(164)(2);d(d.P+d.F*!c(160)([].filter,!0),"Array",{filter:function filter(a){return e(this,a,arguments[1])}})},function(a,b,c){var d=c(6),e=c(164)(3);d(d.P+d.F*!c(160)([].some,!0),"Array",{some:function some(a){return e(this,a,arguments[1])}})},function(a,b,c){var d=c(6),e=c(164)(4);d(d.P+d.F*!c(160)([].every,!0),"Array",{every:function every(a){return e(this,a,arguments[1])}})},function(a,b,c){var d=c(6),e=c(172);d(d.P+d.F*!c(160)([].reduce,!0),"Array",{reduce:function reduce(a){return e(this,a,arguments.length,arguments[1],!1)}})},function(a,b,c){var d=c(19),e=c(56),f=c(31),g=c(35);a.exports=function(a,b,c,h,i){d(b);var j=e(a),k=f(j),l=g(j.length),m=i?l-1:0,n=i?-1:1;if(c<2)for(;;){if(m in k){h=k[m],m+=n;break}if(m+=n,i?m<0:l<=m)throw TypeError("Reduce of empty array with no initial value")}for(;i?m>=0:l>m;m+=n)m in k&&(h=b(h,k[m],m,j));return h}},function(a,b,c){var d=c(6),e=c(172);d(d.P+d.F*!c(160)([].reduceRight,!0),"Array",{reduceRight:function reduceRight(a){return e(this,a,arguments.length,arguments[1],!0)}})},function(a,b,c){var d=c(6),e=c(34)(!1),f=[].indexOf,g=!!f&&1/[1].indexOf(1,-0)<0;d(d.P+d.F*(g||!c(160)(f)),"Array",{indexOf:function indexOf(a){return g?f.apply(this,arguments)||0:e(this,a,arguments[1])}})},function(a,b,c){var d=c(6),e=c(30),f=c(36),g=c(35),h=[].lastIndexOf,i=!!h&&1/[1].lastIndexOf(1,-0)<0;d(d.P+d.F*(i||!c(160)(h)),"Array",{lastIndexOf:function lastIndexOf(a){if(i)return h.apply(this,arguments)||0;var b=e(this),c=g(b.length),d=c-1;for(arguments.length>1&&(d=Math.min(d,f(arguments[1]))),d<0&&(d=c+d);d>=0;d--)if(d in b&&b[d]===a)return d||0;return-1}})},function(a,b,c){var d=c(6);d(d.P,"Array",{copyWithin:c(177)}),c(178)("copyWithin")},function(a,b,d){var e=d(56),f=d(37),g=d(35);a.exports=[].copyWithin||function copyWithin(a,b){var d=e(this),h=g(d.length),i=f(a,h),j=f(b,h),k=arguments.length>2?arguments[2]:c,l=Math.min((k===c?h:f(k,h))-j,h-i),m=1;for(j<i&&i<j+l&&(m=-1,j+=l-1,i+=l-1);l-- >0;)j in d?d[i]=d[j]:delete d[i],i+=m,j+=m;return d}},function(a,b,d){var e=d(23)("unscopables"),f=Array.prototype;f[e]==c&&d(8)(f,e,{}),a.exports=function(a){f[e][a]=!0}},function(a,b,c){var d=c(6);d(d.P,"Array",{fill:c(180)}),c(178)("fill")},function(a,b,d){var e=d(56),f=d(37),g=d(35);a.exports=function fill(a){for(var b=e(this),d=g(b.length),h=arguments.length,i=f(h>1?arguments[1]:c,d),j=h>2?arguments[2]:c,k=j===c?d:f(j,d);k>i;)b[i++]=a;return b}},function(a,b,d){var e=d(6),f=d(164)(5),g="find",h=!0;g in[]&&Array(1)[g](function(){h=!1}),e(e.P+e.F*h,"Array",{find:function find(a){return f(this,a,arguments.length>1?arguments[1]:c)}}),d(178)(g)},function(a,b,d){var e=d(6),f=d(164)(6),g="findIndex",h=!0;g in[]&&Array(1)[g](function(){h=!1}),e(e.P+e.F*h,"Array",{findIndex:function findIndex(a){return f(this,a,arguments.length>1?arguments[1]:c)}}),d(178)(g)},function(a,b,d){var e=d(178),f=d(184),g=d(135),h=d(30);a.exports=d(134)(Array,"Array",function(a,b){this._t=h(a),this._i=0,this._k=b},function(){var a=this._t,b=this._k,d=this._i++;return!a||d>=a.length?(this._t=c,f(1)):"keys"==b?f(0,d):"values"==b?f(0,a[d]):f(0,[d,a[d]])},"values"),g.Arguments=g.Array,e("keys"),e("values"),e("entries")},function(a,b){a.exports=function(a,b){return{value:b,done:!!a}}},function(a,b,c){c(186)("Array")},function(a,b,c){var d=c(2),e=c(9),f=c(4),g=c(23)("species");a.exports=function(a){var b=d[a];f&&b&&!b[g]&&e.f(b,g,{configurable:!0,get:function(){return this}})}},function(a,b,d){var e=d(2),f=d(80),g=d(9).f,h=d(48).f,i=d(128),j=d(188),k=e.RegExp,l=k,m=k.prototype,n=/a/g,o=/a/g,p=new k(n)!==n;if(d(4)&&(!p||d(5)(function(){return o[d(23)("match")]=!1,k(n)!=n||k(o)==o||"/a/i"!=k(n,"i")}))){k=function RegExp(a,b){var d=this instanceof k,e=i(a),g=b===c;return!d&&e&&a.constructor===k&&g?a:f(p?new l(e&&!g?a.source:a,b):l((e=a instanceof k)?a.source:a,e&&g?j.call(a):b),d?this:m,k)};for(var q=(function(a){a in k||g(k,a,{configurable:!0,get:function(){return l[a]},set:function(b){l[a]=b}})}),r=h(l),s=0;r.length>s;)q(r[s++]);m.constructor=k,k.prototype=m,d(16)(e,"RegExp",k)}d(186)("RegExp")},function(a,b,c){var d=c(10);a.exports=function(){var a=d(this),b="";return a.global&&(b+="g"),a.ignoreCase&&(b+="i"),a.multiline&&(b+="m"),a.unicode&&(b+="u"),a.sticky&&(b+="y"),b}},function(a,b,d){d(190);var e=d(10),f=d(188),g=d(4),h="toString",i=/./[h],j=function(a){d(16)(RegExp.prototype,h,a,!0)};d(5)(function(){return"/a/b"!=i.call({source:"a",flags:"b"})})?j(function toString(){var a=e(this);return"/".concat(a.source,"/","flags"in a?a.flags:!g&&a instanceof RegExp?f.call(a):c)}):i.name!=h&&j(function toString(){return i.call(this)})},function(a,b,c){c(4)&&"g"!=/./g.flags&&c(9).f(RegExp.prototype,"flags",{configurable:!0,get:c(188)})},function(a,b,d){d(192)("match",1,function(a,b,d){return[function match(d){var e=a(this),f=d==c?c:d[b];return f!==c?f.call(d,e):new RegExp(d)[b](String(e))},d]})},function(a,b,c){var d=c(8),e=c(16),f=c(5),g=c(33),h=c(23);a.exports=function(a,b,c){var i=h(a),j=c(g,i,""[a]),k=j[0],l=j[1];f(function(){var b={};return b[i]=function(){return 7},7!=""[a](b)})&&(e(String.prototype,a,k),d(RegExp.prototype,i,2==b?function(a,b){return l.call(a,this,b)}:function(a){return l.call(a,this)}))}},function(a,b,d){d(192)("replace",2,function(a,b,d){return[function replace(e,f){var g=a(this),h=e==c?c:e[b];return h!==c?h.call(e,g,f):d.call(String(g),e,f)},d]})},function(a,b,d){d(192)("search",1,function(a,b,d){return[function search(d){var e=a(this),f=d==c?c:d[b];return f!==c?f.call(d,e):new RegExp(d)[b](String(e))},d]})},function(a,b,d){d(192)("split",2,function(a,b,e){var f=d(128),g=e,h=[].push,i="split",j="length",k="lastIndex";if("c"=="abbc"[i](/(b)*/)[1]||4!="test"[i](/(?:)/,-1)[j]||2!="ab"[i](/(?:ab)*/)[j]||4!="."[i](/(.?)(.?)/)[j]||"."[i](/()()/)[j]>1||""[i](/.?/)[j]){var l=/()??/.exec("")[1]===c;e=function(a,b){var d=String(this);if(a===c&&0===b)return[];if(!f(a))return g.call(d,a,b);var e,i,m,n,o,p=[],q=(a.ignoreCase?"i":"")+(a.multiline?"m":"")+(a.unicode?"u":"")+(a.sticky?"y":""),r=0,s=b===c?4294967295:b>>>0,t=new RegExp(a.source,q+"g");for(l||(e=new RegExp("^"+t.source+"$(?!\\s)",q));(i=t.exec(d))&&(m=i.index+i[0][j],!(m>r&&(p.push(d.slice(r,i.index)),!l&&i[j]>1&&i[0].replace(e,function(){for(o=1;o<arguments[j]-2;o++)arguments[o]===c&&(i[o]=c)}),i[j]>1&&i.index<d[j]&&h.apply(p,i.slice(1)),n=i[0][j],r=m,p[j]>=s)));)t[k]===i.index&&t[k]++;return r===d[j]?!n&&t.test("")||p.push(""):p.push(d.slice(r)),p[j]>s?p.slice(0,s):p}}else"0"[i](c,0)[j]&&(e=function(a,b){return a===c&&0===b?[]:g.call(this,a,b)});return[function split(d,f){var g=a(this),h=d==c?c:d[b];return h!==c?h.call(d,g,f):e.call(String(g),d,f)},e]})},function(a,b,d){var e,f,g,h=d(26),i=d(2),j=d(18),k=d(73),l=d(6),m=d(11),n=d(19),o=d(197),p=d(198),q=d(199),r=d(200).set,s=d(201)(),t="Promise",u=i.TypeError,v=i.process,w=i[t],v=i.process,x="process"==k(v),y=function(){},z=!!function(){try{var a=w.resolve(1),b=(a.constructor={})[d(23)("species")]=function(a){a(y,y)};return(x||"function"==typeof PromiseRejectionEvent)&&a.then(y)instanceof b}catch(c){}}(),A=function(a,b){return a===b||a===w&&b===g},B=function(a){var b;return!(!m(a)||"function"!=typeof(b=a.then))&&b},C=function(a){return A(w,a)?new D(a):new f(a)},D=f=function(a){var b,d;this.promise=new a(function(a,e){if(b!==c||d!==c)throw u("Bad Promise constructor");b=a,d=e}),this.resolve=n(b),this.reject=n(d)},E=function(a){try{a()}catch(b){return{error:b}}},F=function(a,b){if(!a._n){a._n=!0;var c=a._c;s(function(){for(var d=a._v,e=1==a._s,f=0,g=function(b){var c,f,g=e?b.ok:b.fail,h=b.resolve,i=b.reject,j=b.domain;try{g?(e||(2==a._h&&I(a),a._h=1),g===!0?c=d:(j&&j.enter(),c=g(d),j&&j.exit()),c===b.promise?i(u("Promise-chain cycle")):(f=B(c))?f.call(c,h,i):h(c)):i(d)}catch(k){i(k)}};c.length>f;)g(c[f++]);a._c=[],a._n=!1,b&&!a._h&&G(a)})}},G=function(a){r.call(i,function(){var b,d,e,f=a._v;if(H(a)&&(b=E(function(){x?v.emit("unhandledRejection",f,a):(d=i.onunhandledrejection)?d({promise:a,reason:f}):(e=i.console)&&e.error&&e.error("Unhandled promise rejection",f)}),a._h=x||H(a)?2:1),a._a=c,b)throw b.error})},H=function(a){if(1==a._h)return!1;for(var b,c=a._a||a._c,d=0;c.length>d;)if(b=c[d++],b.fail||!H(b.promise))return!1;return!0},I=function(a){r.call(i,function(){var b;x?v.emit("rejectionHandled",a):(b=i.onrejectionhandled)&&b({promise:a,reason:a._v})})},J=function(a){var b=this;b._d||(b._d=!0,b=b._w||b,b._v=a,b._s=2,b._a||(b._a=b._c.slice()),F(b,!0))},K=function(a){var b,c=this;if(!c._d){c._d=!0,c=c._w||c;try{if(c===a)throw u("Promise can't be resolved itself");(b=B(a))?s(function(){var d={_w:c,_d:!1};try{b.call(a,j(K,d,1),j(J,d,1))}catch(e){J.call(d,e)}}):(c._v=a,c._s=1,F(c,!1))}catch(d){J.call({_w:c,_d:!1},d)}}};z||(w=function Promise(a){o(this,w,t,"_h"),n(a),e.call(this);try{a(j(K,this,1),j(J,this,1))}catch(b){J.call(this,b)}},e=function Promise(a){this._c=[],this._a=c,this._s=0,this._d=!1,this._v=c,this._h=0,this._n=!1},e.prototype=d(202)(w.prototype,{then:function then(a,b){var d=C(q(this,w));return d.ok="function"!=typeof a||a,d.fail="function"==typeof b&&b,d.domain=x?v.domain:c,this._c.push(d),this._a&&this._a.push(d),this._s&&F(this,!1),d.promise},"catch":function(a){return this.then(c,a)}}),D=function(){var a=new e;this.promise=a,this.resolve=j(K,a,1),this.reject=j(J,a,1)}),l(l.G+l.W+l.F*!z,{Promise:w}),d(22)(w,t),d(186)(t),g=d(7)[t],l(l.S+l.F*!z,t,{reject:function reject(a){var b=C(this),c=b.reject;return c(a),b.promise}}),l(l.S+l.F*(h||!z),t,{resolve:function resolve(a){if(a instanceof w&&A(a.constructor,this))return a;var b=C(this),c=b.resolve;return c(a),b.promise}}),l(l.S+l.F*!(z&&d(157)(function(a){w.all(a)["catch"](y)})),t,{all:function all(a){var b=this,d=C(b),e=d.resolve,f=d.reject,g=E(function(){var d=[],g=0,h=1;p(a,!1,function(a){var i=g++,j=!1;d.push(c),h++,b.resolve(a).then(function(a){j||(j=!0,d[i]=a,--h||e(d))},f)}),--h||e(d)});return g&&f(g.error),d.promise},race:function race(a){var b=this,c=C(b),d=c.reject,e=E(function(){p(a,!1,function(a){b.resolve(a).then(c.resolve,d)})});return e&&d(e.error),c.promise}})},function(a,b){a.exports=function(a,b,d,e){if(!(a instanceof b)||e!==c&&e in a)throw TypeError(d+": incorrect invocation!");return a}},function(a,b,c){var d=c(18),e=c(153),f=c(154),g=c(10),h=c(35),i=c(156),j={},k={},b=a.exports=function(a,b,c,l,m){var n,o,p,q,r=m?function(){return a}:i(a),s=d(c,l,b?2:1),t=0;if("function"!=typeof r)throw TypeError(a+" is not iterable!");if(f(r)){for(n=h(a.length);n>t;t++)if(q=b?s(g(o=a[t])[0],o[1]):s(a[t]),q===j||q===k)return q}else for(p=r.call(a);!(o=p.next()).done;)if(q=e(p,s,o.value,b),q===j||q===k)return q};b.BREAK=j,b.RETURN=k},function(a,b,d){var e=d(10),f=d(19),g=d(23)("species");a.exports=function(a,b){var d,h=e(a).constructor;return h===c||(d=e(h)[g])==c?b:f(d)}},function(a,b,c){var d,e,f,g=c(18),h=c(76),i=c(46),j=c(13),k=c(2),l=k.process,m=k.setImmediate,n=k.clearImmediate,o=k.MessageChannel,p=0,q={},r="onreadystatechange",s=function(){var a=+this;if(q.hasOwnProperty(a)){var b=q[a];delete q[a],b()}},t=function(a){s.call(a.data)};m&&n||(m=function setImmediate(a){for(var b=[],c=1;arguments.length>c;)b.push(arguments[c++]);return q[++p]=function(){h("function"==typeof a?a:Function(a),b)},d(p),p},n=function clearImmediate(a){delete q[a]},"process"==c(32)(l)?d=function(a){l.nextTick(g(s,a,1))}:o?(e=new o,f=e.port2,e.port1.onmessage=t,d=g(f.postMessage,f,1)):k.addEventListener&&"function"==typeof postMessage&&!k.importScripts?(d=function(a){k.postMessage(a+"","*")},k.addEventListener("message",t,!1)):d=r in j("script")?function(a){i.appendChild(j("script"))[r]=function(){i.removeChild(this),s.call(a)}}:function(a){setTimeout(g(s,a,1),0)}),a.exports={set:m,clear:n}},function(a,b,d){var e=d(2),f=d(200).set,g=e.MutationObserver||e.WebKitMutationObserver,h=e.process,i=e.Promise,j="process"==d(32)(h);a.exports=function(){var a,b,d,k=function(){var e,f;for(j&&(e=h.domain)&&e.exit();a;){f=a.fn,a=a.next;try{f()}catch(g){throw a?d():b=c,g}}b=c,e&&e.enter()};if(j)d=function(){h.nextTick(k)};else if(g){var l=!0,m=document.createTextNode("");new g(k).observe(m,{characterData:!0}),d=function(){m.data=l=!l}}else if(i&&i.resolve){var n=i.resolve();d=function(){n.then(k)}}else d=function(){f.call(e,k)};return function(e){var f={fn:e,next:c};b&&(b.next=f),a||(a=f,d()),b=f}}},function(a,b,c){var d=c(16);a.exports=function(a,b,c){for(var e in b)d(a,e,b[e],c);return a}},function(a,b,d){var e=d(204);a.exports=d(205)("Map",function(a){return function Map(){return a(this,arguments.length>0?arguments[0]:c)}},{get:function get(a){var b=e.getEntry(this,a);return b&&b.v},set:function set(a,b){return e.def(this,0===a?0:a,b)}},e,!0)},function(a,b,d){var e=d(9).f,f=d(44),g=d(202),h=d(18),i=d(197),j=d(33),k=d(198),l=d(134),m=d(184),n=d(186),o=d(4),p=d(20).fastKey,q=o?"_s":"size",r=function(a,b){var c,d=p(b);if("F"!==d)return a._i[d];for(c=a._f;c;c=c.n)if(c.k==b)return c};a.exports={getConstructor:function(a,b,d,l){var m=a(function(a,e){i(a,m,b,"_i"),a._i=f(null),a._f=c,a._l=c,a[q]=0,e!=c&&k(e,d,a[l],a)});return g(m.prototype,{clear:function clear(){for(var a=this,b=a._i,d=a._f;d;d=d.n)d.r=!0,d.p&&(d.p=d.p.n=c),delete b[d.i];a._f=a._l=c,a[q]=0},"delete":function(a){var b=this,c=r(b,a);if(c){var d=c.n,e=c.p;delete b._i[c.i],c.r=!0,e&&(e.n=d),d&&(d.p=e),b._f==c&&(b._f=d),b._l==c&&(b._l=e),b[q]--}return!!c},forEach:function forEach(a){i(this,m,"forEach");for(var b,d=h(a,arguments.length>1?arguments[1]:c,3);b=b?b.n:this._f;)for(d(b.v,b.k,this);b&&b.r;)b=b.p},has:function has(a){return!!r(this,a)}}),o&&e(m.prototype,"size",{get:function(){return j(this[q])}}),m},def:function(a,b,d){var e,f,g=r(a,b);return g?g.v=d:(a._l=g={i:f=p(b,!0),k:b,v:d,p:e=a._l,n:c,r:!1},a._f||(a._f=g),e&&(e.n=g),a[q]++,"F"!==f&&(a._i[f]=g)),a},getEntry:r,setStrong:function(a,b,d){l(a,b,function(a,b){this._t=a,this._k=b,this._l=c},function(){for(var a=this,b=a._k,d=a._l;d&&d.r;)d=d.p;return a._t&&(a._l=d=d?d.n:a._t._f)?"keys"==b?m(0,d.k):"values"==b?m(0,d.v):m(0,[d.k,d.v]):(a._t=c,m(1))},d?"entries":"values",!d,!0),n(b)}}},function(a,b,d){var e=d(2),f=d(6),g=d(16),h=d(202),i=d(20),j=d(198),k=d(197),l=d(11),m=d(5),n=d(157),o=d(22),p=d(80);a.exports=function(a,b,d,q,r,s){var t=e[a],u=t,v=r?"set":"add",w=u&&u.prototype,x={},y=function(a){var b=w[a];g(w,a,"delete"==a?function(a){return!(s&&!l(a))&&b.call(this,0===a?0:a)}:"has"==a?function has(a){return!(s&&!l(a))&&b.call(this,0===a?0:a)}:"get"==a?function get(a){return s&&!l(a)?c:b.call(this,0===a?0:a)}:"add"==a?function add(a){return b.call(this,0===a?0:a),this}:function set(a,c){return b.call(this,0===a?0:a,c),this})};if("function"==typeof u&&(s||w.forEach&&!m(function(){(new u).entries().next()}))){var z=new u,A=z[v](s?{}:-0,1)!=z,B=m(function(){z.has(1)}),C=n(function(a){new u(a)}),D=!s&&m(function(){for(var a=new u,b=5;b--;)a[v](b,b);return!a.has(-0)});C||(u=b(function(b,d){k(b,u,a);var e=p(new t,b,u);return d!=c&&j(d,r,e[v],e),e}),u.prototype=w,w.constructor=u),(B||D)&&(y("delete"),y("has"),r&&y("get")),(D||A)&&y(v),s&&w.clear&&delete w.clear}else u=q.getConstructor(b,a,r,v),h(u.prototype,d),i.NEED=!0;return o(u,a),x[a]=u,f(f.G+f.W+f.F*(u!=t),x),s||q.setStrong(u,a,r),u}},function(a,b,d){var e=d(204);a.exports=d(205)("Set",function(a){return function Set(){return a(this,arguments.length>0?arguments[0]:c)}},{add:function add(a){return e.def(this,a=0===a?0:a,a)}},e)},function(a,b,d){var e,f=d(164)(0),g=d(16),h=d(20),i=d(67),j=d(208),k=d(11),l=h.getWeak,m=Object.isExtensible,n=j.ufstore,o={},p=function(a){return function WeakMap(){return a(this,arguments.length>0?arguments[0]:c)}},q={get:function get(a){if(k(a)){var b=l(a);return b===!0?n(this).get(a):b?b[this._i]:c}},set:function set(a,b){return j.def(this,a,b)}},r=a.exports=d(205)("WeakMap",p,q,j,!0,!0);7!=(new r).set((Object.freeze||Object)(o),7).get(o)&&(e=j.getConstructor(p),i(e.prototype,q),h.NEED=!0,f(["delete","has","get","set"],function(a){var b=r.prototype,c=b[a];g(b,a,function(b,d){if(k(b)&&!m(b)){this._f||(this._f=new e);var f=this._f[a](b,d);return"set"==a?this:f}return c.call(this,b,d)})}))},function(a,b,d){var e=d(202),f=d(20).getWeak,g=d(10),h=d(11),i=d(197),j=d(198),k=d(164),l=d(3),m=k(5),n=k(6),o=0,p=function(a){return a._l||(a._l=new q)},q=function(){this.a=[]},r=function(a,b){return m(a.a,function(a){return a[0]===b})};q.prototype={get:function(a){var b=r(this,a);if(b)return b[1]},has:function(a){return!!r(this,a)},set:function(a,b){var c=r(this,a);c?c[1]=b:this.a.push([a,b])},"delete":function(a){var b=n(this.a,function(b){return b[0]===a});return~b&&this.a.splice(b,1),!!~b}},a.exports={getConstructor:function(a,b,d,g){var k=a(function(a,e){i(a,k,b,"_i"),a._i=o++,a._l=c,e!=c&&j(e,d,a[g],a)});return e(k.prototype,{"delete":function(a){if(!h(a))return!1;var b=f(a);return b===!0?p(this)["delete"](a):b&&l(b,this._i)&&delete b[this._i]},has:function has(a){if(!h(a))return!1;var b=f(a);return b===!0?p(this).has(a):b&&l(b,this._i)}}),k},def:function(a,b,c){var d=f(g(b),!0);return d===!0?p(a).set(b,c):d[a._i]=c,a},ufstore:p}},function(a,b,d){var e=d(208);d(205)("WeakSet",function(a){return function WeakSet(){return a(this,arguments.length>0?arguments[0]:c)}},{add:function add(a){return e.def(this,a,!0)}},e,!1,!0)},function(a,b,c){var d=c(6),e=c(19),f=c(10),g=(c(2).Reflect||{}).apply,h=Function.apply;d(d.S+d.F*!c(5)(function(){g(function(){})}),"Reflect",{apply:function apply(a,b,c){var d=e(a),i=f(c);return g?g(d,b,i):h.call(d,b,i)}})},function(a,b,c){var d=c(6),e=c(44),f=c(19),g=c(10),h=c(11),i=c(5),j=c(75),k=(c(2).Reflect||{}).construct,l=i(function(){function F(){}return!(k(function(){},[],F)instanceof F)}),m=!i(function(){k(function(){})});d(d.S+d.F*(l||m),"Reflect",{construct:function construct(a,b){f(a),g(b);var c=arguments.length<3?a:f(arguments[2]);if(m&&!l)return k(a,b,c);if(a==c){switch(b.length){case 0:return new a;case 1:return new a(b[0]);case 2:return new a(b[0],b[1]);case 3:return new a(b[0],b[1],b[2]);case 4:return new a(b[0],b[1],b[2],b[3])}var d=[null];return d.push.apply(d,b),new(j.apply(a,d))}var i=c.prototype,n=e(h(i)?i:Object.prototype),o=Function.apply.call(a,n,b);return h(o)?o:n}})},function(a,b,c){var d=c(9),e=c(6),f=c(10),g=c(14);e(e.S+e.F*c(5)(function(){Reflect.defineProperty(d.f({},1,{value:1}),1,{value:2})}),"Reflect",{defineProperty:function defineProperty(a,b,c){f(a),b=g(b,!0),f(c);try{return d.f(a,b,c),!0}catch(e){return!1}}})},function(a,b,c){var d=c(6),e=c(49).f,f=c(10);d(d.S,"Reflect",{deleteProperty:function deleteProperty(a,b){var c=e(f(a),b);return!(c&&!c.configurable)&&delete a[b]}})},function(a,b,d){var e=d(6),f=d(10),g=function(a){this._t=f(a),this._i=0;var b,c=this._k=[];for(b in a)c.push(b)};d(136)(g,"Object",function(){var a,b=this,d=b._k;do if(b._i>=d.length)return{value:c,done:!0};while(!((a=d[b._i++])in b._t));return{value:a,done:!1}}),e(e.S,"Reflect",{enumerate:function enumerate(a){return new g(a)}})},function(a,b,d){function get(a,b){var d,h,k=arguments.length<3?a:arguments[2];return j(a)===k?a[b]:(d=e.f(a,b))?g(d,"value")?d.value:d.get!==c?d.get.call(k):c:i(h=f(a))?get(h,b,k):void 0}var e=d(49),f=d(57),g=d(3),h=d(6),i=d(11),j=d(10);h(h.S,"Reflect",{get:get})},function(a,b,c){var d=c(49),e=c(6),f=c(10);e(e.S,"Reflect",{getOwnPropertyDescriptor:function getOwnPropertyDescriptor(a,b){return d.f(f(a),b)}})},function(a,b,c){var d=c(6),e=c(57),f=c(10);d(d.S,"Reflect",{getPrototypeOf:function getPrototypeOf(a){return e(f(a))}})},function(a,b,c){var d=c(6);d(d.S,"Reflect",{has:function has(a,b){return b in a}})},function(a,b,c){var d=c(6),e=c(10),f=Object.isExtensible;d(d.S,"Reflect",{isExtensible:function isExtensible(a){return e(a),!f||f(a)}})},function(a,b,c){var d=c(6);d(d.S,"Reflect",{ownKeys:c(221)})},function(a,b,c){var d=c(48),e=c(41),f=c(10),g=c(2).Reflect;a.exports=g&&g.ownKeys||function ownKeys(a){var b=d.f(f(a)),c=e.f;return c?b.concat(c(a)):b}},function(a,b,c){var d=c(6),e=c(10),f=Object.preventExtensions;d(d.S,"Reflect",{preventExtensions:function preventExtensions(a){e(a);try{return f&&f(a),!0}catch(b){return!1}}})},function(a,b,d){function set(a,b,d){var i,m,n=arguments.length<4?a:arguments[3],o=f.f(k(a),b);if(!o){if(l(m=g(a)))return set(m,b,d,n);o=j(0)}return h(o,"value")?!(o.writable===!1||!l(n))&&(i=f.f(n,b)||j(0),i.value=d,e.f(n,b,i),!0):o.set!==c&&(o.set.call(n,d),!0)}var e=d(9),f=d(49),g=d(57),h=d(3),i=d(6),j=d(15),k=d(10),l=d(11);i(i.S,"Reflect",{set:set})},function(a,b,c){var d=c(6),e=c(71);e&&d(d.S,"Reflect",{setPrototypeOf:function setPrototypeOf(a,b){e.check(a,b);try{return e.set(a,b),!0}catch(c){return!1}}})},function(a,b,c){var d=c(6);d(d.S,"Date",{now:function(){return(new Date).getTime()}})},function(a,b,c){var d=c(6),e=c(56),f=c(14);d(d.P+d.F*c(5)(function(){return null!==new Date(NaN).toJSON()||1!==Date.prototype.toJSON.call({toISOString:function(){return 1}})}),"Date",{toJSON:function toJSON(a){var b=e(this),c=f(b);return"number"!=typeof c||isFinite(c)?b.toISOString():null}})},function(a,b,c){var d=c(6),e=c(5),f=Date.prototype.getTime,g=function(a){return a>9?a:"0"+a};d(d.P+d.F*(e(function(){return"0385-07-25T07:06:39.999Z"!=new Date(-5e13-1).toISOString()})||!e(function(){new Date(NaN).toISOString()})),"Date",{toISOString:function toISOString(){if(!isFinite(f.call(this)))throw RangeError("Invalid time value");var a=this,b=a.getUTCFullYear(),c=a.getUTCMilliseconds(),d=b<0?"-":b>9999?"+":"";return d+("00000"+Math.abs(b)).slice(d?-6:-4)+"-"+g(a.getUTCMonth()+1)+"-"+g(a.getUTCDate())+"T"+g(a.getUTCHours())+":"+g(a.getUTCMinutes())+":"+g(a.getUTCSeconds())+"."+(c>99?c:"0"+g(c))+"Z"}})},function(a,b,c){var d=Date.prototype,e="Invalid Date",f="toString",g=d[f],h=d.getTime;new Date(NaN)+""!=e&&c(16)(d,f,function toString(){var a=h.call(this);return a===a?g.call(this):e})},function(a,b,c){var d=c(23)("toPrimitive"),e=Date.prototype;d in e||c(8)(e,d,c(230))},function(a,b,c){var d=c(10),e=c(14),f="number";a.exports=function(a){if("string"!==a&&a!==f&&"default"!==a)throw TypeError("Incorrect hint");return e(d(this),a!=f)}},function(a,b,d){var e=d(6),f=d(232),g=d(233),h=d(10),i=d(37),j=d(35),k=d(11),l=d(2).ArrayBuffer,m=d(199),n=g.ArrayBuffer,o=g.DataView,p=f.ABV&&l.isView,q=n.prototype.slice,r=f.VIEW,s="ArrayBuffer";e(e.G+e.W+e.F*(l!==n),{ArrayBuffer:n}),e(e.S+e.F*!f.CONSTR,s,{isView:function isView(a){return p&&p(a)||k(a)&&r in a}}),e(e.P+e.U+e.F*d(5)(function(){return!new n(2).slice(1,c).byteLength}),s,{slice:function slice(a,b){if(q!==c&&b===c)return q.call(h(this),a);for(var d=h(this).byteLength,e=i(a,d),f=i(b===c?d:b,d),g=new(m(this,n))(j(f-e)),k=new o(this),l=new o(g),p=0;e<f;)l.setUint8(p++,k.getUint8(e++));return g}}),d(186)(s)},function(a,b,c){for(var d,e=c(2),f=c(8),g=c(17),h=g("typed_array"),i=g("view"),j=!(!e.ArrayBuffer||!e.DataView),k=j,l=0,m=9,n="Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(",");l<m;)(d=e[n[l++]])?(f(d.prototype,h,!0),f(d.prototype,i,!0)):k=!1;a.exports={ABV:j,CONSTR:k,TYPED:h,VIEW:i}},function(a,b,d){var e=d(2),f=d(4),g=d(26),h=d(232),i=d(8),j=d(202),k=d(5),l=d(197),m=d(36),n=d(35),o=d(48).f,p=d(9).f,q=d(180),r=d(22),s="ArrayBuffer",t="DataView",u="prototype",v="Wrong length!",w="Wrong index!",x=e[s],y=e[t],z=e.Math,A=e.RangeError,B=e.Infinity,C=x,D=z.abs,E=z.pow,F=z.floor,G=z.log,H=z.LN2,I="buffer",J="byteLength",K="byteOffset",L=f?"_b":I,M=f?"_l":J,N=f?"_o":K,O=function(a,b,c){var d,e,f,g=Array(c),h=8*c-b-1,i=(1<<h)-1,j=i>>1,k=23===b?E(2,-24)-E(2,-77):0,l=0,m=a<0||0===a&&1/a<0?1:0;for(a=D(a),a!=a||a===B?(e=a!=a?1:0,d=i):(d=F(G(a)/H),a*(f=E(2,-d))<1&&(d--,f*=2),a+=d+j>=1?k/f:k*E(2,1-j),a*f>=2&&(d++,f/=2),d+j>=i?(e=0,d=i):d+j>=1?(e=(a*f-1)*E(2,b),d+=j):(e=a*E(2,j-1)*E(2,b),d=0));b>=8;g[l++]=255&e,e/=256,b-=8);for(d=d<<b|e,h+=b;h>0;g[l++]=255&d,d/=256,h-=8);return g[--l]|=128*m,g},P=function(a,b,c){var d,e=8*c-b-1,f=(1<<e)-1,g=f>>1,h=e-7,i=c-1,j=a[i--],k=127&j;for(j>>=7;h>0;k=256*k+a[i],i--,h-=8);for(d=k&(1<<-h)-1,k>>=-h,h+=b;h>0;d=256*d+a[i],i--,h-=8);if(0===k)k=1-g;else{if(k===f)return d?NaN:j?-B:B;d+=E(2,b),k-=g}return(j?-1:1)*d*E(2,k-b)},Q=function(a){return a[3]<<24|a[2]<<16|a[1]<<8|a[0]},R=function(a){return[255&a]},S=function(a){return[255&a,a>>8&255]},T=function(a){return[255&a,a>>8&255,a>>16&255,a>>24&255]},U=function(a){return O(a,52,8)},V=function(a){return O(a,23,4)},W=function(a,b,c){p(a[u],b,{get:function(){return this[c]}})},X=function(a,b,c,d){var e=+c,f=m(e);if(e!=f||f<0||f+b>a[M])throw A(w);var g=a[L]._b,h=f+a[N],i=g.slice(h,h+b);return d?i:i.reverse()},Y=function(a,b,c,d,e,f){var g=+c,h=m(g);if(g!=h||h<0||h+b>a[M])throw A(w);for(var i=a[L]._b,j=h+a[N],k=d(+e),l=0;l<b;l++)i[j+l]=k[f?l:b-l-1]},Z=function(a,b){l(a,x,s);var c=+b,d=n(c);if(c!=d)throw A(v);return d};if(h.ABV){if(!k(function(){new x})||!k(function(){new x(.5)})){x=function ArrayBuffer(a){return new C(Z(this,a))};for(var $,_=x[u]=C[u],aa=o(C),ba=0;aa.length>ba;)($=aa[ba++])in x||i(x,$,C[$]);g||(_.constructor=x)}var ca=new y(new x(2)),da=y[u].setInt8;ca.setInt8(0,2147483648),ca.setInt8(1,2147483649),!ca.getInt8(0)&&ca.getInt8(1)||j(y[u],{setInt8:function setInt8(a,b){da.call(this,a,b<<24>>24)},setUint8:function setUint8(a,b){da.call(this,a,b<<24>>24)}},!0)}else x=function ArrayBuffer(a){var b=Z(this,a);this._b=q.call(Array(b),0),this[M]=b},y=function DataView(a,b,d){l(this,y,t),l(a,x,t);var e=a[M],f=m(b);if(f<0||f>e)throw A("Wrong offset!");if(d=d===c?e-f:n(d),f+d>e)throw A(v);this[L]=a,this[N]=f,this[M]=d},f&&(W(x,J,"_l"),W(y,I,"_b"),W(y,J,"_l"),W(y,K,"_o")),j(y[u],{getInt8:function getInt8(a){return X(this,1,a)[0]<<24>>24},getUint8:function getUint8(a){return X(this,1,a)[0]},getInt16:function getInt16(a){var b=X(this,2,a,arguments[1]);return(b[1]<<8|b[0])<<16>>16},getUint16:function getUint16(a){var b=X(this,2,a,arguments[1]);return b[1]<<8|b[0]},getInt32:function getInt32(a){return Q(X(this,4,a,arguments[1]))},getUint32:function getUint32(a){return Q(X(this,4,a,arguments[1]))>>>0},getFloat32:function getFloat32(a){return P(X(this,4,a,arguments[1]),23,4)},getFloat64:function getFloat64(a){return P(X(this,8,a,arguments[1]),52,8)},setInt8:function setInt8(a,b){Y(this,1,a,R,b)},setUint8:function setUint8(a,b){Y(this,1,a,R,b)},setInt16:function setInt16(a,b){Y(this,2,a,S,b,arguments[2])},setUint16:function setUint16(a,b){Y(this,2,a,S,b,arguments[2])},setInt32:function setInt32(a,b){Y(this,4,a,T,b,arguments[2])},setUint32:function setUint32(a,b){Y(this,4,a,T,b,arguments[2])},setFloat32:function setFloat32(a,b){Y(this,4,a,V,b,arguments[2])},setFloat64:function setFloat64(a,b){Y(this,8,a,U,b,arguments[2])}});r(x,s),r(y,t),i(y[u],h.VIEW,!0),b[s]=x,b[t]=y},function(a,b,c){var d=c(6);d(d.G+d.W+d.F*!c(232).ABV,{DataView:c(233).DataView})},function(a,b,c){c(236)("Int8",1,function(a){return function Int8Array(b,c,d){return a(this,b,c,d)}})},function(a,b,d){if(d(4)){var e=d(26),f=d(2),g=d(5),h=d(6),i=d(232),j=d(233),k=d(18),l=d(197),m=d(15),n=d(8),o=d(202),p=d(36),q=d(35),r=d(37),s=d(14),t=d(3),u=d(69),v=d(73),w=d(11),x=d(56),y=d(154),z=d(44),A=d(57),B=d(48).f,C=d(156),D=d(17),E=d(23),F=d(164),G=d(34),H=d(199),I=d(183),J=d(135),K=d(157),L=d(186),M=d(180),N=d(177),O=d(9),P=d(49),Q=O.f,R=P.f,S=f.RangeError,T=f.TypeError,U=f.Uint8Array,V="ArrayBuffer",W="Shared"+V,X="BYTES_PER_ELEMENT",Y="prototype",Z=Array[Y],$=j.ArrayBuffer,_=j.DataView,aa=F(0),ba=F(2),ca=F(3),da=F(4),ea=F(5),fa=F(6),ga=G(!0),ha=G(!1),ia=I.values,ja=I.keys,ka=I.entries,la=Z.lastIndexOf,ma=Z.reduce,na=Z.reduceRight,oa=Z.join,pa=Z.sort,qa=Z.slice,ra=Z.toString,sa=Z.toLocaleString,ta=E("iterator"),ua=E("toStringTag"),va=D("typed_constructor"),wa=D("def_constructor"),xa=i.CONSTR,ya=i.TYPED,za=i.VIEW,Aa="Wrong length!",Ba=F(1,function(a,b){return Ha(H(a,a[wa]),b)}),Ca=g(function(){return 1===new U(new Uint16Array([1]).buffer)[0]}),Da=!!U&&!!U[Y].set&&g(function(){new U(1).set({})}),Ea=function(a,b){if(a===c)throw T(Aa);var d=+a,e=q(a);if(b&&!u(d,e))throw S(Aa);return e},Fa=function(a,b){var c=p(a);if(c<0||c%b)throw S("Wrong offset!");return c},Ga=function(a){if(w(a)&&ya in a)return a;throw T(a+" is not a typed array!")},Ha=function(a,b){if(!(w(a)&&va in a))throw T("It is not a typed array constructor!");return new a(b)},Ia=function(a,b){return Ja(H(a,a[wa]),b)},Ja=function(a,b){for(var c=0,d=b.length,e=Ha(a,d);d>c;)e[c]=b[c++];return e},Ka=function(a,b,c){Q(a,b,{get:function(){return this._d[c]}})},La=function from(a){var b,d,e,f,g,h,i=x(a),j=arguments.length,l=j>1?arguments[1]:c,m=l!==c,n=C(i);if(n!=c&&!y(n)){for(h=n.call(i),e=[],b=0;!(g=h.next()).done;b++)e.push(g.value);i=e}for(m&&j>2&&(l=k(l,arguments[2],2)),b=0,d=q(i.length),f=Ha(this,d);d>b;b++)f[b]=m?l(i[b],b):i[b];return f},Ma=function of(){for(var a=0,b=arguments.length,c=Ha(this,b);b>a;)c[a]=arguments[a++];return c},Na=!!U&&g(function(){sa.call(new U(1))}),Oa=function toLocaleString(){return sa.apply(Na?qa.call(Ga(this)):Ga(this),arguments)},Pa={copyWithin:function copyWithin(a,b){return N.call(Ga(this),a,b,arguments.length>2?arguments[2]:c)},every:function every(a){return da(Ga(this),a,arguments.length>1?arguments[1]:c)},fill:function fill(a){return M.apply(Ga(this),arguments)},filter:function filter(a){return Ia(this,ba(Ga(this),a,arguments.length>1?arguments[1]:c))},find:function find(a){return ea(Ga(this),a,arguments.length>1?arguments[1]:c)},findIndex:function findIndex(a){return fa(Ga(this),a,arguments.length>1?arguments[1]:c)},forEach:function forEach(a){aa(Ga(this),a,arguments.length>1?arguments[1]:c)},indexOf:function indexOf(a){return ha(Ga(this),a,arguments.length>1?arguments[1]:c)},includes:function includes(a){return ga(Ga(this),a,arguments.length>1?arguments[1]:c)},join:function join(a){return oa.apply(Ga(this),arguments)},lastIndexOf:function lastIndexOf(a){
return la.apply(Ga(this),arguments)},map:function map(a){return Ba(Ga(this),a,arguments.length>1?arguments[1]:c)},reduce:function reduce(a){return ma.apply(Ga(this),arguments)},reduceRight:function reduceRight(a){return na.apply(Ga(this),arguments)},reverse:function reverse(){for(var a,b=this,c=Ga(b).length,d=Math.floor(c/2),e=0;e<d;)a=b[e],b[e++]=b[--c],b[c]=a;return b},some:function some(a){return ca(Ga(this),a,arguments.length>1?arguments[1]:c)},sort:function sort(a){return pa.call(Ga(this),a)},subarray:function subarray(a,b){var d=Ga(this),e=d.length,f=r(a,e);return new(H(d,d[wa]))(d.buffer,d.byteOffset+f*d.BYTES_PER_ELEMENT,q((b===c?e:r(b,e))-f))}},Qa=function slice(a,b){return Ia(this,qa.call(Ga(this),a,b))},Ra=function set(a){Ga(this);var b=Fa(arguments[1],1),c=this.length,d=x(a),e=q(d.length),f=0;if(e+b>c)throw S(Aa);for(;f<e;)this[b+f]=d[f++]},Sa={entries:function entries(){return ka.call(Ga(this))},keys:function keys(){return ja.call(Ga(this))},values:function values(){return ia.call(Ga(this))}},Ta=function(a,b){return w(a)&&a[ya]&&"symbol"!=typeof b&&b in a&&String(+b)==String(b)},Ua=function getOwnPropertyDescriptor(a,b){return Ta(a,b=s(b,!0))?m(2,a[b]):R(a,b)},Va=function defineProperty(a,b,c){return!(Ta(a,b=s(b,!0))&&w(c)&&t(c,"value"))||t(c,"get")||t(c,"set")||c.configurable||t(c,"writable")&&!c.writable||t(c,"enumerable")&&!c.enumerable?Q(a,b,c):(a[b]=c.value,a)};xa||(P.f=Ua,O.f=Va),h(h.S+h.F*!xa,"Object",{getOwnPropertyDescriptor:Ua,defineProperty:Va}),g(function(){ra.call({})})&&(ra=sa=function toString(){return oa.call(this)});var Wa=o({},Pa);o(Wa,Sa),n(Wa,ta,Sa.values),o(Wa,{slice:Qa,set:Ra,constructor:function(){},toString:ra,toLocaleString:Oa}),Ka(Wa,"buffer","b"),Ka(Wa,"byteOffset","o"),Ka(Wa,"byteLength","l"),Ka(Wa,"length","e"),Q(Wa,ua,{get:function(){return this[ya]}}),a.exports=function(a,b,d,j){j=!!j;var k=a+(j?"Clamped":"")+"Array",m="Uint8Array"!=k,o="get"+a,p="set"+a,r=f[k],s=r||{},t=r&&A(r),u=!r||!i.ABV,x={},y=r&&r[Y],C=function(a,c){var d=a._d;return d.v[o](c*b+d.o,Ca)},D=function(a,c,d){var e=a._d;j&&(d=(d=Math.round(d))<0?0:d>255?255:255&d),e.v[p](c*b+e.o,d,Ca)},E=function(a,b){Q(a,b,{get:function(){return C(this,b)},set:function(a){return D(this,b,a)},enumerable:!0})};u?(r=d(function(a,d,e,f){l(a,r,k,"_d");var g,h,i,j,m=0,o=0;if(w(d)){if(!(d instanceof $||(j=v(d))==V||j==W))return ya in d?Ja(r,d):La.call(r,d);g=d,o=Fa(e,b);var p=d.byteLength;if(f===c){if(p%b)throw S(Aa);if(h=p-o,h<0)throw S(Aa)}else if(h=q(f)*b,h+o>p)throw S(Aa);i=h/b}else i=Ea(d,!0),h=i*b,g=new $(h);for(n(a,"_d",{b:g,o:o,l:h,e:i,v:new _(g)});m<i;)E(a,m++)}),y=r[Y]=z(Wa),n(y,"constructor",r)):K(function(a){new r(null),new r(a)},!0)||(r=d(function(a,d,e,f){l(a,r,k);var g;return w(d)?d instanceof $||(g=v(d))==V||g==W?f!==c?new s(d,Fa(e,b),f):e!==c?new s(d,Fa(e,b)):new s(d):ya in d?Ja(r,d):La.call(r,d):new s(Ea(d,m))}),aa(t!==Function.prototype?B(s).concat(B(t)):B(s),function(a){a in r||n(r,a,s[a])}),r[Y]=y,e||(y.constructor=r));var F=y[ta],G=!!F&&("values"==F.name||F.name==c),H=Sa.values;n(r,va,!0),n(y,ya,k),n(y,za,!0),n(y,wa,r),(j?new r(1)[ua]==k:ua in y)||Q(y,ua,{get:function(){return k}}),x[k]=r,h(h.G+h.W+h.F*(r!=s),x),h(h.S,k,{BYTES_PER_ELEMENT:b,from:La,of:Ma}),X in y||n(y,X,b),h(h.P,k,Pa),L(k),h(h.P+h.F*Da,k,{set:Ra}),h(h.P+h.F*!G,k,Sa),h(h.P+h.F*(y.toString!=ra),k,{toString:ra}),h(h.P+h.F*g(function(){new r(1).slice()}),k,{slice:Qa}),h(h.P+h.F*(g(function(){return[1,2].toLocaleString()!=new r([1,2]).toLocaleString()})||!g(function(){y.toLocaleString.call([1,2])})),k,{toLocaleString:Oa}),J[k]=G?F:H,e||G||n(y,ta,H)}}else a.exports=function(){}},function(a,b,c){c(236)("Uint8",1,function(a){return function Uint8Array(b,c,d){return a(this,b,c,d)}})},function(a,b,c){c(236)("Uint8",1,function(a){return function Uint8ClampedArray(b,c,d){return a(this,b,c,d)}},!0)},function(a,b,c){c(236)("Int16",2,function(a){return function Int16Array(b,c,d){return a(this,b,c,d)}})},function(a,b,c){c(236)("Uint16",2,function(a){return function Uint16Array(b,c,d){return a(this,b,c,d)}})},function(a,b,c){c(236)("Int32",4,function(a){return function Int32Array(b,c,d){return a(this,b,c,d)}})},function(a,b,c){c(236)("Uint32",4,function(a){return function Uint32Array(b,c,d){return a(this,b,c,d)}})},function(a,b,c){c(236)("Float32",4,function(a){return function Float32Array(b,c,d){return a(this,b,c,d)}})},function(a,b,c){c(236)("Float64",8,function(a){return function Float64Array(b,c,d){return a(this,b,c,d)}})},function(a,b,d){var e=d(6),f=d(34)(!0);e(e.P,"Array",{includes:function includes(a){return f(this,a,arguments.length>1?arguments[1]:c)}}),d(178)("includes")},function(a,b,c){var d=c(6),e=c(125)(!0);d(d.P,"String",{at:function at(a){return e(this,a)}})},function(a,b,d){var e=d(6),f=d(248);e(e.P,"String",{padStart:function padStart(a){return f(this,a,arguments.length>1?arguments[1]:c,!0)}})},function(a,b,d){var e=d(35),f=d(85),g=d(33);a.exports=function(a,b,d,h){var i=String(g(a)),j=i.length,k=d===c?" ":String(d),l=e(b);if(l<=j||""==k)return i;var m=l-j,n=f.call(k,Math.ceil(m/k.length));return n.length>m&&(n=n.slice(0,m)),h?n+i:i+n}},function(a,b,d){var e=d(6),f=d(248);e(e.P,"String",{padEnd:function padEnd(a){return f(this,a,arguments.length>1?arguments[1]:c,!1)}})},function(a,b,c){c(81)("trimLeft",function(a){return function trimLeft(){return a(this,1)}},"trimStart")},function(a,b,c){c(81)("trimRight",function(a){return function trimRight(){return a(this,2)}},"trimEnd")},function(a,b,c){var d=c(6),e=c(33),f=c(35),g=c(128),h=c(188),i=RegExp.prototype,j=function(a,b){this._r=a,this._s=b};c(136)(j,"RegExp String",function next(){var a=this._r.exec(this._s);return{value:a,done:null===a}}),d(d.P,"String",{matchAll:function matchAll(a){if(e(this),!g(a))throw TypeError(a+" is not a regexp!");var b=String(this),c="flags"in i?String(a.flags):h.call(a),d=new RegExp(a.source,~c.indexOf("g")?c:"g"+c);return d.lastIndex=f(a.lastIndex),new j(d,b)}})},function(a,b,c){c(25)("asyncIterator")},function(a,b,c){c(25)("observable")},function(a,b,c){var d=c(6),e=c(221),f=c(30),g=c(49),h=c(155);d(d.S,"Object",{getOwnPropertyDescriptors:function getOwnPropertyDescriptors(a){for(var b,c=f(a),d=g.f,i=e(c),j={},k=0;i.length>k;)h(j,b=i[k++],d(c,b));return j}})},function(a,b,c){var d=c(6),e=c(257)(!1);d(d.S,"Object",{values:function values(a){return e(a)}})},function(a,b,c){var d=c(28),e=c(30),f=c(42).f;a.exports=function(a){return function(b){for(var c,g=e(b),h=d(g),i=h.length,j=0,k=[];i>j;)f.call(g,c=h[j++])&&k.push(a?[c,g[c]]:g[c]);return k}}},function(a,b,c){var d=c(6),e=c(257)(!0);d(d.S,"Object",{entries:function entries(a){return e(a)}})},function(a,b,c){var d=c(6),e=c(56),f=c(19),g=c(9);c(4)&&d(d.P+c(260),"Object",{__defineGetter__:function __defineGetter__(a,b){g.f(e(this),a,{get:f(b),enumerable:!0,configurable:!0})}})},function(a,b,c){a.exports=c(26)||!c(5)(function(){var a=Math.random();__defineSetter__.call(null,a,function(){}),delete c(2)[a]})},function(a,b,c){var d=c(6),e=c(56),f=c(19),g=c(9);c(4)&&d(d.P+c(260),"Object",{__defineSetter__:function __defineSetter__(a,b){g.f(e(this),a,{set:f(b),enumerable:!0,configurable:!0})}})},function(a,b,c){var d=c(6),e=c(56),f=c(14),g=c(57),h=c(49).f;c(4)&&d(d.P+c(260),"Object",{__lookupGetter__:function __lookupGetter__(a){var b,c=e(this),d=f(a,!0);do if(b=h(c,d))return b.get;while(c=g(c))}})},function(a,b,c){var d=c(6),e=c(56),f=c(14),g=c(57),h=c(49).f;c(4)&&d(d.P+c(260),"Object",{__lookupSetter__:function __lookupSetter__(a){var b,c=e(this),d=f(a,!0);do if(b=h(c,d))return b.set;while(c=g(c))}})},function(a,b,c){var d=c(6);d(d.P+d.R,"Map",{toJSON:c(265)("Map")})},function(a,b,c){var d=c(73),e=c(266);a.exports=function(a){return function toJSON(){if(d(this)!=a)throw TypeError(a+"#toJSON isn't generic");return e(this)}}},function(a,b,c){var d=c(198);a.exports=function(a,b){var c=[];return d(a,!1,c.push,c,b),c}},function(a,b,c){var d=c(6);d(d.P+d.R,"Set",{toJSON:c(265)("Set")})},function(a,b,c){var d=c(6);d(d.S,"System",{global:c(2)})},function(a,b,c){var d=c(6),e=c(32);d(d.S,"Error",{isError:function isError(a){return"Error"===e(a)}})},function(a,b,c){var d=c(6);d(d.S,"Math",{iaddh:function iaddh(a,b,c,d){var e=a>>>0,f=b>>>0,g=c>>>0;return f+(d>>>0)+((e&g|(e|g)&~(e+g>>>0))>>>31)|0}})},function(a,b,c){var d=c(6);d(d.S,"Math",{isubh:function isubh(a,b,c,d){var e=a>>>0,f=b>>>0,g=c>>>0;return f-(d>>>0)-((~e&g|~(e^g)&e-g>>>0)>>>31)|0}})},function(a,b,c){var d=c(6);d(d.S,"Math",{imulh:function imulh(a,b){var c=65535,d=+a,e=+b,f=d&c,g=e&c,h=d>>16,i=e>>16,j=(h*g>>>0)+(f*g>>>16);return h*i+(j>>16)+((f*i>>>0)+(j&c)>>16)}})},function(a,b,c){var d=c(6);d(d.S,"Math",{umulh:function umulh(a,b){var c=65535,d=+a,e=+b,f=d&c,g=e&c,h=d>>>16,i=e>>>16,j=(h*g>>>0)+(f*g>>>16);return h*i+(j>>>16)+((f*i>>>0)+(j&c)>>>16)}})},function(a,b,c){var d=c(275),e=c(10),f=d.key,g=d.set;d.exp({defineMetadata:function defineMetadata(a,b,c,d){g(a,b,e(c),f(d))}})},function(a,b,d){var e=d(203),f=d(6),g=d(21)("metadata"),h=g.store||(g.store=new(d(207))),i=function(a,b,d){var f=h.get(a);if(!f){if(!d)return c;h.set(a,f=new e)}var g=f.get(b);if(!g){if(!d)return c;f.set(b,g=new e)}return g},j=function(a,b,d){var e=i(b,d,!1);return e!==c&&e.has(a)},k=function(a,b,d){var e=i(b,d,!1);return e===c?c:e.get(a)},l=function(a,b,c,d){i(c,d,!0).set(a,b)},m=function(a,b){var c=i(a,b,!1),d=[];return c&&c.forEach(function(a,b){d.push(b)}),d},n=function(a){return a===c||"symbol"==typeof a?a:String(a)},o=function(a){f(f.S,"Reflect",a)};a.exports={store:h,map:i,has:j,get:k,set:l,keys:m,key:n,exp:o}},function(a,b,d){var e=d(275),f=d(10),g=e.key,h=e.map,i=e.store;e.exp({deleteMetadata:function deleteMetadata(a,b){var d=arguments.length<3?c:g(arguments[2]),e=h(f(b),d,!1);if(e===c||!e["delete"](a))return!1;if(e.size)return!0;var j=i.get(b);return j["delete"](d),!!j.size||i["delete"](b)}})},function(a,b,d){var e=d(275),f=d(10),g=d(57),h=e.has,i=e.get,j=e.key,k=function(a,b,d){var e=h(a,b,d);if(e)return i(a,b,d);var f=g(b);return null!==f?k(a,f,d):c};e.exp({getMetadata:function getMetadata(a,b){return k(a,f(b),arguments.length<3?c:j(arguments[2]))}})},function(a,b,d){var e=d(206),f=d(266),g=d(275),h=d(10),i=d(57),j=g.keys,k=g.key,l=function(a,b){var c=j(a,b),d=i(a);if(null===d)return c;var g=l(d,b);return g.length?c.length?f(new e(c.concat(g))):g:c};g.exp({getMetadataKeys:function getMetadataKeys(a){return l(h(a),arguments.length<2?c:k(arguments[1]))}})},function(a,b,d){var e=d(275),f=d(10),g=e.get,h=e.key;e.exp({getOwnMetadata:function getOwnMetadata(a,b){return g(a,f(b),arguments.length<3?c:h(arguments[2]))}})},function(a,b,d){var e=d(275),f=d(10),g=e.keys,h=e.key;e.exp({getOwnMetadataKeys:function getOwnMetadataKeys(a){return g(f(a),arguments.length<2?c:h(arguments[1]))}})},function(a,b,d){var e=d(275),f=d(10),g=d(57),h=e.has,i=e.key,j=function(a,b,c){var d=h(a,b,c);if(d)return!0;var e=g(b);return null!==e&&j(a,e,c)};e.exp({hasMetadata:function hasMetadata(a,b){return j(a,f(b),arguments.length<3?c:i(arguments[2]))}})},function(a,b,d){var e=d(275),f=d(10),g=e.has,h=e.key;e.exp({hasOwnMetadata:function hasOwnMetadata(a,b){return g(a,f(b),arguments.length<3?c:h(arguments[2]))}})},function(a,b,d){var e=d(275),f=d(10),g=d(19),h=e.key,i=e.set;e.exp({metadata:function metadata(a,b){return function decorator(d,e){i(a,b,(e!==c?f:g)(d),h(e))}}})},function(a,b,c){var d=c(6),e=c(201)(),f=c(2).process,g="process"==c(32)(f);d(d.G,{asap:function asap(a){var b=g&&f.domain;e(b?b.bind(a):a)}})},function(a,b,d){var e=d(6),f=d(2),g=d(7),h=d(201)(),i=d(23)("observable"),j=d(19),k=d(10),l=d(197),m=d(202),n=d(8),o=d(198),p=o.RETURN,q=function(a){return null==a?c:j(a)},r=function(a){var b=a._c;b&&(a._c=c,b())},s=function(a){return a._o===c},t=function(a){s(a)||(a._o=c,r(a))},u=function(a,b){k(a),this._c=c,this._o=a,a=new v(this);try{var d=b(a),e=d;null!=d&&("function"==typeof d.unsubscribe?d=function(){e.unsubscribe()}:j(d),this._c=d)}catch(f){return void a.error(f)}s(this)&&r(this)};u.prototype=m({},{unsubscribe:function unsubscribe(){t(this)}});var v=function(a){this._s=a};v.prototype=m({},{next:function next(a){var b=this._s;if(!s(b)){var c=b._o;try{var d=q(c.next);if(d)return d.call(c,a)}catch(e){try{t(b)}finally{throw e}}}},error:function error(a){var b=this._s;if(s(b))throw a;var d=b._o;b._o=c;try{var e=q(d.error);if(!e)throw a;a=e.call(d,a)}catch(f){try{r(b)}finally{throw f}}return r(b),a},complete:function complete(a){var b=this._s;if(!s(b)){var d=b._o;b._o=c;try{var e=q(d.complete);a=e?e.call(d,a):c}catch(f){try{r(b)}finally{throw f}}return r(b),a}}});var w=function Observable(a){l(this,w,"Observable","_f")._f=j(a)};m(w.prototype,{subscribe:function subscribe(a){return new u(a,this._f)},forEach:function forEach(a){var b=this;return new(g.Promise||f.Promise)(function(c,d){j(a);var e=b.subscribe({next:function(b){try{return a(b)}catch(c){d(c),e.unsubscribe()}},error:d,complete:c})})}}),m(w,{from:function from(a){var b="function"==typeof this?this:w,c=q(k(a)[i]);if(c){var d=k(c.call(a));return d.constructor===b?d:new b(function(a){return d.subscribe(a)})}return new b(function(b){var c=!1;return h(function(){if(!c){try{if(o(a,!1,function(a){if(b.next(a),c)return p})===p)return}catch(d){if(c)throw d;return void b.error(d)}b.complete()}}),function(){c=!0}})},of:function of(){for(var a=0,b=arguments.length,c=Array(b);a<b;)c[a]=arguments[a++];return new("function"==typeof this?this:w)(function(a){var b=!1;return h(function(){if(!b){for(var d=0;d<c.length;++d)if(a.next(c[d]),b)return;a.complete()}}),function(){b=!0}})}}),n(w.prototype,i,function(){return this}),e(e.G,{Observable:w}),d(186)("Observable")},function(a,b,c){var d=c(6),e=c(200);d(d.G+d.B,{setImmediate:e.set,clearImmediate:e.clear})},function(a,b,c){for(var d=c(183),e=c(16),f=c(2),g=c(8),h=c(135),i=c(23),j=i("iterator"),k=i("toStringTag"),l=h.Array,m=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],n=0;n<5;n++){var o,p=m[n],q=f[p],r=q&&q.prototype;if(r){r[j]||g(r,j,l),r[k]||g(r,k,p),h[p]=l;for(o in d)r[o]||e(r,o,d[o],!0)}}},function(a,b,c){var d=c(2),e=c(6),f=c(76),g=c(289),h=d.navigator,i=!!h&&/MSIE .\./.test(h.userAgent),j=function(a){return i?function(b,c){return a(f(g,[].slice.call(arguments,2),"function"==typeof b?b:Function(b)),c)}:a};e(e.G+e.B+e.F*i,{setTimeout:j(d.setTimeout),setInterval:j(d.setInterval)})},function(a,b,c){var d=c(290),e=c(76),f=c(19);a.exports=function(){for(var a=f(this),b=arguments.length,c=Array(b),g=0,h=d._,i=!1;b>g;)(c[g]=arguments[g++])===h&&(i=!0);return function(){var d,f=this,g=arguments.length,j=0,k=0;if(!i&&!g)return e(a,c,f);if(d=c.slice(),i)for(;b>j;j++)d[j]===h&&(d[j]=arguments[k++]);for(;g>k;)d.push(arguments[k++]);return e(a,d,f)}}},function(a,b,c){a.exports=c(2)}]),"undefined"!=typeof module&&module.exports?module.exports=a:"function"==typeof define&&define.amd?define(function(){return a}):b.core=a}(1,1);
//# sourceMappingURL=shim.min.js.map
/**
* @license
* Copyright Google Inc. All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Zone$1 = (function (global) {
    if (global['Zone']) {
        throw new Error('Zone already loaded.');
    }
    var NO_ZONE = { name: 'NO ZONE' };
    var notScheduled = 'notScheduled', scheduling = 'scheduling', scheduled = 'scheduled', running = 'running', canceling = 'canceling', unknown = 'unknown';
    var microTask = 'microTask', macroTask = 'macroTask', eventTask = 'eventTask';
    var Zone = (function () {
        function Zone(parent, zoneSpec) {
            this._properties = null;
            this._parent = parent;
            this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';
            this._properties = zoneSpec && zoneSpec.properties || {};
            this._zoneDelegate =
                new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
        }
        Zone.assertZonePatched = function () {
            if (global.Promise !== ZoneAwarePromise) {
                throw new Error('Zone.js has detected that ZoneAwarePromise `(window|global).Promise` ' +
                    'has been overwritten.\n' +
                    'Most likely cause is that a Promise polyfill has been loaded ' +
                    'after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. ' +
                    'If you must load one, do so before loading zone.js.)');
            }
        };
        Object.defineProperty(Zone, "root", {
            get: function () {
                var zone = Zone.current;
                while (zone.parent) {
                    zone = zone.parent;
                }
                return zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone, "current", {
            get: function () {
                return _currentZoneFrame.zone;
            },
            enumerable: true,
            configurable: true
        });
        
        Object.defineProperty(Zone, "currentTask", {
            get: function () {
                return _currentTask;
            },
            enumerable: true,
            configurable: true
        });
        
        Object.defineProperty(Zone.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        
        Object.defineProperty(Zone.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        
        Zone.prototype.get = function (key) {
            var zone = this.getZoneWith(key);
            if (zone)
                return zone._properties[key];
        };
        Zone.prototype.getZoneWith = function (key) {
            var current = this;
            while (current) {
                if (current._properties.hasOwnProperty(key)) {
                    return current;
                }
                current = current._parent;
            }
            return null;
        };
        Zone.prototype.fork = function (zoneSpec) {
            if (!zoneSpec)
                throw new Error('ZoneSpec required!');
            return this._zoneDelegate.fork(this, zoneSpec);
        };
        Zone.prototype.wrap = function (callback, source) {
            if (typeof callback !== 'function') {
                throw new Error('Expecting function got: ' + callback);
            }
            var _callback = this._zoneDelegate.intercept(this, callback, source);
            var zone = this;
            return function () {
                return zone.runGuarded(_callback, this, arguments, source);
            };
        };
        Zone.prototype.run = function (callback, applyThis, applyArgs, source) {
            if (applyThis === void 0) { applyThis = undefined; }
            if (applyArgs === void 0) { applyArgs = null; }
            if (source === void 0) { source = null; }
            _currentZoneFrame = new ZoneFrame(_currentZoneFrame, this);
            try {
                return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        };
        Zone.prototype.runGuarded = function (callback, applyThis, applyArgs, source) {
            if (applyThis === void 0) { applyThis = null; }
            if (applyArgs === void 0) { applyArgs = null; }
            if (source === void 0) { source = null; }
            _currentZoneFrame = new ZoneFrame(_currentZoneFrame, this);
            try {
                try {
                    return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        };
        Zone.prototype.runTask = function (task, applyThis, applyArgs) {
            if (task.zone != this)
                throw new Error('A task can only be run in the zone of creation! (Creation: ' +
                    (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
            var reEntryGuard = task.state != running;
            reEntryGuard && task._transitionTo(running, scheduled);
            task.runCount++;
            var previousTask = _currentTask;
            _currentTask = task;
            _currentZoneFrame = new ZoneFrame(_currentZoneFrame, this);
            try {
                if (task.type == macroTask && task.data && !task.data.isPeriodic) {
                    task.cancelFn = null;
                }
                try {
                    return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                // if the task's state is notScheduled or unknown, then it has already been cancelled
                // we should not reset the state to scheduled
                if (task.state !== notScheduled && task.state !== unknown) {
                    if (task.type == eventTask || (task.data && task.data.isPeriodic)) {
                        reEntryGuard && task._transitionTo(scheduled, running);
                    }
                    else {
                        task.runCount = 0;
                        this._updateTaskCount(task, -1);
                        reEntryGuard &&
                            task._transitionTo(notScheduled, running, notScheduled);
                    }
                }
                _currentZoneFrame = _currentZoneFrame.parent;
                _currentTask = previousTask;
            }
        };
        Zone.prototype.scheduleTask = function (task) {
            if (task.zone && task.zone !== this) {
                // check if the task was rescheduled, the newZone
                // should not be the children of the original zone
                var newZone = this;
                while (newZone) {
                    if (newZone === task.zone) {
                        throw Error("can not reschedule task to " + this
                            .name + " which is descendants of the original zone " + task.zone.name);
                    }
                    newZone = newZone.parent;
                }
            }
            task._transitionTo(scheduling, notScheduled);
            var zoneDelegates = [];
            task._zoneDelegates = zoneDelegates;
            task._zone = this;
            try {
                task = this._zoneDelegate.scheduleTask(this, task);
            }
            catch (err) {
                // should set task's state to unknown when scheduleTask throw error
                // because the err may from reschedule, so the fromState maybe notScheduled
                task._transitionTo(unknown, scheduling, notScheduled);
                // TODO: @JiaLiPassion, should we check the result from handleError?
                this._zoneDelegate.handleError(this, err);
                throw err;
            }
            if (task._zoneDelegates === zoneDelegates) {
                // we have to check because internally the delegate can reschedule the task.
                this._updateTaskCount(task, 1);
            }
            if (task.state == scheduling) {
                task._transitionTo(scheduled, scheduling);
            }
            return task;
        };
        Zone.prototype.scheduleMicroTask = function (source, callback, data, customSchedule) {
            return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, null));
        };
        Zone.prototype.scheduleMacroTask = function (source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.scheduleEventTask = function (source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.cancelTask = function (task) {
            if (task.zone != this)
                throw new Error('A task can only be cancelled in the zone of creation! (Creation: ' +
                    (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
            task._transitionTo(canceling, scheduled, running);
            try {
                this._zoneDelegate.cancelTask(this, task);
            }
            catch (err) {
                // if error occurs when cancelTask, transit the state to unknown
                task._transitionTo(unknown, canceling);
                this._zoneDelegate.handleError(this, err);
                throw err;
            }
            this._updateTaskCount(task, -1);
            task._transitionTo(notScheduled, canceling);
            task.runCount = 0;
            return task;
        };
        Zone.prototype._updateTaskCount = function (task, count) {
            var zoneDelegates = task._zoneDelegates;
            if (count == -1) {
                task._zoneDelegates = null;
            }
            for (var i = 0; i < zoneDelegates.length; i++) {
                zoneDelegates[i]._updateTaskCount(task.type, count);
            }
        };
        return Zone;
    }());
    Zone.__symbol__ = __symbol__;
    var DELEGATE_ZS = {
        name: '',
        onHasTask: function (delegate, _, target, hasTaskState) {
            return delegate.hasTask(target, hasTaskState);
        },
        onScheduleTask: function (delegate, _, target, task) {
            return delegate.scheduleTask(target, task);
        },
        onInvokeTask: function (delegate, _, target, task, applyThis, applyArgs) { return delegate.invokeTask(target, task, applyThis, applyArgs); },
        onCancelTask: function (delegate, _, target, task) {
            return delegate.cancelTask(target, task);
        }
    };
    var ZoneDelegate = (function () {
        function ZoneDelegate(zone, parentDelegate, zoneSpec) {
            this._taskCounts = { 'microTask': 0, 'macroTask': 0, 'eventTask': 0 };
            this.zone = zone;
            this._parentDelegate = parentDelegate;
            this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
            this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
            this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate.zone);
            this._interceptZS =
                zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
            this._interceptDlgt =
                zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
            this._interceptCurrZone =
                zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate.zone);
            this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
            this._invokeDlgt =
                zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
            this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate.zone);
            this._handleErrorZS =
                zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
            this._handleErrorDlgt =
                zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
            this._handleErrorCurrZone =
                zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate.zone);
            this._scheduleTaskZS =
                zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
            this._scheduleTaskDlgt =
                zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
            this._scheduleTaskCurrZone =
                zoneSpec && (zoneSpec.onScheduleTask ? this.zone : parentDelegate.zone);
            this._invokeTaskZS =
                zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
            this._invokeTaskDlgt =
                zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
            this._invokeTaskCurrZone =
                zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate.zone);
            this._cancelTaskZS =
                zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
            this._cancelTaskDlgt =
                zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
            this._cancelTaskCurrZone =
                zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate.zone);
            this._hasTaskZS = null;
            this._hasTaskDlgt = null;
            this._hasTaskDlgtOwner = null;
            this._hasTaskCurrZone = null;
            var zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
            var parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
            if (zoneSpecHasTask || parentHasTask) {
                // If we need to report hasTask, than this ZS needs to do ref counting on tasks. In such
                // a case all task related interceptors must go through this ZD. We can't short circuit it.
                this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
                this._hasTaskDlgt = parentDelegate;
                this._hasTaskDlgtOwner = this;
                this._hasTaskCurrZone = zone;
                if (!zoneSpec.onScheduleTask) {
                    this._scheduleTaskZS = DELEGATE_ZS;
                    this._scheduleTaskDlgt = parentDelegate;
                    this._scheduleTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onInvokeTask) {
                    this._invokeTaskZS = DELEGATE_ZS;
                    this._invokeTaskDlgt = parentDelegate;
                    this._invokeTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onCancelTask) {
                    this._cancelTaskZS = DELEGATE_ZS;
                    this._cancelTaskDlgt = parentDelegate;
                    this._cancelTaskCurrZone = this.zone;
                }
            }
        }
        ZoneDelegate.prototype.fork = function (targetZone, zoneSpec) {
            return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) :
                new Zone(targetZone, zoneSpec);
        };
        ZoneDelegate.prototype.intercept = function (targetZone, callback, source) {
            return this._interceptZS ?
                this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) :
                callback;
        };
        ZoneDelegate.prototype.invoke = function (targetZone, callback, applyThis, applyArgs, source) {
            return this._invokeZS ?
                this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) :
                callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.handleError = function (targetZone, error) {
            return this._handleErrorZS ?
                this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) :
                true;
        };
        ZoneDelegate.prototype.scheduleTask = function (targetZone, task) {
            var returnTask = task;
            if (this._scheduleTaskZS) {
                if (this._hasTaskZS) {
                    returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
                }
                returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
                if (!returnTask)
                    returnTask = task;
            }
            else {
                if (task.scheduleFn) {
                    task.scheduleFn(task);
                }
                else if (task.type == microTask) {
                    scheduleMicroTask(task);
                }
                else {
                    throw new Error('Task is missing scheduleFn.');
                }
            }
            return returnTask;
        };
        ZoneDelegate.prototype.invokeTask = function (targetZone, task, applyThis, applyArgs) {
            return this._invokeTaskZS ?
                this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) :
                task.callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.cancelTask = function (targetZone, task) {
            var value;
            if (this._cancelTaskZS) {
                value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
            }
            else {
                if (!task.cancelFn) {
                    throw Error('Task is not cancelable');
                }
                value = task.cancelFn(task);
            }
            return value;
        };
        ZoneDelegate.prototype.hasTask = function (targetZone, isEmpty) {
            // hasTask should not throw error so other ZoneDelegate
            // can still trigger hasTask callback
            try {
                return this._hasTaskZS &&
                    this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
            }
            catch (err) {
                this.handleError(targetZone, err);
            }
        };
        ZoneDelegate.prototype._updateTaskCount = function (type, count) {
            var counts = this._taskCounts;
            var prev = counts[type];
            var next = counts[type] = prev + count;
            if (next < 0) {
                throw new Error('More tasks executed then were scheduled.');
            }
            if (prev == 0 || next == 0) {
                var isEmpty = {
                    microTask: counts.microTask > 0,
                    macroTask: counts.macroTask > 0,
                    eventTask: counts.eventTask > 0,
                    change: type
                };
                this.hasTask(this.zone, isEmpty);
            }
        };
        return ZoneDelegate;
    }());
    var ZoneTask = (function () {
        function ZoneTask(type, source, callback, options, scheduleFn, cancelFn) {
            this._zone = null;
            this.runCount = 0;
            this._zoneDelegates = null;
            this._state = 'notScheduled';
            this.type = type;
            this.source = source;
            this.data = options;
            this.scheduleFn = scheduleFn;
            this.cancelFn = cancelFn;
            this.callback = callback;
            var self = this;
            this.invoke = function () {
                _numberOfNestedTaskFrames++;
                try {
                    self.runCount++;
                    return self.zone.runTask(self, this, arguments);
                }
                finally {
                    if (_numberOfNestedTaskFrames == 1) {
                        drainMicroTaskQueue();
                    }
                    _numberOfNestedTaskFrames--;
                }
            };
        }
        Object.defineProperty(ZoneTask.prototype, "zone", {
            get: function () {
                return this._zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ZoneTask.prototype, "state", {
            get: function () {
                return this._state;
            },
            enumerable: true,
            configurable: true
        });
        ZoneTask.prototype.cancelScheduleRequest = function () {
            this._transitionTo(notScheduled, scheduling);
        };
        ZoneTask.prototype._transitionTo = function (toState, fromState1, fromState2) {
            if (this._state === fromState1 || this._state === fromState2) {
                this._state = toState;
                if (toState == notScheduled) {
                    this._zoneDelegates = null;
                }
            }
            else {
                throw new Error(this.type + " '" + this.source + "': can not transition to '" + toState + "', expecting state '" + fromState1 + "'" + (fromState2 ?
                    ' or \'' + fromState2 + '\'' :
                    '') + ", was '" + this._state + "'.");
            }
        };
        ZoneTask.prototype.toString = function () {
            if (this.data && typeof this.data.handleId !== 'undefined') {
                return this.data.handleId;
            }
            else {
                return Object.prototype.toString.call(this);
            }
        };
        // add toJSON method to prevent cyclic error when
        // call JSON.stringify(zoneTask)
        ZoneTask.prototype.toJSON = function () {
            return {
                type: this.type,
                state: this.state,
                source: this.source,
                zone: this.zone.name,
                invoke: this.invoke,
                scheduleFn: this.scheduleFn,
                cancelFn: this.cancelFn,
                runCount: this.runCount,
                callback: this.callback
            };
        };
        return ZoneTask;
    }());
    var ZoneFrame = (function () {
        function ZoneFrame(parent, zone) {
            this.parent = parent;
            this.zone = zone;
        }
        return ZoneFrame;
    }());
    function __symbol__(name) {
        return '__zone_symbol__' + name;
    }
    var symbolSetTimeout = __symbol__('setTimeout');
    var symbolPromise = __symbol__('Promise');
    var symbolThen = __symbol__('then');
    var _currentZoneFrame = new ZoneFrame(null, new Zone(null, null));
    var _currentTask = null;
    var _microTaskQueue = [];
    var _isDrainingMicrotaskQueue = false;
    var _uncaughtPromiseErrors = [];
    var _numberOfNestedTaskFrames = 0;
    function scheduleQueueDrain() {
        // if we are not running in any task, and there has not been anything scheduled
        // we must bootstrap the initial task creation by manually scheduling the drain
        if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
            // We are not running in Task, so we need to kickstart the microtask queue.
            if (global[symbolPromise]) {
                global[symbolPromise].resolve(0)[symbolThen](drainMicroTaskQueue);
            }
            else {
                global[symbolSetTimeout](drainMicroTaskQueue, 0);
            }
        }
    }
    function scheduleMicroTask(task) {
        scheduleQueueDrain();
        _microTaskQueue.push(task);
    }
    function consoleError(e) {
        if (Zone[__symbol__('ignoreConsoleErrorUncaughtError')]) {
            return;
        }
        var rejection = e && e.rejection;
        if (rejection) {
            console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
        }
        console.error(e);
    }
    function handleUnhandledRejection(e) {
        consoleError(e);
        try {
            var handler = Zone[__symbol__('unhandledPromiseRejectionHandler')];
            if (handler && typeof handler === 'function') {
                handler.apply(this, [e]);
            }
        }
        catch (err) {
        }
    }
    function drainMicroTaskQueue() {
        if (!_isDrainingMicrotaskQueue) {
            _isDrainingMicrotaskQueue = true;
            while (_microTaskQueue.length) {
                var queue = _microTaskQueue;
                _microTaskQueue = [];
                for (var i = 0; i < queue.length; i++) {
                    var task = queue[i];
                    try {
                        task.zone.runTask(task, null, null);
                    }
                    catch (error) {
                        consoleError(error);
                    }
                }
            }
            while (_uncaughtPromiseErrors.length) {
                var _loop_1 = function () {
                    var uncaughtPromiseError = _uncaughtPromiseErrors.shift();
                    try {
                        uncaughtPromiseError.zone.runGuarded(function () {
                            throw uncaughtPromiseError;
                        });
                    }
                    catch (error) {
                        handleUnhandledRejection(error);
                    }
                };
                while (_uncaughtPromiseErrors.length) {
                    _loop_1();
                }
            }
            _isDrainingMicrotaskQueue = false;
        }
    }
    function isThenable(value) {
        return value && value.then;
    }
    function forwardResolution(value) {
        return value;
    }
    function forwardRejection(rejection) {
        return ZoneAwarePromise.reject(rejection);
    }
    var symbolState = __symbol__('state');
    var symbolValue = __symbol__('value');
    var source = 'Promise.then';
    var UNRESOLVED = null;
    var RESOLVED = true;
    var REJECTED = false;
    var REJECTED_NO_CATCH = 0;
    function makeResolver(promise, state) {
        return function (v) {
            try {
                resolvePromise(promise, state, v);
            }
            catch (err) {
                resolvePromise(promise, false, err);
            }
            // Do not return value or you will break the Promise spec.
        };
    }
    var once = function () {
        var wasCalled = false;
        return function wrapper(wrappedFunction) {
            return function () {
                if (wasCalled) {
                    return;
                }
                wasCalled = true;
                wrappedFunction.apply(null, arguments);
            };
        };
    };
    // Promise Resolution
    function resolvePromise(promise, state, value) {
        var onceWrapper = once();
        if (promise === value) {
            throw new TypeError('Promise resolved with itself');
        }
        if (promise[symbolState] === UNRESOLVED) {
            // should only get value.then once based on promise spec.
            var then = null;
            try {
                if (typeof value === 'object' || typeof value === 'function') {
                    then = value && value.then;
                }
            }
            catch (err) {
                onceWrapper(function () {
                    resolvePromise(promise, false, err);
                })();
                return promise;
            }
            // if (value instanceof ZoneAwarePromise) {
            if (state !== REJECTED && value instanceof ZoneAwarePromise &&
                value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) &&
                value[symbolState] !== UNRESOLVED) {
                clearRejectedNoCatch(value);
                resolvePromise(promise, value[symbolState], value[symbolValue]);
            }
            else if (state !== REJECTED && typeof then === 'function') {
                try {
                    then.apply(value, [
                        onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false))
                    ]);
                }
                catch (err) {
                    onceWrapper(function () {
                        resolvePromise(promise, false, err);
                    })();
                }
            }
            else {
                promise[symbolState] = state;
                var queue = promise[symbolValue];
                promise[symbolValue] = value;
                // record task information in value when error occurs, so we can
                // do some additional work such as render longStackTrace
                if (state === REJECTED && value instanceof Error) {
                    value[__symbol__('currentTask')] = Zone.currentTask;
                }
                for (var i = 0; i < queue.length;) {
                    scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
                }
                if (queue.length == 0 && state == REJECTED) {
                    promise[symbolState] = REJECTED_NO_CATCH;
                    try {
                        throw new Error('Uncaught (in promise): ' + value +
                            (value && value.stack ? '\n' + value.stack : ''));
                    }
                    catch (err) {
                        var error_1 = err;
                        error_1.rejection = value;
                        error_1.promise = promise;
                        error_1.zone = Zone.current;
                        error_1.task = Zone.currentTask;
                        _uncaughtPromiseErrors.push(error_1);
                        scheduleQueueDrain();
                    }
                }
            }
        }
        // Resolving an already resolved promise is a noop.
        return promise;
    }
    function clearRejectedNoCatch(promise) {
        if (promise[symbolState] === REJECTED_NO_CATCH) {
            // if the promise is rejected no catch status
            // and queue.length > 0, means there is a error handler
            // here to handle the rejected promise, we should trigger
            // windows.rejectionhandled eventHandler or nodejs rejectionHandled
            // eventHandler
            try {
                var handler = Zone[__symbol__('rejectionHandledHandler')];
                if (handler && typeof handler === 'function') {
                    handler.apply(this, [{ rejection: promise[symbolValue], promise: promise }]);
                }
            }
            catch (err) {
            }
            promise[symbolState] = REJECTED;
            for (var i = 0; i < _uncaughtPromiseErrors.length; i++) {
                if (promise === _uncaughtPromiseErrors[i].promise) {
                    _uncaughtPromiseErrors.splice(i, 1);
                }
            }
        }
    }
    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
        clearRejectedNoCatch(promise);
        var delegate = promise[symbolState] ?
            (typeof onFulfilled === 'function') ? onFulfilled : forwardResolution :
            (typeof onRejected === 'function') ? onRejected : forwardRejection;
        zone.scheduleMicroTask(source, function () {
            try {
                resolvePromise(chainPromise, true, zone.run(delegate, undefined, [promise[symbolValue]]));
            }
            catch (error) {
                resolvePromise(chainPromise, false, error);
            }
        });
    }
    var ZoneAwarePromise = (function () {
        function ZoneAwarePromise(executor) {
            var promise = this;
            if (!(promise instanceof ZoneAwarePromise)) {
                throw new Error('Must be an instanceof Promise.');
            }
            promise[symbolState] = UNRESOLVED;
            promise[symbolValue] = []; // queue;
            try {
                executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
            }
            catch (error) {
                resolvePromise(promise, false, error);
            }
        }
        ZoneAwarePromise.toString = function () {
            return 'function ZoneAwarePromise() { [native code] }';
        };
        ZoneAwarePromise.resolve = function (value) {
            return resolvePromise(new this(null), RESOLVED, value);
        };
        ZoneAwarePromise.reject = function (error) {
            return resolvePromise(new this(null), REJECTED, error);
        };
        ZoneAwarePromise.race = function (values) {
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                _a = [res, rej], resolve = _a[0], reject = _a[1];
                var _a;
            });
            function onResolve(value) {
                promise && (promise = null || resolve(value));
            }
            function onReject(error) {
                promise && (promise = null || reject(error));
            }
            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                var value = values_1[_i];
                if (!isThenable(value)) {
                    value = this.resolve(value);
                }
                value.then(onResolve, onReject);
            }
            return promise;
        };
        ZoneAwarePromise.all = function (values) {
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                resolve = res;
                reject = rej;
            });
            var count = 0;
            var resolvedValues = [];
            for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
                var value = values_2[_i];
                if (!isThenable(value)) {
                    value = this.resolve(value);
                }
                value.then((function (index) { return function (value) {
                    resolvedValues[index] = value;
                    count--;
                    if (!count) {
                        resolve(resolvedValues);
                    }
                }; })(count), reject);
                count++;
            }
            if (!count)
                resolve(resolvedValues);
            return promise;
        };
        ZoneAwarePromise.prototype.then = function (onFulfilled, onRejected) {
            var chainPromise = new this.constructor(null);
            var zone = Zone.current;
            if (this[symbolState] == UNRESOLVED) {
                this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
            }
            else {
                scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
            }
            return chainPromise;
        };
        ZoneAwarePromise.prototype.catch = function (onRejected) {
            return this.then(null, onRejected);
        };
        return ZoneAwarePromise;
    }());
    // Protect against aggressive optimizers dropping seemingly unused properties.
    // E.g. Closure Compiler in advanced mode.
    ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;
    ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;
    ZoneAwarePromise['race'] = ZoneAwarePromise.race;
    ZoneAwarePromise['all'] = ZoneAwarePromise.all;
    var NativePromise = global[symbolPromise] = global['Promise'];
    global['Promise'] = ZoneAwarePromise;
    var symbolThenPatched = __symbol__('thenPatched');
    function patchThen(Ctor) {
        var proto = Ctor.prototype;
        var originalThen = proto.then;
        // Keep a reference to the original method.
        proto[symbolThen] = originalThen;
        Ctor.prototype.then = function (onResolve, onReject) {
            var _this = this;
            var wrapped = new ZoneAwarePromise(function (resolve, reject) {
                originalThen.call(_this, resolve, reject);
            });
            return wrapped.then(onResolve, onReject);
        };
        Ctor[symbolThenPatched] = true;
    }
    function zoneify(fn) {
        return function () {
            var resultPromise = fn.apply(this, arguments);
            if (resultPromise instanceof ZoneAwarePromise) {
                return resultPromise;
            }
            var ctor = resultPromise.constructor;
            if (!ctor[symbolThenPatched]) {
                patchThen(ctor);
            }
            return resultPromise;
        };
    }
    if (NativePromise) {
        patchThen(NativePromise);
        var fetch_1 = global['fetch'];
        if (typeof fetch_1 == 'function') {
            global['fetch'] = zoneify(fetch_1);
        }
    }
    // This is not part of public API, but it is useful for tests, so we expose it.
    Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
    var blacklistedStackFramesSymbol = Zone.__symbol__('blacklistedStackFrames');
    var NativeError = global[__symbol__('Error')] = global.Error;
    // Store the frames which should be removed from the stack frames
    var blackListedStackFrames = {};
    // We must find the frame where Error was created, otherwise we assume we don't understand stack
    var zoneAwareFrame1;
    var zoneAwareFrame2;
    global.Error = ZoneAwareError;
    var stackRewrite = 'stackRewrite';
    /**
     * This is ZoneAwareError which processes the stack frame and cleans up extra frames as well as
     * adds zone information to it.
     */
    function ZoneAwareError() {
        var _this = this;
        // We always have to return native error otherwise the browser console will not work.
        var error = NativeError.apply(this, arguments);
        // Save original stack trace
        var originalStack = error['originalStack'] = error.stack;
        // Process the stack trace and rewrite the frames.
        if (ZoneAwareError[stackRewrite] && originalStack) {
            var frames_1 = originalStack.split('\n');
            var zoneFrame = _currentZoneFrame;
            var i = 0;
            // Find the first frame
            while (!(frames_1[i] === zoneAwareFrame1 || frames_1[i] === zoneAwareFrame2) &&
                i < frames_1.length) {
                i++;
            }
            for (; i < frames_1.length && zoneFrame; i++) {
                var frame = frames_1[i];
                if (frame.trim()) {
                    switch (blackListedStackFrames[frame]) {
                        case 0 /* blackList */:
                            frames_1.splice(i, 1);
                            i--;
                            break;
                        case 1 /* transition */:
                            if (zoneFrame.parent) {
                                // This is the special frame where zone changed. Print and process it accordingly
                                zoneFrame = zoneFrame.parent;
                            }
                            else {
                                zoneFrame = null;
                            }
                            frames_1.splice(i, 1);
                            i--;
                            break;
                        default:
                            frames_1[i] += " [" + zoneFrame.zone.name + "]";
                    }
                }
            }
            try {
                error.stack = error.zoneAwareStack = frames_1.join('\n');
            }
            catch (e) {
                // ignore as some browsers don't allow overriding of stack
            }
        }
        if (this instanceof NativeError && this.constructor != NativeError) {
            // We got called with a `new` operator AND we are subclass of ZoneAwareError
            // in that case we have to copy all of our properties to `this`.
            Object.keys(error).concat('stack', 'message').forEach(function (key) {
                if (error[key] !== undefined) {
                    try {
                        _this[key] = error[key];
                    }
                    catch (e) {
                        // ignore the assignment in case it is a setter and it throws.
                    }
                }
            });
            return this;
        }
        return error;
    }
    // Copy the prototype so that instanceof operator works as expected
    ZoneAwareError.prototype = NativeError.prototype;
    ZoneAwareError[blacklistedStackFramesSymbol] = blackListedStackFrames;
    ZoneAwareError[stackRewrite] = false;
    // those properties need special handling
    var specialPropertyNames = ['stackTraceLimit', 'captureStackTrace', 'prepareStackTrace'];
    // those properties of NativeError should be set to ZoneAwareError
    var nativeErrorProperties = Object.keys(NativeError);
    if (nativeErrorProperties) {
        nativeErrorProperties.forEach(function (prop) {
            if (specialPropertyNames.filter(function (sp) { return sp === prop; }).length === 0) {
                Object.defineProperty(ZoneAwareError, prop, {
                    get: function () {
                        return NativeError[prop];
                    },
                    set: function (value) {
                        NativeError[prop] = value;
                    }
                });
            }
        });
    }
    if (NativeError.hasOwnProperty('stackTraceLimit')) {
        // Extend default stack limit as we will be removing few frames.
        NativeError.stackTraceLimit = Math.max(NativeError.stackTraceLimit, 15);
        // make sure that ZoneAwareError has the same property which forwards to NativeError.
        Object.defineProperty(ZoneAwareError, 'stackTraceLimit', {
            get: function () {
                return NativeError.stackTraceLimit;
            },
            set: function (value) {
                return NativeError.stackTraceLimit = value;
            }
        });
    }
    if (NativeError.hasOwnProperty('captureStackTrace')) {
        Object.defineProperty(ZoneAwareError, 'captureStackTrace', {
            // add named function here because we need to remove this
            // stack frame when prepareStackTrace below
            value: function zoneCaptureStackTrace(targetObject, constructorOpt) {
                NativeError.captureStackTrace(targetObject, constructorOpt);
            }
        });
    }
    Object.defineProperty(ZoneAwareError, 'prepareStackTrace', {
        get: function () {
            return NativeError.prepareStackTrace;
        },
        set: function (value) {
            if (!value || typeof value !== 'function') {
                return NativeError.prepareStackTrace = value;
            }
            return NativeError.prepareStackTrace = function (error, structuredStackTrace) {
                // remove additional stack information from ZoneAwareError.captureStackTrace
                if (structuredStackTrace) {
                    for (var i = 0; i < structuredStackTrace.length; i++) {
                        var st = structuredStackTrace[i];
                        // remove the first function which name is zoneCaptureStackTrace
                        if (st.getFunctionName() === 'zoneCaptureStackTrace') {
                            structuredStackTrace.splice(i, 1);
                            break;
                        }
                    }
                }
                return value.apply(this, [error, structuredStackTrace]);
            };
        }
    });
    // Now we need to populate the `blacklistedStackFrames` as well as find the
    // run/runGuarded/runTask frames. This is done by creating a detect zone and then threading
    // the execution through all of the above methods so that we can look at the stack trace and
    // find the frames of interest.
    var detectZone = Zone.current.fork({
        name: 'detect',
        onHandleError: function (parentZD, current, target, error) {
            if (error.originalStack && Error === ZoneAwareError) {
                var frames_2 = error.originalStack.split(/\n/);
                var runFrame = false, runGuardedFrame = false, runTaskFrame = false;
                while (frames_2.length) {
                    var frame = frames_2.shift();
                    // On safari it is possible to have stack frame with no line number.
                    // This check makes sure that we don't filter frames on name only (must have
                    // linenumber)
                    if (/:\d+:\d+/.test(frame)) {
                        // Get rid of the path so that we don't accidentally find function name in path.
                        // In chrome the separator is `(` and `@` in FF and safari
                        // Chrome: at Zone.run (zone.js:100)
                        // Chrome: at Zone.run (http://localhost:9876/base/build/lib/zone.js:100:24)
                        // FireFox: Zone.prototype.run@http://localhost:9876/base/build/lib/zone.js:101:24
                        // Safari: run@http://localhost:9876/base/build/lib/zone.js:101:24
                        var fnName = frame.split('(')[0].split('@')[0];
                        var frameType = 1;
                        if (fnName.indexOf('ZoneAwareError') !== -1) {
                            zoneAwareFrame1 = frame;
                            zoneAwareFrame2 = frame.replace('Error.', '');
                            blackListedStackFrames[zoneAwareFrame2] = 0 /* blackList */;
                        }
                        if (fnName.indexOf('runGuarded') !== -1) {
                            runGuardedFrame = true;
                        }
                        else if (fnName.indexOf('runTask') !== -1) {
                            runTaskFrame = true;
                        }
                        else if (fnName.indexOf('run') !== -1) {
                            runFrame = true;
                        }
                        else {
                            frameType = 0 /* blackList */;
                        }
                        blackListedStackFrames[frame] = frameType;
                        // Once we find all of the frames we can stop looking.
                        if (runFrame && runGuardedFrame && runTaskFrame) {
                            ZoneAwareError[stackRewrite] = true;
                            break;
                        }
                    }
                }
            }
            return false;
        }
    });
    // carefully constructor a stack frame which contains all of the frames of interest which
    // need to be detected and blacklisted.
    var childDetectZone = detectZone.fork({
        name: 'child',
        onScheduleTask: function (delegate, curr, target, task) {
            return delegate.scheduleTask(target, task);
        },
        onInvokeTask: function (delegate, curr, target, task, applyThis, applyArgs) {
            return delegate.invokeTask(target, task, applyThis, applyArgs);
        },
        onCancelTask: function (delegate, curr, target, task) {
            return delegate.cancelTask(target, task);
        },
        onInvoke: function (delegate, curr, target, callback, applyThis, applyArgs, source) {
            return delegate.invoke(target, callback, applyThis, applyArgs, source);
        }
    });
    // we need to detect all zone related frames, it will
    // exceed default stackTraceLimit, so we set it to
    // larger number here, and restore it after detect finish.
    var originalStackTraceLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = 100;
    // we schedule event/micro/macro task, and invoke them
    // when onSchedule, so we can get all stack traces for
    // all kinds of tasks with one error thrown.
    childDetectZone.run(function () {
        childDetectZone.runGuarded(function () {
            var fakeTransitionTo = function (toState, fromState1, fromState2) { };
            childDetectZone.scheduleEventTask(blacklistedStackFramesSymbol, function () {
                childDetectZone.scheduleMacroTask(blacklistedStackFramesSymbol, function () {
                    childDetectZone.scheduleMicroTask(blacklistedStackFramesSymbol, function () {
                        throw new ZoneAwareError(ZoneAwareError, NativeError);
                    }, null, function (t) {
                        t._transitionTo = fakeTransitionTo;
                        t.invoke();
                    });
                }, null, function (t) {
                    t._transitionTo = fakeTransitionTo;
                    t.invoke();
                }, function () { });
            }, null, function (t) {
                t._transitionTo = fakeTransitionTo;
                t.invoke();
            }, function () { });
        });
    });
    Error.stackTraceLimit = originalStackTraceLimit;
    return global['Zone'] = Zone;
})(typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || global);

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Suppress closure compiler errors about unknown 'Zone' variable
 * @fileoverview
 * @suppress {undefinedVars,globalThis}
 */
var zoneSymbol = function (n) { return "__zone_symbol__" + n; };
var _global$1 = typeof window === 'object' && window || typeof self === 'object' && self || global;
function bindArguments(args, source) {
    for (var i = args.length - 1; i >= 0; i--) {
        if (typeof args[i] === 'function') {
            args[i] = Zone.current.wrap(args[i], source + '_' + i);
        }
    }
    return args;
}
function patchPrototype(prototype, fnNames) {
    var source = prototype.constructor['name'];
    var _loop_1 = function (i) {
        var name_1 = fnNames[i];
        var delegate = prototype[name_1];
        if (delegate) {
            prototype[name_1] = (function (delegate) {
                var patched = function () {
                    return delegate.apply(this, bindArguments(arguments, source + '.' + name_1));
                };
                attachOriginToPatched(patched, delegate);
                return patched;
            })(delegate);
        }
    };
    for (var i = 0; i < fnNames.length; i++) {
        _loop_1(i);
    }
}
var isWebWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);
var isNode = (!('nw' in _global$1) && typeof process !== 'undefined' &&
    {}.toString.call(process) === '[object process]');
var isBrowser = !isNode && !isWebWorker && !!(typeof window !== 'undefined' && window['HTMLElement']);
// we are in electron of nw, so we are both browser and nodejs
var isMix = typeof process !== 'undefined' &&
    {}.toString.call(process) === '[object process]' && !isWebWorker &&
    !!(typeof window !== 'undefined' && window['HTMLElement']);
function patchProperty(obj, prop) {
    var desc = Object.getOwnPropertyDescriptor(obj, prop) || { enumerable: true, configurable: true };
    // if the descriptor is not configurable
    // just return
    if (!desc.configurable) {
        return;
    }
    // A property descriptor cannot have getter/setter and be writable
    // deleting the writable and value properties avoids this error:
    //
    // TypeError: property descriptors must not specify a value or be writable when a
    // getter or setter has been specified
    delete desc.writable;
    delete desc.value;
    var originalDescGet = desc.get;
    // substr(2) cuz 'onclick' -> 'click', etc
    var eventName = prop.substr(2);
    var _prop = zoneSymbol('_' + prop);
    desc.set = function (newValue) {
        // in some of windows's onproperty callback, this is undefined
        // so we need to check it
        var target = this;
        if (!target && obj === _global$1) {
            target = _global$1;
        }
        if (!target) {
            return;
        }
        var previousValue = target[_prop];
        if (previousValue) {
            target.removeEventListener(eventName, previousValue);
        }
        if (typeof newValue === 'function') {
            var wrapFn = function (event) {
                var result = newValue.apply(this, arguments);
                if (result != undefined && !result) {
                    event.preventDefault();
                }
                return result;
            };
            target[_prop] = wrapFn;
            target.addEventListener(eventName, wrapFn, false);
        }
        else {
            target[_prop] = null;
        }
    };
    // The getter would return undefined for unassigned properties but the default value of an
    // unassigned property is null
    desc.get = function () {
        // in some of windows's onproperty callback, this is undefined
        // so we need to check it
        var target = this;
        if (!target && obj === _global$1) {
            target = _global$1;
        }
        if (!target) {
            return null;
        }
        if (target.hasOwnProperty(_prop)) {
            return target[_prop];
        }
        else if (originalDescGet) {
            // result will be null when use inline event attribute,
            // such as <button onclick="func();">OK</button>
            // because the onclick function is internal raw uncompiled handler
            // the onclick will be evaluated when first time event was triggered or
            // the property is accessed, https://github.com/angular/zone.js/issues/525
            // so we should use original native get to retrieve the handler
            var value = originalDescGet.apply(this);
            if (value) {
                desc.set.apply(this, [value]);
                if (typeof target['removeAttribute'] === 'function') {
                    target.removeAttribute(prop);
                }
                return value;
            }
        }
        return null;
    };
    Object.defineProperty(obj, prop, desc);
}
function patchOnProperties(obj, properties) {
    if (properties) {
        for (var i = 0; i < properties.length; i++) {
            patchProperty(obj, 'on' + properties[i]);
        }
    }
    else {
        var onProperties = [];
        for (var prop in obj) {
            if (prop.substr(0, 2) == 'on') {
                onProperties.push(prop);
            }
        }
        for (var j = 0; j < onProperties.length; j++) {
            patchProperty(obj, onProperties[j]);
        }
    }
}
var EVENT_TASKS = zoneSymbol('eventTasks');
// For EventTarget
var ADD_EVENT_LISTENER = 'addEventListener';
var REMOVE_EVENT_LISTENER = 'removeEventListener';
// compare the EventListenerOptionsOrCapture
// 1. if the options is usCapture: boolean, compare the useCpature values directly
// 2. if the options is EventListerOptions, only compare the capture
function compareEventListenerOptions(left, right) {
    var leftCapture = (typeof left === 'boolean') ?
        left :
        ((typeof left === 'object') ? (left && left.capture) : false);
    var rightCapture = (typeof right === 'boolean') ?
        right :
        ((typeof right === 'object') ? (right && right.capture) : false);
    return !!leftCapture === !!rightCapture;
}
function findExistingRegisteredTask(target, handler, name, options, remove) {
    var eventTasks = target[EVENT_TASKS];
    if (eventTasks) {
        for (var i = 0; i < eventTasks.length; i++) {
            var eventTask = eventTasks[i];
            var data = eventTask.data;
            var listener = data.handler;
            if ((data.handler === handler || listener.listener === handler) &&
                compareEventListenerOptions(data.options, options) && data.eventName === name) {
                if (remove) {
                    eventTasks.splice(i, 1);
                }
                return eventTask;
            }
        }
    }
    return null;
}
function attachRegisteredEvent(target, eventTask, isPrepend) {
    var eventTasks = target[EVENT_TASKS];
    if (!eventTasks) {
        eventTasks = target[EVENT_TASKS] = [];
    }
    if (isPrepend) {
        eventTasks.unshift(eventTask);
    }
    else {
        eventTasks.push(eventTask);
    }
}
var defaultListenerMetaCreator = function (self, args) {
    return {
        options: args[2],
        eventName: args[0],
        handler: args[1],
        target: self || _global$1,
        name: args[0],
        crossContext: false,
        invokeAddFunc: function (addFnSymbol, delegate) {
            // check if the data is cross site context, if it is, fallback to
            // remove the delegate directly and try catch error
            if (!this.crossContext) {
                if (delegate && delegate.invoke) {
                    return this.target[addFnSymbol](this.eventName, delegate.invoke, this.options);
                }
                else {
                    return this.target[addFnSymbol](this.eventName, delegate, this.options);
                }
            }
            else {
                // add a if/else branch here for performance concern, for most times
                // cross site context is false, so we don't need to try/catch
                try {
                    return this.target[addFnSymbol](this.eventName, delegate, this.options);
                }
                catch (err) {
                    // do nothing here is fine, because objects in a cross-site context are unusable
                }
            }
        },
        invokeRemoveFunc: function (removeFnSymbol, delegate) {
            // check if the data is cross site context, if it is, fallback to
            // remove the delegate directly and try catch error
            if (!this.crossContext) {
                if (delegate && delegate.invoke) {
                    return this.target[removeFnSymbol](this.eventName, delegate.invoke, this.options);
                }
                else {
                    return this.target[removeFnSymbol](this.eventName, delegate, this.options);
                }
            }
            else {
                // add a if/else branch here for performance concern, for most times
                // cross site context is false, so we don't need to try/catch
                try {
                    return this.target[removeFnSymbol](this.eventName, delegate, this.options);
                }
                catch (err) {
                    // do nothing here is fine, because objects in a cross-site context are unusable
                }
            }
        }
    };
};
function makeZoneAwareAddListener(addFnName, removeFnName, useCapturingParam, allowDuplicates, isPrepend, metaCreator) {
    if (useCapturingParam === void 0) { useCapturingParam = true; }
    if (allowDuplicates === void 0) { allowDuplicates = false; }
    if (isPrepend === void 0) { isPrepend = false; }
    if (metaCreator === void 0) { metaCreator = defaultListenerMetaCreator; }
    var addFnSymbol = zoneSymbol(addFnName);
    var removeFnSymbol = zoneSymbol(removeFnName);
    var defaultUseCapturing = useCapturingParam ? false : undefined;
    function scheduleEventListener(eventTask) {
        var meta = eventTask.data;
        attachRegisteredEvent(meta.target, eventTask, isPrepend);
        return meta.invokeAddFunc(addFnSymbol, eventTask);
    }
    function cancelEventListener(eventTask) {
        var meta = eventTask.data;
        findExistingRegisteredTask(meta.target, eventTask.invoke, meta.eventName, meta.options, true);
        return meta.invokeRemoveFunc(removeFnSymbol, eventTask);
    }
    return function zoneAwareAddListener(self, args) {
        var data = metaCreator(self, args);
        data.options = data.options || defaultUseCapturing;
        // - Inside a Web Worker, `this` is undefined, the context is `global`
        // - When `addEventListener` is called on the global context in strict mode, `this` is undefined
        // see https://github.com/angular/zone.js/issues/190
        var delegate = null;
        if (typeof data.handler == 'function') {
            delegate = data.handler;
        }
        else if (data.handler && data.handler.handleEvent) {
            delegate = function (event) { return data.handler.handleEvent(event); };
        }
        var validZoneHandler = false;
        try {
            // In cross site contexts (such as WebDriver frameworks like Selenium),
            // accessing the handler object here will cause an exception to be thrown which
            // will fail tests prematurely.
            validZoneHandler = data.handler && data.handler.toString() === '[object FunctionWrapper]';
        }
        catch (error) {
            // we can still try to add the data.handler even we are in cross site context
            data.crossContext = true;
            return data.invokeAddFunc(addFnSymbol, data.handler);
        }
        // Ignore special listeners of IE11 & Edge dev tools, see
        // https://github.com/angular/zone.js/issues/150
        if (!delegate || validZoneHandler) {
            return data.invokeAddFunc(addFnSymbol, data.handler);
        }
        if (!allowDuplicates) {
            var eventTask = findExistingRegisteredTask(data.target, data.handler, data.eventName, data.options, false);
            if (eventTask) {
                // we already registered, so this will have noop.
                return data.invokeAddFunc(addFnSymbol, eventTask);
            }
        }
        var zone = Zone.current;
        var source = data.target.constructor['name'] + '.' + addFnName + ':' + data.eventName;
        zone.scheduleEventTask(source, delegate, data, scheduleEventListener, cancelEventListener);
    };
}
function makeZoneAwareRemoveListener(fnName, useCapturingParam, metaCreator) {
    if (useCapturingParam === void 0) { useCapturingParam = true; }
    if (metaCreator === void 0) { metaCreator = defaultListenerMetaCreator; }
    var symbol = zoneSymbol(fnName);
    var defaultUseCapturing = useCapturingParam ? false : undefined;
    return function zoneAwareRemoveListener(self, args) {
        var data = metaCreator(self, args);
        data.options = data.options || defaultUseCapturing;
        // - Inside a Web Worker, `this` is undefined, the context is `global`
        // - When `addEventListener` is called on the global context in strict mode, `this` is undefined
        // see https://github.com/angular/zone.js/issues/190
        var delegate = null;
        if (typeof data.handler == 'function') {
            delegate = data.handler;
        }
        else if (data.handler && data.handler.handleEvent) {
            delegate = function (event) { return data.handler.handleEvent(event); };
        }
        var validZoneHandler = false;
        try {
            // In cross site contexts (such as WebDriver frameworks like Selenium),
            // accessing the handler object here will cause an exception to be thrown which
            // will fail tests prematurely.
            validZoneHandler = data.handler && data.handler.toString() === '[object FunctionWrapper]';
        }
        catch (error) {
            data.crossContext = true;
            return data.invokeRemoveFunc(symbol, data.handler);
        }
        // Ignore special listeners of IE11 & Edge dev tools, see
        // https://github.com/angular/zone.js/issues/150
        if (!delegate || validZoneHandler) {
            return data.invokeRemoveFunc(symbol, data.handler);
        }
        var eventTask = findExistingRegisteredTask(data.target, data.handler, data.eventName, data.options, true);
        if (eventTask) {
            eventTask.zone.cancelTask(eventTask);
        }
        else {
            data.invokeRemoveFunc(symbol, data.handler);
        }
    };
}


function patchEventTargetMethods(obj, addFnName, removeFnName, metaCreator) {
    if (addFnName === void 0) { addFnName = ADD_EVENT_LISTENER; }
    if (removeFnName === void 0) { removeFnName = REMOVE_EVENT_LISTENER; }
    if (metaCreator === void 0) { metaCreator = defaultListenerMetaCreator; }
    if (obj && obj[addFnName]) {
        patchMethod(obj, addFnName, function () { return makeZoneAwareAddListener(addFnName, removeFnName, true, false, false, metaCreator); });
        patchMethod(obj, removeFnName, function () { return makeZoneAwareRemoveListener(removeFnName, true, metaCreator); });
        return true;
    }
    else {
        return false;
    }
}
var originalInstanceKey = zoneSymbol('originalInstance');
// wrap some native API on `window`
function patchClass(className) {
    var OriginalClass = _global$1[className];
    if (!OriginalClass)
        return;
    // keep original class in global
    _global$1[zoneSymbol(className)] = OriginalClass;
    _global$1[className] = function () {
        var a = bindArguments(arguments, className);
        switch (a.length) {
            case 0:
                this[originalInstanceKey] = new OriginalClass();
                break;
            case 1:
                this[originalInstanceKey] = new OriginalClass(a[0]);
                break;
            case 2:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
                break;
            case 3:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
                break;
            case 4:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
                break;
            default:
                throw new Error('Arg list too long.');
        }
    };
    // attach original delegate to patched function
    attachOriginToPatched(_global$1[className], OriginalClass);
    var instance = new OriginalClass(function () { });
    var prop;
    for (prop in instance) {
        // https://bugs.webkit.org/show_bug.cgi?id=44721
        if (className === 'XMLHttpRequest' && prop === 'responseBlob')
            continue;
        (function (prop) {
            if (typeof instance[prop] === 'function') {
                _global$1[className].prototype[prop] = function () {
                    return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
                };
            }
            else {
                Object.defineProperty(_global$1[className].prototype, prop, {
                    set: function (fn) {
                        if (typeof fn === 'function') {
                            this[originalInstanceKey][prop] = Zone.current.wrap(fn, className + '.' + prop);
                            // keep callback in wrapped function so we can
                            // use it in Function.prototype.toString to return
                            // the native one.
                            attachOriginToPatched(this[originalInstanceKey][prop], fn);
                        }
                        else {
                            this[originalInstanceKey][prop] = fn;
                        }
                    },
                    get: function () {
                        return this[originalInstanceKey][prop];
                    }
                });
            }
        }(prop));
    }
    for (prop in OriginalClass) {
        if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {
            _global$1[className][prop] = OriginalClass[prop];
        }
    }
}
function createNamedFn(name, delegate) {
    try {
        return (Function('f', "return function " + name + "(){return f(this, arguments)}"))(delegate);
    }
    catch (error) {
        // if we fail, we must be CSP, just return delegate.
        return function () {
            return delegate(this, arguments);
        };
    }
}
function patchMethod(target, name, patchFn) {
    var proto = target;
    while (proto && Object.getOwnPropertyNames(proto).indexOf(name) === -1) {
        proto = Object.getPrototypeOf(proto);
    }
    if (!proto && target[name]) {
        // somehow we did not find it, but we can see it. This happens on IE for Window properties.
        proto = target;
    }
    var delegateName = zoneSymbol(name);
    var delegate;
    if (proto && !(delegate = proto[delegateName])) {
        delegate = proto[delegateName] = proto[name];
        proto[name] = createNamedFn(name, patchFn(delegate, delegateName, name));
        attachOriginToPatched(proto[name], delegate);
    }
    return delegate;
}
// TODO: @JiaLiPassion, support cancel task later if necessary


function findEventTask(target, evtName) {
    var eventTasks = target[zoneSymbol('eventTasks')];
    var result = [];
    if (eventTasks) {
        for (var i = 0; i < eventTasks.length; i++) {
            var eventTask = eventTasks[i];
            var data = eventTask.data;
            var eventName = data && data.eventName;
            if (eventName === evtName) {
                result.push(eventTask);
            }
        }
    }
    return result;
}
function attachOriginToPatched(patched, original) {
    patched[zoneSymbol('OriginalDelegate')] = original;
}
Zone[zoneSymbol('patchEventTargetMethods')] = patchEventTargetMethods;
Zone[zoneSymbol('patchOnProperties')] = patchOnProperties;

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function patchTimer(window, setName, cancelName, nameSuffix) {
    var setNative = null;
    var clearNative = null;
    setName += nameSuffix;
    cancelName += nameSuffix;
    var tasksByHandleId = {};
    function scheduleTask(task) {
        var data = task.data;
        function timer() {
            try {
                task.invoke.apply(this, arguments);
            }
            finally {
                delete tasksByHandleId[data.handleId];
            }
        }
        data.args[0] = timer;
        data.handleId = setNative.apply(window, data.args);
        tasksByHandleId[data.handleId] = task;
        return task;
    }
    function clearTask(task) {
        delete tasksByHandleId[task.data.handleId];
        return clearNative(task.data.handleId);
    }
    setNative =
        patchMethod(window, setName, function (delegate) { return function (self, args) {
            if (typeof args[0] === 'function') {
                var zone = Zone.current;
                var options = {
                    handleId: null,
                    isPeriodic: nameSuffix === 'Interval',
                    delay: (nameSuffix === 'Timeout' || nameSuffix === 'Interval') ? args[1] || 0 : null,
                    args: args
                };
                var task = zone.scheduleMacroTask(setName, args[0], options, scheduleTask, clearTask);
                if (!task) {
                    return task;
                }
                // Node.js must additionally support the ref and unref functions.
                var handle = task.data.handleId;
                // check whether handle is null, because some polyfill or browser
                // may return undefined from setTimeout/setInterval/setImmediate/requestAnimationFrame
                if (handle && handle.ref && handle.unref && typeof handle.ref === 'function' &&
                    typeof handle.unref === 'function') {
                    task.ref = handle.ref.bind(handle);
                    task.unref = handle.unref.bind(handle);
                }
                return task;
            }
            else {
                // cause an error by calling it directly.
                return delegate.apply(window, args);
            }
        }; });
    clearNative =
        patchMethod(window, cancelName, function (delegate) { return function (self, args) {
            var task = typeof args[0] === 'number' ? tasksByHandleId[args[0]] : args[0];
            if (task && typeof task.type === 'string') {
                if (task.state !== 'notScheduled' &&
                    (task.cancelFn && task.data.isPeriodic || task.runCount === 0)) {
                    // Do not cancel already canceled functions
                    task.zone.cancelTask(task);
                }
            }
            else {
                // cause an error by calling it directly.
                delegate.apply(window, args);
            }
        }; });
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// override Function.prototype.toString to make zone.js patched function
// look like native function
function patchFuncToString() {
    var originalFunctionToString = Function.prototype.toString;
    var g = typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || global;
    Function.prototype.toString = function () {
        if (typeof this === 'function') {
            if (this[zoneSymbol('OriginalDelegate')]) {
                return originalFunctionToString.apply(this[zoneSymbol('OriginalDelegate')], arguments);
            }
            if (this === Promise) {
                var nativePromise = g[zoneSymbol('Promise')];
                if (nativePromise) {
                    return originalFunctionToString.apply(nativePromise, arguments);
                }
            }
            if (this === Error) {
                var nativeError = g[zoneSymbol('Error')];
                if (nativeError) {
                    return originalFunctionToString.apply(nativeError, arguments);
                }
            }
        }
        return originalFunctionToString.apply(this, arguments);
    };
}
function patchObjectToString() {
    var originalObjectToString = Object.prototype.toString;
    Object.prototype.toString = function () {
        if (this instanceof Promise) {
            return '[object Promise]';
        }
        return originalObjectToString.apply(this, arguments);
    };
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/*
 * This is necessary for Chrome and Chrome mobile, to enable
 * things like redefining `createdCallback` on an element.
 */
var _defineProperty = Object[zoneSymbol('defineProperty')] = Object.defineProperty;
var _getOwnPropertyDescriptor = Object[zoneSymbol('getOwnPropertyDescriptor')] =
    Object.getOwnPropertyDescriptor;
var _create = Object.create;
var unconfigurablesKey = zoneSymbol('unconfigurables');
function propertyPatch() {
    Object.defineProperty = function (obj, prop, desc) {
        if (isUnconfigurable(obj, prop)) {
            throw new TypeError('Cannot assign to read only property \'' + prop + '\' of ' + obj);
        }
        var originalConfigurableFlag = desc.configurable;
        if (prop !== 'prototype') {
            desc = rewriteDescriptor(obj, prop, desc);
        }
        return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
    };
    Object.defineProperties = function (obj, props) {
        Object.keys(props).forEach(function (prop) {
            Object.defineProperty(obj, prop, props[prop]);
        });
        return obj;
    };
    Object.create = function (obj, proto) {
        if (typeof proto === 'object' && !Object.isFrozen(proto)) {
            Object.keys(proto).forEach(function (prop) {
                proto[prop] = rewriteDescriptor(obj, prop, proto[prop]);
            });
        }
        return _create(obj, proto);
    };
    Object.getOwnPropertyDescriptor = function (obj, prop) {
        var desc = _getOwnPropertyDescriptor(obj, prop);
        if (isUnconfigurable(obj, prop)) {
            desc.configurable = false;
        }
        return desc;
    };
}
function _redefineProperty(obj, prop, desc) {
    var originalConfigurableFlag = desc.configurable;
    desc = rewriteDescriptor(obj, prop, desc);
    return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
}
function isUnconfigurable(obj, prop) {
    return obj && obj[unconfigurablesKey] && obj[unconfigurablesKey][prop];
}
function rewriteDescriptor(obj, prop, desc) {
    desc.configurable = true;
    if (!desc.configurable) {
        if (!obj[unconfigurablesKey]) {
            _defineProperty(obj, unconfigurablesKey, { writable: true, value: {} });
        }
        obj[unconfigurablesKey][prop] = true;
    }
    return desc;
}
function _tryDefineProperty(obj, prop, desc, originalConfigurableFlag) {
    try {
        return _defineProperty(obj, prop, desc);
    }
    catch (error) {
        if (desc.configurable) {
            // In case of errors, when the configurable flag was likely set by rewriteDescriptor(), let's
            // retry with the original flag value
            if (typeof originalConfigurableFlag == 'undefined') {
                delete desc.configurable;
            }
            else {
                desc.configurable = originalConfigurableFlag;
            }
            try {
                return _defineProperty(obj, prop, desc);
            }
            catch (error) {
                var descJson = null;
                try {
                    descJson = JSON.stringify(desc);
                }
                catch (error) {
                    descJson = descJson.toString();
                }
                console.log("Attempting to configure '" + prop + "' with descriptor '" + descJson + "' on object '" + obj + "' and got error, giving up: " + error);
            }
        }
        else {
            throw error;
        }
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var WTF_ISSUE_555 = 'Anchor,Area,Audio,BR,Base,BaseFont,Body,Button,Canvas,Content,DList,Directory,Div,Embed,FieldSet,Font,Form,Frame,FrameSet,HR,Head,Heading,Html,IFrame,Image,Input,Keygen,LI,Label,Legend,Link,Map,Marquee,Media,Menu,Meta,Meter,Mod,OList,Object,OptGroup,Option,Output,Paragraph,Pre,Progress,Quote,Script,Select,Source,Span,Style,TableCaption,TableCell,TableCol,Table,TableRow,TableSection,TextArea,Title,Track,UList,Unknown,Video';
var NO_EVENT_TARGET = 'ApplicationCache,EventSource,FileReader,InputMethodContext,MediaController,MessagePort,Node,Performance,SVGElementInstance,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebKitNamedFlow,Window,Worker,WorkerGlobalScope,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload,IDBRequest,IDBOpenDBRequest,IDBDatabase,IDBTransaction,IDBCursor,DBIndex,WebSocket'
    .split(',');
var EVENT_TARGET = 'EventTarget';
function eventTargetPatch(_global) {
    var apis = [];
    var isWtf = _global['wtf'];
    if (isWtf) {
        // Workaround for: https://github.com/google/tracing-framework/issues/555
        apis = WTF_ISSUE_555.split(',').map(function (v) { return 'HTML' + v + 'Element'; }).concat(NO_EVENT_TARGET);
    }
    else if (_global[EVENT_TARGET]) {
        apis.push(EVENT_TARGET);
    }
    else {
        // Note: EventTarget is not available in all browsers,
        // if it's not available, we instead patch the APIs in the IDL that inherit from EventTarget
        apis = NO_EVENT_TARGET;
    }
    for (var i = 0; i < apis.length; i++) {
        var type = _global[apis[i]];
        patchEventTargetMethods(type && type.prototype);
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// we have to patch the instance since the proto is non-configurable
function apply(_global) {
    var WS = _global.WebSocket;
    // On Safari window.EventTarget doesn't exist so need to patch WS add/removeEventListener
    // On older Chrome, no need since EventTarget was already patched
    if (!_global.EventTarget) {
        patchEventTargetMethods(WS.prototype);
    }
    _global.WebSocket = function (a, b) {
        var socket = arguments.length > 1 ? new WS(a, b) : new WS(a);
        var proxySocket;
        // Safari 7.0 has non-configurable own 'onmessage' and friends properties on the socket instance
        var onmessageDesc = Object.getOwnPropertyDescriptor(socket, 'onmessage');
        if (onmessageDesc && onmessageDesc.configurable === false) {
            proxySocket = Object.create(socket);
            ['addEventListener', 'removeEventListener', 'send', 'close'].forEach(function (propName) {
                proxySocket[propName] = function () {
                    return socket[propName].apply(socket, arguments);
                };
            });
        }
        else {
            // we can patch the real socket
            proxySocket = socket;
        }
        patchOnProperties(proxySocket, ['close', 'error', 'message', 'open']);
        return proxySocket;
    };
    for (var prop in WS) {
        _global.WebSocket[prop] = WS[prop];
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var eventNames = 'copy cut paste abort blur focus canplay canplaythrough change click contextmenu dblclick drag dragend dragenter dragleave dragover dragstart drop durationchange emptied ended input invalid keydown keypress keyup load loadeddata loadedmetadata loadstart message mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup pause play playing progress ratechange reset scroll seeked seeking select show stalled submit suspend timeupdate volumechange waiting mozfullscreenchange mozfullscreenerror mozpointerlockchange mozpointerlockerror error webglcontextrestored webglcontextlost webglcontextcreationerror'
    .split(' ');
function propertyDescriptorPatch(_global) {
    if (isNode && !isMix) {
        return;
    }
    var supportsWebSocket = typeof WebSocket !== 'undefined';
    if (canPatchViaPropertyDescriptor()) {
        // for browsers that we can patch the descriptor:  Chrome & Firefox
        if (isBrowser) {
            patchOnProperties(window, eventNames.concat(['resize']));
            patchOnProperties(Document.prototype, eventNames);
            if (typeof window['SVGElement'] !== 'undefined') {
                patchOnProperties(window['SVGElement'].prototype, eventNames);
            }
            patchOnProperties(HTMLElement.prototype, eventNames);
        }
        patchOnProperties(XMLHttpRequest.prototype, null);
        if (typeof IDBIndex !== 'undefined') {
            patchOnProperties(IDBIndex.prototype, null);
            patchOnProperties(IDBRequest.prototype, null);
            patchOnProperties(IDBOpenDBRequest.prototype, null);
            patchOnProperties(IDBDatabase.prototype, null);
            patchOnProperties(IDBTransaction.prototype, null);
            patchOnProperties(IDBCursor.prototype, null);
        }
        if (supportsWebSocket) {
            patchOnProperties(WebSocket.prototype, null);
        }
    }
    else {
        // Safari, Android browsers (Jelly Bean)
        patchViaCapturingAllTheEvents();
        patchClass('XMLHttpRequest');
        if (supportsWebSocket) {
            apply(_global);
        }
    }
}
function canPatchViaPropertyDescriptor() {
    if ((isBrowser || isMix) && !Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'onclick') &&
        typeof Element !== 'undefined') {
        // WebKit https://bugs.webkit.org/show_bug.cgi?id=134364
        // IDL interface attributes are not configurable
        var desc = Object.getOwnPropertyDescriptor(Element.prototype, 'onclick');
        if (desc && !desc.configurable)
            return false;
    }
    var xhrDesc = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, 'onreadystatechange');
    // add enumerable and configurable here because in opera
    // by default XMLHttpRequest.prototype.onreadystatechange is undefined
    // without adding enumerable and configurable will cause onreadystatechange
    // non-configurable
    // and if XMLHttpRequest.prototype.onreadystatechange is undefined,
    // we should set a real desc instead a fake one
    if (xhrDesc) {
        Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', {
            enumerable: true,
            configurable: true,
            get: function () {
                return true;
            }
        });
        var req = new XMLHttpRequest();
        var result = !!req.onreadystatechange;
        // restore original desc
        Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', xhrDesc || {});
        return result;
    }
    else {
        Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', {
            enumerable: true,
            configurable: true,
            get: function () {
                return this[zoneSymbol('fakeonreadystatechange')];
            },
            set: function (value) {
                this[zoneSymbol('fakeonreadystatechange')] = value;
            }
        });
        var req = new XMLHttpRequest();
        var detectFunc = function () { };
        req.onreadystatechange = detectFunc;
        var result = req[zoneSymbol('fakeonreadystatechange')] === detectFunc;
        req.onreadystatechange = null;
        return result;
    }
}

var unboundKey = zoneSymbol('unbound');
// Whenever any eventListener fires, we check the eventListener target and all parents
// for `onwhatever` properties and replace them with zone-bound functions
// - Chrome (for now)
function patchViaCapturingAllTheEvents() {
    var _loop_1 = function (i) {
        var property = eventNames[i];
        var onproperty = 'on' + property;
        self.addEventListener(property, function (event) {
            var elt = event.target, bound, source;
            if (elt) {
                source = elt.constructor['name'] + '.' + onproperty;
            }
            else {
                source = 'unknown.' + onproperty;
            }
            while (elt) {
                if (elt[onproperty] && !elt[onproperty][unboundKey]) {
                    bound = Zone.current.wrap(elt[onproperty], source);
                    bound[unboundKey] = elt[onproperty];
                    elt[onproperty] = bound;
                }
                elt = elt.parentElement;
            }
        }, true);
    };
    for (var i = 0; i < eventNames.length; i++) {
        _loop_1(i);
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function registerElementPatch(_global) {
    if ((!isBrowser && !isMix) || !('registerElement' in _global.document)) {
        return;
    }
    var _registerElement = document.registerElement;
    var callbacks = ['createdCallback', 'attachedCallback', 'detachedCallback', 'attributeChangedCallback'];
    document.registerElement = function (name, opts) {
        if (opts && opts.prototype) {
            callbacks.forEach(function (callback) {
                var source = 'Document.registerElement::' + callback;
                if (opts.prototype.hasOwnProperty(callback)) {
                    var descriptor = Object.getOwnPropertyDescriptor(opts.prototype, callback);
                    if (descriptor && descriptor.value) {
                        descriptor.value = Zone.current.wrap(descriptor.value, source);
                        _redefineProperty(opts.prototype, callback, descriptor);
                    }
                    else {
                        opts.prototype[callback] = Zone.current.wrap(opts.prototype[callback], source);
                    }
                }
                else if (opts.prototype[callback]) {
                    opts.prototype[callback] = Zone.current.wrap(opts.prototype[callback], source);
                }
            });
        }
        return _registerElement.apply(document, [name, opts]);
    };
    attachOriginToPatched(document.registerElement, _registerElement);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var set = 'set';
var clear = 'clear';
var blockingMethods = ['alert', 'prompt', 'confirm'];
var _global = typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || global;
patchTimer(_global, set, clear, 'Timeout');
patchTimer(_global, set, clear, 'Interval');
patchTimer(_global, set, clear, 'Immediate');
patchTimer(_global, 'request', 'cancel', 'AnimationFrame');
patchTimer(_global, 'mozRequest', 'mozCancel', 'AnimationFrame');
patchTimer(_global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
for (var i = 0; i < blockingMethods.length; i++) {
    var name_1 = blockingMethods[i];
    patchMethod(_global, name_1, function (delegate, symbol, name) {
        return function (s, args) {
            return Zone.current.run(delegate, _global, args, name);
        };
    });
}
eventTargetPatch(_global);
// patch XMLHttpRequestEventTarget's addEventListener/removeEventListener
var XMLHttpRequestEventTarget = _global['XMLHttpRequestEventTarget'];
if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
    patchEventTargetMethods(XMLHttpRequestEventTarget.prototype);
}
propertyDescriptorPatch(_global);
patchClass('MutationObserver');
patchClass('WebKitMutationObserver');
patchClass('FileReader');
propertyPatch();
registerElementPatch(_global);
// Treat XMLHTTPRequest as a macrotask.
patchXHR(_global);
var XHR_TASK = zoneSymbol('xhrTask');
var XHR_SYNC = zoneSymbol('xhrSync');
var XHR_LISTENER = zoneSymbol('xhrListener');
var XHR_SCHEDULED = zoneSymbol('xhrScheduled');
function patchXHR(window) {
    function findPendingTask(target) {
        var pendingTask = target[XHR_TASK];
        return pendingTask;
    }
    function scheduleTask(task) {
        XMLHttpRequest[XHR_SCHEDULED] = false;
        var data = task.data;
        // remove existing event listener
        var listener = data.target[XHR_LISTENER];
        if (listener) {
            data.target.removeEventListener('readystatechange', listener);
        }
        var newListener = data.target[XHR_LISTENER] = function () {
            if (data.target.readyState === data.target.DONE) {
                // sometimes on some browsers XMLHttpRequest will fire onreadystatechange with
                // readyState=4 multiple times, so we need to check task state here
                if (!data.aborted && XMLHttpRequest[XHR_SCHEDULED] && task.state === 'scheduled') {
                    task.invoke();
                }
            }
        };
        data.target.addEventListener('readystatechange', newListener);
        var storedTask = data.target[XHR_TASK];
        if (!storedTask) {
            data.target[XHR_TASK] = task;
        }
        sendNative.apply(data.target, data.args);
        XMLHttpRequest[XHR_SCHEDULED] = true;
        return task;
    }
    function placeholderCallback() { }
    function clearTask(task) {
        var data = task.data;
        // Note - ideally, we would call data.target.removeEventListener here, but it's too late
        // to prevent it from firing. So instead, we store info for the event listener.
        data.aborted = true;
        return abortNative.apply(data.target, data.args);
    }
    var openNative = patchMethod(window.XMLHttpRequest.prototype, 'open', function () { return function (self, args) {
        self[XHR_SYNC] = args[2] == false;
        return openNative.apply(self, args);
    }; });
    var sendNative = patchMethod(window.XMLHttpRequest.prototype, 'send', function () { return function (self, args) {
        var zone = Zone.current;
        if (self[XHR_SYNC]) {
            // if the XHR is sync there is no task to schedule, just execute the code.
            return sendNative.apply(self, args);
        }
        else {
            var options = { target: self, isPeriodic: false, delay: null, args: args, aborted: false };
            return zone.scheduleMacroTask('XMLHttpRequest.send', placeholderCallback, options, scheduleTask, clearTask);
        }
    }; });
    var abortNative = patchMethod(window.XMLHttpRequest.prototype, 'abort', function (delegate) { return function (self, args) {
        var task = findPendingTask(self);
        if (task && typeof task.type == 'string') {
            // If the XHR has already completed, do nothing.
            // If the XHR has already been aborted, do nothing.
            // Fix #569, call abort multiple times before done will cause
            // macroTask task count be negative number
            if (task.cancelFn == null || (task.data && task.data.aborted)) {
                return;
            }
            task.zone.cancelTask(task);
        }
        // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no task
        // to cancel. Do nothing.
    }; });
}
/// GEO_LOCATION
if (_global['navigator'] && _global['navigator'].geolocation) {
    patchPrototype(_global['navigator'].geolocation, ['getCurrentPosition', 'watchPosition']);
}
// patch Func.prototype.toString to let them look like native
patchFuncToString();
// patch Object.prototype.toString to let them look like native
patchObjectToString();
// handle unhandled promise rejection
function findPromiseRejectionHandler(evtName) {
    return function (e) {
        var eventTasks = findEventTask(_global, evtName);
        eventTasks.forEach(function (eventTask) {
            // windows has added unhandledrejection event listener
            // trigger the event listener
            var PromiseRejectionEvent = _global['PromiseRejectionEvent'];
            if (PromiseRejectionEvent) {
                var evt = new PromiseRejectionEvent(evtName, { promise: e.promise, reason: e.rejection });
                eventTask.invoke(evt);
            }
        });
    };
}
if (_global['PromiseRejectionEvent']) {
    Zone[zoneSymbol('unhandledPromiseRejectionHandler')] =
        findPromiseRejectionHandler('unhandledrejection');
    Zone[zoneSymbol('rejectionHandledHandler')] =
        findPromiseRejectionHandler('rejectionhandled');
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

})));

/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect;
(function (Reflect) {
    "use strict";
    var hasOwn = Object.prototype.hasOwnProperty;
    // feature test for Symbol support
    var supportsSymbol = typeof Symbol === "function";
    var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
    var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
    var HashMap;
    (function (HashMap) {
        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
        var downLevel = !supportsCreate && !supportsProto;
        // create an object in dictionary mode (a.k.a. "slow" mode in v8)
        HashMap.create = supportsCreate
            ? function () { return MakeDictionary(Object.create(null)); }
            : supportsProto
                ? function () { return MakeDictionary({ __proto__: null }); }
                : function () { return MakeDictionary({}); };
        HashMap.has = downLevel
            ? function (map, key) { return hasOwn.call(map, key); }
            : function (map, key) { return key in map; };
        HashMap.get = downLevel
            ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
            : function (map, key) { return map[key]; };
    })(HashMap || (HashMap = {}));
    // Load global or shim versions of Map, Set, and WeakMap
    var functionPrototype = Object.getPrototypeOf(Function);
    var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
    var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
    var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
    var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
    // [[Metadata]] internal slot
    // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
    var Metadata = new _WeakMap();
    /**
      * Applies a set of decorators to a property of a target object.
      * @param decorators An array of decorators.
      * @param target The target object.
      * @param propertyKey (Optional) The property key to decorate.
      * @param attributes (Optional) The property descriptor for the target key.
      * @remarks Decorators are applied in reverse order.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     Example = Reflect.decorate(decoratorsArray, Example);
      *
      *     // property (on constructor)
      *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
      *
      *     // property (on prototype)
      *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
      *
      *     // method (on constructor)
      *     Object.defineProperty(Example, "staticMethod",
      *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
      *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
      *
      *     // method (on prototype)
      *     Object.defineProperty(Example.prototype, "method",
      *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
      *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
      *
      */
    function decorate(decorators, target, propertyKey, attributes) {
        if (!IsUndefined(propertyKey)) {
            if (!IsArray(decorators))
                throw new TypeError();
            if (!IsObject(target))
                throw new TypeError();
            if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                throw new TypeError();
            if (IsNull(attributes))
                attributes = undefined;
            propertyKey = ToPropertyKey(propertyKey);
            return DecorateProperty(decorators, target, propertyKey, attributes);
        }
        else {
            if (!IsArray(decorators))
                throw new TypeError();
            if (!IsConstructor(target))
                throw new TypeError();
            return DecorateConstructor(decorators, target);
        }
    }
    Reflect.decorate = decorate;
    // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
    // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
    /**
      * A default metadata decorator factory that can be used on a class, class member, or parameter.
      * @param metadataKey The key for the metadata entry.
      * @param metadataValue The value for the metadata entry.
      * @returns A decorator function.
      * @remarks
      * If `metadataKey` is already defined for the target and target key, the
      * metadataValue for that key will be overwritten.
      * @example
      *
      *     // constructor
      *     @Reflect.metadata(key, value)
      *     class Example {
      *     }
      *
      *     // property (on constructor, TypeScript only)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         static staticProperty;
      *     }
      *
      *     // property (on prototype, TypeScript only)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         property;
      *     }
      *
      *     // method (on constructor)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         static staticMethod() { }
      *     }
      *
      *     // method (on prototype)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         method() { }
      *     }
      *
      */
    function metadata(metadataKey, metadataValue) {
        function decorator(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                throw new TypeError();
            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        return decorator;
    }
    Reflect.metadata = metadata;
    /**
      * Define a unique metadata entry on the target.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param metadataValue A value that contains attached metadata.
      * @param target The target object on which to define metadata.
      * @param propertyKey (Optional) The property key for the target.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     Reflect.defineMetadata("custom:annotation", options, Example);
      *
      *     // property (on constructor)
      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
      *
      *     // property (on prototype)
      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
      *
      *     // method (on constructor)
      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
      *
      *     // method (on prototype)
      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
      *
      *     // decorator factory as metadata-producing annotation.
      *     function MyAnnotation(options): Decorator {
      *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
      *     }
      *
      */
    function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
    }
    Reflect.defineMetadata = defineMetadata;
    /**
      * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.hasMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function hasMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasMetadata(metadataKey, target, propertyKey);
    }
    Reflect.hasMetadata = hasMetadata;
    /**
      * Gets a value indicating whether the target object has the provided metadata key defined.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function hasOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
    }
    Reflect.hasOwnMetadata = hasOwnMetadata;
    /**
      * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function getMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetMetadata(metadataKey, target, propertyKey);
    }
    Reflect.getMetadata = getMetadata;
    /**
      * Gets the metadata value for the provided metadata key on the target object.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getOwnMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function getOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
    }
    Reflect.getOwnMetadata = getOwnMetadata;
    /**
      * Gets the metadata keys defined on the target object or its prototype chain.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns An array of unique metadata keys.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getMetadataKeys(Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getMetadataKeys(Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getMetadataKeys(Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getMetadataKeys(Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getMetadataKeys(Example.prototype, "method");
      *
      */
    function getMetadataKeys(target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryMetadataKeys(target, propertyKey);
    }
    Reflect.getMetadataKeys = getMetadataKeys;
    /**
      * Gets the unique metadata keys defined on the target object.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns An array of unique metadata keys.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getOwnMetadataKeys(Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
      *
      */
    function getOwnMetadataKeys(target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryOwnMetadataKeys(target, propertyKey);
    }
    Reflect.getOwnMetadataKeys = getOwnMetadataKeys;
    /**
      * Deletes the metadata entry from the target object with the provided key.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns `true` if the metadata entry was found and deleted; otherwise, false.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.deleteMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function deleteMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
        if (IsUndefined(metadataMap))
            return false;
        if (!metadataMap.delete(metadataKey))
            return false;
        if (metadataMap.size > 0)
            return true;
        var targetMetadata = Metadata.get(target);
        targetMetadata.delete(propertyKey);
        if (targetMetadata.size > 0)
            return true;
        Metadata.delete(target);
        return true;
    }
    Reflect.deleteMetadata = deleteMetadata;
    function DecorateConstructor(decorators, target) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
                if (!IsConstructor(decorated))
                    throw new TypeError();
                target = decorated;
            }
        }
        return target;
    }
    function DecorateProperty(decorators, target, propertyKey, descriptor) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target, propertyKey, descriptor);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
                if (!IsObject(decorated))
                    throw new TypeError();
                descriptor = decorated;
            }
        }
        return descriptor;
    }
    function GetOrCreateMetadataMap(O, P, Create) {
        var targetMetadata = Metadata.get(O);
        if (IsUndefined(targetMetadata)) {
            if (!Create)
                return undefined;
            targetMetadata = new _Map();
            Metadata.set(O, targetMetadata);
        }
        var metadataMap = targetMetadata.get(P);
        if (IsUndefined(metadataMap)) {
            if (!Create)
                return undefined;
            metadataMap = new _Map();
            targetMetadata.set(P, metadataMap);
        }
        return metadataMap;
    }
    // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
    function OrdinaryHasMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn)
            return true;
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
            return OrdinaryHasMetadata(MetadataKey, parent, P);
        return false;
    }
    // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
        if (IsUndefined(metadataMap))
            return false;
        return ToBoolean(metadataMap.has(MetadataKey));
    }
    // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
    function OrdinaryGetMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn)
            return OrdinaryGetOwnMetadata(MetadataKey, O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
            return OrdinaryGetMetadata(MetadataKey, parent, P);
        return undefined;
    }
    // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
        if (IsUndefined(metadataMap))
            return undefined;
        return metadataMap.get(MetadataKey);
    }
    // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
        metadataMap.set(MetadataKey, MetadataValue);
    }
    // 3.1.6.1 OrdinaryMetadataKeys(O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
    function OrdinaryMetadataKeys(O, P) {
        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (parent === null)
            return ownKeys;
        var parentKeys = OrdinaryMetadataKeys(parent, P);
        if (parentKeys.length <= 0)
            return ownKeys;
        if (ownKeys.length <= 0)
            return parentKeys;
        var set = new _Set();
        var keys = [];
        for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
            var key = ownKeys_1[_i];
            var hasKey = set.has(key);
            if (!hasKey) {
                set.add(key);
                keys.push(key);
            }
        }
        for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
            var key = parentKeys_1[_a];
            var hasKey = set.has(key);
            if (!hasKey) {
                set.add(key);
                keys.push(key);
            }
        }
        return keys;
    }
    // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
    function OrdinaryOwnMetadataKeys(O, P) {
        var keys = [];
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
        if (IsUndefined(metadataMap))
            return keys;
        var keysObj = metadataMap.keys();
        var iterator = GetIterator(keysObj);
        var k = 0;
        while (true) {
            var next = IteratorStep(iterator);
            if (!next) {
                keys.length = k;
                return keys;
            }
            var nextValue = IteratorValue(next);
            try {
                keys[k] = nextValue;
            }
            catch (e) {
                try {
                    IteratorClose(iterator);
                }
                finally {
                    throw e;
                }
            }
            k++;
        }
    }
    // 6 ECMAScript Data Typ0es and Values
    // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
    function Type(x) {
        if (x === null)
            return 1 /* Null */;
        switch (typeof x) {
            case "undefined": return 0 /* Undefined */;
            case "boolean": return 2 /* Boolean */;
            case "string": return 3 /* String */;
            case "symbol": return 4 /* Symbol */;
            case "number": return 5 /* Number */;
            case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
            default: return 6 /* Object */;
        }
    }
    // 6.1.1 The Undefined Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
    function IsUndefined(x) {
        return x === undefined;
    }
    // 6.1.2 The Null Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
    function IsNull(x) {
        return x === null;
    }
    // 6.1.5 The Symbol Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
    function IsSymbol(x) {
        return typeof x === "symbol";
    }
    // 6.1.7 The Object Type
    // https://tc39.github.io/ecma262/#sec-object-type
    function IsObject(x) {
        return typeof x === "object" ? x !== null : typeof x === "function";
    }
    // 7.1 Type Conversion
    // https://tc39.github.io/ecma262/#sec-type-conversion
    // 7.1.1 ToPrimitive(input [, PreferredType])
    // https://tc39.github.io/ecma262/#sec-toprimitive
    function ToPrimitive(input, PreferredType) {
        switch (Type(input)) {
            case 0 /* Undefined */: return input;
            case 1 /* Null */: return input;
            case 2 /* Boolean */: return input;
            case 3 /* String */: return input;
            case 4 /* Symbol */: return input;
            case 5 /* Number */: return input;
        }
        var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
        var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
        if (exoticToPrim !== undefined) {
            var result = exoticToPrim.call(input, hint);
            if (IsObject(result))
                throw new TypeError();
            return result;
        }
        return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
    }
    // 7.1.1.1 OrdinaryToPrimitive(O, hint)
    // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
    function OrdinaryToPrimitive(O, hint) {
        if (hint === "string") {
            var toString_1 = O.toString;
            if (IsCallable(toString_1)) {
                var result = toString_1.call(O);
                if (!IsObject(result))
                    return result;
            }
            var valueOf = O.valueOf;
            if (IsCallable(valueOf)) {
                var result = valueOf.call(O);
                if (!IsObject(result))
                    return result;
            }
        }
        else {
            var valueOf = O.valueOf;
            if (IsCallable(valueOf)) {
                var result = valueOf.call(O);
                if (!IsObject(result))
                    return result;
            }
            var toString_2 = O.toString;
            if (IsCallable(toString_2)) {
                var result = toString_2.call(O);
                if (!IsObject(result))
                    return result;
            }
        }
        throw new TypeError();
    }
    // 7.1.2 ToBoolean(argument)
    // https://tc39.github.io/ecma262/2016/#sec-toboolean
    function ToBoolean(argument) {
        return !!argument;
    }
    // 7.1.12 ToString(argument)
    // https://tc39.github.io/ecma262/#sec-tostring
    function ToString(argument) {
        return "" + argument;
    }
    // 7.1.14 ToPropertyKey(argument)
    // https://tc39.github.io/ecma262/#sec-topropertykey
    function ToPropertyKey(argument) {
        var key = ToPrimitive(argument, 3 /* String */);
        if (IsSymbol(key))
            return key;
        return ToString(key);
    }
    // 7.2 Testing and Comparison Operations
    // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
    // 7.2.2 IsArray(argument)
    // https://tc39.github.io/ecma262/#sec-isarray
    function IsArray(argument) {
        return Array.isArray
            ? Array.isArray(argument)
            : argument instanceof Object
                ? argument instanceof Array
                : Object.prototype.toString.call(argument) === "[object Array]";
    }
    // 7.2.3 IsCallable(argument)
    // https://tc39.github.io/ecma262/#sec-iscallable
    function IsCallable(argument) {
        // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
        return typeof argument === "function";
    }
    // 7.2.4 IsConstructor(argument)
    // https://tc39.github.io/ecma262/#sec-isconstructor
    function IsConstructor(argument) {
        // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
        return typeof argument === "function";
    }
    // 7.2.7 IsPropertyKey(argument)
    // https://tc39.github.io/ecma262/#sec-ispropertykey
    function IsPropertyKey(argument) {
        switch (Type(argument)) {
            case 3 /* String */: return true;
            case 4 /* Symbol */: return true;
            default: return false;
        }
    }
    // 7.3 Operations on Objects
    // https://tc39.github.io/ecma262/#sec-operations-on-objects
    // 7.3.9 GetMethod(V, P)
    // https://tc39.github.io/ecma262/#sec-getmethod
    function GetMethod(V, P) {
        var func = V[P];
        if (func === undefined || func === null)
            return undefined;
        if (!IsCallable(func))
            throw new TypeError();
        return func;
    }
    // 7.4 Operations on Iterator Objects
    // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
    function GetIterator(obj) {
        var method = GetMethod(obj, iteratorSymbol);
        if (!IsCallable(method))
            throw new TypeError(); // from Call
        var iterator = method.call(obj);
        if (!IsObject(iterator))
            throw new TypeError();
        return iterator;
    }
    // 7.4.4 IteratorValue(iterResult)
    // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
    function IteratorValue(iterResult) {
        return iterResult.value;
    }
    // 7.4.5 IteratorStep(iterator)
    // https://tc39.github.io/ecma262/#sec-iteratorstep
    function IteratorStep(iterator) {
        var result = iterator.next();
        return result.done ? false : result;
    }
    // 7.4.6 IteratorClose(iterator, completion)
    // https://tc39.github.io/ecma262/#sec-iteratorclose
    function IteratorClose(iterator) {
        var f = iterator["return"];
        if (f)
            f.call(iterator);
    }
    // 9.1 Ordinary Object Internal Methods and Internal Slots
    // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
    // 9.1.1.1 OrdinaryGetPrototypeOf(O)
    // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
    function OrdinaryGetPrototypeOf(O) {
        var proto = Object.getPrototypeOf(O);
        if (typeof O !== "function" || O === functionPrototype)
            return proto;
        // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
        // Try to determine the superclass constructor. Compatible implementations
        // must either set __proto__ on a subclass constructor to the superclass constructor,
        // or ensure each class has a valid `constructor` property on its prototype that
        // points back to the constructor.
        // If this is not the same as Function.[[Prototype]], then this is definately inherited.
        // This is the case when in ES6 or when using __proto__ in a compatible browser.
        if (proto !== functionPrototype)
            return proto;
        // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
        var prototype = O.prototype;
        var prototypeProto = prototype && Object.getPrototypeOf(prototype);
        if (prototypeProto == null || prototypeProto === Object.prototype)
            return proto;
        // If the constructor was not a function, then we cannot determine the heritage.
        var constructor = prototypeProto.constructor;
        if (typeof constructor !== "function")
            return proto;
        // If we have some kind of self-reference, then we cannot determine the heritage.
        if (constructor === O)
            return proto;
        // we have a pretty good guess at the heritage.
        return constructor;
    }
    // naive Map shim
    function CreateMapPolyfill() {
        var cacheSentinel = {};
        var arraySentinel = [];
        var MapIterator = (function () {
            function MapIterator(keys, values, selector) {
                this._index = 0;
                this._keys = keys;
                this._values = values;
                this._selector = selector;
            }
            MapIterator.prototype["@@iterator"] = function () { return this; };
            MapIterator.prototype[iteratorSymbol] = function () { return this; };
            MapIterator.prototype.next = function () {
                var index = this._index;
                if (index >= 0 && index < this._keys.length) {
                    var result = this._selector(this._keys[index], this._values[index]);
                    if (index + 1 >= this._keys.length) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    else {
                        this._index++;
                    }
                    return { value: result, done: false };
                }
                return { value: undefined, done: true };
            };
            MapIterator.prototype.throw = function (error) {
                if (this._index >= 0) {
                    this._index = -1;
                    this._keys = arraySentinel;
                    this._values = arraySentinel;
                }
                throw error;
            };
            MapIterator.prototype.return = function (value) {
                if (this._index >= 0) {
                    this._index = -1;
                    this._keys = arraySentinel;
                    this._values = arraySentinel;
                }
                return { value: value, done: true };
            };
            return MapIterator;
        }());
        return (function () {
            function Map() {
                this._keys = [];
                this._values = [];
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
            }
            Object.defineProperty(Map.prototype, "size", {
                get: function () { return this._keys.length; },
                enumerable: true,
                configurable: true
            });
            Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
            Map.prototype.get = function (key) {
                var index = this._find(key, /*insert*/ false);
                return index >= 0 ? this._values[index] : undefined;
            };
            Map.prototype.set = function (key, value) {
                var index = this._find(key, /*insert*/ true);
                this._values[index] = value;
                return this;
            };
            Map.prototype.delete = function (key) {
                var index = this._find(key, /*insert*/ false);
                if (index >= 0) {
                    var size = this._keys.length;
                    for (var i = index + 1; i < size; i++) {
                        this._keys[i - 1] = this._keys[i];
                        this._values[i - 1] = this._values[i];
                    }
                    this._keys.length--;
                    this._values.length--;
                    if (key === this._cacheKey) {
                        this._cacheKey = cacheSentinel;
                        this._cacheIndex = -2;
                    }
                    return true;
                }
                return false;
            };
            Map.prototype.clear = function () {
                this._keys.length = 0;
                this._values.length = 0;
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
            };
            Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
            Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
            Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
            Map.prototype["@@iterator"] = function () { return this.entries(); };
            Map.prototype[iteratorSymbol] = function () { return this.entries(); };
            Map.prototype._find = function (key, insert) {
                if (this._cacheKey !== key) {
                    this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                }
                if (this._cacheIndex < 0 && insert) {
                    this._cacheIndex = this._keys.length;
                    this._keys.push(key);
                    this._values.push(undefined);
                }
                return this._cacheIndex;
            };
            return Map;
        }());
        function getKey(key, _) {
            return key;
        }
        function getValue(_, value) {
            return value;
        }
        function getEntry(key, value) {
            return [key, value];
        }
    }
    // naive Set shim
    function CreateSetPolyfill() {
        return (function () {
            function Set() {
                this._map = new _Map();
            }
            Object.defineProperty(Set.prototype, "size", {
                get: function () { return this._map.size; },
                enumerable: true,
                configurable: true
            });
            Set.prototype.has = function (value) { return this._map.has(value); };
            Set.prototype.add = function (value) { return this._map.set(value, value), this; };
            Set.prototype.delete = function (value) { return this._map.delete(value); };
            Set.prototype.clear = function () { this._map.clear(); };
            Set.prototype.keys = function () { return this._map.keys(); };
            Set.prototype.values = function () { return this._map.values(); };
            Set.prototype.entries = function () { return this._map.entries(); };
            Set.prototype["@@iterator"] = function () { return this.keys(); };
            Set.prototype[iteratorSymbol] = function () { return this.keys(); };
            return Set;
        }());
    }
    // naive WeakMap shim
    function CreateWeakMapPolyfill() {
        var UUID_SIZE = 16;
        var keys = HashMap.create();
        var rootKey = CreateUniqueKey();
        return (function () {
            function WeakMap() {
                this._key = CreateUniqueKey();
            }
            WeakMap.prototype.has = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? HashMap.has(table, this._key) : false;
            };
            WeakMap.prototype.get = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? HashMap.get(table, this._key) : undefined;
            };
            WeakMap.prototype.set = function (target, value) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                table[this._key] = value;
                return this;
            };
            WeakMap.prototype.delete = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? delete table[this._key] : false;
            };
            WeakMap.prototype.clear = function () {
                // NOTE: not a real clear, just makes the previous data unreachable
                this._key = CreateUniqueKey();
            };
            return WeakMap;
        }());
        function CreateUniqueKey() {
            var key;
            do
                key = "@@WeakMap@@" + CreateUUID();
            while (HashMap.has(keys, key));
            keys[key] = true;
            return key;
        }
        function GetOrCreateWeakMapTable(target, create) {
            if (!hasOwn.call(target, rootKey)) {
                if (!create)
                    return undefined;
                Object.defineProperty(target, rootKey, { value: HashMap.create() });
            }
            return target[rootKey];
        }
        function FillRandomBytes(buffer, size) {
            for (var i = 0; i < size; ++i)
                buffer[i] = Math.random() * 0xff | 0;
            return buffer;
        }
        function GenRandomBytes(size) {
            if (typeof Uint8Array === "function") {
                if (typeof crypto !== "undefined")
                    return crypto.getRandomValues(new Uint8Array(size));
                if (typeof msCrypto !== "undefined")
                    return msCrypto.getRandomValues(new Uint8Array(size));
                return FillRandomBytes(new Uint8Array(size), size);
            }
            return FillRandomBytes(new Array(size), size);
        }
        function CreateUUID() {
            var data = GenRandomBytes(UUID_SIZE);
            // mark as random - RFC 4122 § 4.4
            data[6] = data[6] & 0x4f | 0x40;
            data[8] = data[8] & 0xbf | 0x80;
            var result = "";
            for (var offset = 0; offset < UUID_SIZE; ++offset) {
                var byte = data[offset];
                if (offset === 4 || offset === 6 || offset === 8)
                    result += "-";
                if (byte < 16)
                    result += "0";
                result += byte.toString(16).toLowerCase();
            }
            return result;
        }
    }
    // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
    function MakeDictionary(obj) {
        obj.__ = undefined;
        delete obj.__;
        return obj;
    }
    // patch global Reflect
    (function (__global) {
        if (typeof __global.Reflect !== "undefined") {
            if (__global.Reflect !== Reflect) {
                for (var p in Reflect) {
                    if (hasOwn.call(Reflect, p)) {
                        __global.Reflect[p] = Reflect[p];
                    }
                }
            }
        }
        else {
            __global.Reflect = Reflect;
        }
    })(typeof global !== "undefined" ? global :
        typeof self !== "undefined" ? self :
            Function("return this;")());
})(Reflect || (Reflect = {}));
//# sourceMappingURL=Reflect.js.map
/*
 * SystemJS v0.20.12 Dev
 */
(function () {
'use strict';

/*
 * Environment
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
var isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
var isWindows = typeof process !== 'undefined' && typeof process.platform === 'string' && process.platform.match(/^win/);

var envGlobal = typeof self !== 'undefined' ? self : global;
/*
 * Simple Symbol() shim
 */
var hasSymbol = typeof Symbol !== 'undefined';
function createSymbol (name) {
  return hasSymbol ? Symbol() : '@@' + name;
}





/*
 * Environment baseURI
 */
var baseURI;

// environent baseURI detection
if (typeof document != 'undefined' && document.getElementsByTagName) {
  baseURI = document.baseURI;

  if (!baseURI) {
    var bases = document.getElementsByTagName('base');
    baseURI = bases[0] && bases[0].href || window.location.href;
  }
}
else if (typeof location != 'undefined') {
  baseURI = location.href;
}

// sanitize out the hash and querystring
if (baseURI) {
  baseURI = baseURI.split('#')[0].split('?')[0];
  var slashIndex = baseURI.lastIndexOf('/');
  if (slashIndex !== -1)
    baseURI = baseURI.substr(0, slashIndex + 1);
}
else if (typeof process !== 'undefined' && process.cwd) {
  baseURI = 'file://' + (isWindows ? '/' : '') + process.cwd();
  if (isWindows)
    baseURI = baseURI.replace(/\\/g, '/');
}
else {
  throw new TypeError('No environment baseURI');
}

// ensure baseURI has trailing "/"
if (baseURI[baseURI.length - 1] !== '/')
  baseURI += '/';

/*
 * LoaderError with chaining for loader stacks
 */
var errArgs = new Error(0, '_').fileName == '_';
function LoaderError__Check_error_message_for_loader_stack (childErr, newMessage) {
  // Convert file:/// URLs to paths in Node
  if (!isBrowser)
    newMessage = newMessage.replace(isWindows ? /file:\/\/\//g : /file:\/\//g, '');

  var message = (childErr.message || childErr) + '\n  ' + newMessage;

  var err;
  if (errArgs && childErr.fileName)
    err = new Error(message, childErr.fileName, childErr.lineNumber);
  else
    err = new Error(message);


  var stack = childErr.originalErr ? childErr.originalErr.stack : childErr.stack;

  if (isNode)
    // node doesn't show the message otherwise
    err.stack = message + '\n  ' + stack;
  else
    err.stack = stack;

  err.originalErr = childErr.originalErr || childErr;

  return err;
}

/*
 * Optimized URL normalization assuming a syntax-valid URL parent
 */
function throwResolveError (relUrl, parentUrl) {
  throw new RangeError('Unable to resolve "' + relUrl + '" to ' + parentUrl);
}
function resolveIfNotPlain (relUrl, parentUrl) {
  relUrl = relUrl.trim();
  var parentProtocol = parentUrl && parentUrl.substr(0, parentUrl.indexOf(':') + 1);

  var firstChar = relUrl[0];
  var secondChar = relUrl[1];

  // protocol-relative
  if (firstChar === '/' && secondChar === '/') {
    if (!parentProtocol)
      throwResolveError(relUrl, parentUrl);
    return parentProtocol + relUrl;
  }
  // relative-url
  else if (firstChar === '.' && (secondChar === '/' || secondChar === '.' && (relUrl[2] === '/' || relUrl.length === 2) || relUrl.length === 1)
      || firstChar === '/') {
    var parentIsPlain = !parentProtocol || parentUrl[parentProtocol.length] !== '/';

    // read pathname from parent if a URL
    // pathname taken to be part after leading "/"
    var pathname;
    if (parentIsPlain) {
      // resolving to a plain parent -> skip standard URL prefix, and treat entire parent as pathname
      if (parentUrl === undefined)
        throwResolveError(relUrl, parentUrl);
      pathname = parentUrl;
    }
    else if (parentUrl[parentProtocol.length + 1] === '/') {
      // resolving to a :// so we need to read out the auth and host
      if (parentProtocol !== 'file:') {
        pathname = parentUrl.substr(parentProtocol.length + 2);
        pathname = pathname.substr(pathname.indexOf('/') + 1);
      }
      else {
        pathname = parentUrl.substr(8);
      }
    }
    else {
      // resolving to :/ so pathname is the /... part
      pathname = parentUrl.substr(parentProtocol.length + 1);
    }

    if (firstChar === '/') {
      if (parentIsPlain)
        throwResolveError(relUrl, parentUrl);
      else
        return parentUrl.substr(0, parentUrl.length - pathname.length - 1) + relUrl;
    }

    // join together and split for removal of .. and . segments
    // looping the string instead of anything fancy for perf reasons
    // '../../../../../z' resolved to 'x/y' is just 'z' regardless of parentIsPlain
    var segmented = pathname.substr(0, pathname.lastIndexOf('/') + 1) + relUrl;

    var output = [];
    var segmentIndex = undefined;

    for (var i = 0; i < segmented.length; i++) {
      // busy reading a segment - only terminate on '/'
      if (segmentIndex !== undefined) {
        if (segmented[i] === '/') {
          output.push(segmented.substr(segmentIndex, i - segmentIndex + 1));
          segmentIndex = undefined;
        }
        continue;
      }

      // new segment - check if it is relative
      if (segmented[i] === '.') {
        // ../ segment
        if (segmented[i + 1] === '.' && (segmented[i + 2] === '/' || i === segmented.length - 2)) {
          output.pop();
          i += 2;
        }
        // ./ segment
        else if (segmented[i + 1] === '/' || i === segmented.length - 1) {
          i += 1;
        }
        else {
          // the start of a new segment as below
          segmentIndex = i;
          continue;
        }

        // this is the plain URI backtracking error (../, package:x -> error)
        if (parentIsPlain && output.length === 0)
          throwResolveError(relUrl, parentUrl);

        // trailing . or .. segment
        if (i === segmented.length)
          output.push('');
        continue;
      }

      // it is the start of a new segment
      segmentIndex = i;
    }
    // finish reading out the last segment
    if (segmentIndex !== undefined)
      output.push(segmented.substr(segmentIndex, segmented.length - segmentIndex));

    return parentUrl.substr(0, parentUrl.length - pathname.length) + output.join('');
  }

  // sanitizes and verifies (by returning undefined if not a valid URL-like form)
  // Windows filepath compatibility is an added convenience here
  var protocolIndex = relUrl.indexOf(':');
  if (protocolIndex !== -1) {
    if (isNode) {
      // C:\x becomes file:///c:/x (we don't support C|\x)
      if (relUrl[1] === ':' && relUrl[2] === '\\' && relUrl[0].match(/[a-z]/i))
        return 'file:///' + relUrl.replace(/\\/g, '/');
    }
    return relUrl;
  }
}

var resolvedPromise$1 = Promise.resolve();

/*
 * Simple Array values shim
 */
function arrayValues (arr) {
  if (arr.values)
    return arr.values();

  if (typeof Symbol === 'undefined' || !Symbol.iterator)
    throw new Error('Symbol.iterator not supported in this browser');

  var iterable = {};
  iterable[Symbol.iterator] = function () {
    var keys = Object.keys(arr);
    var keyIndex = 0;
    return {
      next: function () {
        if (keyIndex < keys.length)
          return {
            value: arr[keys[keyIndex++]],
            done: false
          };
        else
          return {
            value: undefined,
            done: true
          };
      }
    };
  };
  return iterable;
}

/*
 * 3. Reflect.Loader
 *
 * We skip the entire native internal pipeline, just providing the bare API
 */
// 3.1.1
function Loader () {
  this.registry = new Registry();
}
// 3.3.1
Loader.prototype.constructor = Loader;

function ensureInstantiated (module) {
  if (!(module instanceof ModuleNamespace))
    throw new TypeError('Module instantiation did not return a valid namespace object.');
  return module;
}

// 3.3.2
Loader.prototype.import = function (key, parent) {
  if (typeof key !== 'string')
    throw new TypeError('Loader import method must be passed a module key string');
  // custom resolveInstantiate combined hook for better perf
  var loader = this;
  return resolvedPromise$1
  .then(function () {
    return loader[RESOLVE_INSTANTIATE](key, parent);
  })
  .then(ensureInstantiated)
  //.then(Module.evaluate)
  .catch(function (err) {
    throw LoaderError__Check_error_message_for_loader_stack(err, 'Loading ' + key + (parent ? ' from ' + parent : ''));
  });
};
// 3.3.3
var RESOLVE = Loader.resolve = createSymbol('resolve');

/*
 * Combined resolve / instantiate hook
 *
 * Not in current reduced spec, but necessary to separate RESOLVE from RESOLVE + INSTANTIATE as described
 * in the spec notes of this repo to ensure that loader.resolve doesn't instantiate when not wanted.
 *
 * We implement RESOLVE_INSTANTIATE as a single hook instead of a separate INSTANTIATE in order to avoid
 * the need for double registry lookups as a performance optimization.
 */
var RESOLVE_INSTANTIATE = Loader.resolveInstantiate = createSymbol('resolveInstantiate');

// default resolveInstantiate is just to call resolve and then get from the registry
// this provides compatibility for the resolveInstantiate optimization
Loader.prototype[RESOLVE_INSTANTIATE] = function (key, parent) {
  var loader = this;
  return loader.resolve(key, parent)
  .then(function (resolved) {
    return loader.registry.get(resolved);
  });
};

function ensureResolution (resolvedKey) {
  if (resolvedKey === undefined)
    throw new RangeError('No resolution found.');
  return resolvedKey;
}

Loader.prototype.resolve = function (key, parent) {
  var loader = this;
  return resolvedPromise$1
  .then(function() {
    return loader[RESOLVE](key, parent);
  })
  .then(ensureResolution)
  .catch(function (err) {
    throw LoaderError__Check_error_message_for_loader_stack(err, 'Resolving ' + key + (parent ? ' to ' + parent : ''));
  });
};

// 3.3.4 (import without evaluate)
// this is not documented because the use of deferred evaluation as in Module.evaluate is not
// documented, as it is not considered a stable feature to be encouraged
// Loader.prototype.load may well be deprecated if this stays disabled
/* Loader.prototype.load = function (key, parent) {
  return Promise.resolve(this[RESOLVE_INSTANTIATE](key, parent || this.key))
  .catch(function (err) {
    throw addToError(err, 'Loading ' + key + (parent ? ' from ' + parent : ''));
  });
}; */

/*
 * 4. Registry
 *
 * Instead of structuring through a Map, just use a dictionary object
 * We throw for construction attempts so this doesn't affect the public API
 *
 * Registry has been adjusted to use Namespace objects over ModuleStatus objects
 * as part of simplifying loader API implementation
 */
var iteratorSupport = typeof Symbol !== 'undefined' && Symbol.iterator;
var REGISTRY = createSymbol('registry');
function Registry() {
  this[REGISTRY] = {};
  this._registry = REGISTRY;
}
// 4.4.1
if (iteratorSupport) {
  // 4.4.2
  Registry.prototype[Symbol.iterator] = function () {
    return this.entries()[Symbol.iterator]();
  };

  // 4.4.3
  Registry.prototype.entries = function () {
    var registry = this[REGISTRY];
    return arrayValues(Object.keys(registry).map(function (key) {
      return [key, registry[key]];
    }));
  };
}

// 4.4.4
Registry.prototype.keys = function () {
  return arrayValues(Object.keys(this[REGISTRY]));
};
// 4.4.5
Registry.prototype.values = function () {
  var registry = this[REGISTRY];
  return arrayValues(Object.keys(registry).map(function (key) {
    return registry[key];
  }));
};
// 4.4.6
Registry.prototype.get = function (key) {
  return this[REGISTRY][key];
};
// 4.4.7
Registry.prototype.set = function (key, namespace) {
  if (!(namespace instanceof ModuleNamespace))
    throw new Error('Registry must be set with an instance of Module Namespace');
  this[REGISTRY][key] = namespace;
  return this;
};
// 4.4.8
Registry.prototype.has = function (key) {
  return Object.hasOwnProperty.call(this[REGISTRY], key);
};
// 4.4.9
Registry.prototype.delete = function (key) {
  if (Object.hasOwnProperty.call(this[REGISTRY], key)) {
    delete this[REGISTRY][key];
    return true;
  }
  return false;
};

/*
 * Simple ModuleNamespace Exotic object based on a baseObject
 * We export this for allowing a fast-path for module namespace creation over Module descriptors
 */
// var EVALUATE = createSymbol('evaluate');
var BASE_OBJECT = createSymbol('baseObject');

// 8.3.1 Reflect.Module
/*
 * Best-effort simplified non-spec implementation based on
 * a baseObject referenced via getters.
 *
 * Allows:
 *
 *   loader.registry.set('x', new Module({ default: 'x' }));
 *
 * Optional evaluation function provides experimental Module.evaluate
 * support for non-executed modules in registry.
 */
function ModuleNamespace (baseObject/*, evaluate*/) {
  Object.defineProperty(this, BASE_OBJECT, {
    value: baseObject
  });

  // evaluate defers namespace population
  /* if (evaluate) {
    Object.defineProperty(this, EVALUATE, {
      value: evaluate,
      configurable: true,
      writable: true
    });
  }
  else { */
    Object.keys(baseObject).forEach(extendNamespace, this);
  //}
}
// 8.4.2
ModuleNamespace.prototype = Object.create(null);

if (typeof Symbol !== 'undefined' && Symbol.toStringTag)
  Object.defineProperty(ModuleNamespace.prototype, Symbol.toStringTag, {
    value: 'Module'
  });

function extendNamespace (key) {
  Object.defineProperty(this, key, {
    enumerable: true,
    get: function () {
      return this[BASE_OBJECT][key];
    }
  });
}

/* function doEvaluate (evaluate, context) {
  try {
    evaluate.call(context);
  }
  catch (e) {
    return e;
  }
}

// 8.4.1 Module.evaluate... not documented or used because this is potentially unstable
Module.evaluate = function (ns) {
  var evaluate = ns[EVALUATE];
  if (evaluate) {
    ns[EVALUATE] = undefined;
    var err = doEvaluate(evaluate);
    if (err) {
      // cache the error
      ns[EVALUATE] = function () {
        throw err;
      };
      throw err;
    }
    Object.keys(ns[BASE_OBJECT]).forEach(extendNamespace, ns);
  }
  // make chainable
  return ns;
}; */

/*
 * Register Loader
 *
 * Builds directly on top of loader polyfill to provide:
 * - loader.register support
 * - hookable higher-level resolve
 * - instantiate hook returning a ModuleNamespace or undefined for es module loading
 * - loader error behaviour as in HTML and loader specs, clearing failed modules from registration cache synchronously
 * - build tracing support by providing a .trace=true and .loads object format
 */

var REGISTER_INTERNAL = createSymbol('register-internal');

function RegisterLoader$1 () {
  Loader.call(this);

  var registryDelete = this.registry.delete;
  this.registry.delete = function (key) {
    var deleted = registryDelete.call(this, key);

    // also delete from register registry if linked
    if (records.hasOwnProperty(key) && !records[key].linkRecord)
      delete records[key];

    return deleted;
  };

  var records = {};

  this[REGISTER_INTERNAL] = {
    // last anonymous System.register call
    lastRegister: undefined,
    // in-flight es module load records
    records: records
  };

  // tracing
  this.trace = false;
}

RegisterLoader$1.prototype = Object.create(Loader.prototype);
RegisterLoader$1.prototype.constructor = RegisterLoader$1;

var INSTANTIATE = RegisterLoader$1.instantiate = createSymbol('instantiate');

// default normalize is the WhatWG style normalizer
RegisterLoader$1.prototype[RegisterLoader$1.resolve = Loader.resolve] = function (key, parentKey) {
  return resolveIfNotPlain(key, parentKey || baseURI);
};

RegisterLoader$1.prototype[INSTANTIATE] = function (key, processAnonRegister) {};

// once evaluated, the linkRecord is set to undefined leaving just the other load record properties
// this allows tracking new binding listeners for es modules through importerSetters
// for dynamic modules, the load record is removed entirely.
function createLoadRecord (state, key, registration) {
  return state.records[key] = {
    key: key,

    // defined System.register cache
    registration: registration,

    // module namespace object
    module: undefined,

    // es-only
    // this sticks around so new module loads can listen to binding changes
    // for already-loaded modules by adding themselves to their importerSetters
    importerSetters: undefined,

    // in-flight linking record
    linkRecord: {
      // promise for instantiated
      instantiatePromise: undefined,
      dependencies: undefined,
      execute: undefined,
      executingRequire: false,

      // underlying module object bindings
      moduleObj: undefined,

      // es only, also indicates if es or not
      setters: undefined,

      // promise for instantiated dependencies (dependencyInstantiations populated)
      depsInstantiatePromise: undefined,
      // will be the array of dependency load record or a module namespace
      dependencyInstantiations: undefined,

      // indicates if the load and all its dependencies are instantiated and linked
      // but not yet executed
      // mostly just a performance shortpath to avoid rechecking the promises above
      linked: false,

      error: undefined
      // NB optimization and way of ensuring module objects in setters
      // indicates setters which should run pre-execution of that dependency
      // setters is then just for completely executed module objects
      // alternatively we just pass the partially filled module objects as
      // arguments into the execute function
      // hoisted: undefined
    }
  };
}

RegisterLoader$1.prototype[Loader.resolveInstantiate] = function (key, parentKey) {
  var loader = this;
  var state = this[REGISTER_INTERNAL];
  var registry = loader.registry[loader.registry._registry];

  return resolveInstantiate(loader, key, parentKey, registry, state)
  .then(function (instantiated) {
    if (instantiated instanceof ModuleNamespace)
      return instantiated;

    // if already beaten to linked, return
    if (instantiated.module)
      return instantiated.module;

    // resolveInstantiate always returns a load record with a link record and no module value
    if (instantiated.linkRecord.linked)
      return ensureEvaluate(loader, instantiated, instantiated.linkRecord, registry, state, undefined);

    return instantiateDeps(loader, instantiated, instantiated.linkRecord, registry, state, [instantiated])
    .then(function () {
      return ensureEvaluate(loader, instantiated, instantiated.linkRecord, registry, state, undefined);
    })
    .catch(function (err) {
      clearLoadErrors(loader, instantiated);
      throw err;
    });
  });
};

function resolveInstantiate (loader, key, parentKey, registry, state) {
  // normalization shortpath for already-normalized key
  // could add a plain name filter, but doesn't yet seem necessary for perf
  var module = registry[key];
  if (module)
    return Promise.resolve(module);

  var load = state.records[key];

  // already linked but not in main registry is ignored
  if (load && !load.module)
    return instantiate(loader, load, load.linkRecord, registry, state);

  return loader.resolve(key, parentKey)
  .then(function (resolvedKey) {
    // main loader registry always takes preference
    module = registry[resolvedKey];
    if (module)
      return module;

    load = state.records[resolvedKey];

    // already has a module value but not already in the registry (load.module)
    // means it was removed by registry.delete, so we should
    // disgard the current load record creating a new one over it
    // but keep any existing registration
    if (!load || load.module)
      load = createLoadRecord(state, resolvedKey, load && load.registration);

    var link = load.linkRecord;
    if (!link)
      return load;

    return instantiate(loader, load, link, registry, state);
  });
}

function createProcessAnonRegister (loader, load, state) {
  return function () {
    var lastRegister = state.lastRegister;

    if (!lastRegister)
      return !!load.registration;

    state.lastRegister = undefined;
    load.registration = lastRegister;

    return true;
  };
}

function instantiate (loader, load, link, registry, state) {
  return link.instantiatePromise || (link.instantiatePromise =
  // if there is already an existing registration, skip running instantiate
  (load.registration ? Promise.resolve() : Promise.resolve().then(function () {
    state.lastRegister = undefined;
    return loader[INSTANTIATE](load.key, loader[INSTANTIATE].length > 1 && createProcessAnonRegister(loader, load, state));
  }))
  .then(function (instantiation) {
    // direct module return from instantiate -> we're done
    if (instantiation !== undefined) {
      if (!(instantiation instanceof ModuleNamespace))
        throw new TypeError('Instantiate did not return a valid Module object.');

      delete state.records[load.key];
      if (loader.trace)
        traceLoad(loader, load, link);
      return registry[load.key] = instantiation;
    }

    // run the cached loader.register declaration if there is one
    var registration = load.registration;
    // clear to allow new registrations for future loads (combined with registry delete)
    load.registration = undefined;
    if (!registration)
      throw new TypeError('Module instantiation did not call an anonymous or correctly named System.register.');

    link.dependencies = registration[0];

    load.importerSetters = [];

    link.moduleObj = {};

    // process System.registerDynamic declaration
    if (registration[2]) {
      link.moduleObj.default = {};
      link.moduleObj.__useDefault = true;
      link.executingRequire = registration[1];
      link.execute = registration[2];
    }

    // process System.register declaration
    else {
      registerDeclarative(loader, load, link, registration[1]);
    }

    // shortpath to instantiateDeps
    if (!link.dependencies.length) {
      link.linked = true;
      if (loader.trace)
        traceLoad(loader, load, link);
    }

    return load;
  })
  .catch(function (err) {
    throw link.error = LoaderError__Check_error_message_for_loader_stack(err, 'Instantiating ' + load.key);
  }));
}

// like resolveInstantiate, but returning load records for linking
function resolveInstantiateDep (loader, key, parentKey, registry, state, traceDepMap) {
  // normalization shortpaths for already-normalized key
  // DISABLED to prioritise consistent resolver calls
  // could add a plain name filter, but doesn't yet seem necessary for perf
  /* var load = state.records[key];
  var module = registry[key];

  if (module) {
    if (traceDepMap)
      traceDepMap[key] = key;

    // registry authority check in case module was deleted or replaced in main registry
    if (load && load.module && load.module === module)
      return load;
    else
      return module;
  }

  // already linked but not in main registry is ignored
  if (load && !load.module) {
    if (traceDepMap)
      traceDepMap[key] = key;
    return instantiate(loader, load, load.linkRecord, registry, state);
  } */
  return loader.resolve(key, parentKey)
  .then(function (resolvedKey) {
    if (traceDepMap)
      traceDepMap[key] = resolvedKey;

    // normalization shortpaths for already-normalized key
    var load = state.records[resolvedKey];
    var module = registry[resolvedKey];

    // main loader registry always takes preference
    if (module && (!load || load.module && module !== load.module))
      return module;

    // already has a module value but not already in the registry (load.module)
    // means it was removed by registry.delete, so we should
    // disgard the current load record creating a new one over it
    // but keep any existing registration
    if (!load || !module && load.module)
      load = createLoadRecord(state, resolvedKey, load && load.registration);

    var link = load.linkRecord;
    if (!link)
      return load;

    return instantiate(loader, load, link, registry, state);
  });
}

function traceLoad (loader, load, link) {
  loader.loads = loader.loads || {};
  loader.loads[load.key] = {
    key: load.key,
    deps: link.dependencies,
    dynamicDeps: [],
    depMap: link.depMap || {}
  };
}

function traceDynamicLoad (loader, parentKey, key) {
  loader.loads[parentKey].dynamicDeps.push(key);
}

/*
 * Convert a CJS module.exports into a valid object for new Module:
 *
 *   new Module(getEsModule(module.exports))
 *
 * Sets the default value to the module, while also reading off named exports carefully.
 */
function registerDeclarative (loader, load, link, declare) {
  var moduleObj = link.moduleObj;
  var importerSetters = load.importerSetters;

  var definedExports = false;

  // closure especially not based on link to allow link record disposal
  var declared = declare.call(envGlobal, function (name, value) {
    if (typeof name === 'object') {
      var changed = false;
      for (var p in name) {
        value = name[p];
        if (p !== '__useDefault' && (!(p in moduleObj) || moduleObj[p] !== value)) {
          changed = true;
          moduleObj[p] = value;
        }
      }
      if (changed === false)
        return value;
    }
    else {
      if ((definedExports || name in moduleObj) && moduleObj[name] === value)
        return value;
      moduleObj[name] = value;
    }

    for (var i = 0; i < importerSetters.length; i++)
      importerSetters[i](moduleObj);

    return value;
  }, new ContextualLoader(loader, load.key));

  link.setters = declared.setters;
  link.execute = declared.execute;
  if (declared.exports) {
    link.moduleObj = moduleObj = declared.exports;
    definedExports = true;
  }
}

function instantiateDeps (loader, load, link, registry, state, seen) {
  return (link.depsInstantiatePromise || (link.depsInstantiatePromise = Promise.resolve()
  .then(function () {
    var depsInstantiatePromises = Array(link.dependencies.length);

    for (var i = 0; i < link.dependencies.length; i++)
      depsInstantiatePromises[i] = resolveInstantiateDep(loader, link.dependencies[i], load.key, registry, state, loader.trace && link.depMap || (link.depMap = {}));

    return Promise.all(depsInstantiatePromises);
  })
  .then(function (dependencyInstantiations) {
    link.dependencyInstantiations = dependencyInstantiations;

    // run setters to set up bindings to instantiated dependencies
    if (link.setters) {
      for (var i = 0; i < dependencyInstantiations.length; i++) {
        var setter = link.setters[i];
        if (setter) {
          var instantiation = dependencyInstantiations[i];

          if (instantiation instanceof ModuleNamespace) {
            setter(instantiation);
          }
          else {
            setter(instantiation.module || instantiation.linkRecord.moduleObj);
            // this applies to both es and dynamic registrations
            if (instantiation.importerSetters)
              instantiation.importerSetters.push(setter);
          }
        }
      }
    }
  })))
  .then(function () {
    // now deeply instantiateDeps on each dependencyInstantiation that is a load record
    var deepDepsInstantiatePromises = [];

    for (var i = 0; i < link.dependencies.length; i++) {
      var depLoad = link.dependencyInstantiations[i];
      var depLink = depLoad.linkRecord;

      if (!depLink || depLink.linked)
        continue;

      if (seen.indexOf(depLoad) !== -1) {
        deepDepsInstantiatePromises.push(depLink.depsInstantiatePromise);
        continue;
      }
      seen.push(depLoad);

      deepDepsInstantiatePromises.push(instantiateDeps(loader, depLoad, depLoad.linkRecord, registry, state, seen));
    }

    return Promise.all(deepDepsInstantiatePromises);
  })
  .then(function () {
    // as soon as all dependencies instantiated, we are ready for evaluation so can add to the registry
    // this can run multiple times, but so what
    link.linked = true;
    if (loader.trace)
      traceLoad(loader, load, link);

    return load;
  })
  .catch(function (err) {
    err = LoaderError__Check_error_message_for_loader_stack(err, 'Loading ' + load.key);

    // throw up the instantiateDeps stack
    // loads are then synchonously cleared at the top-level through the clearLoadErrors helper below
    // this then ensures avoiding partially unloaded tree states
    link.error = link.error || err;

    throw err;
  });
}

// clears an errored load and all its errored dependencies from the loads registry
function clearLoadErrors (loader, load) {
  var state = loader[REGISTER_INTERNAL];

  // clear from loads
  if (state.records[load.key] === load)
    delete state.records[load.key];

  var link = load.linkRecord;

  if (!link)
    return;

  if (link.dependencyInstantiations)
    link.dependencyInstantiations.forEach(function (depLoad, index) {
      if (!depLoad || depLoad instanceof ModuleNamespace)
        return;

      if (depLoad.linkRecord) {
        if (depLoad.linkRecord.error) {
          // provides a circular reference check
          if (state.records[depLoad.key] === depLoad)
            clearLoadErrors(loader, depLoad);
        }

        // unregister setters for es dependency load records that will remain
        if (link.setters && depLoad.importerSetters) {
          var setterIndex = depLoad.importerSetters.indexOf(link.setters[index]);
          depLoad.importerSetters.splice(setterIndex, 1);
        }
      }
    });
}

/*
 * System.register
 */
RegisterLoader$1.prototype.register = function (key, deps, declare) {
  var state = this[REGISTER_INTERNAL];

  // anonymous modules get stored as lastAnon
  if (declare === undefined) {
    state.lastRegister = [key, deps, undefined];
  }

  // everything else registers into the register cache
  else {
    var load = state.records[key] || createLoadRecord(state, key, undefined);
    load.registration = [deps, declare, undefined];
  }
};

/*
 * System.registerDyanmic
 */
RegisterLoader$1.prototype.registerDynamic = function (key, deps, executingRequire, execute) {
  var state = this[REGISTER_INTERNAL];

  // anonymous modules get stored as lastAnon
  if (typeof key !== 'string') {
    state.lastRegister = [key, deps, executingRequire];
  }

  // everything else registers into the register cache
  else {
    var load = state.records[key] || createLoadRecord(state, key, undefined);
    load.registration = [deps, executingRequire, execute];
  }
};

// ContextualLoader class
// backwards-compatible with previous System.register context argument by exposing .id
function ContextualLoader (loader, key) {
  this.loader = loader;
  this.key = this.id = key;
}
/*ContextualLoader.prototype.constructor = function () {
  throw new TypeError('Cannot subclass the contextual loader only Reflect.Loader.');
};*/
ContextualLoader.prototype.import = function (key) {
  if (this.loader.trace)
    traceDynamicLoad(this.loader, this.key, key);
  return this.loader.import(key, this.key);
};
/*ContextualLoader.prototype.resolve = function (key) {
  return this.loader.resolve(key, this.key);
};*/

// this is the execution function bound to the Module namespace record
function ensureEvaluate (loader, load, link, registry, state, seen) {
  if (load.module)
    return load.module;

  if (link.error)
    throw link.error;

  if (seen && seen.indexOf(load) !== -1)
    return load.linkRecord.moduleObj;

  // for ES loads we always run ensureEvaluate on top-level, so empty seen is passed regardless
  // for dynamic loads, we pass seen if also dynamic
  var err = doEvaluate(loader, load, link, registry, state, link.setters ? [] : seen || []);
  if (err) {
    clearLoadErrors(loader, load);
    throw err;
  }

  return load.module;
}

function makeDynamicRequire (loader, key, dependencies, dependencyInstantiations, registry, state, seen) {
  // we can only require from already-known dependencies
  return function (name) {
    for (var i = 0; i < dependencies.length; i++) {
      if (dependencies[i] === name) {
        var depLoad = dependencyInstantiations[i];
        var module;

        if (depLoad instanceof ModuleNamespace)
          module = depLoad;
        else
          module = ensureEvaluate(loader, depLoad, depLoad.linkRecord, registry, state, seen);

        return module.__useDefault ? module.default : module;
      }
    }
    throw new Error('Module ' + name + ' not declared as a System.registerDynamic dependency of ' + key);
  };
}

// ensures the given es load is evaluated
// returns the error if any
function doEvaluate (loader, load, link, registry, state, seen) {
  seen.push(load);

  var err;

  // es modules evaluate dependencies first
  // non es modules explicitly call moduleEvaluate through require
  if (link.setters) {
    var depLoad, depLink;
    for (var i = 0; i < link.dependencies.length; i++) {
      depLoad = link.dependencyInstantiations[i];

      if (depLoad instanceof ModuleNamespace)
        continue;

      // custom Module returned from instantiate
      depLink = depLoad.linkRecord;
      if (depLink && seen.indexOf(depLoad) === -1) {
        if (depLink.error)
          err = depLink.error;
        else
          // dynamic / declarative boundaries clear the "seen" list
          // we just let cross format circular throw as would happen in real implementations
          err = doEvaluate(loader, depLoad, depLink, registry, state, depLink.setters ? seen : []);
      }

      if (err)
        return link.error = LoaderError__Check_error_message_for_loader_stack(err, 'Evaluating ' + load.key);
    }
  }

  // link.execute won't exist for Module returns from instantiate on top-level load
  if (link.execute) {
    // ES System.register execute
    // "this" is null in ES
    if (link.setters) {
      err = declarativeExecute(link.execute);
    }
    // System.registerDynamic execute
    // "this" is "exports" in CJS
    else {
      var module = { id: load.key };
      var moduleObj = link.moduleObj;
      Object.defineProperty(module, 'exports', {
        configurable: true,
        set: function (exports) {
          moduleObj.default = exports;
        },
        get: function () {
          return moduleObj.default;
        }
      });

      var require = makeDynamicRequire(loader, load.key, link.dependencies, link.dependencyInstantiations, registry, state, seen);

      // evaluate deps first
      if (!link.executingRequire)
        for (var i = 0; i < link.dependencies.length; i++)
          require(link.dependencies[i]);

      err = dynamicExecute(link.execute, require, moduleObj.default, module);

      // pick up defineProperty calls to module.exports when we can
      if (module.exports !== moduleObj.default)
        moduleObj.default = module.exports;

      var moduleDefault = moduleObj.default;

      // __esModule flag extension support via lifting
      if (moduleDefault && moduleDefault.__esModule) {
        for (var p in moduleObj.default) {
          if (Object.hasOwnProperty.call(moduleObj.default, p) && p !== 'default')
            moduleObj[p] = moduleDefault[p];
        }
      }
    }
  }

  if (err)
    return link.error = LoaderError__Check_error_message_for_loader_stack(err, 'Evaluating ' + load.key);

  registry[load.key] = load.module = new ModuleNamespace(link.moduleObj);

  // if not an esm module, run importer setters and clear them
  // this allows dynamic modules to update themselves into es modules
  // as soon as execution has completed
  if (!link.setters) {
    if (load.importerSetters)
      for (var i = 0; i < load.importerSetters.length; i++)
        load.importerSetters[i](load.module);
    load.importerSetters = undefined;
  }

  // dispose link record
  load.linkRecord = undefined;
}

// {} is the closest we can get to call(undefined)
var nullContext = {};
if (Object.freeze)
  Object.freeze(nullContext);

function declarativeExecute (execute) {
  try {
    execute.call(nullContext);
  }
  catch (e) {
    return e;
  }
}

function dynamicExecute (execute, require, exports, module) {
  try {
    var output = execute.call(envGlobal, require, exports, module);
    if (output !== undefined)
      module.exports = output;
  }
  catch (e) {
    return e;
  }
}

var resolvedPromise = Promise.resolve();
function noop () {}

var emptyModule = new ModuleNamespace({});

function protectedCreateNamespace (bindings) {
  if (bindings instanceof ModuleNamespace)
    return bindings;

  if (bindings && bindings.__esModule)
    return new ModuleNamespace(bindings);

  return new ModuleNamespace({ default: bindings, __useDefault: true });
}

var hasStringTag;
function isModule (m) {
  if (hasStringTag === undefined)
    hasStringTag = typeof Symbol !== 'undefined' && !!Symbol.toStringTag;
  return m instanceof ModuleNamespace || hasStringTag && Object.prototype.toString.call(m) == '[object Module]';
}

var CONFIG = createSymbol('loader-config');
var METADATA = createSymbol('metadata');



var isWorker = typeof window === 'undefined' && typeof self !== 'undefined' && typeof importScripts !== 'undefined';

function warn (msg, force) {
  if (force || this.warnings && typeof console !== 'undefined' && console.warn)
    console.warn(msg);
}

function checkInstantiateWasm (loader, wasmBuffer, processAnonRegister) {
  var bytes = new Uint8Array(wasmBuffer);

  // detect by leading bytes
  // Can be (new Uint32Array(fetched))[0] === 0x6D736100 when working in Node
  if (bytes[0] === 0 && bytes[1] === 97 && bytes[2] === 115) {
    return WebAssembly.compile(wasmBuffer).then(function (m) {
      var deps = [];
      var setters = [];
      var importObj = {};

      // we can only set imports if supported (eg Safari doesnt support)
      if (WebAssembly.Module.imports)
        WebAssembly.Module.imports(m).forEach(function (i) {
          var key = i.module;
          setters.push(function (m) {
            importObj[key] = m;
          });
          if (deps.indexOf(key) === -1)
            deps.push(key);
        });
      loader.register(deps, function (_export) {
        return {
          setters: setters,
          execute: function () {
            _export(new WebAssembly.Instance(m, importObj).exports);
          }
        };
      });
      processAnonRegister();

      return true;
    });
  }

  return Promise.resolve(false);
}

var parentModuleContext;
function loadNodeModule (key, baseURL) {
  if (key[0] === '.')
    throw new Error('Node module ' + key + ' can\'t be loaded as it is not a package require.');

  if (!parentModuleContext) {
    var Module = this._nodeRequire('module');
    var base = baseURL.substr(isWindows ? 8 : 7);
    parentModuleContext = new Module(base);
    parentModuleContext.paths = Module._nodeModulePaths(base);
  }
  return parentModuleContext.require(key);
}

function extend (a, b) {
  for (var p in b) {
    if (!Object.hasOwnProperty.call(b, p))
      continue;
    a[p] = b[p];
  }
  return a;
}

function prepend (a, b) {
  for (var p in b) {
    if (!Object.hasOwnProperty.call(b, p))
      continue;
    if (a[p] === undefined)
      a[p] = b[p];
  }
  return a;
}

// meta first-level extends where:
// array + array appends
// object + object extends
// other properties replace
function extendMeta (a, b, _prepend) {
  for (var p in b) {
    if (!Object.hasOwnProperty.call(b, p))
      continue;
    var val = b[p];
    if (a[p] === undefined)
      a[p] = val;
    else if (val instanceof Array && a[p] instanceof Array)
      a[p] = [].concat(_prepend ? val : a[p]).concat(_prepend ? a[p] : val);
    else if (typeof val == 'object' && val !== null && typeof a[p] == 'object')
      a[p] = (_prepend ? prepend : extend)(extend({}, a[p]), val);
    else if (!_prepend)
      a[p] = val;
  }
}

var supportsPreload = false;
var supportsPrefetch = false;
if (isBrowser)
  (function () {
    var relList = document.createElement('link').relList;
    if (relList && relList.supports) {
      supportsPrefetch = true;
      try {
        supportsPreload = relList.supports('preload');
      }
      catch (e) {}
    }
  })();

function preloadScript (url) {
  // fallback to old fashioned image technique which still works in safari
  if (!supportsPreload && !supportsPrefetch) {
    var preloadImage = new Image();
    preloadImage.src = url;
    return;
  }

  var link = document.createElement('link');
  if (supportsPreload) {
    link.rel = 'preload';
    link.as = 'script';
  }
  else {
    // this works for all except Safari (detected by relList.supports lacking)
    link.rel = 'prefetch';
  }
  link.href = url;
  document.head.appendChild(link);
  document.head.removeChild(link);
}

function workerImport (src, resolve, reject) {
  try {
    importScripts(src);
  }
  catch (e) {
    reject(e);
  }
  resolve();
}

if (isBrowser) {
  var loadingScripts = [];
  var onerror = window.onerror;
  window.onerror = function globalOnerror (msg, src) {
    for (var i = 0; i < loadingScripts.length; i++) {
      if (loadingScripts[i].src !== src)
        continue;
      loadingScripts[i].err(msg);
      return;
    }
    if (onerror)
      onerror.apply(this, arguments);
  };
}

function scriptLoad (src, crossOrigin, integrity, resolve, reject) {
  // percent encode just "#" for HTTP requests
  src = src.replace(/#/g, '%23');

  // subresource integrity is not supported in web workers
  if (isWorker)
    return workerImport(src, resolve, reject);

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.charset = 'utf-8';
  script.async = true;

  if (crossOrigin)
    script.crossOrigin = crossOrigin;
  if (integrity)
    script.integrity = integrity;

  script.addEventListener('load', load, false);
  script.addEventListener('error', error, false);

  script.src = src;
  document.head.appendChild(script);

  function load () {
    resolve();
    cleanup();
  }

  // note this does not catch execution errors
  function error (err) {
    cleanup();
    reject(new Error('Fetching ' + src));
  }

  function cleanup () {
    for (var i = 0; i < loadingScripts.length; i++) {
      if (loadingScripts[i].err === error) {
        loadingScripts.splice(i, 1);
        break;
      }
    }
    script.removeEventListener('load', load, false);
    script.removeEventListener('error', error, false);
    document.head.removeChild(script);
  }
}

function readMemberExpression (p, value) {
  var pParts = p.split('.');
  while (pParts.length)
    value = value[pParts.shift()];
  return value;
}

// separate out paths cache as a baseURL lock process
function applyPaths (baseURL, paths, key) {
  var mapMatch = getMapMatch(paths, key);
  if (mapMatch) {
    var target = paths[mapMatch] + key.substr(mapMatch.length);

    var resolved = resolveIfNotPlain(target, baseURI);
    if (resolved !== undefined)
      return resolved;

    return baseURL + target;
  }
  else if (key.indexOf(':') !== -1) {
    return key;
  }
  else {
    return baseURL + key;
  }
}

function checkMap (p) {
  var name = this.name;
  // can add ':' here if we want paths to match the behaviour of map
  if (name.substr(0, p.length) === p && (name.length === p.length || name[p.length] === '/' || p[p.length - 1] === '/' || p[p.length - 1] === ':')) {
    var curLen = p.split('/').length;
    if (curLen > this.len) {
      this.match = p;
      this.len = curLen;
    }
  }
}

function getMapMatch (map, name) {
  if (Object.hasOwnProperty.call(map, name))
    return name;

  var bestMatch = {
    name: name,
    match: undefined,
    len: 0
  };

  Object.keys(map).forEach(checkMap, bestMatch);

  return bestMatch.match;
}

// RegEx adjusted from https://github.com/jbrantly/yabble/blob/master/lib/yabble.js#L339
var cjsRequireRegEx = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF."'])require\s*\(\s*("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')\s*\)/g;

/*
 * Source loading
 */
function fetchFetch (url, authorization, integrity, asBuffer) {
  // fetch doesn't support file:/// urls
  if (url.substr(0, 8) === 'file:///') {
    if (hasXhr)
      return xhrFetch(url, authorization, integrity, asBuffer);
    else
      throw new Error('Unable to fetch file URLs in this environment.');
  }

  // percent encode just "#" for HTTP requests
  url = url.replace(/#/g, '%23');

  var opts = {
    // NB deprecate
    headers: { Accept: 'application/x-es-module, */*' }
  };

  if (integrity)
    opts.integrity = integrity;

  if (authorization) {
    if (typeof authorization == 'string')
      opts.headers['Authorization'] = authorization;
    opts.credentials = 'include';
  }

  return fetch(url, opts)
  .then(function(res) {
    if (res.ok)
      return asBuffer ? res.arrayBuffer() : res.text();
    else
      throw new Error('Fetch error: ' + res.status + ' ' + res.statusText);
  });
}

function xhrFetch (url, authorization, integrity, asBuffer) {
  return new Promise(function (resolve, reject) {
    // percent encode just "#" for HTTP requests
    url = url.replace(/#/g, '%23');

    var xhr = new XMLHttpRequest();
    if (asBuffer)
      xhr.responseType = 'arraybuffer';
    function load() {
      resolve(asBuffer ? xhr.response : xhr.responseText);
    }
    function error() {
      reject(new Error('XHR error: ' + (xhr.status ? ' (' + xhr.status + (xhr.statusText ? ' ' + xhr.statusText  : '') + ')' : '') + ' loading ' + url));
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        // in Chrome on file:/// URLs, status is 0
        if (xhr.status == 0) {
          if (xhr.response) {
            load();
          }
          else {
            // when responseText is empty, wait for load or error event
            // to inform if it is a 404 or empty file
            xhr.addEventListener('error', error);
            xhr.addEventListener('load', load);
          }
        }
        else if (xhr.status === 200) {
          load();
        }
        else {
          error();
        }
      }
    };
    xhr.open("GET", url, true);

    if (xhr.setRequestHeader) {
      xhr.setRequestHeader('Accept', 'application/x-es-module, */*');
      // can set "authorization: true" to enable withCredentials only
      if (authorization) {
        if (typeof authorization == 'string')
          xhr.setRequestHeader('Authorization', authorization);
        xhr.withCredentials = true;
      }
    }

    xhr.send(null);
  });
}

var fs;
function nodeFetch (url, authorization, integrity, asBuffer) {
  if (url.substr(0, 8) != 'file:///')
    return Promise.reject(new Error('Unable to fetch "' + url + '". Only file URLs of the form file:/// supported running in Node.'));

  fs = fs || require('fs');
  if (isWindows)
    url = url.replace(/\//g, '\\').substr(8);
  else
    url = url.substr(7);

  return new Promise(function (resolve, reject) {
    fs.readFile(url, function(err, data) {
      if (err) {
        return reject(err);
      }
      else {
        if (asBuffer) {
          resolve(data);
        }
        else {
          // Strip Byte Order Mark out if it's the leading char
          var dataString = data + '';
          if (dataString[0] === '\ufeff')
            dataString = dataString.substr(1);

          resolve(dataString);
        }
      }
    });
  });
}

function noFetch () {
  throw new Error('No fetch method is defined for this environment.');
}

var fetchFunction;

var hasXhr = typeof XMLHttpRequest !== 'undefined';

if (typeof self !== 'undefined' && typeof self.fetch !== 'undefined')
 fetchFunction = fetchFetch;
else if (hasXhr)
  fetchFunction = xhrFetch;
else if (typeof require !== 'undefined' && typeof process !== 'undefined')
  fetchFunction = nodeFetch;
else
  fetchFunction = noFetch;

var fetch$1 = fetchFunction;

function createMetadata () {
  return {
    pluginKey: undefined,
    pluginArgument: undefined,
    pluginModule: undefined,
    packageKey: undefined,
    packageConfig: undefined,
    load: undefined
  };
}

function getParentMetadata (loader, config, parentKey) {
  var parentMetadata = createMetadata();

  if (parentKey) {
    // detect parent plugin
    // we just need pluginKey to be truthy for package configurations
    // so we duplicate it as pluginArgument - although not correct its not used
    var parentPluginIndex;
    if (config.pluginFirst) {
      if ((parentPluginIndex = parentKey.lastIndexOf('!')) !== -1)
        parentMetadata.pluginArgument = parentMetadata.pluginKey = parentKey.substr(0, parentPluginIndex);
    }
    else {
      if ((parentPluginIndex = parentKey.indexOf('!')) !== -1)
        parentMetadata.pluginArgument = parentMetadata.pluginKey = parentKey.substr(parentPluginIndex + 1);
    }

    // detect parent package
    parentMetadata.packageKey = getMapMatch(config.packages, parentKey);
    if (parentMetadata.packageKey)
      parentMetadata.packageConfig = config.packages[parentMetadata.packageKey];
  }

  return parentMetadata;
}

function normalize (key, parentKey) {
  var config = this[CONFIG];

  var metadata = createMetadata();
  var parentMetadata = getParentMetadata(this, config, parentKey);

  var loader = this;

  return Promise.resolve()

  // boolean conditional
  .then(function () {
    // first we normalize the conditional
    var booleanIndex = key.lastIndexOf('#?');

    if (booleanIndex === -1)
      return Promise.resolve(key);

    var conditionObj = parseCondition.call(loader, key.substr(booleanIndex + 2));

    // in builds, return normalized conditional
    /*if (this.builder)
      return this.resolve(conditionObj.module, parentKey)
      .then(function (conditionModule) {
        conditionObj.module = conditionModule;
        return key.substr(0, booleanIndex) + '#?' + serializeCondition(conditionObj);
      });*/

    return resolveCondition.call(loader, conditionObj, parentKey, true)
    .then(function (conditionValue) {
      return conditionValue ? key.substr(0, booleanIndex) : '@empty';
    });
  })

  // plugin
  .then(function (key) {
    var parsed = parsePlugin(config.pluginFirst, key);

    if (!parsed)
      return packageResolve.call(loader, config, key, parentMetadata && parentMetadata.pluginArgument || parentKey, metadata, parentMetadata, false);

    metadata.pluginKey = parsed.plugin;

    return Promise.all([
      packageResolve.call(loader, config, parsed.argument, parentMetadata && parentMetadata.pluginArgument || parentKey, metadata, parentMetadata, true),
      loader.resolve(parsed.plugin, parentKey)
    ])
    .then(function (normalized) {
      metadata.pluginArgument = normalized[0];
      metadata.pluginKey = normalized[1];

      // don't allow a plugin to load itself
      if (metadata.pluginArgument === metadata.pluginKey)
        throw new Error('Plugin ' + metadata.pluginArgument + ' cannot load itself, make sure it is excluded from any wildcard meta configuration via a custom loader: false rule.');

      return combinePluginParts(config.pluginFirst, normalized[0], normalized[1]);
    });
  })
  .then(function (normalized) {
    return interpolateConditional.call(loader, normalized, parentKey, parentMetadata);
  })
  .then(function (normalized) {
    setMeta.call(loader, config, normalized, metadata);

    if (metadata.pluginKey || !metadata.load.loader)
      return normalized;

    // loader by configuration
    // normalizes to parent to support package loaders
    return loader.resolve(metadata.load.loader, normalized)
    .then(function (pluginKey) {
      metadata.pluginKey = pluginKey;
      metadata.pluginArgument = normalized;
      return normalized;
    });
  })
  .then(function (normalized) {
    loader[METADATA][normalized] = metadata;
    return normalized;
  });
}

// normalization function used for registry keys
// just does coreResolve without map
function decanonicalize (config, key) {
  var parsed = parsePlugin(config.pluginFirst, key);

  // plugin
  if (parsed) {
    var pluginKey = decanonicalize.call(this, config, parsed.plugin);
    return combinePluginParts(config.pluginFirst, coreResolve.call(this, config, parsed.argument, undefined, false, false), pluginKey);
  }

  return coreResolve.call(this, config, key, undefined, false, false);
}

function normalizeSync (key, parentKey) {
  var config = this[CONFIG];

  // normalizeSync is metadataless, so create metadata
  var metadata = createMetadata();
  var parentMetadata = parentMetadata || getParentMetadata(this, config, parentKey);

  var parsed = parsePlugin(config.pluginFirst, key);

  // plugin
  if (parsed) {
    metadata.pluginKey = normalizeSync.call(this, parsed.plugin, parentKey);
    return combinePluginParts(config.pluginFirst,
        packageResolveSync.call(this, config, parsed.argument, parentMetadata.pluginArgument || parentKey, metadata, parentMetadata, !!metadata.pluginKey),
        metadata.pluginKey);
  }

  return packageResolveSync.call(this, config, key, parentMetadata.pluginArgument || parentKey, metadata, parentMetadata, !!metadata.pluginKey);
}

function coreResolve (config, key, parentKey, doMap, packageName) {
  var relativeResolved = resolveIfNotPlain(key, parentKey || baseURI);

  // standard URL resolution
  if (relativeResolved)
    return applyPaths(config.baseURL, config.paths, relativeResolved);

  // plain keys not starting with './', 'x://' and '/' go through custom resolution
  if (doMap) {
    var mapMatch = getMapMatch(config.map, key);

    if (mapMatch) {
      key = config.map[mapMatch] + key.substr(mapMatch.length);

      relativeResolved = resolveIfNotPlain(key, baseURI);
      if (relativeResolved)
        return applyPaths(config.baseURL, config.paths, relativeResolved);
    }
  }

  if (this.registry.has(key))
    return key;

  if (key.substr(0, 6) === '@node/')
    return key;

  var trailingSlash = packageName && key[key.length - 1] !== '/';
  var resolved = applyPaths(config.baseURL, config.paths, trailingSlash ? key + '/' : key);
  if (trailingSlash)
    return resolved.substr(0, resolved.length - 1);
  return resolved;
}

function packageResolveSync (config, key, parentKey, metadata, parentMetadata, skipExtensions) {
  // ignore . since internal maps handled by standard package resolution
  if (parentMetadata && parentMetadata.packageConfig && key[0] !== '.') {
    var parentMap = parentMetadata.packageConfig.map;
    var parentMapMatch = parentMap && getMapMatch(parentMap, key);

    if (parentMapMatch && typeof parentMap[parentMapMatch] === 'string') {
      var mapped = doMapSync(this, config, parentMetadata.packageConfig, parentMetadata.packageKey, parentMapMatch, key, metadata, skipExtensions);
      if (mapped)
        return mapped;
    }
  }

  var normalized = coreResolve.call(this, config, key, parentKey, true, true);

  var pkgConfigMatch = getPackageConfigMatch(config, normalized);
  metadata.packageKey = pkgConfigMatch && pkgConfigMatch.packageKey || getMapMatch(config.packages, normalized);

  if (!metadata.packageKey)
    return normalized;

  if (config.packageConfigKeys.indexOf(normalized) !== -1) {
    metadata.packageKey = undefined;
    return normalized;
  }

  metadata.packageConfig = config.packages[metadata.packageKey] || (config.packages[metadata.packageKey] = createPackage());

  var subPath = normalized.substr(metadata.packageKey.length + 1);

  return applyPackageConfigSync(this, config, metadata.packageConfig, metadata.packageKey, subPath, metadata, skipExtensions);
}

function packageResolve (config, key, parentKey, metadata, parentMetadata, skipExtensions) {
  var loader = this;

  return resolvedPromise
  .then(function () {
    // ignore . since internal maps handled by standard package resolution
    if (parentMetadata && parentMetadata.packageConfig && key.substr(0, 2) !== './') {
      var parentMap = parentMetadata.packageConfig.map;
      var parentMapMatch = parentMap && getMapMatch(parentMap, key);

      if (parentMapMatch)
        return doMap(loader, config, parentMetadata.packageConfig, parentMetadata.packageKey, parentMapMatch, key, metadata, skipExtensions);
    }

    return resolvedPromise;
  })
  .then(function (mapped) {
    if (mapped)
      return mapped;

    // apply map, core, paths, contextual package map
    var normalized = coreResolve.call(loader, config, key, parentKey, true, true);

    var pkgConfigMatch = getPackageConfigMatch(config, normalized);
    metadata.packageKey = pkgConfigMatch && pkgConfigMatch.packageKey || getMapMatch(config.packages, normalized);

    if (!metadata.packageKey)
      return Promise.resolve(normalized);

    if (config.packageConfigKeys.indexOf(normalized) !== -1) {
      metadata.packageKey = undefined;
      metadata.load = createMeta();
      metadata.load.format = 'json';
      // ensure no loader
      metadata.load.loader = '';
      return Promise.resolve(normalized);
    }

    metadata.packageConfig = config.packages[metadata.packageKey] || (config.packages[metadata.packageKey] = createPackage());

    // load configuration when it matches packageConfigPaths, not already configured, and not the config itself
    var loadConfig = pkgConfigMatch && !metadata.packageConfig.configured;

    return (loadConfig ? loadPackageConfigPath(loader, config, pkgConfigMatch.configPath, metadata) : resolvedPromise)
    .then(function () {
      var subPath = normalized.substr(metadata.packageKey.length + 1);

      return applyPackageConfig(loader, config, metadata.packageConfig, metadata.packageKey, subPath, metadata, skipExtensions);
    });
  });
}

function createMeta () {
  return {
    extension: '',
    deps: undefined,
    format: undefined,
    loader: undefined,
    scriptLoad: undefined,
    globals: undefined,
    nonce: undefined,
    integrity: undefined,
    sourceMap: undefined,
    exports: undefined,
    encapsulateGlobal: false,
    crossOrigin: undefined,
    cjsRequireDetection: true,
    cjsDeferDepsExecute: false,
    esModule: false
  };
}

function setMeta (config, key, metadata) {
  metadata.load = metadata.load || createMeta();

  // apply wildcard metas
  var bestDepth = 0;
  var wildcardIndex;
  for (var module in config.meta) {
    wildcardIndex = module.indexOf('*');
    if (wildcardIndex === -1)
      continue;
    if (module.substr(0, wildcardIndex) === key.substr(0, wildcardIndex)
        && module.substr(wildcardIndex + 1) === key.substr(key.length - module.length + wildcardIndex + 1)) {
      var depth = module.split('/').length;
      if (depth > bestDepth)
        bestDepth = depth;
      extendMeta(metadata.load, config.meta[module], bestDepth !== depth);
    }
  }

  // apply exact meta
  if (config.meta[key])
    extendMeta(metadata.load, config.meta[key], false);

  // apply package meta
  if (metadata.packageKey) {
    var subPath = key.substr(metadata.packageKey.length + 1);

    var meta = {};
    if (metadata.packageConfig.meta) {
      var bestDepth = 0;
      getMetaMatches(metadata.packageConfig.meta, subPath, function (metaPattern, matchMeta, matchDepth) {
        if (matchDepth > bestDepth)
          bestDepth = matchDepth;
        extendMeta(meta, matchMeta, matchDepth && bestDepth > matchDepth);
      });

      extendMeta(metadata.load, meta, false);
    }

    // format
    if (metadata.packageConfig.format && !metadata.pluginKey && !metadata.load.loader)
      metadata.load.format = metadata.load.format || metadata.packageConfig.format;
  }
}

function parsePlugin (pluginFirst, key) {
  var argumentKey;
  var pluginKey;

  var pluginIndex = pluginFirst ? key.indexOf('!') : key.lastIndexOf('!');

  if (pluginIndex === -1)
    return;

  if (pluginFirst) {
    argumentKey = key.substr(pluginIndex + 1);
    pluginKey = key.substr(0, pluginIndex);
  }
  else {
    argumentKey = key.substr(0, pluginIndex);
    pluginKey = key.substr(pluginIndex + 1) || argumentKey.substr(argumentKey.lastIndexOf('.') + 1);
  }

  return {
    argument: argumentKey,
    plugin: pluginKey
  };
}

// put key back together after parts have been normalized
function combinePluginParts (pluginFirst, argumentKey, pluginKey) {
  if (pluginFirst)
    return pluginKey + '!' + argumentKey;
  else
    return argumentKey + '!' + pluginKey;
}

/*
 * Package Configuration Extension
 *
 * Example:
 *
 * SystemJS.packages = {
 *   jquery: {
 *     main: 'index.js', // when not set, package key is requested directly
 *     format: 'amd',
 *     defaultExtension: 'ts', // defaults to 'js', can be set to false
 *     modules: {
 *       '*.ts': {
 *         loader: 'typescript'
 *       },
 *       'vendor/sizzle.js': {
 *         format: 'global'
 *       }
 *     },
 *     map: {
 *        // map internal require('sizzle') to local require('./vendor/sizzle')
 *        sizzle: './vendor/sizzle.js',
 *        // map any internal or external require of 'jquery/vendor/another' to 'another/index.js'
 *        './vendor/another.js': './another/index.js',
 *        // test.js / test -> lib/test.js
 *        './test.js': './lib/test.js',
 *
 *        // environment-specific map configurations
 *        './index.js': {
 *          '~browser': './index-node.js',
 *          './custom-condition.js|~export': './index-custom.js'
 *        }
 *     },
 *     // allows for setting package-prefixed depCache
 *     // keys are normalized module keys relative to the package itself
 *     depCache: {
 *       // import 'package/index.js' loads in parallel package/lib/test.js,package/vendor/sizzle.js
 *       './index.js': ['./test'],
 *       './test.js': ['external-dep'],
 *       'external-dep/path.js': ['./another.js']
 *     }
 *   }
 * };
 *
 * Then:
 *   import 'jquery'                       -> jquery/index.js
 *   import 'jquery/submodule'             -> jquery/submodule.js
 *   import 'jquery/submodule.ts'          -> jquery/submodule.ts loaded as typescript
 *   import 'jquery/vendor/another'        -> another/index.js
 *
 * Detailed Behaviours
 * - main can have a leading "./" can be added optionally
 * - map and defaultExtension are applied to the main
 * - defaultExtension adds the extension only if the exact extension is not present

 * - if a meta value is available for a module, map and defaultExtension are skipped
 * - like global map, package map also applies to subpaths (sizzle/x, ./vendor/another/sub)
 * - condition module map is '@env' module in package or '@system-env' globally
 * - map targets support conditional interpolation ('./x': './x.#{|env}.js')
 * - internal package map targets cannot use boolean conditionals
 *
 * Package Configuration Loading
 *
 * Not all packages may already have their configuration present in the System config
 * For these cases, a list of packageConfigPaths can be provided, which when matched against
 * a request, will first request a ".json" file by the package key to derive the package
 * configuration from. This allows dynamic loading of non-predetermined code, a key use
 * case in SystemJS.
 *
 * Example:
 *
 *   SystemJS.packageConfigPaths = ['packages/test/package.json', 'packages/*.json'];
 *
 *   // will first request 'packages/new-package/package.json' for the package config
 *   // before completing the package request to 'packages/new-package/path'
 *   SystemJS.import('packages/new-package/path');
 *
 *   // will first request 'packages/test/package.json' before the main
 *   SystemJS.import('packages/test');
 *
 * When a package matches packageConfigPaths, it will always send a config request for
 * the package configuration.
 * The package key itself is taken to be the match up to and including the last wildcard
 * or trailing slash.
 * The most specific package config path will be used.
 * Any existing package configurations for the package will deeply merge with the
 * package config, with the existing package configurations taking preference.
 * To opt-out of the package configuration request for a package that matches
 * packageConfigPaths, use the { configured: true } package config option.
 *
 */

function addDefaultExtension (config, pkg, pkgKey, subPath, skipExtensions) {
  // don't apply extensions to folders or if defaultExtension = false
  if (!subPath || !pkg.defaultExtension || subPath[subPath.length - 1] === '/' || skipExtensions)
    return subPath;

  var metaMatch = false;

  // exact meta or meta with any content after the last wildcard skips extension
  if (pkg.meta)
    getMetaMatches(pkg.meta, subPath, function (metaPattern, matchMeta, matchDepth) {
      if (matchDepth === 0 || metaPattern.lastIndexOf('*') !== metaPattern.length - 1)
        return metaMatch = true;
    });

  // exact global meta or meta with any content after the last wildcard skips extension
  if (!metaMatch && config.meta)
    getMetaMatches(config.meta, pkgKey + '/' + subPath, function (metaPattern, matchMeta, matchDepth) {
      if (matchDepth === 0 || metaPattern.lastIndexOf('*') !== metaPattern.length - 1)
        return metaMatch = true;
    });

  if (metaMatch)
    return subPath;

  // work out what the defaultExtension is and add if not there already
  var defaultExtension = '.' + pkg.defaultExtension;
  if (subPath.substr(subPath.length - defaultExtension.length) !== defaultExtension)
    return subPath + defaultExtension;
  else
    return subPath;
}

function applyPackageConfigSync (loader, config, pkg, pkgKey, subPath, metadata, skipExtensions) {
  // main
  if (!subPath) {
    if (pkg.main)
      subPath = pkg.main.substr(0, 2) === './' ? pkg.main.substr(2) : pkg.main;
    else
      // also no submap if key is package itself (import 'pkg' -> 'path/to/pkg.js')
      // NB can add a default package main convention here
      // if it becomes internal to the package then it would no longer be an exit path
      return pkgKey;
  }

  // map config checking without then with extensions
  if (pkg.map) {
    var mapPath = './' + subPath;

    var mapMatch = getMapMatch(pkg.map, mapPath);

    // we then check map with the default extension adding
    if (!mapMatch) {
      mapPath = './' + addDefaultExtension(loader, pkg, pkgKey, subPath, skipExtensions);
      if (mapPath !== './' + subPath)
        mapMatch = getMapMatch(pkg.map, mapPath);
    }
    if (mapMatch) {
      var mapped = doMapSync(loader, config, pkg, pkgKey, mapMatch, mapPath, metadata, skipExtensions);
      if (mapped)
        return mapped;
    }
  }

  // normal package resolution
  return pkgKey + '/' + addDefaultExtension(loader, pkg, pkgKey, subPath, skipExtensions);
}

function validMapping (mapMatch, mapped, path) {
  // allow internal ./x -> ./x/y or ./x/ -> ./x/y recursive maps
  // but only if the path is exactly ./x and not ./x/z
  if (mapped.substr(0, mapMatch.length) === mapMatch && path.length > mapMatch.length)
    return false;

  return true;
}

function doMapSync (loader, config, pkg, pkgKey, mapMatch, path, metadata, skipExtensions) {
  if (path[path.length - 1] === '/')
    path = path.substr(0, path.length - 1);
  var mapped = pkg.map[mapMatch];

  if (typeof mapped === 'object')
    throw new Error('Synchronous conditional normalization not supported sync normalizing ' + mapMatch + ' in ' + pkgKey);

  if (!validMapping(mapMatch, mapped, path) || typeof mapped !== 'string')
    return;

  return packageResolveSync.call(this, config, mapped + path.substr(mapMatch.length), pkgKey + '/', metadata, metadata, skipExtensions);
}

function applyPackageConfig (loader, config, pkg, pkgKey, subPath, metadata, skipExtensions) {
  // main
  if (!subPath) {
    if (pkg.main)
      subPath = pkg.main.substr(0, 2) === './' ? pkg.main.substr(2) : pkg.main;
    // also no submap if key is package itself (import 'pkg' -> 'path/to/pkg.js')
    else
      // NB can add a default package main convention here
      // if it becomes internal to the package then it would no longer be an exit path
      return Promise.resolve(pkgKey);
  }

  // map config checking without then with extensions
  var mapPath, mapMatch;

  if (pkg.map) {
    mapPath = './' + subPath;
    mapMatch = getMapMatch(pkg.map, mapPath);

    // we then check map with the default extension adding
    if (!mapMatch) {
      mapPath = './' + addDefaultExtension(loader, pkg, pkgKey, subPath, skipExtensions);
      if (mapPath !== './' + subPath)
        mapMatch = getMapMatch(pkg.map, mapPath);
    }
  }

  return (mapMatch ? doMap(loader, config, pkg, pkgKey, mapMatch, mapPath, metadata, skipExtensions) : resolvedPromise)
  .then(function (mapped) {
    if (mapped)
      return Promise.resolve(mapped);

    // normal package resolution / fallback resolution for no conditional match
    return Promise.resolve(pkgKey + '/' + addDefaultExtension(loader, pkg, pkgKey, subPath, skipExtensions));
  });
}

function doMap (loader, config, pkg, pkgKey, mapMatch, path, metadata, skipExtensions) {
  if (path[path.length - 1] === '/')
    path = path.substr(0, path.length - 1);

  var mapped = pkg.map[mapMatch];

  if (typeof mapped === 'string') {
    if (!validMapping(mapMatch, mapped, path))
      return resolvedPromise;
    return packageResolve.call(loader, config, mapped + path.substr(mapMatch.length), pkgKey + '/', metadata, metadata, skipExtensions)
    .then(function (normalized) {
      return interpolateConditional.call(loader, normalized, pkgKey + '/', metadata);
    });
  }

  // we use a special conditional syntax to allow the builder to handle conditional branch points further
  /*if (loader.builder)
    return Promise.resolve(pkgKey + '/#:' + path);*/

  // we load all conditions upfront
  var conditionPromises = [];
  var conditions = [];
  for (var e in mapped) {
    var c = parseCondition(e);
    conditions.push({
      condition: c,
      map: mapped[e]
    });
    conditionPromises.push(RegisterLoader$1.prototype.import.call(loader, c.module, pkgKey));
  }

  // map object -> conditional map
  return Promise.all(conditionPromises)
  .then(function (conditionValues) {
    // first map condition to match is used
    for (var i = 0; i < conditions.length; i++) {
      var c = conditions[i].condition;
      var value = readMemberExpression(c.prop, conditionValues[i].__useDefault ? conditionValues[i].default : conditionValues[i]);
      if (!c.negate && value || c.negate && !value)
        return conditions[i].map;
    }
  })
  .then(function (mapped) {
    if (mapped) {
      if (!validMapping(mapMatch, mapped, path))
        return resolvedPromise;
      return packageResolve.call(loader, config, mapped + path.substr(mapMatch.length), pkgKey + '/', metadata, metadata, skipExtensions)
      .then(function (normalized) {
        return interpolateConditional.call(loader, normalized, pkgKey + '/', metadata);
      });
    }

    // no environment match -> fallback to original subPath by returning undefined
  });
}

// check if the given normalized key matches a packageConfigPath
// if so, loads the config
var packageConfigPaths = {};

// data object for quick checks against package paths
function createPkgConfigPathObj (path) {
  var lastWildcard = path.lastIndexOf('*');
  var length = Math.max(lastWildcard + 1, path.lastIndexOf('/'));
  return {
    length: length,
    regEx: new RegExp('^(' + path.substr(0, length).replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[^\\/]+') + ')(\\/|$)'),
    wildcard: lastWildcard !== -1
  };
}

// most specific match wins
function getPackageConfigMatch (config, normalized) {
  var pkgKey, exactMatch = false, configPath;
  for (var i = 0; i < config.packageConfigPaths.length; i++) {
    var packageConfigPath = config.packageConfigPaths[i];
    var p = packageConfigPaths[packageConfigPath] || (packageConfigPaths[packageConfigPath] = createPkgConfigPathObj(packageConfigPath));
    if (normalized.length < p.length)
      continue;
    var match = normalized.match(p.regEx);
    if (match && (!pkgKey || (!(exactMatch && p.wildcard) && pkgKey.length < match[1].length))) {
      pkgKey = match[1];
      exactMatch = !p.wildcard;
      configPath = pkgKey + packageConfigPath.substr(p.length);
    }
  }

  if (!pkgKey)
    return;

  return {
    packageKey: pkgKey,
    configPath: configPath
  };
}

function loadPackageConfigPath (loader, config, pkgConfigPath, metadata, normalized) {
  var configLoader = loader.pluginLoader || loader;

  // ensure we note this is a package config file path
  // it will then be skipped from getting other normalizations itself to ensure idempotency
  if (config.packageConfigKeys.indexOf(pkgConfigPath) === -1)
    config.packageConfigKeys.push(pkgConfigPath);

  return configLoader.import(pkgConfigPath)
  .then(function (pkgConfig) {
    setPkgConfig(metadata.packageConfig, pkgConfig, metadata.packageKey, true, config);
    metadata.packageConfig.configured = true;
  })
  .catch(function (err) {
    throw LoaderError__Check_error_message_for_loader_stack(err, 'Unable to fetch package configuration file ' + pkgConfigPath);
  });
}

function getMetaMatches (pkgMeta, subPath, matchFn) {
  // wildcard meta
  var wildcardIndex;
  for (var module in pkgMeta) {
    // allow meta to start with ./ for flexibility
    var dotRel = module.substr(0, 2) === './' ? './' : '';
    if (dotRel)
      module = module.substr(2);

    wildcardIndex = module.indexOf('*');
    if (wildcardIndex === -1)
      continue;

    if (module.substr(0, wildcardIndex) === subPath.substr(0, wildcardIndex)
        && module.substr(wildcardIndex + 1) === subPath.substr(subPath.length - module.length + wildcardIndex + 1)) {
      // alow match function to return true for an exit path
      if (matchFn(module, pkgMeta[dotRel + module], module.split('/').length))
        return;
    }
  }
  // exact meta
  var exactMeta = pkgMeta[subPath] && Object.hasOwnProperty.call(pkgMeta, subPath) ? pkgMeta[subPath] : pkgMeta['./' + subPath];
  if (exactMeta)
    matchFn(exactMeta, exactMeta, 0);
}


/*
 * Conditions Extension
 *
 *   Allows a condition module to alter the resolution of an import via syntax:
 *
 *     import $ from 'jquery/#{browser}';
 *
 *   Will first load the module 'browser' via `SystemJS.import('browser')` and
 *   take the default export of that module.
 *   If the default export is not a string, an error is thrown.
 *
 *   We then substitute the string into the require to get the conditional resolution
 *   enabling environment-specific variations like:
 *
 *     import $ from 'jquery/ie'
 *     import $ from 'jquery/firefox'
 *     import $ from 'jquery/chrome'
 *     import $ from 'jquery/safari'
 *
 *   It can be useful for a condition module to define multiple conditions.
 *   This can be done via the `|` modifier to specify an export member expression:
 *
 *     import 'jquery/#{./browser.js|grade.version}'
 *
 *   Where the `grade` export `version` member in the `browser.js` module  is substituted.
 *
 *
 * Boolean Conditionals
 *
 *   For polyfill modules, that are used as imports but have no module value,
 *   a binary conditional allows a module not to be loaded at all if not needed:
 *
 *     import 'es5-shim#?./conditions.js|needs-es5shim'
 *
 *   These conditions can also be negated via:
 *
 *     import 'es5-shim#?./conditions.js|~es6'
 *
 */

var sysConditions = ['browser', 'node', 'dev', 'build', 'production', 'default'];

function parseCondition (condition) {
  var conditionExport, conditionModule, negation;

  var negation;
  var conditionExportIndex = condition.lastIndexOf('|');
  if (conditionExportIndex !== -1) {
    conditionExport = condition.substr(conditionExportIndex + 1);
    conditionModule = condition.substr(0, conditionExportIndex);

    if (conditionExport[0] === '~') {
      negation = true;
      conditionExport = conditionExport.substr(1);
    }
  }
  else {
    negation = condition[0] === '~';
    conditionExport = 'default';
    conditionModule = condition.substr(negation);
    if (sysConditions.indexOf(conditionModule) !== -1) {
      conditionExport = conditionModule;
      conditionModule = null;
    }
  }

  return {
    module: conditionModule || '@system-env',
    prop: conditionExport,
    negate: negation
  };
}

function resolveCondition (conditionObj, parentKey, bool) {
  // import without __useDefault handling here
  return RegisterLoader$1.prototype.import.call(this, conditionObj.module, parentKey)
  .then(function (condition) {
    var m = readMemberExpression(conditionObj.prop, condition);

    if (bool && typeof m !== 'boolean')
      throw new TypeError('Condition did not resolve to a boolean.');

    return conditionObj.negate ? !m : m;
  });
}

var interpolationRegEx = /#\{[^\}]+\}/;
function interpolateConditional (key, parentKey, parentMetadata) {
  // first we normalize the conditional
  var conditionalMatch = key.match(interpolationRegEx);

  if (!conditionalMatch)
    return Promise.resolve(key);

  var conditionObj = parseCondition.call(this, conditionalMatch[0].substr(2, conditionalMatch[0].length - 3));

  // in builds, return normalized conditional
  /*if (this.builder)
    return this.normalize(conditionObj.module, parentKey, createMetadata(), parentMetadata)
    .then(function (conditionModule) {
      conditionObj.module = conditionModule;
      return key.replace(interpolationRegEx, '#{' + serializeCondition(conditionObj) + '}');
    });*/

  return resolveCondition.call(this, conditionObj, parentKey, false)
  .then(function (conditionValue) {
    if (typeof conditionValue !== 'string')
      throw new TypeError('The condition value for ' + key + ' doesn\'t resolve to a string.');

    if (conditionValue.indexOf('/') !== -1)
      throw new TypeError('Unabled to interpolate conditional ' + key + (parentKey ? ' in ' + parentKey : '') + '\n\tThe condition value ' + conditionValue + ' cannot contain a "/" separator.');

    return key.replace(interpolationRegEx, conditionValue);
  });
}

/*
 Extend config merging one deep only

  loader.config({
    some: 'random',
    config: 'here',
    deep: {
      config: { too: 'too' }
    }
  });

  <=>

  loader.some = 'random';
  loader.config = 'here'
  loader.deep = loader.deep || {};
  loader.deep.config = { too: 'too' };


  Normalizes meta and package configs allowing for:

  SystemJS.config({
    meta: {
      './index.js': {}
    }
  });

  To become

  SystemJS.meta['https://thissite.com/index.js'] = {};

  For easy normalization canonicalization with latest URL support.

*/
var envConfigNames = ['browserConfig', 'nodeConfig', 'devConfig', 'buildConfig', 'productionConfig'];
function envSet(loader, cfg, envCallback) {
  for (var i = 0; i < envConfigNames.length; i++) {
    var envConfig = envConfigNames[i];
    if (cfg[envConfig] && envModule[envConfig.substr(0, envConfig.length - 6)])
      envCallback(cfg[envConfig]);
  }
}

function cloneObj (obj, maxDepth) {
  var clone = {};
  for (var p in obj) {
    var prop = obj[p];
    if (maxDepth > 1) {
      if (prop instanceof Array)
        clone[p] = [].concat(prop);
      else if (typeof prop === 'object')
        clone[p] = cloneObj(prop, maxDepth - 1);
      else if (p !== 'packageConfig')
        clone[p] = prop;
    }
    else {
      clone[p] = prop;
    }
  }
  return clone;
}

function getConfigItem (config, p) {
  var cfgItem = config[p];

  // getConfig must return an unmodifiable clone of the configuration
  if (cfgItem instanceof Array)
    return config[p].concat([]);
  else if (typeof cfgItem === 'object')
    return cloneObj(cfgItem, 3)
  else
    return config[p];
}

function getConfig (configName) {
  if (configName) {
    if (configNames.indexOf(configName) !== -1)
      return getConfigItem(this[CONFIG], configName);
    throw new Error('"' + configName + '" is not a valid configuration name. Must be one of ' + configNames.join(', ') + '.');
  }

  var cfg = {};
  for (var i = 0; i < configNames.length; i++) {
    var p = configNames[i];
    var configItem = getConfigItem(this[CONFIG], p);
    if (configItem !== undefined)
      cfg[p] = configItem;
  }
  return cfg;
}

function setConfig (cfg, isEnvConfig) {
  var loader = this;
  var config = this[CONFIG];

  if ('warnings' in cfg)
    config.warnings = cfg.warnings;

  if ('wasm' in cfg)
    config.wasm = typeof WebAssembly !== 'undefined' && cfg.wasm;

  if ('production' in cfg || 'build' in cfg)
    setProduction.call(loader, !!cfg.production, !!(cfg.build || envModule && envModule.build));

  if (!isEnvConfig) {
    // if using nodeConfig / browserConfig / productionConfig, take baseURL from there
    // these exceptions will be unnecessary when we can properly implement config queuings
    var baseURL;
    envSet(loader, cfg, function(cfg) {
      baseURL = baseURL || cfg.baseURL;
    });
    baseURL = baseURL || cfg.baseURL;

    // always configure baseURL first
    if (baseURL) {
      config.baseURL = resolveIfNotPlain(baseURL, baseURI) || resolveIfNotPlain('./' + baseURL, baseURI);
      if (config.baseURL[config.baseURL.length - 1] !== '/')
        config.baseURL += '/';
    }

    if (cfg.paths)
      extend(config.paths, cfg.paths);

    envSet(loader, cfg, function(cfg) {
      if (cfg.paths)
        extend(config.paths, cfg.paths);
    });

    for (var p in config.paths) {
      if (config.paths[p].indexOf('*') === -1)
        continue;
      warn.call(config, 'Path config ' + p + ' -> ' + config.paths[p] + ' is no longer supported as wildcards are deprecated.');
      delete config.paths[p];
    }
  }

  if (cfg.defaultJSExtensions)
    warn.call(config, 'The defaultJSExtensions configuration option is deprecated.\n  Use packages defaultExtension instead.', true);

  if (typeof cfg.pluginFirst === 'boolean')
    config.pluginFirst = cfg.pluginFirst;

  if (cfg.map) {
    for (var p in cfg.map) {
      var v = cfg.map[p];

      if (typeof v === 'string') {
        var mapped = coreResolve.call(loader, config, v, undefined, false, false);
        if (mapped[mapped.length -1] === '/' && p[p.length - 1] !== ':' && p[p.length - 1] !== '/')
          mapped = mapped.substr(0, mapped.length - 1);
        config.map[p] = mapped;
      }

      // object map
      else {
        var pkgName = coreResolve.call(loader, config, p[p.length - 1] !== '/' ? p + '/' : p, undefined, true, true);
        pkgName = pkgName.substr(0, pkgName.length - 1);

        var pkg = config.packages[pkgName];
        if (!pkg) {
          pkg = config.packages[pkgName] = createPackage();
          // use '' instead of false to keep type consistent
          pkg.defaultExtension = '';
        }
        setPkgConfig(pkg, { map: v }, pkgName, false, config);
      }
    }
  }

  if (cfg.packageConfigPaths) {
    var packageConfigPaths = [];
    for (var i = 0; i < cfg.packageConfigPaths.length; i++) {
      var path = cfg.packageConfigPaths[i];
      var packageLength = Math.max(path.lastIndexOf('*') + 1, path.lastIndexOf('/'));
      var normalized = coreResolve.call(loader, config, path.substr(0, packageLength), undefined, false, false);
      packageConfigPaths[i] = normalized + path.substr(packageLength);
    }
    config.packageConfigPaths = packageConfigPaths;
  }

  if (cfg.bundles) {
    for (var p in cfg.bundles) {
      var bundle = [];
      for (var i = 0; i < cfg.bundles[p].length; i++)
        bundle.push(loader.normalizeSync(cfg.bundles[p][i]));
      config.bundles[p] = bundle;
    }
  }

  if (cfg.packages) {
    for (var p in cfg.packages) {
      if (p.match(/^([^\/]+:)?\/\/$/))
        throw new TypeError('"' + p + '" is not a valid package name.');

      var pkgName = coreResolve.call(loader, config, p[p.length - 1] !== '/' ? p + '/' : p, undefined, true, true);
      pkgName = pkgName.substr(0, pkgName.length - 1);

      setPkgConfig(config.packages[pkgName] = config.packages[pkgName] || createPackage(), cfg.packages[p], pkgName, false, config);
    }
  }

  if (cfg.depCache) {
    for (var p in cfg.depCache)
      config.depCache[loader.normalizeSync(p)] = [].concat(cfg.depCache[p]);
  }

  if (cfg.meta) {
    for (var p in cfg.meta) {
      // base wildcard stays base
      if (p[0] === '*') {
        extend(config.meta[p] = config.meta[p] || {}, cfg.meta[p]);
      }
      else {
        var resolved = coreResolve.call(loader, config, p, undefined, true, true);
        extend(config.meta[resolved] = config.meta[resolved] || {}, cfg.meta[p]);
      }
    }
  }

  if ('transpiler' in cfg)
    config.transpiler = cfg.transpiler;


  // copy any remaining non-standard configuration properties
  for (var c in cfg) {
    if (configNames.indexOf(c) !== -1)
      continue;
    if (envConfigNames.indexOf(c) !== -1)
      continue;

    // warn.call(config, 'Setting custom config option `System.config({ ' + c + ': ... })` is deprecated. Avoid custom config options or set SystemJS.' + c + ' = ... directly.');
    loader[c] = cfg[c];
  }

  envSet(loader, cfg, function(cfg) {
    loader.config(cfg, true);
  });
}

function createPackage () {
  return {
    defaultExtension: undefined,
    main: undefined,
    format: undefined,
    meta: undefined,
    map: undefined,
    packageConfig: undefined,
    configured: false
  };
}

// deeply-merge (to first level) config with any existing package config
function setPkgConfig (pkg, cfg, pkgName, prependConfig, config) {
  for (var prop in cfg) {
    if (prop === 'main' || prop === 'format' || prop === 'defaultExtension' || prop === 'configured') {
      if (!prependConfig || pkg[prop] === undefined)
        pkg[prop] = cfg[prop];
    }
    else if (prop === 'map') {
      (prependConfig ? prepend : extend)(pkg.map = pkg.map || {}, cfg.map);
    }
    else if (prop === 'meta') {
      (prependConfig ? prepend : extend)(pkg.meta = pkg.meta || {}, cfg.meta);
    }
    else if (Object.hasOwnProperty.call(cfg, prop)) {
      warn.call(config, '"' + prop + '" is not a valid package configuration option in package ' + pkgName);
    }
  }

  // default defaultExtension for packages only
  if (pkg.defaultExtension === undefined)
    pkg.defaultExtension = 'js';

  if (pkg.main === undefined && pkg.map && pkg.map['.']) {
    pkg.main = pkg.map['.'];
    delete pkg.map['.'];
  }
  // main object becomes main map
  else if (typeof pkg.main === 'object') {
    pkg.map = pkg.map || {};
    pkg.map['./@main'] = pkg.main;
    pkg.main['default'] = pkg.main['default'] || './';
    pkg.main = '@main';
  }

  return pkg;
}

var hasBuffer = typeof Buffer !== 'undefined';
try {
  if (hasBuffer && new Buffer('a').toString('base64') !== 'YQ==')
    hasBuffer = false;
}
catch (e) {
  hasBuffer = false;
}

var sourceMapPrefix = '\n//# sourceMapping' + 'URL=data:application/json;base64,';
function inlineSourceMap (sourceMapString) {
  if (hasBuffer)
    return sourceMapPrefix + new Buffer(sourceMapString).toString('base64');
  else if (typeof btoa !== 'undefined')
    return sourceMapPrefix + btoa(unescape(encodeURIComponent(sourceMapString)));
  else
    return '';
}

function getSource(source, sourceMap, address, wrap) {
  var lastLineIndex = source.lastIndexOf('\n');

  if (sourceMap) {
    if (typeof sourceMap != 'object')
      throw new TypeError('load.metadata.sourceMap must be set to an object.');

    sourceMap = JSON.stringify(sourceMap);
  }

  return (wrap ? '(function(System, SystemJS) {' : '') + source + (wrap ? '\n})(System, System);' : '')
      // adds the sourceURL comment if not already present
      + (source.substr(lastLineIndex, 15) != '\n//# sourceURL='
        ? '\n//# sourceURL=' + address + (sourceMap ? '!transpiled' : '') : '')
      // add sourceMappingURL if load.metadata.sourceMap is set
      + (sourceMap && inlineSourceMap(sourceMap) || '');
}

// script execution via injecting a script tag into the page
// this allows CSP nonce to be set for CSP environments
var head;
function scriptExec(loader, source, sourceMap, address, nonce) {
  if (!head)
    head = document.head || document.body || document.documentElement;

  var script = document.createElement('script');
  script.text = getSource(source, sourceMap, address, false);
  var onerror = window.onerror;
  var e;
  window.onerror = function(_e) {
    e = addToError(_e, 'Evaluating ' + address);
    if (onerror)
      onerror.apply(this, arguments);
  };
  preExec(loader);

  if (nonce)
    script.setAttribute('nonce', nonce);

  head.appendChild(script);
  head.removeChild(script);
  postExec();
  window.onerror = onerror;
  if (e)
    return e;
}

var vm;
var useVm;

var curSystem;

var callCounter = 0;
function preExec (loader) {
  if (callCounter++ == 0)
    curSystem = envGlobal.System;
  envGlobal.System = envGlobal.SystemJS = loader;
}
function postExec () {
  if (--callCounter == 0)
    envGlobal.System = envGlobal.SystemJS = curSystem;
}

var supportsScriptExec = false;
if (isBrowser && typeof document != 'undefined' && document.getElementsByTagName) {
  if (!(window.chrome && window.chrome.extension || navigator.userAgent.match(/^Node\.js/)))
    supportsScriptExec = true;
}

function evaluate (loader, source, sourceMap, address, integrity, nonce, noWrap) {
  if (!source)
    return;
  if (nonce && supportsScriptExec)
    return scriptExec(loader, source, sourceMap, address, nonce);
  try {
    preExec(loader);
    // global scoped eval for node (avoids require scope leak)
    if (!vm && loader._nodeRequire) {
      vm = loader._nodeRequire('vm');
      useVm = vm.runInThisContext("typeof System !== 'undefined' && System") === loader;
    }
    if (useVm)
      vm.runInThisContext(getSource(source, sourceMap, address, !noWrap), { filename: address + (sourceMap ? '!transpiled' : '') });
    else
      (0, eval)(getSource(source, sourceMap, address, !noWrap));
    postExec();
  }
  catch (e) {
    postExec();
    return e;
  }
}

var formatHelpers = function (loader) {
  loader.set('@@cjs-helpers', loader.newModule({
    requireResolve: requireResolve.bind(loader),
    getPathVars: getPathVars
  }));

  loader.set('@@global-helpers', loader.newModule({
    prepareGlobal: prepareGlobal
  }));

  /*
    AMD-compatible require
    To copy RequireJS, set window.require = window.requirejs = loader.amdRequire
  */
  function require (names, callback, errback, referer) {
    // in amd, first arg can be a config object... we just ignore
    if (typeof names === 'object' && !(names instanceof Array))
      return require.apply(null, Array.prototype.splice.call(arguments, 1, arguments.length - 1));

    // amd require
    if (typeof names === 'string' && typeof callback === 'function')
      names = [names];
    if (names instanceof Array) {
      var dynamicRequires = [];
      for (var i = 0; i < names.length; i++)
        dynamicRequires.push(loader.import(names[i], referer));
      Promise.all(dynamicRequires).then(function (modules) {
        for (var i = 0; i < modules.length; i++)
          modules[i] = modules[i].__useDefault ? modules[i].default : modules[i];
        if (callback)
          callback.apply(null, modules);
      }, errback);
    }

    // commonjs require
    else if (typeof names === 'string') {
      var normalized = loader.decanonicalize(names, referer);
      var module = loader.get(normalized);
      if (!module)
        throw new Error('Module not already loaded loading "' + names + '" as ' + normalized + (referer ? ' from "' + referer + '".' : '.'));
      return module.__useDefault ? module.default : module;
    }

    else
      throw new TypeError('Invalid require');
  }

  function define (name, deps, factory) {
    if (typeof name !== 'string') {
      factory = deps;
      deps = name;
      name = null;
    }

    if (!(deps instanceof Array)) {
      factory = deps;
      deps = ['require', 'exports', 'module'].splice(0, factory.length);
    }

    if (typeof factory !== 'function')
      factory = (function (factory) {
        return function() { return factory; }
      })(factory);

    if (!name) {
      if (curMetaDeps) {
        deps = deps.concat(curMetaDeps);
        curMetaDeps = undefined;
      }
    }

    // remove system dependencies
    var requireIndex, exportsIndex, moduleIndex;

    if ((requireIndex = deps.indexOf('require')) !== -1) {

      deps.splice(requireIndex, 1);

      // only trace cjs requires for non-named
      // named defines assume the trace has already been done
      if (!name)
        deps = deps.concat(amdGetCJSDeps(factory.toString(), requireIndex));
    }

    if ((exportsIndex = deps.indexOf('exports')) !== -1)
      deps.splice(exportsIndex, 1);

    if ((moduleIndex = deps.indexOf('module')) !== -1)
      deps.splice(moduleIndex, 1);

    function execute (req, exports, module) {
      var depValues = [];
      for (var i = 0; i < deps.length; i++)
        depValues.push(req(deps[i]));

      module.uri = module.id;

      module.config = noop;

      // add back in system dependencies
      if (moduleIndex !== -1)
        depValues.splice(moduleIndex, 0, module);

      if (exportsIndex !== -1)
        depValues.splice(exportsIndex, 0, exports);

      if (requireIndex !== -1) {
        var contextualRequire = function (names, callback, errback) {
          if (typeof names === 'string' && typeof callback !== 'function')
            return req(names);
          return require.call(loader, names, callback, errback, module.id);
        };
        contextualRequire.toUrl = function (name) {
          return loader.normalizeSync(name, module.id);
        };
        depValues.splice(requireIndex, 0, contextualRequire);
      }

      // set global require to AMD require
      var curRequire = envGlobal.require;
      envGlobal.require = require;

      var output = factory.apply(exportsIndex === -1 ? envGlobal : exports, depValues);

      envGlobal.require = curRequire;

      if (typeof output !== 'undefined')
        module.exports = output;
    }

    // anonymous define
    if (!name) {
      loader.registerDynamic(deps, false, curEsModule ? wrapEsModuleExecute(execute) : execute);
    }
    else {
      loader.registerDynamic(name, deps, false, execute);

      // if we don't have any other defines,
      // then let this be an anonymous define
      // this is just to support single modules of the form:
      // define('jquery')
      // still loading anonymously
      // because it is done widely enough to be useful
      // as soon as there is more than one define, this gets removed though
      if (lastNamedDefine) {
        lastNamedDefine = undefined;
        multipleNamedDefines = true;
      }
      else if (!multipleNamedDefines) {
        lastNamedDefine = [deps, execute];
      }
    }
  }
  define.amd = {};

  loader.amdDefine = define;
  loader.amdRequire = require;
};

// CJS
var windowOrigin;
if (typeof window !== 'undefined' && typeof document !== 'undefined' && window.location)
  windowOrigin = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');

function stripOrigin(path) {
  if (path.substr(0, 8) === 'file:///')
    return path.substr(7 + !!isWindows);

  if (windowOrigin && path.substr(0, windowOrigin.length) === windowOrigin)
    return path.substr(windowOrigin.length);

  return path;
}

function requireResolve (request, parentId) {
  return stripOrigin(this.normalizeSync(request, parentId));
}

function getPathVars (moduleId) {
  // remove any plugin syntax
  var pluginIndex = moduleId.lastIndexOf('!');
  var filename;
  if (pluginIndex !== -1)
    filename = moduleId.substr(0, pluginIndex);
  else
    filename = moduleId;

  var dirname = filename.split('/');
  dirname.pop();
  dirname = dirname.join('/');

  return {
    filename: stripOrigin(filename),
    dirname: stripOrigin(dirname)
  };
}

var commentRegEx$1 = /(^|[^\\])(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;
var stringRegEx$1 = /("[^"\\\n\r]*(\\.[^"\\\n\r]*)*"|'[^'\\\n\r]*(\\.[^'\\\n\r]*)*')/g;

// extract CJS dependencies from source text via regex static analysis
// read require('x') statements not in comments or strings
function getCJSDeps (source) {
  cjsRequireRegEx.lastIndex = commentRegEx$1.lastIndex = stringRegEx$1.lastIndex = 0;

  var deps = [];

  var match;

  // track string and comment locations for unminified source
  var stringLocations = [], commentLocations = [];

  function inLocation (locations, match) {
    for (var i = 0; i < locations.length; i++)
      if (locations[i][0] < match.index && locations[i][1] > match.index)
        return true;
    return false;
  }

  if (source.length / source.split('\n').length < 200) {
    while (match = stringRegEx$1.exec(source))
      stringLocations.push([match.index, match.index + match[0].length]);

    // TODO: track template literals here before comments

    while (match = commentRegEx$1.exec(source)) {
      // only track comments not starting in strings
      if (!inLocation(stringLocations, match))
        commentLocations.push([match.index + match[1].length, match.index + match[0].length - 1]);
    }
  }

  while (match = cjsRequireRegEx.exec(source)) {
    // ensure we're not within a string or comment location
    if (!inLocation(stringLocations, match) && !inLocation(commentLocations, match)) {
      var dep = match[1].substr(1, match[1].length - 2);
      // skip cases like require('" + file + "')
      if (dep.match(/"|'/))
        continue;
      deps.push(dep);
    }
  }

  return deps;
}

// Global
// bare minimum ignores
var ignoredGlobalProps = ['_g', 'sessionStorage', 'localStorage', 'clipboardData', 'frames', 'frameElement', 'external',
  'mozAnimationStartTime', 'webkitStorageInfo', 'webkitIndexedDB', 'mozInnerScreenY', 'mozInnerScreenX'];

var globalSnapshot;
function globalIterator (globalName) {
  if (ignoredGlobalProps.indexOf(globalName) !== -1)
    return;
  try {
    var value = envGlobal[globalName];
  }
  catch (e) {
    ignoredGlobalProps.push(globalName);
  }
  this(globalName, value);
}

function getGlobalValue (exports) {
  if (typeof exports === 'string')
    return readMemberExpression(exports, envGlobal);

  if (!(exports instanceof Array))
    throw new Error('Global exports must be a string or array.');

  var globalValue = {};
  for (var i = 0; i < exports.length; i++)
    globalValue[exports[i].split('.').pop()] = readMemberExpression(exports[i], envGlobal);
  return globalValue;
}

function prepareGlobal (moduleName, exports, globals, encapsulate) {
  // disable module detection
  var curDefine = envGlobal.define;

  envGlobal.define = undefined;

  // set globals
  var oldGlobals;
  if (globals) {
    oldGlobals = {};
    for (var g in globals) {
      oldGlobals[g] = envGlobal[g];
      envGlobal[g] = globals[g];
    }
  }

  // store a complete copy of the global object in order to detect changes
  if (!exports) {
    globalSnapshot = {};

    Object.keys(envGlobal).forEach(globalIterator, function (name, value) {
      globalSnapshot[name] = value;
    });
  }

  // return function to retrieve global
  return function () {
    var globalValue = exports ? getGlobalValue(exports) : {};

    var singleGlobal;
    var multipleExports = !!exports;

    if (!exports || encapsulate)
      Object.keys(envGlobal).forEach(globalIterator, function (name, value) {
        if (globalSnapshot[name] === value)
          return;
        if (value === undefined)
          return;

        // allow global encapsulation where globals are removed
        if (encapsulate)
          envGlobal[name] = undefined;

        if (!exports) {
          globalValue[name] = value;

          if (singleGlobal !== undefined) {
            if (!multipleExports && singleGlobal !== value)
              multipleExports = true;
          }
          else {
            singleGlobal = value;
          }
        }
      });

    globalValue = multipleExports ? globalValue : singleGlobal;

    // revert globals
    if (oldGlobals) {
      for (var g in oldGlobals)
        envGlobal[g] = oldGlobals[g];
    }
    envGlobal.define = curDefine;

    return globalValue;
  };
}

// AMD
var cjsRequirePre = "(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])";
var cjsRequirePost = "\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)";
var fnBracketRegEx = /\(([^\)]*)\)/;
var wsRegEx = /^\s+|\s+$/g;

var requireRegExs = {};

function amdGetCJSDeps(source, requireIndex) {

  // remove comments
  source = source.replace(commentRegEx$1, '');

  // determine the require alias
  var params = source.match(fnBracketRegEx);
  var requireAlias = (params[1].split(',')[requireIndex] || 'require').replace(wsRegEx, '');

  // find or generate the regex for this requireAlias
  var requireRegEx = requireRegExs[requireAlias] || (requireRegExs[requireAlias] = new RegExp(cjsRequirePre + requireAlias + cjsRequirePost, 'g'));

  requireRegEx.lastIndex = 0;

  var deps = [];

  var match;
  while (match = requireRegEx.exec(source))
    deps.push(match[2] || match[3]);

  return deps;
}

function wrapEsModuleExecute (execute) {
  return function (require, exports, module) {
    execute(require, exports, module);
    exports = module.exports;
    if ((typeof exports === 'object' || typeof exports === 'function') && !('__esModule' in exports))
      Object.defineProperty(module.exports, '__esModule', {
        value: true
      });
  };
}

// generate anonymous define from singular named define
var multipleNamedDefines = false;
var lastNamedDefine;
var curMetaDeps;
var curEsModule = false;
function clearLastDefine (metaDeps, esModule) {
  curMetaDeps = metaDeps;
  curEsModule = esModule;
  lastNamedDefine = undefined;
  multipleNamedDefines = false;
}
function registerLastDefine (loader) {
  if (lastNamedDefine)
    loader.registerDynamic(curMetaDeps ? lastNamedDefine[0].concat(curMetaDeps) : lastNamedDefine[0],
        false, curEsModule ? wrapEsModuleExecute(lastNamedDefine[1]) : lastNamedDefine[1]);

  // bundles are an empty module
  else if (multipleNamedDefines)
    loader.registerDynamic([], false, noop);
}

var supportsScriptLoad = (isBrowser || isWorker) && typeof navigator !== 'undefined' && navigator.userAgent && !navigator.userAgent.match(/MSIE (9|10).0/);

// include the node require since we're overriding it
var nodeRequire;
if (typeof require !== 'undefined' && typeof process !== 'undefined' && !process.browser)
  nodeRequire = require;

function setMetaEsModule (metadata, moduleValue) {
  if (metadata.load.esModule && (typeof moduleValue === 'object' || typeof moduleValue === 'function') &&
      !('__esModule' in moduleValue))
    Object.defineProperty(moduleValue, '__esModule', {
      value: true
    });
}

function instantiate$1 (key, processAnonRegister) {
  var loader = this;
  var config = this[CONFIG];
  // first do bundles and depCache
  return (loadBundlesAndDepCache(config, this, key) || resolvedPromise)
  .then(function () {
    if (processAnonRegister())
      return;

    var metadata = loader[METADATA][key];

    // node module loading
    if (key.substr(0, 6) === '@node/') {
      if (!loader._nodeRequire)
        throw new TypeError('Error loading ' + key + '. Can only load node core modules in Node.');
      loader.registerDynamic([], false, function () {
        return loadNodeModule.call(loader, key.substr(6), loader.baseURL);
      });
      processAnonRegister();
      return;
    }

    if (metadata.load.scriptLoad ) {
      if (metadata.load.pluginKey || !supportsScriptLoad) {
        metadata.load.scriptLoad = false;
        warn.call(config, 'scriptLoad not supported for "' + key + '"');
      }
    }
    else if (metadata.load.scriptLoad !== false && !metadata.load.pluginKey && supportsScriptLoad) {
      // auto script load AMD, global without deps
      if (!metadata.load.deps && !metadata.load.globals &&
          (metadata.load.format === 'system' || metadata.load.format === 'register' || metadata.load.format === 'global' && metadata.load.exports))
        metadata.load.scriptLoad = true;
    }

    // fetch / translate / instantiate pipeline
    if (!metadata.load.scriptLoad)
      return initializePlugin(loader, key, metadata)
      .then(function () {
        return runFetchPipeline(loader, key, metadata, processAnonRegister, config.wasm);
      })

    // just script loading
    return new Promise(function (resolve, reject) {
      if (metadata.load.format === 'amd' && envGlobal.define !== loader.amdDefine)
        throw new Error('Loading AMD with scriptLoad requires setting the global `' + globalName + '.define = SystemJS.amdDefine`');

      scriptLoad(key, metadata.load.crossOrigin, metadata.load.integrity, function () {
        if (!processAnonRegister()) {
          metadata.load.format = 'global';
          var globalValue = metadata.load.exports && getGlobalValue(metadata.load.exports);
          loader.registerDynamic([], false, function () {
            setMetaEsModule(metadata, globalValue);
            return globalValue;
          });
          processAnonRegister();
        }

        resolve();
      }, reject);
    });
  })
  .then(function (instantiated) {
    delete loader[METADATA][key];
    return instantiated;
  });
}

function initializePlugin (loader, key, metadata) {
  if (!metadata.pluginKey)
    return resolvedPromise;

  return loader.import(metadata.pluginKey).then(function (plugin) {
    metadata.pluginModule = plugin;
    metadata.pluginLoad = {
      name: key,
      address: metadata.pluginArgument,
      source: undefined,
      metadata: metadata.load
    };
    metadata.load.deps = metadata.load.deps || [];
  });
}

function loadBundlesAndDepCache (config, loader, key) {
  // load direct deps, in turn will pick up their trace trees
  var deps = config.depCache[key];
  if (deps) {
    for (var i = 0; i < deps.length; i++)
      loader.normalize(deps[i], key).then(preloadScript);
  }
  else {
    var matched = false;
    for (var b in config.bundles) {
      for (var i = 0; i < config.bundles[b].length; i++) {
        var curModule = config.bundles[b][i];

        if (curModule === key) {
          matched = true;
          break;
        }

        // wildcard in bundles includes / boundaries
        if (curModule.indexOf('*') !== -1) {
          var parts = curModule.split('*');
          if (parts.length !== 2) {
            config.bundles[b].splice(i--, 1);
            continue;
          }

          if (key.substr(0, parts[0].length) === parts[0] &&
              key.substr(key.length - parts[1].length, parts[1].length) === parts[1]) {
            matched = true;
            break;
          }
        }
      }

      if (matched)
        return loader.import(b);
    }
  }
}

function runFetchPipeline (loader, key, metadata, processAnonRegister, wasm) {
  if (metadata.load.exports && !metadata.load.format)
    metadata.load.format = 'global';

  return resolvedPromise

  // locate
  .then(function () {
    if (!metadata.pluginModule || !metadata.pluginModule.locate)
      return;

    return Promise.resolve(metadata.pluginModule.locate.call(loader, metadata.pluginLoad))
    .then(function (address) {
      if (address)
        metadata.pluginLoad.address = address;
    });
  })

  // fetch
  .then(function () {
    if (!metadata.pluginModule)
      return fetch$1(key, metadata.load.authorization, metadata.load.integrity, wasm);

    wasm = false;

    if (!metadata.pluginModule.fetch)
      return fetch$1(metadata.pluginLoad.address, metadata.load.authorization, metadata.load.integrity, false);

    return metadata.pluginModule.fetch.call(loader, metadata.pluginLoad, function (load) {
      return fetch$1(load.address, metadata.load.authorization, metadata.load.integrity, false);
    });
  })

  .then(function (fetched) {
    // fetch is already a utf-8 string if not doing wasm detection
    if (!wasm || typeof fetched === 'string')
      return translateAndInstantiate(loader, key, fetched, metadata, processAnonRegister);

    return checkInstantiateWasm(loader, fetched, processAnonRegister)
    .then(function (wasmInstantiated) {
      if (wasmInstantiated)
        return;

      // not wasm -> convert buffer into utf-8 string to execute as a module
      // TextDecoder compatibility matches WASM currently. Need to keep checking this.
      // The TextDecoder interface is documented at http://encoding.spec.whatwg.org/#interface-textdecoder
      var stringSource = isBrowser ? new TextDecoder('utf-8').decode(new Uint8Array(fetched)) : fetched.toString();
      return translateAndInstantiate(loader, key, stringSource, metadata, processAnonRegister);
    });
  });
}

function translateAndInstantiate (loader, key, source, metadata, processAnonRegister) {
  return Promise.resolve(source)
  // translate
  .then(function (source) {
    if (metadata.load.format === 'detect')
      metadata.load.format = undefined;

    readMetaSyntax(source, metadata);

    if (!metadata.pluginModule || !metadata.pluginModule.translate)
      return source;

    metadata.pluginLoad.source = source;
    return Promise.resolve(metadata.pluginModule.translate.call(loader, metadata.pluginLoad, metadata.traceOpts))
    .then(function (translated) {
      if (metadata.load.sourceMap) {
        if (typeof metadata.load.sourceMap !== 'object')
          throw new Error('metadata.load.sourceMap must be set to an object.');
        sanitizeSourceMap(metadata.pluginLoad.address, metadata.load.sourceMap);
      }

      if (typeof translated === 'string')
        return translated;
      else
        return metadata.pluginLoad.source;
    });
  })
  .then(function (source) {
    if (!metadata.load.format && source.substring(0, 8) === '"bundle"') {
      metadata.load.format = 'system';
      return source;
    }

    if (metadata.load.format === 'register' || !metadata.load.format && detectRegisterFormat(source)) {
      metadata.load.format = 'register';
      return source;
    }

    if (metadata.load.format !== 'esm' && (metadata.load.format || !source.match(esmRegEx))) {
      return source;
    }

    metadata.load.format = 'esm';
    return transpile(loader, source, key, metadata, processAnonRegister);
  })

  // instantiate
  .then(function (translated) {
    if (typeof translated !== 'string' || !metadata.pluginModule || !metadata.pluginModule.instantiate)
      return translated;

    var calledInstantiate = false;
    metadata.pluginLoad.source = translated;
    return Promise.resolve(metadata.pluginModule.instantiate.call(loader, metadata.pluginLoad, function (load) {
      translated = load.source;
      metadata.load = load.metadata;
      if (calledInstantiate)
        throw new Error('Instantiate must only be called once.');
      calledInstantiate = true;
    }))
    .then(function (result) {
      if (calledInstantiate)
        return translated;
      return protectedCreateNamespace(result);
    });
  })
  .then(function (source) {
    // plugin instantiate result case
    if (typeof source !== 'string')
      return source;

    if (!metadata.load.format)
      metadata.load.format = detectLegacyFormat(source);

    var registered = false;

    switch (metadata.load.format) {
      case 'esm':
      case 'register':
      case 'system':
        var err = evaluate(loader, source, metadata.load.sourceMap, key, metadata.load.integrity, metadata.load.nonce, false);
        if (err)
          throw err;
        if (!processAnonRegister())
          return emptyModule;
        return;
      break;

      case 'json':
        // warn.call(config, '"json" module format is deprecated.');
        return loader.newModule({ default: JSON.parse(source), __useDefault: true });

      case 'amd':
        var curDefine = envGlobal.define;
        envGlobal.define = loader.amdDefine;

        clearLastDefine(metadata.load.deps, metadata.load.esModule);

        var err = evaluate(loader, source, metadata.load.sourceMap, key, metadata.load.integrity, metadata.load.nonce, false);

        // if didn't register anonymously, use the last named define if only one
        registered = processAnonRegister();
        if (!registered) {
          registerLastDefine(loader);
          registered = processAnonRegister();
        }

        envGlobal.define = curDefine;

        if (err)
          throw err;
      break;

      case 'cjs':
        var metaDeps = metadata.load.deps;
        var deps = (metadata.load.deps || []).concat(metadata.load.cjsRequireDetection ? getCJSDeps(source) : []);

        for (var g in metadata.load.globals)
          if (metadata.load.globals[g])
            deps.push(metadata.load.globals[g]);

        loader.registerDynamic(deps, true, function (require, exports, module) {
          require.resolve = function (key) {
            return requireResolve.call(loader, key, module.id);
          };
          // support module.paths ish
          module.paths = [];
          module.require = require;

          // ensure meta deps execute first
          if (!metadata.load.cjsDeferDepsExecute && metaDeps)
            for (var i = 0; i < metaDeps.length; i++)
              require(metaDeps[i]);

          var pathVars = getPathVars(module.id);
          var __cjsWrapper = {
            exports: exports,
            args: [require, exports, module, pathVars.filename, pathVars.dirname, envGlobal, envGlobal]
          };

          var cjsWrapper = "(function (require, exports, module, __filename, __dirname, global, GLOBAL";

          // add metadata.globals to the wrapper arguments
          if (metadata.load.globals)
            for (var g in metadata.load.globals) {
              __cjsWrapper.args.push(require(metadata.load.globals[g]));
              cjsWrapper += ", " + g;
            }

          // disable AMD detection
          var define = envGlobal.define;
          envGlobal.define = undefined;
          envGlobal.__cjsWrapper = __cjsWrapper;

          source = cjsWrapper + ") {" + source.replace(hashBangRegEx, '') + "\n}).apply(__cjsWrapper.exports, __cjsWrapper.args);";

          var err = evaluate(loader, source, metadata.load.sourceMap, key, metadata.load.integrity, metadata.load.nonce, false);
          if (err)
            throw err;

          setMetaEsModule(metadata, exports);

          envGlobal.__cjsWrapper = undefined;
          envGlobal.define = define;
        });
        registered = processAnonRegister();
      break;

      case 'global':
        var deps = metadata.load.deps || [];
        for (var g in metadata.load.globals) {
          var gl = metadata.load.globals[g];
          if (gl)
            deps.push(gl);
        }

        loader.registerDynamic(deps, false, function (require, exports, module) {
          var globals;
          if (metadata.load.globals) {
            globals = {};
            for (var g in metadata.load.globals)
              if (metadata.load.globals[g])
                globals[g] = require(metadata.load.globals[g]);
          }

          var exportName = metadata.load.exports;

          if (exportName)
            source += '\n' + globalName + '["' + exportName + '"] = ' + exportName + ';';

          var retrieveGlobal = prepareGlobal(module.id, exportName, globals, metadata.load.encapsulateGlobal);
          var err = evaluate(loader, source, metadata.load.sourceMap, key, metadata.load.integrity, metadata.load.nonce, true);

          if (err)
            throw err;

          var output = retrieveGlobal();
          setMetaEsModule(metadata, output);
          return output;
        });
        registered = processAnonRegister();
      break;

      default:
        throw new TypeError('Unknown module format "' + metadata.load.format + '" for "' + key + '".' + (metadata.load.format === 'es6' ? ' Use "esm" instead here.' : ''));
    }

    if (!registered)
      throw new Error('Module ' + key + ' detected as ' + metadata.load.format + ' but didn\'t execute correctly.');
  });
}

var globalName = typeof self != 'undefined' ? 'self' : 'global';

// good enough ES6 module detection regex - format detections not designed to be accurate, but to handle the 99% use case
var esmRegEx = /(^\s*|[}\);\n]\s*)(import\s*(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s*from\s*['"]|\{)|export\s+\*\s+from\s+["']|export\s*(\{|default|function|class|var|const|let|async\s+function))/;

var leadingCommentAndMetaRegEx = /^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)*\s*/;
function detectRegisterFormat(source) {
  var leadingCommentAndMeta = source.match(leadingCommentAndMetaRegEx);
  return leadingCommentAndMeta && source.substr(leadingCommentAndMeta[0].length, 15) === 'System.register';
}

// AMD Module Format Detection RegEx
// define([.., .., ..], ...)
// define(varName); || define(function(require, exports) {}); || define({})
var amdRegEx = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])define\s*\(\s*("[^"]+"\s*,\s*|'[^']+'\s*,\s*)?\s*(\[(\s*(("[^"]+"|'[^']+')\s*,|\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*(\s*("[^"]+"|'[^']+')\s*,?)?(\s*(\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*\s*\]|function\s*|{|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*\))/;

/// require('...') || exports[''] = ... || exports.asd = ... || module.exports = ...
var cjsExportsRegEx = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])(exports\s*(\[['"]|\.)|module(\.exports|\['exports'\]|\["exports"\])\s*(\[['"]|[=,\.]))/;
// used to support leading #!/usr/bin/env in scripts as supported in Node
var hashBangRegEx = /^\#\!.*/;

function detectLegacyFormat (source) {
  if (source.match(amdRegEx))
    return 'amd';

  cjsExportsRegEx.lastIndex = 0;
  cjsRequireRegEx.lastIndex = 0;
  if (cjsRequireRegEx.exec(source) || cjsExportsRegEx.exec(source))
    return 'cjs';

  // global is the fallback format
  return 'global';
}

function sanitizeSourceMap (address, sourceMap) {
  var originalName = address.split('!')[0];

  // force set the filename of the original file
  if (!sourceMap.file || sourceMap.file == address)
    sourceMap.file = originalName + '!transpiled';

  // force set the sources list if only one source
  if (!sourceMap.sources || sourceMap.sources.length <= 1 && (!sourceMap.sources[0] || sourceMap.sources[0] === address))
    sourceMap.sources = [originalName];
}

function transpile (loader, source, key, metadata, processAnonRegister) {
  if (!loader.transpiler)
    throw new TypeError('Unable to dynamically transpile ES module\n   A loader plugin needs to be configured via `SystemJS.config({ transpiler: \'transpiler-module\' })`.');

  // deps support for es transpile
  if (metadata.load.deps) {
    var depsPrefix = '';
    for (var i = 0; i < metadata.load.deps.length; i++)
      depsPrefix += 'import "' + metadata.load.deps[i] + '"; ';
    source = depsPrefix + source;
  }

  // do transpilation
  return loader.import.call(loader, loader.transpiler)
  .then(function (transpiler) {
    if (transpiler.__useDefault)
      transpiler = transpiler.default;

    // translate hooks means this is a transpiler plugin instead of a raw implementation
    if (!transpiler.translate)
      throw new Error(loader.transpiler + ' is not a valid transpiler plugin.');

    // if transpiler is the same as the plugin loader, then don't run twice
    if (transpiler === metadata.pluginModule)
      return source;

    // convert the source map into an object for transpilation chaining
    if (typeof metadata.load.sourceMap === 'string')
      metadata.load.sourceMap = JSON.parse(metadata.load.sourceMap);

    metadata.pluginLoad = metadata.pluginLoad || {
      name: key,
      address: key,
      source: source,
      metadata: metadata.load
    };
    metadata.load.deps = metadata.load.deps || [];

    return Promise.resolve(transpiler.translate.call(loader, metadata.pluginLoad, metadata.traceOpts))
    .then(function (source) {
      // sanitize sourceMap if an object not a JSON string
      var sourceMap = metadata.load.sourceMap;
      if (sourceMap && typeof sourceMap === 'object')
        sanitizeSourceMap(key, sourceMap);

      if (metadata.load.format === 'esm' && detectRegisterFormat(source))
        metadata.load.format = 'register';

      return source;
    });
  }, function (err) {
    throw LoaderError__Check_error_message_for_loader_stack(err, 'Unable to load transpiler to transpile ' + key);
  });
}

// detect any meta header syntax
// only set if not already set
var metaRegEx = /^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)+/;
var metaPartRegEx = /\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\/\/[^\n]*|"[^"]+"\s*;?|'[^']+'\s*;?/g;

function setMetaProperty(target, p, value) {
  var pParts = p.split('.');
  var curPart;
  while (pParts.length > 1) {
    curPart = pParts.shift();
    target = target[curPart] = target[curPart] || {};
  }
  curPart = pParts.shift();
  if (target[curPart] === undefined)
    target[curPart] = value;
}

function readMetaSyntax (source, metadata) {
  var meta = source.match(metaRegEx);
  if (!meta)
    return;

  var metaParts = meta[0].match(metaPartRegEx);

  for (var i = 0; i < metaParts.length; i++) {
    var curPart = metaParts[i];
    var len = curPart.length;

    var firstChar = curPart.substr(0, 1);
    if (curPart.substr(len - 1, 1) == ';')
      len--;

    if (firstChar != '"' && firstChar != "'")
      continue;

    var metaString = curPart.substr(1, curPart.length - 3);
    var metaName = metaString.substr(0, metaString.indexOf(' '));

    if (metaName) {
      var metaValue = metaString.substr(metaName.length + 1, metaString.length - metaName.length - 1);

      if (metaName === 'deps')
        metaName = 'deps[]';

      if (metaName.substr(metaName.length - 2, 2) === '[]') {
        metaName = metaName.substr(0, metaName.length - 2);
        metadata.load[metaName] = metadata.load[metaName] || [];
        metadata.load[metaName].push(metaValue);
      }
      // "use strict" is not meta
      else if (metaName !== 'use') {
        setMetaProperty(metadata.load, metaName, metaValue);
      }
    }
    else {
      metadata.load[metaString] = true;
    }
  }
}

var scriptSrc;

// Promise detection and error message
if (typeof Promise === 'undefined')
  throw new Error('SystemJS needs a Promise polyfill.');

if (typeof document !== 'undefined') {
  var scripts = document.getElementsByTagName('script');
  var curScript = scripts[scripts.length - 1];
  if (document.currentScript && (curScript.defer || curScript.async))
    curScript = document.currentScript;

  scriptSrc = curScript && curScript.src;
}
// worker
else if (typeof importScripts !== 'undefined') {
  try {
    throw new Error('_');
  }
  catch (e) {
    e.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/, function(m, url) {
      scriptSrc = url;
    });
  }
}
// node
else if (typeof __filename !== 'undefined') {
  scriptSrc = __filename;
}

function SystemJSLoader$1 () {
  RegisterLoader$1.call(this);

  // NB deprecate
  this._loader = {};

  // internal metadata store
  this[METADATA] = {};

  // internal configuration
  this[CONFIG] = {
    baseURL: baseURI,
    paths: {},

    packageConfigPaths: [],
    packageConfigKeys: [],
    map: {},
    packages: {},
    depCache: {},
    meta: {},
    bundles: {},

    production: false,

    transpiler: undefined,
    loadedBundles: {},

    // global behaviour flags
    warnings: false,
    pluginFirst: false,

    // enable wasm loading and detection when supported
    wasm: false
  };

  // make the location of the system.js script accessible (if any)
  this.scriptSrc = scriptSrc;

  this._nodeRequire = nodeRequire;

  // support the empty module, as a concept
  this.registry.set('@empty', emptyModule);

  setProduction.call(this, false, false);

  // add module format helpers
  formatHelpers(this);
}

var envModule;
function setProduction (isProduction, isBuilder) {
  this[CONFIG].production = isProduction;
  this.registry.set('@system-env', envModule = this.newModule({
    browser: isBrowser,
    node: !!this._nodeRequire,
    production: !isBuilder && isProduction,
    dev: isBuilder || !isProduction,
    build: isBuilder,
    'default': true
  }));
}

SystemJSLoader$1.prototype = Object.create(RegisterLoader$1.prototype);

SystemJSLoader$1.prototype.constructor = SystemJSLoader$1;

// NB deprecate normalize
SystemJSLoader$1.prototype[SystemJSLoader$1.resolve = RegisterLoader$1.resolve] = SystemJSLoader$1.prototype.normalize = normalize;

SystemJSLoader$1.prototype.load = function (key, parentKey) {
  warn.call(this[CONFIG], 'System.load is deprecated.');
  return this.import(key, parentKey);
};

// NB deprecate decanonicalize, normalizeSync
SystemJSLoader$1.prototype.decanonicalize = SystemJSLoader$1.prototype.normalizeSync = SystemJSLoader$1.prototype.resolveSync = normalizeSync;

SystemJSLoader$1.prototype[SystemJSLoader$1.instantiate = RegisterLoader$1.instantiate] = instantiate$1;

SystemJSLoader$1.prototype.config = setConfig;
SystemJSLoader$1.prototype.getConfig = getConfig;

SystemJSLoader$1.prototype.global = envGlobal;

SystemJSLoader$1.prototype.import = function () {
  return RegisterLoader$1.prototype.import.apply(this, arguments)
  .then(function (m) {
    return m.__useDefault ? m.default: m;
  });
};

var configNames = ['baseURL', 'map', 'paths', 'packages', 'packageConfigPaths', 'depCache', 'meta', 'bundles', 'transpiler', 'warnings', 'pluginFirst', 'production', 'wasm'];

var hasProxy = typeof Proxy !== 'undefined';
for (var i = 0; i < configNames.length; i++) (function (configName) {
  Object.defineProperty(SystemJSLoader$1.prototype, configName, {
    get: function () {
      var cfg = getConfigItem(this[CONFIG], configName);

      if (hasProxy && typeof cfg === 'object')
        cfg = new Proxy(cfg, {
          set: function (target, option) {
            throw new Error('Cannot set SystemJS.' + configName + '["' + option + '"] directly. Use SystemJS.config({ ' + configName + ': { "' + option + '": ... } }) rather.');
          }
        });

      //if (typeof cfg === 'object')
      //  warn.call(this[CONFIG], 'Referencing `SystemJS.' + configName + '` is deprecated. Use the config getter `SystemJS.getConfig(\'' + configName + '\')`');
      return cfg;
    },
    set: function (name) {
      throw new Error('Setting `SystemJS.' + configName + '` directly is no longer supported. Use `SystemJS.config({ ' + configName + ': ... })`.');
    }
  });
})(configNames[i]);

/*
 * Backwards-compatible registry API, to be deprecated
 */
function registryWarn(loader, method) {
  warn.call(loader[CONFIG], 'SystemJS.' + method + ' is deprecated for SystemJS.registry.' + method);
}
SystemJSLoader$1.prototype.delete = function (key) {
  registryWarn(this, 'delete');
  this.registry.delete(key);
};
SystemJSLoader$1.prototype.get = function (key) {
  registryWarn(this, 'get');
  return this.registry.get(key);
};
SystemJSLoader$1.prototype.has = function (key) {
  registryWarn(this, 'has');
  return this.registry.has(key);
};
SystemJSLoader$1.prototype.set = function (key, module) {
  registryWarn(this, 'set');
  return this.registry.set(key, module);
};
SystemJSLoader$1.prototype.newModule = function (bindings) {
  return new ModuleNamespace(bindings);
};
SystemJSLoader$1.prototype.isModule = isModule;

// ensure System.register and System.registerDynamic decanonicalize
SystemJSLoader$1.prototype.register = function (key, deps, declare) {
  if (typeof key === 'string')
    key = decanonicalize.call(this, this[CONFIG], key);
  return RegisterLoader$1.prototype.register.call(this, key, deps, declare);
};

SystemJSLoader$1.prototype.registerDynamic = function (key, deps, executingRequire, execute) {
  if (typeof key === 'string')
    key = decanonicalize.call(this, this[CONFIG], key);
  return RegisterLoader$1.prototype.registerDynamic.call(this, key, deps, executingRequire, execute);
};

SystemJSLoader$1.prototype.version = "0.20.12 Dev";

var System = new SystemJSLoader$1();

// only set the global System on the global in browsers
if (isBrowser || isWorker)
  envGlobal.SystemJS = envGlobal.System = System;

if (typeof module !== 'undefined' && module.exports)
  module.exports = System;

}());
//# sourceMappingURL=system.src.js.map
