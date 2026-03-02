'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { slugify } from '@/lib/utils'

interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  meta_title: string
  meta_description: string
  published: boolean
  created_at: string
}

const emptyPost = {
  id: '',
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  meta_title: '',
  meta_description: '',
  published: false,
  created_at: '',
}

export function AdminCMS() {
  const [posts, setPosts] = useState<Post[]>([])
  const [editing, setEditing] = useState<Post | null>(null)
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState<'list' | 'edit'>('list')

  const fetchPosts = async () => {
    const res = await fetch('/api/admin')
    const data = await res.json()
    if (data.posts) setPosts(data.posts)
  }

  useEffect(() => { fetchPosts() }, [])

  const handleNew = () => {
    setEditing({ ...emptyPost })
    setView('edit')
  }

  const handleEdit = (post: Post) => {
    setEditing({ ...post })
    setView('edit')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return
    await fetch('/api/admin', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchPosts()
  }

  const handleSave = async () => {
    if (!editing) return
    setLoading(true)

    const method = editing.id ? 'PUT' : 'POST'
    const res = await fetch('/api/admin', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    })

    if (res.ok) {
      await fetchPosts()
      setView('list')
      setEditing(null)
    } else {
      const data = await res.json()
      alert(data.error || 'Failed to save')
    }
    setLoading(false)
  }

  const handleTitleChange = (title: string) => {
    if (!editing) return
    setEditing({
      ...editing,
      title,
      slug: editing.slug || slugify(title),
      meta_title: editing.meta_title || title,
    })
  }

  if (view === 'edit' && editing !== null) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">{editing.id ? 'Edit Post' : 'New Post'}</h1>
            <div className="flex gap-3">
              <button onClick={() => setView('list')} className="text-sm text-gray-600 hover:text-gray-900">
                ← Back
              </button>
              <Button onClick={handleSave} loading={loading}>Save Post</Button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={editing.title}
                onChange={e => handleTitleChange(e.target.value)}
                placeholder="Post title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                value={editing.slug}
                onChange={e => setEditing({ ...editing, slug: e.target.value })}
                placeholder="url-friendly-slug"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt *</label>
              <textarea
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-20"
                value={editing.excerpt}
                onChange={e => setEditing({ ...editing, excerpt: e.target.value })}
                placeholder="Brief description shown in blog listings"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content (HTML) *</label>
              <textarea
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono h-80"
                value={editing.content}
                onChange={e => setEditing({ ...editing, content: e.target.value })}
                placeholder="<h2>Section Title</h2><p>Content...</p>"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                <input
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={editing.meta_title}
                  onChange={e => setEditing({ ...editing, meta_title: e.target.value })}
                  placeholder="SEO title (60 chars max)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <input
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={editing.meta_description}
                  onChange={e => setEditing({ ...editing, meta_description: e.target.value })}
                  placeholder="SEO description (160 chars max)"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={editing.published}
                onChange={e => setEditing({ ...editing, published: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600"
              />
              <label htmlFor="published" className="text-sm text-gray-700">Published (visible on blog)</label>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin CMS</h1>
            <p className="text-gray-600 text-sm mt-1">Manage blog posts</p>
          </div>
          <Button onClick={handleNew}>+ New Post</Button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {posts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No posts yet.</p>
              <button onClick={handleNew} className="text-blue-600 underline text-sm mt-2">Create your first post</button>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Slug</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {posts.map(post => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{post.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">/blog/{post.slug}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button onClick={() => handleEdit(post)} className="text-sm text-blue-600 hover:underline">Edit</button>
                      <button onClick={() => handleDelete(post.id)} className="text-sm text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
