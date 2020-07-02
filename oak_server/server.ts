import { Application } from 'https://deno.land/x/oak/mod.ts';
import { todosRouter } from './todos_routes.ts';

const app = new Application();

app.use(async (_ctx, next) => {
  console.log('middleware');
  await next();
});

app.use(todosRouter.routes());
app.use(todosRouter.allowedMethods());

await app.listen({ port: 8000 });
