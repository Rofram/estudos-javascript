function binaryTreeNode(value) {
  let node = { value };
  node[Symbol.iterator] = function* depthFirst() {
    yield node.value;
    if (node.leftChild) yield* node.leftChild;
    if (node.rightChild) yield* node.rightChild;
  };
  return node;
}

const tree = () => {
  const root = binaryTreeNode("root");
  root.leftChild = binaryTreeNode("branch left");
  root.rightChild = binaryTreeNode("branch right");
  root.leftChild.leftChild = binaryTreeNode("leaf L1");
  root.leftChild.rightChild = binaryTreeNode("leaf L2");
  root.rightChild.leftChild = binaryTreeNode("leaf R1");
  return root;
};

console.log("tree", [...tree()]);
