function cyclotron(particle, size) {
  let matrix = [];
  if(particle === 'e') {
    for (let i = 0; i < size; i++) {
      matrix[i] = [];
      for (let j = 0; j < size; j++) {
        if(i === 0 || j === size - 1) {
          matrix[i][j] = 'e';
        }else {
          matrix[i][j] = 1;
        }
      }
    }

    return matrix.forEach(item => console.log(item))
  }

  if(particle === 'p') {
    for (let i = 0; i < size; i++) {
      matrix[i] = [];
      for (let j = 0; j < size; j++) {
        if(i === 0 || j === 0 || j === size - 1 || i === size - 1) {
          matrix[i][j] = 'p';
        }        
        else {
          matrix[i][j] = 1;
        }
      }
    }

    matrix[size - 1][size - 1] = 1;
    matrix[size - 2][size - 2] = 'p';
    return matrix.forEach(item => console.log(item))
  }

  if(particle === 'n') {
    for (let i = 0; i < size; i++) {
      matrix[i] = [];
      for (let j = 0; j < size; j++) {
        if(i === 0) {
          matrix[i][j] = 'n';
        }else {
          matrix[i][j] = 1;
        }
      }
    }

    return matrix.forEach(item => console.log(item))
  }

  for (let i = 0; i < size; i++) {
    matrix[i] = [];
    for (let j = 0; j < size; j++) {
      matrix[i][j] = 1;
    }
  }
  return matrix.forEach(item => console.log(item))

}

// test cases
// cyclotron('p', 4); // proton
// cyclotron('e', 4); // electron
// cyclotron('n', 4); // neutron
// cyclotron('', 4); // without particle