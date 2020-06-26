import { Router } from 'https://deno.land/x/oak/mod.ts';

const router = new Router();

interface Todo {
  id: string;
  text: string;
}

let todos: Todo[] = [];

router.get('/todos', (ctx) => {
  ctx.response.body = { todos };
});

router.post('/todos', async (ctx) => {
  const parsedBody = await ctx.request.body();
  const newTodo: Todo = { id: Date.now().toString(), text: parsedBody.value.text };
  todos = [...todos, newTodo];
  ctx.response.status = 201;
  ctx.response.body = { id: newTodo.id };
});

router.put('/todos/:todoId', async (ctx) => {
  const parsedBody = await ctx.request.body();
  const updatedTodo: Todo = { id: ctx.params.todoId!, text: parsedBody.value.text };
  todos = todos.map((todo) => (todo.id === ctx.params.todoId ? updatedTodo : todo));
  ctx.response.status = 204;
});

router.delete('/todos/:todoId', (ctx) => {
  todos = todos.filter((todo) => todo.id !== ctx.params.todoId);
  ctx.response.status = 204;
});

export { router as todosRouter };
