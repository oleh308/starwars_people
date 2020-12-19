export const people: Person[] = [
  {
    birth_year: 'year',
    created: 'created_Data',
    edited: 'edit_date',
    eye_color: 'blue',
    films: [],
    gender: 'female',
    hair_color: 'brown',
    height: '160',
    homeworld: 'homeworld_id',
    mass: '60kg',
    name: 'Lisa',
    skin_color: 'white',
    species: [],
    starships: [],
    url: [],
    vehicles: []
  },
  {
    birth_year: 'year',
    created: 'created_Data',
    edited: 'edit_date',
    eye_color: 'blue',
    films: [],
    gender: 'female',
    hair_color: 'brown',
    height: '175',
    homeworld: 'homeworld_id2',
    mass: '80kg',
    name: 'Bob',
    skin_color: 'white',
    species: [],
    starships: [],
    url: [],
    vehicles: []
  },
]

export const planetsMap: Map<string, Planet> = new Map([
  ['homeworld_id', {
    climate: 'dry',
    created: 'created_date',
    diameter: '100',
    edited: 'edited_date',
    films: [],
    gravity: 'strong',
    name: 'Earth',
    orbital_period: 'random',
    population: '7000000000',
    residents: [],
    rotation_period: 'period',
    surface_water: 'sea',
    terrain: 'wild',
    url: 'homeworld_id'
  }],
  ['homeworld_id2', {
    climate: 'dry',
    created: 'created_date',
    diameter: '200',
    edited: 'edited_date',
    films: [],
    gravity: 'strong',
    name: 'Mars',
    orbital_period: 'random',
    population: '0',
    residents: [],
    rotation_period: 'period',
    surface_water: 'no',
    terrain: 'very wild',
    url: 'homeworld_id2'
  }]
]);
