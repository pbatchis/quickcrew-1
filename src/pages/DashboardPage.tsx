import { useEffect, useRef, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
  where,
  addDoc,
  limit,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { Task, taskConverter } from '../../shared/task';
import { Board, boardConverter } from '../../shared/board';

const STATUS_ORDER: Task['status'][] = ['todo', 'doing', 'done'];

export const DashboardPage = () => {
  const { user, signOut } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [board, setBoard] = useState<Board | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const fetchedRef = useRef<string | null>(null);

  /* ------------------------------------------------------------------ */
  /* 1. Ensure the user has a Board document                             */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!user || fetchedRef.current === user.uid) return;
    fetchedRef.current = user.uid;
    
    const boardsRef = collection(db, 'boards').withConverter(boardConverter);

    (async () => {
      const q = query(
        boardsRef,
        where('ownerUid', '==', user.uid),
        orderBy('created', 'asc'),
        limit(1),
      );

      const snap = await getDocs(q);

      if (!snap.empty) {
        setBoard(snap.docs[0]!.data());
        return;
      }

      const newBoard = new Board('', 'My Board', user.uid, new Date());
      const docRef = await addDoc(boardsRef, newBoard);
      setBoard(
        new Board(docRef.id, newBoard.title, newBoard.ownerUid, newBoard.created),
      );
    })();
  }, [user]);

  /* ------------------------------------------------------------------ */
  /* 2. Listen to tasks in real time                                     */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!board) return;
    const tasksRef = collection(
      db,
      'boards',
      board.id,
      'tasks',
    ).withConverter(taskConverter);

    const q = query(tasksRef, orderBy('created', 'asc'));
    const unsub = onSnapshot(q, (snap) =>
      setTasks(snap.docs.map((d) => d.data())),
    );
    return () => unsub();
  }, [board]);

  /* ------------------------------------------------------------------ */
  /* 3. Helper functions                                                 */
  /* ------------------------------------------------------------------ */
  const addTask = async () => {
    if (!board || !newTitle.trim()) return;
    const tasksRef = collection(
      db,
      'boards',
      board.id,
      'tasks',
    ).withConverter(taskConverter);

    await addDoc(
      tasksRef,
      new Task('', board.id, newTitle.trim(), 'todo'),
    );
    setNewTitle('');
  };

  const advanceTask = async (t: Task) => {
    if (!board) return;
    const nextIndex = STATUS_ORDER.indexOf(t.status) + 1;
    if (nextIndex >= STATUS_ORDER.length) return; // already done

    const taskRef = doc(
      db,
      'boards',
      board.id,
      'tasks',
      t.id,
    ).withConverter(taskConverter);

    await updateDoc(taskRef, { status: STATUS_ORDER[nextIndex] });
  };

  /* ------------------------------------------------------------------ */
  /* 4. Render                                                           */
  /* ------------------------------------------------------------------ */
  const column = (status: Task['status']) => (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography variant="h6" mb={1} textTransform="capitalize">
        {status}
      </Typography>
      {tasks
        .filter((t) => t.status === status)
        .map((t) => (
          <Paper
            key={t.id}
            sx={{ p: 1.5, mb: 1.5, display: 'flex', justifyContent: 'space-between' }}
          >
            <span>{t.title}</span>
            {status !== 'done' && (
              <IconButton size="small" onClick={() => advanceTask(t)}>
                <ArrowForwardIcon fontSize="small" />
              </IconButton>
            )}
          </Paper>
        ))}
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">QuickCrew Board</Typography>
      </Stack>

      {/* Add-task form */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          label="New task"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <Button variant="contained" onClick={addTask}>
          Add
        </Button>
      </Box>

      {/* Columns */}
      <Stack direction="row" spacing={2}>
        {column('todo')}
        {column('doing')}
        {column('done')}
      </Stack>
    </Box>
  );
};
