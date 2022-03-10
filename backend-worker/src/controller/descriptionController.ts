import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { IpfsService } from '../data/ipfs';
import { TableLandService } from '../data/tableland';
import { fetchOwnerOf, verifySignature } from '../util/ether';

interface PostRequest {
  contract: string
  tokenId: string
  description: string
  postAddress: string
  signature?: string
}

interface BackstoryData {
  contract: string
  tokenId: string
  description: string
  postedby: string
  timestamp: number
}

const tableland = new TableLandService();
const ipfs = new IpfsService();
ipfs.init();
export default async function descriptionController(fastify: FastifyInstance) {
  fastify.get('/query', async(
    _request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    const q = _request.query as { contract: string | null; id: string | null };
    const contract = q.contract;
    const id = parseInt(q.id ?? '');
    reply.header('Access-Control-Allow-Origin', '*');
    if (typeof contract !== 'string' || isNaN(id) || id < 0 || !contract.startsWith('0x') || !contract.match(/^0x[a-fA-F0-9]{40}$/))
      return reply.code(400).send('invalid contract / id parameters');
    else
      return tableland.fetch(contract, id);
  });

  fastify.route({
    method: 'OPTIONS',
    url: '/post',
    handler: async(request, reply) => {
      reply.code(204)
        .header('Content-Length', '0')
        .header('Access-Control-Allow-Origin', '*')
        .header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
        .header('Access-Control-Allow-Headers', 'content-type')
        .send();
    },
  });
  fastify.post('/post', { exposeHeadRoute: true }, async(
    _request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    const request = _request.body as PostRequest;
    const id = parseInt(request.tokenId.toString() ?? '');
    reply.header('Access-Control-Allow-Origin', '*');
    if (typeof request.contract !== 'string' || isNaN(id) || id < 0 || !request.contract.startsWith('0x')
        || !request.contract.match(/^0x[a-fA-F0-9]{40}$/))
      return reply.code(400).send('invalid contract / id parameters');

    const reqWithoutSig = Object.assign({}, request);
    reqWithoutSig.signature = undefined;
    if (!verifySignature(JSON.stringify(reqWithoutSig), request.postAddress, request.signature ?? ''))
      return reply.code(403).send('signature incorrect');

    const currentOwner = await fetchOwnerOf(request.contract, request.tokenId);
    if (currentOwner !== request.postAddress)
      return reply.code(403).send(`current owner is ${currentOwner} instead of ${request.postAddress}`);

    const data: BackstoryData = {
      contract: request.contract,
      tokenId: request.tokenId,
      description: request.description,
      postedby: request.postAddress,
      timestamp: Date.now(),
    };
    console.log('going to save', data);
    const cid = await ipfs.storeBlob(data);
    console.log('saved IPFS', cid, 'now tableland');
    // return tableland.fetch(contract, id);
    await tableland.store(request.contract, id, cid);
    return 'ok';
  });
}
