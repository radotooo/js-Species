import EventEmitter from 'eventemitter3';
import Species from './Species';

const EVENTS = {
  SPECIES_CREATED: 'species_created',
  MAX_SPECIES_REACHED: 'max_species_reached',
};

export default class StarWarsUniverse extends EventEmitter {
  constructor() {
    super();

    this.species = [];
    this._maxSpecies = 10;
  }

  static get events() {
    return EVENTS;
  }

  _onSpeciesCreated(specie) {
    this.species.push(specie);

    this.emit(StarWarsUniverse.events.SPECIES_CREATED, {
      speciesCount: this.species.length,
    });
    if (this.species.length >= this._maxSpecies) {
      this.emit(StarWarsUniverse.events.MAX_SPECIES_REACHED);
    } else {
      this.createSpecies();
    }
  }

  get speciesCount() {
    return this.species.length();
  }

  createSpecies() {
    let specie = new Species();

    specie.on('species_created', () => {
      this._onSpeciesCreated(specie);
    });

    specie.init(`https://swapi.booost.bg/api/${this.species.length + 1}/`);
  }
}
