class MyClass {
  get prop1() { return "asdasdasd"; }
  get prop2() { return "value2"; }

  toObjectAllParents() {
    const obj = {};
    let parent = Reflect.getPrototypeOf(this);
    while (parent) {
      const descriptors = Object.getOwnPropertyDescriptors(parent);
      const getterKeys = Object.keys(descriptors).filter(
        (key) => typeof descriptors[key].get === 'function',
      );
      getterKeys.forEach((key) => (obj[key] = this[key]));
      parent = Reflect.getPrototypeOf(parent);
    }
    Reflect.setPrototypeOf(obj, Object.prototype);
    return obj;
  }
}

class Qualquer extends MyClass {
  #atributoPrivado = 'aahsjdhaskdhk'
  get prop3() { return "hasuhsaus"; }
  get prop4() { return "qiweyuiqwryiq"; }
}

class Coisa extends Qualquer {
  get prop5() { return 'test' }
}

let myInstance = new Coisa();
let descriptors = myInstance.toObjectAllParents()
console.log(descriptors);

// class BaseEntity {
//   constructor() { }

//   toPlain() {
//       console.log(Object.getOwnPropertyDescriptors(this))
//   }
// }

// // interface UserProps {
// //   id: string
// //   firstName: string
// //   lastName: string
// // }

// class User extends BaseEntity {
//   id;
//   firstName;
//   lastName;

//   constructor(props) {
//       super()
//       Object.assign(this, props)
//   }

//   get fullName() {
//       return this.firstName + " " + this.lastName;
//   }

//   set fullName(str) {
//       this.firstName = str
//   }
// }

// const user = new User({ id: '1', firstName: "Luciano", lastName: "Lula da Silva" })
// console.log(user.toPlain())