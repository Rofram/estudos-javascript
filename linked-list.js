class LinkedList {
  #value;
  /** @type {LinkedList} */
  #next = null;
  /** @type {LinkedList} */
  #prev = null;

  constructor(value, prev) {
    this.value = value;
    this.prev = prev;
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    this.#value = value;
  }

  get next() {
    return this.#next;
  }

  set next(node) {
    if (node instanceof LinkedList) {
      this.#next = node;
    } else {
      this.#next = null;
    }
  }

  set prev(node) {
    if (node instanceof LinkedList) {
      this.#prev = node;
    } else {
      this.#prev = null;
    }
  }

  get prev() {
    return this.#prev;
  }

  add(value, prev) {
    if (this.#next === null) {
      this.next = new LinkedList(value, prev);
    } else {
      this.next.add(value, this);
    }
  }

  remove(pos, index = 0) {
    if (pos === 0) {
    }
    if (pos === index) {
    } else if (this.next !== null) {
    }
  }

  [Symbol.iterator] = function* iterator() {
    let node = this;
    while (node) {
      yield node;
      node = node.next;
    }
  };
}
