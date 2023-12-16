function textWithSizeBetween(min) {
  return (max) => {
    return (error) => {
      return (text) => {
        // lazy evaluation
        const size = (text || '').trim().length;
        if (size < min || size > max) {
          throw error
        }
      }
    }
  }
}

function applyValidation(fn) {
  return (value) => {
    try {
      return fn(value);
    } catch (err) {
      return { error: err };
    }
  }
}

const forceStandardSize = textWithSizeBetween(4)(255);
const forceValidProductName = forceStandardSize("Product name invalid!");
const validateProductName = applyValidation(forceValidProductName);

const p1 = { name: 'A', price: 14.99, desc: 0.25 }
const p2 = { name: 'AB', price: 14.99, desc: 0.25 }

console.log(validateProductName(p1.name));
console.log(validateProductName(p2.name));