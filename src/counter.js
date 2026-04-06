export function setupCounter(element) {
  let counter = 0;
  const updateDisplay = () => {
    element.textContent = `Count is ${counter}`;
  };
  const handleClick = () => {
    counter += 1;
    updateDisplay();
  };
  element.addEventListener('click', handleClick);
  updateDisplay();
}
