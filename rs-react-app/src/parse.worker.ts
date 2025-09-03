self.onmessage = async (e: MessageEvent<string>) => {
  try {
    const text = e.data;
    const parsed = JSON.parse(text);

    postMessage({ ok: true, data: parsed });
  } catch (err: any) {
    postMessage({ ok: false, error: err?.message || String(err) });
  }
};
