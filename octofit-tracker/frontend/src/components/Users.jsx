import { useEffect, useState } from 'react'

const CODESPACE = import.meta.env.VITE_CODESPACE_NAME
const API_BASE = CODESPACE ? `https://${CODESPACE}-8000.app.github.dev/api` : `${window.location.origin}/api`
if (!CODESPACE && typeof window !== 'undefined') console.warn('VITE_CODESPACE_NAME not set; using', API_BASE)

function parseList(json) {
  if (Array.isArray(json)) return json
  return json.results || json.data || json.items || json.users || []
}

export default function Users() {
  const [items, setItems] = useState([])
  const [next, setNext] = useState(null)
  const [loading, setLoading] = useState(false)

  const initialUrl = `${API_BASE}/users/`

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
      <h3>Users</h3>
      {items.length === 0 && !loading && <p>No users found.</p>}
      <ul className="list-group mb-3">
        {items.map((it, i) => (
          <li className="list-group-item" key={it.id ?? i}>
            <strong>{it.username ?? it.name ?? `User ${i+1}`}</strong>
            <div className="small text-muted">{it.email ?? ''}</div>
            <pre className="mb-0">{JSON.stringify(it, null, 2)}</pre>
          </li>
        ))}
      </ul>
      {next && (
        <button className="btn btn-secondary" onClick={() => fetchData(next)} disabled={loading}>
          {loading ? 'Loading…' : 'Load more'}
        </button>
      )}
    </div>
  )
}
