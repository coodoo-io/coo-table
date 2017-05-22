export class Wine {
  private id: number;
  private rank: number;
  private producer: string;
  private name: string;
  private description: string;
  private vintage: number;
  private score: number;
  private price: string;

  constructor(
      $id: number, $rank: number, $producer: string, $name: string, $description: string, $vintage: number,
      $score: number, $price: string) {
    this.id = $id;
    this.rank = $rank;
    this.producer = $producer;
    this.name = $name;
    this.description = $description;
    this.vintage = $vintage;
    this.score = $score;
    this.price = $price;
  }
}
