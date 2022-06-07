import Fastify from 'fastify';
import { user } from 'pg/lib/defaults';

import { users } from './users';

const fastify = Fastify({
  logger: true,
});
fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));

fastify.post('/uppercase', (request, reply) => {
  if (typeof request.body === 'string' && request.body.toUpperCase().indexOf('FUCK') === -1) {
    return reply.send(request.body.toUpperCase())
  } else {
    return reply.status(403).send("unresolved")
  }
});

fastify.post('/lowercase', (request, reply) => {
  if (typeof request.body === 'string' && request.body.toUpperCase().indexOf('FUCK') === -1) {
    return reply.send(request.body.toLowerCase())
  } else {
    return reply.status(403).send("unresolved")
  }
});

fastify.get('/user/:id', (request, reply) => {
  let { id } = request.params;
  if (users[id]) {
    return reply.send(users[id]);
  } else {
    return reply.status(400).send('User not exist')
  }
});

fastify.get('/users', (request, reply) => {
  let result = [];
  const { filter, value } = request.query
  Object.entries(users).filter((item) => {
    if (item[1][filter] === value) {
      result.push(item[1]);
    } if (item[1][filter] === +value) {
      result.push(item[1]);
    }
    return result;
  })
  return reply.send(result);
})

export default fastify;

