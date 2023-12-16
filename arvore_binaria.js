function makeBinaryTreeFromArray(array) {
    if (array.length == 0) {
        return null;
    }
    let middle = Math.floor(array.length / 2);
    let node = { key: array[middle] };
    node.left = makeBinaryTreeFromArray(array.slice(0, middle));
    node.right = makeBinaryTreeFromArray(array.slice(middle + 1));
    return node;
}

function makeArrayFromBinaryTree(tree) {
    if (tree == null) {
        return [];
    }
    return makeArrayFromBinaryTree(tree.left).concat(tree.key).concat(makeArrayFromBinaryTree(tree.right));
}

const binaryTree = makeBinaryTreeFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

console.log(JSON.stringify(binaryTree, null, '\t'));
console.log(makeArrayFromBinaryTree(binaryTree));