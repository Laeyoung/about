import { INFERENCE_NUM_OF_CHOICES, INFERENCE_CHOICE_MAX_LENGTH } from '../const'

export async function fetchTeachableNLPInference(
  text: string,
): Promise<object> {
  const body = JSON.stringify({ text, num_samples: INFERENCE_NUM_OF_CHOICES, length: INFERENCE_CHOICE_MAX_LENGTH });

  const response = await fetch('/api/inference', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  const { data } = await response.json();

  return data;
}
