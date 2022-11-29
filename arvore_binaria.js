function makeBinareTreeFromArray(array) {
    if (array.length == 0) {
        return null;
    }
    var middle = Math.floor(array.length / 2);
    var node = { key: array[middle] };
    node.left = makeBinareTreeFromArray(array.slice(0, middle));
    node.right = makeBinareTreeFromArray(array.slice(middle + 1));
    return node;
}

function makeArrayFromBinaryTree(tree) {
    if (tree == null) {
        return [];
    }
    return makeArrayFromBinaryTree(tree.left).concat(tree.key).concat(makeArrayFromBinaryTree(tree.right));
}

const binaryTree = makeBinareTreeFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

console.log(JSON.stringify(binaryTree, null, 2));
console.log(makeArrayFromBinaryTree(binaryTree));