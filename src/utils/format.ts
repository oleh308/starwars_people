function formatStringNumber(population: string): string {
  if (isNaN(Number(population))) {
    return population;
  } else {
    return Number(population).toLocaleString();
  }
}

export { formatStringNumber };
