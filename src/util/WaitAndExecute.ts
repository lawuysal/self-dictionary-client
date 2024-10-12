export function WaitAndExecute(duration: number, fn: () => void) {
  const wait = new Promise((resolve) => setTimeout(resolve, duration));
  return wait.then(() => fn());
}
