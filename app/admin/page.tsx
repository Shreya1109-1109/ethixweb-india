'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Lead {
  id: number;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      fetchLeads();
    } else {
      alert('Incorrect password!');
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching leads:', error.message);
        alert('Database error: ' + error.message);
      } else {
        setLeads(data || []);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
    setLoading(false);
  };

  const deleteLead = async (id: number) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;

    try {
      const { error } = await supabase.from('leads').delete().eq('id', id);

      if (error) {
        alert('Error deleting lead: ' + error.message);
      } else {
        setLeads(leads.filter((lead) => lead.id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // Search filter
  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.phone && lead.phone.includes(searchTerm))
  );

  const exportToCSV = () => {
    if (filteredLeads.length === 0) {
      alert('No leads to export!');
      return;
    }

    const headers = ['ID,Date,Name,Email,Phone,Message\n'];
    const rows = filteredLeads.map(
      (l) =>
        `"${l.id}","${new Date(l.created_at).toLocaleString()}","${l.name}","${l.email}","${l.phone || ''}","${l.message.replace(/"/g, '""')}"`
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + headers.concat(rows.join('\n')).join('');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ethixweb_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-slate-900 p-8 rounded-xl border border-slate-800 w-full max-w-md shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Ethixweb Admin Login</h2>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white mb-4 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/25 active:translate-y-0"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Ethixweb India - Admin Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">Manage and track customer inquiries in real-time.</p>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            {/* Real-time Search Box */}
            <input
              type="text"
              placeholder="Search by name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500 w-64"
            />
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2 active:translate-y-0"
            >
              📥 Export CSV
            </button>
            <button
              onClick={fetchLeads}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center gap-2 active:translate-y-0"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading leads...</div>
        ) : filteredLeads.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-xl border border-slate-800/80">
            <p className="text-slate-400 text-lg">No enquiries found matching your search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-slate-900 rounded-xl border border-slate-800 shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-4">Date</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Message</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-4 text-slate-400 whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleString()}
                    </td>
                    <td className="p-4 font-semibold text-white">{lead.name}</td>
                    <td className="p-4 text-cyan-400">{lead.email}</td>
                    <td className="p-4 text-slate-300">{lead.phone || 'N/A'}</td>
                    <td className="p-4 text-slate-300 max-w-xs truncate" title={lead.message}>
                      {lead.message}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white rounded text-xs font-medium transition-all duration-200 transform hover:scale-105"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}