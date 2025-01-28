function removeDuplicates(arr: number[]): number[] {
  console.log(Array.from(new Set(arr)));
  return Array.from(new Set(arr));
}

removeDuplicates([1, 2, 3, 3, 4, 5, 5, 6]); // [1, 2, 3, 4, 5, 6]
