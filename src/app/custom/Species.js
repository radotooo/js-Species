import EventEmitter from 'eventemitter3';

export default class Species extends EventEmitter {
  constructor() {
    this.name = null;
    this.clasification = null;
  }
  static get events() {
    return {
      SPECIES_CREATED: 'species_created',
    };
  }
  async init(url) {
    const response = await fetch(url);
    const [name, clasification] = await response.json();
    this.name = name;
    this.clasification = clasification;
    this.emit(Species.events.SPECIES_CREATED);
  }
}
