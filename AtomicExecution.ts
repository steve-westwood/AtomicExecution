let operationValue: number = 0;

function rollbackOperation(initialValue: number) {
  operationValue = initialValue;
}

function RandomNumber(max: number) {
  return Math.floor(Math.random() * max) + 1;
}

function start() {
  const startValue: number = 1;
  operationValue = startValue;
  console.log(`Value set to ${operationValue.toString()}.`);
  try {
    operationParent();
  } catch (e) {
    rollbackOperation(startValue);
    console.log(e.message);
    console.log(`Value reset to ${operationValue.toString()}!`);
  }
}

function operationParent() {
  const randomNumber = RandomNumber(10);
  operationValue = +randomNumber;
  if (operationValue > 5) {
    throw new Error(
      `${operationValue.toString()} more than 5, revert operation!`
    );
  } else {
    console.log(`${operationValue.toString()} is less than 6.`);
    operationChild();
  }
}

function operationChild() {
  const divisibleBy = RandomNumber(3);
  if (operationValue % divisibleBy === 0) {
    console.log(
      `${operationValue.toString()} is divisible by ${divisibleBy.toString()}.`
    );
    console.log(`${operationValue.toString()} passed all conditions!`);
  } else {
    throw new Error(
      `${operationValue.toString()} is not divisible by ${divisibleBy.toString()}, revert operation!`
    );
  }
}

start();
