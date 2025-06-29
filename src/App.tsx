import { useEffect, useState } from 'react';
import { graphqlOperation } from '@aws-amplify/api-graphql';
import { withAuthenticator, WithAuthenticatorProps } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { listTodos } from './graphql/queries';
import { createTodo } from './graphql/mutations';
import { generateClient, GraphQLResult } from '@aws-amplify/api';
import { Todo } from './types';

// MUIのインポート
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
  Stack,
} from '@mui/material';

type CreateTodoInput = {
  name: string;
  description?: string;
};

const client = generateClient();

function App({ signOut, user }: WithAuthenticatorProps) {
  const [formData, setFormData] = useState<CreateTodoInput>({ name: '', description: '' });
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const result = (await client.graphql(graphqlOperation(listTodos))) as GraphQLResult<{
      listTodos: { items: Todo[] };
    }>;
    setTodos(result.data?.listTodos.items || []);
  };

  const handleAddTodo = async () => {
    if (!formData.name) return;
    await client.graphql(graphqlOperation(createTodo, { input: formData }));
    setFormData({ name: '', description: '' });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          My Todo List
        </Typography>
        <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleAddTodo}>
            Add
          </Button>
        </Stack>
        <List>
          {todos.map((todo) => (
            <ListItem key={todo.id} divider>
              <ListItemText
                primary={todo.name}
                secondary={todo.description}
              />
            </ListItem>
          ))}
        </List>
        <Box textAlign="right" mt={2}>
          <Button variant="outlined" color="secondary" onClick={signOut}>
            Sign Out
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default withAuthenticator(App);