//y
//  
//7  |  |  |  |  |  |  |  |  |
//6  |  |  |  |  |  |  |  |e |  
//5  |  |  |2 |  |3 |  |  |  |
//4  |  |1 |  |  |  |4 |  |  |  
//3  |  |  |  |s |  |  |  |  |  
//2  |  |8 |  |  |  |5 |  |  |  
//1  |  |  |7 |  |6 |  |  |  |  
//0  |  |  |  |  |  |  |  |  |  
//    0  1  2  3  4  5  6  7  8  x

function checkQuarter(start, end, step) {
  //Return true if the step is inside the board (a.k.a 0 <= x,y < 8)
  //AND belong to the board quarter which contains start & end
  let condition = step[0] >= 0 && step[0] < 8 && step[1] >= 0 && step[1] < 8;
  
  if(condition && end[0] >= start[0] && end[1] >= start[1]
    && step[0] >= start[0] && step[1] >= start[1]) {
    return true;
  }
  if(condition && end[0] >= start[0] && end[1] <= start[1]
    && step[0] >= start[0] && step[1] <= start[1]) {
    return true;
  }
  if(condition && end[0] <= start[0] && end[1] <= start[1]
    && step[0] <= start[0] && step[1] <= start[1]) {
    return true;
  }
  if(condition && end[0] <= start[0] && end[1] >= start[1]
    && step[0] <= start[0] && step[1] >= start[1]) {
    return true;
  }
  return false;
}

class Node {
  constructor(value) {
    this.value = value;
    this.parent = null;
  }
}

function getPath(node) {
  //Function that takes a node as argument, travel back to root and return the path
  let path = [];
  let pointer = node;
  while(pointer !== null) {
    path.push(pointer.value);
    pointer = pointer.parent;
  }
  return path.reverse();
}

function knightMoves(start, end) {
  let x = end[0]; let y = end[1];
  
  //Possible steps of a knight
  let steps = [[-2,1], [-1,2], [1,2], [2,1], [2,-1], [1,-2], [-1,-2], [-2,-1]];
  //Visisted steps
  let seen = [];
  
  let root = new Node(start);
  
  //We take the leftmost node out, generate its childrens, and push these childrens back to the queue
  let queue = [root]; 
  
  while(queue.length > 0) {
    let node = queue.shift();
    let coords = node.value;
    
    //If the node we take from q is the end point, return the path
    if(coords[0] === x && coords[1] === y) {
      return getPath(node);
    }
    
    steps.forEach((s) => {
      nxtc = [coords[0] + s[0], coords[1] + s[1]]; //Get the new position
      
      //If the new position is legit (checkQuarter), make a new Node and asign its parent, then push to q
      if(checkQuarter(start, [x,y], nxtc)) {
        if(!seen.includes(nxtc)) {
          let newNode = new Node(nxtc);
          newNode.parent = node;
          queue.push(newNode);
          seen.push(nxtc);
        }
      }
    })
  }
}

console.log(knightMoves([0,0], [3,3])); //Output: [ [ 0, 0 ], [ 1, 2 ], [ 3, 3 ] ]