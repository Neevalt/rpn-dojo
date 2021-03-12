class Tree {
  root;
  left;
  right;

  constructor(root, left, right) {
   this.root = root;
   this.left = left;
   this.right = right;
  }
}

function createTree(root, remaining) {
  const baseTree = new Tree(root);

  let right = remaining.shift();
  if (isNaN(right)) {
    right = createTree(right, remaining);
  }
  baseTree.right = right;

  let left = remaining.shift();
  if (isNaN(left)) {
    left = createTree(left, remaining)
  }
  baseTree.left = left;

  return baseTree;
}

function readTree(tree) {
  let operator = tree.root;
  if (!tree.root) {
    return Number(tree);
  }
  switch (operator) {
    case '/':
      return readTree(tree.left) / readTree(tree.right);
    case '+':
      return readTree(tree.left) + readTree(tree.right);
    case '-':
      return readTree(tree.left) - readTree(tree.right);
    case '*':
      return readTree(tree.left) * readTree(tree.right);
  }

  return readTree(tree.left) + readTree(tree.right);
}

function rpn(str) {
  const params = str.split(' ').reverse();
  const tree = createTree(params[0], params.slice(1));

  return readTree(tree);
}

const str = "3 5 8 * 7 + *";
const str2 = "4 2 + 3 -";
const str3 = "2 5 5 4 3 + + * -";
console.log(rpn(str));
console.log(rpn(str2));
console.log(rpn(str3));
