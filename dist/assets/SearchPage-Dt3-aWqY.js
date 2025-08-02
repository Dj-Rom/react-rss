import {
  r as l,
  j as e,
  L as k,
  S as j,
  u as E,
  R as L,
} from './index-Bb7uJzDL.js';
function P(t) {
  const [n, s] = l.useState([]),
    [i, r] = l.useState(!1),
    [d, c] = l.useState(null);
  return (
    l.useEffect(() => {
      async function u() {
        (r(!0), c(null));
        try {
          const a = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
          if (!a.ok) throw new Error('Failed to fetch items');
          const h = (await a.json()).results
            .filter((f) => f.name.toLowerCase().includes(t.toLowerCase()))
            .map((f) => ({
              name: f.name,
              description: `More info at ${f.url}`,
            }));
          s(h);
        } catch (a) {
          (a instanceof Error ? c(a.message) : c('Unknown error'), s([]));
        } finally {
          r(!1);
        }
      }
      u();
    }, [t]),
    { items: n, loading: i, error: d }
  );
}
const v = '_about_link_me8qz_1',
  q = '_header_me8qz_9',
  g = { about_link: v, header: q },
  w = ({ initialValue: t, onSearch: n }) => {
    const [s, i] = l.useState(t),
      r = (c) => {
        i(c.target.value);
      },
      d = (c) => {
        c.preventDefault();
        const u = s.trim();
        n(u);
      };
    return e.jsxs('header', {
      className: g.header,
      children: [
        e.jsx(k, { to: '/about', className: g.about_link, children: 'About' }),
        e.jsxs('form', {
          onSubmit: d,
          role: 'form',
          children: [
            e.jsx('input', {
              type: 'text',
              value: s,
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
  C = '_cardList_1dcw7_12',
  I = '_card_1dcw7_12',
  y = { cardList: C, card: I },
  N = ({ name: t, description: n, onItemClick: s }) =>
    e.jsxs('div', {
      className: y.card,
      onClick: () => s(t),
      children: [e.jsx('h3', { children: t }), e.jsx('p', { children: n })],
    }),
  D = ({ items: t, onItemClick: n }) =>
    e.jsx('div', {
      id: 'cardList',
      className: y.cardList,
      'data-testid': 'card',
      children: t.map((s) =>
        e.jsx(
          N,
          { name: s.name, description: s.description, onItemClick: n },
          s.name
        )
      ),
    }),
  M = ({ items: t, loading: n, error: s, onItemClick: i }) =>
    n
      ? e.jsx('p', { children: 'Loading...' })
      : s
        ? e.jsxs('p', { children: ['Error: ', s] })
        : t.length
          ? e.jsx(D, { items: t, onItemClick: i })
          : e.jsx('p', { children: 'No results found.' });
function R({ name: t, setIsOpenDetails: n }) {
  const [s, i] = l.useState(null),
    [r, d] = l.useState(!1);
  return (
    l.useEffect(() => {
      async function c() {
        d(!0);
        try {
          const u = await fetch(`https://pokeapi.co/api/v2/pokemon/${t}`);
          if (!u.ok) throw new Error('Failed to load details');
          const a = await u.json();
          i(a);
        } catch {
          i(null);
        } finally {
          d(!1);
        }
      }
      c();
    }, [t]),
    r
      ? e.jsx(j, {})
      : s
        ? e.jsxs('div', {
            children: [
              e.jsx('span', {
                onClick: () => {
                  n(!1);
                },
                style: {
                  position: 'relative',
                  top: '15px',
                  left: '49%',
                  cursor: 'pointer',
                },
                children: 'X',
              }),
              e.jsx('br', {}),
              e.jsx('h3', { children: s.name }),
              e.jsxs('p', { children: ['Height: ', s.height] }),
              e.jsxs('p', { children: ['Base XP: ', s.base_experience] }),
              e.jsxs('p', {
                children: [
                  'Abilities: ',
                  s.abilities.map((c) => c.ability.name).join(', '),
                ],
              }),
            ],
          })
        : e.jsx('p', { children: 'No details found.' })
  );
}
function V({
  currentPage: t,
  totalItems: n,
  itemsPerPage: s,
  onPageChange: i,
}) {
  const r = Math.ceil(n / s);
  if (r <= 1) return null;
  const d = 5,
    u = (() => {
      const a = [];
      if (r <= d + 4) for (let o = 1; o <= r; o++) a.push(o);
      else {
        (a.push(1), t > 3 && a.push('...'));
        const o = Math.max(2, t - 1),
          m = Math.min(r - 1, t + 1);
        for (let h = o; h <= m; h++) a.push(h);
        (t < r - 2 && a.push('...'), a.push(r));
      }
      return a;
    })();
  return e.jsx('div', {
    'data-testid': 'pagination',
    children: u.map((a, o) =>
      typeof a == 'number'
        ? e.jsx(
            'button',
            {
              disabled: a === t,
              onClick: () => i(a),
              style: { margin: 2 },
              children: a,
            },
            o
          )
        : e.jsx('span', { style: { margin: '0 4px' }, children: a }, o)
    ),
  });
}
const x = 10;
function F() {
  const [t, n] = E(),
    s = t.get('query') ?? '',
    i = parseInt(t.get('page') ?? '1', 10),
    r = t.get('details'),
    [d, c] = l.useState(!1),
    [u, a] = L.useState(s),
    { items: o, loading: m, error: h } = P(u);
  (document.getElementById('cardList')?.addEventListener('click', () => c(!1)),
    l.useEffect(() => {
      (!t.has('query') || !t.has('page')) && n({ query: '', page: '1' });
    }, [t, n]),
    l.useEffect(() => {
      const p = Math.ceil(o.length / x) || 1;
      i > p && n({ query: t.get('query') ?? '', page: '1' });
    }, [o, i, t, n]));
  const f = (p) => {
      (a(p), n({ query: p, page: '1' }));
    },
    S = (p) => {
      n({
        query: t.get('query') ?? '',
        page: p.toString(),
        ...(r ? { details: r } : {}),
      });
    },
    b = (p) => {
      (r && c(!0),
        n({ query: t.get('query') ?? '', page: i.toString(), details: p }));
    },
    _ = o.slice((i - 1) * x, i * x);
  return e.jsxs('div', {
    style: { display: 'flex' },
    'data-testid': 'search-page',
    children: [
      e.jsxs('div', {
        style: { flex: 1 },
        children: [
          e.jsx(w, { initialValue: s, onSearch: f }),
          m && e.jsx(j, {}),
          h && e.jsxs('p', { children: ['Error: ', h] }),
          e.jsx(M, { items: _, loading: m, error: h, onItemClick: b }),
          e.jsx(V, {
            currentPage: i,
            totalItems: o.length,
            itemsPerPage: x,
            onPageChange: S,
          }),
        ],
      }),
      e.jsx('div', {
        style: { flex: 1, padding: '0 20px' },
        children: r && d ? e.jsx(R, { name: r, setIsOpenDetails: c }) : '',
      }),
    ],
  });
}
export { F as default };
