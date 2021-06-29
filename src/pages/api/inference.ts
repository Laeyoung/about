import type { NextApiHandler } from 'next';
import axios from 'axios';

import { TEACHABLE_NLP_MODEL_URL} from '../../const'

const inferenceHandler: NextApiHandler = async (request, response) => {
  const { body } = request;
  const { data } = await axios.post(TEACHABLE_NLP_MODEL_URL, body);

  response.json({ data });
};

export default inferenceHandler;
