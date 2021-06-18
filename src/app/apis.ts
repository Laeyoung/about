const num_samples = 5;
const length = 20;

export async function fetchTeachableNLPInference(
  text: string,
): Promise<object> {
  const body = JSON.stringify({ text, num_samples, length });

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
