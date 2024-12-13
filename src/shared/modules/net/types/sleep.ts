export function sleep(t: number): Promise<true> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, t);
  });
}
