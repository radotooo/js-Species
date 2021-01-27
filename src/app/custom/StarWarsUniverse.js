import EventEmitter from 'eventemitter3';
import Species from './Species';

export default class StarWarsUniverse extends EventEmitter {
  constructor(species, _maxSpecies) {
    super();
    this.species = [];
    this._maxSpecies = _maxSpecies;
  }

  static get events() {
    return {
      MAX_SPECIES_REACHED: 'max_species_reached',
      SPECIES_CREATED: 'species_created',
    };
  }
  _onSpeciesCreated(specie) {
    this.species.push(specie);
    this.emit(Application.events.SPECIES_CREATED, this.speciesCount);
  }

  get speciesCount() {
    return this.species.length();
  }

  createSpecies() {
    let specie = new Species();

    this.on('species_created', this._onSpeciesCreated());

    specie.init(`https://swapi.booost.bg/api/${this.species.length + 1}`);
  }
}
