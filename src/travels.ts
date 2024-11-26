export interface TravelDataWithoutId {
  destination: string;
  description: string;
  imgUrl: string;
  price: number;
  discount: number;
}

export interface TravelData extends TravelDataWithoutId {
  id: number;
}

export class Travels {
  #travels: TravelData[] = [];
  #nextId = 1;

  /**
   * Creates a new Travels instance with 3 sample travel destinations.
   */
  constructor() {
    this.add({
      destination: "Japan",
      description:
        "Go hiking on Mt. Fuji, visit the Tokyo Imperial Palace, or just relax at a traditional, family owned hot spring resort.",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/6/63/Views_of_Mount_Fuji_from_%C5%8Cwakudani_20211202.jpg",
      price: 199_999,
      discount: 10,
    });
    this.add({
      destination: "Egypt",
      description: "Where the pharaohs and the oldest gods lived.",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/c/c2/01_khafre_north.jpg",
      price: 155_000,
      discount: 0,
    });
    this.add({
      description: "Easter Island",
      destination: "There are a few giant head statues I guess...",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/Rano_Raraku_quarry.jpg",
      price: 250_000,
      discount: 50,
    });
  }

  /**
   * Adds a new travel destination.
   * The ID is calculated automatically.
   *
   * @param data The details of the new travel destination.
   * @returns The details, including the generated ID.
   */
  add(data: TravelDataWithoutId) {
    const newData: TravelData = {
      ...data,
      id: this.#nextId,
    };
    this.#travels.push(newData);
    this.#nextId++;
    return newData;
  }

  /**
   * Returns the details of all travel destinations.
   *
   * @returns All travel destinations.
   */
  getAll() {
    return this.#travels;
  }

  /**
   * Returns the details of the travel destination.
   *
   * @param id The ID of the travel destination.
   * @returns The details of the destination, or undefined if the ID is not valid.
   */
  getById(id: number) {
    return this.#travels.find((t) => t.id === id);
  }

  /**
   * Replaces the travel destination with a new one.
   *
   * @param id The ID of the travel destination.
   * @param data The new data (excluding the ID).
   * @returns The details of the destination.
   * @throws {Error} There's no travel destination with the ID.
   */
  replace(id: number, data: TravelDataWithoutId) {
    const idx = this.#travels.findIndex((t) => t.id === id);
    if (idx === -1) {
      throw new Error("Invalid ID!");
    }
    const newData: TravelData = {
      ...data,
      id,
    };
    this.#travels[idx] = newData;
    return newData;
  }

  /**
   * Removes the specified travel destination.
   *
   * @param id The ID of the travel destination.
   * @returns true, if the ID was valid, otherwise false.
   */
  remove(id: number) {
    const idx = this.#travels.findIndex((t) => t.id === id);
    if (idx !== -1) {
      this.#travels.splice(idx, 1);
      return true;
    } else {
      return false;
    }
  }
}
