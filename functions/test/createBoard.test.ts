/* eslint-env jest */
/* eslint-disable import/first */

// Set emulator env BEFORE any imports that touch firebase-admin
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
process.env.GOOGLE_CLOUD_PROJECT = 'demo-project';

import * as admin from 'firebase-admin';
import functionsTestInit from 'firebase-functions-test';
import { createBoard } from '../src/index';

const testEnv = functionsTestInit({ projectId: 'demo-project' }); // no key needed when using emulator

// V2 onCall wrapper: single-argument shape { data, auth }
type V2Call = (req: { data: { title: string }; auth?: { uid: string; token?: any } }) => Promise<{ id: string }>;
const callCreateBoard = testEnv.wrap(createBoard) as unknown as V2Call;

describe('createBoard', () => {
  afterAll(async () => {
    await testEnv.cleanup();
  });

  it('rejects unauthenticated users', async () => {
    await expect(callCreateBoard({ data: { title: 'X' } }))
      .rejects.toHaveProperty('code', 'unauthenticated');
  });

  it('creates a board for an authenticated user', async () => {
    const auth = { uid: 'user1', token: { uid: 'user1' } }; // minimal token is fine
    const result = await callCreateBoard({ data: { title: 'My board' }, auth });

    expect(result).toHaveProperty('id');
    const snap = await admin.firestore().collection('boards').doc(result.id).get();
    expect(snap.exists).toBe(true);
    expect(snap.get('ownerUid')).toBe('user1');
  });
});
