// TODO: allow '-' to trim up until newline. Use [^\S\n\r] instead of \s
// TODO: only include trimLeft polyfill if not in ES6

/* TYPES */

import { SqrlConfig } from './config'

interface SomeObj {
  [key: string]: any
}

/* END TYPES */

export var promiseImpl = new Function('return this;')().Promise

function trimWS (str: string, env: SqrlConfig, wsLeft: string, wsRight?: string): string {
  var leftTrim
  var rightTrim

  if (typeof env.autoTrim === 'string') {
    leftTrim = rightTrim = env.autoTrim
  } else if (Array.isArray(env.autoTrim)) {
    // kinda confusing
    // but _}} will trim the left side of the following string
    leftTrim = env.autoTrim[1]
    rightTrim = env.autoTrim[0]
  }

  if (wsLeft) {
    leftTrim = wsLeft
  }

  if (wsRight) {
    rightTrim = wsRight
  }

  if (
    (leftTrim === 'slurp' && rightTrim === 'slurp') ||
    (leftTrim === true && rightTrim === true)
  ) {
    return str.trim()
  }

  if (leftTrim === '_' || leftTrim === 'slurp' || leftTrim === true) {
    // console.log('trimming left' + leftTrim)
    // full slurp
    if (String.prototype.trimLeft) {
      str = str.trimLeft()
    } else {
      str = str.replace(/^[\s\uFEFF\xA0]+/, '')
    }
  } else if (leftTrim === '-' || leftTrim === 'nl') {
    // console.log('trimming left nl' + leftTrim)
    // nl trim
    str = str.replace(/^(?:\n|\r|\r\n)/, '')
  }

  if (rightTrim === '_' || rightTrim === 'slurp' || rightTrim === true) {
    // console.log('trimming right' + rightTrim)
    // full slurp
    if (String.prototype.trimRight) {
      str = str.trimRight()
    } else {
      str = str.replace(/[\s\uFEFF\xA0]+$/, '')
    }
  } else if (rightTrim === '-' || rightTrim === 'nl') {
    // console.log('trimming right nl' + rightTrim)
    // nl trim
    str = str.replace(/(?:\n|\r|\r\n)$/, '') // TODO: make sure this gets \r\n
  }

  return str
}

// Below is adapted from EJS
/**
 * Naive copy of properties from one object to another.
 * Does not recurse into non-scalar properties
 * Does not check to see if the property has a value before copying
 *
 * @param  {Object} to   Destination object
 * @param  {Object} from Source object
 * @return {Object}      Destination object
 * @static
 * @private
 */

function shallowCopy<res> (to: SomeObj, from: Partial<res>): res {
  for (var p in from) {
    to[p] = from[p]
  }
  return to as res
}

export { trimWS, shallowCopy }
