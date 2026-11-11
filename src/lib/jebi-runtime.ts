import bindings from './jebi-bindings.json';

if (bindings.stage === 'production' && process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
  throw new Error('Production database bindings cannot run as preview');
}

async function rpc(name: string, body: Record<string, unknown>) {
  const response = await fetch(bindings.url + '/rest/v1/rpc/' + name, {
    method: 'POST',
    headers: {
      apikey: bindings.key,
      Authorization: 'Bearer ' + bindings.key,
      'Content-Type': 'application/json',
      'Content-Profile': bindings.schema,
    },
    body: JSON.stringify(body),
    cache: 'no-store',
    signal: AbortSignal.timeout(10000),
    redirect: 'error',
  });
  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message === 'idempotency conflict' ? 'idempotency conflict' : 'Jebi storage unavailable');
  }
  return response.json();
}

export function version() {
  return rpc('ops_version', {});
}

export function submitLead(requestId: string, lead: Record<string, unknown>) {
  return rpc('submit_lead', { request_id: requestId, lead });
}
