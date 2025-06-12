import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGeminiAnswer } from '../utils/gemini.js';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  Divider,
  CircularProgress,
  Avatar,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const setQuestion = (question) => ({ type: 'SET_QUESTION', payload: question });
const setAnswer = (answer) => ({ type: 'SET_ANSWER', payload: answer });
const setLoading = (loading) => ({ type: 'SET_LOADING', payload: loading });
const addHistory = (item) => ({ type: 'ADD_HISTORY', payload: item });

function QAComponent() {
  const question = useSelector((state) => state.question);
  const answer = useSelector((state) => state.answer);
  const loading = useSelector((state) => state.loading);
  const history = useSelector((state) => state.history);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    dispatch(setLoading(true));
    const result = await getGeminiAnswer(question, history);
    dispatch(setAnswer(result));
    dispatch(addHistory({ question, answer: result }));
    dispatch(setLoading(false));
    dispatch(setQuestion(''));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 6, p: 2 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          <SmartToyIcon color="primary" sx={{ mr: 1 }} />
          Enterprise Chatbot
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', gap: 12, marginBottom: 24 }}
        >
          <TextField
            fullWidth
            variant="outlined"
            label="Ask a question"
            value={question}
            onChange={(e) => dispatch(setQuestion(e.target.value))}
            disabled={loading}
            required
            autoFocus
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
            disabled={loading || !question.trim()}
          >
            {loading ? 'Thinking...' : 'Ask'}
          </Button>
        </form>
        {answer && (
          <Box sx={{ mb: 3, p: 2, bgcolor: '#f0f0f0', borderRadius: 2 }}>
            <Typography variant="subtitle1">
              <b>Bot:</b> {answer}
            </Typography>
          </Box>
        )}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Conversation History
        </Typography>
        <List sx={{ maxHeight: 250, overflow: 'auto' }}>
          {history.length === 0 && <Typography>No conversation yet.</Typography>}
          {history.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <Avatar><PersonIcon /></Avatar>
                <Typography>You: {item.question}</Typography>
              </ListItem>
              <ListItem>
                <Avatar><SmartToyIcon /></Avatar>
                <Typography>Bot: {item.answer}</Typography>
              </ListItem>
              {index < history.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default QAComponent;

