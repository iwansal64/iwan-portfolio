export function get_random_from_array<T>(array: Iterable<T>): T {
  const convertedArray = Array.from(array);
  return convertedArray[Math.floor(Math.random() * convertedArray.length)];
}