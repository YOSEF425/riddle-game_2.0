export class Player {
  constructor(name,password,role) {
    this.name = name;
    this.createdAt = new Date();
    this.bestTiming = null;
    this.password = password;
    this.role = role;
  }
}
