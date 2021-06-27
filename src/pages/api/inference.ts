import type { NextApiHandler } from 'next';
import axios from 'axios';

// const TEACHABLE_NLP_MODEL_URL =
//   'https://train-k71fojltng9nnlu70kz6-gpt2-train-teachable-ainize.endpoint.dev.ainize.ai/predictions/gpt-2-ko-small-finetune';
const TEACHABLE_NLP_MODEL_URL =
  'https://train-0bysmk6cwc8v3nxwr1ej-gpt2-train-teachable-ainize.endpoint.dev.ainize.ai/predictions/gpt-2-ko-small-finetune';

const inferenceHandler: NextApiHandler = async (request, response) => {
  const { body } = request;
  const { data } = await axios.post(TEACHABLE_NLP_MODEL_URL, body);

  response.json({ data });
};

export default inferenceHandler;
