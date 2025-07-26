import { FirestoreDataConverter, QueryDocumentSnapshot, Timestamp } from "firebase/firestore";

export class Board {
  constructor(
    public id: string,
    public title: string,
    public ownerUid: string,
    public created: Date,
  ) {}

  static create(title: string, ownerUid: string): Board {
    return new Board(
      crypto.randomUUID(),
      title,
      ownerUid,
      new Date(),
    );
  }

  static fromFirestore(id: string, data: any): Board {
    return new Board(
      id,
      data.title,
      data.ownerUid,
      (data.created as Timestamp).toDate()
    );
  }

  toFirestore() {
    return {
      title: this.title,
      ownerUid: this.ownerUid,
      created: Timestamp.fromDate(this.created),
    };
  }
}

export const boardConverter: FirestoreDataConverter<Board> = {
  toFirestore: (board: Board) => board.toFirestore(),
  fromFirestore: (snap: QueryDocumentSnapshot): Board =>
    Board.fromFirestore(snap.id, snap.data()),
};
