import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

interface ClipboardItem {
  id: string;
  title: string;
  content: string;
  timestamp: number;
}

const App: React.FC = () => {
  const [items, setItems] = useState<ClipboardItem[]>(() => {
    const saved = localStorage.getItem('clipboard-items');
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('clipboard-items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  const addItem = () => {
    if (!content.trim()) return;
    const finalTitle = title.trim() || (content.trim().substring(0, 30) + (content.length > 30 ? '...' : ''));
    const newItem: ClipboardItem = {
      id: Date.now().toString(),
      title: finalTitle,
      content: content,
      timestamp: Date.now(),
    };
    setItems([newItem, ...items]);
    setTitle('');
    setContent('');
    setIsFormVisible(false);
    setSearchQuery('');
  };

  const deleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      // Optional: Show a toast or notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const exportBackup = () => {
    const dataStr = JSON.stringify(items, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `clipzter-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importBackup = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && window.confirm(`Found ${parsed.length} entries. This will replace your current list. Continue?`)) {
          setItems(parsed);
        }
      } catch (err) {
        console.error('Failed to parse backup file', err);
        alert('Failed to parse backup file.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <header>
        <h1>Clipzter Web</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      <div className="data-controls">
        <button onClick={exportBackup}>Export Backup</button>
        <button onClick={() => fileInputRef.current?.click()}>Import Backup</button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={importBackup}
          accept=".json"
          style={{ display: 'none' }}
        />
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search entries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <button className="add-btn" onClick={() => setIsFormVisible(!isFormVisible)}>
          {isFormVisible ? 'Cancel' : '+ Add New Entry'}
        </button>
      </div>

      {isFormVisible && (
        <div className="entry-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entry Name (Optional)"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter text here..."
            rows={4}
          />
          <div className="form-actions">
            <button onClick={addItem}>Save Entry</button>
          </div>
        </div>
      )}

      <ul className="clipboard-list">
        {filteredItems.map((item) => (
          <li key={item.id} className="clipboard-item">
            <div className="item-content">
              <div className="item-title">{item.title}</div>
            </div>
            <div className="actions">
              <button className="copy-btn" onClick={() => copyToClipboard(item.content)}>Copy</button>
              <button className="delete-btn" onClick={() => deleteItem(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;