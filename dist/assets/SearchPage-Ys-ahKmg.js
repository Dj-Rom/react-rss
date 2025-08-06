import {
  u as P,
  j as e,
  r as x,
  L as N,
  a as v,
  b as L,
  c as C,
  d as w,
  e as T,
  f as q,
  S as I,
  g as U,
  h as D,
} from './index-DNkFdUPU.js';
const R = '_about_link_wdltu_1',
  M = '_header_wdltu_9',
  O = '_header_left_wdltu_20',
  B = '_themeToggle_wdltu_28',
  b = { about_link: R, header: M, header_left: O, themeToggle: B };
function V() {
  const { theme: t, toggleTheme: s } = P();
  return e.jsx('div', {
    className: t,
    children: e.jsx('h1', {
      className: b.themeToggle,
      onClick: s,
      'aria-label': 'Toggle theme',
      children: t === 'light' ? '☀️' : '🌙',
    }),
  });
}
const A = ({ initialValue: t, onSearch: s }) => {
    const [n, a] = x.useState(t),
      i = (d) => {
        a(d.target.value);
      },
      c = (d) => {
        d.preventDefault();
        const g = n.trim();
        s(g);
      };
    return e.jsxs('header', {
      className: b.header,
      children: [
        e.jsxs('div', {
          className: b.header_left,
          children: [
            ' ',
            e.jsx(N, {
              to: '/about',
              className: b.about_link,
              children: 'About',
            }),
            e.jsx(V, {}),
          ],
        }),
        e.jsxs('form', {
          onSubmit: c,
          role: 'form',
          children: [
            e.jsx('input', {
              type: 'text',
              value: n,
              onChange: i,
              placeholder: 'Search...',
              'aria-label': 'Search input',
            }),
            e.jsx('button', { type: 'submit', children: 'Search' }),
          ],
        }),
      ],
    });
  },
  $ = '_cardLi_11xxt_12',
  G = '_cardLabel_11xxt_20',
  H = '_cardList_11xxt_30',
  Q = '_card_11xxt_12',
  y = { cardLi: $, cardLabel: G, cardList: H, card: Q },
  z = ({ name: t, url: s, onItemClick: n }) => {
    const a = v(),
      i = L((h) => h.items.selectedItems),
      c = Number(s.split('/').filter(Boolean).pop()),
      { data: d, isLoading: g, isError: r, error: o } = C(c),
      u = `${t}`,
      m = (h) => {
        a(w(h));
      },
      p = (h) => {
        a(T(h));
      },
      _ = (h) => {
        h.stopPropagation();
        const f = { id: u, name: t, detailsUrl: s };
        h.target.checked ? m(f) : p(u);
      },
      k = i.some((h) => h.id === u);
    return (
      r && o.toString(),
      e.jsxs('li', {
        className: y.cardLi,
        children: [
          e.jsx('label', {
            className: y.cardLabel,
            children: e.jsx('input', {
              name: u,
              type: 'checkbox',
              checked: k,
              onChange: _,
            }),
          }),
          e.jsxs('div', {
            id: u,
            'data-testid': 'mock-card',
            className: y.card,
            onClick: () => n(t),
            children: [
              e.jsx('h3', { children: t }),
              e.jsxs('p', {
                children: ['Height: ', d?.height ?? 'no information', ','],
              }),
              e.jsxs('p', {
                children: ['Weight: ', d?.weight ?? 'no information'],
              }),
            ],
          }),
        ],
      })
    );
  };
function X(t) {
  if (t.length === 0) return;
  const s = Object.keys(t[0]).join(','),
    n = t.map((d) =>
      Object.values(d)
        .map((g) => `"${String(g).replace(/"/g, '""')}"`)
        .join(',')
    ),
    a = [s, ...n].join(`
`),
    i = new Blob([a], { type: 'text/csv;charset=utf-8;' }),
    c = document.createElement('a');
  ((c.href = URL.createObjectURL(i)),
    (c.download = `${t.length}_items.csv`),
    c.click(),
    URL.revokeObjectURL(c.href));
}
const F = () => {
    const t = v(),
      s = L((n) => n.items.selectedItems);
    return s.length === 0
      ? null
      : e.jsxs('div', {
          'data-testid': 'flyout',
          style: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#222',
            color: '#fff',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1e3,
          },
          children: [
            e.jsxs('span', {
              children: [
                s.length,
                ' item',
                s.length > 1 ? 's' : '',
                ' ',
                'selected',
              ],
            }),
            e.jsxs('div', {
              children: [
                e.jsx('button', {
                  style: { marginRight: '1rem' },
                  onClick: () => t(q()),
                  children: 'Unselect all',
                }),
                e.jsx('button', { onClick: () => X(s), children: 'Download' }),
              ],
            }),
          ],
        });
  },
  W = ({ items: t, onItemClick: s }) => {
    const n = L((a) => a.items.selectedItems);
    return e.jsxs('div', {
      id: 'cardList',
      className: y.cardList,
      'data-testid': 'card',
      children: [
        n.length > 0 && e.jsx(F, {}),
        t.map((a) =>
          e.jsx(z, { name: a.name, url: a.url, onItemClick: s }, a.name)
        ),
      ],
    });
  },
  J = ({ items: t, loading: s, error: n, onItemClick: a }) =>
    s
      ? e.jsx('p', { children: 'Loading...' })
      : n
        ? e.jsxs('p', { children: ['Error: ', n] })
        : t.length
          ? e.jsx(W, { items: t, onItemClick: a })
          : e.jsx('p', { children: 'No results found.' });
function K({ name: t, setIsOpenDetails: s }) {
  const { data: n, isLoading: a, isError: i } = C(t);
  return a
    ? e.jsx(I, {})
    : i || !n
      ? e.jsx('p', { children: 'No details found.' })
      : e.jsxs('div', {
          children: [
            e.jsx('span', {
              onClick: () => s(!1),
              style: {
                position: 'relative',
                top: '15px',
                left: '49%',
                cursor: 'pointer',
              },
              children: 'X',
            }),
            e.jsx('br', {}),
            e.jsx('h3', {
              style: { textTransform: 'capitalize' },
              children: n.name,
            }),
            e.jsxs('p', { children: ['Height: ', n.height] }),
            e.jsxs('p', { children: ['Base XP: ', n.base_experience] }),
            e.jsxs('p', {
              children: [
                'Abilities: ',
                n.abilities.map((c) => c.ability.name).join(', '),
              ],
            }),
          ],
        });
}
function Y({
  currentPage: t,
  totalItems: s,
  itemsPerPage: n,
  onPageChange: a,
}) {
  const i = Math.ceil(s || 0 / n);
  if (i <= 1) return null;
  const c = 5,
    g = (() => {
      const r = [];
      if (i <= c + 4) for (let o = 1; o <= i; o++) r.push(o);
      else {
        (r.push(1), t > 3 && r.push('...'));
        const o = Math.max(2, t - 1),
          u = Math.min(i - 1, t + 1);
        for (let m = o; m <= u; m++) r.push(m);
        (t < i - 2 && r.push('...'), r.push(i));
      }
      return r;
    })();
  return e.jsx('div', {
    'data-testid': 'pagination',
    children: g.map((r, o) =>
      typeof r == 'number'
        ? e.jsx(
            'button',
            {
              disabled: r === t,
              onClick: () => a(r),
              style: { margin: 2 },
              children: r,
            },
            o
          )
        : e.jsx('span', { style: { margin: '0 4px' }, children: r }, o)
    ),
  });
}
const j = 10;
function ee() {
  const [t, s] = U(),
    n = parseInt(t.get('page') ?? '1', 10),
    a = t.get('details'),
    [i, c] = x.useState(!1),
    d = t.get('query') ?? '',
    [g, r] = x.useState(d),
    { data: o, isLoading: u, isError: m, error: p } = D();
  (x.useEffect(() => {
    (!t.has('query') || !t.has('page')) && s({ query: '', page: '1' });
  }, [t, s]),
    x.useEffect(() => {
      const l = document.getElementById('cardList');
      if (!l) return;
      const S = () => c(!1);
      return (
        l.addEventListener('click', S),
        () => {
          l.removeEventListener('click', S);
        }
      );
    }, []),
    x.useEffect(() => {
      const l = Math.ceil((o?.results.length ?? 0) / j) || 1;
      n > l && s({ query: t.get('query') ?? '', page: '1' });
    }, [o, n, t, s]));
  const _ = (l) => {
      (console.log(l), r(l), s({ query: l, page: '1' }));
    },
    k = (l) => {
      s({
        query: t.get('query') ?? '',
        page: l.toString(),
        ...(a ? { details: a } : {}),
      });
    },
    h = (l) => {
      (a && c(!0),
        s({ query: t.get('query') ?? '', page: n.toString(), details: l }));
    },
    f =
      o?.results?.filter((l) =>
        l.name.toLowerCase().includes(g.toLowerCase())
      ) ?? [],
    E = f.slice((n - 1) * j, n * j) ?? [];
  return e.jsxs('div', {
    style: { display: 'flex' },
    'data-test-id': 'search-page',
    children: [
      e.jsxs('div', {
        style: { flex: 1 },
        children: [
          e.jsx(A, { initialValue: d, onSearch: _ }),
          u && e.jsx(I, {}),
          m &&
            e.jsxs('p', {
              children: ['Error: ', p?.status || 'Unknown error'],
            }),
          e.jsx(J, {
            items: E,
            loading: u,
            error: p?.toString(),
            onItemClick: h,
          }),
          e.jsx(Y, {
            currentPage: n,
            totalItems: f.length,
            itemsPerPage: j,
            onPageChange: k,
          }),
        ],
      }),
      e.jsx('div', {
        style: { flex: 1, padding: '0 20px' },
        children: a && i && e.jsx(K, { name: a, setIsOpenDetails: c }),
      }),
    ],
  });
}
export { ee as default };
