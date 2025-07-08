export function get_random_from_array<T>(array: Iterable<T>): T {
  const convertedArray = Array.from(array);
  return convertedArray[Math.floor(Math.random() * convertedArray.length)];
}

export function calculate_duration(first_date: Date, second_date: Date) {
  let weeks = Math.floor(Math.abs(second_date.valueOf() - first_date.valueOf()) / 1000 / 60 / 60 / 24 / 7);
  let months = 0;
  let years = 0;
  
  while (weeks > 4) {
    weeks -= 4;
    months += 1;
  }

  while (months > 12) {
    months -= 12;
    years += 1;
  }

  return {
    weeks: weeks,
    months: months,
    years: years
  };
}