import {
  r as u,
  j as e,
  L as b,
  S as j,
  u as _,
  R as k,
} from './index-D5FRovWD.js';
function E(t) {
  const [s, a] = u.useState([]),
    [i, r] = u.useState(!1),
    [d, c] = u.useState(null);
  return (
    u.useEffect(() => {
      async function l() {
        (r(!0), c(null));
        try {
          const n = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
          if (!n.ok) throw new Error('Failed to fetch items');
          const p = (await n.json()).results
            .filter((f) => f.name.toLowerCase().includes(t.toLowerCase()))
            .map((f) => ({
              name: f.name,
              description: `More info at ${f.url}`,
            }));
          a(p);
        } catch (n) {
          (n instanceof Error ? c(n.message) : c('Unknown error'), a([]));
        } finally {
          r(!1);
        }
      }
      l();
    }, [t]),
    { items: s, loading: i, error: d }
  );
}
const P = '_about_link_me8qz_1',
  q = '_header_me8qz_9',
  x = { about_link: P, header: q },
  v = ({ initialValue: t, onSearch: s }) => {
    const [a, i] = u.useState(t),
      r = (c) => {
        i(c.target.value);
      },
      d = (c) => {
        c.preventDefault();
        const l = a.trim();
        s(l);
      };
    return e.jsxs('header', {
      className: x.header,
      children: [
        e.jsx(b, { to: '/about', className: x.about_link, children: 'About' }),
        e.jsxs('form', {
          onSubmit: d,
          role: 'form',
          children: [
            e.jsx('input', {
              type: 'text',
              value: a,
              onChange: r,
              placeholder: 'Search...',
              'aria-label': 'Search input',
            }),
            e.jsx('button', { type: 'submit', children: 'Search' }),
          ],
        }),
      ],
    });
  },
  w = '_cardList_1dcw7_12',
  L = '_card_1dcw7_12',
  y = { cardList: w, card: L },
  C = ({ name: t, description: s, onItemClick: a }) =>
    e.jsxs('div', {
      className: y.card,
      onClick: () => a(t),
      children: [e.jsx('h3', { children: t }), e.jsx('p', { children: s })],
    }),
  I = ({ items: t, onItemClick: s }) =>
    e.jsx('div', {
      className: y.cardList,
      'data-testid': 'card',
      children: t.map((a) =>
        e.jsx(
          C,
          { name: a.name, description: a.description, onItemClick: s },
          a.name
        )
      ),
    }),
  N = ({ items: t, loading: s, error: a, onItemClick: i }) =>
    s
      ? e.jsx('p', { children: 'Loading...' })
      : a
        ? e.jsxs('p', { children: ['Error: ', a] })
        : t.length
          ? e.jsx(I, { items: t, onItemClick: i })
          : e.jsx('p', { children: 'No results found.' });
function M({ name: t }) {
  const [s, a] = u.useState(null),
    [i, r] = u.useState(!1);
  return (
    u.useEffect(() => {
      async function d() {
        r(!0);
        try {
          const c = await fetch(`https://pokeapi.co/api/v2/pokemon/${t}`);
          if (!c.ok) throw new Error('Failed to load details');
          const l = await c.json();
          a(l);
        } catch {
          a(null);
        } finally {
          r(!1);
        }
      }
      d();
    }, [t]),
    i
      ? e.jsx(j, {})
      : s
        ? e.jsxs('div', {
            children: [
              e.jsx('h3', { children: s.name }),
              e.jsxs('p', { children: ['Height: ', s.height] }),
              e.jsxs('p', { children: ['Base XP: ', s.base_experience] }),
              e.jsxs('p', {
                children: [
                  'Abilities: ',
                  s.abilities.map((d) => d.ability.name).join(', '),
                ],
              }),
            ],
          })
        : e.jsx('p', { children: 'No details found.' })
  );
}
function D({
  currentPage: t,
  totalItems: s,
  itemsPerPage: a,
  onPageChange: i,
}) {
  const r = Math.ceil(s / a);
  if (r <= 1) return null;
  const d = 5,
    l = (() => {
      const n = [];
      if (r <= d + 4) for (let o = 1; o <= r; o++) n.push(o);
      else {
        (n.push(1), t > 3 && n.push('...'));
        const o = Math.max(2, t - 1),
          m = Math.min(r - 1, t + 1);
        for (let p = o; p <= m; p++) n.push(p);
        (t < r - 2 && n.push('...'), n.push(r));
      }
      return n;
    })();
  return e.jsx('div', {
    'data-testid': 'pagination',
    children: l.map((n, o) =>
      typeof n == 'number'
        ? e.jsx(
            'button',
            {
              disabled: n === t,
              onClick: () => i(n),
              style: { margin: 2 },
              children: n,
            },
            o
          )
        : e.jsx('span', { style: { margin: '0 4px' }, children: n }, o)
    ),
  });
}
const g = 10;
function V() {
  const [t, s] = _(),
    a = t.get('query') ?? '',
    i = parseInt(t.get('page') ?? '1', 10),
    r = t.get('details'),
    [d, c] = k.useState(a),
    { items: l, loading: n, error: o } = E(d);
  (u.useEffect(() => {
    (!t.has('query') || !t.has('page')) && s({ query: '', page: '1' });
  }, [t, s]),
    u.useEffect(() => {
      const h = Math.ceil(l.length / g) || 1;
      i > h && s({ query: t.get('query') ?? '', page: '1' });
    }, [l, i, t, s]));
  const m = (h) => {
      (c(h), s({ query: h, page: '1' }));
    },
    p = (h) => {
      s({
        query: t.get('query') ?? '',
        page: h.toString(),
        ...(r ? { details: r } : {}),
      });
    },
    f = (h) => {
      s({ query: t.get('query') ?? '', page: i.toString(), details: h });
    },
    S = l.slice((i - 1) * g, i * g);
  return e.jsxs('div', {
    style: { display: 'flex' },
    'data-testid': 'search-page',
    children: [
      e.jsxs('div', {
        style: { flex: 1 },
        children: [
          e.jsx(v, { initialValue: a, onSearch: m }),
          n && e.jsx(j, {}),
          o && e.jsxs('p', { children: ['Error: ', o] }),
          e.jsx(N, { items: S, loading: n, error: o, onItemClick: f }),
          e.jsx(D, {
            currentPage: i,
            totalItems: l.length,
            itemsPerPage: g,
            onPageChange: p,
          }),
        ],
      }),
      e.jsx('div', {
        style: { flex: 1, padding: '0 20px' },
        children: r
          ? e.jsx(M, { name: r })
          : e.jsx('p', { children: 'Select an item to see details' }),
      }),
    ],
  });
}
export { V as default };
