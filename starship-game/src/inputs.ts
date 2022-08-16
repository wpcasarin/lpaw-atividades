export const keys = new Set() as Set<string>;

export const handleKeypress = () => {
  window.addEventListener('keydown', (e) => {
    keys.add(e.key);
  });
  window.addEventListener('keyup', (e) => {
    keys.delete(e.key);
  });
};
