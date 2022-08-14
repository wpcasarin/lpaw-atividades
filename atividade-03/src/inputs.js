export const keys = new Set();

export const handleKeypress = () => {
  window.addEventListener('keydown', (e) => {
    keys.add(e.key);
  });
  window.addEventListener('keyup', (e) => {
    keys.delete(e.key);
  });
};
