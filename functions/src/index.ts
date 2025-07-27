/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { FieldValue } from 'firebase-admin/firestore';

admin.initializeApp();


// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Maximum number of boards a user can create. Override by setting the env var MAX_BOARDS or
// `firebase functions:config:set boards.max=<number>` and reading via functions.config().
const MAX_BOARDS = parseInt(process.env.MAX_BOARDS ?? "5", 10);

// Callable Cloud Function to create a board while enforcing per-user limit
export const createBoard = onCall(async (request) => {
  const { auth, data } = request;
  if (!auth) {
    throw new HttpsError("unauthenticated", "User must be authenticated");
  }

  const uid = auth.uid;
  const title = (data?.title as string | undefined)?.trim() ?? "";
  if (!title) {
    throw new HttpsError("invalid-argument", "Board title is required");
  }

  const db = admin.firestore();

  // Check current board count for this user
  const existing = await db.collection("boards").where("ownerUid", "==", uid).get();
  if (existing.size >= MAX_BOARDS) {
    throw new HttpsError("failed-precondition", `Board limit of ${MAX_BOARDS} reached`);
  }

  const boardRef = await db.collection("boards").add({
    title,
    ownerUid: uid,
    created: FieldValue.serverTimestamp(),
  });

  return { id: boardRef.id };
});

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
