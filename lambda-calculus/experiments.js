Number.prototype.log = function (text = '') { console.log(`${text} : ${this}`); }
Function.prototype.log = function (text = '') { console.log(`${text} : ${this.toString()}`); }

const identity = a => a

identity(3).log('identity(3)')

identity(identity).log('identity(identity)')

const SELF = f => f(f)

SELF(identity).log('SELF(identity)')

const first = a => _ => a

first(7)(14).log('first(7)(14)')

const last = _ => b => b

last(7)(14).log('last(7)(14)')

const swap = f => a => b => f(b)(a)

swap(first)(7)(14).log('swap(first)(7)(14)')
swap(last)(7)(14).log('swap(last)(7)(14)')

const last2 = a => b => swap(first)(a)(b)

last2(7)(14).log('last2(7)(14)')

// boolean (true/false) ======================

const True = first
True.toString = () => 'true (first)'
const False = last
False.toString = () => 'false (last)'

True.log('True')
False.log('False')

// NOT Operator
const NOT = a => a(False)(True)

NOT(True).log('NOT(True)')
NOT(False).log('NOT(False)')

// AND Operator
const AND = a => b => a(b)(a)

AND(True)(True).log('AND(True)(True)')
AND(True)(False).log('AND(True)(False)')
AND(False)(True).log('AND(False)(True)')
AND(False)(False).log('AND(False)(False)')

// OR Operator
const OR = a => b => a(a)(b)

OR(True)(True).log('OR(True)(True)')
OR(True)(False).log('OR(True)(False)')
OR(False)(True).log('OR(False)(True)')
OR(False)(False).log('OR(False)(False)')

// Equal Operator
const EQ = a => b => a(b)(NOT(b))

EQ(True)(True).log('EQ(True)(True)')
EQ(True)(False).log('EQ(True)(False)')
EQ(False)(True).log('EQ(False)(True)')
EQ(False)(False).log('EQ(False)(False)')

// XOR Operator
const XOR = a => b => NOT(EQ(a)(b))

XOR(True)(True).log('XOR(True)(True)')
XOR(True)(False).log('XOR(True)(False)')
XOR(False)(True).log('XOR(False)(True)')
XOR(False)(False).log('XOR(False)(False)')