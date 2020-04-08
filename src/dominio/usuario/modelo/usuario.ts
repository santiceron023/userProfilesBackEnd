export class Usuario {
  private _name: string;
  private _description: string;

  constructor(nombre: string, description: string) {
    this._name = nombre;
    this._description = description;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }
}
