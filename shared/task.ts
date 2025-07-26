import { Timestamp } from 'firebase/firestore';
import { FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase/firestore';

export class Task {
  constructor(
    public id: string,
    public boardId: string,
    public title: string,
    public status: 'todo' | 'doing' | 'done' = 'todo',
    public created: Date = new Date()
  ) {}

  markDone() {
    this.status = 'done';
  }

  static fromFirestore(id: string, data: any): Task {
    return new Task(
      id,
      data.boardId,
      data.title,
      data.status,
      (data.created as Timestamp).toDate()
    );
  }

  toFirestore() {
    return {
      boardId: this.boardId,
      title: this.title,
      status: this.status,
      created: Timestamp.fromDate(this.created),
    };
  }
}

export const taskConverter: FirestoreDataConverter<Task> = {
  toFirestore: (task: Task) => task.toFirestore(),
  fromFirestore: (snap: QueryDocumentSnapshot): Task =>
    Task.fromFirestore(snap.id, snap.data()),
};
