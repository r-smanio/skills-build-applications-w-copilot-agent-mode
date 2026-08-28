import { useEffect, useState } from 'react'

const CODESPACE = import.meta.env.VITE_CODESPACE_NAME
const API_BASE = CODESPACE ? `https://${CODESPACE}-8000.app.github.dev/api` : `${window.location.origin}/api`
if (!CODESPACE && typeof window !== 'undefined') console.warn('VITE_CODESPACE_NAME not set; using', API_BASE)

function parseList(json) {
  if (Array.isArray(json)) return json
  return json.results || json.data || json.items || json.leaderboard || []
}

export default function Leaderboard() {
  const [items, setItems] = useState([])
  const [next, setNext] = useState(null)
  const [loading, setLoading] = useState(false)

  const initialUrl = `${API_BASE}/leaderboard/`

  async function fetchData(url = initialUrl) {
    setLoading(true)
    try {
      const res = await fetch(url)
      const json = await res.json()
      const list = parseList(json)
      setItems((prev) => (url === initialUrl ? list : [...prev, ...list]))
      setNext(json.next || null)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  return (
    <div>
      <h3>Leaderboard</h3>
      {items.length === 0 && !loading && <p>No leaderboard entries found.</p>}
      <ol className="list-group list-group-numbered mb-3">
        {items.map((it, i) => (
          <li className="list-group-item" key={it.id ?? i}>
            <div className="d-flex justify-content-between">
              <div>
                <strong>{it.username ?? it.name ?? `Entry ${i+1}`}</strong>
                <div className="small text-muted">{it.team ?? ''}</div>
              </div>
              <div className="fw-bold">{it.score ?? it.points ?? ''}</div>
            </div>
            <pre className="mb-0">{JSON.stringify(it, null, 2)}</pre>
          </li>
        ))}
      </ol>
      {next && (
        <button className="btn btn-secondary" onClick={() => fetchData(next)} disabled={loading}>
          {loading ? 'Loading…' : 'Load more'}
        </button>
      )}
    </div>
  )
}
